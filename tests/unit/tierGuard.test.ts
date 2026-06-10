/**
 * tests/unit/tierGuard.test.ts
 *
 * Jest unit tests for lib/middleware/tierGuard.ts
 *
 * Strategy
 * ────────
 * We mock @supabase/supabase-js at the module boundary so no real network
 * calls are made. The mock captures the query chain (.from().select()...) and
 * returns pre-shaped fixture data, letting us test every branch of the guard
 * logic in isolation.
 *
 * Run with:
 *   npx jest tests/unit/tierGuard.test.ts --testEnvironment node
 *
 * Required jest config (jest.config.js or package.json):
 *   moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" }
 *   transform: { "^.+\\.tsx?$": ["ts-jest", {}] }
 */

// ── Jest module mock ──────────────────────────────────────────────────────────

/**
 * mockRpc holds the handler for the most recent .rpc() call.
 * Tests override it per-case with mockRpc.mockResolvedValueOnce().
 */
const mockRpc = jest.fn();

/**
 * mockMaybeSingle holds the response for the most recent query chain that
 * ends with .maybeSingle(). Tests set it with mockMaybeSingle.mockResolvedValueOnce().
 */
const mockMaybeSingle = jest.fn();

/**
 * mockSelect holds the response for full-table SELECT queries (used by
 * auditBillingIntegrity which does not call .maybeSingle()).
 */
const mockSelectAll = jest.fn();

// We need a chainable builder that both paths share.
// .from() → .select() → .eq() → .maybeSingle()   (single-row path)
// .from() → .select()                              (all-rows path — auditBillingIntegrity)
const buildChain = (selectFn: jest.Mock, maybeSingleFn: jest.Mock) => ({
  select: selectFn,
});

jest.mock("@supabase/supabase-js", () => {
  // We need the chain to be re-usable across different eq() call counts.
  const eqChain = {
    eq: jest.fn().mockReturnThis(),
    maybeSingle: mockMaybeSingle,
  };

  const selectChain = {
    ...eqChain,
    // When auditBillingIntegrity calls .select() without further chaining
    // we resolve immediately. mockSelectAll is set per test.
    then: (resolve: (v: unknown) => void, reject: (e: unknown) => void) =>
      mockSelectAll().then(resolve, reject),
  };

  const fromFn = jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue(selectChain),
  });

  const mockCreateClient = jest.fn().mockReturnValue({
    from: fromFn,
    rpc: mockRpc,
    auth: {
      persistSession: false,
    },
  });

  return { createClient: mockCreateClient };
});

// ── Environment setup ─────────────────────────────────────────────────────────

// These must be set before the module is imported so getServiceClient() succeeds.
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://bzlqlohvbraclvvmbfdt.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key-for-unit-tests";

// ── Import after mocks are in place ──────────────────────────────────────────

import {
  canStartExam,
  canGetQuestion,
  consumeQuestion,
  consumeTest,
  getUserTierContext,
  canUseAiChat,
  auditBillingIntegrity,
  TierCheckResult,
  TierContext,
  IntegrityReport,
} from "@/lib/middleware/tierGuard";

// ── Fixture factories ─────────────────────────────────────────────────────────

function makeBillingRow(overrides: Partial<{
  id: string;
  userId: string;
  planTier: "FREE" | "STANDARD" | "PRO";
  passActive: boolean;
  questionsAvailable: number;
  testsAvailable: number;
}> = {}) {
  return {
    id: "billing-001",
    userId: "user-001",
    planTier: "FREE" as const,
    passActive: false,
    questionsAvailable: 10,
    testsAvailable: 3,
    ...overrides,
  };
}

/** Wire mockMaybeSingle to return a billing row (or null). */
function mockBilling(row: ReturnType<typeof makeBillingRow> | null) {
  mockMaybeSingle.mockResolvedValueOnce({ data: row, error: null });
}

/** Wire mockBilling to simulate a Supabase error. */
function mockBillingError(message: string) {
  mockMaybeSingle.mockResolvedValueOnce({ data: null, error: { message } });
}

/** Wire mockSelectAll for auditBillingIntegrity full-table scans. */
function mockAllBillingRows(rows: ReturnType<typeof makeBillingRow>[]) {
  mockSelectAll.mockResolvedValueOnce({ data: rows, error: null });
}

// ── Reset between tests ───────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks();
  // Default RPC success (tests that don't care about the result)
  mockRpc.mockResolvedValue({ data: null, error: null });
});

// =============================================================================
// canStartExam
// =============================================================================

describe("canStartExam", () => {
  it("FREE user with testsAvailable > 0 → allowed via COUNTER_AVAILABLE", async () => {
    expect.assertions(4);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, testsAvailable: 2 }));

    const result: TierCheckResult = await canStartExam("user-001");

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("COUNTER_AVAILABLE");
    expect(result.planTier).toBe("FREE");
    expect(result.upgradeUrl).toBe("https://getvidya.in/pricing");
  });

  it("FREE user with testsAvailable = 0 and passActive = false → LIMIT_REACHED", async () => {
    expect.assertions(4);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, testsAvailable: 0 }));

    const result = await canStartExam("user-001");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("LIMIT_REACHED");
    expect(result.remainingTests).toBe(0);
    expect(result.upgradeUrl).toBe("https://getvidya.in/pricing");
  });

  it("PRO user → allowed via PASS_ACTIVE regardless of counter values", async () => {
    expect.assertions(3);
    mockBilling(makeBillingRow({ planTier: "PRO", passActive: true, testsAvailable: 0 }));

    const result = await canStartExam("user-pro");

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("PASS_ACTIVE");
    expect(result.planTier).toBe("PRO");
  });

  it("STANDARD user with passActive = true → allowed via PASS_ACTIVE", async () => {
    expect.assertions(2);
    mockBilling(makeBillingRow({ planTier: "STANDARD", passActive: true, testsAvailable: 0 }));

    const result = await canStartExam("user-standard");

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("PASS_ACTIVE");
  });

  it("No billing record → NO_BILLING_RECORD, not allowed", async () => {
    expect.assertions(3);
    mockBilling(null);

    const result = await canStartExam("user-no-billing");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("NO_BILLING_RECORD");
    expect(result.planTier).toBe("FREE");
  });

  it("Supabase error → throws with descriptive message", async () => {
    expect.assertions(1);
    mockBillingError("connection timeout");

    await expect(canStartExam("user-001")).rejects.toThrow(
      "fetchBilling failed for userId=user-001"
    );
  });

  it("Empty userId → throws immediately without hitting Supabase", async () => {
    expect.assertions(1);
    await expect(canStartExam("")).rejects.toThrow("userId is required");
  });
});

// =============================================================================
// canGetQuestion
// =============================================================================

describe("canGetQuestion", () => {
  it("FREE user with questionsAvailable > 0 → allowed via COUNTER_AVAILABLE", async () => {
    expect.assertions(4);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, questionsAvailable: 8 }));

    const result = await canGetQuestion("user-001");

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("COUNTER_AVAILABLE");
    expect(result.remainingQuestions).toBe(8);
    expect(result.upgradeUrl).toBe("https://getvidya.in/pricing");
  });

  it("FREE user with questionsAvailable = 0 and passActive = false → LIMIT_REACHED", async () => {
    expect.assertions(4);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, questionsAvailable: 0 }));

    const result = await canGetQuestion("user-001");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("LIMIT_REACHED");
    expect(result.remainingQuestions).toBe(0);
    expect(result.planTier).toBe("FREE");
  });

  it("PRO user with questionsAvailable = 0 → allowed via PASS_ACTIVE", async () => {
    expect.assertions(3);
    mockBilling(makeBillingRow({ planTier: "PRO", passActive: true, questionsAvailable: 0 }));

    const result = await canGetQuestion("user-pro");

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("PASS_ACTIVE");
    expect(result.planTier).toBe("PRO");
  });

  it("No billing record → NO_BILLING_RECORD, not allowed", async () => {
    expect.assertions(2);
    mockBilling(null);

    const result = await canGetQuestion("user-ghost");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("NO_BILLING_RECORD");
  });

  it("Empty userId → throws immediately", async () => {
    expect.assertions(1);
    await expect(canGetQuestion("")).rejects.toThrow("userId is required");
  });
});

// =============================================================================
// consumeQuestion
// =============================================================================

describe("consumeQuestion", () => {
  it("FREE user with available questions → calls decrement_questions_available RPC", async () => {
    expect.assertions(3);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, questionsAvailable: 5 }));
    mockRpc.mockResolvedValueOnce({ data: null, error: null });

    await consumeQuestion("user-001");

    expect(mockRpc).toHaveBeenCalledTimes(1);
    expect(mockRpc).toHaveBeenCalledWith("decrement_questions_available", {
      p_user_id: "user-001",
    });
    // Verify the RPC name contains the atomic WHERE guard intent
    const [rpcName] = mockRpc.mock.calls[0] as [string, unknown];
    expect(rpcName).toBe("decrement_questions_available");
  });

  it("passActive user → RPC is never called (unlimited quota)", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ planTier: "PRO", passActive: true, questionsAvailable: 0 }));

    await consumeQuestion("user-pro");

    // The no-op path must not touch the counter RPC
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("No billing record → throws, RPC not called", async () => {
    expect.assertions(2);
    mockBilling(null);

    await expect(consumeQuestion("user-ghost")).rejects.toThrow(
      "no UserBilling record for userId=user-ghost"
    );
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("RPC failure → throws with cause message", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, questionsAvailable: 3 }));
    mockRpc.mockResolvedValueOnce({ data: null, error: { message: "deadlock detected" } });

    await expect(consumeQuestion("user-001")).rejects.toThrow(
      "RPC decrement_questions_available failed"
    );
  });

  it("Verifies WHERE guard intent: RPC name encodes atomic-decrement semantics", async () => {
    // This test is a contract assertion: the implementation MUST use an RPC that
    // internally applies WHERE questionsAvailable > 0, not a naive JS decrement.
    // We verify the exact RPC name the Supabase function must have registered.
    expect.assertions(1);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, questionsAvailable: 1 }));
    mockRpc.mockResolvedValueOnce({ data: null, error: null });

    await consumeQuestion("user-001");

    expect(mockRpc.mock.calls[0][0]).toBe("decrement_questions_available");
  });

  it("Empty userId → throws immediately without fetching billing", async () => {
    expect.assertions(1);
    await expect(consumeQuestion("")).rejects.toThrow("userId is required");
  });
});

// =============================================================================
// consumeTest
// =============================================================================

describe("consumeTest", () => {
  it("FREE user with available tests → calls decrement_tests_available RPC", async () => {
    expect.assertions(2);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, testsAvailable: 2 }));
    mockRpc.mockResolvedValueOnce({ data: null, error: null });

    await consumeTest("user-001");

    expect(mockRpc).toHaveBeenCalledTimes(1);
    expect(mockRpc).toHaveBeenCalledWith("decrement_tests_available", {
      p_user_id: "user-001",
    });
  });

  it("passActive user → RPC is never called", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ planTier: "STANDARD", passActive: true, testsAvailable: 0 }));

    await consumeTest("user-standard");

    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("No billing record → throws without calling RPC", async () => {
    expect.assertions(2);
    mockBilling(null);

    await expect(consumeTest("user-ghost")).rejects.toThrow(
      "no UserBilling record for userId=user-ghost"
    );
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("RPC failure → throws with cause message", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false, testsAvailable: 1 }));
    mockRpc.mockResolvedValueOnce({ data: null, error: { message: "function not found" } });

    await expect(consumeTest("user-001")).rejects.toThrow(
      "RPC decrement_tests_available failed"
    );
  });

  it("Empty userId → throws immediately", async () => {
    expect.assertions(1);
    await expect(consumeTest("")).rejects.toThrow("userId is required");
  });
});

// =============================================================================
// getUserTierContext
// =============================================================================

describe("getUserTierContext", () => {
  it("FREE user with questionsAvailable < 5 → showUpgradeNudge = true", async () => {
    expect.assertions(5);
    mockBilling(
      makeBillingRow({
        planTier: "FREE",
        passActive: false,
        questionsAvailable: 3,
        testsAvailable: 2,
      })
    );

    const ctx: TierContext = await getUserTierContext("user-001");

    expect(ctx.userId).toBe("user-001");
    expect(ctx.planTier).toBe("FREE");
    expect(ctx.showUpgradeNudge).toBe(true);
    expect(ctx.questionsAvailable).toBe(3);
    expect(ctx.upgradeUrl).toBe("https://getvidya.in/pricing");
  });

  it("FREE user with questionsAvailable >= 5 AND testsAvailable >= 1 → showUpgradeNudge = false", async () => {
    expect.assertions(2);
    mockBilling(
      makeBillingRow({
        planTier: "FREE",
        passActive: false,
        questionsAvailable: 10,
        testsAvailable: 3,
      })
    );

    const ctx = await getUserTierContext("user-001");

    expect(ctx.showUpgradeNudge).toBe(false);
    expect(ctx.planTier).toBe("FREE");
  });

  it("FREE user with testsAvailable = 0 (< 1 threshold) → showUpgradeNudge = true", async () => {
    expect.assertions(1);
    mockBilling(
      makeBillingRow({
        planTier: "FREE",
        passActive: false,
        questionsAvailable: 10,
        testsAvailable: 0,
      })
    );

    const ctx = await getUserTierContext("user-001");
    expect(ctx.showUpgradeNudge).toBe(true);
  });

  it("PRO user with passActive = true → showUpgradeNudge = false regardless of counter", async () => {
    expect.assertions(3);
    mockBilling(
      makeBillingRow({
        planTier: "PRO",
        passActive: true,
        questionsAvailable: 0,
        testsAvailable: 0,
      })
    );

    const ctx = await getUserTierContext("user-pro");

    expect(ctx.showUpgradeNudge).toBe(false);
    expect(ctx.passActive).toBe(true);
    expect(ctx.planTier).toBe("PRO");
  });

  it("No billing record → returns locked FREE context with showUpgradeNudge = true", async () => {
    expect.assertions(5);
    mockBilling(null);

    const ctx = await getUserTierContext("user-ghost");

    expect(ctx.planTier).toBe("FREE");
    expect(ctx.passActive).toBe(false);
    expect(ctx.questionsAvailable).toBe(0);
    expect(ctx.testsAvailable).toBe(0);
    expect(ctx.showUpgradeNudge).toBe(true);
  });

  it("Empty userId → throws immediately", async () => {
    expect.assertions(1);
    await expect(getUserTierContext("")).rejects.toThrow("userId is required");
  });
});

// =============================================================================
// canUseAiChat
// =============================================================================

describe("canUseAiChat", () => {
  it("PRO user with passActive = true → allowed", async () => {
    expect.assertions(3);
    mockBilling(makeBillingRow({ planTier: "PRO", passActive: true }));

    const result = await canUseAiChat("user-pro");

    expect(result.allowed).toBe(true);
    expect(result.reason).toBe("PASS_ACTIVE");
    expect(result.planTier).toBe("PRO");
  });

  it("STANDARD user → not allowed (AI chat is PRO-only)", async () => {
    expect.assertions(3);
    mockBilling(makeBillingRow({ planTier: "STANDARD", passActive: true }));

    const result = await canUseAiChat("user-standard");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("LIMIT_REACHED");
    expect(result.upgradeUrl).toBe("https://getvidya.in/pricing");
  });

  it("FREE user → not allowed", async () => {
    expect.assertions(2);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false }));

    const result = await canUseAiChat("user-free");

    expect(result.allowed).toBe(false);
    expect(result.planTier).toBe("FREE");
  });

  it("PRO user with passActive = false → not allowed (anomaly path)", async () => {
    // This covers the known billing integrity bug applied to PRO instead of FREE.
    // A PRO user whose subscription lapsed should be blocked from AI chat.
    expect.assertions(2);
    mockBilling(makeBillingRow({ planTier: "PRO", passActive: false }));

    const result = await canUseAiChat("user-pro-lapsed");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("LIMIT_REACHED");
  });

  it("No billing record → NO_BILLING_RECORD, not allowed", async () => {
    expect.assertions(2);
    mockBilling(null);

    const result = await canUseAiChat("user-ghost");

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("NO_BILLING_RECORD");
  });

  it("Empty userId → throws immediately", async () => {
    expect.assertions(1);
    await expect(canUseAiChat("")).rejects.toThrow("userId is required");
  });
});

// =============================================================================
// auditBillingIntegrity
// =============================================================================

describe("auditBillingIntegrity", () => {
  it("All clean rows → clean = true, 0 anomalies", async () => {
    expect.assertions(3);
    mockAllBillingRows([
      makeBillingRow({ planTier: "FREE",     passActive: false, questionsAvailable: 10, testsAvailable: 3 }),
      makeBillingRow({ planTier: "STANDARD", passActive: true,  questionsAvailable: 50, testsAvailable: 10, id: "b2", userId: "u2" }),
      makeBillingRow({ planTier: "PRO",      passActive: true,  questionsAvailable: 0,  testsAvailable: 0,  id: "b3", userId: "u3" }),
    ]);

    const report: IntegrityReport = await auditBillingIntegrity();

    expect(report.clean).toBe(true);
    expect(report.anomalies).toHaveLength(0);
    expect(report.totalChecked).toBe(3);
  });

  it("FREE user with passActive=true → surfaces as anomaly (the known live bug)", async () => {
    expect.assertions(5);
    const anomalousBilling = makeBillingRow({
      id: "billing-bad",
      userId: "user-bad",
      planTier: "FREE",
      passActive: true,  // <── the live bug
    });
    mockAllBillingRows([anomalousBilling]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(false);
    expect(report.anomalies).toHaveLength(1);
    expect(report.anomalies[0].userId).toBe("user-bad");
    expect(report.anomalies[0].billingId).toBe("billing-bad");
    expect(report.anomalies[0].passActive).toBe(true);
  });

  it("STANDARD user with passActive=false → surfaces as anomaly", async () => {
    expect.assertions(3);
    mockAllBillingRows([
      makeBillingRow({ planTier: "STANDARD", passActive: false, id: "b1", userId: "u1" }),
    ]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(false);
    expect(report.anomalies[0].planTier).toBe("STANDARD");
    expect(report.anomalies[0].issue).toMatch(/passActive=false/);
  });

  it("PRO user with passActive=false → surfaces as anomaly", async () => {
    expect.assertions(2);
    mockAllBillingRows([
      makeBillingRow({ planTier: "PRO", passActive: false, id: "b1", userId: "u1" }),
    ]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(false);
    expect(report.anomalies[0].planTier).toBe("PRO");
  });

  it("questionsAvailable < 0 → surfaces as counter underflow anomaly", async () => {
    expect.assertions(3);
    mockAllBillingRows([
      makeBillingRow({ questionsAvailable: -3, id: "b1", userId: "u1" }),
    ]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(false);
    expect(report.anomalies[0].issue).toMatch(/questionsAvailable/);
    expect(report.anomalies[0].issue).toMatch(/-3/);
  });

  it("testsAvailable < 0 → surfaces as counter underflow anomaly", async () => {
    expect.assertions(2);
    mockAllBillingRows([
      makeBillingRow({ testsAvailable: -1, id: "b1", userId: "u1" }),
    ]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(false);
    expect(report.anomalies[0].issue).toMatch(/testsAvailable/);
  });

  it("Multiple anomalies → all are reported", async () => {
    expect.assertions(3);
    mockAllBillingRows([
      // Anomaly 1: FREE + passActive=true
      makeBillingRow({ planTier: "FREE",     passActive: true,  id: "b1", userId: "u1" }),
      // Anomaly 2: STANDARD + passActive=false
      makeBillingRow({ planTier: "STANDARD", passActive: false, id: "b2", userId: "u2" }),
      // Clean row
      makeBillingRow({ planTier: "PRO",      passActive: true,  id: "b3", userId: "u3" }),
    ]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(false);
    expect(report.anomalies).toHaveLength(2);
    expect(report.totalChecked).toBe(3);
  });

  it("Supabase error → throws with descriptive message", async () => {
    expect.assertions(1);
    mockSelectAll.mockResolvedValueOnce({
      data: null,
      error: { message: "relation does not exist" },
    });

    await expect(auditBillingIntegrity()).rejects.toThrow(
      "auditBillingIntegrity: query failed"
    );
  });

  it("Empty table → clean report with totalChecked = 0", async () => {
    expect.assertions(3);
    mockAllBillingRows([]);

    const report = await auditBillingIntegrity();

    expect(report.clean).toBe(true);
    expect(report.anomalies).toHaveLength(0);
    expect(report.totalChecked).toBe(0);
  });
});

// =============================================================================
// upgradeUrl contract — all functions must return the canonical pricing URL
// =============================================================================

describe("upgradeUrl contract", () => {
  const EXPECTED_URL = "https://getvidya.in/pricing";

  it("canStartExam always returns canonical upgradeUrl", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ passActive: false, testsAvailable: 0 }));
    const result = await canStartExam("user-001");
    expect(result.upgradeUrl).toBe(EXPECTED_URL);
  });

  it("canGetQuestion always returns canonical upgradeUrl", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ passActive: false, questionsAvailable: 0 }));
    const result = await canGetQuestion("user-001");
    expect(result.upgradeUrl).toBe(EXPECTED_URL);
  });

  it("canUseAiChat always returns canonical upgradeUrl", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow({ planTier: "FREE", passActive: false }));
    const result = await canUseAiChat("user-001");
    expect(result.upgradeUrl).toBe(EXPECTED_URL);
  });

  it("getUserTierContext always returns canonical upgradeUrl", async () => {
    expect.assertions(1);
    mockBilling(makeBillingRow());
    const ctx = await getUserTierContext("user-001");
    expect(ctx.upgradeUrl).toBe(EXPECTED_URL);
  });

  it("noBillingResult always returns canonical upgradeUrl", async () => {
    expect.assertions(1);
    mockBilling(null);
    const result = await canStartExam("user-ghost");
    expect(result.upgradeUrl).toBe(EXPECTED_URL);
  });
});
