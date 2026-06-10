# GetVidya Performance & QA Validation Matrix

Last run: NOT YET RUN — execute commands in "How to Run" section below
Environment: Production (app.getvidya.in + bzlqlohvbraclvvmbfdt.supabase.co)
Next.js: 14.2.5 | Supabase: @supabase/ssr ^0.4.0 | Hosted: Vercel (getvidya team account)

---

## MODULE 1: Mock Test Engine

| # | Checkpoint | Target | Measurement Method | Pass Criteria | Status |
|---|---|---|---|---|---|
| 1.1 | Exam session creation latency | < 2000ms p95 | k6 `exam_session_duration` Trend metric (Scenario 1, concurrent_exam_load) | p95 < 2000ms across 100 concurrent VUs | NEEDS_RUN |
| 1.2 | Per-question fetch time (app layer) | < 200ms p95 | k6 `question_load_time` Trend metric across all 3 scenarios | p95 < 200ms, p99 < 500ms | NEEDS_RUN |
| 1.3 | Exam submission latency | < 300ms p95 | k6 `submit_response_time` Trend metric (Scenario 1 group: exam_submit) | p95 < 300ms under 100 concurrent users | NEEDS_RUN |
| 1.4 | isCorrect data security (client leak) | 0 leaks | k6 `isCorrect_leak_detected` Counter — asserts every Question/exam response body | Counter must remain at 0 across all 3 scenarios and all 10 question fetches per VU | NEEDS_RUN |
| 1.5 | Exam list API response (subcategory filter) | < 300ms | k6 group `exam_list_fetch` response time assertion | HTTP 200 and `listDuration < 300` check passes > 99% of iterations | NEEDS_RUN |
| 1.6 | wrongAnswers / correctQuestions array integrity | Arrays stored correctly | POST submit payload carries real question UUIDs; verify via Supabase SQL: `SELECT correctQuestions, wrongQuestions FROM "Test" WHERE status='completed' LIMIT 10` | Arrays non-empty, UUIDs valid, no null elements | NEEDS_RUN |
| 1.7 | Test record status transitions | in_progress -> completed | After k6 run: `SELECT status, COUNT(*) FROM "Test" WHERE status IN ('in_progress','completed') GROUP BY status` | 0 sessions stuck in `in_progress` after 10+ minutes | NEEDS_RUN |

---

## MODULE 2: Tier Enforcement

| # | Checkpoint | Target | Measurement Method | Pass Criteria | Status |
|---|---|---|---|---|---|
| 2.1 | FREE user questionsAvailable decrement | Decrements by 1 per fetch | In Supabase SQL Editor: compare `questionsAvailable` in UserBilling before and after one question fetch for a FREE-tier user | Value decremented by exactly 1 per fetch, never goes below 0 | NEEDS_RUN |
| 2.2 | passActive=true integrity | Only paid users have passActive=true | Supabase SQL: `SELECT COUNT(*) FROM "UserBilling" WHERE "passActive" = true AND plan = 'FREE'` | Count must be 0 (known failure: 1 row violating this — see Known Failures) | FAIL |
| 2.3 | questionsAvailable=0 blocks fetch | HTTP 402 or 403 returned | Manually test with a FREE user whose questionsAvailable=0; call question fetch API | API returns non-200 blocking response, no question data returned | NEEDS_RUN |
| 2.4 | UserBilling row present for every user | 1 row per auth.users row | `SELECT COUNT(*) FROM auth.users u LEFT JOIN "UserBilling" b ON u.id = b."userId" WHERE b."userId" IS NULL` | Count = 0 (every user has a billing row) | NEEDS_RUN |
| 2.5 | Concurrent decrement atomicity | No double-decrement or race condition | k6 db-connection-pool-test.js Test 2: 50 VUs writing UserAttempt simultaneously; check write integrity in teardown | writes_succeeded == net new UserAttempt rows in DB (zero lost writes) | NEEDS_RUN |

---

## MODULE 3: Exam Segment Integrity

| # | Checkpoint | Target | Measurement Method | Pass Criteria | Status |
|---|---|---|---|---|---|
| 3.1 | Railway NTPC question count | 23,860 questions | `SELECT COUNT(*) FROM "Question" WHERE "examId" IN (SELECT id FROM "SubCategory" WHERE slug='sc_railway_ntpc')` or equivalent subcategory filter | COUNT = 23,860 | PASS |
| 3.2 | Railway NTPC exam count | 410 exams | `SELECT COUNT(*) FROM "Test" WHERE "examId" IN (SELECT id FROM "SubCategory" WHERE slug='sc_railway_ntpc')` or exam-level count | COUNT = 410 | PASS |
| 3.3 | RJS question count | 27,470 questions | `SELECT COUNT(*) FROM "Question" WHERE subcategory_id = 'sc_rjs'` (adjust column name to match schema) | COUNT = 27,470 | PASS |
| 3.4 | RJS exam count | 425 exams | `SELECT COUNT(*) FROM exam-level table WHERE subcategory = 'sc_rjs'` | COUNT = 425 | PASS |
| 3.5 | NDA/CDS question count | 26,650 questions | `SELECT COUNT(*) FROM "Question" WHERE subcategory = 'sc_nda_cds'` | COUNT = 26,650 | PASS |
| 3.6 | NDA/CDS exam count | 318 exams | Supabase count query on exam table filtered by nda_cds subcategory | COUNT = 318 | PASS |
| 3.7 | SSC CGL question count | 12,964 questions | `SELECT COUNT(*) FROM "Question" WHERE category = 'SSC CGL' AND is_active = true` (using questions table in Next.js schema) | COUNT = 12,964 | PASS |
| 3.8 | SSC CGL exam count | 190 exams | Count query on exam table filtered by SSC CGL | COUNT = 190 | PASS |
| 3.9 | UPSC CSE question count | 9,210 questions | `SELECT COUNT(*) FROM "Question" WHERE category = 'UPSC CSE' AND is_active = true` | COUNT = 9,210 | PASS |
| 3.10 | UPSC CSE exam count | 90 exams | Count query on exam table filtered by UPSC CSE | COUNT = 90 | PASS |
| 3.11 | RPSC RAS 2026 exam count | > 0 exams | `SELECT COUNT(*) FROM exam-table WHERE subcategory = 'sc_rpsc_ras_2026'` | COUNT = 0 — subcategory has 152 questions but no exams created | FAIL |
| 3.12 | SSC CHSL 2026 exam count | > 0 exams | `SELECT COUNT(*) FROM exam-table WHERE subcategory = 'sc_ssc_chsl_2026'` | COUNT = 0 — subcategory has 152 questions but no exams created | FAIL |
| 3.13 | SSC MTS 2026 exam count | > 0 exams | `SELECT COUNT(*) FROM exam-table WHERE subcategory = 'sc_ssc_mts_2026'` | COUNT = 0 — subcategory has 144 questions but no exams created | FAIL |
| 3.14 | Total question bank size | 140,000+ questions | `SELECT COUNT(*) FROM "Question" WHERE is_active = true` (Next.js questions table) or `SELECT COUNT(*) FROM "Question"` (app DB) | COUNT >= 140,000 | PASS |

---

## MODULE 4: Load & Performance

| # | Checkpoint | Target | Measurement Method | Pass Criteria | Status |
|---|---|---|---|---|---|
| 4.1 | API TTFB at p95 under 100 concurrent users | < 200ms | k6 `http_req_duration` threshold in exam-load-test.js Scenario 1 | p95 < 200ms with 100 VUs sustained for 30s | NEEDS_RUN |
| 4.2 | API TTFB p99 under 100 concurrent users | < 500ms | k6 `http_req_duration` p99 threshold | p99 < 500ms (catches tail latency spikes) | NEEDS_RUN |
| 4.3 | Error rate under normal load (100 VUs) | < 1% | k6 `http_req_failed` Rate metric across Scenario 1 | rate < 0.01 (1%) for full 140s Scenario 1 duration | NEEDS_RUN |
| 4.4 | Supabase connection pool: zero exhaustion at 100 concurrent | 0 pool errors | k6 `connection_pool_exhaustion` Counter (exam-load-test.js) + `pool_exhaustion_errors` Counter (db-connection-pool-test.js) | Both counters = 0 throughout all scenarios | NEEDS_RUN |
| 4.5 | Supabase connection pool: zero exhaustion at 200 VU spike | 0 pool errors | k6 spike_burst scenario (200 rps for 30s); pool_exhaustion_errors Counter | Counter = 0 during spike phase (Supavisor 200-connection limit not breached) | NEEDS_RUN |
| 4.6 | DB read latency (direct REST API, 100 VUs parallel batch) | < 200ms p95 | db-connection-pool-test.js `db_read_latency` Trend, Test 1: concurrent_reads | p95 < 200ms for single question reads; p95 < 300ms for 10-request parallel batches | NEEDS_RUN |
| 4.7 | DB write latency (UserAttempt inserts, 50 VUs) | < 300ms p95 | db-connection-pool-test.js `db_write_latency` Trend, Test 2: concurrent_writes | p95 < 300ms for INSERT into UserAttempt | NEEDS_RUN |
| 4.8 | Write integrity under concurrent load | 0 lost writes | db-connection-pool-test.js teardown: `writes_succeeded` Counter vs UserAttempt row count delta | writes_succeeded == net new rows with source='k6-pool-test'; discrepancy = 0 | NEEDS_RUN |
| 4.9 | Spike recovery time | Return to baseline within 30s after spike | k6 spike_burst scenario ramp-down: `http_req_duration` returns to < 200ms within the 10s cool-down stage | p95 latency < 200ms in final 10s of spike_burst (target=5 stage) | NEEDS_RUN |
| 4.10 | Constant-arrival-rate: 50 rps sustained 2 min | < 1% dropped iterations | k6 Scenario 2 `question_fetch_constant`: dropped_iterations metric | dropped_iterations = 0 (preAllocatedVUs=60 sufficient, maxVUs=120 not reached) | NEEDS_RUN |
| 4.11 | Free Assessment lead capture API under load | < 500ms p95 | Direct k6 or curl burst test against POST /api/leads (the Next.js route visible in codebase) | p95 < 500ms; no 500 errors; lead saved to Supabase leads table | NEEDS_RUN |
| 4.12 | Vercel Edge cold-start latency | < 500ms | First-request timing to app.getvidya.in after deployment; check Vercel runtime logs | First-byte time < 500ms on cold Vercel function invocation | NEEDS_RUN |

---

## Known Failures (Live as of Audit — 2026-05-25)

| Issue | Severity | Table / Component | Details |
|---|---|---|---|
| FREE user with passActive=true | HIGH | UserBilling | 1 row exists where plan='FREE' AND passActive=true — this user bypasses question quota limits. Query: `SELECT "userId" FROM "UserBilling" WHERE "passActive" = true AND plan = 'FREE'` to find the userId. Fix: set passActive=false or correct the plan field. |
| RPSC RAS 2026 — 0 exams, 152 questions | MEDIUM | SubCategory | sc_rpsc_ras_2026 has 152 questions but no exam sets created. Students see a subcategory with no practice tests available. Fix: run exam creation job for this subcategory. |
| SSC CHSL 2026 — 0 exams, 152 questions | MEDIUM | SubCategory | sc_ssc_chsl_2026 has 152 questions but no exam sets created. Same root cause as RPSC RAS — exam generation not triggered for 2026 variants. Fix: run exam creation job. |
| SSC MTS 2026 — 0 exams, 144 questions | MEDIUM | SubCategory | sc_ssc_mts_2026 has 144 questions but no exam sets created. Three subcategories in this state suggests the exam-creation cron did not run for 2026 exam variants. Fix: trigger exam creation for all 2026 subcategories with questions_count > 0. |

---

## How to Run

### Prerequisites

```bash
# Install k6 (macOS)
brew install k6

# Install k6 (Ubuntu/Debian)
sudo snap install k6

# Verify
k6 version
```

### Before Running: Replace Credentials

Edit `tests/load/exam-load-test.js`:
- Line with `email: 'loadtest@getvidya.in'` — replace with a real GetVidya test account email
- Line with `password: 'LoadTest@SecurePass123'` — replace with the actual password
- Ensure the test account has `passActive=true` in UserBilling so tier checks pass

Edit `tests/load/db-connection-pool-test.js`:
- `SUPABASE_ANON_KEY` — paste from Supabase Dashboard > Project Settings > API > anon/public
- `TEST_USER_ID` — paste a real UUID from auth.users (the test account's user ID)
- `SAMPLE_QUESTION_IDS` array — paste 20 real UUIDs from: `SELECT id FROM "Question" LIMIT 20;`

### Run File 1: Exam Engine Load Test

```bash
# From project root
BASE_URL=https://app.getvidya.in k6 run tests/load/exam-load-test.js

# With output to JSON for analysis
BASE_URL=https://app.getvidya.in k6 run \
  --out json=tests/load/results/raw-metrics.json \
  tests/load/exam-load-test.js

# With Grafana Cloud streaming (if configured)
BASE_URL=https://app.getvidya.in k6 run \
  --out cloud \
  tests/load/exam-load-test.js
```

Expected duration: ~4 min 50s (all 3 scenarios combined with offsets)

### Run File 2: DB Connection Pool Test

```bash
# From project root
SUPABASE_ANON_KEY=<your-anon-key> \
TEST_USER_ID=<real-uuid> \
k6 run tests/load/db-connection-pool-test.js

# With verbose logging to see pool exhaustion events in real time
SUPABASE_ANON_KEY=<your-anon-key> \
TEST_USER_ID=<real-uuid> \
k6 run --verbose tests/load/db-connection-pool-test.js
```

Expected duration: ~5 min (setup + 3 sequential tests + teardown)

### Cleanup After DB Pool Test

The db-connection-pool-test inserts rows into UserAttempt with `source='k6-pool-test'`.
Clean up after each run in Supabase SQL Editor:

```sql
DELETE FROM "UserAttempt" WHERE source = 'k6-pool-test';
```

### Validate Known Failures in Supabase SQL Editor

```sql
-- Check MODULE 2.2: FREE user with passActive=true
SELECT "userId", plan, "passActive", "questionsAvailable"
FROM "UserBilling"
WHERE "passActive" = true AND plan = 'FREE';

-- Check MODULE 3.11: RPSC RAS 2026 exam count
-- (adjust table/column names to match actual app DB schema)
SELECT sc.slug, sc.name, COUNT(e.id) as exam_count
FROM "SubCategory" sc
LEFT JOIN "Exam" e ON e."subCategoryId" = sc.id
WHERE sc.slug IN ('sc_rpsc_ras_2026', 'sc_ssc_chsl_2026', 'sc_ssc_mts_2026')
GROUP BY sc.slug, sc.name;

-- Check MODULE 3.14: Total question bank
SELECT COUNT(*) as total_questions FROM "Question";

-- Tier integrity: users without a billing row
SELECT COUNT(*) as users_missing_billing
FROM auth.users u
LEFT JOIN "UserBilling" b ON u.id = b."userId"
WHERE b."userId" IS NULL;
```

### Results Location

After each k6 run, results are written to:
- `tests/load/results/exam-load-test-report.json` (Scenario 1/2/3 combined metrics)
- `tests/load/results/db-pool-test-report.json` (DB pool test metrics)

Update the "Last run" date at the top of this file and mark NEEDS_RUN rows as PASS or FAIL.
