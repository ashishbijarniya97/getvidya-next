import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { BookOpen, Clock, Target, CheckCircle2, BarChart2, FileText, Zap } from "lucide-react";

export const metadata = generateSEO({
  title: "UGC NET 2026 Preparation — Free Mock Tests & Practice | GetVidya",
  description:
    "Prepare for UGC NET 2026 with GetVidyaAI. Free full mock tests, subject-wise drills, and AI-powered practice for Teaching Aptitude, Research Aptitude, Reasoning, and more.",
  keywords: [
    "UGC NET 2026",
    "UGC NET mock test",
    "UGC NET preparation",
    "Teaching Aptitude",
    "Research Aptitude",
    "NET exam 2026",
    "UGC NET Paper I",
    "NTA NET 2026",
  ],
  canonical: "https://getvidya.in/ugc-net-2026",
});

const SUBJECTS = [
  { name: "Teaching Aptitude",    icon: "👨‍🏫", weight: "10 Qs", desc: "Classroom management, learner characteristics, teaching methods & evaluation" },
  { name: "Research Aptitude",    icon: "🔬",  weight: "10 Qs", desc: "Research types, steps, ethics, statistical data interpretation" },
  { name: "Reasoning & Aptitude", icon: "🧠",  weight: "10 Qs", desc: "Logical reasoning, data sufficiency, reading comprehension" },
  { name: "General Awareness",    icon: "🌏",  weight: "10 Qs", desc: "Current affairs, higher education, governance, environment" },
  { name: "English Language",     icon: "📖",  weight: "10 Qs", desc: "Comprehension, vocabulary, grammar and verbal ability" },
];

const STATS = [
  { label: "Questions",     value: "5,000+", icon: FileText },
  { label: "Full Mocks",    value: "25+",    icon: BarChart2 },
  { label: "Subject Tests", value: "125+",   icon: Target },
  { label: "Practice Sets", value: "250+",   icon: Zap },
];

const TIMELINE = [
  { event: "Notification Released", date: "March 2026" },
  { event: "Application Window",    date: "April – May 2026" },
  { event: "Admit Card",            date: "June 2026" },
  { event: "Exam Date (expected)",  date: "June – July 2026" },
  { event: "Result Declaration",    date: "August 2026" },
];

const FEATURES = [
  { icon: BarChart2,   title: "25 Full Mock Tests",    desc: "Timed, exam-pattern mocks covering all 5 Paper I units. Instant analysis after each attempt." },
  { icon: Target,      title: "Subject-wise Drills",   desc: "Focused 50-question sets per subject to strengthen weak areas before the exam." },
  { icon: Zap,         title: "AI Practice Mode",      desc: "GetVidyaAI adapts question difficulty based on your performance in real-time." },
  { icon: BookOpen,    title: "Detailed Explanations", desc: "Every question comes with a clear, concise explanation so you learn, not just practise." },
  { icon: Clock,       title: "Timed Simulation",      desc: "Practise under real exam conditions — 60 min for Paper I, timer included." },
  { icon: CheckCircle2,title: "Performance Tracking",  desc: "Track accuracy, speed, and subject scores across every test you attempt." },
];

export default function UGCNETPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-black font-sans">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-200">
            UGC NET 2026 · Paper I
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Crack UGC NET 2026 with<br />
            <span className="text-blue-600">AI-Powered Practice</span>
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto mb-8">
            5,000+ questions, 25 full mock tests, and subject-wise drills — all free. Built for aspiring Assistant Professors and JRF candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://app.getvidya.in"
              className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors text-base"
            >
              Take Free Full Mock Test
            </Link>
            <Link
              href="https://app.getvidya.in"
              className="border border-slate-300 font-semibold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors text-base"
            >
              Practice by Subject
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-slate-50 border-y border-slate-200 py-10">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={22} className="text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-sm text-black/50">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exam pattern */}
        <section className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold mb-2">UGC NET 2026 — Paper I Pattern</h2>
          <p className="text-black/50 mb-8 text-sm">
            Paper I is compulsory for all candidates. 50 questions · 100 marks · 60 minutes.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {SUBJECTS.map((s) => (
              <div
                key={s.name}
                className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{s.name}</h3>
                      <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-full text-black/60">
                        {s.weight}
                      </span>
                    </div>
                    <p className="text-sm text-black/50">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-50 border-y border-slate-200 py-14">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Why GetVidyaAI for UGC NET?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl p-5 border border-slate-200">
                  <Icon size={20} className="text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-black/50">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-3xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold mb-8 text-center">UGC NET 2026 Important Dates</h2>
          <div className="space-y-4">
            {TIMELINE.map(({ event, date }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border border-slate-200 rounded-xl px-5 py-4"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="font-medium flex-1">{event}</p>
                <span className="text-sm text-black/50 font-medium">{date}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-black/40 text-center mt-4">
            * Dates are indicative based on previous year schedule. Check NTA official website for confirmed dates.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-14 text-white text-center px-6">
          <h2 className="text-3xl font-extrabold mb-3">Start Your UGC NET 2026 Prep Today</h2>
          <p className="text-blue-100 mb-7 max-w-xl mx-auto">
            Free mock tests, AI-powered practice, and detailed analytics. No credit card needed.
          </p>
          <Link
            href="https://app.getvidya.in"
            className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-colors text-base"
          >
            Create Free Account
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
}
