import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO, breadcrumbSchema } from "@/lib/seo";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import { CheckCircle2, ArrowRight, Layers, Target, Zap, Clock, BookOpen } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";

const WA  = "https://wa.me/918114422752?text=Hello%20GetVidya%20Team,%20I%20want%20to%20know%20more%20about%20the%20mock%20tests.";
const APP = "https://app.getvidya.in";
const HUB_API = "https://getvidya-platform-three.vercel.app/api/public/exams/hub";

// Builds a deep link into the web app for a specific SubCategory
function appExamUrl(subCategoryId: string | undefined) {
  if (!subCategoryId) return APP;
  return `${APP}/tests/exam-details/${subCategoryId}`;
}

const EXAMS: Record<string, {
  name: string; fullForm: string; emoji: string;
  gradient: string; about: string;
  features: string[]; syllabus: string[]; eligibility: string;
}> = {
  "ssc-cgl": {
    name: "SSC CGL", fullForm: "Combined Graduate Level", emoji: "📋",
    gradient: "from-blue-600 to-blue-800",
    about: "SSC CGL is conducted by the Staff Selection Commission to recruit candidates for Group B and Group C posts in various Ministries, Departments, and Offices of the Government of India.",
    features: ["Tier 1 & Tier 2 Full Mocks", "Chapter-wise MCQs", "Previous Year Papers (10 Years)", "Subject-wise Tests", "Performance Analysis", "Daily Practice Questions"],
    syllabus: ["General Intelligence & Reasoning", "General Awareness", "Quantitative Aptitude", "English Comprehension"],
    eligibility: "Any graduate from a recognized university. Age: 18–32 years (relaxation for reserved categories).",
  },
  "upsc": {
    name: "UPSC CSE", fullForm: "Civil Services Examination", emoji: "🏛️",
    gradient: "from-purple-600 to-purple-800",
    about: "UPSC CSE is India's most prestigious examination conducted by the Union Public Service Commission for recruitment to IAS, IPS, IFS, and other Group A & B central services.",
    features: ["Prelims Full Mocks", "GS Paper 1–4 Practice", "CSAT Preparation", "Current Affairs MCQs", "PYQ Analysis (5 Years)", "Subject Deep Dives"],
    syllabus: ["General Studies (History, Geography, Polity, Economy)", "CSAT", "Optional Subject Support", "Current Affairs"],
    eligibility: "Graduate from any recognized university. Age: 21–32 years (relaxation for OBC/SC/ST).",
  },
  "banking": {
    name: "Banking", fullForm: "SBI PO / Clerk / RBI Grade B", emoji: "🏦",
    gradient: "from-emerald-600 to-emerald-800",
    about: "Banking exams include SBI PO, SBI Clerk, IBPS PO, IBPS Clerk, and RBI Grade B — competitive exams for officer and clerical cadre posts in public sector banks.",
    features: ["SBI PO & Clerk Mocks", "IBPS Full Tests", "Reasoning Ability Practice", "Quantitative Aptitude", "English Language Tests", "Banking Awareness MCQs"],
    syllabus: ["Reasoning & Computer Aptitude", "Data Analysis & Interpretation", "General/Economy/Banking Awareness", "English Language"],
    eligibility: "Graduate in any discipline. Age: 20–30 years. Specific criteria vary by bank and post.",
  },
  "railway": {
    name: "Railway NTPC", fullForm: "Non-Technical Popular Categories", emoji: "🚂",
    gradient: "from-orange-600 to-orange-800",
    about: "RRB NTPC is conducted by Railway Recruitment Boards for recruitment to various non-technical posts in Indian Railways — one of the largest employers in India.",
    features: ["CBT 1 & CBT 2 Mocks", "General Awareness Questions", "Mathematics Practice", "General Intelligence Tests", "Previous Year MCQs", "Daily Free Questions"],
    syllabus: ["Mathematics", "General Intelligence & Reasoning", "General Awareness"],
    eligibility: "10+2 / Graduate depending on the post. Age: 18–33 years.",
  },
  "state-psc": {
    name: "State PSC", fullForm: "State Public Service Commission", emoji: "📜",
    gradient: "from-rose-600 to-rose-800",
    about: "State PSC exams are conducted by state-level commissions (UPPSC, MPPSC, RPSC, etc.) for recruitment to Group A & B state government services.",
    features: ["State-specific Mocks", "GS Paper Practice", "State History & Culture MCQs", "Polity & Governance Questions", "Economy Practice Tests", "Current Affairs"],
    syllabus: ["General Studies", "State-specific History, Geography & Culture", "Current Affairs", "General Hindi/English"],
    eligibility: "Varies by state and post. Generally graduate-level with age between 21–40 years.",
  },
  "defence": {
    name: "NDA / CDS", fullForm: "Defence Services Examinations", emoji: "🎖️",
    gradient: "from-indigo-600 to-indigo-800",
    about: "NDA and CDS are UPSC-conducted exams for entry into the Indian Army, Navy, and Air Force as officers.",
    features: ["NDA & CDS Full Mocks", "Mathematics Practice", "GAT (General Ability Test)", "English Grammar Tests", "Science & GK Questions", "PYQ Analysis"],
    syllabus: ["Mathematics", "General Ability Test (English + GK)", "Physics, Chemistry, Biology", "History, Geography, Civics"],
    eligibility: "NDA: 10+2. CDS: Graduate. Age varies: NDA 16.5–19.5, CDS 20–25 years.",
  },
  "rpsc-ras": {
    name: "RPSC RAS", fullForm: "Rajasthan Administrative Services", emoji: "📜",
    gradient: "from-rose-600 to-rose-800",
    about: "RPSC RAS is conducted by the Rajasthan Public Service Commission for recruitment to Group A administrative services in Rajasthan.",
    features: ["RAS Prelims Full Mocks", "Rajasthan GK & Culture MCQs", "Rajasthan Current Affairs", "History of Rajasthan Practice", "PYQ Analysis (5 Years)"],
    syllabus: ["General Studies (History, Geography, Polity, Economy)", "Rajasthan History & Culture", "Rajasthan Geography & Natural Resources", "Rajasthan Current Affairs"],
    eligibility: "Graduate from any recognized university. Age: 21–40 years. Rajasthan domicile required.",
  },
  "rajasthan-police": {
    name: "Rajasthan Police", fullForm: "Rajasthan Police Constable & SI", emoji: "🚔",
    gradient: "from-blue-700 to-blue-900",
    about: "Rajasthan Police Constable and Sub-Inspector exams are conducted by the Rajasthan Police Recruitment Board for law enforcement posts across the state.",
    features: ["Constable & SI Full Mocks", "Rajasthan GK Practice Tests", "Reasoning & Mental Ability Tests", "Current Affairs MCQs", "Physical Science Questions"],
    syllabus: ["General Knowledge (Rajasthan Focus)", "Reasoning & Mental Ability", "General Science", "Current Affairs & GK", "Basic Computer Knowledge"],
    eligibility: "Constable: 10+2 pass. SI: Graduate. Age: 18–26 years for Constable, 20–25 years for SI.",
  },
};

interface ExamHubEntry {
  total_questions: number;
  full_mocks: number;
  subject_drills: number;
  topic_sprints: number;
  sub_categories: Array<{
    id: string; name: string; question_count: number;
    full_mocks:     Array<{ id: string; name: string; duration: number; totalScore: number }>;
    subject_drills: Array<{ id: string; name: string; duration: number; totalScore: number }>;
    topic_sprints:  Array<{ id: string; name: string; duration: number; totalScore: number }>;
  }>;
}

async function fetchHubEntry(slug: string): Promise<ExamHubEntry | null> {
  try {
    const res = await fetch(HUB_API, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data[slug] ?? null;
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return Object.keys(EXAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const exam = EXAMS[params.slug];
  if (!exam) return {};
  const hub = await fetchHubEntry(params.slug);
  const qCount = hub?.total_questions ?? 0;
  return generateSEO({
    title: `${exam.name} Mock Tests 2026 — ${qCount > 0 ? `${(qCount / 1000).toFixed(0)}K+` : "140K+"} MCQs | GetVidyaAI`,
    description: `Prepare for ${exam.name} (${exam.fullForm}) with ${hub ? `${hub.full_mocks} full mocks, ${hub.subject_drills} subject drills & ${hub.topic_sprints} topic sprints` : "AI-adaptive mock tests"} on GetVidyaAI. Free diagnostic test available.`,
    keywords: [
      `${exam.name} mock test free 2026`, `${exam.name} mock test`,
      `${exam.name} preparation`, `${exam.name} question bank`,
      `${exam.fullForm} 2026`, `${exam.name} online test series`,
      `best test series for ${exam.name}`, `${exam.name} ai mock test`,
    ],
    canonical: `https://getvidya.in/exams/${params.slug}`,
  });
}

type TestEntry = { id: string; name: string; duration: number; totalScore: number; subCatId?: string };

function TestTierSection({
  icon, label, badge, color, bgColor, tests, duration, questions, emptyMsg, fallbackHref,
}: {
  icon: React.ReactNode; label: string; badge: string; color: string; bgColor: string;
  tests: TestEntry[];
  duration: string; questions: string; emptyMsg: string; fallbackHref: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center`}>
          {icon}
        </span>
        <div>
          <h3 className={`font-bold ${color}`}>{label}</h3>
          <p className="text-slate-400 text-xs">{duration} · {questions}</p>
        </div>
        <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${bgColor} ${color}`}>
          {tests.length > 0 ? `${tests.length} available` : "Coming soon"}
        </span>
      </div>

      {tests.length > 0 ? (
        <div className="space-y-2">
          {tests.slice(0, 5).map((test) => {
            const testHref = test.subCatId ? appExamUrl(test.subCatId) : fallbackHref;
            return (
              <a key={test.id} href={testHref} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group cursor-pointer">
                <div>
                  <div className="text-sm font-medium text-primary-500 group-hover:text-teal transition-colors line-clamp-1">
                    {test.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{test.duration} min · {test.totalScore} marks</div>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-teal transition-colors flex-shrink-0" />
              </a>
            );
          })}
          {tests.length > 5 && (
            <a href={fallbackHref} target="_blank" rel="noopener noreferrer"
              className={`block text-center text-xs font-semibold ${color} py-2.5 rounded-xl ${bgColor} hover:opacity-80 transition-opacity`}>
              +{tests.length - 5} more tests — View all
            </a>
          )}
        </div>
      ) : (
        <div className="p-4 bg-slate-50 rounded-xl text-center">
          <BookOpen size={24} className="text-slate-300 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">{emptyMsg}</p>
          <p className="text-slate-300 text-xs mt-1">AI is generating — check back tomorrow</p>
        </div>
      )}
    </div>
  );
}

export default async function ExamPage({ params }: { params: { slug: string } }) {
  const exam = EXAMS[params.slug];
  if (!exam) notFound();

  const hub = await fetchHubEntry(params.slug);
  const primarySubCatId = hub?.sub_categories?.[0]?.id;
  const deepLink = appExamUrl(primarySubCatId);

  const allTests = hub?.sub_categories?.flatMap((sc) => [...sc.full_mocks, ...sc.subject_drills, ...sc.topic_sprints]) ?? [];
  const fullMocks     = hub?.sub_categories?.flatMap((sc) => sc.full_mocks.map((t) => ({ ...t, subCatId: sc.id })))    ?? [];
  const subjectDrills = hub?.sub_categories?.flatMap((sc) => sc.subject_drills.map((t) => ({ ...t, subCatId: sc.id }))) ?? [];
  const topicSprints  = hub?.sub_categories?.flatMap((sc) => sc.topic_sprints.map((t) => ({ ...t, subCatId: sc.id })))  ?? [];

  const totalTests     = allTests.length;
  const totalQuestions = hub?.total_questions ?? 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Exams", url: "/exams" }, { name: exam.name, url: `/exams/${params.slug}` }
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Course",
        name: `${exam.name} Mock Tests & Preparation`,
        description: exam.about,
        provider: { "@type": "Organization", name: "GetVidyaAI", sameAs: "https://getvidya.in" },
        offers: { "@type": "Offer", price: "149", priceCurrency: "INR", availability: "https://schema.org/InStock" },
      }) }} />

      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className={`bg-gradient-to-br ${exam.gradient} py-16 md:py-24`}>
          <div className="container-xl">
            <AnimateIn>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/exams" className="hover:text-white transition-colors">Exams</Link>
                <span>/</span>
                <span className="text-white">{exam.name}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <div className="text-5xl md:text-6xl mb-4">{exam.emoji}</div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{exam.name}</h1>
                  <p className="text-white/70 text-base md:text-lg mb-6">{exam.fullForm}</p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 md:px-5 py-3 text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">{totalTests > 0 ? `${totalTests}+` : "—"}</div>
                      <div className="text-white/60 text-xs mt-0.5">Tests Ready</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 md:px-5 py-3 text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {totalQuestions > 0 ? `${(totalQuestions / 1000).toFixed(1)}K+` : "—"}
                      </div>
                      <div className="text-white/60 text-xs mt-0.5">Questions</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 md:px-5 py-3 text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">{fullMocks.length}</div>
                      <div className="text-white/60 text-xs mt-0.5">Full Mocks</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <MagneticButton href={deepLink} target="_blank" rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2">
                    Start Free Mock <ArrowRight size={16} />
                  </MagneticButton>
                  <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2">
                    Talk to Expert <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* 3-Tier Test Hub */}
        <section className="py-16 bg-white">
          <div className="container-xl">
            <AnimateIn className="mb-10">
              <h2 className="text-2xl font-bold text-primary-500 mb-1">Available Tests</h2>
              <p className="text-slate-500 text-sm">Live from our AI pipeline — new tests added daily</p>
            </AnimateIn>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Tier 1: Full Mocks */}
              <AnimateIn delay={0}>
                <div className="card p-6 h-full">
                  <TestTierSection
                    icon={<Layers size={16} className="text-white" />}
                    label="Full Length Mocks"
                    badge={`${fullMocks.length} available`}
                    color="text-primary-500"
                    bgColor="bg-primary-500/10"
                    tests={fullMocks}
                    duration="60 min"
                    questions="100 questions"
                    emptyMsg="Full mocks generate once 100 questions per segment are ready"
                    fallbackHref={deepLink}
                  />
                </div>
              </AnimateIn>

              {/* Tier 2: Subject Drills */}
              <AnimateIn delay={0.1}>
                <div className="card p-6 h-full">
                  <TestTierSection
                    icon={<Target size={16} className="text-white" />}
                    label="Subject Drills"
                    badge={`${subjectDrills.length} available`}
                    color="text-teal"
                    bgColor="bg-teal/10"
                    tests={subjectDrills}
                    duration="30 min"
                    questions="30 questions"
                    emptyMsg="Subject drills generate once 30 questions per subject are ready"
                    fallbackHref={deepLink}
                  />
                </div>
              </AnimateIn>

              {/* Tier 3: Topic Sprints */}
              <AnimateIn delay={0.2}>
                <div className="card p-6 h-full">
                  <TestTierSection
                    icon={<Zap size={16} className="text-white" />}
                    label="Topic Sprints"
                    badge={`${topicSprints.length} available`}
                    color="text-accent"
                    bgColor="bg-accent/10"
                    tests={topicSprints}
                    duration="20 min"
                    questions="15 questions"
                    emptyMsg="Topic sprints generate once 15 questions per chapter are ready"
                    fallbackHref={deepLink}
                  />
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Info Content */}
        <section className="py-16 bg-slate-50">
          <div className="container-xl grid lg:grid-cols-3 gap-12">
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-10">
              <AnimateIn>
                <h2 className="text-2xl font-bold text-primary-500 mb-4">About {exam.name}</h2>
                <p className="text-slate-600 leading-relaxed">{exam.about}</p>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <h2 className="text-2xl font-bold text-primary-500 mb-4">Syllabus Overview</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {exam.syllabus.map((s) => (
                    <div key={s} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                      <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <h2 className="text-2xl font-bold text-primary-500 mb-4">Eligibility</h2>
                <p className="text-slate-600 leading-relaxed">{exam.eligibility}</p>
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <div className="order-1 lg:order-2">
              <AnimateIn variant="fadeRight" className="sticky top-24">
                <div className="card p-6">
                  <h3 className="font-bold text-primary-500 text-lg mb-5">What GetVidyaAI Offers</h3>
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
                  <MagneticButton href={APP} target="_blank" rel="noopener noreferrer"
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
