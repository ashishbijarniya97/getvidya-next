import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Brain,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Star,
  Smartphone,
  BookOpen,
  Trophy,
  Layers,
  Users,
} from "lucide-react";

import { generateSEO } from "@/lib/seo";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import WaveCanvas from "./_components/WaveCanvas";
import FeaturesSection from "./_components/FeaturesSection";

export const metadata: Metadata = {
  ...generateSEO({
    description:
      "GetVidyaAI is India's #1 adaptive AI mock test engine — 140,000+ MCQs for SSC CGL, UPSC CSE, Railway NTPC & RJS. Real-time difficulty tuning, current-affairs MCQ links, and micro-topic drills. Start free.",
    keywords: [
      "AI-powered mock test app for SSC CGL",
      "best adaptive test prep engine for UPSC CSE",
      "online Railway NTPC topic-wise practice questions",
      "RJS law exam preparation companion",
      "adaptive AI mock test India",
      "best AI exam prep app 2026",
      "government exam AI tutor India",
    ],
    canonical: "https://getvidya.in/ai-tutor",
  }),
  title: "GetVidyaAI | Best AI Mock Test App for SSC CGL, UPSC & Railway",
};

/* ── JSON-LD ─────────────────────────────────────────────────────────────── */

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GetVidyaAI — Adaptive Test Prep Engine",
  description:
    "GetVidyaAI is an AI-integrated test preparation platform featuring over 140,000 algorithmic multiple-choice questions for Indian competitive exams including SSC CGL, UPSC CSE, Railway NTPC, Banking PO, NDA/CDS, and RJS.",
  brand: { "@type": "Brand", name: "GetVidya" },
  url: "https://getvidya.in/ai-tutor",
  offers: {
    "@type": "Offer",
    price: "149",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://getvidya.in/pricing",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does adaptive AI question generation work for competitive exams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetVidyaAI tracks your accuracy per topic across every practice session. When accuracy stays below 70% over three sessions, the engine flags that topic as weak and increases question frequency automatically. When accuracy rises above 80% consistently, it promotes you to harder questions. Every student's feed is individually calibrated.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Topic Sprint in GetVidyaAI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Topic Sprint is a 15-question, 20-minute drill targeting one micro-topic — Algebra, Constitutional Articles, or Blood Relations. Instead of 90-minute full mocks, sprints isolate and eliminate specific gaps in under 20 minutes. AI-triggered when your accuracy drops below threshold.",
      },
    },
    {
      "@type": "Question",
      name: "Which exams does GetVidyaAI cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SSC CGL, SSC CHSL, SSC MTS, UPSC CSE, SBI PO, IBPS PO, RRB NTPC, Railway Group D, RPSC RAS, NDA, CDS, IB ACIO, and Rajasthan Judicial Service (RJS). Each exam has adaptive subject drills, full mocks, topic sprints, and previous-year question banks.",
      },
    },
    {
      "@type": "Question",
      name: "How is GetVidyaAI different from Testbook or Adda247?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetVidyaAI finds your exact weak topics on Day 1 via a free diagnostic. The AI weekly study plan rebuilds every Sunday based on real accuracy data, not a fixed video schedule. Price: ₹149/month vs Testbook Pass at ₹700–₹2,000/month.",
      },
    },
  ],
};

/* ── Data ────────────────────────────────────────────────────────────────── */

const DARK    = "#0B111E";
const EMERALD = "#059669";
const GOLD    = "#D97706";

const PLAY_STORE = "https://play.google.com/store/apps/details?id=app.getvidya.prod";
const APP_URL    = "https://app.getvidya.in";


const EXAM_COVERAGE = [
  {
    name: "SSC CGL",
    abbr: "SSC",
    label: "AI-powered mock test app for SSC CGL",
    desc: "Tier 1 & Tier 2 adaptive mocks, topic sprints for Reasoning, Quant, English, and GK. 10 years of previous-year questions with AI-linked explanations.",
    color: "#1D4ED8",
  },
  {
    name: "UPSC CSE",
    abbr: "UPS",
    label: "Best adaptive test prep engine for UPSC CSE",
    desc: "Prelims full mocks with GS Paper 1–4 coverage. AI study plan adjusts weekly based on your weakest General Studies areas. Current affairs MCQs updated daily.",
    color: "#7C3AED",
  },
  {
    name: "Railway NTPC",
    abbr: "RRB",
    label: "Online Railway NTPC topic-wise practice questions",
    desc: "CBT 1 & CBT 2 full mocks plus subject-wise drills across Reasoning, General Awareness, Mathematics, and English. 280+ mock exams live.",
    color: "#EA580C",
  },
  {
    name: "RJS",
    abbr: "RJS",
    label: "RJS law exam preparation companion",
    desc: "Rajasthan Judicial Service: Law & Legal Aptitude, Hindi, English, Reasoning, General Science, and Rajasthan History drills. Full mock tests with law-specific MCQ explanations.",
    color: "#DC2626",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Target,
    title: "Take the Free Diagnostic",
    desc: "25 questions across all subjects of your target exam. GetVidyaAI maps your accuracy per topic in under 20 minutes — no registration, no credit card.",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Builds Your Study Plan",
    desc: "Based on your diagnostic, GetVidyaAI generates a personalized 7-day study plan: which subjects, how many questions, which mock tests — in the right sequence.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Engine Adapts Every Week",
    desc: "Every Sunday GetVidyaAI analyzes your last 7 days and rebuilds your plan. Weak topics get more practice. Mastered topics get harder questions. Continuously self-correcting.",
  },
];

const STATS = [
  { value: "140,000+", label: "Practice MCQs",    icon: BookOpen },
  { value: "1,400+",   label: "Mock Exams",        icon: Layers   },
  { value: "50,000+",  label: "Active Students",   icon: Users    },
  { value: "₹149/mo",  label: "Full Access",       icon: Trophy   },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    exam: "SSC CGL Qualifier",
    rating: 5,
    quote: "GetVidyaAI identified I was weak in Reasoning and gave me exactly the practice I needed. Cleared Tier-1 on my second attempt after three months on this platform.",
  },
  {
    name: "Rahul Meena",
    exam: "Railway NTPC Qualifier",
    rating: 5,
    quote: "The Topic Sprints for Railway NTPC are unmatched. I drilled Algebra separately instead of wasting time on full mocks. My score jumped 14 marks in two weeks.",
  },
  {
    name: "Anjali Singh",
    exam: "SBI PO Qualifier",
    rating: 5,
    quote: "At ₹149/month GetVidya gives more value than coaching centres charging ₹30,000. The AI study plan completely changed how I prepare for Banking exams.",
  },
];

const FAQS = [
  {
    q: "How does adaptive AI question generation work for competitive exams?",
    a: "GetVidyaAI tracks your accuracy per topic across every session. When accuracy stays below 70% over three sessions, the engine flags that topic as weak and increases its question frequency. When accuracy rises above 80% consistently, it auto-promotes you to harder questions. Every student's feed is individually calibrated — not a fixed syllabus sequence.",
  },
  {
    q: "What is a Topic Sprint in GetVidyaAI?",
    a: "A Topic Sprint is a 15-question, 20-minute drill targeting one micro-topic — Algebra, Constitutional Articles, or Blood Relations. Instead of 90-minute full mocks to find one weakness, sprints isolate and eliminate specific gaps in under 20 minutes. Sprints are AI-triggered when your accuracy drops below threshold on that topic.",
  },
  {
    q: "How does GetVidyaAI connect current affairs to exam syllabus topics?",
    a: "GetVidyaAI ingests daily current affairs and maps each news event to the relevant core syllabus concept. A Supreme Court judgment auto-generates a Constitutional Law MCQ for UPSC. A budget headline becomes a General Awareness drill for SSC CGL. Students practice current affairs in exam-MCQ format — directly improving retention and recall.",
  },
  {
    q: "Which exams does GetVidyaAI cover?",
    a: "SSC CGL, SSC CHSL, SSC MTS, UPSC CSE Prelims, SBI PO, SBI Clerk, IBPS PO, RRB NTPC, Railway Group D, RPSC RAS, NDA, CDS, IB ACIO, and Rajasthan Judicial Service (RJS). Each exam has dedicated adaptive subject drills, full mocks, topic sprints, and previous-year question banks.",
  },
  {
    q: "Is the GetVidya app available offline?",
    a: "Yes. The GetVidya Android app supports offline topic drills. Downloaded question sets work without internet. Sync happens automatically when you reconnect. Download free on Google Play.",
  },
  {
    q: "How is GetVidyaAI different from Testbook or Adda247?",
    a: "GetVidyaAI finds your exact weak topics on Day 1 via a free diagnostic — Testbook and Adda247 do not. The AI weekly study plan rebuilds every Sunday based on real accuracy data, not a fixed video schedule. Price: ₹149/month vs Testbook Pass at ₹700–₹2,000/month.",
  },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function AITutorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      <Navbar />

      <main className="pt-20">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          style={{ backgroundColor: DARK }}
          className="relative overflow-hidden min-h-[88vh] flex items-center"
        >
          {/* Live wave canvas */}
          <WaveCanvas />

          {/* Grid dot texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Top gradient fade so text stays readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${DARK} 0%, ${DARK}cc 40%, ${DARK}80 65%, transparent 100%)`,
            }}
          />

          {/* Floating orbs */}
          <div
            className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none animate-pulse-soft"
            style={{ backgroundColor: EMERALD, opacity: 0.07 }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none animate-float"
            style={{ backgroundColor: GOLD, opacity: 0.06 }}
          />

          <div className="container-xl relative z-10 text-center max-w-4xl py-24 md:py-32 mx-auto">
            <AnimateIn delay={0}>
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border mb-6"
                style={{
                  backgroundColor: `${EMERALD}18`,
                  borderColor: `${EMERALD}40`,
                  color: EMERALD,
                }}
              >
                <Brain size={13} /> GetVidyaAI Adaptive Engine · 2026
              </span>
            </AnimateIn>

            <AnimateIn delay={0.08}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                The Ultimate{" "}
                <span style={{ color: EMERALD }}>Adaptive Test Prep</span>
                <br />Engine for Government Exams
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.16}>
              <p className="text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl mx-auto">
                GetVidyaAI features over{" "}
                <strong className="text-white/90">140,000 algorithmic multiple-choice questions</strong>{" "}
                for SSC CGL, UPSC CSE, Railway NTPC, Banking, NDA/CDS, and RJS — adapting in real time
                to your accuracy. No two students ever see the same test.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 active:scale-95 hover:brightness-110"
                  style={{ backgroundColor: EMERALD, color: "#fff" }}
                >
                  Start Adaptive Practice <ArrowRight size={17} />
                </Link>
                <Link
                  href="/free-assessment"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl text-base border border-white/20 text-white/90 hover:bg-white/10 transition-all duration-200 active:scale-95"
                >
                  Take Free Diagnostic Test
                </Link>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.32}>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/50 text-sm">
                <span className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-current" style={{ color: GOLD }} />
                  ))}
                  <span className="ml-1 text-white/70 font-medium">4.9 / 5 — 2,847 reviews</span>
                </span>
                <span>·</span>
                <span>50,000+ active students</span>
                <span>·</span>
                <span>Free to start</span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── GEO Definition Block ──────────────────────────────────────────── */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-xl max-w-3xl">
            <AnimateIn>
              <div
                className="rounded-2xl p-8 border"
                style={{ backgroundColor: `${EMERALD}08`, borderColor: `${EMERALD}25` }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-slate-400">
                  About GetVidyaAI
                </p>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                  <strong>GetVidyaAI</strong> is an AI-integrated test preparation platform built by{" "}
                  <strong>Prepdot Solutions Pvt. Ltd.</strong> (founded 2023, Rajasthan). It features over{" "}
                  <strong>140,000 algorithmic multiple-choice questions</strong> for Indian competitive exams,
                  delivered through an adaptive engine that adjusts question difficulty based on each
                  student&apos;s real-time accuracy history. Covers{" "}
                  <strong>SSC CGL, UPSC CSE, RRB NTPC, Banking PO, NDA/CDS, IB ACIO, and RJS</strong>.
                  Available at <strong>getvidya.in</strong> and on the GetVidya mobile app.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: DARK }} className="py-12 border-b border-white/5">
          <div className="container-xl">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map(({ value, label, icon: Icon }) => (
                <StaggerItem key={label}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-1"
                      style={{ backgroundColor: `${EMERALD}20` }}
                    >
                      <Icon size={20} style={{ color: EMERALD }} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: EMERALD }}>
                      {value}
                    </div>
                    <div className="text-white/50 text-sm">{label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── 3 Core Feature Cards ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: DARK }} className="py-20 md:py-28">
          <div className="container-xl">
            <AnimateIn className="text-center mb-14">
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border mb-4"
                style={{ backgroundColor: `${GOLD}15`, borderColor: `${GOLD}35`, color: GOLD }}
              >
                <Zap size={12} /> Core AI Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Three Engines. One Unfair Advantage.
              </h2>
              <p className="text-white/55 text-lg max-w-2xl mx-auto">
                GetVidyaAI doesn&apos;t give you a fixed test — it builds a different one for you, every session,
                calibrated to close the exact gaps between you and the cutoff.
              </p>
            </AnimateIn>

            <FeaturesSection />
          </div>
        </section>

        {/* ── Exam Coverage ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="container-xl">
            <AnimateIn className="text-center mb-14">
              <span className="section-tag mb-4">
                <BookOpen size={13} className="inline mr-1" /> Exam Coverage
              </span>
              <h2 className="section-heading mb-4">Built for India&apos;s Hardest Exams</h2>
              <p className="section-subheading mx-auto">
                Each exam gets its own dedicated adaptive engine — not a generic question bank.
              </p>
            </AnimateIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-5">
              {EXAM_COVERAGE.map(({ name, abbr, label, desc, color }) => (
                <StaggerItem key={name}>
                  <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold"
                        style={{ backgroundColor: color }}
                      >
                        {abbr}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
                        <h3 className="text-lg font-bold text-primary-500 mb-2 group-hover:text-teal transition-colors">
                          {name}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    <Link
                      href="/exams"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5 transition-gap duration-200"
                      style={{ color }}
                    >
                      View {name} Tests <ArrowRight size={13} />
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimateIn delay={0.2} className="text-center mt-8">
              <Link href="/exams" className="btn-outline inline-flex items-center gap-2">
                View All Exam Categories <ArrowRight size={15} />
              </Link>
            </AnimateIn>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: DARK }} className="py-20 md:py-28">
          <div className="container-xl max-w-5xl">
            <AnimateIn className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                From Day 1 Diagnostic to Exam Day
              </h2>
              <p className="text-white/55 text-lg max-w-2xl mx-auto">
                Three AI loops working together from your very first session — each one feeding the next.
              </p>
            </AnimateIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
                <StaggerItem key={step}>
                  <div
                    className="rounded-2xl p-7 border border-white/8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="text-5xl font-black mb-4 leading-none" style={{ color: `${EMERALD}35` }}>
                      {step}
                    </div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${EMERALD}20` }}
                    >
                      <Icon size={20} style={{ color: EMERALD }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimateIn delay={0.3} className="text-center mt-12">
              <Link
                href="/free-assessment"
                className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-xl text-base transition-all duration-200 active:scale-95 hover:brightness-110"
                style={{ backgroundColor: EMERALD, color: "#fff" }}
              >
                Start Free — Take the Diagnostic <ArrowRight size={17} />
              </Link>
              <p className="text-white/35 text-sm mt-3">No registration · No credit card · 20 minutes</p>
            </AnimateIn>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-xl">
            <AnimateIn className="text-center mb-14">
              <span className="section-tag mb-4">
                <Trophy size={13} className="inline mr-1" /> Student Results
              </span>
              <h2 className="section-heading mb-4">Aspirants Who Cracked It With GetVidyaAI</h2>
            </AnimateIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(({ name, exam, rating, quote }) => (
                <StaggerItem key={name}>
                  <div className="card p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex gap-0.5">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} size={15} className="fill-current" style={{ color: GOLD }} />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                    <div>
                      <div className="font-semibold text-primary-500 text-sm">{name}</div>
                      <div className="text-xs text-teal font-medium">{exam}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Pricing Callout ───────────────────────────────────────────────── */}
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="container-xl max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <AnimateIn variant="fadeLeft">
                <h2 className="text-3xl font-bold text-primary-500 mb-4">
                  Full Access for{" "}
                  <span style={{ color: EMERALD }}>₹149/month</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6">
                  Less than ₹5 per day. GetVidyaAI Vidya Pass unlocks unlimited adaptive practice,
                  all 1,400+ mock tests, 140,000+ MCQs, AI study plans, and weekly current affairs MCQs.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Unlimited adaptive AI practice sessions",
                    "1,400+ full-length and subject-wise mock tests",
                    "Weekly AI study plan rebuilt every Sunday",
                    "Daily current affairs in MCQ format",
                    "Topic Sprint drills for micro-weakness elimination",
                    "Progress analytics with accuracy and difficulty tracking",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: EMERALD }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-95 text-white hover:brightness-110"
                    style={{ backgroundColor: EMERALD }}
                  >
                    See Pricing Plans <ArrowRight size={15} />
                  </Link>
                  <Link href="/free-assessment" className="btn-outline text-sm px-7 py-3.5">
                    Try Free First
                  </Link>
                </div>
              </AnimateIn>

              <AnimateIn variant="fadeRight">
                <div
                  className="rounded-2xl p-8 border text-center"
                  style={{ backgroundColor: DARK, borderColor: `${EMERALD}30` }}
                >
                  <div className="text-6xl font-black mb-2" style={{ color: EMERALD }}>₹149</div>
                  <div className="text-white/60 text-sm mb-6">per month · cancel anytime</div>

                  <div className="space-y-3 text-left mb-8">
                    {[
                      { label: "Testbook Pass",  price: "₹700–₹2,000/mo", strike: true },
                      { label: "Adda247 Prime",  price: "₹499–₹1,500/mo", strike: true },
                      { label: "GetVidyaAI",     price: "₹149/mo",        strike: false },
                    ].map(({ label, price, strike }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-xl px-4 py-3 border text-sm transition-all duration-200"
                        style={
                          !strike
                            ? { borderColor: `${EMERALD}40`, backgroundColor: `${EMERALD}12` }
                            : { borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" }
                        }
                      >
                        <span className={strike ? "text-white/40 line-through" : "text-white font-semibold"}>
                          {label}
                        </span>
                        <span
                          className={strike ? "text-white/30 line-through" : "font-bold"}
                          style={!strike ? { color: EMERALD } : {}}
                        >
                          {price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="text-xs px-4 py-2.5 rounded-xl"
                    style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
                  >
                    80% cheaper than the market average — same adaptive AI engine
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="container-xl max-w-3xl">
            <AnimateIn className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-500 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-500">Everything you need to know about GetVidyaAI&apos;s adaptive engine</p>
            </AnimateIn>

            <StaggerContainer className="space-y-3">
              {FAQS.map(({ q, a }) => (
                <StaggerItem key={q}>
                  <details className="group border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-slate-300 transition-colors">
                    <summary className="font-semibold text-slate-800 list-none flex justify-between items-center gap-4 text-sm">
                      {q}
                      <span className="text-slate-400 group-open:rotate-45 transition-transform duration-300 shrink-0 text-xl leading-none">
                        +
                      </span>
                    </summary>
                    <p className="text-slate-600 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-100">
                      {a}
                    </p>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────────── */}
        <section
          style={{ backgroundColor: DARK }}
          className="py-24 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none animate-pulse-soft"
            style={{ backgroundColor: EMERALD, opacity: 0.1 }}
          />

          <div className="container-xl relative z-10 max-w-2xl">
            <AnimateIn>
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: GOLD }}>
                Start Today — Free
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                The Cutoff Doesn&apos;t Move.<br />
                <span style={{ color: EMERALD }}>Your Preparation Can.</span>
              </h2>
              <p className="text-white/55 text-lg mb-10 leading-relaxed">
                Take the free 25-question diagnostic. GetVidyaAI maps your weak subjects in 20 minutes
                and builds a personalized study plan before your first session ends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/free-assessment"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-xl text-base transition-all duration-200 active:scale-95 hover:brightness-110"
                  style={{ backgroundColor: EMERALD, color: "#fff" }}
                >
                  Take Free Diagnostic Test <ArrowRight size={17} />
                </Link>
                <Link
                  href={PLAY_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-xl text-base border border-white/20 text-white/90 hover:bg-white/10 transition-all duration-200 active:scale-95"
                >
                  <Smartphone size={17} /> Download App — Free
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

      </main>

      <Footer />

    </>
  );
}
