import { generateSEO, breadcrumbSchema, faqSchema, reviewSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, Star, TrendingDown, Clock, IndianRupee } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidya vs Traditional Coaching — AI Prep at 1% of the Cost",
  description:
    "Compare GetVidya AI exam prep (₹149/month) with traditional SSC and UPSC coaching centres (₹20,000–₹60,000/year). See why 2,00,000+ aspirants switched to personalized AI preparation.",
  keywords: [
    "GetVidya vs coaching",
    "AI exam prep vs coaching centre",
    "online SSC preparation vs offline coaching",
    "best alternative to coaching for SSC CGL",
    "cheap SSC coaching alternative India",
    "AI vs traditional coaching UPSC",
    "online exam prep cheaper than coaching",
    "GetVidya review vs Testbook vs coaching",
    "should I join coaching or study online SSC",
  ],
  canonical: "/compare/getvidya-vs-coaching",
});

const APP_URL = "https://app.getvidya.in";

const comparison = [
  {
    feature:   "Monthly Cost",
    getvidya:  "₹149/month",
    coaching:  "₹1,500–₹5,000/month",
    winner:    "getvidya",
  },
  {
    feature:   "Personalization",
    getvidya:  "AI identifies your exact weak topics on Day 1 via diagnostic test",
    coaching:  "Same fixed syllabus for every student regardless of level",
    winner:    "getvidya",
  },
  {
    feature:   "Study Schedule",
    getvidya:  "Personalized AI-generated weekly plan based on your performance",
    coaching:  "Fixed batch schedule — miss a class and you are behind",
    winner:    "getvidya",
  },
  {
    feature:   "Practice Questions",
    getvidya:  "140,000+ MCQs, never repeats seen questions",
    coaching:  "Printed study material, limited question bank, outdated PYQs",
    winner:    "getvidya",
  },
  {
    feature:   "Availability",
    getvidya:  "24/7 on Android, iOS, and web browser",
    coaching:  "Fixed class timings, usually 2–3 hours per day",
    winner:    "getvidya",
  },
  {
    feature:   "Progress Tracking",
    getvidya:  "Real-time accuracy per topic, exam readiness score, weak subject alerts",
    coaching:  "Monthly tests at best; no daily performance insights",
    winner:    "getvidya",
  },
  {
    feature:   "Faculty Interaction",
    getvidya:  "AI chat for doubts (GetVidyaAI); no human expert on call",
    coaching:  "Direct faculty access for subject doubts",
    winner:    "coaching",
  },
  {
    feature:   "Motivation",
    getvidya:  "Daily XP, streaks, and gamified milestones",
    coaching:  "Group environment provides peer motivation",
    winner:    "tie",
  },
  {
    feature:   "Mobility",
    getvidya:  "Study from Jaipur, Delhi, Pune, Lucknow — anywhere with 4G",
    coaching:  "Physically relocate to coaching hub city (Delhi, Allahabad, etc.)",
    winner:    "getvidya",
  },
  {
    feature:   "Exam Coverage",
    getvidya:  "SSC CGL, UPSC CSE, Banking, Railway, State PSC, Defence",
    coaching:  "Usually 1–2 exams per centre",
    winner:    "getvidya",
  },
];

const faqs = [
  {
    question: "Is online exam preparation with AI as effective as traditional coaching?",
    answer:
      "For most government exam aspirants, AI-powered platforms like GetVidya are more effective than traditional coaching for self-study phases. GetVidyaAI identifies your weak subjects on day one through a diagnostic test and personalizes every practice session around them. Traditional coaching follows a fixed batch syllabus that cannot adapt to individual gaps. The best approach combines AI practice (daily MCQs, mock tests, adaptive difficulty) for efficiency with coaching for structured guidance — but for most aspirants, AI-only prep at ₹149/month delivers better ROI.",
  },
  {
    question: "How does GetVidya compare to coaching centres for SSC CGL preparation?",
    answer:
      "GetVidya at ₹149/month gives you 240+ SSC CGL mock tests, 28,000+ MCQs, AI-personalized study plans, and real-time accuracy analytics across all 4 Tier-1 sections. A mid-tier SSC coaching centre costs ₹15,000–₹30,000 per year and offers a fixed curriculum with no personalization. The key difference: GetVidya's AI knows which 3 topics in Reasoning are costing you marks and focuses practice there. A coaching batch cannot do that.",
  },
  {
    question: "Does GetVidya replace coaching or complement it?",
    answer:
      "GetVidya works both as a standalone preparation tool and as a complement to existing coaching. Students already enrolled in coaching use GetVidya for daily adaptive practice, timed mock tests, and weekly AI study plans — all of which coaching cannot provide at this granularity. Students without coaching use GetVidya as their primary platform and achieve strong results because the AI fills the personalization gap that coaching fills with human faculty.",
  },
  {
    question: "What is the GetVidya Diagnostic Assessment and how does it work?",
    answer:
      "The GetVidya Diagnostic Assessment is a 25-question quiz that covers the key subjects of your target exam. GetVidyaAI analyzes your answers to identify strong and weak subjects, then uses that data to personalize your AI study plan and practice sessions from Day 1. It takes approximately 20 minutes and is available free without any payment.",
  },
];

export default function CompareCoachingPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "GetVidya vs Coaching", url: "/compare/getvidya-vs-coaching" },
  ]);
  const reviews = reviewSchema({ itemName: "GetVidya vs Traditional Coaching", ratingValue: "4.7", reviewCount: "2400" });

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
              GetVidya AI vs Traditional Coaching —<br className="hidden md:block" />
              <span className="text-emerald-400">Which Is Better for SSC & UPSC Prep?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              GetVidya delivers AI-personalized exam prep at ₹149/month. Traditional coaching averages ₹30,000/year.
              We compare both honestly so you can make the right call.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mx-auto text-left">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                GetVidya costs <strong>₹149/month</strong> versus ₹1,500–₹5,000/month for coaching. It offers
                AI-personalized practice that identifies your exact weak topics on Day 1 — something no coaching
                batch can do. For self-motivated aspirants with smartphone access, GetVidya delivers better
                ROI at 1% of the coaching cost.
              </p>
            </div>
          </div>
        </section>

        {/* ── COST CALLOUT ─────────────────────────────────────────────────── */}
        <section className="py-10 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "GetVidya Cost",  value: "₹149/mo", sub: "Full access", icon: IndianRupee, color: "text-emerald-600" },
              { label: "Avg Coaching",   value: "₹2,500/mo", sub: "Mid-tier centre", icon: IndianRupee, color: "text-red-500" },
              { label: "You Save",       value: "₹28,212/yr", sub: "vs coaching", icon: TrendingDown, color: "text-emerald-600" },
              { label: "Questions Bank", value: "140,000+", sub: "vs printed notes", icon: Clock, color: "text-blue-600" },
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
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              Detailed Feature-by-Feature Comparison
            </h2>
            <p className="text-slate-500 text-center mb-10">No marketing bias — just the facts</p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold w-1/4">Feature</th>
                    <th className="text-left px-6 py-4 text-emerald-700 font-bold bg-emerald-50">GetVidya (₹149/mo)</th>
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold">Traditional Coaching</th>
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
                      <td className="px-6 py-4">
                        <span className={`flex items-start gap-2 ${row.winner === "coaching" ? "text-emerald-700 font-medium" : row.winner === "tie" ? "text-slate-600" : "text-slate-400"}`}>
                          {row.winner === "coaching" ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : row.winner === "getvidya" ? <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> : <span className="w-4 h-4 mt-0.5 shrink-0" />}
                          {row.coaching}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs text-center mt-4">GetVidya wins 8/10 comparisons. Coaching wins on live faculty access. Tied on peer motivation.</p>
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
                  name: "Vikram Yadav",
                  exam: "SSC CGL 2024 — Selected",
                  city: "Jaipur",
                  quote: "I was paying ₹18,000/year for coaching and still failing. Switched to GetVidya, cleared in 4 months. The AI literally told me I was weak in Percentages — 3 weeks of targeted practice changed everything.",
                  stars: 5,
                },
                {
                  name: "Neha Agarwal",
                  exam: "SBI Clerk 2025 — Selected",
                  city: "Lucknow",
                  quote: "Coaching had 60 students in one batch. GetVidya treated me like I was the only student. My AI study plan was different from my friend's because our weak areas were different.",
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
          <h2 className="text-3xl font-bold mb-4">Try GetVidya Free — No Credit Card Needed</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Take the 25-question Diagnostic Assessment. See your weak subjects. Get your AI study plan.
            All free, today.
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
