/**
 * GetVidya Mock Test Engine — Playwright E2E Suite
 * Target: https://app.getvidya.in  (SvelteKit frontend)
 * Backend API: https://getvidya-platform-three.vercel.app/api
 *
 * Confirmed facts from bundle analysis (2026-05-25):
 *   - Framework: SvelteKit (not Next.js). Headers show x-sveltekit-page:true.
 *   - Auth: OTP-based phone login via POST /api/users → POST /api/users/verify.
 *     On success, response body contains { id, token }; stored in localStorage
 *     as "userId" and "authToken".
 *   - API base string in api.DGkwxTs_.js:
 *       const s = `https://getvidya-platform-three.vercel.app/api${n}`
 *   - All API calls add Bearer token from localStorage.getItem("authToken").
 *   - 401 responses trigger a client-side goto("/login") redirect.
 *   - Test engine (node_30.RHaNfbWf.js) reads option.isCorrect DIRECTLY from
 *       f.questions[g].options.find(_ => _.isCorrect)
 *     where f is the exam object stored in localStorage("testDetails").
 *     The exam object arrives via the exam-start flow; isCorrect IS present
 *     in that payload and is used client-side to score answers locally before
 *     the PUT /tests/${id} call.
 *   - Bookmark toggle: handled purely in client state (no immediate API call).
 *     The bookmarkedQuestions array is sent in the PUT /tests/${id} body.
 *   - Question navigation is fully client-side via Svelte stores. No page
 *     reload or full navigation on question switch.
 *   - Confirmed routes:
 *       /               → main hub (shows category+subcategory picker)
 *       /tests          → test list page
 *       /tests/exam-details/[id] → exam detail page
 *       /tests/exam-start/[id]   → starts a test (requires auth + active plan)
 *       /tests/[examId]          → test runner  ← THE TEST ENGINE
 *       /tests/review/[id]       → post-test result page
 *       /practice       → AI practice hub
 *       /revision-vault → bookmarked/wrong/skipped questions
 *       /login          → OTP login
 *   - Confirmed API endpoints:
 *       GET  /categories
 *       GET  /users/:id
 *       PUT  /users/:id
 *       POST /users
 *       POST /users/verify
 *       GET  /users/usage
 *       GET  /users/:id/activity
 *       GET  /users/:id/sub-categories
 *       GET  /users/:id/tests
 *       GET  /users/logout
 *       GET  /billing
 *       GET  /tests
 *       GET  /tests/:id
 *       PUT  /tests/:id        (saves answer state mid-test)
 *       POST /tests/:id/complete
 *       GET  /practices/statistics
 *       POST /questions/batch  (body: { ids: string[] })
 *       GET  /faq
 *       POST /chat
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * playwright.config.ts (place in project root):
 *
 * import { defineConfig } from '@playwright/test';
 * export default defineConfig({
 *   testDir: './tests/e2e',
 *   timeout: 30_000,
 *   retries: 1,
 *   use: {
 *     baseURL: 'https://app.getvidya.in',
 *     headless: true,
 *     viewport: { width: 1280, height: 800 },
 *     screenshot: 'only-on-failure',
 *     video: 'retain-on-failure',
 *     locale: 'en-IN',
 *     extraHTTPHeaders: {
 *       'Accept-Language': 'en-IN,en;q=0.9',
 *     },
 *   },
 *   reporter: [['html', { open: 'never' }], ['list']],
 *   projects: [
 *     {
 *       name: 'chromium',
 *       use: { browserName: 'chromium' },
 *     },
 *   ],
 * });
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Setup: npm i -D @playwright/test && npx playwright install chromium
 *
 * Run:   npx playwright test tests/e2e/mock-test-engine.spec.ts
 *        npx playwright test tests/e2e/mock-test-engine.spec.ts --headed
 *
 * Evidence screenshots land in: evidence/
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test, expect, type Page, type Request, type Response } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Global configuration
// ---------------------------------------------------------------------------

test.setTimeout(30_000);

const APP_URL  = 'https://app.getvidya.in';
const API_BASE = 'https://getvidya-platform-three.vercel.app/api';

/** Directory that receives all screenshot evidence. */
const EVIDENCE_DIR = path.join(process.cwd(), 'evidence');

/** Ensure the evidence directory exists before any screenshot call. */
function ensureEvidenceDir(): void {
  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }
}

/** Take a named screenshot and place it in the evidence directory. */
async function evidence(page: Page, name: string): Promise<void> {
  ensureEvidenceDir();
  await page.screenshot({
    path:     path.join(EVIDENCE_DIR, name),
    fullPage: false,
  });
}

// ---------------------------------------------------------------------------
// Helper: deep-search any plain JS value for a key name
// Returns true if the key appears anywhere in the object tree.
// ---------------------------------------------------------------------------

function deepHasKey(value: unknown, key: string): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value !== 'object') return false;

  for (const k of Object.keys(value as Record<string, unknown>)) {
    if (k === key) return true;
    if (deepHasKey((value as Record<string, unknown>)[k], key)) return true;
  }

  if (Array.isArray(value)) {
    for (const item of value as unknown[]) {
      if (deepHasKey(item, key)) return true;
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// Shared auth state: inject a mock authToken into localStorage so tests that
// require a logged-in session can proceed without a real OTP flow.
//
// IMPORTANT: This does NOT give access to paid features. Tests for the actual
// test engine REQUIRE a valid token from a real user session. The auth
// injection below is used ONLY for the network intercept and UI visibility
// checks that do not need a real backend response.
// ---------------------------------------------------------------------------

/** Seed localStorage with a placeholder auth context (avoids the splash screen
 *  redirect to /login so the actual SvelteKit app renders). */
async function seedLocalStorage(page: Page): Promise<void> {
  // We use a deliberately invalid token. The app will attempt API calls,
  // receive 401s, and redirect to /login — which is the expected behaviour
  // for unauthenticated tests. Tests that must reach the test engine need
  // a real token injected via environment variable TEST_AUTH_TOKEN.
  const authToken = process.env['TEST_AUTH_TOKEN'] ?? '__PLACEHOLDER_TOKEN__';
  const userId    = process.env['TEST_USER_ID']    ?? '__PLACEHOLDER_USER_ID__';

  await page.addInitScript(
    ({ token, uid }: { token: string; uid: string }) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', uid);
    },
    { token: authToken, uid: userId },
  );
}

// ---------------------------------------------------------------------------
// SUITE 1: Exam Hub Loads Category and Subcategory Hierarchy
// ---------------------------------------------------------------------------

test.describe('Exam Hub', () => {

  test('exam hub loads category and subcategory hierarchy', async ({ page }) => {
    // ── Navigate to the root route ──────────────────────────────────────────
    // The app shows a full-screen loading spinner initially (primary-logo.svg
    // visible in the SSR HTML), then hydrates and either shows the hub or
    // redirects to /login depending on auth state.
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });

    // ── 1. Page title check ─────────────────────────────────────────────────
    // The SvelteKit app sets document.title dynamically. On the dashboard it
    // is "Dashboard". On the exam hub it may remain unset (no explicit title
    // in the SSR HTML), so we assert on the URL or app logo instead.
    await expect.soft(page).toHaveTitle(/GetVidya|Vidya|Dashboard/i, {
      timeout: 8_000,
    });

    // ── 2. Primary logo must be visible ────────────────────────────────────
    // Confirmed in bundle: <img src="/icons/primary-logo.svg" alt="logo" …>
    const logo = page.locator('img[alt="logo"][src="/icons/primary-logo.svg"]');
    await expect(logo).toBeVisible({ timeout: 10_000 });

    // ── 3. Category hierarchy — wait for data ──────────────────────────────
    // The app renders a list of exam categories as radio-based labels.
    // Confirmed in Explore.CVYLvUhH.js: each category becomes a <label>
    // with for="exam-0", for="exam-1", etc.
    // The subcategory list for the first category is rendered alongside.
    //
    // We look for any of these selectors, in priority order:
    const categorySelectors = [
      '[data-testid="category-card"]',
      'label[for^="exam-"]',         // confirmed DOM structure
      'label[class*="cursor-pointer"]',
    ];

    let categoryFound = false;
    for (const sel of categorySelectors) {
      const count = await page.locator(sel).count();
      if (count > 0) {
        categoryFound = true;
        expect(count).toBeGreaterThanOrEqual(1);
        break;
      }
    }

    // If we landed on /login instead (no auth), assert login page is visible.
    if (!categoryFound) {
      const currentUrl = page.url();
      const onLogin = currentUrl.includes('/login');

      if (onLogin) {
        // Expected when no real token is injected — mark test as soft-skip.
        expect.soft(onLogin).toBeTruthy();
        console.warn(
          '[exam-hub] Redirected to /login — no real TEST_AUTH_TOKEN provided. ' +
          'Set env var TEST_AUTH_TOKEN and TEST_USER_ID to test the authenticated hub.',
        );
      } else {
        // We are on the app but no category cards are visible — this is a
        // genuine failure.
        expect(categoryFound, 'Expected at least one category card to be visible').toBeTruthy();
      }
    }

    // ── 4. Screenshot evidence ─────────────────────────────────────────────
    await evidence(page, 'exam-hub-loaded.png');
  });

});

// ---------------------------------------------------------------------------
// SUITE 2: Security — isCorrect must not leak in any API response
// ---------------------------------------------------------------------------

test.describe('Security: isCorrect field exposure', () => {

  /**
   * This is the highest-severity test in the suite.
   *
   * What we know from bundle analysis:
   *   - The test engine (node_30.RHaNfbWf.js) reads
   *       f.questions[g].options.find(_ => _.isCorrect)
   *     directly from client-side data. This data originates from the
   *     exam-start API response stored in localStorage("testDetails").
   *   - The /questions/batch endpoint (node_26.CiElxQdy.js) is used by the
   *     Revision Vault to fetch question text only (returns { id, text,
   *     difficulty } — isCorrect is NOT used from this payload).
   *
   * What this test verifies:
   *   - ANY network response matching question/exam/practice API patterns
   *     must NOT expose `isCorrect` in its JSON body.
   *
   * Known architecture reality:
   *   The current client-side test engine scores answers locally using
   *   isCorrect from the exam payload. If this test FAILS, it confirms a
   *   LIVE SECURITY VIOLATION where correct-answer data is served to every
   *   authenticated user, enabling answer harvesting without submitting.
   */
  test('question payload does not expose isCorrect in network response', async ({ page }) => {
    // Collect all matching API responses for later analysis.
    const capturedResponses: Array<{ url: string; body: string }> = [];

    // ── Pattern: any API call that returns question/exam/option data ────────
    const questionApiPattern = (url: string): boolean => {
      const patterns = [
        /\/api\/.*question/i,
        /\/api\/.*exam/i,
        /\/api\/.*practice/i,
        /\/api\/tests/i,
        /\/api\/questions/i,
      ];
      return patterns.some((p) => p.test(url));
    };

    // ── Intercept and capture responses ────────────────────────────────────
    page.on('response', async (response: Response) => {
      const url = response.url();
      if (!questionApiPattern(url)) return;

      try {
        const contentType = response.headers()['content-type'] ?? '';
        if (!contentType.includes('application/json')) return;

        const body = await response.text();
        capturedResponses.push({ url, body });
      } catch {
        // Response body may not be available if the connection closed early.
      }
    });

    // ── Navigate and trigger API calls ─────────────────────────────────────
    await seedLocalStorage(page);
    await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 20_000 });

    // Try navigating to the tests route to trigger /api/tests call.
    try {
      await page.goto(`${APP_URL}/tests`, { waitUntil: 'networkidle', timeout: 15_000 });
    } catch {
      // Acceptable — tests page may redirect to login.
    }

    // Also try the revision-vault which hits /api/questions/batch.
    try {
      await page.goto(`${APP_URL}/revision-vault`, { waitUntil: 'networkidle', timeout: 15_000 });
    } catch {
      // Acceptable.
    }

    // Try the practice route which hits /api/practices/statistics.
    try {
      await page.goto(`${APP_URL}/practice`, { waitUntil: 'networkidle', timeout: 15_000 });
    } catch {
      // Acceptable.
    }

    await evidence(page, 'security-isCorrect-test.png');

    // ── Analyse captured responses ──────────────────────────────────────────
    const violations: string[] = [];

    for (const { url, body } of capturedResponses) {
      // Fast string scan first (catches both "isCorrect":true and "isCorrect":false).
      if (body.includes('"isCorrect"')) {
        violations.push(`STRING MATCH: "isCorrect" key found in response from ${url}`);
        continue;
      }

      // Deep JSON parse scan for nested objects.
      try {
        const parsed: unknown = JSON.parse(body);
        if (deepHasKey(parsed, 'isCorrect')) {
          violations.push(`JSON TREE: isCorrect key found at nested depth in response from ${url}`);
        }
      } catch {
        // Non-JSON or truncated body — string scan above already ran.
      }
    }

    if (violations.length > 0) {
      const firstViolation = violations[0]!;
      fail(
        `SECURITY VIOLATION: isCorrect boolean exposed in API response at ${firstViolation}`,
      );
    }

    // ── Note about test coverage limitations ───────────────────────────────
    // The exam-start endpoint (/api/tests/exam-start/:id) requires:
    //   (a) A valid authToken
    //   (b) The user to have an active VidyaPass or available test count
    // Without TEST_AUTH_TOKEN pointing to a real paid account, we cannot
    // intercept the exam-start payload. The captured responses list will be
    // empty or contain only 401 responses (which contain no question data).
    //
    // TO RUN A COMPLETE SECURITY AUDIT:
    //   1. Set TEST_AUTH_TOKEN=<real_token> TEST_USER_ID=<real_uid>
    //   2. Set TEST_EXAM_ID=<a real exam id from the /api/tests endpoint>
    //   3. Navigate to /tests/exam-start/${TEST_EXAM_ID} within this test
    //   4. The response from that endpoint should be checked for isCorrect.
    //
    // Based on the source code analysis of node_30.RHaNfbWf.js (lines that
    // read b.isCorrect and f.questions[g].options.find(_=>_.isCorrect)), it
    // is HIGHLY LIKELY that the exam-start endpoint returns isCorrect in its
    // payload. This must be verified with real credentials.

    const totalCaptured = capturedResponses.length;
    if (totalCaptured === 0) {
      console.warn(
        '[security-isCorrect] No question/exam API responses were captured. ' +
        'This likely means TEST_AUTH_TOKEN is not set. ' +
        'The test cannot confirm security without real auth. ' +
        'Provide TEST_AUTH_TOKEN env var to enable full coverage.',
      );
      // Soft assertion: we know we need real credentials to test this properly.
      expect.soft(totalCaptured, 'Zero API responses captured — set TEST_AUTH_TOKEN').toBeGreaterThan(0);
    } else {
      console.log(`[security-isCorrect] Analysed ${totalCaptured} API response(s). No isCorrect leaks found in captured responses.`);
    }
  });

});

// ---------------------------------------------------------------------------
// SUITE 3: Question Flag / Bookmark Persists in UI
// ---------------------------------------------------------------------------

test.describe('Bookmark / Flag functionality', () => {

  test('question flag/bookmark action persists in UI', async ({ page }) => {
    // The bookmark toggle is implemented in node_30.RHaNfbWf.js as function L():
    //   i.update(u => { u[o].option.bookmarked = !u[o].option.bookmarked; ... })
    // The bookmarked state is reflected in the UI but requires a real test
    // session to be active (data loaded into the "examDetails" Svelte store).
    //
    // Without real credentials we cannot reach the test engine route.
    // This test navigates to the test engine route and attempts to find a
    // bookmark button using every known selector pattern.

    await seedLocalStorage(page);

    // Attempt to reach the test engine. If TEST_EXAM_ID is set, use it.
    // Otherwise fall back to the exam list page and look for existing tests.
    const examId = process.env['TEST_EXAM_ID'];
    const testEngineUrl = examId
      ? `${APP_URL}/tests/${examId}`
      : `${APP_URL}/tests`;

    await page.goto(testEngineUrl, { waitUntil: 'domcontentloaded', timeout: 15_000 });

    // Allow the SvelteKit hydration and store subscription to settle.
    await page.waitForTimeout(2_000);

    await evidence(page, 'question-pre-flag.png');

    // ── Find the bookmark/flag button ───────────────────────────────────────
    // Confirmed DOM structure from node_30: the bookmark button toggles the
    // "bookmarked" field. No data-testid is set in the source; we use
    // multiple fallback selectors.
    const bookmarkSelectors = [
      '[data-testid="flag-btn"]',
      '[data-testid="bookmark-btn"]',
      '[aria-label*="flag" i]',
      '[aria-label*="bookmark" i]',
      'button[title*="bookmark" i]',
      'button[title*="flag" i]',
      // From node_26 Revision Vault: bookmark icon uses lucide book-marked
      'button:has(svg.lucide-book-marked)',
      // The VidyaPass/test engine uses a bookmark icon via lucide
      'button:has([class*="book-marked"])',
      'button:has([data-lucide="book-marked"])',
    ];

    let bookmarkButton = page.locator('body'); // fallback — will fail gracefully
    let found = false;

    for (const sel of bookmarkSelectors) {
      const loc = page.locator(sel).first();
      const count = await loc.count();
      if (count > 0) {
        const isVisible = await loc.isVisible().catch(() => false);
        if (isVisible) {
          bookmarkButton = loc;
          found = true;
          console.log(`[bookmark] Found bookmark button with selector: ${sel}`);
          break;
        }
      }
    }

    if (!found) {
      // We may be on /login or the test engine showed a "No test found!" toast.
      const currentUrl = page.url();
      console.warn(
        `[bookmark] No bookmark button found on ${currentUrl}. ` +
        'This test requires TEST_AUTH_TOKEN and TEST_EXAM_ID env vars to reach the test engine.',
      );
      expect.soft(found, 'Bookmark button not found — requires authenticated test session').toBeTruthy();
      await evidence(page, 'question-flagged.png');
      return;
    }

    // ── Capture pre-click state ─────────────────────────────────────────────
    const classBeforeClick = await bookmarkButton.getAttribute('class') ?? '';
    const ariaBeforeClick  = await bookmarkButton.getAttribute('aria-pressed') ?? '';

    // ── Click the bookmark button ───────────────────────────────────────────
    await bookmarkButton.click();
    await page.waitForTimeout(500); // Allow Svelte store update to propagate.

    // ── Capture post-click state ────────────────────────────────────────────
    const classAfterClick = await bookmarkButton.getAttribute('class') ?? '';
    const ariaAfterClick  = await bookmarkButton.getAttribute('aria-pressed') ?? '';

    // ── Assert state changed ────────────────────────────────────────────────
    // One of: class change, aria-pressed change, or icon child change.
    const classChanged     = classBeforeClick !== classAfterClick;
    const ariaPressChanged = ariaBeforeClick  !== ariaAfterClick;

    const stateChanged = classChanged || ariaPressChanged;

    expect.soft(
      stateChanged,
      `Bookmark button state did not change after click. ` +
      `class before="${classBeforeClick}" after="${classAfterClick}" | ` +
      `aria-pressed before="${ariaBeforeClick}" after="${ariaAfterClick}"`,
    ).toBeTruthy();

    await evidence(page, 'question-flagged.png');
  });

});

// ---------------------------------------------------------------------------
// SUITE 4: Exam Session Submits and Shows Result
// ---------------------------------------------------------------------------

test.describe('Exam session flow', () => {

  test('exam session submits and shows result', async ({ page }) => {
    // The submit flow confirmed from node_30.RHaNfbWf.js:
    //   1. User answers questions → local state updated in Svelte stores.
    //   2. Submit: PUT /tests/:id → POST /tests/:id/complete
    //   3. On success: goto /tests/review/:id
    //   4. Review page (node_13.PJ1WCHzJ.js) shows score/accuracy.
    //
    // This test requires a valid paid account session to run completely.
    // Without it, we can only verify the UI elements are present.

    await seedLocalStorage(page);

    const examId = process.env['TEST_EXAM_ID'];

    if (!examId) {
      console.warn(
        '[exam-submit] TEST_EXAM_ID env var not set. ' +
        'Navigating to /tests to find an existing test instead.',
      );
      await page.goto(`${APP_URL}/tests`, { waitUntil: 'networkidle', timeout: 15_000 });
      await evidence(page, 'exam-result.png');
      expect.soft(page.url()).toContain(APP_URL);
      return;
    }

    await page.goto(`${APP_URL}/tests/${examId}`, {
      waitUntil: 'domcontentloaded',
      timeout:   15_000,
    });

    // Allow the test engine to hydrate and load exam data from localStorage.
    await page.waitForTimeout(3_000);

    // ── Attempt to answer 3 questions ──────────────────────────────────────
    // The test engine renders option buttons with ids matching the option
    // row id in the database. We click any clickable option.
    for (let questionIndex = 0; questionIndex < 3; questionIndex++) {
      // Option selectors confirmed from node_30: options have .id = option.id
      // They are rendered as div elements with a click handler on the parent.
      const optionSelectors = [
        '[data-testid^="option-"]',
        'button[id]:not([id=""])',
        // The test engine renders options inside a div with role="presentation"
        // that has a click listener. Individual options are divs with id.
        'div[id]:not([id=""])',
      ];

      let clicked = false;
      for (const sel of optionSelectors) {
        const options = page.locator(sel);
        const count   = await options.count();
        if (count > 0) {
          await options.first().click().catch(() => {});
          clicked = true;
          break;
        }
      }

      if (!clicked) {
        console.warn(`[exam-submit] No option found for question ${questionIndex + 1}`);
      }

      // Navigate to next question — confirmed button text from node_30
      const nextButtonSelectors = [
        '[data-testid="next-btn"]',
        'button:text("Next")',
        'button:text("Skip")',
        'button:has(svg.lucide-skip-forward)',
      ];

      for (const sel of nextButtonSelectors) {
        const btn = page.locator(sel).first();
        if (await btn.count() > 0 && await btn.isVisible().catch(() => false)) {
          await btn.click().catch(() => {});
          await page.waitForTimeout(300);
          break;
        }
      }
    }

    // ── Find and click Submit ──────────────────────────────────────────────
    const submitSelectors = [
      '[data-testid="submit"]',
      'button:text("Submit")',
      'button:text("Finish")',
      'button:text("Submit Test")',
      'button:has-text("Submit")',
    ];

    let submitted = false;
    for (const sel of submitSelectors) {
      const btn = page.locator(sel).first();
      const count = await btn.count();
      if (count > 0 && await btn.isVisible().catch(() => false)) {
        await btn.click();
        submitted = true;
        console.log(`[exam-submit] Clicked submit with selector: ${sel}`);
        break;
      }
    }

    if (!submitted) {
      console.warn('[exam-submit] Submit button not found. Test engine may require a valid exam session.');
      await evidence(page, 'exam-result.png');
      expect.soft(submitted, 'Submit button not found — requires TEST_AUTH_TOKEN + TEST_EXAM_ID').toBeTruthy();
      return;
    }

    // ── Wait for result page ───────────────────────────────────────────────
    // The review page URL pattern is /tests/review/:id
    await page.waitForURL(/\/tests\/review\//, { timeout: 15_000 }).catch(() => {
      console.warn('[exam-submit] Did not navigate to /tests/review/ — may need real auth.');
    });

    await page.waitForTimeout(2_000);

    // ── Assert result page content ─────────────────────────────────────────
    // From node_13 (the tests list/result node): looks for accuracy/score info.
    const resultSelectors = [
      '[data-testid="score"]',
      '[data-testid="accuracy"]',
      'h2:has-text("%")',
      'p:has-text("completed")',
      'p:has-text("accuracy")',
      'p:has-text("Correct")',
      'p:has-text("Score")',
      // From bl() function in node_7: "% answer accuracy" and "test available"
      '*:has-text("% answer accuracy")',
      '*:has-text("answer accuracy")',
    ];

    let resultVisible = false;
    for (const sel of resultSelectors) {
      const loc = page.locator(sel).first();
      if (await loc.count() > 0 && await loc.isVisible().catch(() => false)) {
        resultVisible = true;
        console.log(`[exam-submit] Result visible with selector: ${sel}`);
        break;
      }
    }

    expect.soft(
      resultVisible,
      'Result page did not show score or accuracy metrics after submission',
    ).toBeTruthy();

    await evidence(page, 'exam-result.png');
  });

});

// ---------------------------------------------------------------------------
// SUITE 5: Question Navigation Without Full Page Reload
// ---------------------------------------------------------------------------

test.describe('Question navigation', () => {

  test('question navigation works without full reload', async ({ page }) => {
    // Confirmed from node_30.RHaNfbWf.js:
    //   - Question switching is via Svelte store: q.set(g + 1)
    //   - Function Z (next): q.set(l(1, ++g))
    //   - Function me (prev): q.set(l(1, --g))
    //   - No page navigation is triggered. Only the Svelte store updates.
    //   - The question body is read from f.questions[g].body (f = examDetails store)
    //
    // To detect "no full page navigation": monitor page.on('request') for
    // document-type navigations. None should fire on question switch.

    await seedLocalStorage(page);

    const examId = process.env['TEST_EXAM_ID'];
    if (!examId) {
      console.warn(
        '[nav-test] TEST_EXAM_ID not set. Cannot test question navigation without a real exam session.',
      );
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
      await evidence(page, 'question-navigation.png');
      expect.soft(!!examId, 'TEST_EXAM_ID env var required for navigation test').toBeTruthy();
      return;
    }

    // ── Track full-page navigations ─────────────────────────────────────────
    const fullPageNavigations: string[] = [];

    page.on('request', (request: Request) => {
      // A "document" resourceType means the browser issued a full page load.
      if (request.resourceType() === 'document') {
        fullPageNavigations.push(request.url());
      }
    });

    await page.goto(`${APP_URL}/tests/${examId}`, {
      waitUntil: 'domcontentloaded',
      timeout:   15_000,
    });

    // The initial document navigation is expected — reset the list after load.
    await page.waitForTimeout(2_000);
    fullPageNavigations.length = 0; // Reset: only track navigations AFTER load.

    // ── Capture the text of the first question ─────────────────────────────
    // The question body is parsed from f.questions[g].body (JSON string).
    // It renders as a text node inside the question component.
    const questionSelectors = [
      '[data-testid="question-body"]',
      '[data-testid="question-text"]',
      'p[class*="question"]',
      'div[class*="question-body"]',
      // Generic: any paragraph with substantial text content
      'p:not(:empty)',
    ];

    let questionText = '';
    for (const sel of questionSelectors) {
      const loc = page.locator(sel).first();
      if (await loc.count() > 0) {
        const text = await loc.textContent().catch(() => '');
        if (text && text.trim().length > 10) {
          questionText = text.trim();
          console.log(`[nav-test] First question text (${questionText.length} chars): "${questionText.slice(0, 60)}..."`);
          break;
        }
      }
    }

    // ── Click the next question button ─────────────────────────────────────
    // Confirmed button identity from node_30: uses lucide-skip-forward icon,
    // or could be text "Next" or "Skip".
    const nextSelectors = [
      '[data-testid="next-btn"]',
      'button:has(svg.lucide-skip-forward)',
      'button:text-is("Next")',
      'button:text-is("Skip")',
    ];

    let nextClicked = false;
    for (const sel of nextSelectors) {
      const btn = page.locator(sel).first();
      if (await btn.count() > 0 && await btn.isVisible().catch(() => false)) {
        await btn.click();
        nextClicked = true;
        console.log(`[nav-test] Clicked next with selector: ${sel}`);
        break;
      }
    }

    await page.waitForTimeout(800); // Allow Svelte store reactivity to update DOM.

    // ── Assert: no full page navigation occurred ───────────────────────────
    expect(
      fullPageNavigations,
      `Full page navigation(s) detected after question switch: ${fullPageNavigations.join(', ')}`,
    ).toHaveLength(0);

    // ── Assert: new question text differs from previous ────────────────────
    if (nextClicked && questionText) {
      let newQuestionText = '';
      for (const sel of questionSelectors) {
        const loc = page.locator(sel).first();
        if (await loc.count() > 0) {
          const text = await loc.textContent().catch(() => '');
          if (text && text.trim().length > 10) {
            newQuestionText = text.trim();
            break;
          }
        }
      }

      if (newQuestionText) {
        expect.soft(
          newQuestionText,
          'Question text did not change after clicking next — navigation may have failed',
        ).not.toBe(questionText);
      }
    }

    await evidence(page, 'question-navigation.png');
  });

});

// ---------------------------------------------------------------------------
// SUITE 6: API Contract Verification (no auth required for 401 shape)
// ---------------------------------------------------------------------------

test.describe('API contract', () => {

  test('unauthenticated API calls return structured 401 error objects', async ({ page }) => {
    // Verify the API error shape confirmed from live probing:
    //   {"type":"error","message":"Unauthorized"}
    // This ensures the API contract is stable.

    const endpoints = [
      `${API_BASE}/categories`,
      `${API_BASE}/tests`,
      `${API_BASE}/billing`,
    ];

    for (const endpoint of endpoints) {
      const response = await page.request.get(endpoint);

      expect.soft(
        response.status(),
        `Expected 401 from ${endpoint}, got ${response.status()}`,
      ).toBe(401);

      const body = await response.json().catch(() => null) as Record<string, unknown> | null;

      expect.soft(
        body,
        `Expected JSON body from ${endpoint}, got null`,
      ).not.toBeNull();

      if (body) {
        expect.soft(
          body['type'],
          `Expected body.type="error" from ${endpoint}`,
        ).toBe('error');

        expect.soft(
          typeof body['message'],
          `Expected body.message to be a string from ${endpoint}`,
        ).toBe('string');
      }
    }

    await evidence(page, 'api-contract-401.png');
  });

  test('questions/batch POST endpoint requires authentication', async ({ page }) => {
    // Confirmed in node_26: POST /questions/batch with body { ids: string[] }
    // Called from Revision Vault with real user ids.

    const response = await page.request.post(`${API_BASE}/questions/batch`, {
      data:    { ids: ['__test_id_1__', '__test_id_2__'] },
      headers: { 'Content-Type': 'application/json' },
    });

    // Must reject unauthenticated requests.
    expect.soft(
      response.status(),
      `POST /questions/batch without auth should return 401, got ${response.status()}`,
    ).toBe(401);
  });

});

// ---------------------------------------------------------------------------
// SUITE 7: Authentication pages are reachable and functional
// ---------------------------------------------------------------------------

test.describe('Login page', () => {

  test('login page renders OTP flow UI elements', async ({ page }) => {
    // The login page (node_12.COhUwouz.js) renders an OTP-based flow:
    //   Step 1: Enter phone number → GET OTP button
    //   Step 2: Enter 4-digit OTP → Verify OTP button
    // Confirmed UI elements from Vt() function in node_12.

    await page.goto(`${APP_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 15_000 });

    await evidence(page, 'login-page.png');

    // ── Phone number input ─────────────────────────────────────────────────
    // Confirmed: <input type="number" id="phoneNumber" placeholder="Enter your phone number">
    const phoneInput = page.locator(
      'input[type="number"][id="phoneNumber"], ' +
      'input[type="number"][placeholder*="phone" i], ' +
      'input[id="phoneNumber"]',
    ).first();

    await expect(phoneInput).toBeVisible({ timeout: 8_000 });

    // ── Get OTP / Verify OTP button ────────────────────────────────────────
    // Confirmed text from It() function: "Get OTP" or "Verify OTP" depending on state.
    const otpButton = page.locator(
      'button:has-text("Get OTP"), button:has-text("Verify OTP")',
    ).first();

    await expect(otpButton).toBeVisible({ timeout: 8_000 });

    // ── Logo present ───────────────────────────────────────────────────────
    const logo = page.locator('img[src="/icons/primary-logo.svg"]').first();
    await expect.soft(logo).toBeVisible({ timeout: 5_000 });
  });

});

// ---------------------------------------------------------------------------
// Utility: Playwright does not have a built-in `fail()` function.
// Use this wrapper to throw with a clear message.
// ---------------------------------------------------------------------------

function fail(message: string): never {
  throw new Error(message);
}
