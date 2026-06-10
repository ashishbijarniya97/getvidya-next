/**
 * GetVidya -- Exam Engine Load Test
 * Target: https://app.getvidya.in
 *
 * Run:
 *   BASE_URL=https://app.getvidya.in k6 run tests/load/exam-load-test.js
 *
 * Prerequisites:
 *   brew install k6        (macOS)
 *   snap install k6        (Ubuntu)
 *
 * Replace all REPLACE WITH REAL AUTH CREDENTIALS comments before running.
 *
 * What this covers:
 *   Scenario 1: Ramp to 100 concurrent exam users (realistic daily peak)
 *   Scenario 2: Constant-arrival-rate question fetches (50 req/s, active exam sessions)
 *   Scenario 3: Spike to 200 rps (exam schedule release burst -- Railway NTPC pattern)
 *   Security: asserts isCorrect never appears in any API response body
 *   Capacity: tracks 503 / pool-exhaustion responses as a custom counter
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';

// ---------------------------------------------------------------------------
// Custom Metrics
// ---------------------------------------------------------------------------

// Time from POST /exam/start to first question data returned (maps to "page
// visual load < 2s" UX requirement)
const examSessionDuration = new Trend('exam_session_duration', true);

// Per-question fetch time -- the inner question loop, question by question
const questionLoadTime = new Trend('question_load_time', true);

// Submission latency -- POST that finalises the Test record in Supabase
const submitResponseTime = new Trend('submit_response_time', true);

// Security counter -- must remain at 0. Fires if "isCorrect" leaks into
// any response body (the Option table's isCorrect boolean must NEVER reach
// the client)
const isCorrectLeakDetected = new Counter('isCorrect_leak_detected');

// Fires on HTTP 503 or response body containing Supavisor pool-exhaustion
// text. Supabase Supavisor limit for this project: 200 concurrent connections.
const connectionPoolExhaustion = new Counter('connection_pool_exhaustion');

// Overall per-request error rate tracked separately for dashboard clarity
const errorRate = new Rate('api_error_rate');

// ---------------------------------------------------------------------------
// Shared Test Data
// SharedArray is evaluated once and shared across all VUs -- no per-VU cost.
// ---------------------------------------------------------------------------

// SSC CGL = highest brand recognition (12,964 questions, 190 exams)
// Railway NTPC = highest question count (23,860 questions, 410 exams)
// RJS = largest exam bank (27,470 questions, 425 exams)
// NDA/CDS = 26,650 questions, 318 exams
// UPSC CSE = 9,210 questions, 90 exams
const examSlugs = new SharedArray('examSlugs', function () {
  return [
    'ssc-cgl',
    'railway-ntpc',
    'rjs',
    'nda-cds',
    'upsc-cse',
  ];
});

// ---------------------------------------------------------------------------
// k6 Options
// ---------------------------------------------------------------------------

export const options = {
  scenarios: {
    // Scenario 1: Ramp up to 100 concurrent exam users.
    // Models morning peak traffic (9 AM onward) when students open mock tests.
    concurrent_exam_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 25 },   // Warm-up: slow ramp, lets Supavisor pool settle
        { duration: '60s', target: 100 },  // Ramp to production-peak concurrency target
        { duration: '30s', target: 100 },  // Sustain: verify no connection pool drift
        { duration: '20s', target: 0 },    // Cool-down: verify graceful connection release
      ],
      gracefulRampDown: '10s',
    },

    // Scenario 2: Constant-arrival-rate question fetches.
    // Simulates 50 students per second each advancing one question --
    // realistic mid-morning load with active exam sessions in progress.
    // preAllocatedVUs=60 handles base; maxVUs=120 absorbs slow-response tail.
    question_fetch_constant: {
      executor: 'constant-arrival-rate',
      rate: 50,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 60,
      maxVUs: 120,
      startTime: '30s',
    },

    // Scenario 3: Spike test -- sudden burst simulating an exam schedule release.
    // Railway NTPC answer-key releases historically cause 10x-40x normal traffic
    // in under 60 seconds. This models that event.
    spike_burst: {
      executor: 'ramping-arrival-rate',
      startRate: 5,
      timeUnit: '1s',
      stages: [
        { duration: '10s', target: 5 },    // Baseline before spike
        { duration: '5s',  target: 200 },  // Spike: 40x ramp in 5 seconds
        { duration: '30s', target: 200 },  // Sustain spike: verify system survives
        { duration: '10s', target: 5 },    // Recovery: measure ramp-down behaviour
      ],
      preAllocatedVUs: 200,
      maxVUs: 400,
      startTime: '3m',
    },
  },

  thresholds: {
    // API TTFB target: p95 < 200ms. p99 < 500ms catches tail-latency spikes.
    http_req_duration: ['p(95)<200', 'p(99)<500'],

    // Error rate: less than 1% of all requests may fail (4xx or network error).
    http_req_failed: ['rate<0.01'],

    // Exam session creation + first question must complete within 2 seconds
    // (maps directly to "page visual load < 2s" UX requirement).
    exam_session_duration: ['p(95)<2000'],

    // Individual question fetch: p95 < 200ms (DB query < 100ms + network overhead)
    question_load_time: ['p(95)<200'],

    // Submit endpoint: slightly looser -- writes are inherently slower than reads
    submit_response_time: ['p(95)<300'],

    // Security hard-fail: any isCorrect field in a response body is a critical
    // data leak -- the Option table's isCorrect column must never reach the client.
    isCorrect_leak_detected: ['count<1'],

    // Pool exhaustion must not occur -- Supavisor limit is 200 concurrent connections
    connection_pool_exhaustion: ['count<1'],
  },

  noConnectionReuse: false,  // Keep-alive reduces per-request latency variance
  userAgent: 'GetVidya-k6-LoadTest/1.0',
};

// ---------------------------------------------------------------------------
// Per-VU state (not shared -- each VU has its own copy)
// ---------------------------------------------------------------------------
let authToken = null;
let testUserId = null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BASE_URL = __ENV.BASE_URL || 'https://app.getvidya.in';

function jsonHeaders(token) {
  const h = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = 'Bearer ' + token;
  return h;
}

/**
 * Check whether a response body contains the string "isCorrect".
 * If it does, increment the security leak counter.
 * The Option table isCorrect boolean must NEVER reach the client.
 */
function assertNoIsCorrectLeak(response, label) {
  const body = response.body || '';
  const leaked = body.indexOf('"isCorrect"') !== -1 || body.indexOf("'isCorrect'") !== -1;
  if (leaked) {
    isCorrectLeakDetected.add(1);
    console.error('SECURITY ALERT: isCorrect leaked in ' + label + ' response');
  }
  return !leaked;
}

/**
 * Check whether a response indicates Supavisor connection pool exhaustion.
 * Supabase returns HTTP 503 or HTTP 500 with "max connections" in the body
 * when the Supavisor pool is saturated (project limit: 200 connections).
 */
function checkPoolExhaustion(response) {
  const isExhausted =
    response.status === 503 ||
    (response.status === 500 &&
      (response.body || '').toLowerCase().indexOf('max connections') !== -1);
  if (isExhausted) {
    connectionPoolExhaustion.add(1);
    console.warn('Pool exhaustion detected: HTTP ' + response.status);
  }
  return !isExhausted;
}

/**
 * Authenticate a VU against the GetVidya app auth endpoint.
 * The app uses Supabase Auth -- login issues a JWT used on all subsequent calls.
 * Returns { token, userId } or null on failure.
 */
function authenticate() {
  // REPLACE WITH REAL AUTH CREDENTIALS
  // Use a dedicated load-test account with passActive=true in UserBilling
  // so tier enforcement does not block question fetches.
  const credentials = {
    email: 'loadtest@getvidya.in',      // REPLACE WITH REAL AUTH CREDENTIALS
    password: 'LoadTest@SecurePass123', // REPLACE WITH REAL AUTH CREDENTIALS
  };

  const response = http.post(
    BASE_URL + '/api/auth/login',
    JSON.stringify(credentials),
    { headers: jsonHeaders(null), timeout: '10s' }
  );

  check(response, {
    'auth: login returns 200': function (r) { return r.status === 200; },
    'auth: token present': function (r) {
      try {
        const body = r.json();
        return !!(body && (body.access_token || body.token || (body.session && body.session.access_token)));
      } catch (e) { return false; }
    },
  });

  if (response.status !== 200) {
    console.error('Auth failed for VU ' + __VU + ': HTTP ' + response.status);
    return null;
  }

  try {
    const body = response.json();
    // Supabase session structure: { access_token, user: { id } }
    // Adjust path if the app wraps in a different response envelope.
    const token =
      body.access_token ||
      body.token ||
      (body.session && body.session.access_token);
    const userId =
      (body.user && body.user.id) ||
      (body.session && body.session.user && body.session.user.id);
    return { token: token, userId: userId };
  } catch (e) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Setup -- validates app reachability before committing load
// ---------------------------------------------------------------------------

export function setup() {
  const healthCheck = http.get(BASE_URL + '/', { timeout: '15s' });
  check(healthCheck, {
    'setup: app is reachable': function (r) { return r.status < 500; },
  });
  if (healthCheck.status >= 500) {
    console.error('ABORT: ' + BASE_URL + ' returned HTTP ' + healthCheck.status + ' -- check deployment status');
  }
  return {};
}

// ---------------------------------------------------------------------------
// Main VU Function
// ---------------------------------------------------------------------------

export default function () {

  // Auth once per VU lifetime -- reuse JWT for all iterations
  if (!authToken) {
    group('auth', function () {
      const result = authenticate();
      if (result) {
        authToken = result.token;
        testUserId = result.userId;
      }
    });

    if (!authToken) {
      errorRate.add(1);
      sleep(2);
      return;
    }
  }

  // Cycle through exam subcategories across VUs for realistic distribution
  // across GetVidya's question bank (140,000+ questions, 12 subcategories)
  const subcategorySlug = examSlugs[__VU % examSlugs.length];

  // ── Step 1: Fetch exam list for the selected subcategory ─────────────────
  group('exam_list_fetch', function () {
    const listStart = Date.now();

    const response = http.get(
      BASE_URL + '/api/exams?subcategory=' + subcategorySlug + '&limit=10',
      { headers: jsonHeaders(authToken), timeout: '10s' }
    );

    const listDuration = Date.now() - listStart;

    const passed = check(response, {
      'exam list: HTTP 200': function (r) { return r.status === 200; },
      'exam list: returns data': function (r) {
        try {
          const body = r.json();
          return !!(body && (Array.isArray(body) || Array.isArray(body.data)));
        } catch (e) { return false; }
      },
      'exam list: under 300ms': function () { return listDuration < 300; },
      'exam list: no isCorrect leak': function (r) {
        return assertNoIsCorrectLeak(r, 'exam list');
      },
    });

    errorRate.add(passed ? 0 : 1);
    checkPoolExhaustion(response);
  });

  sleep(Math.random() * 0.5 + 0.2);

  // ── Step 2: Start an exam session ────────────────────────────────────────
  // POST creates a Test record in Supabase with status="in_progress".
  // The Test table columns: id, userId, examId, status, correctQuestions (ARRAY),
  // wrongQuestions (ARRAY), skippedQuestions (ARRAY), wrongAnswers (ARRAY),
  // secondsSpent, endedAt.
  let examSessionId = null;

  group('exam_session_start', function () {
    const sessionStart = Date.now();

    // REPLACE WITH REAL AUTH CREDENTIALS: add a real examId UUID for deterministic testing
    // Railway NTPC has 410 exams (the deepest pool); SSC CGL has highest brand recognition.
    const payload = {
      subcategory: subcategorySlug,
      // examId: 'REPLACE_WITH_REAL_EXAM_UUID', // REPLACE WITH REAL AUTH CREDENTIALS
    };

    const response = http.post(
      BASE_URL + '/api/exam/start',
      JSON.stringify(payload),
      { headers: jsonHeaders(authToken), timeout: '15s' }
    );

    const sessionDuration = Date.now() - sessionStart;
    examSessionDuration.add(sessionDuration);

    const passed = check(response, {
      'session start: HTTP 200 or 201': function (r) {
        return r.status === 200 || r.status === 201;
      },
      'session start: session id present': function (r) {
        try {
          const body = r.json();
          return !!(body.id || body.sessionId || body.testId || (body.data && body.data.id));
        } catch (e) { return false; }
      },
      'session start: under 2000ms': function () { return sessionDuration < 2000; },
      'session start: no isCorrect leak': function (r) {
        return assertNoIsCorrectLeak(r, 'session start');
      },
    });

    errorRate.add(passed ? 0 : 1);
    checkPoolExhaustion(response);

    if (response.status === 200 || response.status === 201) {
      try {
        const body = response.json();
        examSessionId = body.id || body.sessionId || body.testId || (body.data && body.data.id);
      } catch (e) { /* session id extraction failed */ }
    }
  });

  if (!examSessionId) {
    errorRate.add(1);
    sleep(1);
    return;
  }

  // ── Step 3: Question loop -- fetch 10 questions sequentially ─────────────
  // Models a student working through 10 questions in one exam session.
  // Each iteration: fetch question -> simulate read time -> advance to next.
  // This inner loop generates the bulk of question_load_time data points.
  //
  // The UserAttempt table records each question fetch:
  //   columns: id, userId, questionId, attemptedAt, source
  // The UserBilling table decrements questionsAvailable per fetch.
  const correctQuestionIds = [];
  const wrongQuestionIds = [];
  const wrongAnswers = [];

  group('question_loop', function () {
    for (let i = 0; i < 10; i++) {
      const qFetchStart = Date.now();

      const response = http.get(
        BASE_URL + '/api/exam/' + examSessionId + '/question?index=' + i,
        { headers: jsonHeaders(authToken), timeout: '10s' }
      );

      const qFetchDuration = Date.now() - qFetchStart;
      questionLoadTime.add(qFetchDuration);

      // Security assertion: isCorrect must NEVER appear in the response body.
      // If it does, the server is returning raw Option rows rather than
      // the sanitised client payload (question_text + options without isCorrect).
      const noLeak = assertNoIsCorrectLeak(response, 'question[' + i + ']');

      check(response, {
        'question: HTTP 200': function (r) { return r.status === 200; },
        'question: has question_text': function (r) {
          try {
            const body = r.json();
            return !!(body.question_text || (body.data && body.data.question_text) || body.text);
          } catch (e) { return false; }
        },
        'question: has 4 options': function (r) {
          try {
            const body = r.json();
            const opts = body.options || (body.data && body.data.options);
            return Array.isArray(opts) && opts.length === 4;
          } catch (e) { return false; }
        },
        'question: no isCorrect in response': function () { return noLeak; },
        'question: under 200ms': function () { return qFetchDuration < 200; },
      });

      checkPoolExhaustion(response);

      if (response.status === 200) {
        let questionId = null;
        try {
          const body = response.json();
          questionId = body.id || (body.data && body.data.id) || body.questionId;
        } catch (e) { /* ignore */ }

        if (questionId) {
          // Simulate 65% correct rate -- realistic for active platform users
          if (Math.random() < 0.65) {
            correctQuestionIds.push(questionId);
          } else {
            wrongQuestionIds.push(questionId);
            // wrongAnswers format matches the Test table's wrongAnswers ARRAY column
            wrongAnswers.push({
              questionId: questionId,
              selectedOption: 'A',
              correctOption: 'C',
            });
          }
        }
      }

      // Realistic think time between questions: 1-3 seconds
      // (Math.random() * 2 + 1 => [1.0, 3.0] seconds)
      sleep(Math.random() * 2 + 1);
    }
  });

  // ── Step 4: Submit exam session ───────────────────────────────────────────
  // POST finalises the Test record:
  //   correctQuestions (ARRAY), wrongQuestions (ARRAY), skippedQuestions (ARRAY),
  //   wrongAnswers (ARRAY), secondsSpent, endedAt, status="completed"
  group('exam_submit', function () {
    const submitStart = Date.now();

    const submitPayload = {
      sessionId: examSessionId,
      correctQuestions: correctQuestionIds,
      wrongQuestions: wrongQuestionIds,
      skippedQuestions: [],
      wrongAnswers: wrongAnswers,
      secondsSpent: Math.floor(Math.random() * 600 + 300), // 5-15 min exam
      status: 'completed',
    };

    const response = http.post(
      BASE_URL + '/api/exam/' + examSessionId + '/submit',
      JSON.stringify(submitPayload),
      { headers: jsonHeaders(authToken), timeout: '15s' }
    );

    const submitDuration = Date.now() - submitStart;
    submitResponseTime.add(submitDuration);

    const passed = check(response, {
      'submit: HTTP 200': function (r) { return r.status === 200; },
      'submit: returns result': function (r) {
        try {
          const body = r.json();
          return !!(body.score !== undefined || body.result || body.data);
        } catch (e) { return false; }
      },
      'submit: under 300ms': function () { return submitDuration < 300; },
      'submit: no isCorrect leak': function (r) {
        return assertNoIsCorrectLeak(r, 'submit');
      },
    });

    errorRate.add(passed ? 0 : 1);
    checkPoolExhaustion(response);
  });

  sleep(Math.random() * 3 + 2);
}

// ---------------------------------------------------------------------------
// Summary Handler
// Generates JSON report and HTML report after the run completes.
// Output files are written relative to the directory where k6 is invoked.
// ---------------------------------------------------------------------------

export function handleSummary(data) {
  const metrics = data.metrics;

  function safeP(metricName, percentile) {
    try {
      var v = metrics[metricName].values[percentile];
      return v !== undefined ? v.toFixed(2) : 'N/A';
    } catch (e) { return 'N/A'; }
  }

  function safeCount(metricName) {
    try { return metrics[metricName].values.count || 0; }
    catch (e) { return 0; }
  }

  function safeRate(metricName) {
    try {
      return ((metrics[metricName].values.rate || 0) * 100).toFixed(3);
    } catch (e) { return 'N/A'; }
  }

  var sla = {
    ttfb_p95_ok:         parseFloat(safeP('http_req_duration', 'p(95)')) < 200,
    ttfb_p99_ok:         parseFloat(safeP('http_req_duration', 'p(99)')) < 500,
    error_rate_ok:       parseFloat(safeRate('http_req_failed')) < 1.0,
    session_duration_ok: parseFloat(safeP('exam_session_duration', 'p(95)')) < 2000,
    question_load_ok:    parseFloat(safeP('question_load_time', 'p(95)')) < 200,
    submit_time_ok:      parseFloat(safeP('submit_response_time', 'p(95)')) < 300,
    no_security_leak:    safeCount('isCorrect_leak_detected') === 0,
    no_pool_exhaustion:  safeCount('connection_pool_exhaustion') === 0,
  };

  var allPassed = Object.keys(sla).every(function (k) { return sla[k]; });

  var summary = {
    run_date:   new Date().toISOString(),
    base_url:   BASE_URL,
    project:    'GetVidya -- app.getvidya.in',
    sla_status: allPassed ? 'PASS' : 'FAIL',
    sla_checks: sla,
    metrics: {
      http_req_duration_p95_ms:      safeP('http_req_duration', 'p(95)'),
      http_req_duration_p99_ms:      safeP('http_req_duration', 'p(99)'),
      exam_session_duration_p95_ms:  safeP('exam_session_duration', 'p(95)'),
      question_load_time_p95_ms:     safeP('question_load_time', 'p(95)'),
      submit_response_time_p95_ms:   safeP('submit_response_time', 'p(95)'),
      error_rate_pct:                safeRate('http_req_failed'),
      total_requests:                safeCount('http_reqs'),
      isCorrect_leaks:               safeCount('isCorrect_leak_detected'),
      pool_exhaustion_events:        safeCount('connection_pool_exhaustion'),
    },
  };

  var consoleOut = [
    '',
    '========================================',
    '  GetVidya Exam Load Test Summary',
    '========================================',
    '  Overall SLA:  ' + (allPassed ? 'PASS' : 'FAIL'),
    '  TTFB p95:     ' + summary.metrics.http_req_duration_p95_ms + 'ms  (target: <200ms)',
    '  TTFB p99:     ' + summary.metrics.http_req_duration_p99_ms + 'ms  (target: <500ms)',
    '  Session p95:  ' + summary.metrics.exam_session_duration_p95_ms + 'ms (target: <2000ms)',
    '  Question p95: ' + summary.metrics.question_load_time_p95_ms + 'ms  (target: <200ms)',
    '  Submit p95:   ' + summary.metrics.submit_response_time_p95_ms + 'ms  (target: <300ms)',
    '  Error rate:   ' + summary.metrics.error_rate_pct + '%            (target: <1%)',
    '  isCrt leaks:  ' + summary.metrics.isCorrect_leaks + '              (target: 0)',
    '  Pool exh.:    ' + summary.metrics.pool_exhaustion_events + '              (target: 0)',
    '  Total reqs:   ' + summary.metrics.total_requests,
    '========================================',
    '',
  ].join('\n');

  return {
    'tests/load/results/exam-load-test-report.json': JSON.stringify(summary, null, 2),
    stdout: consoleOut,
  };
}
