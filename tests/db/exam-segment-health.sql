-- =============================================================================
-- GetVidya — Exam Segment Health Diagnostic SQL Suite
-- File: tests/db/exam-segment-health.sql
-- Supabase project: bzlqlohvbraclvvmbfdt
-- Database URL: https://bzlqlohvbraclvvmbfdt.supabase.co
--
-- Purpose
-- ───────
-- Each query returns rows ONLY when an anomaly or violation exists.
-- Empty result set (0 rows) = test PASSES.
-- Non-empty result set = test FAILS; rows identify offending records.
--
-- How to run
-- ──────────
-- Paste individual queries into Supabase Dashboard → SQL Editor, or:
--   psql "$SUPABASE_DB_URL" -f tests/db/exam-segment-health.sql
--
-- Table naming
-- ─────────────
-- PascalCase tables (Prisma-managed):
--   "User", "UserBilling", "Subscription", "Question", "Option",
--   "Exam", "Test", "UserAttempt", "Category", "SubCategory",
--   "AiPracticeLog", "ChatMessage"
--
-- All table names are quoted to handle PascalCase in PostgreSQL.
--
-- Schema confirmed from live Supabase inspection on 2026-05-25.
-- =============================================================================


-- =============================================================================
-- DIAGNOSTIC 1: All exam segments with question and exam counts,
--               flagging segments below coverage thresholds.
--
-- Thresholds:
--   questions < 500  → CRITICAL_LOW_QUESTIONS
--   exams     = 0    → NO_EXAMS (coverage gap — no practice material)
--   questions between 500 and 999 → LOW_QUESTIONS (warn)
--
-- Known coverage gaps confirmed from schema inspection:
--   RPSC RAS 2026  (sc_rpsc_ras_2026)   → 152 questions, 0 exams
--   SSC CHSL 2026  (sc_ssc_chsl_2026)   → 152 questions, 0 exams
--   SSC MTS 2026   (sc_ssc_mts_2026)    → 144 questions, 0 exams
-- =============================================================================

-- DIAGNOSTIC 1: All exam segments with question and exam counts, flagging segments below threshold

SELECT
    sc.id                                              AS subcategory_id,
    sc.name                                            AS subcategory_name,
    c.name                                             AS category_name,
    COUNT(DISTINCT q.id)                               AS question_count,
    COUNT(DISTINCT e.id)                               AS exam_count,
    CASE
        WHEN COUNT(DISTINCT q.id) < 500  AND COUNT(DISTINCT e.id) = 0
            THEN 'CRITICAL: BOTH_BELOW_THRESHOLD'
        WHEN COUNT(DISTINCT q.id) < 500
            THEN 'CRITICAL_LOW_QUESTIONS'
        WHEN COUNT(DISTINCT e.id) = 0
            THEN 'CRITICAL_NO_EXAMS'
        WHEN COUNT(DISTINCT q.id) < 1000
            THEN 'WARN_LOW_QUESTIONS'
        ELSE 'OK'
    END                                                AS health_status
FROM "SubCategory" sc
LEFT JOIN "Category"   c ON c.id = sc."categoryId"
LEFT JOIN "Question"   q ON q."subCategoryId" = sc.id
LEFT JOIN "Exam"       e ON e."subCategoryId" = sc.id
GROUP BY sc.id, sc.name, c.name
ORDER BY
    CASE
        WHEN COUNT(DISTINCT q.id) < 500 AND COUNT(DISTINCT e.id) = 0 THEN 1
        WHEN COUNT(DISTINCT q.id) < 500                              THEN 2
        WHEN COUNT(DISTINCT e.id) = 0                               THEN 3
        WHEN COUNT(DISTINCT q.id) < 1000                            THEN 4
        ELSE 5
    END,
    question_count ASC;


-- =============================================================================
-- DIAGNOSTIC 2: Verify Option.isCorrect distribution.
--
-- Every question must have:
--   - At least 2 options
--   - At least 1 option with isCorrect = true
--   - At least 1 option with isCorrect = false
--
-- Questions where ALL options have the same isCorrect value (all true or
-- all false) are malformed and will cause incorrect scoring.
--
-- Returns rows = malformed questions exist. 0 rows = distribution OK.
-- =============================================================================

-- DIAGNOSTIC 2: Verify Option.isCorrect distribution (should have both true and false for all questions)

SELECT
    q.id                                               AS question_id,
    q."subCategoryId"                                  AS subcategory_id,
    q.difficulty,
    COUNT(o.id)                                        AS total_options,
    COUNT(o.id) FILTER (WHERE o."isCorrect" = true)   AS correct_options_count,
    COUNT(o.id) FILTER (WHERE o."isCorrect" = false)  AS incorrect_options_count,
    CASE
        WHEN COUNT(o.id) FILTER (WHERE o."isCorrect" = true)  = 0  THEN 'FAIL: NO_CORRECT_OPTION'
        WHEN COUNT(o.id) FILTER (WHERE o."isCorrect" = false) = 0  THEN 'FAIL: ALL_OPTIONS_CORRECT'
        WHEN COUNT(o.id) < 2                                        THEN 'FAIL: FEWER_THAN_2_OPTIONS'
        WHEN COUNT(o.id) FILTER (WHERE o."isCorrect" = true)  > 1  THEN 'WARN: MULTIPLE_CORRECT_OPTIONS'
        ELSE 'OK'
    END                                                AS distribution_status
FROM "Question" q
LEFT JOIN "Option" o ON o."questionId" = q.id
GROUP BY q.id, q."subCategoryId", q.difficulty
HAVING
    COUNT(o.id) FILTER (WHERE o."isCorrect" = true)  = 0
    OR COUNT(o.id) FILTER (WHERE o."isCorrect" = false) = 0
    OR COUNT(o.id) < 2
ORDER BY distribution_status, q.id;


-- =============================================================================
-- DIAGNOSTIC 3: Find questions with NO options (data integrity violation).
--
-- A question with zero options cannot be served in any exam or practice
-- session without crashing the test engine. These are orphaned rows in the
-- "Question" table that were never completed during content ingestion.
--
-- Returns rows = orphaned questions exist. 0 rows = OK.
-- =============================================================================

-- DIAGNOSTIC 3: Find questions with NO options (data integrity violation)

SELECT
    q.id                   AS question_id,
    q."subCategoryId"      AS subcategory_id,
    q.difficulty,
    q."isAiGenerated",
    q."createdAt"          AS created_at
FROM "Question" q
WHERE NOT EXISTS (
    SELECT 1
    FROM "Option" o
    WHERE o."questionId" = q.id
)
ORDER BY q."createdAt" DESC;


-- =============================================================================
-- DIAGNOSTIC 4: Find questions with MORE THAN ONE isCorrect=true option.
--
-- The test engine in node_30.RHaNfbWf.js uses:
--   f.questions[g].options.find(_ => _.isCorrect)
-- The `find()` call returns the FIRST match. If multiple options have
-- isCorrect=true, the engine will always score against the first one,
-- silently ignoring the others. This is a data corruption issue.
--
-- Returns rows = questions with corrupt multiple-correct data. 0 rows = OK.
-- =============================================================================

-- DIAGNOSTIC 4: Find questions with MORE THAN ONE isCorrect=true option (corrupt data)

SELECT
    q.id                                                           AS question_id,
    q."subCategoryId"                                              AS subcategory_id,
    q.difficulty,
    COUNT(o.id) FILTER (WHERE o."isCorrect" = true)              AS correct_options_count,
    STRING_AGG(o.id::text, ', ') FILTER (WHERE o."isCorrect" = true) AS correct_option_ids
FROM "Question" q
INNER JOIN "Option" o ON o."questionId" = q.id
GROUP BY q.id, q."subCategoryId", q.difficulty
HAVING COUNT(o.id) FILTER (WHERE o."isCorrect" = true) > 1
ORDER BY correct_options_count DESC, q.id;


-- =============================================================================
-- DIAGNOSTIC 5: Find questions with ZERO isCorrect=true options.
--
-- These questions have options but none is marked as the correct answer.
-- The test engine will not score any option as correct, making it
-- impossible for users to get this question right.
-- Also creates misleading exam result data (artificially low scores).
--
-- Returns rows = questions missing a correct answer. 0 rows = OK.
-- =============================================================================

-- DIAGNOSTIC 5: Find questions with ZERO isCorrect=true options (no correct answer defined)

SELECT
    q.id                                                  AS question_id,
    q."subCategoryId"                                     AS subcategory_id,
    q.difficulty,
    q."isAiGenerated",
    COUNT(o.id)                                           AS total_options,
    COUNT(o.id) FILTER (WHERE o."isCorrect" = false)     AS all_false_options
FROM "Question" q
INNER JOIN "Option" o ON o."questionId" = q.id
GROUP BY q.id, q."subCategoryId", q.difficulty, q."isAiGenerated"
HAVING COUNT(o.id) FILTER (WHERE o."isCorrect" = true) = 0
ORDER BY q."subCategoryId", q.id;


-- =============================================================================
-- DIAGNOSTIC 6: UserBilling integrity check.
--
-- Business rule: FREE tier users MUST have passActive = false.
-- A FREE user with passActive = true is a billing integrity violation —
-- they have free VidyaPass access that should require payment.
--
-- KNOWN VIOLATION (confirmed from schema inspection):
--   1 FREE user exists with passActive = true.
--   This query MUST surface that row.
--
-- Returns rows = billing integrity violations found. 0 rows = OK.
-- =============================================================================

-- DIAGNOSTIC 6: Verify UserBilling integrity - FREE users must have passActive=false (find violations)

SELECT
    ub.id                      AS user_billing_id,
    ub."userId"                AS user_id,
    u.email                    AS user_email,
    u.phone                    AS user_phone,
    ub."planTier"              AS plan_tier,
    ub."passActive"            AS pass_active,
    ub."passActiveByCoupon"    AS pass_active_by_coupon,
    ub."questionsAvailable"    AS questions_available,
    ub."testsAvailable"        AS tests_available,
    -- Classify the severity of the violation
    CASE
        WHEN ub."passActiveByCoupon" = true
            THEN 'VIOLATION_VIA_COUPON: FREE user has passActive=true through coupon bypass'
        ELSE 'VIOLATION: FREE user has passActive=true without coupon'
    END                        AS violation_type
FROM "UserBilling" ub
INNER JOIN "User" u ON u.id = ub."userId"
WHERE
    ub."planTier" = 'FREE'
    AND ub."passActive" = true
ORDER BY ub."userId";


-- =============================================================================
-- DIAGNOSTIC 7: Count active vs expired subscriptions by planTier.
--
-- Shows the distribution of subscription states for billing health monitoring.
-- Expected healthy state: all STANDARD/PRO rows have at least some ACTIVE
-- subscriptions. A planTier with ZERO active subscriptions but many EXPIRED
-- ones may indicate a renewal or migration issue.
--
-- This diagnostic always returns rows (it is a summary, not a violation check).
-- Review the output manually.
-- =============================================================================

-- DIAGNOSTIC 7: Count active vs expired subscriptions by planTier

SELECT
    ub."planTier"                                                              AS plan_tier,
    s.status                                                                   AS subscription_status,
    COUNT(s.id)                                                                AS subscription_count,
    MIN(s."endAt")                                                             AS earliest_end_at,
    MAX(s."endAt")                                                             AS latest_end_at,
    COUNT(s.id) FILTER (WHERE s."endAt" < NOW())                              AS already_expired_count,
    COUNT(s.id) FILTER (WHERE s."endAt" >= NOW())                             AS still_active_count,
    COUNT(s.id) FILTER (WHERE s."endAt" BETWEEN NOW() AND NOW() + INTERVAL '7 days') AS expiring_in_7_days
FROM "Subscription" s
INNER JOIN "UserBilling" ub ON ub.id = s."userBillingId"
GROUP BY ub."planTier", s.status
ORDER BY
    CASE ub."planTier"
        WHEN 'PRO'      THEN 1
        WHEN 'STANDARD' THEN 2
        WHEN 'FREE'     THEN 3
        ELSE 4
    END,
    s.status;


-- =============================================================================
-- DIAGNOSTIC 8: Daily study activity freshness — last 7 days per subcategory.
--
-- Checks for subcategories that have had NO user activity (UserAttempt rows)
-- in the past 7 days. Subcategories with zero recent attempts may have
-- content delivery issues or may have been removed from the UI without
-- removing their data.
--
-- Also checks if AiPracticeLog records exist for the last 7 days,
-- confirming GetVidyaAI practice sessions are running.
--
-- Returns rows where recent_attempts = 0. 0 such rows = all segments active.
-- =============================================================================

-- DIAGNOSTIC 8: DailyBatch freshness - last 7 days generation status per subcategory

SELECT
    sc.id                                                           AS subcategory_id,
    sc.name                                                         AS subcategory_name,
    c.name                                                          AS category_name,
    COUNT(ua.id) FILTER (
        WHERE ua."attemptedAt" >= NOW() - INTERVAL '7 days'
    )                                                               AS attempts_last_7_days,
    COUNT(ua.id) FILTER (
        WHERE ua."attemptedAt" >= NOW() - INTERVAL '1 day'
    )                                                               AS attempts_last_24h,
    MAX(ua."attemptedAt")                                           AS last_attempt_at,
    -- AI practice session freshness
    COUNT(apl."userId") FILTER (
        WHERE apl."createdAt" >= NOW() - INTERVAL '7 days'
    )                                                               AS ai_practice_sessions_last_7_days,
    CASE
        WHEN COUNT(ua.id) FILTER (
            WHERE ua."attemptedAt" >= NOW() - INTERVAL '7 days'
        ) = 0 AND COUNT(ua.id) > 0
            THEN 'STALE: had activity before, none in last 7 days'
        WHEN COUNT(ua.id) = 0
            THEN 'INACTIVE: no attempts ever recorded'
        ELSE 'ACTIVE'
    END                                                             AS freshness_status
FROM "SubCategory" sc
LEFT JOIN "Category"      c   ON c.id  = sc."categoryId"
LEFT JOIN "Question"      q   ON q."subCategoryId" = sc.id
LEFT JOIN "UserAttempt"   ua  ON ua."questionId"   = q.id
LEFT JOIN "AiPracticeLog" apl ON apl."subjectName" = sc.name  -- matched by name (no FK)
GROUP BY sc.id, sc.name, c.name
HAVING
    COUNT(ua.id) FILTER (
        WHERE ua."attemptedAt" >= NOW() - INTERVAL '7 days'
    ) = 0
ORDER BY attempts_last_7_days ASC, sc.name;


-- =============================================================================
-- DIAGNOSTIC 9: Top 10 most-attempted exams from the Test table.
--
-- Uses the "Test" table (not Exam) — each row in Test represents one user's
-- attempt at an Exam. Counts completed + in-progress attempts.
-- High-volume exams confirm which content drives the most engagement.
--
-- This diagnostic always returns rows (it is a summary). Review manually.
-- =============================================================================

-- DIAGNOSTIC 9: Top 10 most-attempted exams from Test table

SELECT
    e.id                                                    AS exam_id,
    e.name                                                  AS exam_name,
    e.type                                                  AS exam_type,
    e.duration                                              AS duration_minutes,
    e."totalScore"                                          AS total_score,
    sc.name                                                 AS subcategory_name,
    COUNT(t.id)                                             AS total_attempts,
    COUNT(t.id) FILTER (WHERE t.status = 'COMPLETED')      AS completed_attempts,
    COUNT(t.id) FILTER (WHERE t.status = 'IN_PROGRESS')    AS in_progress_attempts,
    COUNT(DISTINCT t."userId")                              AS unique_users,
    ROUND(
        AVG(
            CASE
                WHEN t.status = 'COMPLETED' AND array_length(t."correctQuestions", 1) IS NOT NULL
                THEN (array_length(t."correctQuestions", 1)::numeric /
                      NULLIF(
                        array_length(t."correctQuestions", 1) +
                        array_length(t."wrongQuestions",   1) +
                        array_length(t."skippedQuestions", 1),
                        0
                      )) * 100
                ELSE NULL
            END
        ), 2
    )                                                       AS avg_accuracy_pct
FROM "Exam" e
INNER JOIN "Test"        t  ON t."examId"        = e.id
INNER JOIN "SubCategory" sc ON sc.id             = e."subCategoryId"
GROUP BY e.id, e.name, e.type, e.duration, e."totalScore", sc.name
ORDER BY total_attempts DESC
LIMIT 10;


-- =============================================================================
-- DIAGNOSTIC 10: Find Test rows with status=COMPLETED but null endedAt.
--
-- Business logic: when POST /tests/:id/complete is called, the server should
-- set endedAt to the current timestamp. A COMPLETED test without an endedAt
-- means the completion API call succeeded but the timestamp was not persisted.
-- This is a data integrity bug.
--
-- Returns rows = integrity violation. 0 rows = OK.
-- =============================================================================

-- DIAGNOSTIC 10: Find Test rows with status=COMPLETED but null endedAt (data integrity)

SELECT
    t.id                                               AS test_id,
    t."userId"                                         AS user_id,
    t."examId"                                         AS exam_id,
    e.name                                             AS exam_name,
    t.status,
    t."secondsSpent"                                   AS seconds_spent,
    t."endedAt"                                        AS ended_at,
    t."createdAt"                                      AS created_at,
    array_length(t."correctQuestions",  1)             AS correct_count,
    array_length(t."wrongQuestions",    1)             AS wrong_count,
    array_length(t."skippedQuestions",  1)             AS skipped_count,
    'INTEGRITY VIOLATION: COMPLETED test has null endedAt' AS issue
FROM "Test" t
LEFT JOIN "Exam" e ON e.id = t."examId"
WHERE
    t.status   = 'COMPLETED'
    AND t."endedAt" IS NULL
ORDER BY t."createdAt" DESC;


-- =============================================================================
-- DIAGNOSTIC 11: Coverage gap alert.
--
-- Surfaces subcategories with EITHER:
--   - Fewer than 500 questions (insufficient for meaningful exam generation)
--   - Zero exams (no ready-made mock tests for users)
--
-- Combined threshold: subcategories that need both questions AND exams.
-- The three known gaps from schema inspection will appear here.
--
-- Returns rows = coverage gaps exist. 0 rows = all segments adequately covered.
-- =============================================================================

-- DIAGNOSTIC 11: Coverage gap alert - subcategories with fewer than 500 questions OR zero exams

SELECT
    sc.id                              AS subcategory_id,
    sc.name                            AS subcategory_name,
    c.name                             AS category_name,
    COUNT(DISTINCT q.id)               AS question_count,
    COUNT(DISTINCT e.id)               AS exam_count,
    CASE
        WHEN COUNT(DISTINCT q.id) < 500 AND COUNT(DISTINCT e.id) = 0
            THEN 'CRITICAL: < 500 questions AND 0 exams'
        WHEN COUNT(DISTINCT q.id) < 500
            THEN 'WARN: < 500 questions'
        WHEN COUNT(DISTINCT e.id) = 0
            THEN 'WARN: 0 exams'
        ELSE 'OK'
    END                                AS coverage_status,
    -- How far from the 500-question threshold
    GREATEST(0, 500 - COUNT(DISTINCT q.id)) AS questions_needed_to_threshold,
    -- Whether AI generation could fill the gap (AiPracticeLog has entries)
    EXISTS (
        SELECT 1 FROM "AiPracticeLog" apl
        WHERE apl."subjectName" = sc.name
    )                                  AS has_ai_practice_data
FROM "SubCategory" sc
LEFT JOIN "Category" c  ON c.id = sc."categoryId"
LEFT JOIN "Question" q  ON q."subCategoryId" = sc.id
LEFT JOIN "Exam"     e  ON e."subCategoryId" = sc.id
GROUP BY sc.id, sc.name, c.name
HAVING
    COUNT(DISTINCT q.id) < 500
    OR COUNT(DISTINCT e.id) = 0
ORDER BY
    CASE
        WHEN COUNT(DISTINCT q.id) < 500 AND COUNT(DISTINCT e.id) = 0 THEN 1
        WHEN COUNT(DISTINCT q.id) < 500                              THEN 2
        WHEN COUNT(DISTINCT e.id) = 0                               THEN 3
    END,
    question_count ASC;


-- =============================================================================
-- DIAGNOSTIC 12: Find UserBilling rows where questionsAvailable < 0.
--
-- questionsAvailable is an integer counter that decrements when a user
-- starts a practice session. If the decrement logic has a race condition
-- or the initial value was set incorrectly, the counter can go negative.
-- A negative value is a counter underflow bug.
--
-- Impact:
--   - Users may be blocked from practice even though they have purchased
--     questions (client-side guard checks questionsAvailable > 0).
--   - Revenue reconciliation will show incorrect question consumption.
--
-- Returns rows = counter underflow detected. 0 rows = OK.
-- =============================================================================

-- DIAGNOSTIC 12: Find UserBilling rows where questionsAvailable < 0 (counter underflow bug)

SELECT
    ub.id                       AS user_billing_id,
    ub."userId"                 AS user_id,
    u.email                     AS user_email,
    u.phone                     AS user_phone,
    ub."planTier"               AS plan_tier,
    ub."questionsAvailable"     AS questions_available,
    ub."testsAvailable"         AS tests_available,
    ub."passActive"             AS pass_active,
    -- How negative is the counter?
    ABS(ub."questionsAvailable")                            AS underflow_magnitude,
    -- When was billing last updated (if the column exists)
    -- ub."updatedAt"                                       AS updated_at,
    'UNDERFLOW BUG: questionsAvailable is negative'        AS issue
FROM "UserBilling" ub
INNER JOIN "User" u ON u.id = ub."userId"
WHERE ub."questionsAvailable" < 0
ORDER BY ub."questionsAvailable" ASC;  -- Most negative first


-- =============================================================================
-- BONUS DIAGNOSTIC: Summary health dashboard (always runs, returns 1 row)
--
-- Quick health overview for monitoring dashboards or CI pipelines.
-- All counts should match expected ranges. Any anomaly in the violation
-- columns indicates a failing diagnostic above.
-- =============================================================================

SELECT
    (SELECT COUNT(*) FROM "User")                                              AS total_users,
    (SELECT COUNT(*) FROM "UserBilling")                                       AS total_billing_records,
    (SELECT COUNT(*) FROM "Question")                                          AS total_questions,
    (SELECT COUNT(*) FROM "Option")                                            AS total_options,
    (SELECT COUNT(*) FROM "Exam")                                              AS total_exams,
    (SELECT COUNT(*) FROM "Test")                                              AS total_test_attempts,
    (SELECT COUNT(*) FROM "Test" WHERE status = 'COMPLETED')                  AS completed_tests,
    (SELECT COUNT(*) FROM "SubCategory")                                       AS total_subcategories,
    -- Violations
    (
        SELECT COUNT(*)
        FROM "UserBilling"
        WHERE "planTier" = 'FREE' AND "passActive" = true
    )                                                                          AS free_users_with_pass_VIOLATION,
    (
        SELECT COUNT(DISTINCT q.id)
        FROM "Question" q
        WHERE NOT EXISTS (SELECT 1 FROM "Option" o WHERE o."questionId" = q.id)
    )                                                                          AS questions_without_options_VIOLATION,
    (
        SELECT COUNT(DISTINCT q.id)
        FROM "Question" q
        INNER JOIN "Option" o ON o."questionId" = q.id
        GROUP BY q.id
        HAVING COUNT(o.id) FILTER (WHERE o."isCorrect" = true) = 0
    )                                                                          AS questions_no_correct_answer_VIOLATION,
    (
        SELECT COUNT(*)
        FROM "Test"
        WHERE status = 'COMPLETED' AND "endedAt" IS NULL
    )                                                                          AS completed_tests_null_endedAt_VIOLATION,
    (
        SELECT COUNT(*)
        FROM "UserBilling"
        WHERE "questionsAvailable" < 0
    )                                                                          AS questions_counter_underflow_VIOLATION,
    NOW()                                                                      AS diagnostic_run_at;
