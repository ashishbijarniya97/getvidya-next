import { generateSEO, breadcrumbSchema, faqSchema, reviewSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, Star, IndianRupee, Zap } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI vs Other Exam Prep Apps 2026 — Which Is Better for SSC & UPSC?",
  description:
    "Honest comparison of GetVidyaAI (₹499/year) vs other leading government exam prep platforms for SSC CGL, UPSC, and Banking. Compare AI personalization, pricing, mock test quality, and Hindi support. Updated May 2026.",
  keywords: [
    "best app for ssc cgl 2026",
    "getvidyaai vs other exam apps",
    "ai exam prep app india",
    "best alternative exam prep app india",
    "affordable exam prep app india",
    "exam prep app with ai personalization",
    "hindi mock test app comparison",
    "best government exam app rajasthan",
    "free diagnostic test exam app",
    "ai study plan government exam india",
  ],
  canonical: "/compare/getvidya-vs-other-apps",
});

const comparison = [
  {
    feature: "Price",
    getvidya: "₹499/year (Vidya Pass) — less than ₹1.40/day",
    other: "₹999–₹15,000/year depending on plan and exam",
    winner: "getvidya",
  },
  {
    feature: "AI Personalization",
    getvidya: "GetVidyaAI diagnoses weak subjects on Day 1 and adapts every session automatically",
    other: "No AI personalization — fixed course content and static test series",
    winner: "getvidya",
  },
  {
    feature: "Diagnostic Assessment",
    getvidya: "Free 25-question diagnostic that maps exact weak topics in 20 minutes — no card needed",
    other: "No diagnostic test — aspirants must manually identify their own gaps",
    winner: "getvidya",
  },
  {
    feature: "Adaptive Weekly Study Plan",
    getvidya: "Rebuilt every 7 days based on last week's performance — different plan each week",
    other: "Fixed batch syllabus — same schedule for all students regardless of individual gaps",
    winner: "getvidya",
  },
  {
    feature: "Hindi Support",
    getvidya: "Full Hindi support — diagnostic, practice, and study plans in Hindi",
    other: "Hindi content available but interface is often English-first; Hindi may be a separate product",
    winner: "getvidya",
  },
  {
    feature: "Mock Tests (SSC CGL)",
    getvidya: "240+ adaptive mock tests with difficulty that adjusts as you improve",
    other: "More tests in total but static difficulty — volume over personalization",
    winner: "other",
  },
  {
    feature: "Live Classes",
    getvidya: "No live classes — pure adaptive practice and AI study planning",
    other: "Extensive live classes across all subjects with educators",
    winner: "other",
  },
  {
    feature: "Content Depth (Video)",
    getvidya: "No video lectures — practice-first approach",
    other: "Deep video content library across subjects and exams",
    winner: "other",
  },
  {
    feature: "Exam Coverage",
    getvidya: "SSC CGL, UPSC, Banking, Railway, State PSC (RPSC RAS), Defence",
    other: "Wider exam coverage including Teaching, Police, and more state exams",
    winner: "other",
  },
  {
    feature: "Progress Analytics",
    getvidya: "Topic-level accuracy, exam readiness score, weak-subject alerts, daily XP",
    other: "Test-level analytics; limited topic-level adaptive insight",
    winner: "getvidya",
  },
  {
    feature: "Gamification",
    getvidya: "Daily XP, streaks, milestones — built to keep practice consistent",
    other: "Basic leaderboards or badges; no daily streak system",
    winner: "getvidya",
  },
  {
    feature: "Tier-2 City Accessibility",
    getvidya: "Designed for Rajasthan/UP/MP Tier-2 cities — Hindi-first, low data usage",
    other: "Available in Tier-2 but content tends to be metro-centric",
    winner: "getvidya",
  },
];

const faqs = [
  {
    question: "Is GetVidyaAI better than other exam prep apps for SSC CGL preparation?",
    answer:
      "GetVidyaAI is better for aspirants who want AI-personalized preparation. GetVidyaAI identifies your exact weak subjects on Day 1 via a free diagnostic test — most other platforms do not offer this. The weekly AI study plan is different every week based on your real performance data, whereas most platforms follow a fixed schedule for all students. For self-motivated aspirants who want practice-driven preparation without live classes, GetVidyaAI delivers better outcomes at a fraction of the cost (₹499/year). If you need live classes or structured video courses, other platforms have an edge.",
  },
  {
    question: "How does GetVidyaAI's price compare to other leading exam apps?",
    answer:
      "GetVidyaAI Vidya Pass costs ₹499/year — less than ₹1.40/day. Most leading exam prep platforms charge ₹999–₹15,000/year for comparable or even lesser features. For pure mock test and AI-adaptive practice, GetVidyaAI gives significantly more value at a lower price. If you need live classes and video content from other platforms, you can use GetVidyaAI alongside them for daily practice at ₹499/year.",
  },
  {
    question: "Do other exam prep apps offer AI-powered study plans?",
    answer:
      "Most major exam prep apps do not have an AI-powered study plan equivalent to GetVidyaAI. Their courses are structured around fixed batch schedules — the same content is delivered to all students, regardless of individual weak subjects. GetVidyaAI's weekly study plan is rebuilt every 7 days based on your specific accuracy data from the previous week, making it genuinely personalized rather than just set once at sign-up.",
  },
  {
    question: "Which platform is better for Rajasthan government exams (RPSC RAS)?",
    answer:
      "GetVidyaAI is specifically optimized for Rajasthan government exam aspirants — including RPSC RAS, Rajasthan Police, and RSMSSB Patwari. It has dedicated Rajasthan GK content, Hindi-first interface, and RPSC RAS mock tests. The platform was built with Tier-2 Rajasthan cities (Sikar, Jhunjhunu, Churu, Laxmangarh, Jodhpur, Kota) in mind. GetVidyaAI's AI personalization and Hindi support give it a strong edge for Rajasthan aspirants.",
  },
  {
    question: "Can I use GetVidyaAI alongside another exam prep app?",
    answer:
      "Yes. Many aspirants use other platforms for live classes and video content, and GetVidyaAI for daily adaptive practice and AI study planning. At ₹499/year (less than ₹42/month), GetVidyaAI is affordable enough to use alongside any other platform. GetVidyaAI's diagnostic and weekly plan complement video content by telling you exactly which topics to focus on after each class.",
  },
];

export default function CompareOtherAppsPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "GetVidyaAI vs Other Exam Apps", url: "/compare/getvidya-vs-other-apps" },
  ]);
  const reviews = reviewSchema({ itemName: "GetVidyaAI Exam Prep Platform", ratingValue: "4.7", reviewCount: "2400" });

  const getvidyaWins = comparison.filter((r) => r.winner === "getvidya").length;
  const otherWins    = comparison.filter((r) => r.winner === "other").length;
  const ties         = comparison.filter((r) => r.winner === "tie").length;

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
            <div className="inline-block bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6">
              Honest Comparison · Updated May 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              GetVidyaAI vs Other Exam Apps 2026 —<br className="hidden md:block" />
              <span className="text-emerald-400">Which Should You Choose?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              GetVidyaAI (₹499/year) offers AI-personalized adaptive preparation. Most platforms offer live classes
              and wider content. We compare both honestly so you can decide.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mx-auto text-left">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                GetVidyaAI wins on <strong>AI personalization, price (₹499/year), free diagnostic test, and Hindi support for Tier-2 cities</strong>.
                Other leading platforms win on <strong>live classes, video content, and exam coverage breadth</strong>.
                For self-study efficiency and practice-driven preparation, GetVidyaAI delivers better ROI.
                For structured video learning and live doubt-clearing, other platforms may be a better fit.
              </p>
            </div>
          </div>
        </section>

        {/* ── SCORE CARD ───────────────────────────────────────────────────── */}
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
              <p className="text-4xl font-bold text-orange-600 mb-1">{otherWins}</p>
              <p className="text-slate-700 font-semibold">Other Platforms Win</p>
            </div>
          </div>
        </section>

        {/* ── COST CALLOUT ─────────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-slate-50 border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "GetVidyaAI", value: "₹499/yr", sub: "Vidya Pass", icon: IndianRupee, color: "text-emerald-600" },
              { label: "Other Platforms", value: "₹999–₹15k/yr", sub: "Varies by exam", icon: IndianRupee, color: "text-red-500" },
              { label: "Annual Saving", value: "₹500–₹14k", sub: "vs typical platforms", icon: Zap, color: "text-emerald-600" },
              { label: "AI Diagnostic", value: "Free", sub: "GetVidyaAI only", icon: Zap, color: "text-blue-600" },
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
            <p className="text-slate-500 text-center mb-10">GetVidyaAI vs typical leading exam prep platforms</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold w-1/4">Feature</th>
                    <th className="text-left px-6 py-4 text-emerald-700 font-bold bg-emerald-50">GetVidyaAI (₹499/year)</th>
                    <th className="text-left px-6 py-4 text-orange-700 font-bold bg-orange-50">Other Leading Platforms</th>
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
                      <td className="px-6 py-4 bg-orange-50/30">
                        <span className={`flex items-start gap-2 ${row.winner === "other" ? "text-orange-700 font-medium" : row.winner === "tie" ? "text-slate-600" : "text-slate-400"}`}>
                          {row.winner === "other" ? <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> : row.winner === "getvidya" ? <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> : <span className="w-4 h-4 mt-0.5 shrink-0" />}
                          {row.other}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs text-center mt-4">
              GetVidyaAI wins {getvidyaWins}/{comparison.length} comparisons. Other platforms win {otherWins}/{comparison.length}. Tied on {ties}.
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
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Choose GetVidyaAI if you...</h3>
                <ul className="space-y-3">
                  {[
                    "Want AI to diagnose your weak subjects and build a personalized plan",
                    "Are self-motivated and can study without live classes",
                    "Want maximum value at ₹499/year (₹1.40/day)",
                    "Prefer adaptive practice that gets harder as you improve",
                    "Are from Rajasthan/UP/MP and want Hindi-first preparation",
                    "Preparing for SSC CGL, UPSC, Banking, Railway, or RPSC RAS",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-emerald-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4">Choose another platform if you...</h3>
                <ul className="space-y-3">
                  {[
                    "Need live classes with educators for doubt-clearing",
                    "Want structured video-based courses alongside practice",
                    "Are preparing for exams beyond GetVidyaAI's current coverage",
                    "Prefer a platform with a larger community and more content volume",
                    "Need coaching-style discipline with scheduled batch timings",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-orange-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              What Aspirants Who Switched Say
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Pooja Kumari",
                  exam: "SSC CGL 2025 — Selected",
                  city: "Jaipur",
                  quote: "I used another app for the live classes but couldn't figure out what to practice on my own after each class. GetVidyaAI's weekly plan told me exactly which topics to focus on that week based on my test scores. Using both together worked perfectly.",
                  stars: 5,
                },
                {
                  name: "Manoj Yadav",
                  exam: "RPSC RAS 2025 — Appeared",
                  city: "Sikar",
                  quote: "Kisi aur platform pe kaafi paisa kharch kar raha tha. GetVidyaAI ne ₹499 mein same quality mock tests aur bhi better AI study plan diya. Rajasthan GK coverage bhi zyada focused thi. Sikar se prepare karna ab asaan ho gaya.",
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
          <h2 className="text-3xl font-bold mb-4">Try GetVidyaAI Free Before Deciding</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Take the free 25-question diagnostic. See your weak subjects. Start your AI study plan.
            No credit card, no registration — completely free.
          </p>
          <a href="/free-assessment" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all">
            Start Free Diagnostic →
          </a>
          <p className="text-emerald-200 text-sm mt-4">Vidya Pass unlocks everything · ₹499/year · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
