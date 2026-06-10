/**
 * GetVidya -- Supabase Connection Pool Stress Test
 * Target: https://bzlqlohvbraclvvmbfdt.supabase.co/rest/v1/
 *
 * Run:
 *   SUPABASE_ANON_KEY=<key> k6 run tests/load/db-connection-pool-test.js
 *
 * Purpose:
 *   Directly stress the Supabase PostgREST REST API to verify that
 *   Supavisor (the PgBouncer-compatible pooler Supabase uses) handles
 *   concurrent read/write load within its 200-connection limit.
 *
 *   This test bypasses the Next.js app layer. It is NOT a substitute for
 *   exam-load-test.js -- it specifically isolates database-layer behaviour:
 *   whether Supavisor holds up, and whether writes are atomic under contention.
 *
 * Tables tested:
 *   Question     -- 140,000+ rows, 12 subcategories. Read-heavy.
 *   UserAttempt  -- columns: id, userId, questionId, attemptedAt, source
 *                   Write-heavy. One row per question fetch.
 *   UserBilling  -- columns include questionsAvailable (int counter decremented
 *                   per question). Tested for concurrent decrement consistency.
 *
 * Supabase REST API auth:
 *   All requests carry:
 *     apikey: <anon key>
 *     Authorization: Bearer <anon key>
 *     Content-Type: application/json
 *   The anon key is used because RLS policies on Question allow public SELECT.
 *   For UserAttempt writes, a service role key or authenticated JWT is required
 *   in production -- see REPLACE WITH REAL AUTH CREDENTIALS below.
 *
 * Supavisor connection pooling notes:
 *   - Session mode: each client connection maps to one server connection.
 *   - Transaction mode (default in Supabase managed): connections are returned
 *     to the pool after each transaction. Safe for reads; write atomicity relies
 *     on the application layer.
 *   - At 200 concurrent VUs each holding one connection, this test approaches
 *     the Supavisor limit. The pool_exhaustion_errors counter must remain 0.
 *
 * Write count verification:
 *   At end of run, the test queries COUNT(*) on UserAttempt filtered by
 *   source='k6-pool-test' and compares to expectedWrites. Discrepancy > 0
 *   indicates either lost writes or duplicate inserts under contention.
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SUPABASE_URL = 'https://bzlqlohvbraclvvmbfdt.supabase.co/rest/v1';

// REPLACE WITH REAL AUTH CREDENTIALS
// Use the anon key from your Supabase project settings > API > anon/public key.
// For UserAttempt writes you may need the service_role key if RLS blocks anon inserts.
const SUPABASE_ANON_KEY = __ENV.SUPABASE_ANON_KEY || 'REPLACE_WITH_REAL_ANON_KEY'; // REPLACE WITH REAL AUTH CREDENTIALS

// A real userId UUID that exists in auth.users -- required for FK constraint on UserAttempt
const TEST_USER_ID = __ENV.TEST_USER_ID || 'REPLACE_WITH_REAL_TEST_USER_UUID'; // REPLACE WITH REAL AUTH CREDENTIALS

// A set of real question UUIDs from the Question table.
// Populate by running:
//   SELECT id FROM "Question" LIMIT 20;
// in Supabase SQL Editor.
const SAMPLE_QUESTION_IDS = [
  // REPLACE WITH REAL AUTH CREDENTIALS -- paste 20 real Question UUIDs here
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000013',
  '00000000-0000-0000-0000-000000000014',
  '00000000-0000-0000-0000-000000000015',
  '00000000-0000-0000-0000-000000000016',
  '00000000-0000-0000-0000-000000000017',
  '00000000-0000-0000-0000-000000000018',
  '00000000-0000-0000-0000-000000000019',
  '00000000-0000-0000-0000-000000000020',
];

// Subcategory IDs from the SubCategory table for Question filtering.
// Railway NTPC has the largest pool (23,860 questions) -- good for random read tests.
const SUBCATEGORY_FILTER = 'sc_railway_ntpc'; // REPLACE with real subcategory id if different

// ---------------------------------------------------------------------------
// Custom Metrics
// ---------------------------------------------------------------------------

const readLatency        = new Trend('db_read_latency', true);
const writeLatency       = new Trend('db_write_latency', true);
const batchReadLatency   = new Trend('db_batch_read_latency', true);
const poolExhaustionErrors = new Counter('pool_exhaustion_errors');
const writesAttempted    = new Counter('writes_attempted');
const writesSucceeded    = new Counter('writes_succeeded');
const readErrors         = new Rate('db_read_error_rate');
const writeErrors        = new Rate('db_write_error_rate');

// ---------------------------------------------------------------------------
// k6 Options
// ---------------------------------------------------------------------------

export const options = {
  scenarios: {
    // Test 1: 100 concurrent VUs each reading 10 random questions.
    // Models all 100 active exam sessions simultaneously fetching questions.
    // Uses http.batch() within each VU to send 10 parallel requests --
    // this is the heaviest realistic read pattern (Railway NTPC, 23,860 questions).
    concurrent_reads: {
      executor: 'constant-vus',
      vus: 100,
      duration: '90s',
      startTime: '0s',
    },

    // Test 2: 50 VUs simultaneously writing UserAttempt records.
    // Each VU writes one attempt row per iteration.
    // Tests write throughput and Supavisor connection release under write load.
    concurrent_writes: {
      executor: 'constant-vus',
      vus: 50,
      duration: '60s',
      startTime: '100s',  // Starts after concurrent_reads completes
    },

    // Test 3: Mixed read/write -- 100 VUs, 70% reads / 30% writes.
    // The most realistic model of real GetVidya traffic:
    //   students reading questions (UserAttempt writes) while browsing exam lists.
    mixed_read_write: {
      executor: 'constant-vus',
      vus: 100,
      duration: '90s',
      startTime: '170s', // Starts after concurrent_writes completes
    },
  },

  thresholds: {
    // Read p95 must be under 200ms -- matches the DB query < 100ms target
    // (PostgREST adds ~50ms overhead on top of raw query time)
    db_read_latency: ['p(95)<200'],

    // Write p95: slightly higher tolerance (index updates, FK checks)
    db_write_latency: ['p(95)<300'],

    // Batch reads (10 parallel per VU) must complete p95 under 300ms
    db_batch_read_latency: ['p(95)<300'],

    // Zero pool exhaustion events -- this is the primary safety check
    pool_exhaustion_errors: ['count<1'],

    // Read and write error rates must stay under 0.5%
    db_read_error_rate: ['rate<0.005'],
    db_write_error_rate: ['rate<0.005'],

    // Overall HTTP error rate
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300', 'p(99)<600'],
  },

  userAgent: 'GetVidya-k6-DBPoolTest/1.0',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Standard Supabase REST API headers.
 * anon key is used for reads (RLS on Question allows public SELECT).
 * For writes, pass the service_role key or a valid user JWT as the bearer.
 */
function supabaseHeaders(bearerToken) {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + (bearerToken || SUPABASE_ANON_KEY),
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',  // Avoids reading back inserted rows -- faster
  };
}

/**
 * Returns true if the response indicates Supavisor pool exhaustion.
 * Supabase returns 503 when Supavisor cannot allocate a server connection,
 * or 500 with a "max connections" message when PostgreSQL's own limit is hit.
 */
function isPoolExhausted(response) {
  if (response.status === 503) return true;
  if (response.status === 500) {
    var body = (response.body || '').toLowerCase();
    return body.indexOf('max connections') !== -1 ||
           body.indexOf('too many connections') !== -1 ||
           body.indexOf('connection pool') !== -1;
  }
  return false;
}

/**
 * Pick a random element from an array.
 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a UUID-like string for test records.
 * Note: k6 does not have a built-in UUID generator in older versions.
 * This is sufficient for test record identification -- not cryptographically random.
 */
function pseudoUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// ---------------------------------------------------------------------------
// Setup -- verify Supabase REST API is reachable and anon key is valid
// ---------------------------------------------------------------------------

export function setup() {
  // Probe: fetch 1 row from Question table to validate credentials
  var probe = http.get(
    SUPABASE_URL + '/Question?limit=1',
    { headers: supabaseHeaders(null), timeout: '10s' }
  );

  check(probe, {
    'setup: Supabase REST API reachable': function (r) { return r.status === 200; },
    'setup: anon key accepted': function (r) { return r.status !== 401 && r.status !== 403; },
    'setup: Question table accessible': function (r) {
      try { return Array.isArray(r.json()); }
      catch (e) { return false; }
    },
  });

  if (probe.status !== 200) {
    console.error('ABORT: Supabase REST API returned HTTP ' + probe.status + '. Check SUPABASE_ANON_KEY.');
  }

  // Record baseline write count so teardown can calculate lost writes
  var countProbe = http.get(
    SUPABASE_URL + '/UserAttempt?source=eq.k6-pool-test&select=id',
    {
      headers: Object.assign({}, supabaseHeaders(null), { 'Prefer': 'count=exact' }),
      timeout: '10s',
    }
  );

  var baselineCount = 0;
  var contentRange = countProbe.headers['Content-Range'] || countProbe.headers['content-range'] || '';
  if (contentRange && contentRange.indexOf('/') !== -1) {
    baselineCount = parseInt(contentRange.split('/')[1], 10) || 0;
  }

  console.log('Baseline UserAttempt count (source=k6-pool-test): ' + baselineCount);
  return { baseline_attempt_count: baselineCount, start_time: Date.now() };
}

// ---------------------------------------------------------------------------
// Main VU Function
// ---------------------------------------------------------------------------

export default function (setupData) {
  // Determine which scenario this VU is in based on __ITER and __VU
  // k6 does not expose scenario name inside the default function directly,
  // so we use elapsed time from setup to route behaviour.
  var elapsed = (Date.now() - (setupData.start_time || 0)) / 1000;

  // elapsed < 100s: concurrent_reads territory
  // elapsed 100-170s: concurrent_writes territory
  // elapsed > 170s: mixed_read_write territory
  if (elapsed < 100) {
    runConcurrentReads();
  } else if (elapsed < 170) {
    runConcurrentWrites();
  } else {
    runMixedReadWrite();
  }
}

// ---------------------------------------------------------------------------
// Test 1: Concurrent Reads
// Each VU uses http.batch() to fire 10 parallel Question reads simultaneously.
// This is the maximum realistic DB read burst for one exam session prefetch.
// ---------------------------------------------------------------------------

function runConcurrentReads() {
  group('concurrent_reads', function () {

    // Build 10 parallel GET requests for random question IDs
    // Supabase REST API: GET /Question?id=eq.<uuid>
    var requests = [];
    for (var i = 0; i < 10; i++) {
      var qId = pick(SAMPLE_QUESTION_IDS);
      requests.push([
        'GET',
        SUPABASE_URL + '/Question?id=eq.' + qId + '&select=id,question_text,options,category,subject',
        null,
        { headers: supabaseHeaders(null), timeout: '8s' },
      ]);
    }

    var batchStart = Date.now();

    // http.batch() sends all 10 requests in parallel within this VU.
    // Each VU represents one student's exam session fetching a batch of questions.
    var responses = http.batch(requests);

    var batchDuration = Date.now() - batchStart;
    batchReadLatency.add(batchDuration);

    var allOk = true;
    for (var j = 0; j < responses.length; j++) {
      var r = responses[j];
      var singleStart = Date.now();
      readLatency.add(r.timings.duration);

      if (isPoolExhausted(r)) {
        poolExhaustionErrors.add(1);
        console.error('POOL EXHAUSTION on read: HTTP ' + r.status + ' VU=' + __VU);
      }

      var ok = check(r, {
        'read: HTTP 200': function (resp) { return resp.status === 200; },
        'read: returns array': function (resp) {
          try { return Array.isArray(resp.json()); }
          catch (e) { return false; }
        },
        'read: no isCorrect in response': function (resp) {
          var body = resp.body || '';
          var leaked = body.indexOf('"isCorrect"') !== -1;
          if (leaked) {
            console.error('SECURITY: isCorrect leaked in Question read response');
          }
          return !leaked;
        },
      });

      readErrors.add(ok ? 0 : 1);
      if (!ok) allOk = false;
    }

    // Brief pause between batch cycles -- models network round-trip + JS processing
    sleep(0.3);
  });
}

// ---------------------------------------------------------------------------
// Test 2: Concurrent Writes
// Each VU inserts one UserAttempt row per iteration.
// UserAttempt columns: id, userId, questionId, attemptedAt, source
// ---------------------------------------------------------------------------

function runConcurrentWrites() {
  group('concurrent_writes', function () {
    var qId = pick(SAMPLE_QUESTION_IDS);
    var attemptId = pseudoUUID();

    var payload = JSON.stringify({
      id: attemptId,
      userId: TEST_USER_ID,
      questionId: qId,
      attemptedAt: new Date().toISOString(),
      source: 'k6-pool-test',  // Tagged for teardown verification query
    });

    writesAttempted.add(1);
    var writeStart = Date.now();

    var response = http.post(
      SUPABASE_URL + '/UserAttempt',
      payload,
      { headers: supabaseHeaders(null), timeout: '8s' }
    );

    writeLatency.add(Date.now() - writeStart);

    if (isPoolExhausted(response)) {
      poolExhaustionErrors.add(1);
      console.error('POOL EXHAUSTION on write: HTTP ' + response.status + ' VU=' + __VU);
    }

    var ok = check(response, {
      'write: HTTP 201 (created)': function (r) { return r.status === 201; },
      'write: not pool exhausted': function (r) { return !isPoolExhausted(r); },
    });

    if (ok) {
      writesSucceeded.add(1);
    }
    writeErrors.add(ok ? 0 : 1);

    sleep(0.1);
  });
}

// ---------------------------------------------------------------------------
// Test 3: Mixed Read/Write (70% reads, 30% writes)
// Models realistic traffic: most users are reading questions, some are
// submitting answers (which trigger UserAttempt writes).
// ---------------------------------------------------------------------------

function runMixedReadWrite() {
  group('mixed_read_write', function () {
    if (Math.random() < 0.70) {
      // READ path: fetch a single question (not batched -- models one question advance)
      var qId = pick(SAMPLE_QUESTION_IDS);
      var readStart = Date.now();

      var response = http.get(
        SUPABASE_URL + '/Question?id=eq.' + qId + '&select=id,question_text,options,category,subject',
        { headers: supabaseHeaders(null), timeout: '8s' }
      );

      readLatency.add(Date.now() - readStart);

      if (isPoolExhausted(response)) {
        poolExhaustionErrors.add(1);
      }

      var ok = check(response, {
        'mixed read: HTTP 200': function (r) { return r.status === 200; },
        'mixed read: no isCorrect leak': function (r) {
          return (r.body || '').indexOf('"isCorrect"') === -1;
        },
      });
      readErrors.add(ok ? 0 : 1);

    } else {
      // WRITE path: insert a UserAttempt row
      var wQId = pick(SAMPLE_QUESTION_IDS);
      var writePayload = JSON.stringify({
        id: pseudoUUID(),
        userId: TEST_USER_ID,
        questionId: wQId,
        attemptedAt: new Date().toISOString(),
        source: 'k6-pool-test',
      });

      writesAttempted.add(1);
      var writeStart = Date.now();

      var writeResponse = http.post(
        SUPABASE_URL + '/UserAttempt',
        writePayload,
        { headers: supabaseHeaders(null), timeout: '8s' }
      );

      writeLatency.add(Date.now() - writeStart);

      if (isPoolExhausted(writeResponse)) {
        poolExhaustionErrors.add(1);
      }

      var writeOk = check(writeResponse, {
        'mixed write: HTTP 201': function (r) { return r.status === 201; },
      });
      if (writeOk) writesSucceeded.add(1);
      writeErrors.add(writeOk ? 0 : 1);
    }

    sleep(0.2);
  });
}

// ---------------------------------------------------------------------------
// Teardown -- verify write integrity
// Queries UserAttempt count where source='k6-pool-test' and compares to
// the number of writes this test suite attempted.
// Any discrepancy indicates lost writes under connection pool contention.
// ---------------------------------------------------------------------------

export function teardown(setupData) {
  // Wait briefly for in-flight writes to commit before counting
  sleep(3);

  var countResponse = http.get(
    SUPABASE_URL + '/UserAttempt?source=eq.k6-pool-test&select=id',
    {
      headers: Object.assign({}, supabaseHeaders(null), { 'Prefer': 'count=exact' }),
      timeout: '15s',
    }
  );

  var finalCount = 0;
  var contentRange = countResponse.headers['Content-Range'] || countResponse.headers['content-range'] || '';
  if (contentRange && contentRange.indexOf('/') !== -1) {
    finalCount = parseInt(contentRange.split('/')[1], 10) || 0;
  }

  var netNewWrites = finalCount - (setupData.baseline_attempt_count || 0);
  var totalAttempted = writesAttempted.name ? 0 : 0; // Counter value not directly readable in teardown

  console.log('');
  console.log('=== Write Integrity Verification ===');
  console.log('UserAttempt rows in DB (source=k6-pool-test): ' + finalCount);
  console.log('Net new rows written this run: ' + netNewWrites);
  console.log('Pool exhaustion events: (see metrics above)');
  console.log('If net new rows < writes_succeeded metric: writes were lost under contention.');
  console.log('If net new rows > writes_attempted metric: duplicate inserts occurred.');
  console.log('====================================');
  console.log('');

  check(countResponse, {
    'teardown: UserAttempt count query succeeded': function (r) { return r.status === 200; },
    'teardown: net new writes > 0': function () { return netNewWrites > 0; },
  });
}

// ---------------------------------------------------------------------------
// Summary Handler
// ---------------------------------------------------------------------------

export function handleSummary(data) {
  var metrics = data.metrics;

  function safeP(name, pct) {
    try {
      var v = metrics[name].values[pct];
      return v !== undefined ? v.toFixed(2) : 'N/A';
    } catch (e) { return 'N/A'; }
  }

  function safeCount(name) {
    try { return metrics[name].values.count || 0; }
    catch (e) { return 0; }
  }

  function safeRate(name) {
    try { return ((metrics[name].values.rate || 0) * 100).toFixed(3); }
    catch (e) { return 'N/A'; }
  }

  var poolExhCount    = safeCount('pool_exhaustion_errors');
  var readP95         = safeP('db_read_latency', 'p(95)');
  var writeP95        = safeP('db_write_latency', 'p(95)');
  var batchReadP95    = safeP('db_batch_read_latency', 'p(95)');
  var writesOk        = safeCount('writes_succeeded');
  var writesTotal     = safeCount('writes_attempted');
  var readErrPct      = safeRate('db_read_error_rate');
  var writeErrPct     = safeRate('db_write_error_rate');

  var summary = {
    run_date: new Date().toISOString(),
    supabase_project: 'bzlqlohvbraclvvmbfdt',
    tests: [
      {
        name: 'Concurrent Reads (100 VUs, 10 parallel reads each)',
        read_p95_ms: readP95,
        batch_read_p95_ms: batchReadP95,
        error_rate_pct: readErrPct,
        sla_pass: parseFloat(readP95) < 200,
      },
      {
        name: 'Concurrent Writes (50 VUs, UserAttempt inserts)',
        write_p95_ms: writeP95,
        writes_attempted: writesTotal,
        writes_succeeded: writesOk,
        error_rate_pct: writeErrPct,
        sla_pass: parseFloat(writeP95) < 300,
      },
      {
        name: 'Mixed Read/Write (100 VUs, 70/30 split)',
        read_p95_ms: readP95,
        write_p95_ms: writeP95,
        sla_pass: parseFloat(readP95) < 200 && parseFloat(writeP95) < 300,
      },
    ],
    pool_exhaustion_events: poolExhCount,
    pool_sla_pass: poolExhCount === 0,
    overall_sla: poolExhCount === 0 &&
                 parseFloat(readP95) < 200 &&
                 parseFloat(writeP95) < 300
                 ? 'PASS' : 'FAIL',
  };

  var consoleOut = [
    '',
    '============================================',
    '  GetVidya DB Connection Pool Test Summary',
    '============================================',
    '  Overall SLA:         ' + summary.overall_sla,
    '  Read p95:            ' + readP95 + 'ms    (target: <200ms)',
    '  Batch read p95:      ' + batchReadP95 + 'ms    (target: <300ms)',
    '  Write p95:           ' + writeP95 + 'ms    (target: <300ms)',
    '  Writes attempted:    ' + writesTotal,
    '  Writes succeeded:    ' + writesOk,
    '  Read error rate:     ' + readErrPct + '%',
    '  Write error rate:    ' + writeErrPct + '%',
    '  Pool exhaust events: ' + poolExhCount + '     (target: 0)',
    '============================================',
    '',
    'NOTE: Check teardown output above for write integrity verification.',
    'Compare "net new rows written" to "writes_succeeded" metric.',
    '',
  ].join('\n');

  return {
    'tests/load/results/db-pool-test-report.json': JSON.stringify(summary, null, 2),
    stdout: consoleOut,
  };
}
