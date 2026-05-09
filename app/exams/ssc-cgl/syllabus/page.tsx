import { generateSEO, breadcrumbSchema, courseSchema, faqSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, BookOpen, Target } from "lucide-react";

export const metadata = generateSEO({
  title: "SSC CGL 2026 Syllabus — Tier 1 & Tier 2 Complete Topic List",
  description:
    "Complete SSC CGL 2026 syllabus for Tier 1 and Tier 2 with topic-wise breakdown. General Intelligence, General Awareness, Quantitative Aptitude, English. Download free SSC CGL study plan with GetVidyaAI.",
  keywords: [
    "SSC CGL syllabus 2026",
    "SSC CGL Tier 1 syllabus",
    "SSC CGL Tier 2 syllabus",
    "SSC CGL exam pattern 2026",
    "SSC CGL topics list",
    "SSC CGL quantitative aptitude syllabus",
    "SSC CGL English syllabus",
    "SSC CGL general awareness topics",
    "SSC CGL reasoning syllabus",
    "SSC CGL complete syllabus PDF",
  ],
  canonical: "/exams/ssc-cgl/syllabus",
});

const APP_URL = "https://app.getvidya.in";

const TIER1_SECTIONS = [
  {
    name: "General Intelligence & Reasoning",
    questions: 25,
    marks: 50,
    color: "border-blue-400",
    badge: "bg-blue-100 text-blue-700",
    topics: [
      "Analogy (Word, Number, Symbol)",
      "Classification",
      "Series (Number, Letter, Mixed)",
      "Coding-Decoding",
      "Blood Relations",
      "Direction & Distance",
      "Order & Ranking",
      "Venn Diagrams",
      "Syllogism",
      "Statement & Conclusion",
      "Non-Verbal Reasoning (Pattern, Mirror Image)",
      "Paper Folding & Cutting",
      "Missing Number",
      "Matrix & Word Formation",
    ],
  },
  {
    name: "General Awareness",
    questions: 25,
    marks: 50,
    color: "border-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    topics: [
      "Indian History (Ancient, Medieval, Modern)",
      "Indian Polity & Constitution",
      "Indian Geography (Physical, Economic)",
      "Indian Economy",
      "Science (Physics, Chemistry, Biology)",
      "Environment & Ecology",
      "Current Affairs (last 6 months)",
      "Important National & International Events",
      "Awards, Honours & Sports",
      "Books & Authors",
      "Important Days & Dates",
      "Union Budget highlights",
    ],
  },
  {
    name: "Quantitative Aptitude",
    questions: 25,
    marks: 50,
    color: "border-orange-400",
    badge: "bg-orange-100 text-orange-700",
    topics: [
      "Number System & HCF/LCM",
      "Percentage",
      "Ratio & Proportion",
      "Average",
      "Profit & Loss",
      "Simple & Compound Interest",
      "Time & Work",
      "Time, Speed & Distance",
      "Algebra (Basic to Intermediate)",
      "Geometry (Lines, Angles, Triangles, Circles)",
      "Mensuration (2D & 3D)",
      "Trigonometry",
      "Data Interpretation (Tables, Bar, Pie)",
      "Statistics (Mean, Median, Mode)",
    ],
  },
  {
    name: "English Language & Comprehension",
    questions: 25,
    marks: 50,
    color: "border-purple-400",
    badge: "bg-purple-100 text-purple-700",
    topics: [
      "Reading Comprehension (2 passages)",
      "Fill in the Blanks (Grammar-based)",
      "Error Spotting / Error Detection",
      "Phrase Replacement / Sentence Correction",
      "Synonyms & Antonyms",
      "Idioms & Phrases",
      "One-Word Substitution",
      "Spelling Correction",
      "Sentence Rearrangement (Para Jumbles)",
      "Cloze Test",
      "Active-Passive Voice",
      "Direct-Indirect Speech",
    ],
  },
];

const TIER2_SECTIONS = [
  {
    name: "Paper I — Mathematical Abilities",
    questions: 30,
    marks: 90,
    desc: "Advanced Quantitative Aptitude: Number System, Algebra, Geometry, Mensuration, Trigonometry, Statistics & Data Analysis.",
  },
  {
    name: "Paper I — Reasoning & General Intelligence",
    questions: 30,
    marks: 90,
    desc: "Advanced Reasoning: Verbal & Non-Verbal Reasoning, Analytical Intelligence, Decision-Making, and Problem Solving.",
  },
  {
    name: "Paper I — English Language & Comprehension",
    questions: 45,
    marks: 135,
    desc: "Advanced English: Reading Comprehension, Grammar, Vocabulary, Précis Writing concepts, and Sentence Structure.",
  },
  {
    name: "Paper I — General Awareness",
    questions: 25,
    marks: 75,
    desc: "Static GK + Current Affairs at a higher depth than Tier-1. Economy, Polity, Geography, Science, and Current Events.",
  },
  {
    name: "Paper II — Statistics (JSO Posts)",
    questions: 100,
    marks: 200,
    desc: "Collection & Representation of Data, Measures of Central Tendency, Dispersion, Moments, Skewness, Correlation, Regression, Probability, Index Numbers, and Sampling Theory.",
  },
];

const faqs = [
  {
    question: "What is the SSC CGL 2026 Tier-1 exam pattern?",
    answer:
      "SSC CGL Tier-1 2026 consists of 100 questions (25 each from General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Language). The exam is 60 minutes with 200 total marks. Each correct answer carries 2 marks and each wrong answer deducts 0.5 marks (¼ negative marking). The exam is computer-based and conducted in multiple shifts.",
  },
  {
    question: "Which SSC CGL subjects have the highest weightage?",
    answer:
      "In SSC CGL Tier-1, all four sections have equal weightage: 25 questions × 2 marks = 50 marks each. In terms of preparation priority, Quantitative Aptitude and General Awareness typically decide selection because aspirants score the most marks in Reasoning and English. Focus on Percentages, Profit-Loss, Algebra in Quant and Current Affairs in GK.",
  },
  {
    question: "What is the best way to cover the SSC CGL syllabus in 3 months?",
    answer:
      "The most efficient approach is to take a diagnostic test first (available free on GetVidya) to identify your weak subjects. Then dedicate 60% of your study time to your 2 weakest subjects and 40% to the remaining 2. In the last month before the exam, shift to full mock tests. GetVidyaAI automates this scheduling for you with a weekly adaptive study plan.",
  },
  {
    question: "Is the SSC CGL 2026 syllabus different from previous years?",
    answer:
      "The SSC CGL Tier-1 syllabus remains largely unchanged for 2026. The four-section format (GI&R, GK, Quant, English), 100-question structure, and -0.5 negative marking are the same. However, SSC has increased the focus on current affairs from the last 6 months and introduced more data interpretation questions in Quantitative Aptitude. Always refer to the official SSC notification for the latest pattern.",
  },
];

export default function SSCCGLSyllabusPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Exams", url: "/exams" },
    { name: "SSC CGL", url: "/exams/ssc-cgl" },
    { name: "Syllabus", url: "/exams/ssc-cgl/syllabus" },
  ]);
  const course = courseSchema({
    name: "SSC CGL 2026 Complete Preparation — Tier 1 & Tier 2",
    description: "AI-adaptive preparation covering the complete SSC CGL 2026 syllabus for Tier 1 and Tier 2 with 240+ mock tests, 28,000+ subject-wise MCQs, and personalized weekly study plans.",
    url: "/exams/ssc-cgl/syllabus",
    price: "149",
    level: "Beginner to Advanced",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Updated for SSC CGL 2026 Notification
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              SSC CGL 2026 Syllabus —<br className="hidden md:block" />
              <span className="text-blue-400">Complete Tier 1 & Tier 2 Topic List</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">
              Official topic-wise syllabus breakdown for SSC CGL 2026 Tier-1 and Tier-2.
              All four sections covered with subject weightage and GetVidyaAI preparation tips.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-blue-800/40 border border-blue-600/40 rounded-xl p-5 max-w-2xl mb-8 text-left">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-white text-base leading-relaxed">
                SSC CGL 2026 Tier-1 has <strong>100 questions</strong> across 4 sections
                (General Intelligence, GK, Quantitative Aptitude, English) in 60 minutes.
                Total marks: 200. Negative marking: −0.5 per wrong answer.
                Tier-2 Paper I adds Mathematical Abilities, Reasoning, English, and GK
                at an advanced level.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/free-assessment" className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all text-center">
                Start Free Diagnostic →
              </a>
              <a href={APP_URL} className="border border-blue-400 hover:bg-blue-800/40 text-blue-200 font-semibold px-8 py-4 rounded-full text-lg transition-all text-center">
                Practice Mock Tests
              </a>
            </div>
          </div>
        </section>

        {/* ── TIER 1 SYLLABUS ──────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              SSC CGL 2026 Tier-1 Syllabus
            </h2>
            <p className="text-slate-500 mb-10">
              100 questions · 60 minutes · 200 marks · ¼ negative marking (−0.5)
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {TIER1_SECTIONS.map((section) => (
                <div key={section.name} className={`border-2 ${section.color} rounded-2xl p-6 bg-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">{section.name}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${section.badge}`}>
                      {section.questions}Q · {section.marks}M
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {section.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIER 2 SYLLABUS ──────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              SSC CGL 2026 Tier-2 Syllabus Overview
            </h2>
            <p className="text-slate-500 mb-10">
              Tier-2 Paper I is mandatory for all posts. Paper II (Statistics) is for Junior Statistical Officer (JSO) posts.
            </p>
            <div className="space-y-4">
              {TIER2_SECTIONS.map((section) => (
                <div key={section.name} className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{section.name}</h3>
                    <span className="text-blue-600 font-bold text-sm shrink-0 ml-4">
                      {section.questions}Q · {section.marks}M
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    {section.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI STUDY PLAN CTA ────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Overwhelmed by the Syllabus? Let GetVidyaAI Prioritize It
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Take the free 25-question diagnostic test. GetVidyaAI tells you which of the 14+
                topics in each section to focus on first — based on your actual weak areas, not a
                generic study plan.
              </p>
              <ul className="space-y-2 mb-6">
                {["Identifies your 3 highest-priority topics across all sections", "Builds a week-by-week study plan around your exam date", "Adapts every 7 days based on mock test performance"].map((point) => (
                  <li key={point} className="flex items-center gap-2 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <a href="/free-assessment" className="block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all text-center whitespace-nowrap">
                Get My AI Study Plan →
              </a>
              <p className="text-slate-400 text-xs text-center mt-2">Free · No card needed</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              SSC CGL 2026 Syllabus — Common Questions
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

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Practicing the SSC CGL 2026 Syllabus</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            240+ AI mock tests, 28,000+ subject-wise MCQs, and a personalized AI study plan.
            First test free. Full access at ₹149/month.
          </p>
          <a href={APP_URL} className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all">
            Start Free SSC CGL Practice →
          </a>
          <p className="text-blue-200 text-sm mt-4">No credit card needed · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
