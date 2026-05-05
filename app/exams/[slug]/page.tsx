import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO, breadcrumbSchema } from "@/lib/seo";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import { CheckCircle2, BookOpen, Clock, Trophy, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const WA = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";

const EXAMS: Record<string, {
  name: string; fullForm: string; emoji: string; tests: number; questions: number;
  color: string; gradient: string; about: string;
  features: string[]; syllabus: string[]; eligibility: string;
}> = {
  "ssc-cgl": {
    name: "SSC CGL", fullForm: "Combined Graduate Level", emoji: "📋", tests: 240, questions: 28000,
    color: "blue", gradient: "from-blue-600 to-blue-800",
    about: "SSC CGL is conducted by the Staff Selection Commission to recruit candidates for Group B and Group C posts in various Ministries, Departments, and Offices of the Government of India.",
    features: ["Tier 1 & Tier 2 Full Mocks", "Chapter-wise MCQs", "Previous Year Papers (10 Years)", "Subject-wise Tests", "Performance Analysis", "Daily Practice Questions"],
    syllabus: ["General Intelligence & Reasoning", "General Awareness", "Quantitative Aptitude", "English Comprehension"],
    eligibility: "Any graduate from a recognized university. Age: 18–32 years (relaxation for reserved categories).",
  },
  "upsc": {
    name: "UPSC CSE", fullForm: "Civil Services Examination", emoji: "🏛️", tests: 180, questions: 22000,
    color: "purple", gradient: "from-purple-600 to-purple-800",
    about: "UPSC CSE is India's most prestigious examination conducted by the Union Public Service Commission for recruitment to IAS, IPS, IFS, and other Group A & B central services.",
    features: ["Prelims Full Mocks", "GS Paper 1–4 Practice", "CSAT Preparation", "Current Affairs MCQs", "PYQ Analysis (5 Years)", "Subject Deep Dives"],
    syllabus: ["General Studies (History, Geography, Polity, Economy)", "CSAT", "Optional Subject Support", "Current Affairs"],
    eligibility: "Graduate from any recognized university. Age: 21–32 years (relaxation for OBC/SC/ST).",
  },
  "banking": {
    name: "Banking", fullForm: "SBI PO / Clerk / RBI Grade B", emoji: "🏦", tests: 200, questions: 24000,
    color: "emerald", gradient: "from-emerald-600 to-emerald-800",
    about: "Banking exams include SBI PO, SBI Clerk, IBPS PO, IBPS Clerk, and RBI Grade B — competitive exams for officer and clerical cadre posts in public sector banks.",
    features: ["SBI PO & Clerk Mocks", "IBPS Full Tests", "Reasoning Ability Practice", "Quantitative Aptitude", "English Language Tests", "Banking Awareness MCQs"],
    syllabus: ["Reasoning & Computer Aptitude", "Data Analysis & Interpretation", "General/Economy/Banking Awareness", "English Language"],
    eligibility: "Graduate in any discipline. Age: 20–30 years. Specific criteria vary by bank and post.",
  },
  "railway": {
    name: "Railway NTPC", fullForm: "Non-Technical Popular Categories", emoji: "🚂", tests: 150, questions: 18000,
    color: "orange", gradient: "from-orange-600 to-orange-800",
    about: "RRB NTPC is conducted by Railway Recruitment Boards for recruitment to various non-technical posts in Indian Railways — one of the largest employers in India.",
    features: ["CBT 1 & CBT 2 Mocks", "General Awareness Questions", "Mathematics Practice", "General Intelligence Tests", "Previous Year MCQs", "Daily Free Questions"],
    syllabus: ["Mathematics", "General Intelligence & Reasoning", "General Awareness"],
    eligibility: "10+2 / Graduate depending on the post. Age: 18–33 years.",
  },
  "state-psc": {
    name: "State PSC", fullForm: "State Public Service Commission", emoji: "📜", tests: 120, questions: 15000,
    color: "rose", gradient: "from-rose-600 to-rose-800",
    about: "State PSC exams are conducted by state-level commissions (UPPSC, MPPSC, RPSC, etc.) for recruitment to Group A & B state government services.",
    features: ["State-specific Mocks", "GS Paper Practice", "State History & Culture MCQs", "Polity & Governance Questions", "Economy Practice Tests", "Current Affairs"],
    syllabus: ["General Studies", "State-specific History, Geography & Culture", "Current Affairs", "General Hindi/English"],
    eligibility: "Varies by state and post. Generally graduate-level with age between 21–40 years.",
  },
  "defence": {
    name: "NDA / CDS", fullForm: "Defence Services Examinations", emoji: "🎖️", tests: 90, questions: 12000,
    color: "indigo", gradient: "from-indigo-600 to-indigo-800",
    about: "NDA (National Defence Academy) and CDS (Combined Defence Services) are UPSC-conducted exams for entry into the Indian Army, Navy, and Air Force as officers.",
    features: ["NDA & CDS Full Mocks", "Mathematics Practice", "GAT (General Ability Test)", "English Grammar Tests", "Science & GK Questions", "PYQ Analysis"],
    syllabus: ["Mathematics", "General Ability Test (English + GK)", "Physics, Chemistry, Biology", "History, Geography, Civics"],
    eligibility: "NDA: 10+2. CDS: Graduate. Age varies: NDA 16.5–19.5, CDS 20–25 years.",
  },
};

export function generateStaticParams() {
  return Object.keys(EXAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const exam = EXAMS[params.slug];
  if (!exam) return {};
  return generateSEO({
    title: `${exam.name} Mock Tests 2025 — ${exam.questions.toLocaleString()}+ MCQs`,
    description: `Prepare for ${exam.name} (${exam.fullForm}) with ${exam.tests}+ mock tests and ${exam.questions.toLocaleString()}+ practice questions on GetVidya. Start free at ₹149/month.`,
    keywords: [`${exam.name} mock test`, `${exam.name} preparation`, `${exam.name} question bank`, `${exam.fullForm} 2025`],
    canonical: `https://getvidya.in/exams/${params.slug}`,
  });
}

export default function ExamPage({ params }: { params: { slug: string } }) {
  const exam = EXAMS[params.slug];
  if (!exam) notFound();

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Exams", url: "/exams" }, { name: exam.name, url: `/exams/${params.slug}` }
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Course",
        name: `${exam.name} Mock Tests & Preparation`,
        description: exam.about,
        provider: { "@type": "Organization", name: "GetVidya", sameAs: "https://getvidya.in" },
        offers: { "@type": "Offer", price: "149", priceCurrency: "INR", availability: "https://schema.org/InStock" },
      }) }} />

      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className={`bg-gradient-to-br ${exam.gradient} py-16 md:py-24`}>
          <div className="container-xl">
            <AnimateIn>
              <div className="flex items-center gap-3 text-white/60 text-sm mb-6">
                <a href="/">Home</a> / <a href="/exams">Exams</a> / <span className="text-white">{exam.name}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <div className="text-5xl md:text-6xl mb-4">{exam.emoji}</div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{exam.name}</h1>
                  <p className="text-white/70 text-base md:text-lg mb-6">{exam.fullForm}</p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 md:px-5 py-3 text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">{exam.tests}+</div>
                      <div className="text-white/60 text-xs mt-0.5">Mock Tests</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 md:px-5 py-3 text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">{(exam.questions / 1000).toFixed(0)}K+</div>
                      <div className="text-white/60 text-xs mt-0.5">Questions</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2">
                    Start Free Mock <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton href="https://app.getvidya.in/login"
                    className="btn-secondary flex items-center gap-2">
                    Login <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="container-xl grid lg:grid-cols-3 gap-12">
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-10">
              {/* About */}
              <AnimateIn>
                <h2 className="text-2xl font-bold text-primary-500 mb-4">About {exam.name}</h2>
                <p className="text-slate-600 leading-relaxed">{exam.about}</p>
              </AnimateIn>

              {/* Syllabus */}
              <AnimateIn delay={0.1}>
                <h2 className="text-2xl font-bold text-primary-500 mb-4">Syllabus Overview</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {exam.syllabus.map((s) => (
                    <div key={s} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>

              {/* Eligibility */}
              <AnimateIn delay={0.2}>
                <h2 className="text-2xl font-bold text-primary-500 mb-4">Eligibility</h2>
                <p className="text-slate-600 leading-relaxed">{exam.eligibility}</p>
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <div className="order-1 lg:order-2">
              <AnimateIn variant="fadeRight" className="sticky top-24">
                <div className="card p-6">
                  <h3 className="font-bold text-primary-500 text-lg mb-5">What GetVidya Offers</h3>
                  <ul className="space-y-3 mb-6">
                    {exam.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle2 size={15} className="text-teal flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-mint rounded-xl p-4 mb-5 text-center">
                    <div className="text-2xl font-bold text-primary-500">₹149<span className="text-sm font-normal text-slate-500">/month</span></div>
                    <div className="text-slate-500 text-xs mt-1">Unlimited access to all tests</div>
                  </div>
                  <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                    className="btn-primary w-full justify-center flex items-center gap-2 text-sm">
                    Start Free Now <ArrowRight size={14} />
                  </MagneticButton>
                  <p className="text-center text-xs text-slate-400 mt-3">No credit card · Free tests available</p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
