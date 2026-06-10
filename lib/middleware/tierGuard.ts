/**
 * tierGuard.ts — GetVidya subscription tier enforcement middleware
 *
 * Pure functions usable in Next.js API routes (Route Handlers) or any
 * Node.js server context. Always uses the Supabase service-role key so
 * RLS is bypassed and counter mutations run server-side only.
 *
 * Counter-decrement invariant
 * ───────────────────────────
 * consumeQuestion() and consumeTest() call Postgres RPC functions that
 * execute:
 *
 *   UPDATE "UserBilling"
 *   SET    "<counter>" = "<counter>" - 1
 *   WHERE  "userId" = p_user_id
 *     AND  "<counter>" > 0;
 *
 * The WHERE <counter> > 0 guard makes the decrement atomic and prevents
 * underflow to negative values without a round-trip transaction. The SQL
 * for these two functions is embedded at the bottom of this file.
 *
 * Security notes
 * ──────────────
 * - The Option.isCorrect field is never selected or returned here.
 * - The service-role client never persists a session cookie.
 * - AI chat (GetVidyaAI) is gated to PRO tier exclusively.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ── Constants ─────────────────────────────────────────────────────────────────

const UPGRADE_URL = "https://getvidya.in/pricing" as const;

/**
 * Show the upgrade nudge when the user is below these thresholds AND
 * does not have an active pass.
 */
const NUDGE_QUESTIONS_THRESHOLD = 5;
const NUDGE_TESTS_THRESHOLD = 1;

// ── Public types ──────────────────────────────────────────────────────────────

export type PlanTier = "FREE" | "STANDARD" | "PRO";

export type TierCheckReason =
  | "PASS_ACTIVE"
  | "COUNTER_AVAILABLE"
  | "LIMIT_REACHED"
  | "NO_BILLING_RECORD";

export interface TierCheckResult {
  allowed: boolean;
  reason: TierCheckReason;
  planTier: PlanTier;
  passActive: boolean;
  remainingQuestions?: number;
  remainingTests?: number;
  /** Always 'https://getvidya.in/pricing' */
  upgradeUrl: string;
}

export interface TierContext {
  userId: string;
  planTier: PlanTier;
  passActive: boolean;
  questionsAvailable: number;
  testsAvailable: number;
  /** true when questionsAvailable < 5 OR testsAvailable < 1 (and no active pass) */
  showUpgradeNudge: boolean;
  upgradeUrl: string;
}

export interface IntegrityReport {
  anomalies: Array<{
    userId: string;
    billingId: string;
    issue: string;
    planTier: string;
    passActive: boolean;
  }>;
  totalChecked: number;
  clean: boolean;
}

// ── Internal types ────────────────────────────────────────────────────────────

interface UserBillingRow {
  id: string;
  userId: string;
  questionsAvailable: number;
  testsAvailable: number;
  passActive: boolean;
  planTier: PlanTier;
}

// ── Service-role client (module-level singleton, safe for serverless) ─────────

let _serviceClient: SupabaseClient | null = null;

function getServiceClient(): SupabaseClient {
  if (_serviceClient) return _serviceClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[tierGuard] Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or " +
        "SUPABASE_SERVICE_ROLE_KEY must be set on the server."
    );
  }

  _serviceClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return _serviceClient;
}

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * Fetch the UserBilling record for a given userId.
 * Returns null when no record exists.
 * Throws on Supabase errors (network, timeout, schema mismatch).
 */
async function fetchBilling(userId: string): Promise<UserBillingRow | null> {
  const db = getServiceClient();

  const { data, error } = await db
    .from("UserBilling")
    .select(
      "id, userId, questionsAvailable, testsAvailable, passActive, planTier"
    )
    .eq("userId", userId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `[tierGuard] fetchBilling failed for userId=${userId}: ${error.message}`
    );
  }

  return data as UserBillingRow | null;
}

/** Canonical result for users with no billing record. */
function noBillingResult(): TierCheckResult {
  return {
    allowed: false,
    reason: "NO_BILLING_RECORD",
    planTier: "FREE",
    passActive: false,
    remainingQuestions: 0,
    remainingTests: 0,
    upgradeUrl: UPGRADE_URL,
  };
}

/**
 * Build a TierCheckResult from a billing row for the pass-active path.
 * passActive=true always means allowed=true regardless of counter values.
 */
function passActiveResult(billing: UserBillingRow): TierCheckResult {
  return {
    allowed: true,
    reason: "PASS_ACTIVE",
    planTier: billing.planTier,
    passActive: true,
    remainingQuestions: billing.questionsAvailable,
    remainingTests: billing.testsAvailable,
    upgradeUrl: UPGRADE_URL,
  };
}

// ── Exported functions ────────────────────────────────────────────────────────

/**
 * Check whether a user can start a new full exam.
 *
 * Allowed when: passActive=true  OR  testsAvailable > 0.
 */
export async function canStartExam(userId: string): Promise<TierCheckResult> {
  if (!userId) throw new Error("[tierGuard] canStartExam: userId is required");

  const billing = await fetchBilling(userId);
  if (!billing) return noBillingResult();

  if (billing.passActive) return passActiveResult(billing);

  if (billing.testsAvailable > 0) {
    return {
      allowed: true,
      reason: "COUNTER_AVAILABLE",
      planTier: billing.planTier,
      passActive: false,
      remainingQuestions: billing.questionsAvailable,
      remainingTests: billing.testsAvailable,
      upgradeUrl: UPGRADE_URL,
    };
  }

  return {
    allowed: false,
    reason: "LIMIT_REACHED",
    planTier: billing.planTier,
    passActive: false,
    remainingQuestions: billing.questionsAvailable,
    remainingTests: 0,
    upgradeUrl: UPGRADE_URL,
  };
}

/**
 * Check whether a user can receive the next practice question.
 *
 * Allowed when: passActive=true  OR  questionsAvailable > 0.
 */
export async function canGetQuestion(userId: string): Promise<TierCheckResult> {
  if (!userId) throw new Error("[tierGuard] canGetQuestion: userId is required");

  const billing = await fetchBilling(userId);
  if (!billing) return noBillingResult();

  if (billing.passActive) return passActiveResult(billing);

  if (billing.questionsAvailable > 0) {
    return {
      allowed: true,
      reason: "COUNTER_AVAILABLE",
      planTier: billing.planTier,
      passActive: false,
      remainingQuestions: billing.questionsAvailable,
      remainingTests: billing.testsAvailable,
      upgradeUrl: UPGRADE_URL,
    };
  }

  return {
    allowed: false,
    reason: "LIMIT_REACHED",
    planTier: billing.planTier,
    passActive: false,
    remainingQuestions: 0,
    remainingTests: billing.testsAvailable,
    upgradeUrl: UPGRADE_URL,
  };
}

/**
 * Atomically decrement questionsAvailable by 1.
 *
 * Delegates to the Postgres function `decrement_questions_available` which
 * includes a WHERE questionsAvailable > 0 guard, making the operation safe
 * under concurrent requests without needing an explicit transaction.
 *
 * No-op for passActive users (their quota is unlimited).
 * Throws when no billing record exists or the RPC fails.
 */
export async function consumeQuestion(userId: string): Promise<void> {
  if (!userId) throw new Error("[tierGuard] consumeQuestion: userId is required");

  const db = getServiceClient();
  const billing = await fetchBilling(userId);

  if (!billing) {
    throw new Error(
      `[tierGuard] consumeQuestion: no UserBilling record for userId=${userId}`
    );
  }

  // passActive users consume from an unlimited pool — never touch the counter
  if (billing.passActive) return;

  const { error } = await db.rpc("decrement_questions_available", {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(
      `[tierGuard] consumeQuestion: RPC decrement_questions_available failed ` +
        `for userId=${userId}: ${error.message}`
    );
  }
}

/**
 * Atomically decrement testsAvailable by 1.
 *
 * Uses the Postgres function `decrement_tests_available` with the same
 * WHERE testsAvailable > 0 anti-underflow guard.
 *
 * No-op for passActive users. Throws on missing record or RPC failure.
 */
export async function consumeTest(userId: string): Promise<void> {
  if (!userId) throw new Error("[tierGuard] consumeTest: userId is required");

  const db = getServiceClient();
  const billing = await fetchBilling(userId);

  if (!billing) {
    throw new Error(
      `[tierGuard] consumeTest: no UserBilling record for userId=${userId}`
    );
  }

  if (billing.passActive) return;

  const { error } = await db.rpc("decrement_tests_available", {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(
      `[tierGuard] consumeTest: RPC decrement_tests_available failed ` +
        `for userId=${userId}: ${error.message}`
    );
  }
}

/**
 * Return the full tier context for a user.
 *
 * Used by the frontend to drive upgrade nudges, feature locks, and
 * remaining-quota badges without exposing raw billing internals.
 *
 * When no billing record exists, returns a fully-locked FREE context so
 * the UI always has a safe default to render.
 */
export async function getUserTierContext(userId: string): Promise<TierContext> {
  if (!userId) throw new Error("[tierGuard] getUserTierContext: userId is required");

  const billing = await fetchBilling(userId);

  if (!billing) {
    return {
      userId,
      planTier: "FREE",
      passActive: false,
      questionsAvailable: 0,
      testsAvailable: 0,
      showUpgradeNudge: true,
      upgradeUrl: UPGRADE_URL,
    };
  }

  // Pass-active users never see nudges regardless of counter values
  const showUpgradeNudge =
    !billing.passActive &&
    (billing.questionsAvailable < NUDGE_QUESTIONS_THRESHOLD ||
      billing.testsAvailable < NUDGE_TESTS_THRESHOLD);

  return {
    userId,
    planTier: billing.planTier,
    passActive: billing.passActive,
    questionsAvailable: billing.questionsAvailable,
    testsAvailable: billing.testsAvailable,
    showUpgradeNudge,
    upgradeUrl: UPGRADE_URL,
  };
}

/**
 * Check whether a user can access GetVidyaAI chat.
 *
 * AI chat is a PRO-exclusive feature. STANDARD and FREE users receive
 * allowed=false so the caller can redirect them to the upgrade page.
 */
export async function canUseAiChat(userId: string): Promise<TierCheckResult> {
  if (!userId) throw new Error("[tierGuard] canUseAiChat: userId is required");

  const billing = await fetchBilling(userId);
  if (!billing) return noBillingResult();

  // Both conditions must hold: correct tier AND pass must be active
  if (billing.planTier === "PRO" && billing.passActive) {
    return {
      allowed: true,
      reason: "PASS_ACTIVE",
      planTier: billing.planTier,
      passActive: true,
      remainingQuestions: billing.questionsAvailable,
      remainingTests: billing.testsAvailable,
      upgradeUrl: UPGRADE_URL,
    };
  }

  return {
    allowed: false,
    reason: "LIMIT_REACHED",
    planTier: billing.planTier,
    passActive: billing.passActive,
    remainingQuestions: billing.questionsAvailable,
    remainingTests: billing.testsAvailable,
    upgradeUrl: UPGRADE_URL,
  };
}

/**
 * Full billing integrity audit — intended for cron or admin-only routes.
 *
 * Surfaces four classes of anomaly:
 *  1. FREE user with passActive=true  (known live bug: 1 affected row)
 *  2. STANDARD/PRO user with passActive=false  (subscription lapse not cleaned up)
 *  3. questionsAvailable < 0  (atomic decrement guard was bypassed)
 *  4. testsAvailable < 0      (atomic decrement guard was bypassed)
 *
 * Returns a clean=true report when no anomalies are found.
 */
export async function auditBillingIntegrity(): Promise<IntegrityReport> {
  const db = getServiceClient();

  const { data, error } = await db
    .from("UserBilling")
    .select(
      "id, userId, planTier, passActive, questionsAvailable, testsAvailable"
    );

  if (error) {
    throw new Error(
      `[tierGuard] auditBillingIntegrity: query failed: ${error.message}`
    );
  }

  const rows = (data ?? []) as Array<{
    id: string;
    userId: string;
    planTier: PlanTier;
    passActive: boolean;
    questionsAvailable: number;
    testsAvailable: number;
  }>;

  const anomalies: IntegrityReport["anomalies"] = [];

  for (const row of rows) {
    // 1. FREE + passActive=true — the known live billing bug
    if (row.planTier === "FREE" && row.passActive === true) {
      anomalies.push({
        userId: row.userId,
        billingId: row.id,
        issue:
          "FREE-tier user has passActive=true. Probable cause: manual DB override " +
          "or a payment webhook failure that left planTier unreset after a refund/chargeback.",
        planTier: row.planTier,
        passActive: row.passActive,
      });
    }

    // 2. STANDARD or PRO + passActive=false — tier says paid but pass is off
    if (
      (row.planTier === "STANDARD" || row.planTier === "PRO") &&
      row.passActive === false
    ) {
      anomalies.push({
        userId: row.userId,
        billingId: row.id,
        issue:
          `${row.planTier}-tier user has passActive=false. Subscription may have expired ` +
          "without the cancellation webhook resetting planTier to FREE.",
        planTier: row.planTier,
        passActive: row.passActive,
      });
    }

    // 3. Negative questionsAvailable — counter underflowed
    if (row.questionsAvailable < 0) {
      anomalies.push({
        userId: row.userId,
        billingId: row.id,
        issue:
          `questionsAvailable is ${row.questionsAvailable} (negative). ` +
          "The atomic decrement RPC guard was bypassed — likely a direct SQL UPDATE.",
        planTier: row.planTier,
        passActive: row.passActive,
      });
    }

    // 4. Negative testsAvailable — counter underflowed
    if (row.testsAvailable < 0) {
      anomalies.push({
        userId: row.userId,
        billingId: row.id,
        issue:
          `testsAvailable is ${row.testsAvailable} (negative). ` +
          "The atomic decrement RPC guard was bypassed — likely a direct SQL UPDATE.",
        planTier: row.planTier,
        passActive: row.passActive,
      });
    }
  }

  return {
    anomalies,
    totalChecked: rows.length,
    clean: anomalies.length === 0,
  };
}

// =============================================================================
// Required Postgres RPC functions — run once in the Supabase SQL Editor
// =============================================================================
//
// These two functions must exist before consumeQuestion() / consumeTest() can
// be called in production. The SECURITY DEFINER + explicit REVOKE/GRANT ensures
// only the service_role can invoke them, matching the principle of least privilege.
//
// -- ── decrement_questions_available ─────────────────────────────────────────
//
// CREATE OR REPLACE FUNCTION public.decrement_questions_available(p_user_id TEXT)
// RETURNS void
// LANGUAGE sql
// SECURITY DEFINER
// SET search_path = public
// AS $$
//   UPDATE "UserBilling"
//   SET    "questionsAvailable" = "questionsAvailable" - 1
//   WHERE  "userId" = p_user_id
//     AND  "questionsAvailable" > 0;
// $$;
//
// REVOKE ALL ON FUNCTION public.decrement_questions_available(TEXT) FROM PUBLIC;
// GRANT  EXECUTE ON FUNCTION public.decrement_questions_available(TEXT) TO service_role;
//
// -- ── decrement_tests_available ──────────────────────────────────────────────
//
// CREATE OR REPLACE FUNCTION public.decrement_tests_available(p_user_id TEXT)
// RETURNS void
// LANGUAGE sql
// SECURITY DEFINER
// SET search_path = public
// AS $$
//   UPDATE "UserBilling"
//   SET    "testsAvailable" = "testsAvailable" - 1
//   WHERE  "userId" = p_user_id
//     AND  "testsAvailable" > 0;
// $$;
//
// REVOKE ALL ON FUNCTION public.decrement_tests_available(TEXT) FROM PUBLIC;
// GRANT  EXECUTE ON FUNCTION public.decrement_tests_available(TEXT) TO service_role;
//
// =============================================================================
