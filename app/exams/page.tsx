import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata = generateSEO({
  title: "All Government Exam Mock Tests 2025 — SSC, UPSC, Banking & More",
  description: "Prepare for SSC CGL, UPSC CSE, Banking, Railway NTPC, State PSC, and Defence exams with GetVidya's 1,200+ mock tests and 140,000+ practice questions.",
  keywords: ["government exam mock test", "SSC CGL preparation", "UPSC mock test", "banking exam preparation", "railway NTPC mock test"],
  canonical: "https://getvidya.in/exams",
});

const exams = [
  {
    slug: "ssc-cgl", name: "SSC CGL", fullForm: "Combined Graduate Level", emoji: "📋",
    tests: 240, questions: 28000, color: "blue",
    cardBg: "from-blue-600 to-blue-800",
    tagBg: "bg-blue-50 text-blue-700 border-blue-200",
    highlights: ["Tier 1 & Tier 2 Mocks", "10 Years PYQs", "Chapter-wise MCQs"],
  },
  {
    slug: "upsc", name: "UPSC CSE", fullForm: "Civil Services Examination", emoji: "🏛️",
    tests: 180, questions: 22000, color: "purple",
    cardBg: "from-purple-600 to-purple-800",
    tagBg: "bg-purple-50 text-purple-700 border-purple-200",
    highlights: ["Prelims Full Mocks", "GS Paper 1–4", "Current Affairs MCQs"],
  },
  {
    slug: "banking", name: "Banking Exams", fullForm: "SBI PO / Clerk / RBI Grade B", emoji: "🏦",
    tests: 200, questions: 24000, color: "emerald",
    cardBg: "from-emerald-600 to-emerald-800",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    highlights: ["SBI PO & Clerk Mocks", "IBPS Full Tests", "Banking Awareness"],
  },
  {
    slug: "railway", name: "Railway NTPC", fullForm: "Non-Technical Popular Categories", emoji: "🚂",
    tests: 150, questions: 18000, color: "orange",
    cardBg: "from-orange-600 to-orange-800",
    tagBg: "bg-orange-50 text-orange-700 border-orange-200",
    highlights: ["CBT 1 & CBT 2 Mocks", "General Awareness", "Mathematics Practice"],
  },
  {
    slug: "state-psc", name: "State PSC", fullForm: "State Public Service Commission", emoji: "📜",
    tests: 120, questions: 15000, color: "rose",
    cardBg: "from-rose-600 to-rose-800",
    tagBg: "bg-rose-50 text-rose-700 border-rose-200",
    highlights: ["State-specific Mocks", "GS Paper Practice", "State History MCQs"],
  },
  {
    slug: "defence", name: "NDA / CDS", fullForm: "Defence Services Examinations", emoji: "🎖️",
    tests: 90, questions: 12000, color: "indigo",
    cardBg: "from-indigo-600 to-indigo-800",
    tagBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    highlights: ["NDA & CDS Full Mocks", "Mathematics Practice", "GAT Tests"],
  },
];

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

export default function ExamsPage() {
  const totalTests = exams.reduce((a, e) => a + e.tests, 0);
  const totalQuestions = exams.reduce((a, e) => a + e.questions, 0);

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
                {totalTests}+ mock tests, {(totalQuestions / 1000).toFixed(0)}K+ practice questions across India&apos;s top government exams. Start free.
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

        {/* Exam Cards Grid */}
        <section className="py-20 bg-white">
          <div className="container-xl">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {exams.map((exam) => (
                <StaggerItem key={exam.slug}>
                  <Link href={`/exams/${exam.slug}`}
                    className="group block card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                    {/* Top gradient band */}
                    <div className={`h-28 bg-gradient-to-br ${exam.cardBg} relative flex items-center px-6`}>
                      <div className="text-5xl">{exam.emoji}</div>
                      <div className="ml-auto text-right">
                        <div className="text-white/90 text-2xl font-bold">{exam.tests}+</div>
                        <div className="text-white/60 text-xs">Mock Tests</div>
                      </div>
                      <div className="absolute inset-0 opacity-[0.06]"
                        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-primary-500 group-hover:text-teal transition-colors">{exam.name}</h2>
                        <p className="text-slate-500 text-sm mt-0.5">{exam.fullForm}</p>
                      </div>

                      <div className="flex items-center gap-3 mb-5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${exam.tagBg}`}>
                          {(exam.questions / 1000).toFixed(0)}K+ Questions
                        </span>
                      </div>

                      <ul className="space-y-2 mb-5">
                        {exam.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={13} className="text-teal flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-1.5 text-teal text-sm font-semibold mt-auto">
                        Explore Tests
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-mint">
          <div className="container-xl text-center">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-primary-500 mb-3">Can&apos;t find your exam?</h2>
              <p className="text-slate-600 mb-7 max-w-lg mx-auto">
                We&apos;re constantly expanding. Reach out on WhatsApp and we&apos;ll get your exam covered.
              </p>
              <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2">
                Talk to Us on WhatsApp <ArrowRight size={15} />
              </MagneticButton>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
