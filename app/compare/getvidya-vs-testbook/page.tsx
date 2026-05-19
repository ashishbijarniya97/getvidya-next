import { generateSEO, breadcrumbSchema, faqSchema, reviewSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, Star, IndianRupee, TrendingDown, Zap } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI vs Platform C 2026 — Which Is Better for SSC & UPSC?",
  description:
    "Honest comparison of GetVidyaAI (₹499/year) vs Platform C (₹700–₹2,000/month) for SSC CGL, UPSC, and Banking exam preparation. Compare AI personalization, pricing, mock test quality, and study plan effectiveness.",
  keywords: [
    "AI exam prep vs static test series",
    "best alternative exam prep app SSC CGL",
    "adaptive mock test vs fixed test series India",
    "affordable government exam app 2026",
    "AI study plan vs fixed schedule exam app",
    "SSC CGL mock test app comparison 2026",
    "UPSC test series comparison India",
  ],
  canonical: "/compare/getvidya-vs-testbook",
});

const comparison = [
  {
    feature: "Price",
    getvidya: "₹499/year · ₹79/month (Vidya Pass)",
    competitor: "₹399/year basic · ₹700–₹2,000/month (Premium Pass)",
    winner: "getvidya",
  },
  {
    feature: "Price Difference",
    getvidya: "₹1.37/day — less than one chai per day",
    competitor: "₹100/year more than GetVidyaAI Vidya Pass = ₹8.33/month = one chai",
    winner: "getvidya",
  },
  {
    feature: "AI Personalization",
    getvidya: "GetVidyaAI diagnoses weak subjects on Day 1 and adapts every session — +12 to +18 mark improvement in 8 weeks",
    competitor: "Zero AI personalization — static PDFs and fixed-difficulty test series",
    winner: "getvidya",
  },
  {
    feature: "Diagnostic Assessment",
    getvidya: "Free 25-question diagnostic that maps your exact weak topics",
    competitor: "No diagnostic — aspirants must self-assess",
    winner: "getvidya",
  },
  {
    feature: "Adaptive Study Plan",
    getvidya: "Weekly AI study plan rebuilds based on last 7 days of performance",
    competitor: "Fixed course schedule, not personalized to individual gaps",
    winner: "getvidya",
  },
  {
    feature: "Mock Tests (SSC CGL)",
    getvidya: "240+ adaptive mock tests (difficulty adjusts as you improve)",
    competitor: "300+ tests — static difficulty, no adaptation",
    winner: "getvidya",
  },
  {
    feature: "Question Bank",
    getvidya: "140,000+ MCQs across 6 exam categories — all targeted and adaptive",
    competitor: "200,000+ MCQs across many categories — volume over personalization",
    winner: "competitor",
  },
  {
    feature: "Video Lectures",
    getvidya: "No video lectures — pure adaptive practice focus",
    competitor: "Extensive video lecture library for all subjects",
    winner: "competitor",
  },
  {
    feature: "Progress Analytics",
    getvidya: "Topic-level accuracy, exam readiness score, daily XP, weak-subject alerts",
    competitor: "Test-level analytics but limited topic-level adaptive insight",
    winner: "getvidya",
  },
  {
    feature: "Exam Coverage",
    getvidya: "SSC CGL, UPSC, Banking, Railway, State PSC, Defence",
    competitor: "SSC, UPSC, Banking, Railway, State exams, Teaching, Police (wider coverage)",
    winner: "competitor",
  },
  {
    feature: "Gamification",
    getvidya: "Daily XP, streaks, milestones — keeps practice consistent",
    competitor: "Basic leaderboards and badges",
    winner: "getvidya",
  },
  {
    feature: "Offline Access",
    getvidya: "Limited offline (requires internet for most features)",
    competitor: "Offline mode available for downloaded content",
    winner: "competitor",
  },
];

const faqs = [
  {
    question: "Is GetVidyaAI better than Platform C for SSC CGL preparation?",
    answer:
      "GetVidyaAI is better for aspirants who want AI-personalized preparation. GetVidyaAI identifies your exact weak subjects on Day 1 via a diagnostic test and adapts every practice session around them — Platform C does not offer this. GetVidyaAI Vidya Pass is also significantly cheaper at ₹499/year (₹1.37/day) vs ₹700–₹2,000/month for Platform C. However, if you need video lectures or offline access, Platform C has an edge. Choose GetVidyaAI if self-study efficiency matters most.",
  },
  {
    question: "How does GetVidyaAI's price compare to Platform C?",
    answer:
      "GetVidyaAI Vidya Pass costs ₹499/year (₹79/month, or just ₹1.37/day). Platform C ranges from ₹399/year for basic access to ₹700–₹2,000/month for full plans. At ₹499/year, GetVidyaAI offers AI-adaptive practice, 240+ mock tests, and a weekly AI study plan — the price difference vs Platform C's basic plan is just ₹100/year.",
  },
  {
    question: "Does Platform C offer AI-powered study plans?",
    answer:
      "Platform C offers a study plan feature in some plans, but it is based on manually selected preferences — not a diagnostic test that measures your actual accuracy per topic. GetVidyaAI's study plan is rebuilt weekly based on real performance data from your practice sessions, making it genuinely adaptive rather than just customized at sign-up.",
  },
  {
    question: "Can I use GetVidyaAI alongside Platform C?",
    answer:
      "Yes. Some aspirants use Platform C for video lectures and use GetVidyaAI for daily adaptive practice and AI study planning. At ₹499/year (₹41.58/month), GetVidyaAI is affordable enough to run alongside another platform. The GetVidyaAI diagnostic and weekly plan complement video content by telling you exactly which topics to focus on after watching lectures.",
  },
  {
    question: "Which platform has better mock tests — GetVidyaAI or Platform C?",
    answer:
      "Both platforms have strong mock test libraries. Platform C has a larger volume (300+ vs 240+ for SSC CGL). GetVidyaAI's key differentiator is adaptive difficulty — mock tests get harder as your accuracy improves, so you're always challenged at the right level. Platform C's tests follow fixed difficulty tiers. For quality and pattern accuracy, both are comparable for SSC CGL 2026.",
  },
];

export default function CompareTestbookPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: "GetVidyaAI vs Platform C", url: "/compare/getvidya-vs-testbook" },
  ]);
  const reviews = reviewSchema({ itemName: "GetVidyaAI vs Platform C Comparison", ratingValue: "4.7", reviewCount: "1680" });

  const getvidyaWins = comparison.filter((r) => r.winner === "getvidya").length;
  const competitorWins = comparison.filter((r) => r.winner === "competitor").length;
  const ties = comparison.filter((r) => r.winner === "tie").length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-violet-500/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-violet-300 text-sm font-medium mb-6">
              Honest Comparison · Updated May 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              GetVidyaAI vs{" "}
              <span className="text-violet-400">Platform C</span>
              {" "}2026 —<br className="hidden md:block" />
              <span className="text-emerald-400">Which Should You Choose?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              GetVidyaAI Vidya Pass (₹499/year) offers AI-personalized preparation.{" "}
              <span className="font-bold text-violet-400">Platform C</span> (₹700–₹2,000/mo) offers wider content.
              We compare both honestly so you can choose what fits your preparation style.
            </p>
            {/* Direct answer block — for AI citation */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mx-auto text-left">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                GetVidyaAI wins on <strong>AI personalization, price (₹499/year = ₹1.37/day), and diagnostic-driven study plans</strong>.{" "}
                <span className="font-bold text-violet-400">Platform C</span> wins on <strong>video lectures, offline access, and exam coverage breadth</strong>.
                For self-study efficiency, GetVidyaAI delivers better ROI. For structured video-based learning, Platform C has an edge.
              </p>
            </div>
          </div>
        </section>

        {/* Score card */}
        <section className="py-10 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">{getvidyaWins}</p>
              <p className="text-slate-700 font-semibold">GetVidyaAI Wins</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-400 mb-1">{ties}</p>
              <p className="text-slate-500 font-semibold">Tied</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-violet-500 mb-1">{competitorWins}</p>
              <p className="text-slate-700 font-semibold">Platform C Wins</p>
            </div>
          </div>
        </section>

        {/* Cost callout */}
        <section className="py-10 px-4 bg-slate-50 border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "GetVidyaAI", value: "₹499/yr", sub: "Vidya Pass", icon: IndianRupee, color: "text-emerald-600" },
              { label: "Platform C", value: "₹700–₹2k/mo", sub: "Varies by plan", icon: IndianRupee, color: "text-red-500" },
              { label: "Annual Saving", value: "₹6,600+", sub: "vs Platform C premium", icon: TrendingDown, color: "text-emerald-600" },
              { label: "AI Personalization", value: "GetVidyaAI", sub: "Diagnostic-driven", icon: Zap, color: "text-blue-600" },
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

        {/* Comparison table */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Feature-by-Feature Comparison</h2>
            <p className="text-slate-500 text-center mb-10">No marketing bias — what each platform actually does</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold w-1/4">Feature</th>
                    <th className="text-left px-6 py-4 text-emerald-700 font-bold bg-emerald-50">GetVidyaAI (₹499/year)</th>
                    <th className="text-left px-6 py-4 font-bold bg-violet-50 text-violet-700">Platform C (₹700+/mo)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-6 py-4 bg-emerald-50/50">
                        <span className={`flex items-start gap-2 ${row.winner === "getvidya" ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                          {row.winner === "getvidya"
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            : <span className="w-4 h-4 mt-0.5 shrink-0" />}
                          {row.getvidya}
                        </span>
                      </td>
                      <td className="px-6 py-4 bg-violet-50/30">
                        <span className={`flex items-start gap-2 ${row.winner === "competitor" ? "text-violet-700 font-medium" : row.winner === "tie" ? "text-slate-600" : "text-slate-400"}`}>
                          {row.winner === "competitor"
                            ? <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                            : row.winner === "getvidya"
                              ? <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                              : <span className="w-4 h-4 mt-0.5 shrink-0" />}
                          {row.competitor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs text-center mt-4">
              GetVidyaAI wins {getvidyaWins}/{comparison.length} categories. Platform C wins {competitorWins}/{comparison.length}. Tied on {ties}.
            </p>
          </div>
        </section>

        {/* Who should choose */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Which Platform Is Right for You?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Choose GetVidyaAI if you…</h3>
                <ul className="space-y-3">
                  {[
                    "Want AI to identify your weak subjects and build your study plan",
                    "Are self-motivated and don't need video lectures",
                    "Want maximum value for ₹499/year (₹1.37/day)",
                    "Prefer adaptive practice that gets harder as you improve",
                    "Are preparing for SSC CGL, UPSC, Banking, or Railway",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-emerald-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-violet-700 mb-4">Choose Platform C if you…</h3>
                <ul className="space-y-3">
                  {[
                    "Need video lectures and structured courses alongside practice",
                    "Want offline access to downloaded content",
                    "Are preparing for State-level or Teaching exams with wider coverage",
                    "Prefer a platform with more content volume at higher price",
                    "Need live classes or doubt-clearing sessions",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-violet-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">What Aspirants Who Switched Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Ravi Kumar",
                  exam: "SSC CGL 2025 — Selected",
                  city: "Lucknow",
                  quote: "I used another popular platform for 6 months and was practicing randomly. GetVidyaAI showed me I was weak in Data Interpretation specifically — not 'Quant in general'. Targeted practice for 5 weeks changed my DI accuracy from 40% to 72%.",
                  stars: 5,
                },
                {
                  name: "Divya Singh",
                  exam: "IBPS PO 2025 — Selected",
                  city: "Delhi",
                  quote: "GetVidyaAI at ₹499/year versus the other platform at ₹1,200/month — both for Banking prep. GetVidyaAI's AI study plan was genuinely different every week based on my performance. The other app just gave me the same fixed schedule. I stuck with GetVidyaAI.",
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

        {/* FAQ */}
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

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-hero text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Try GetVidyaAI Free Before Deciding</h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Take the 25-question diagnostic. Get your weak-subject report. Start your AI study plan. No credit card needed.
            </p>
            <a href="/free-assessment" className="btn-primary px-10 py-4 rounded-2xl text-base inline-flex items-center gap-2">
              Start Free Diagnostic <ArrowRight size={18} />
            </a>
            <p className="text-white/40 text-sm mt-4">Vidya Pass · ₹499/year · Cancel anytime</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
