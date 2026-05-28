import { generateSEO, breadcrumbSchema, howToSchema, faqSchema, courseSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, Brain, Clock, Target, Star } from "lucide-react";

export const metadata = generateSEO({
  title: "UPSC CSE Prelims Strategy 2026 — AI-Personalized Preparation Guide",
  description:
    "UPSC CSE Prelims 2026 strategy with subject-wise approach, GS Paper 1 topics, and CSAT tips. GetVidyaAI identifies your weak areas and builds a daily study plan. ₹149/month.",
  keywords: [
    "UPSC CSE prelims strategy 2026",
    "UPSC prelims preparation plan",
    "UPSC GS Paper 1 topics",
    "CSAT preparation tips",
    "UPSC prelims syllabus 2026",
    "best strategy for UPSC prelims",
    "UPSC prelims cutoff",
    "AI UPSC preparation",
    "how to crack UPSC prelims",
    "UPSC prelims 200 marks plan",
  ],
  canonical: "https://getvidya.in/exams/upsc/prelims-strategy",
});

const APP_URL = "https://app.getvidya.in";

const GS1_TOPICS = [
  { topic: "History of India", weightage: "12–18 Q", focus: "Modern India dominates. Freedom Movement, 1857 Revolt, Social Reform movements." },
  { topic: "Indian National Movement", weightage: "5–8 Q", focus: "Gandhian movements, INC evolution, Constitutional history." },
  { topic: "Indian & World Geography", weightage: "12–17 Q", focus: "Physical Geography, Monsoon, Rivers, Economic Geography, World Geography basics." },
  { topic: "Indian Polity & Governance", weightage: "18–22 Q", focus: "Highest weightage subject. Constitution, Fundamental Rights, Parliament, Amendments." },
  { topic: "Economic & Social Development", weightage: "10–15 Q", focus: "Planning, Poverty, National Income, Social Sector Schemes, Union Budget." },
  { topic: "Environment & Ecology", weightage: "12–18 Q", focus: "Rapidly growing. Biodiversity, Climate Change, Protected Areas, International Conventions." },
  { topic: "Science & Technology", weightage: "8–12 Q", focus: "Space, Defence, Biotech, Nuclear, Current S&T news. Mostly current-affairs-linked." },
  { topic: "Current Affairs", weightage: "20–28 Q", focus: "Embedded across all subjects. Last 12 months of national/international news." },
];

const CSAT_TOPICS = [
  "Reading Comprehension (2–3 passages, 20–25 Q)",
  "Logical Reasoning & Analytical Ability",
  "Decision Making (unique to UPSC)",
  "Data Interpretation (Table, Graph, Chart)",
  "Basic Numeracy (up to Class X level Math)",
  "General Mental Ability",
];

const STRATEGY_STEPS = [
  {
    name: "Take the Diagnostic Assessment (Week 1)",
    text: "Before building a strategy, know your baseline. GetVidya's 25-question diagnostic maps your accuracy across Polity, History, Geography, Economy, Environment, and S&T — the 6 core GS1 domains. This prevents wasting months on subjects you are already strong in.",
  },
  {
    name: "Build Your Subject Priority List (Week 1)",
    text: "Based on your diagnostic results, rank GS1 subjects from weakest to strongest. Polity and Environment have the highest question count in recent UPSC prelims — if you are weak in either, they must be Priority 1. Allocate daily study hours in a 60/30/10 split (weak/medium/strong subjects).",
  },
  {
    name: "Cover NCERT Base Material (Months 1–2)",
    text: "UPSC questions derive heavily from NCERT concepts. Read History (Class 8–12 Modern India), Geography (Class 6–12), Polity (Laxmikant aligned with NCERTs), and Economy (Class 11–12 + NCERT Macro). Do NOT skip NCERTs for any subject.",
  },
  {
    name: "Daily Current Affairs Practice (Ongoing)",
    text: "UPSC embeds current affairs in 25–30% of GS1 questions. Read The Hindu or Indian Express daily. GetVidyaAI's daily MCQ sessions include current-affairs-linked questions matched to your weak subject areas.",
  },
  {
    name: "Subject-Wise Mock Tests (Months 2–4)",
    text: "After NCERTs, start subject-wise mock tests on GetVidya. 20 questions per session, 30 minutes. Track accuracy per topic. The AI identifies specific chapters costing you marks — e.g., not 'Polity is weak' but 'Fundamental Duties and Directive Principles specifically'.",
  },
  {
    name: "Full GS Paper 1 Mock Tests (Month 5+)",
    text: "Take full 100-question GS1 mock tests in 2-hour timed mode. Analyze accuracy per section after each test. GetVidyaAI rebuilds your weekly study plan based on mock test performance so you always focus on the highest-ROI areas.",
  },
];

const faqs = [
  {
    question: "What is the UPSC CSE Prelims 2026 exam pattern?",
    answer:
      "UPSC CSE Prelims consists of two papers: GS Paper 1 (100 questions, 200 marks, 2 hours) and GS Paper 2 CSAT (80 questions, 200 marks, 2 hours). CSAT is qualifying — you need 33% (66 marks) to avoid disqualification. Only GS Paper 1 marks count toward merit. Negative marking: −0.66 marks per wrong answer for GS1 (−1/3 of 2 marks), −0.83 for CSAT (−1/3 of 2.5 marks).",
  },
  {
    question: "How many months of preparation are needed for UPSC Prelims?",
    answer:
      "For a first-time aspirant with no prior preparation, 10–12 months is a realistic target for UPSC CSE Prelims. For someone who has covered NCERTs and basics, 6–8 months of focused preparation is feasible. The key variable is your starting baseline — take the GetVidya diagnostic test to know where you stand before deciding on a timeline.",
  },
  {
    question: "Which subjects are most important for UPSC Prelims GS Paper 1?",
    answer:
      "Based on the last 5 UPSC Prelims papers, Polity (18–22 questions), Environment & Ecology (12–18 questions), and Current Affairs-linked questions (20–28 questions embedded across subjects) have the highest combined weightage. History and Geography each contribute 12–18 questions. Economy and S&T have lower direct weightage but appear heavily in current-affairs context.",
  },
  {
    question: "How does GetVidyaAI help with UPSC Prelims preparation?",
    answer:
      "GetVidyaAI starts with a diagnostic test that maps your accuracy across the 6 core GS1 domains. It then builds a weekly study plan prioritizing your weakest subjects. The AI's adaptive difficulty system starts with foundational questions (NCERT-level) and progresses to application-level questions as your accuracy improves. GetVidya also includes 1,200+ full UPSC mock tests and 40,000+ GS1 MCQs covering all topics and recent PYQs (2014–2025).",
  },
  {
    question: "Should I focus on CSAT for UPSC Prelims?",
    answer:
      "CSAT needs only 33% (66/200) to qualify — most aspirants with basic math and reading comprehension clear it comfortably. Spend no more than 15–20% of your total preparation time on CSAT unless you are consistently scoring below 70 in CSAT mock tests. Focus the majority of effort on GS Paper 1 where the merit marks are determined.",
  },
];

export default function UPSCPrelimsStrategyPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Exams", url: "/exams" },
    { name: "UPSC", url: "/exams/upsc" },
    { name: "Prelims Strategy", url: "/exams/upsc/prelims-strategy" },
  ]);
  const howTo = howToSchema({
    name: "How to Crack UPSC CSE Prelims 2026 — Step-by-Step Strategy",
    description:
      "A complete UPSC CSE Prelims 2026 preparation strategy covering diagnostic assessment, subject prioritization, NCERT coverage, current affairs, and AI-powered mock test practice with GetVidyaAI.",
    steps: STRATEGY_STEPS,
  });
  const course = courseSchema({
    name: "UPSC CSE Prelims AI Preparation 2026",
    description: "AI-adaptive UPSC Prelims preparation covering all GS Paper 1 and CSAT topics with 300+ mock tests, 40,000+ MCQs, and a personalized weekly study plan.",
    url: "/exams/upsc/prelims-strategy",
    price: "149",
    level: "Beginner to Advanced",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-6">
              UPSC CSE 2026 · GS Paper 1 + CSAT · AI-Personalized
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              UPSC CSE Prelims 2026 Strategy —<br className="hidden md:block" />
              <span className="text-amber-400">What Should You Study First?</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-6">
              A data-driven preparation strategy for UPSC CSE Prelims 2026 based on the last 5 years
              of question trends. GetVidyaAI identifies your weak GS1 subjects and builds your study plan.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mb-8 text-left">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                For UPSC CSE Prelims 2026, prioritize <strong>Polity (18–22 Q)</strong>,{" "}
                <strong>Environment (12–18 Q)</strong>, and <strong>Current Affairs-linked questions (20–28 Q)</strong>.
                Cover NCERTs for all subjects, then practice subject-wise mock tests before moving to full GS1 papers.
                CSAT needs only 33% — do not over-invest in it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/free-assessment" className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all text-center">
                Get My UPSC Study Plan →
              </a>
              <a href={APP_URL} className="border border-slate-500 hover:border-slate-400 text-slate-200 font-semibold px-8 py-4 rounded-full text-lg transition-all text-center">
                Practice UPSC MCQs
              </a>
            </div>
          </div>
        </section>

        {/* ── GS PAPER 1 WEIGHTAGE ─────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              UPSC Prelims GS Paper 1 — Subject Weightage (2021–2025 Analysis)
            </h2>
            <p className="text-slate-500 mb-10">
              100 questions · 200 marks · 2 hours · −0.66 negative marking per wrong answer
            </p>
            <div className="space-y-4">
              {GS1_TOPICS.map((row) => (
                <div key={row.topic} className="border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{row.topic}</h3>
                    <span className="text-amber-600 font-bold text-sm shrink-0 ml-4">{row.weightage}</span>
                  </div>
                  <p className="text-slate-500 text-sm flex items-start gap-2">
                    <Target className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    {row.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CSAT SECTION ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              CSAT (GS Paper 2) — Topics & Strategy
            </h2>
            <p className="text-slate-500 mb-8">
              80 questions · 200 marks · 2 hours · Qualifying only (need ≥66 marks / 33%)
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <p className="text-amber-800 font-semibold mb-2">CSAT Strategy Note</p>
              <p className="text-amber-700 leading-relaxed">
                CSAT is qualifying — only 33% is required. Most aspirants with Class XII education
                clear it without specific preparation. Allocate no more than 15–20% of total study time
                to CSAT unless you are scoring below 70/200 in CSAT mock tests.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {CSAT_TOPICS.map((topic) => (
                <div key={topic} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STRATEGY STEPS ───────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              6-Step UPSC Prelims 2026 Preparation Strategy
            </h2>
            <p className="text-slate-500 mb-10">From diagnostic to cleared — a data-backed approach</p>
            <div className="space-y-5">
              {STRATEGY_STEPS.map((step, i) => (
                <div key={step.name} className="flex gap-5 items-start">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="border border-slate-200 rounded-xl p-5 flex-1">
                    <h3 className="font-bold text-slate-800 mb-2">{step.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-amber-950 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-amber-300 text-sm">4.7 / 5 from UPSC aspirants</span>
            </div>
            <blockquote className="text-xl italic text-amber-100 mb-4 leading-relaxed">
              &quot;GetVidyaAI showed me I was spending 3 hours daily on History when my real gap was
              Environment — a subject I had completely ignored. After 4 weeks of targeted practice,
              my Environment accuracy went from 42% to 71%. That shift made the difference
              in my Prelims cutoff.&quot;
            </blockquote>
            <p className="text-amber-300 font-semibold">Meera Nair</p>
            <p className="text-amber-400 text-sm">UPSC CSE Prelims 2025 Cleared · Pune</p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              UPSC CSE Prelims 2026 — Strategy FAQs
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
        <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white text-center">
          <Brain className="w-10 h-10 mx-auto mb-4 text-amber-200" />
          <h2 className="text-3xl font-bold mb-4">Know Exactly Where to Focus for UPSC Prelims</h2>
          <p className="text-amber-100 mb-8 max-w-lg mx-auto">
            Take the free diagnostic test. GetVidyaAI identifies your weak GS1 subjects and
            builds a personalized weekly preparation plan around your exam date.
          </p>
          <a href="/free-assessment" className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all">
            Start Free UPSC Diagnostic →
          </a>
          <p className="text-amber-200 text-sm mt-4">Vidya Pass · ₹149/month · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
