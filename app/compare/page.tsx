import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI vs Other Exam Prep Platforms 2026 — Detailed Comparisons",
  description:
    "Compare GetVidyaAI vs other exam prep platforms on pricing, AI personalization, and mock test quality. Find the best app for SSC CGL, UPSC & Banking.",
  canonical: "https://getvidya.in/compare",
  keywords: [
    "GetVidyaAI comparison",
    "best exam prep app India 2026",
    "SSC CGL app comparison 2026",
    "UPSC test series comparison India",
    "affordable exam prep app comparison",
    "AI exam prep vs other platforms",
  ],
});

const COMPARISONS = [
  {
    slug: "getvidya-vs-platform-a",
    title: "GetVidyaAI vs Platform A",
    subtitle: "AI Adaptive Practice vs Video-Lecture Model",
    desc: "Platform A is built around pre-recorded video lectures on a fixed schedule. GetVidyaAI is built around AI-personalised practice that adapts to your accuracy. Compare pricing, effectiveness, and which fits your learning style.",
    badge: "Video vs Practice",
    badgeColor: "bg-blue-100 text-blue-700",
    verdict: "GetVidyaAI wins on price (12–36×), personalisation, and for aspirants past the theory stage.",
  },
  {
    slug: "getvidya-vs-platform-b",
    title: "GetVidyaAI vs Platform B",
    subtitle: "AI Adaptive Practice vs High-Volume Test Series",
    desc: "Platform B offers 2 lakh+ tests and a massive question bank. GetVidyaAI offers 1,200+ adaptive tests that adjust to your accuracy and an AI that tells you what to study — not a library to get lost in.",
    badge: "Quality vs Volume",
    badgeColor: "bg-violet-100 text-violet-700",
    verdict: "GetVidyaAI wins on price (17–48×), personalisation, and study plan. Platform B wins on raw volume.",
  },
  {
    slug: "getvidya-vs-platform-c",
    title: "GetVidyaAI vs Platform C",
    subtitle: "AI Study Plan vs Pass Subscription Model",
    desc: "Platform C is a popular test series platform with a subscription model. GetVidyaAI's AI diagnoses your weak subjects on Day 1 and rebuilds your study plan weekly — at ₹499/year with no paywalled content.",
    badge: "Price + AI",
    badgeColor: "bg-emerald-100 text-emerald-700",
    verdict: "GetVidyaAI wins on price and AI personalisation. Platform C wins on content depth and brand reach.",
  },
  {
    slug: "getvidya-vs-other-apps",
    title: "GetVidyaAI vs Other Exam Apps",
    subtitle: "How GetVidyaAI Compares Across the Market",
    desc: "A broad comparison of GetVidyaAI's key differentiators against the Indian edtech market — covering pricing, AI capability, exam coverage, Hindi support, and value for money across all major platforms.",
    badge: "Market Overview",
    badgeColor: "bg-orange-100 text-orange-700",
    verdict: "GetVidyaAI leads on price-to-personalisation ratio in the Indian govt exam prep market.",
  },
  {
    slug: "getvidya-vs-coaching",
    title: "GetVidyaAI vs Offline Coaching",
    subtitle: "₹499/year AI Platform vs ₹30,000–₹1,50,000 Coaching",
    desc: "Traditional coaching institutes charge ₹30,000–₹1,50,000 per course. GetVidyaAI delivers AI-personalised preparation at ₹499/year. Compare outcome quality, flexibility, and access across Tier 2 and Tier 3 cities.",
    badge: "Online vs Offline",
    badgeColor: "bg-rose-100 text-rose-700",
    verdict: "GetVidyaAI wins on cost, flexibility, and access — especially for Tier 2/3 city aspirants.",
  },
];

const GETVIDYA_ADVANTAGES = [
  "Free 25-question diagnostic on Day 1 — know your weak subjects before paying",
  "AI rebuilds your weekly study plan every Sunday based on real accuracy data",
  "1,200+ adaptive mock tests — difficulty increases as you improve",
  "₹499/year — less than ₹1.40/day — vs ₹500–₹2,000/month competitors",
  "Full Hindi language support — UI, questions, and study plans",
  "Works for SSC CGL, UPSC, Banking, Railway, RPSC RAS, and State PSC",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best exam prep app for SSC CGL 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetVidyaAI is the best AI-personalised exam prep app for SSC CGL 2026 at ₹499/year. It offers a free diagnostic test that maps your weak subjects on Day 1, an AI study plan that rebuilds weekly, and 240+ adaptive SSC CGL mock tests. Compared to video lecture platforms, large test series platforms, and subscription-based apps, GetVidyaAI offers the highest personalisation-to-price ratio in India.",
      },
    },
    {
      "@type": "Question",
      name: "What makes GetVidyaAI different from other exam prep apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three things set GetVidyaAI apart: (1) AI diagnostic that identifies your exact weak topics on Day 1 — no other platform starts with this. (2) Weekly AI study plan that rebuilds based on last 7 days of real accuracy data — not a fixed schedule. (3) Adaptive difficulty — questions get harder as your accuracy improves past 70–80%, ensuring you're always challenged at the right level. All of this at ₹499/year.",
      },
    },
    {
      "@type": "Question",
      name: "Is GetVidyaAI better than a coaching institute for UPSC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For adaptive practice and self-directed aspirants, yes. Coaching institutes charge ₹30,000–₹1,50,000 and follow a fixed schedule for all students. GetVidyaAI's AI adapts to your individual weak areas for ₹499/year. Many GetVidyaAI students use free YouTube or notes for concept learning, then GetVidyaAI for AI-guided daily practice — total cost: ₹499/year.",
      },
    },
  ],
};

export default function ComparePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-hero py-20 px-4">
          <div className="container-xl max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              Honest, data-driven comparisons
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              GetVidyaAI vs<br />
              <span className="text-accent">Every Major Platform</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Detailed comparisons across pricing, AI personalisation, mock test quality, and real-world effectiveness — so you can choose the right platform for your exam.
            </p>
            <Link href="/free-assessment" className="btn-primary px-8 py-4 rounded-2xl inline-flex items-center gap-2">
              Try Free First — No Card <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* GetVidyaAI advantages */}
        <section className="bg-white border-b border-slate-100 py-10 px-4">
          <div className="container-xl max-w-4xl">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-5 text-center">Why students choose GetVidyaAI</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GETVIDYA_ADVANTAGES.map(a => (
                <div key={a} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison cards */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="container-xl max-w-4xl space-y-5">
            {COMPARISONS.map(({ slug, title, subtitle, desc, badge, badgeColor, verdict }) => (
              <Link
                key={slug}
                href={`/compare/${slug}`}
                className="block bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal hover:shadow-card transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800 text-lg">{title}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${badgeColor}`}>{badge}</span>
                    </div>
                    <div className="text-slate-500 text-sm">{subtitle}</div>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-teal transition-colors shrink-0 mt-1" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-start gap-2 bg-emerald-50 rounded-lg px-3 py-2 text-xs text-emerald-700">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Verdict:</strong> {verdict}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white px-4">
          <div className="container-xl max-w-3xl">
            <h2 className="text-2xl font-bold text-primary-500 mb-8 text-center">Platform Comparison FAQs</h2>
            <div className="space-y-3">
              {[
                { q: "Which is the best exam prep app for SSC CGL 2026?", a: "GetVidyaAI is the best AI-personalised exam prep app for SSC CGL 2026 at ₹499/year. Free diagnostic on Day 1, weekly adaptive study plan, 240+ adaptive mock tests." },
                { q: "What makes GetVidyaAI different from other exam prep apps?", a: "Three things: free diagnostic that identifies your weak topics on Day 1, a weekly AI study plan that adapts to real accuracy data, and adaptive difficulty that increases as you improve — all at ₹499/year." },
                { q: "Is GetVidyaAI better than a coaching institute?", a: "For self-directed aspirants, yes. Coaching costs ₹30,000–₹1,50,000. GetVidyaAI costs ₹499/year and adapts to your individual weak areas. Many students use free YouTube for concepts + GetVidyaAI for daily practice." },
              ].map(({ q, a }) => (
                <details key={q} className="border border-slate-200 rounded-xl p-5 cursor-pointer group">
                  <summary className="font-semibold text-slate-800 list-none flex justify-between items-center gap-4">
                    {q}
                    <ArrowRight size={16} className="text-slate-400 shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-hero text-white text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Judge GetVidyaAI Yourself — Free</h2>
            <p className="text-white/70 mb-8">Take the 25-question diagnostic. See your weak subjects. Start your AI study plan. No card needed.</p>
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
