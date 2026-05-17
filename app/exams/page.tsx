import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Layers, Target, Zap } from "lucide-react";

export const revalidate = 3600;

export const metadata = generateSEO({
  title: "All Government Exam Mock Tests 2026 — SSC, UPSC, Banking & More",
  description: "Prepare for SSC CGL, UPSC CSE, Banking, Railway NTPC, State PSC, and Defence exams with GetVidyaAI's 1,200+ mock tests and 140,000+ practice questions.",
  keywords: ["government exam mock test", "SSC CGL preparation", "UPSC mock test", "banking exam preparation", "railway NTPC mock test"],
  canonical: "https://getvidya.in/exams",
});

const EXAMS_STATIC = [
  {
    slug: "ssc-cgl", name: "SSC CGL", fullForm: "Combined Graduate Level", emoji: "📋",
    cardBg: "from-blue-600 to-blue-800",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200",
    highlights: ["Tier 1 & Tier 2 Mocks", "10 Years PYQs", "Chapter-wise MCQs"],
  },
  {
    slug: "upsc", name: "UPSC CSE", fullForm: "Civil Services Examination", emoji: "🏛️",
    cardBg: "from-purple-600 to-purple-800",
    tagBg: "bg-purple-50 text-purple-700 border-purple-200",
    highlights: ["Prelims Full Mocks", "GS Paper 1–4", "Current Affairs MCQs"],
  },
  {
    slug: "banking", name: "Banking Exams", fullForm: "SBI PO / Clerk / RBI Grade B", emoji: "🏦",
    cardBg: "from-emerald-600 to-emerald-800",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    highlights: ["SBI PO & Clerk Mocks", "IBPS Full Tests", "Banking Awareness"],
  },
  {
    slug: "railway", name: "Railway NTPC", fullForm: "Non-Technical Popular Categories", emoji: "🚂",
    cardBg: "from-orange-600 to-orange-800",
    tagBg: "bg-orange-50 text-orange-700 border-orange-200",
    highlights: ["CBT 1 & CBT 2 Mocks", "General Awareness", "Mathematics Practice"],
  },
  {
    slug: "state-psc", name: "State PSC", fullForm: "State Public Service Commission", emoji: "📜",
    cardBg: "from-rose-600 to-rose-800",
    tagBg: "bg-rose-50 text-rose-700 border-rose-200",
    highlights: ["State-specific Mocks", "GS Paper Practice", "State History MCQs"],
  },
  {
    slug: "defence", name: "NDA / CDS", fullForm: "Defence Services Examinations", emoji: "🎖️",
    cardBg: "from-indigo-600 to-indigo-800",
    tagBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    highlights: ["NDA & CDS Full Mocks", "Mathematics Practice", "GAT Tests"],
  },
];

const HUB_API = "https://getvidya-platform-three.vercel.app/api/public/exams/hub";

interface HubEntry {
  total_questions: number;
  full_mocks: number;
  subject_drills: number;
  topic_sprints: number;
}

async function fetchHub(): Promise<Record<string, HubEntry>> {
  try {
    const res = await fetch(HUB_API, { next: { revalidate: 3600 } });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export default async function ExamsPage() {
  const hub = await fetchHub();

  const exams = EXAMS_STATIC.map((e) => {
    const live = hub[e.slug];
    return {
      ...e,
      tests:     live ? live.full_mocks + live.subject_drills + live.topic_sprints : null,
      questions: live ? live.total_questions : null,
      full_mocks:    live?.full_mocks ?? 0,
      subject_drills: live?.subject_drills ?? 0,
      topic_sprints: live?.topic_sprints ?? 0,
    };
  });

  const totalTests     = exams.reduce((a, e) => a + (e.tests ?? 0), 0);
  const totalQuestions = exams.reduce((a, e) => a + (e.questions ?? 0), 0);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
          <div className="container-xl relative z-10">
            <AnimateIn>
              <span className="section-tag mb-4 !bg-white/10 !text-white/90 !border-white/20">
                <BookOpen size={13} className="inline mr-1.5" />Exam Coverage
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                All Government Exams,<br />
                <span className="text-accent">One Platform.</span>
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                {totalTests > 0 ? `${totalTests}+` : "1,200+"} mock tests,{" "}
                {totalQuestions > 0 ? `${(totalQuestions / 1000).toFixed(0)}K+` : "140K+"} practice questions
                across India&apos;s top government exams. Start free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2">
                  Start Free Mock Test <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* 3-Tier legend */}
        <section className="py-8 bg-slate-50 border-b border-slate-100">
          <div className="container-xl">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                  <Layers size={14} className="text-white" />
                </span>
                <span className="font-semibold text-primary-500">Full Mocks</span>
                <span className="text-slate-400">100Q · 60 min · Full syllabus</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center">
                  <Target size={14} className="text-white" />
                </span>
                <span className="font-semibold text-primary-500">Subject Drills</span>
                <span className="text-slate-400">30Q · 30 min · One subject</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Zap size={14} className="text-white" />
                </span>
                <span className="font-semibold text-primary-500">Topic Sprints</span>
                <span className="text-slate-400">15Q · 20 min · One topic</span>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Cards Grid */}
        <section className="py-16 bg-white">
          <div className="container-xl">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {exams.map((exam) => (
                <StaggerItem key={exam.slug}>
                  <Link href={`/exams/${exam.slug}`}
                    className="group block card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                    {/* Gradient band */}
                    <div className={`h-28 bg-gradient-to-br ${exam.cardBg} relative flex items-center px-6`}>
                      <div className="text-5xl">{exam.emoji}</div>
                      <div className="ml-auto text-right">
                        <div className="text-white/90 text-2xl font-bold">
                          {exam.tests != null ? `${exam.tests}+` : "—"}
                        </div>
                        <div className="text-white/60 text-xs">Tests Available</div>
                      </div>
                      <div className="absolute inset-0 opacity-[0.06]"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <h2 className="text-xl font-bold text-primary-500 group-hover:text-teal transition-colors">{exam.name}</h2>
                        <p className="text-slate-500 text-sm mt-0.5">{exam.fullForm}</p>
                      </div>

                      {/* 3-tier pill row */}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-500">
                          <Layers size={10} /> {exam.full_mocks} Full
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal">
                          <Target size={10} /> {exam.subject_drills} Drills
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                          <Zap size={10} /> {exam.topic_sprints} Sprints
                        </span>
                      </div>

                      <ul className="space-y-1.5 mb-5">
                        {exam.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={13} className="text-teal flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-1.5 text-teal text-sm font-semibold mt-auto group-hover:gap-2.5 transition-all">
                        Explore Tests <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
