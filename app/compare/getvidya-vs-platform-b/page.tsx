import Link from "next/link";
import { generateSEO, breadcrumbSchema, faqSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, Star, Zap, Brain } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI vs Platform B 2026 — AI Adaptive vs High-Volume Test Series",
  description:
    "GetVidyaAI (₹499/year) vs Platform B (₹700–₹2,000/month) for SSC CGL, UPSC, Banking, Railway 2026. Which platform has better AI personalization, study plan quality, and real-world score improvement?",
  canonical: "https://getvidya.in/compare/getvidya-vs-platform-b",
  keywords: [
    "AI adaptive test vs high volume test series",
    "GetVidyaAI vs large test series platform",
    "best alternative to large test series app",
    "personalized exam prep vs static test series",
    "SSC CGL mock test 2026 which app is better",
    "UPSC mock test app comparison India",
    "affordable UPSC test series 2026",
  ],
});

const COMPARISON = [
  {
    feature: "Pricing",
    getvidya: "₹499/year — ₹1.37/day all-inclusive",
    competitor: "₹700–₹2,000/month — ₹23–₹67/day",
    winner: "getvidya",
    note: "₹499/year vs ₹8,400–₹24,000/year — same prep period, 17–48× cost difference",
  },
  {
    feature: "Personalization",
    getvidya: "AI identifies your exact weak topics on Day 1 and adapts every session",
    competitor: "Static test series — same tests, same difficulty for all students",
    winner: "getvidya",
    note: "High volume ≠ high personalisation. 2 lakh tests means nothing if none adapt to your gaps.",
  },
  {
    feature: "Diagnostic Assessment",
    getvidya: "Free 25-question diagnostic maps your weak subjects before you buy",
    competitor: "No diagnostic — attempt full mocks and self-analyse",
    winner: "getvidya",
  },
  {
    feature: "AI Study Plan",
    getvidya: "AI rebuilds your personalised 7-day plan every Sunday based on accuracy data",
    competitor: "No AI study plan — you decide what to attempt from 2 lakh+ tests",
    winner: "getvidya",
    note: "Decision fatigue kills preparation. GetVidyaAI decides for you based on data.",
  },
  {
    feature: "Mock Test Volume",
    getvidya: "1,200+ adaptive mock tests — quality-filtered and exam-pattern aligned",
    competitor: "100,000+ tests — massive library across all exams and states",
    winner: "competitor",
    note: "If volume matters most, Platform B wins. If relevance and quality matter, GetVidyaAI wins.",
  },
  {
    feature: "Question Bank",
    getvidya: "140,000+ MCQs — curated and difficulty-tagged by AI",
    competitor: "500,000+ MCQs — raw volume across all exams",
    winner: "competitor",
    note: "Again: volume vs personalisation. Platform B has more. GetVidyaAI uses your data better.",
  },
  {
    feature: "Adaptive Difficulty",
    getvidya: "Questions get harder as your accuracy improves — auto-promotion at 80%",
    competitor: "Fixed difficulty tiers — you manually select easy/medium/hard",
    winner: "getvidya",
  },
  {
    feature: "Hindi Support",
    getvidya: "Complete Hindi UI, questions, and study plans",
    competitor: "Hindi medium content available — strong regional language support",
    winner: "tie",
  },
  {
    feature: "Score Analysis",
    getvidya: "AI accuracy charts per topic, weak-subject alerts, difficulty progression",
    competitor: "Percentile ranking, section-wise score breakdowns, answer key",
    winner: "tie",
    note: "Both track performance well — different approaches.",
  },
  {
    feature: "Value for Price",
    getvidya: "₹499/year — the most affordable AI-personalised exam prep in India",
    competitor: "₹700–₹2,000/month — premium pricing for volume, not personalisation",
    winner: "getvidya",
  },
];

const faqs = [
  {
    question: "Is GetVidyaAI better than a high-volume test series for SSC CGL?",
    answer: "For most aspirants, yes — especially those who have been attempting many tests without seeing score improvement. A high-volume test series gives you quantity. GetVidyaAI gives you personalization: it identifies your exact weak topics and only makes you practice those, with increasing difficulty as you improve. Many students who switch report faster improvement within 6–8 weeks because they stop wasting time on topics they're already good at.",
  },
  {
    question: "Does GetVidyaAI have as many tests as Platform B?",
    answer: "No. GetVidyaAI has 1,200+ adaptive mock tests vs Platform B's massive library. However, GetVidyaAI's tests are adaptive — difficulty adjusts to your accuracy across sessions. Most students attempting GetVidyaAI's mock tests find them more relevant and harder to game because the difficulty level matches their current skill, not a fixed easy/medium/hard tier.",
  },
  {
    question: "Which is cheaper — GetVidyaAI or Platform B?",
    answer: "GetVidyaAI Vidya Pass is ₹499/year. Platform B's premium plans run ₹700–₹2,000/month. For a 12-month prep cycle, Platform B costs ₹8,400–₹24,000 vs ₹499 on GetVidyaAI. Both offer free trials.",
  },
  {
    question: "Can I use both GetVidyaAI and a large test series platform?",
    answer: "Yes, and some students do — they use Platform B for raw mock test volume and GetVidyaAI for the AI diagnostic, weekly study plan, and adaptive practice. However, at ₹499/year, GetVidyaAI alone handles most of what exam aspirants need: structured mock tests, adaptive MCQ practice, AI study plan, and weak-topic identification.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amit Verma",
    exam: "SSC CGL 2025 Qualifier",
    city: "Kanpur",
    stars: 5,
    quote: "I attempted 300+ mocks on a major test series platform in 8 months. My score barely moved. GetVidyaAI's diagnostic showed I was spending 40% of my time on strong subjects. 3 months of AI-guided practice later — cleared Tier 1.",
  },
  {
    name: "Sunita Devi",
    exam: "IBPS PO 2025",
    city: "Patna",
    stars: 5,
    quote: "Platform B has lakhs of tests but I never knew which one to attempt. GetVidyaAI tells me exactly what to practice each week. The weekly plan is the killer feature for me.",
  },
  {
    name: "Rajesh Nair",
    exam: "Railway RRB NTPC",
    city: "Kochi",
    stars: 5,
    quote: "I switched from a ₹1,200/month test series to GetVidyaAI at ₹499/year. The AI personalisation more than makes up for the volume difference. Saved ₹13,000+ on prep.",
  },
];

const bc = breadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Compare", url: "/compare" },
  { name: "GetVidyaAI vs Platform B", url: "/compare/getvidya-vs-platform-b" },
]);

export default function VsPlatformBPage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "GetVidyaAI vs Platform B — AI Adaptive vs High-Volume Test Series",
    description: "Comparison of GetVidyaAI and Platform B for SSC CGL, UPSC, and Banking exam preparation in India.",
    url: "https://getvidya.in/compare/getvidya-vs-platform-b",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-3 mb-8 text-sm">
              <span className="font-bold text-accent">GetVidyaAI</span>
              <span className="text-white/40">vs</span>
              <span className="font-bold text-slate-300">Platform B</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              AI-Personalised Practice vs<br />
              <span className="text-accent">High-Volume Test Series</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Platform B gives you 2 lakh+ tests and lets you figure out what to attempt. GetVidyaAI gives you an AI that analyses your accuracy and tells you exactly what to practice next — at <strong className="text-white">₹499/year</strong> vs ₹8,400–₹24,000/year.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/free-assessment" className="btn-primary px-8 py-4 rounded-2xl inline-flex items-center gap-2">
                Try GetVidyaAI Free <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-secondary px-8 py-4 rounded-2xl">
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="bg-white border-b border-slate-100 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-700 mb-1">17–48×</div>
                <div className="text-slate-600 text-sm">cheaper per year than Platform B</div>
              </div>
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                <div className="text-2xl font-bold text-blue-700 mb-1">AI-First</div>
                <div className="text-slate-600 text-sm">GetVidyaAI decides what to practice. You focus on studying.</div>
              </div>
              <div className="p-5 rounded-2xl bg-violet-50 border border-violet-200">
                <div className="text-2xl font-bold text-violet-700 mb-1">Adaptive</div>
                <div className="text-slate-600 text-sm">Difficulty adjusts to your accuracy — not a fixed easy/medium/hard</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-500 mb-2 text-center">Feature-by-Feature Comparison</h2>
            <p className="text-slate-500 text-center mb-10">GetVidyaAI vs Platform B (High-Volume Test Series)</p>
            <div className="space-y-3">
              {COMPARISON.map(({ feature, getvidya, competitor, winner, note }) => (
                <div key={feature} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                    <span className="font-semibold text-slate-700 text-sm">{feature}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`p-4 flex gap-3 ${winner === "getvidya" ? "bg-emerald-50/60" : ""}`}>
                      {winner === "getvidya"
                        ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        : winner === "tie"
                          ? <span className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                          : <span className="w-4 shrink-0 mt-0.5" />
                      }
                      <div>
                        <div className="text-xs font-semibold text-accent mb-1">GetVidyaAI</div>
                        <p className="text-slate-700 text-sm leading-relaxed">{getvidya}</p>
                      </div>
                    </div>
                    <div className={`p-4 flex gap-3 border-t md:border-t-0 md:border-l border-slate-200 ${winner === "competitor" ? "bg-slate-50" : ""}`}>
                      {winner === "competitor"
                        ? <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                        : winner === "tie"
                          ? <span className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                          : <XCircle size={16} className="text-slate-300 shrink-0 mt-0.5" />
                      }
                      <div>
                        <div className="text-xs font-semibold text-slate-400 mb-1">Platform B</div>
                        <p className="text-slate-600 text-sm leading-relaxed">{competitor}</p>
                      </div>
                    </div>
                  </div>
                  {note && (
                    <div className="px-5 py-2.5 bg-amber-50 border-t border-amber-100 text-xs text-amber-700 flex items-start gap-2">
                      <Zap size={12} className="shrink-0 mt-0.5" />
                      {note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to choose */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-500 mb-10 text-center">Which Should You Choose?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border-2 border-accent bg-accent/5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={20} className="text-accent" />
                  <span className="font-bold text-primary-500">Choose GetVidyaAI if…</span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "You've been attempting tests but not improving",
                    "You want AI to tell you what to study — not a list of 2 lakh options",
                    "Budget is tight — ₹499/year vs ₹8,400–₹24,000/year",
                    "You want adaptive difficulty, not fixed easy/medium/hard",
                    "You prefer quality + personalisation over raw volume",
                    "You need a weekly study plan that adapts to your progress",
                  ].map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-slate-500">Choose Platform B if…</span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "You want the largest possible test bank — volume is your priority",
                    "You're preparing for multiple state exams simultaneously",
                    "You prefer self-directed study with no AI guidance",
                    "Budget is not a constraint",
                  ].map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-500 mb-8 text-center">Students Who Switched</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map(({ name, exam, city, stars, quote }) => (
                <div key={name} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(stars)].map((_, i) => <Star key={i} size={13} className="text-accent fill-accent" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-4">&ldquo;{quote}&rdquo;</p>
                  <div className="border-t border-slate-100 pt-3">
                    <div className="font-semibold text-slate-800 text-sm">{name}</div>
                    <div className="text-slate-400 text-xs">{exam} · {city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-500 mb-8 text-center">Common Questions</h2>
            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="border border-slate-200 rounded-xl p-5 cursor-pointer group">
                  <summary className="font-semibold text-slate-800 list-none flex justify-between items-center gap-4">
                    {question}
                    <ArrowRight size={16} className="text-slate-400 shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-hero text-white text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Try GetVidyaAI Free Before Deciding</h2>
            <p className="text-white/70 mb-8">25-question diagnostic · no credit card · weak-subject report in 20 min</p>
            <Link href="/free-assessment" className="btn-primary px-10 py-4 rounded-2xl inline-flex items-center gap-2 text-base">
              Start Free Diagnostic <ArrowRight size={18} />
            </Link>
            <p className="text-white/40 text-sm mt-4">Vidya Pass · ₹499/year · Cancel anytime</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
