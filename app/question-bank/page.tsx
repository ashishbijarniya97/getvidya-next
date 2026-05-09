import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Free MCQ Question Bank — SSC CGL, IB ACIO, RJS | GetVidya",
  description:
    "Practice 4,000+ free MCQs for SSC CGL, IB ACIO, Rajasthan Judiciary (RJS) and more. Questions across Maths, Reasoning, English, GK and Law — curated by exam toppers.",
  openGraph: {
    title: "India's Largest Free MCQ Bank | GetVidya",
    description: "Practice 4,000+ free MCQs for SSC CGL, IB ACIO, RJS and more.",
    url: "https://getvidya.in/question-bank",
  },
};

// Fetch stats at request time — fresh on every visit (no cache)
export const dynamic = "force-dynamic";

interface CategoryStat {
  name: string;
  icon: string;
  slug: string;
  count: number;
}

interface SubjectStat {
  name: string;
  count: number;
}

const CATEGORIES: { name: string; icon: string; slug: string }[] = [
  { name: "SSC CGL",  icon: "📋", slug: "SSC CGL"  },
  { name: "IB ACIO",  icon: "🏛️", slug: "IB ACIO"  },
  { name: "RJS",      icon: "⚖️", slug: "RJS"       },
  { name: "Mixed",    icon: "📚", slug: "Mixed"     },
];

const SUBJECTS: string[] = ["Math", "Reasoning", "English", "GK", "Law"];

async function fetchStats() {
  const supabase = createServiceClient();

  // Total count
  const { count: total } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  // Per-category counts (4 queries)
  const categoryStats: CategoryStat[] = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const { count } = await supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true)
        .eq("category", cat.slug);
      return { ...cat, count: count ?? 0 };
    })
  );

  // Per-subject counts (5 queries)
  const subjectStats: SubjectStat[] = await Promise.all(
    SUBJECTS.map(async (subject) => {
      const { count } = await supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true)
        .eq("subject", subject);
      return { name: subject, count: count ?? 0 };
    })
  );

  return { total: total ?? 0, categoryStats, subjectStats };
}

export default async function QuestionBankPage() {
  const { total, categoryStats, subjectStats } = await fetchStats();

  const totalFormatted = total.toLocaleString("en-IN");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-gradient-hero pt-28 pb-20 px-4 text-white relative overflow-hidden">
          {/* decorative orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container-xl relative z-10 text-center">
            <span className="inline-flex items-center gap-2 bg-teal/20 text-teal-light border border-teal/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Free · No Login · No Limits
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              India&apos;s Largest{" "}
              <span className="text-accent">Free MCQ Bank</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Sharpen your exam skills with{" "}
              <span className="text-accent font-semibold">{totalFormatted}+ Questions</span>{" "}
              across SSC CGL, IB ACIO, RJS and more — completely free, no sign-up needed.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/question-bank/practice"
                className="btn-primary text-base px-8 py-4"
              >
                Start Practicing Now →
              </Link>
              <Link
                href="#categories"
                className="btn-secondary text-base px-8 py-4"
              >
                Browse by Exam
              </Link>
            </div>

            {/* Quick stat chips */}
            <div className="flex flex-wrap gap-3 justify-center mt-10">
              {[
                { label: `${totalFormatted}+ Questions`, color: "bg-teal/20 text-teal-light border-teal/30" },
                { label: "4 Exam Categories",            color: "bg-accent/20 text-accent border-accent/30" },
                { label: "5 Subjects Covered",           color: "bg-white/10 text-white/80 border-white/20" },
                { label: "With Explanations",            color: "bg-white/10 text-white/80 border-white/20" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full border ${chip.color}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Category Cards ───────────────────────────────── */}
        <section id="categories" className="py-16 px-4 bg-slate-50">
          <div className="container-xl">
            <div className="text-center mb-10">
              <h2 className="section-heading mb-3">Browse by Exam</h2>
              <p className="section-subheading mx-auto">
                Choose your target exam and practice targeted MCQs curated by subject experts.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {categoryStats.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/question-bank/practice?category=${encodeURIComponent(cat.slug)}`}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-primary-300 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col items-center text-center"
                >
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 block">
                    {cat.icon}
                  </span>
                  <h3 className="text-lg font-bold text-primary-500 mb-1">{cat.name}</h3>
                  <p className="text-2xl font-bold text-teal mb-1">
                    {cat.count.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">Questions</p>
                  <span className="mt-4 text-xs font-semibold text-primary-500 bg-mint px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Practice Now →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Subject Pills ─────────────────────────────────── */}
        <section className="py-14 px-4 bg-white">
          <div className="container-xl">
            <div className="text-center mb-10">
              <h2 className="section-heading mb-3">Practice by Subject</h2>
              <p className="section-subheading mx-auto">
                Target your weak areas with subject-specific question sets.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {subjectStats.map((sub) => {
                const palette: Record<string, string> = {
                  Math:      "bg-blue-50  border-blue-200  text-blue-700  hover:bg-blue-100",
                  Reasoning: "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100",
                  English:   "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
                  GK:        "bg-amber-50  border-amber-200  text-amber-700  hover:bg-amber-100",
                  Law:       "bg-rose-50   border-rose-200   text-rose-700   hover:bg-rose-100",
                };
                const cls = palette[sub.name] ?? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                return (
                  <Link
                    key={sub.name}
                    href={`/question-bank/practice?subject=${encodeURIComponent(sub.name)}`}
                    className={`flex flex-col items-center gap-1 border rounded-2xl px-8 py-5 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md ${cls}`}
                  >
                    <span className="text-xl font-bold">{sub.count.toLocaleString("en-IN")}</span>
                    <span className="text-sm">{sub.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Start Practice CTA ───────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container-xl">
            <div className="bg-gradient-primary rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Start Practicing?
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Choose your exam category and get 10 random questions instantly. Track your accuracy and improve with detailed explanations.
                </p>

                {/* Category quick-links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/question-bank/practice?category=${encodeURIComponent(cat.slug)}`}
                      className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-4 px-3 transition-all duration-200 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="text-sm font-semibold text-white/90">{cat.name}</span>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/question-bank/practice"
                  className="btn-primary text-base px-10 py-4 inline-flex"
                >
                  Start Practice — All Categories →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEO Content Block ─────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-bold prose-headings:text-primary-500 prose-a:text-teal prose-a:no-underline hover:prose-a:underline">
              <h2>Free MCQ Question Bank for Government Exams</h2>
              <p>
                GetVidya&apos;s free MCQ question bank is one of the largest curated collections of multiple-choice questions for competitive government exams in India. With over {totalFormatted} questions spanning SSC CGL, IB ACIO, Rajasthan Judiciary Services (RJS), and mixed practice sets, students can practice in subjects including Mathematics (Quantitative Aptitude), Reasoning (Verbal &amp; Non-Verbal), English Language &amp; Comprehension, General Knowledge &amp; Current Affairs, and Law.
              </p>
              <h3>Why Practice MCQs on GetVidya?</h3>
              <p>
                Every question in our bank comes with a detailed explanation, making it easier to understand concepts — not just memorise answers. Our platform is completely free to use, requires no login, and is updated regularly by subject-matter experts and exam toppers. Whether you are a first-time aspirant or a repeat candidate, consistent MCQ practice on GetVidya helps you build speed, accuracy, and confidence before the actual exam.
              </p>
              <h3>Exam-Wise Coverage</h3>
              <ul>
                <li><strong>SSC CGL</strong> — Combined Graduate Level exam conducted by SSC for Group B &amp; C posts. Covers Quantitative Aptitude, Reasoning, English, and GK.</li>
                <li><strong>IB ACIO</strong> — Intelligence Bureau Assistant Central Intelligence Officer exam. Focuses on Reasoning, English, GK, and Quantitative Aptitude.</li>
                <li><strong>RJS</strong> — Rajasthan Judicial Service exam conducted by the Rajasthan High Court. Heavy emphasis on Law questions including Civil Procedure Code, IPC, and Evidence Act.</li>
                <li><strong>Mixed Practice</strong> — Cross-exam MCQs ideal for aspirants targeting multiple exams simultaneously.</li>
              </ul>
              <p>
                For a personalised AI-powered study plan that adapts to your performance, download the{" "}
                <a href="https://app.getvidya.in" target="_blank" rel="noopener noreferrer">GetVidya app</a>{" "}
                and unlock unlimited mock tests, live sessions, and expert mentoring.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
