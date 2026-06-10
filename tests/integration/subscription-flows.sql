-- =============================================================================
-- GetVidya — Subscription Enforcement SQL Validation Suite
-- File: tests/integration/subscription-flows.sql
--
-- Purpose
-- ───────
-- Each query is a SELECT that returns rows ONLY when a violation exists.
-- An empty result set (0 rows) means the test PASSES.
-- A non-empty result set means the test FAILS and the rows identify the
-- offending records.
--
-- How to run
-- ──────────
-- Paste individual queries into the Supabase SQL Editor (Database > SQL Editor)
-- or execute the full script with:
--   psql "$DATABASE_URL" -f tests/integration/subscription-flows.sql
--
-- Column references use the exact camelCase identifiers confirmed from the
-- live Supabase schema inspection (bzlqlohvbraclvvmbfdt).
--
-- Known live state (as of 2026-05-25)
-- ─────────────────────────────────────
--  • 1 FREE-tier user has passActive=true    → TEST 1 currently FAILING (1 row)
--  • No confirmed negative counter values    → TESTS 2, 3 currently PASSING
--  • No confirmed STANDARD/PRO passActive=false anomalies → TEST 4 currently PASSING
--  • Expired active subscriptions unknown    → TEST 5 status unknown
--  • No confirmed orphaned billing records   → TEST 6 currently PASSING
--  • Completed tests with null endedAt       → TEST 7 status unknown
--  • Orphaned UserAttempt rows               → TEST 8 status unknown
-- =============================================================================


-- =============================================================================
-- TEST 1: FREE users with passActive = true
--         KNOWN BILLING INTEGRITY VIOLATION
-- =============================================================================
-- Current result : 1 row   ← FAILING (known live bug)
-- Expected result: 0 rows  ← PASSING target
--
-- Root cause: A manual DB override or a payment-webhook failure left a FREE-tier
-- user with passActive=true. This user bypasses all quota checks.
-- Resolution: Reset passActive to false for all FREE planTier rows, or escalate
-- planTier to STANDARD/PRO if the user legitimately paid.
-- =============================================================================

SELECT
    ub."id"           AS billing_id,
    ub."userId"       AS user_id,
    ub."planTier"     AS plan_tier,
    ub."passActive"   AS pass_active,
    ub."questionsAvailable",
    ub."testsAvailable",
    u."email"         AS user_email
FROM "UserBilling" ub
INNER JOIN "User" u
    ON u."id" = ub."userId"
WHERE ub."planTier" = 'FREE'
  AND ub."passActive" = true
ORDER BY ub."userId";


-- =============================================================================
-- TEST 2: Counter underflow — questionsAvailable < 0
-- =============================================================================
-- Current result : 0 rows  ← PASSING
-- Expected result: 0 rows
--
-- The Postgres RPC decrement_questions_available includes WHERE questionsAvailable > 0
-- so this should be structurally impossible. A non-zero result means a direct SQL
-- UPDATE was run without the guard (e.g., a migration script or admin action).
-- =============================================================================

SELECT
    ub."id"                  AS billing_id,
    ub."userId"              AS user_id,
    ub."planTier",
    ub."passActive",
    ub."questionsAvailable"  AS underflowed_questions
FROM "UserBilling" ub
WHERE ub."questionsAvailable" < 0
ORDER BY ub."questionsAvailable" ASC;


-- =============================================================================
-- TEST 3: Counter underflow — testsAvailable < 0
-- =============================================================================
-- Current result : 0 rows  ← PASSING
-- Expected result: 0 rows
--
-- Same guard reasoning as TEST 2. decrement_tests_available uses
-- WHERE testsAvailable > 0. A negative value means the RPC was bypassed.
-- =============================================================================

SELECT
    ub."id"              AS billing_id,
    ub."userId"          AS user_id,
    ub."planTier",
    ub."passActive",
    ub."testsAvailable"  AS underflowed_tests
FROM "UserBilling" ub
WHERE ub."testsAvailable" < 0
ORDER BY ub."testsAvailable" ASC;


-- =============================================================================
-- TEST 4: STANDARD or PRO users where passActive = false
-- =============================================================================
-- Current result : 0 rows  ← PASSING (assumed)
-- Expected result: 0 rows
--
-- Any paying subscriber (STANDARD or PRO) must have passActive=true.
-- passActive=false on a paid tier means the Razorpay subscription_paid webhook
-- ran correctly but the subscription_cancelled / subscription_halted webhook did
-- not reset planTier back to FREE, or vice versa.
-- These users are paying-but-locked, which is a support escalation risk.
-- =============================================================================

SELECT
    ub."id"          AS billing_id,
    ub."userId"      AS user_id,
    ub."planTier",
    ub."passActive",
    ub."razorpayCustomerId",
    s."status"       AS subscription_status,
    s."endAt"        AS subscription_end_at
FROM "UserBilling" ub
LEFT JOIN "Subscription" s
    ON s."userBillingId" = ub."id"
WHERE ub."planTier" IN ('STANDARD', 'PRO')
  AND ub."passActive" = false
ORDER BY ub."planTier", ub."userId";


-- =============================================================================
-- TEST 5: Subscriptions with status = 'active' but endAt in the past
-- =============================================================================
-- Current result : unknown — run to establish baseline
-- Expected result: 0 rows
--
-- An active Razorpay subscription whose endAt is in the past means the
-- Razorpay webhook (subscription_charged_renewal or subscription_cancelled)
-- was never delivered or processed. The user is effectively on an expired
-- subscription that still shows as active in our DB.
-- The Razorpay subscription_status field uses lowercase in webhooks; adjust
-- the literal below to match the actual enum values stored in "Subscription".status.
--
-- Note: Replace 'active' with the exact enum label if different (e.g., 'ACTIVE').
-- =============================================================================

SELECT
    s."id"                      AS subscription_id,
    s."userBillingId"           AS billing_id,
    s."razorpaySubscriptionId",
    s."status",
    s."endAt"                   AS ended_at,
    NOW()                       AS current_time,
    (NOW() - s."endAt")         AS overdue_by,
    ub."planTier",
    ub."passActive"
FROM "Subscription" s
INNER JOIN "UserBilling" ub
    ON ub."id" = s."userBillingId"
WHERE s."status" = 'active'
  AND s."endAt" IS NOT NULL
  AND s."endAt" < NOW()
ORDER BY s."endAt" ASC;


-- =============================================================================
-- TEST 6: UserBilling rows with no corresponding User record (orphaned billing)
-- =============================================================================
-- Current result : 0 rows  ← PASSING (assumed — FK should enforce this)
-- Expected result: 0 rows
--
-- If a User row is hard-deleted without cascading to UserBilling, the billing
-- record becomes orphaned. These rows waste quota and can cause fetchBilling()
-- to return data for a non-existent user if the userId is reused.
-- Resolution: Add ON DELETE CASCADE on UserBilling.userId → User.id if missing,
-- then delete confirmed orphans.
-- =============================================================================

SELECT
    ub."id"      AS billing_id,
    ub."userId"  AS orphaned_user_id,
    ub."planTier",
    ub."passActive"
FROM "UserBilling" ub
LEFT JOIN "User" u
    ON u."id" = ub."userId"
WHERE u."id" IS NULL
ORDER BY ub."userId";


-- =============================================================================
-- TEST 7: Test rows with status = 'COMPLETED' but endedAt IS NULL
-- =============================================================================
-- Current result : unknown — run to establish baseline
-- Expected result: 0 rows
--
-- A completed Test must always have endedAt set so that analytics queries
-- (daily activity, average session duration, leaderboard cutoffs) work correctly.
-- NULL endedAt on a COMPLETED test indicates the finish-test API route wrote
-- status before writing the timestamp (race condition or partial update).
-- Note: Adjust 'COMPLETED' to match the exact enum value in Test.status.
-- =============================================================================

SELECT
    t."id"         AS test_id,
    t."userId",
    t."examId",
    t."type",
    t."status",
    t."endedAt",
    t."secondsSpent"
FROM "Test" t
WHERE t."status" = 'COMPLETED'
  AND t."endedAt" IS NULL
ORDER BY t."userId";


-- =============================================================================
-- TEST 8: UserAttempt rows with no corresponding Question
-- =============================================================================
-- Current result : unknown — run to establish baseline
-- Expected result: 0 rows
--
-- An attempt recorded against a questionId that does not exist in the Question
-- table means a question was hard-deleted after the attempt was recorded, or the
-- attempt was created with a wrong ID. These rows break question-level analytics
-- (accuracy rates, difficulty scoring) and may cause 404s in the practice UI
-- when we try to re-fetch the question for review.
-- =============================================================================

SELECT
    ua."id"          AS attempt_id,
    ua."userId",
    ua."questionId"  AS missing_question_id,
    ua."source",
    ua."attemptedAt"
FROM "UserAttempt" ua
LEFT JOIN "Question" q
    ON q."id" = ua."questionId"
WHERE q."id" IS NULL
ORDER BY ua."attemptedAt" DESC
LIMIT 100;


-- =============================================================================
-- BONUS — Composite integrity view (run for a full dashboard snapshot)
-- =============================================================================
-- Returns one summary row per anomaly class.
-- Run this after resolving individual tests to confirm overall system health.
-- =============================================================================

SELECT 'TEST_1_free_pass_active'       AS test_name,
       COUNT(*)                         AS failing_rows,
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END AS result
FROM   "UserBilling"
WHERE  "planTier" = 'FREE' AND "passActive" = true

UNION ALL

SELECT 'TEST_2_questions_underflow',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "UserBilling"
WHERE  "questionsAvailable" < 0

UNION ALL

SELECT 'TEST_3_tests_underflow',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "UserBilling"
WHERE  "testsAvailable" < 0

UNION ALL

SELECT 'TEST_4_paid_pass_inactive',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "UserBilling"
WHERE  "planTier" IN ('STANDARD', 'PRO') AND "passActive" = false

UNION ALL

SELECT 'TEST_5_expired_active_subscriptions',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "Subscription"
WHERE  "status" = 'active'
  AND  "endAt" IS NOT NULL
  AND  "endAt" < NOW()

UNION ALL

SELECT 'TEST_6_orphaned_billing',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "UserBilling" ub
LEFT JOIN "User" u ON u."id" = ub."userId"
WHERE  u."id" IS NULL

UNION ALL

SELECT 'TEST_7_completed_tests_null_endedat',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "Test"
WHERE  "status" = 'COMPLETED'
  AND  "endedAt" IS NULL

UNION ALL

SELECT 'TEST_8_orphaned_attempts',
       COUNT(*),
       CASE WHEN COUNT(*) = 0 THEN 'PASS' ELSE 'FAIL' END
FROM   "UserAttempt" ua
LEFT JOIN "Question" q ON q."id" = ua."questionId"
WHERE  q."id" IS NULL

ORDER BY test_name;
