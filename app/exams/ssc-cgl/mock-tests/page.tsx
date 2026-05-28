import { generateSEO, breadcrumbSchema, courseSchema, faqSchema, reviewSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MagneticButton from "@/components/ui/MagneticButton";
import { CheckCircle2, Zap, Brain, Clock, BarChart3, ArrowRight, Star } from "lucide-react";

export const metadata = generateSEO({
  title: "SSC CGL AI Mock Tests 2026 — Tier 1 & Tier 2 Full Tests",
  description:
    "240+ AI-powered SSC CGL mock tests for Tier 1 & Tier 2 2026. GetVidyaAI adapts difficulty, tracks accuracy per subject, and builds your study plan. Free diagnostic included.",
  keywords: [
    "SSC CGL mock test 2026",
    "SSC CGL Tier 1 mock test",
    "SSC CGL Tier 2 full test",
    "SSC CGL practice test online",
    "AI SSC CGL preparation",
    "SSC CGL test series 2026",
    "SSC CGL previous year paper",
    "SSC CGL study plan",
    "SSC CGL quantitative aptitude mock test",
    "SSC CGL reasoning practice",
  ],
  canonical: "https://getvidya.in/exams/ssc-cgl/mock-tests",
});

const APP_URL = "https://app.getvidya.in";

const highlights = [
  { icon: Zap,        label: "240+ Full Mock Tests",       sub: "Tier 1 & Tier 2 combined" },
  { icon: Brain,      label: "AI Adaptive Difficulty",     sub: "Adjusts as you improve" },
  { icon: Clock,      label: "Timed Real-Exam Simulation", sub: "60 min Tier-1, 2 hrs Tier-2" },
  { icon: BarChart3,  label: "Subject-wise Analytics",     sub: "Spot weak areas instantly" },
];

const testTypes = [
  {
    name: "Full Tier-1 Mock Test",
    desc: "100 questions · 60 minutes · 200 marks · All 4 sections",
    badge: "Most Popular",
    color: "bg-blue-600",
  },
  {
    name: "Subject-wise Practice",
    desc: "20 questions per session · GI&R, GK, Quant, English",
    badge: "Recommended for Beginners",
    color: "bg-emerald-600",
  },
  {
    name: "Speed Drill (Quick Test)",
    desc: "10 questions · 10 minutes · Mixed difficulty",
    badge: "Daily Practice",
    color: "bg-orange-500",
  },
  {
    name: "PYQ Paper Replay",
    desc: "Authentic 2019–2024 papers in exam interface",
    badge: "High Accuracy",
    color: "bg-purple-600",
  },
];

const sectionWeightage = [
  { section: "General Intelligence & Reasoning", questions: 25, marks: 50, tip: "Heavy on series, coding-decoding, and analogies. GetVidyaAI auto-increases difficulty once you hit 70% accuracy." },
  { section: "General Awareness",               questions: 25, marks: 50, tip: "Current affairs + static GK. GetVidya's daily MCQs target the most-tested topics from the last 5 years." },
  { section: "Quantitative Aptitude",           questions: 25, marks: 50, tip: "Focus: Percentages, Profit-Loss, Algebra, Geometry. Our AI flags which chapters cost you the most marks." },
  { section: "English Language",                questions: 25, marks: 50, tip: "Reading Comprehension + Error Spotting dominate. GetVidyaAI adapts vocab difficulty based on your error patterns." },
];

const faqs = [
  {
    question: "How does GetVidya's AI adapt to my SSC CGL preparation level?",
    answer:
      "GetVidyaAI tracks your accuracy per subject across practice sessions. Once you score above 70% in a section for 3 consecutive sessions, the system automatically promotes you to a harder difficulty tier. This means you are never stuck practicing easy questions you have already mastered, and never overwhelmed by advanced content before you are ready.",
  },
  {
    question: "How many SSC CGL mock tests are available on GetVidya?",
    answer:
      "GetVidya provides 240+ SSC CGL mock tests including Tier-1 full mocks (100 questions, 60 minutes), Tier-2 sectional tests, and 20-question subject-wise sessions. New AI-generated tests are added daily to ensure you never repeat the same question set twice.",
  },
  {
    question: "Is the GetVidya mock test pattern exactly like the real SSC CGL 2026 exam?",
    answer:
      "Yes. GetVidya's SSC CGL Tier-1 mock tests strictly follow the 2026 official pattern: 100 questions, 60 minutes, 200 marks, with ¼ negative marking (−0.5 per wrong answer). The 25-25-25-25 section split across General Intelligence, General Awareness, Quantitative Aptitude, and English is enforced in every test.",
  },
  {
    question: "What is the difference between GetVidya and traditional SSC coaching?",
    answer:
      "Traditional coaching charges ₹20,000–₹40,000 annually and follows a fixed syllabus regardless of your personal weak areas. GetVidya starts at ₹149/month and uses AI to identify your specific weak topics on day one via a 25-question diagnostic test. Every practice session is then personalized to fix those exact gaps — no wasted study time.",
  },
  {
    question: "Can I take SSC CGL mock tests for free on GetVidya?",
    answer:
      "Yes. GetVidya provides a free 25-question Diagnostic Assessment and 5 free daily practice questions without any payment. The Vidya Pass at ₹149/month unlocks all 240+ full mock tests, unlimited AI practice, and the personalized study plan.",
  },
];

export default function SSCMockTestsPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Exams", url: "/exams" },
    { name: "SSC CGL", url: "/exams/ssc-cgl" },
    { name: "Mock Tests", url: "/exams/ssc-cgl/mock-tests" },
  ]);
  const course = courseSchema({
    name: "SSC CGL Tier-1 & Tier-2 AI Mock Test Series 2026",
    description: "240+ adaptive mock tests for SSC CGL Tier 1 and Tier 2, powered by GetVidyaAI. Personalized difficulty, subject analytics, and weekly study plans.",
    url: "/exams/ssc-cgl/mock-tests",
    price: "149",
    duration: "P3M",
    level: "Beginner to Advanced",
  });
  const reviews = reviewSchema({ itemName: "GetVidya SSC CGL Mock Test Series", ratingValue: "4.8", reviewCount: "1840" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white pt-24 pb-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* GEO Citation Anchor — direct answer snippet for AI search engines */}
            <div className="inline-block bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-200 text-sm font-medium mb-6">
              SSC CGL 2026 · Official Pattern · 100Q / 60 min / 200 marks
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              How Do GetVidya&apos;s SSC CGL Mock Tests<br className="hidden md:block" />
              <span className="text-blue-400"> Adapt to Your Weak Subjects?</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
              240+ AI-powered full mock tests that get harder as you improve. GetVidyaAI tracks your accuracy
              per section and auto-adjusts difficulty — so every test is the right challenge for your level.
            </p>
            {/* ── Direct Answer Block (GEO Citation Anchor) ── */}
            <div className="bg-blue-800/40 border border-blue-600/40 rounded-xl p-5 max-w-2xl mx-auto mb-8 text-left">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-white text-base leading-relaxed">
                GetVidya offers <strong>240+ SSC CGL mock tests</strong> matching the official 2026 Tier-1 pattern
                (100 questions · 60 minutes · 200 marks · ¼ negative marking). The AI engine promotes you to a
                harder difficulty tier after 3 consecutive sessions above 70% accuracy in any subject.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={APP_URL} className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all">
                Start Free Mock Test →
              </a>
              <a href="/free-assessment" className="border border-blue-400 hover:bg-blue-800/40 text-blue-200 font-semibold px-8 py-4 rounded-full text-lg transition-all">
                Take Free Diagnostic
              </a>
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHTS ───────────────────────────────────────────────────── */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-blue-600 w-6 h-6" />
                </div>
                <p className="font-bold text-slate-800">{label}</p>
                <p className="text-slate-500 text-sm">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEST TYPES ───────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              Which SSC CGL Test Format Is Right for You?
            </h2>
            <p className="text-slate-500 text-center mb-10">All formats follow official 2026 exam patterns</p>
            <div className="grid md:grid-cols-2 gap-6">
              {testTypes.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className={`inline-block ${t.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>{t.badge}</div>
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{t.name}</h3>
                  <p className="text-slate-500 text-sm">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION WEIGHTAGE ────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              What Is the Official SSC CGL 2026 Exam Pattern?
            </h2>
            <p className="text-slate-500 mb-10">Every GetVidya mock test enforces this exact structure</p>
            <div className="space-y-4">
              {sectionWeightage.map((s) => (
                <div key={s.section} className="border border-slate-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{s.section}</h3>
                    <span className="text-blue-600 font-bold text-sm">{s.questions}Q · {s.marks} marks</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }} />
                  </div>
                  <p className="text-slate-500 text-sm flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    {s.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-blue-950 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-blue-200 text-sm">4.8 / 5 from 1,840 SSC aspirants</span>
            </div>
            <blockquote className="text-xl italic text-blue-100 mb-4">
              &quot;GetVidyaAI told me I was losing 12 marks in Reasoning alone due to my coding-decoding accuracy of 44%.
              Three weeks of targeted practice brought it to 78%. That&apos;s what no coaching ever told me.&quot;
            </blockquote>
            <p className="text-blue-300 text-sm">— Priya Sharma, SSC CGL 2024 Selected (Audit Officer)</p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About SSC CGL Mock Tests
            </h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <details key={f.question} className="border border-slate-200 rounded-xl p-5 group">
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
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your SSC CGL 2026 Preparation?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join 2,00,000+ aspirants. First mock test is free. Vidya Pass unlocks everything for ₹149/month.
          </p>
          <a href={APP_URL} className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all">
            Start Free SSC CGL Mock Test →
          </a>
          <p className="text-blue-200 text-sm mt-4">No credit card needed · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
