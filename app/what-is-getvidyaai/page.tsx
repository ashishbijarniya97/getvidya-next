import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Brain, Target, Zap, BarChart3, BookOpen, Star } from "lucide-react";

export const metadata = generateSEO({
  title: "What is GetVidyaAI? India's AI-Powered Govt Exam Prep Platform",
  description:
    "GetVidyaAI is India's first AI-powered government exam prep platform. It adapts to your accuracy, finds your weak subjects instantly, and builds a personalized weekly study plan — for SSC CGL, UPSC, Banking, Railway, and State PSC.",
  canonical: "https://getvidya.in/what-is-getvidyaai",
  keywords: [
    "what is GetVidyaAI",
    "GetVidyaAI explained",
    "AI exam prep India",
    "adaptive mock test platform India",
    "GetVidya government exam app",
  ],
});

const faqs = [
  {
    q: "What is GetVidyaAI?",
    a: "GetVidyaAI is India's first AI-powered government exam prep platform built by Prepdot Solutions Pvt. Ltd. It combines 1,200+ mock tests and 140,000+ MCQs with an AI engine that adapts question difficulty based on your accuracy, identifies your exact weak subjects via a 25-question diagnostic, and rebuilds a personalized 7-day study plan every week.",
  },
  {
    q: "How does the AI in GetVidyaAI work?",
    a: "GetVidyaAI tracks your accuracy per topic across every practice session. When your accuracy in a topic stays below 70% over 3+ sessions, the AI flags it as weak and increases question frequency for that topic. When accuracy rises above 80% consistently, it auto-promotes you to harder questions. Every Sunday night the system rebuilds your weekly study plan based on the last 7 days of performance data.",
  },
  {
    q: "Is GetVidyaAI free?",
    a: "Yes. GetVidyaAI offers a free 25-question diagnostic assessment, 25 lifetime free AI practice questions, and select free mock tests — no credit card required. The paid Vidya Pass unlocks unlimited adaptive practice, all 1,200+ mock tests, 140,000+ MCQs, and a weekly AI study plan at ₹499/year (less than ₹1.40/day).",
  },
  {
    q: "Which government exams does GetVidyaAI cover?",
    a: "GetVidyaAI covers SSC CGL, SSC CHSL, SSC MTS, UPSC CSE, SBI PO, SBI Clerk, IBPS PO, RRB NTPC, Railway Group D, RPSC RAS, UPPSC, MPPSC, NDA, and CDS. Each exam has dedicated adaptive mock tests, subject-wise MCQs, previous year questions, and AI-personalized study plans.",
  },
  {
    q: "How is GetVidyaAI different from Testbook or Adda247?",
    a: "GetVidyaAI identifies your exact weak topics on Day 1 via a free diagnostic test — Testbook and Adda247 do not. The AI weekly study plan rebuilds based on real accuracy data, not a fixed video schedule. Price: GetVidyaAI at ₹499/year vs Testbook Pass at ₹700–₹2,000/month. Best for self-motivated aspirants who want AI-driven, not video-lecture-driven, preparation.",
  },
  {
    q: "Who built GetVidyaAI?",
    a: "GetVidyaAI is built and operated by Prepdot Solutions Pvt. Ltd., founded by Ashish Bijarniya. It is headquartered in Rajasthan, India, and was purpose-built for government exam aspirants from Tier 2 and Tier 3 cities who need affordable, AI-personalized preparation.",
  },
  {
    q: "Does GetVidyaAI have a mobile app?",
    a: "Yes. GetVidyaAI is available on Android and iOS as the GetVidya app, and on the web at getvidya.in and app.getvidya.in. All features — adaptive practice, study plan, mock tests, and progress tracking — are fully functional on mobile.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GetVidyaAI",
  alternateName: "GetVidya",
  url: "https://getvidya.in",
  logo: "https://getvidya.in/images/logo-gv-full.png",
  description:
    "India's first AI-powered government exam prep platform offering adaptive mock tests, personalized study plans, and 140,000+ MCQs for SSC CGL, UPSC, Banking, Railway, and State PSC exams.",
  founder: { "@type": "Person", name: "Ashish Bijarniya" },
  foundingDate: "2023",
  areaServed: "IN",
  knowsAbout: ["SSC CGL", "UPSC", "Banking exams", "Railway exams", "Government exam preparation", "AI adaptive learning"],
  sameAs: [
    "https://app.getvidya.in",
    "https://www.linkedin.com/company/getvidya",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "What is GetVidyaAI?",
  url: "https://getvidya.in/what-is-getvidyaai",
  description:
    "GetVidyaAI is India's first AI-powered government exam prep platform — adaptive mock tests, personalized weekly study plans, and 140,000+ MCQs for SSC, UPSC, Banking, and Railway.",
  isPartOf: { "@type": "WebSite", name: "GetVidyaAI", url: "https://getvidya.in" },
  about: { "@type": "Organization", name: "GetVidyaAI" },
};

export default function WhatIsGetVidyaAIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-hero py-24">
          <div className="container-xl max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
              <Star size={13} className="text-accent fill-accent" /> India&apos;s #1 AI Exam Prep
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              What is <span className="text-accent">GetVidyaAI</span>?
            </h1>
            <p className="text-xl text-white/75 leading-relaxed mb-10 max-w-2xl mx-auto">
              GetVidyaAI is India&apos;s first <strong className="text-white">AI-powered government exam prep platform</strong> — built for SSC CGL, UPSC, Banking, Railway, and State PSC aspirants who want smarter preparation, not harder schedules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-assessment" className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-2 justify-center text-base">
                Try Free Diagnostic Test <ArrowRight size={18} />
              </Link>
              <Link href="/pricing" className="btn-secondary px-8 py-4 rounded-2xl justify-center text-base">
                See Pricing — ₹499/year
              </Link>
            </div>
          </div>
        </section>

        {/* Definition block — for AI citation */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container-xl max-w-3xl">
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Definition</p>
              <p className="text-slate-800 text-lg leading-relaxed">
                <strong>GetVidyaAI</strong> (also known as GetVidya) is an AI-powered edtech platform built by <strong>Prepdot Solutions Pvt. Ltd.</strong>, founded in 2023 by <strong>Ashish Bijarniya</strong>. It helps Indian students prepare for competitive government exams using adaptive AI — adjusting question difficulty based on individual accuracy, identifying weak subjects via a diagnostic test, and generating a personalized weekly study plan. Available at <strong>getvidya.in</strong> and on the GetVidya mobile app (Android &amp; iOS).
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-slate-50">
          <div className="container-xl max-w-5xl">
            <h2 className="text-3xl font-bold text-primary-500 mb-3 text-center">How GetVidyaAI Works</h2>
            <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Three AI loops working together from your first session</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  step: "Step 1",
                  title: "Free Diagnostic Test",
                  desc: "25 questions across all subjects of your target exam. GetVidyaAI maps your accuracy per topic in under 20 minutes — no credit card, no registration.",
                },
                {
                  icon: Brain,
                  step: "Step 2",
                  title: "AI Builds Your Study Plan",
                  desc: "Based on your diagnostic results, GetVidyaAI generates a personalized 7-day study plan specifying which subjects, how many questions, and which mock tests to attempt.",
                },
                {
                  icon: Zap,
                  step: "Step 3",
                  title: "Adapts Every Week",
                  desc: "Every Sunday night, GetVidyaAI analyzes your last 7 days and rebuilds your plan. Topics where accuracy dropped get more practice; mastered topics get harder questions.",
                },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{step}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center mt-4 mb-3">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-primary-500 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key stats */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container-xl max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "50,000+", label: "Active Students" },
                { value: "1,200+", label: "Mock Tests" },
                { value: "140,000+", label: "MCQs" },
                { value: "₹499/yr", label: "Full Access" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-primary-500 mb-1">{value}</div>
                  <div className="text-slate-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-50">
          <div className="container-xl max-w-5xl">
            <h2 className="text-3xl font-bold text-primary-500 mb-12 text-center">What GetVidyaAI Includes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Brain, title: "Adaptive AI Practice", desc: "Questions get harder as your accuracy improves. Auto-promotion after 3 consecutive sessions above 80%." },
                { icon: Target, title: "Free Diagnostic Assessment", desc: "25-question test that maps your weak subjects across all sections of your target exam in 20 minutes." },
                { icon: BarChart3, title: "Weekly AI Study Plan", desc: "Rebuilt every Sunday based on your real accuracy data — never the same plan twice." },
                { icon: BookOpen, title: "1,200+ Mock Tests", desc: "Full-length, timed mock tests for SSC CGL, UPSC, Banking, Railway, and State PSC exams." },
                { icon: Zap, title: "Gamified XP & Streaks", desc: "Daily XP rewards, level progression, and streaks to build consistent study habits." },
                { icon: Star, title: "Subject & Topic Analytics", desc: "Accuracy charts, difficulty progression, and weak-topic reports for every subject you practice." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-primary-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">{title}</div>
                    <div className="text-slate-500 text-sm leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — rich schema target */}
        <section className="py-20 bg-white">
          <div className="container-xl max-w-3xl">
            <h2 className="text-3xl font-bold text-primary-500 mb-2 text-center">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-center mb-12">Everything you need to know about GetVidyaAI</p>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group border border-slate-200 rounded-xl p-5 cursor-pointer">
                  <summary className="font-semibold text-slate-800 list-none flex justify-between items-center gap-4">
                    {q}
                    <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-xl leading-none">+</span>
                  </summary>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-hero">
          <div className="container-xl max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start with GetVidyaAI — Free</h2>
            <p className="text-white/70 mb-8">Take the 25-question diagnostic test. No credit card. No registration. Know your weak subjects in 20 minutes.</p>
            <Link href="/free-assessment" className="btn-primary px-10 py-4 rounded-2xl inline-flex items-center gap-2 text-base">
              Take Free Diagnostic Test <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
