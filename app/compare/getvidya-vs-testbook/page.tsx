import { generateSEO, breadcrumbSchema, faqSchema, reviewSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, Star, IndianRupee, TrendingDown, Zap } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidya vs Testbook 2026 — Which Is Better for SSC & UPSC?",
  description:
    "Honest comparison of GetVidya AI (₹149/month) vs Testbook (₹700–₹2,000/month) for SSC CGL, UPSC, and Banking exam preparation. Compare features, pricing, AI personalization, and mock test quality.",
  keywords: [
    "GetVidya vs Testbook",
    "Testbook alternative India",
    "GetVidya vs Testbook for SSC CGL",
    "better than Testbook for UPSC",
    "Testbook pass price vs GetVidya",
    "AI exam prep vs Testbook",
    "cheap alternative to Testbook",
    "GetVidya review vs Testbook review",
    "Testbook vs GetVidya mock test quality",
  ],
  canonical: "/compare/getvidya-vs-testbook",
});

const APP_URL = "https://app.getvidya.in";

const comparison = [
  {
    feature: "Monthly Price",
    getvidya: "₹149/month (Vidya Pass)",
    testbook: "₹700–₹2,000/month (Testbook Pass)",
    winner: "getvidya",
  },
  {
    feature: "AI Personalization",
    getvidya: "GetVidyaAI diagnoses weak subjects on Day 1 and adapts every session",
    testbook: "No AI personalization — fixed courses and test series",
    winner: "getvidya",
  },
  {
    feature: "Diagnostic Assessment",
    getvidya: "Free 25-question diagnostic that maps your exact weak topics",
    testbook: "No diagnostic — aspirants must self-assess",
    winner: "getvidya",
  },
  {
    feature: "Adaptive Study Plan",
    getvidya: "Weekly AI study plan rebuilds based on last 7 days of performance",
    testbook: "Fixed course schedule, not personalized to individual gaps",
    winner: "getvidya",
  },
  {
    feature: "Mock Tests (SSC CGL)",
    getvidya: "240+ adaptive mock tests (difficulty adjusts as you improve)",
    testbook: "300+ mock tests (static difficulty, not adaptive)",
    winner: "tie",
  },
  {
    feature: "Question Bank",
    getvidya: "140,000+ MCQs across 6 exam categories",
    testbook: "200,000+ MCQs across many more categories and state exams",
    winner: "testbook",
  },
  {
    feature: "Video Lectures",
    getvidya: "No video lectures — pure adaptive practice focus",
    testbook: "Extensive video lecture library for all subjects",
    winner: "testbook",
  },
  {
    feature: "Progress Analytics",
    getvidya: "Topic-level accuracy, exam readiness score, daily XP, weak-subject alerts",
    testbook: "Test-level analytics but limited topic-level adaptive insight",
    winner: "getvidya",
  },
  {
    feature: "Exam Coverage",
    getvidya: "SSC CGL, UPSC, Banking, Railway, State PSC, Defence",
    testbook: "SSC, UPSC, Banking, Railway, State exams, Teaching, Police (wider coverage)",
    winner: "testbook",
  },
  {
    feature: "Gamification",
    getvidya: "Daily XP, streaks, milestones — keeps practice consistent",
    testbook: "Basic leaderboards and badges",
    winner: "getvidya",
  },
  {
    feature: "Offline Access",
    getvidya: "Limited offline (requires internet for most features)",
    testbook: "Offline mode available for downloaded content",
    winner: "testbook",
  },
];

const faqs = [
  {
    question: "Is GetVidya better than Testbook for SSC CGL preparation?",
    answer:
      "GetVidya is better than Testbook for aspirants who want AI-personalized preparation. GetVidyaAI identifies your exact weak subjects on Day 1 via a diagnostic test and adapts every practice session around them — Testbook does not offer this. GetVidya is also significantly cheaper at ₹149/month vs ₹700–₹2,000/month. However, if you need video lectures or offline access, Testbook has an edge. Choose GetVidya if self-study efficiency matters most; choose Testbook if you need video-based learning.",
  },
  {
    question: "How does GetVidya's price compare to Testbook Pass?",
    answer:
      "GetVidya Vidya Pass costs ₹149/month (₹1,788/year). Testbook Pass ranges from ₹700 to ₹2,000/month depending on the plan and included exams. At ₹149, GetVidya offers AI-adaptive practice, 240+ mock tests, and a weekly AI study plan — all at under 25% of the entry-level Testbook Pass price.",
  },
  {
    question: "Does Testbook offer AI-powered study plans?",
    answer:
      "Testbook offers a 'Personalized Study Plan' feature in some plans, but it is based on manually selected preferences — not a diagnostic test that measures your actual accuracy per topic. GetVidyaAI's study plan is rebuilt weekly based on real performance data from your practice sessions, making it genuinely adaptive rather than just customized at sign-up.",
  },
  {
    question: "Can I use GetVidya alongside Testbook?",
    answer:
      "Yes. Some aspirants use Testbook for video lectures and use GetVidya for daily adaptive practice and AI study planning. At ₹149/month, GetVidya is affordable enough to run alongside another platform. The GetVidyaAI diagnostic and weekly plan complement Testbook's video content by telling you exactly which topics to focus on after watching lectures.",
  },
  {
    question: "Which platform has better mock tests — GetVidya or Testbook?",
    answer:
      "Both platforms have strong mock test libraries. Testbook has a larger volume (300+ vs 240+ for SSC CGL). GetVidya's key differentiator is adaptive difficulty — mock tests get harder as your accuracy improves, so you're always challenged at the right level. Testbook's tests follow fixed difficulty tiers. For quality and pattern accuracy, both are comparable for SSC CGL 2026.",
  },
];

export default function CompareTestbookPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "GetVidya vs Testbook", url: "/compare/getvidya-vs-testbook" },
  ]);
  const reviews = reviewSchema({ itemName: "GetVidya vs Testbook Comparison", ratingValue: "4.7", reviewCount: "1680" });

  const getvidyaWins = comparison.filter((r) => r.winner === "getvidya").length;
  const testbookWins = comparison.filter((r) => r.winner === "testbook").length;
  const ties = comparison.filter((r) => r.winner === "tie").length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-6">
              Honest Comparison · Updated May 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              GetVidya vs Testbook 2026 —<br className="hidden md:block" />
              <span className="text-emerald-400">Which Should You Choose?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              GetVidya (₹149/mo) offers AI-personalized preparation. Testbook (₹700–₹2,000/mo) offers
              wider content. We compare both honestly so you can choose what fits your preparation style.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mx-auto text-left">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                GetVidya wins on <strong>AI personalization, price (₹149/mo), and diagnostic-driven study plans</strong>.
                Testbook wins on <strong>video lectures, offline access, and exam coverage breadth</strong>.
                For self-study efficiency, GetVidya delivers better ROI. For structured video-based learning,
                Testbook has an edge.
              </p>
            </div>
          </div>
        </section>

        {/* ── SCORE CARD ───────────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">{getvidyaWins}</p>
              <p className="text-slate-700 font-semibold">GetVidya Wins</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-400 mb-1">{ties}</p>
              <p className="text-slate-500 font-semibold">Tied</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-1">{testbookWins}</p>
              <p className="text-slate-700 font-semibold">Testbook Wins</p>
            </div>
          </div>
        </section>

        {/* ── COST CALLOUT ─────────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-slate-50 border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "GetVidya", value: "₹149/mo", sub: "Vidya Pass", icon: IndianRupee, color: "text-emerald-600" },
              { label: "Testbook Pass", value: "₹700–₹2k/mo", sub: "Varies by plan", icon: IndianRupee, color: "text-red-500" },
              { label: "Annual Saving", value: "₹6,600+", sub: "vs cheapest Testbook", icon: TrendingDown, color: "text-emerald-600" },
              { label: "AI Personalization", value: "GetVidya", sub: "Diagnostic-driven", icon: Zap, color: "text-blue-600" },
            ].map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label}>
                <Icon className={`${color} w-6 h-6 mx-auto mb-2`} />
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-slate-700 font-medium text-sm">{label}</p>
                <p className="text-slate-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              Feature-by-Feature Comparison
            </h2>
            <p className="text-slate-500 text-center mb-10">No marketing bias — what each platform actually does</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold w-1/4">Feature</th>
                    <th className="text-left px-6 py-4 text-emerald-700 font-bold bg-emerald-50">GetVidya (₹149/mo)</th>
                    <th className="text-left px-6 py-4 text-blue-700 font-bold bg-blue-50">Testbook (₹700+/mo)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-6 py-4 bg-emerald-50/50">
                        <span className={`flex items-start gap-2 ${row.winner === "getvidya" ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                          {row.winner === "getvidya" ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : <span className="w-4 h-4 mt-0.5 shrink-0" />}
                          {row.getvidya}
                        </span>
                      </td>
                      <td className="px-6 py-4 bg-blue-50/30">
                        <span className={`flex items-start gap-2 ${row.winner === "testbook" ? "text-blue-700 font-medium" : row.winner === "tie" ? "text-slate-600" : "text-slate-400"}`}>
                          {row.winner === "testbook" ? <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> : row.winner === "getvidya" ? <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> : <span className="w-4 h-4 mt-0.5 shrink-0" />}
                          {row.testbook}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs text-center mt-4">
              GetVidya wins {getvidyaWins}/11 comparisons. Testbook wins {testbookWins}/11. Tied on {ties}.
            </p>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ─────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Which Platform Is Right for You?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Choose GetVidya if you...</h3>
                <ul className="space-y-3">
                  {[
                    "Want AI to identify your weak subjects and build your study plan",
                    "Are self-motivated and don't need video lectures",
                    "Want maximum value for ₹149/month",
                    "Prefer adaptive practice that gets harder as you improve",
                    "Are preparing for SSC CGL, UPSC, Banking, or Railway",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-emerald-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Choose Testbook if you...</h3>
                <ul className="space-y-3">
                  {[
                    "Need video lectures and structured courses alongside practice",
                    "Want offline access to downloaded content",
                    "Are preparing for State-level or Teaching exams not covered by GetVidya",
                    "Prefer a platform with more content volume at higher price",
                    "Need live classes or doubt-clearing sessions",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-blue-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              What Aspirants Who Switched Say
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Ravi Kumar",
                  exam: "SSC CGL 2025 — Selected",
                  city: "Lucknow",
                  quote: "I used Testbook for 6 months and was practicing randomly. GetVidya's AI showed me I was weak in Data Interpretation specifically — not 'Quant in general'. Targeted practice for 5 weeks changed my DI accuracy from 40% to 72%.",
                  stars: 5,
                },
                {
                  name: "Divya Singh",
                  exam: "IBPS PO 2025 — Selected",
                  city: "Delhi",
                  quote: "GetVidya at ₹149 versus Testbook at ₹1,200 — both for Banking prep. GetVidya's AI study plan was genuinely different every week based on my performance. Testbook just gave me the same fixed schedule. I stuck with GetVidya.",
                  stars: 5,
                },
              ].map((t) => (
                <div key={t.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-700 italic mb-4">&quot;{t.quote}&quot;</p>
                  <p className="font-semibold text-slate-800">{t.name}</p>
                  <p className="text-slate-500 text-sm">{t.exam} · {t.city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.question} className="bg-white border border-slate-200 rounded-xl p-5 group">
                  <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between">
                    {f.question}
                    <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-slate-600 mt-3 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Try GetVidya Free Before Deciding</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Take the 25-question diagnostic. Get your weak-subject report. Start your AI study plan.
            No credit card needed — all free.
          </p>
          <a href="/free-assessment" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all mr-4">
            Start Free Diagnostic →
          </a>
          <p className="text-emerald-200 text-sm mt-4">Vidya Pass unlocks everything · ₹149/month · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
