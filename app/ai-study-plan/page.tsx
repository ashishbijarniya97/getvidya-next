import { generateSEO, breadcrumbSchema, howToSchema, faqSchema, reviewSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Brain, CheckCircle2, ArrowRight, Clock, TrendingUp, BarChart3, Star, Zap } from "lucide-react";

export const metadata = generateSEO({
  title: "GetVidyaAI Study Plan — Personalized Weekly Exam Prep in 5 Minutes",
  description:
    "GetVidyaAI generates a personalized weekly study plan based on your diagnostic test results. Identifies weak subjects, sets daily MCQ targets, and adapts every 7 days. For UPSC, SSC CGL, Banking, and Railway aspirants. ₹149/month.",
  keywords: [
    "AI study plan for govt exam",
    "personalized study plan SSC CGL",
    "UPSC study plan AI",
    "adaptive study schedule exam prep",
    "GetVidyaAI study plan",
    "how to make study plan for SSC",
    "AI generated exam schedule",
    "weekly study plan for government exam",
    "smart study plan for UPSC aspirants",
  ],
  canonical: "/ai-study-plan",
});

const APP_URL = "https://app.getvidya.in";

const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    name: "Take the 25-Question Diagnostic Assessment",
    desc: "GetVidyaAI maps your strengths and weaknesses across all key subjects in 20 minutes. Free, no payment needed.",
    time: "20 minutes",
    icon: Brain,
  },
  {
    step: "2",
    name: "AI Generates Your Week 1 Study Plan",
    desc: "Based on your diagnostic results, GetVidyaAI assigns daily MCQ targets per subject, schedules mock tests, and flags topics to focus on first.",
    time: "Instant",
    icon: Zap,
  },
  {
    step: "3",
    name: "Practice Daily — AI Tracks Your Progress",
    desc: "Every session you complete updates your accuracy per topic. The AI identifies when you've improved and when you're falling behind.",
    time: "30–60 min/day",
    icon: BarChart3,
  },
  {
    step: "4",
    name: "Plan Updates Every 7 Days",
    desc: "GetVidyaAI rebuilds your weekly schedule based on last week's performance — more time on weak subjects, harder questions once you improve.",
    time: "Weekly",
    icon: TrendingUp,
  },
];

const faqs = [
  {
    question: "How does GetVidyaAI create a personalized study plan?",
    answer:
      "GetVidyaAI starts with a 25-question diagnostic assessment that covers all key subjects for your target exam. It measures your accuracy per topic and calculates a 'gap score' — the distance between your current level and the expected level for exam success. Using this gap score, the AI assigns more daily practice time to your weakest subjects and schedules subject-wise mock tests in areas needing improvement. The plan is rebuilt every 7 days as your performance data updates.",
  },
  {
    question: "How often does the AI study plan update?",
    answer:
      "GetVidyaAI updates your study plan every 7 days. After each week of practice, it analyzes your session data — accuracy per topic, questions attempted, mock test scores — and generates a new plan for the coming week. If you've improved significantly in a subject, it reduces time there and reallocates to remaining weak areas. If a subject remains stuck below 60% accuracy, it increases the daily question count and introduces harder difficulty questions.",
  },
  {
    question: "Can GetVidyaAI replace a manual study timetable?",
    answer:
      "Yes, for most aspirants. A manual timetable assigns fixed hours per subject based on the syllabus — it cannot adapt when you improve faster in one area, or when you fall behind in another. GetVidyaAI does both: it sets a daily schedule and adjusts it weekly based on real performance data. The result is a study plan that's always optimized for your current state, not a static template from a coaching centre.",
  },
  {
    question: "What exams does GetVidyaAI's study plan cover?",
    answer:
      "GetVidyaAI generates personalized study plans for SSC CGL (Tier-1 and Tier-2), UPSC CSE Prelims, SBI PO and Clerk, IBPS PO and Clerk, Railway NTPC, State PSCs (Rajasthan, UP, Maharashtra, Karnataka, Telangana), and NDA/CDS. Each plan is calibrated to the specific exam's syllabus, section weightage, and exam date timeline.",
  },
  {
    question: "How is GetVidyaAI's study plan different from Testbook or Unacademy?",
    answer:
      "Testbook and Unacademy offer fixed courses and test series but do not generate personalized week-by-week study plans based on your individual accuracy data. GetVidya's differentiator is that every practice session feeds back into the AI — so your Week 3 plan is specifically shaped by your Week 2 performance, not a generic curriculum. This adaptive loop is what reduces preparation time by an estimated 30–40% compared to non-adaptive platforms.",
  },
];

export default function AIStudyPlanPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "AI Study Plan", url: "/ai-study-plan" },
  ]);
  const howTo = howToSchema({
    name: "How to Get a Personalized AI Study Plan for Government Exam Prep",
    description:
      "GetVidyaAI generates a personalized weekly study plan for SSC CGL, UPSC, Banking and Railway exams based on your diagnostic test results. The plan adapts every 7 days based on your performance.",
    steps: HOW_IT_WORKS_STEPS.map((s) => ({ name: s.name, text: s.desc })),
  });
  const reviews = reviewSchema({
    itemName: "GetVidyaAI Personalized Study Plan",
    ratingValue: "4.8",
    reviewCount: "1920",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="inline-block bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6">
              Personalised for Your Exam · Updates Every 7 Days
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              How Does GetVidyaAI Build a<br className="hidden md:block" />
              <span className="text-emerald-400">Personalized Study Plan in 5 Minutes?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              GetVidyaAI analyzes your diagnostic results across all exam subjects and generates a
              week-by-week study schedule calibrated to your exact weak topics — not a generic template.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mx-auto mb-8 text-left">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                GetVidyaAI creates a personalized study plan in under 5 minutes by analyzing a
                25-question diagnostic assessment. It identifies your weakest subjects, assigns daily
                MCQ targets per topic, and rebuilds the plan every 7 days based on your performance.
                Available for SSC CGL, UPSC, Banking, and Railway exams at ₹149/month.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/free-assessment" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all">
                Get My AI Study Plan Free →
              </a>
              <a href={APP_URL} className="border border-slate-500 hover:border-slate-400 text-slate-200 font-semibold px-8 py-4 rounded-full text-lg transition-all">
                Open in App
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────────── */}
        <section className="py-12 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "7 days", label: "Plan refresh cycle", sub: "Auto-adapts to your progress" },
              { value: "25 Q", label: "Diagnostic questions", sub: "Maps all key subjects" },
              { value: "40%", label: "Less prep time", sub: "vs generic study plans" },
              { value: "6 exams", label: "Plans available for", sub: "SSC, UPSC, Banking & more" },
            ].map(({ value, label, sub }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-emerald-600 mb-1">{value}</p>
                <p className="text-slate-700 font-semibold text-sm">{label}</p>
                <p className="text-slate-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              How GetVidyaAI Builds Your Study Plan
            </h2>
            <p className="text-slate-500 text-center mb-12">Four steps, starting with a free diagnostic</p>
            <div className="space-y-6">
              {HOW_IT_WORKS_STEPS.map(({ step, name, desc, time, icon: Icon }) => (
                <div key={step} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-5 items-start">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-800 text-lg">Step {step}: {name}</h3>
                      <span className="text-emerald-600 text-sm font-medium flex items-center gap-1 shrink-0 ml-4">
                        <Clock className="w-3.5 h-3.5" /> {time}
                      </span>
                    </div>
                    <p className="text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INSIDE THE PLAN ───────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              What Your AI Study Plan Includes
            </h2>
            <p className="text-slate-500 text-center mb-10">Built around your exam, your gaps, your timeline</p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Daily MCQ Targets per Subject", desc: "Exact number of questions to attempt per subject each day, weighted by your weak areas." },
                { title: "Subject Priority Ranking", desc: "Subjects ranked from most-to-least urgent based on your diagnostic accuracy and exam weightage." },
                { title: "Weekly Mock Test Schedule", desc: "Full mock tests scheduled at the right interval so you track progress without burning out." },
                { title: "Topic-Level Focus Areas", desc: "Within each subject, the AI pinpoints exact chapters to prioritize — e.g., 'Percentages' within Quantitative Aptitude." },
                { title: "Adaptive Difficulty Progression", desc: "Questions get harder as you improve. You're never stuck on easy material you've already mastered." },
                { title: "7-Day Rebuild Cycle", desc: "Every Sunday, GetVidyaAI regenerates next week's plan based on your last 7 days of performance data." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 border border-slate-200 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-emerald-950 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-emerald-300 text-sm">4.8 / 5 from 1,920 aspirants</span>
            </div>
            <blockquote className="text-xl italic text-emerald-100 mb-4 leading-relaxed">
              &quot;I used to waste 2 hours daily on subjects I was already good at. GetVidyaAI&apos;s study plan
              told me to spend 80% of my time on Quantitative Aptitude and Current Affairs — the two
              subjects costing me 18 marks in mock tests. My score went from 112 to 143 in 6 weeks.&quot;
            </blockquote>
            <p className="text-emerald-300 font-semibold">Aditya Sharma</p>
            <p className="text-emerald-400 text-sm">SSC CGL 2025 — Cleared Tier-1 · Jaipur</p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Common Questions About the AI Study Plan
            </h2>
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
          <h2 className="text-3xl font-bold mb-4">Get Your Personalized AI Study Plan — Free</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Take the 25-question diagnostic. GetVidyaAI builds your Week 1 plan instantly.
            No credit card, no account needed for the diagnostic.
          </p>
          <a href="/free-assessment" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all">
            Start Free Diagnostic →
          </a>
          <p className="text-emerald-200 text-sm mt-4">Full plan in the app · Vidya Pass ₹149/month · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
