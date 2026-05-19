import Link from "next/link";
import { generateSEO, breadcrumbSchema, faqSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, XCircle, ArrowRight, Star, Zap, Brain } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI vs Platform A 2026 — AI Adaptive vs Video-Lecture Exam Prep",
  description:
    "Detailed comparison of GetVidyaAI (₹499/year) vs Platform A (₹500–₹1,500/month) for SSC CGL, UPSC, Banking, and Railway prep. Compare AI personalization, pricing, mock tests, and study plan quality.",
  canonical: "https://getvidya.in/compare/getvidya-vs-platform-a",
  keywords: [
    "AI exam prep vs video lecture platform",
    "adaptive exam prep vs coaching app",
    "best alternative to video lecture exam app",
    "GetVidyaAI vs other exam app",
    "AI personalized study plan vs fixed schedule",
    "affordable SSC CGL app 2026",
    "best mock test app for UPSC 2026",
  ],
});

const COMPARISON = [
  {
    feature: "Pricing",
    getvidya: "₹499/year (Vidya Pass) — ₹1.37/day",
    competitor: "₹500–₹1,500/month — ₹16–₹50/day",
    winner: "getvidya",
    note: "Platform A costs 12–36× more per day",
  },
  {
    feature: "Core Learning Model",
    getvidya: "AI-adaptive practice — questions adjust to your accuracy in real time",
    competitor: "Pre-recorded video lectures — fixed content, watch at your own pace",
    winner: "getvidya",
    note: "Video is passive. GetVidyaAI makes you actively practice and recall.",
  },
  {
    feature: "Day 1 Experience",
    getvidya: "Free 25-question diagnostic maps your exact weak subjects",
    competitor: "Enroll in a course → watch lecture 1 of 200",
    winner: "getvidya",
    note: "GetVidyaAI tells you what to study. Platform A tells you to watch from the start.",
  },
  {
    feature: "Study Plan",
    getvidya: "AI rebuilds a personalised 7-day plan every week based on your accuracy",
    competitor: "Fixed course curriculum — same schedule for all students",
    winner: "getvidya",
    note: "Your plan on GetVidyaAI is never the same two weeks in a row.",
  },
  {
    feature: "Mock Tests",
    getvidya: "1,200+ adaptive mock tests — difficulty adjusts as you improve",
    competitor: "500+ full-length mock tests included in premium plans",
    winner: "getvidya",
  },
  {
    feature: "Video Content",
    getvidya: "No video lectures — pure practice-focused",
    competitor: "Extensive subject-wise video library — hundreds of hours",
    winner: "competitor",
    note: "If you prefer video learning, Platform A wins this dimension.",
  },
  {
    feature: "Hindi Language Support",
    getvidya: "Full Hindi support — UI, questions, and study plans in Hindi",
    competitor: "Mixed — most content in English, select Hindi medium courses",
    winner: "getvidya",
  },
  {
    feature: "Progress Tracking",
    getvidya: "Subject-wise accuracy, difficulty progression, weak-topic alerts",
    competitor: "Course completion percentage, video watch time",
    winner: "getvidya",
    note: "Completion % doesn't measure learning. Accuracy does.",
  },
  {
    feature: "Gamification",
    getvidya: "XP system, daily streaks, level progression, leaderboards",
    competitor: "Course badges and completion certificates",
    winner: "getvidya",
  },
  {
    feature: "Offline Access",
    getvidya: "App-based with offline question download (Android/iOS)",
    competitor: "Video downloads available on premium plans",
    winner: "tie",
  },
];

const faqs = [
  {
    question: "Is GetVidyaAI better than a video-lecture platform for SSC CGL?",
    answer: "For most SSC CGL aspirants, yes — especially if you prefer active practice over passive watching. GetVidyaAI's AI identifies your specific weak topics and makes you practice them daily with adaptive difficulty. A video platform gives you the same lecture sequence as every other student. If you already know theory but need to build exam speed and accuracy, GetVidyaAI is significantly more efficient.",
  },
  {
    question: "Does GetVidyaAI have video lectures?",
    answer: "No. GetVidyaAI is a pure practice-and-adaptive platform. It does not have video lectures. This is intentional — research shows active recall (practice tests) produces 2–3× better long-term retention than passive video watching. If you need to learn concepts from scratch, supplement GetVidyaAI with free YouTube channels for theory, then use GetVidyaAI for daily practice.",
  },
  {
    question: "Which is cheaper — GetVidyaAI or Platform A?",
    answer: "GetVidyaAI Vidya Pass is ₹499/year (₹1.37/day). Platform A typically charges ₹500–₹1,500/month (₹16–₹50/day). GetVidyaAI is 12–36× cheaper per day. For a 12-month prep cycle, Platform A can cost ₹6,000–₹18,000 vs ₹499 on GetVidyaAI.",
  },
  {
    question: "Can I use both GetVidyaAI and a video platform together?",
    answer: "Yes — and this is often the most effective approach. Use free YouTube content or notes for theory revision, then use GetVidyaAI for daily adaptive practice, mock tests, and AI study plan. This hybrid approach gives you structured content and AI-personalised practice at a fraction of the cost of a premium video subscription.",
  },
];

const TESTIMONIALS = [
  {
    name: "Suresh Kumar",
    exam: "SSC CGL 2025",
    city: "Jaipur",
    stars: 5,
    quote: "I spent 8 months on a video platform but wasn't improving. Switched to GetVidyaAI for the last 3 months. The diagnostic test showed I was weak in Reasoning — something I never focused on because the video course treated all sections equally.",
  },
  {
    name: "Meena Patel",
    exam: "UPSC CSE Aspirant",
    city: "Indore",
    stars: 5,
    quote: "GetVidyaAI's weekly study plan rebuilt every Sunday. After 6 weeks I had a clear picture of which subjects needed most work. A video platform would have just told me to watch the next lecture.",
  },
  {
    name: "Arun Tiwari",
    exam: "IBPS PO 2025",
    city: "Lucknow",
    stars: 5,
    quote: "I use free YouTube for concepts and GetVidyaAI for daily practice. Cracked IBPS PO in 5 months total spend: ₹0 + ₹499. The personalisation made all the difference.",
  },
];

const bc = breadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Compare", url: "/compare" },
  { name: "GetVidyaAI vs Platform A", url: "/compare/getvidya-vs-platform-a" },
]);

const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "GetVidyaAI vs Platform A — AI Adaptive vs Video-Lecture Exam Prep",
  description:
    "Detailed comparison of GetVidyaAI and Platform A for SSC CGL, UPSC, Banking, and Railway government exam preparation in India.",
  url: "https://getvidya.in/compare/getvidya-vs-platform-a",
  breadcrumb: bc,
};

export default function VsPlatformAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-3 mb-8 text-sm">
              <span className="font-bold text-accent">GetVidyaAI</span>
              <span className="text-white/40">vs</span>
              <span className="font-bold text-slate-300">Platform A</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              AI-Adaptive Practice vs<br />
              <span className="text-accent">Video-Lecture Platform</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Platform A gives you video content on a fixed schedule. GetVidyaAI gives you AI that identifies your exact weak topics and rebuilds your plan every week — at <strong className="text-white">₹499/year</strong> vs ₹6,000–₹18,000/year.
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

        {/* Quick verdict */}
        <section className="bg-white border-b border-slate-100 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-700 mb-1">12–36×</div>
                <div className="text-slate-600 text-sm">cheaper per day than Platform A</div>
              </div>
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                <div className="text-2xl font-bold text-blue-700 mb-1">Day 1</div>
                <div className="text-slate-600 text-sm">GetVidyaAI knows your weak topics. Platform A shows you lecture 1.</div>
              </div>
              <div className="p-5 rounded-2xl bg-violet-50 border border-violet-200">
                <div className="text-2xl font-bold text-violet-700 mb-1">Weekly</div>
                <div className="text-slate-600 text-sm">AI study plan that adapts vs fixed video course for everyone</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-500 mb-2 text-center">Feature-by-Feature Comparison</h2>
            <p className="text-slate-500 text-center mb-10">GetVidyaAI vs Platform A (Video-Lecture Model)</p>
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
                        <div className="text-xs font-semibold text-slate-400 mb-1">Platform A</div>
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
                    "You know basic theory and need to build speed + accuracy",
                    "You want AI to tell you exactly what to study each week",
                    "Your budget is ₹499/year, not ₹6,000–₹18,000/year",
                    "You prefer active practice over passive video watching",
                    "You need Hindi-medium support",
                    "You want to track accuracy per topic, not video completion %",
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
                  <span className="font-bold text-slate-500">Choose Platform A if…</span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "You are starting from scratch and need concept explanations",
                    "You learn better by watching video lectures",
                    "Budget is not a constraint",
                    "You prefer a structured course over self-directed practice",
                  ].map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
                  <strong>Pro tip:</strong> Use free YouTube for theory + GetVidyaAI for adaptive practice. Total cost: ₹499/year.
                </div>
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
