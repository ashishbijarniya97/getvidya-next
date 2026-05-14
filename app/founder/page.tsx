import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/home/CTA";
import { generateSEO } from "@/lib/seo";
import {
  ArrowRight,
  Award,
  Brain,
  Briefcase,
  Building2,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Hotel,
  Instagram,
  Layers,
  Lightbulb,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateSEO({
  title: "Ashish Bijarniya — Founder & CEO, GetVidya",
  description:
    "Ashish Bijarniya is the Founder & CEO of GetVidya — India's AI-powered government exam prep platform. 7+ years across Microsoft, BYJU'S, zazzy. Acquired Clatmaxx. Startup Mentor at Manipal University Jaipur (AIC-MUJ). MBA, DY Patil University.",
  canonical: "https://getvidya.in/founder",
  keywords: [
    "Ashish Bijarniya",
    "GetVidya founder",
    "Prepdot Solutions founder",
    "EdTech founder India",
    "Startup mentor AIC-MUJ Manipal University Jaipur",
    "Clatmaxx acquisition",
    "Microsoft BYJU's operator",
    "AI exam prep India founder",
    "Tier 2 EdTech startup India",
    "MAARG mentor startup India",
    "Vidya-1 AI model India",
    "DY Patil MBA entrepreneur",
  ],
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashish Bijarniya",
  jobTitle: "Founder & CEO",
  description:
    "Operator with 7+ years across Microsoft, BYJU'S, zazzy, and GetVidya. Acquired Clatmaxx. Startup Mentor at AIC-MUJ, Manipal University Jaipur. Building India's first AI model for government exam preparation.",
  worksFor: {
    "@type": "Organization",
    name: "GetVidya (Prepdot Solutions Pvt. Ltd.)",
    url: "https://getvidya.in",
  },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "DY Patil University", description: "MBA, Marketing (2023–2025)" },
    { "@type": "EducationalOrganization", name: "Manipal University Jaipur", description: "BCom, Marketing (2016–2019)" },
    { "@type": "EducationalOrganization", name: "The Indian High School Dubai" },
  ],
  knowsAbout: [
    "Product Lifecycle Management",
    "Revenue Management",
    "Operational Excellence",
    "AI-powered exam preparation",
    "EdTech startup building",
    "Startup mentorship",
    "Go-to-market strategy",
  ],
  homeLocation: { "@type": "Place", name: "Pune, Maharashtra, India" },
  url: "https://getvidya.in/founder",
  sameAs: [
    "https://www.linkedin.com/in/ashishbijarniya",
    "https://www.instagram.com/ashish_bijarniya",
    "https://x.com/bijarniyaashish",
  ],
  email: "ashish@getvidya.in",
};

const timeline = [
  {
    year: "Mar–May 2018",
    org: "OYO",
    title: "Intern",
    location: "Jaipur, Rajasthan",
    desc: "First exposure to hospitality tech at scale — how OYO was using standardisation and data to disrupt an unorganised industry. The playbook that later shaped Mangalam Hotel's transformation.",
    icon: Hotel,
    color: "bg-rose-50 text-rose-500",
  },
  {
    year: "Jun 2019 – Jul 2020",
    org: "Microsoft",
    title: "Technical Sales",
    location: "Delhi, India",
    desc: "Sold enterprise cloud solutions at Microsoft — working with decision-makers on complex, high-value technical deals. Learned how world-class technology is packaged and sold. Also noticed how little of it was built for India's non-metro majority.",
    icon: Building2,
    color: "bg-blue-50 text-blue-600",
  },
  {
    year: "Apr – Sep 2021",
    org: "BYJU'S",
    title: "Business Development Manager",
    location: "Jaipur",
    desc: "Worked inside India's then-largest EdTech. Saw the gap from the inside: a ₹80,000 course optimised for metro parents with tablets and stable WiFi — fundamentally inaccessible to a student from Sikar, Jhunjhunu, or Churu.",
    icon: GraduationCap,
    color: "bg-orange-50 text-orange-600",
  },
  {
    year: "Sep 2021 – Sep 2022",
    org: "Biddano",
    title: "Marketing",
    location: "Maharashtra, India",
    desc: "Built and executed marketing systems for a consumer startup. Developed the precision-marketing muscle — KPIs, funnel optimisation, and performance tracking — that now runs GetVidya's district growth engine.",
    icon: TrendingUp,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    year: "Sep 2022 – Sep 2024",
    org: "zazzy",
    title: "Head of Growth & Portfolio Expansion",
    location: "Pune, Maharashtra",
    desc: "Led business development, strategic planning, and client relationship management across zazzy's portfolio. Ran full-cycle growth operations: market research, competitive analysis, GTM strategy, and cross-functional execution. Built the operator instinct that GetVidya runs on.",
    icon: Briefcase,
    color: "bg-purple-50 text-purple-600",
  },
  {
    year: "Sep 2024 – Present",
    org: "GetVidya",
    title: "CEO & Co-Founder",
    location: "Pune, Maharashtra",
    desc: "Built the entire platform from zero — Flutter app, Next.js API, Supabase DB, AI question pipeline. Acquired Clatmaxx under Prepdot Solutions. 50,000+ students. Represented GetVidya in the MAARG portal. Building Vidya-1: India's first exam-focused AI model.",
    icon: Rocket,
    color: "bg-mint text-primary-500",
  },
  {
    year: "Aug 2025 – Present",
    org: "Mangalam Hotel & Restaurant",
    title: "Managing Director",
    location: "Lachhmangarh, Sikar, Rajasthan",
    desc: "Led full digital and operational transformation: AI-driven inventory management, real-time business intelligence, custom delivery app, POS-AI integration, and hyper-local SEO targeting NH52 and Mody University traffic. Premium pure-vegetarian fine-dining — run like a tech company.",
    icon: Hotel,
    color: "bg-amber-50 text-amber-600",
  },
  {
    year: "Sep 2025 – Present",
    org: "Manipal University Jaipur",
    title: "Startup Mentor · AIC-MUJ",
    location: "Jaipur, Rajasthan",
    desc: "Mentors early-stage founders and student innovators via AIC-MUJ and the MAARG portal. Sessions cover product-market fit, lean startup methodology, startup law essentials, and investor storytelling. Also collaborates on demo days, pitch reviews, and startup competitions.",
    icon: Users,
    color: "bg-teal-50 text-teal-600",
  },
];

const education = [
  {
    degree: "MBA — Marketing",
    school: "DY Patil University",
    period: "January 2023 – January 2025",
  },
  {
    degree: "BCom — Marketing",
    school: "Manipal University Jaipur",
    period: "July 2016 – April 2019",
  },
  {
    degree: "High School Diploma",
    school: "The Indian High School, Dubai",
    period: "",
  },
];

const skills = [
  "Product Lifecycle Management",
  "Revenue Management",
  "Operational Excellence",
  "Go-to-Market Strategy",
  "AI-First Infrastructure",
  "Startup Mentorship",
  "M&A Integration",
  "Lean Startup Methodology",
];

const techStack = [
  {
    name: "Supabase",
    role: "Database & Auth",
    desc: "PostgreSQL with pgBouncer pooling. Stores 5,000+ AI-validated questions, student profiles, and adaptive difficulty state.",
    icon: Database,
  },
  {
    name: "Claude AI",
    role: "AI Research & Reasoning",
    desc: "Anthropic's Claude powers content strategy, platform intelligence, and forms the research backbone of Vidya-1 — India's first exam-focused AI model.",
    icon: Brain,
  },
  {
    name: "Groq + LLaMA 3.3",
    role: "Question Generation",
    desc: "300–400 fresh MCQs generated every night. Groq's inference speed makes real-time question generation viable at near-zero marginal cost.",
    icon: Zap,
  },
  {
    name: "Gemini Flash",
    role: "AI Quality Gate",
    desc: "Every Groq-generated question passes through Gemini's validation — checking curriculum alignment, answer correctness, and distractor quality before hitting the DB.",
    icon: Sparkles,
  },
  {
    name: "Next.js 14",
    role: "Platform & Website",
    desc: "App Router with server components. Both getvidya.in and api.getvidya.in run on Next.js deployed on Vercel with Netlify as CDN backup.",
    icon: Layers,
  },
  {
    name: "Flutter",
    role: "Mobile App",
    desc: "Single codebase for Android. Works on ₹6,000 devices. Under 15MB APK. Offline-capable question caching for students with spotty 4G connectivity.",
    icon: Smartphone,
  },
  {
    name: "Vercel + Netlify",
    role: "Deployment & CDN",
    desc: "Zero-config deployments on every git push. Vercel Cron Jobs trigger nightly AI batch at 01:30 UTC. Global CDN for sub-100ms response across Rajasthan.",
    icon: Server,
  },
  {
    name: "Prisma ORM",
    role: "Data Layer",
    desc: "Type-safe DB queries across 15+ models. Adaptive difficulty, referral tracking, AI practice logs — all schema-defined with full migration history.",
    icon: Code2,
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "District Penetration",
    period: "Now → Month 6",
    items: [
      "Play Store launch — v1.0.12",
      "5 Sikar district colleges onboarded",
      "500 MAU, 25 Pro subscribers",
      "Institute B2B pilot (Sikar coaching centers)",
    ],
    status: "active",
  },
  {
    phase: "Phase 2",
    title: "Referral Multiplication",
    period: "Month 7 → 12",
    items: [
      "Referral engine live (Victory, Near Miss, Streak triggers)",
      "OneSignal exam countdown push notifications",
      "3,000 MAU, 150 Pro subscribers",
      "₹3L cumulative revenue milestone",
    ],
    status: "planned",
  },
  {
    phase: "Phase 3",
    title: "Vidya-1 & Scale",
    period: "Month 13 → 24",
    items: [
      "Vidya-1 v1.0 in production — India's first exam-focused AI",
      "50,000+ PYQ training dataset curated",
      "All 33 Rajasthan districts active",
      "Series A raise: ₹3–5 crore",
    ],
    status: "planned",
  },
];

const socialProof = [
  {
    quote: "GetVidyaAI identified my weak areas in Reasoning in the first week. I cleared SSC CGL Tier-1 after 3 months of prep on GetVidya.",
    name: "Priya Sharma",
    location: "Sikar, Rajasthan",
    exam: "SSC CGL 2025",
  },
  {
    quote: "At ₹149/month, this gives me more than a ₹30,000 coaching centre. The AI study plan is genuinely different from anything else I've tried.",
    name: "Rahul Verma",
    location: "Jhunjhunu, Rajasthan",
    exam: "Railway NTPC",
  },
  {
    quote: "I was doing 2 hours of random practice every day. GetVidya's diagnostic test showed me I was wasting time on my strong subjects. Game changer.",
    name: "Anjali Meena",
    location: "Churu, Rajasthan",
    exam: "RPSC RAS",
  },
];

const stats = [
  { value: "7+", label: "Years Operating" },
  { value: "50,000+", label: "Students on GetVidya" },
  { value: "140K+", label: "MCQs in Bank" },
  { value: "1", label: "Acquisition (Clatmaxx)" },
  { value: "2", label: "Ventures Running Simultaneously" },
];

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />
      <main className="pt-20">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-hero py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-teal/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container-xl relative">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* text — takes 3 cols */}
              <div className="lg:col-span-3">
                <span className="section-tag mb-6 !bg-white/10 !text-white/90">
                  <MapPin size={14} />
                  Pune, Maharashtra · Laxmangarh, Rajasthan
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  The Operator building{" "}
                  <br className="hidden md:block" />
                  <span className="gradient-text">for Bharat's next generation</span>
                </h1>

                <p className="text-white/70 text-xl mb-4 leading-relaxed">
                  <strong className="text-white">Ashish Bijarniya</strong> — Founder & CEO of GetVidya.
                  7+ years turning complex operational challenges into streamlined, profitable systems
                  across global tech (Microsoft), hyper-growth startups (BYJU'S, zazzy), and his own ventures.
                </p>
                <p className="text-white/60 text-lg mb-10 leading-relaxed">
                  Acquired Clatmaxx. Built GetVidya to 50,000+ students. Mentors early-stage founders
                  at AIC-MUJ via MAARG. Now building Vidya-1 — India's first AI model trained
                  exclusively for government exam preparation.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/ai-study-plan" className="btn-primary text-base px-8 py-3.5">
                    Explore the AI Study Plan
                    <ArrowRight size={18} />
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/ashishbijarniya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-base px-8 py-3.5"
                  >
                    Connect on LinkedIn
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* LinkedIn profile card — takes 2 cols */}
              <div className="lg:col-span-2">
                <div className="glass-card p-6 relative">
                  {/* LinkedIn badge strip */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                        <Link2 size={16} className="text-white" />
                      </div>
                      <span className="text-white/70 text-sm font-medium">LinkedIn Profile</span>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/ashishbijarniya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-xs font-semibold hover:underline flex items-center gap-1"
                    >
                      View Full Profile <ExternalLink size={11} />
                    </a>
                  </div>

                  {/* avatar placeholder + name */}
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal to-accent flex items-center justify-center text-primary-500 font-bold text-2xl flex-shrink-0">
                      AB
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg leading-tight">Ashish Bijarniya</div>
                      <div className="text-white/60 text-sm mt-0.5 leading-snug">
                        Building GetVidya | Helping Tier 2 & Tier 3 India crack Govt Exams
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <MapPin size={11} className="text-white/40" />
                        <span className="text-white/40 text-xs">Pune District, Maharashtra, India</span>
                      </div>
                    </div>
                  </div>

                  {/* top skills */}
                  <div className="mb-5">
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2.5">
                      Top Skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Product Lifecycle Management", "Revenue Management", "Operational Excellence"].map((s) => (
                        <span key={s} className="text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* current roles */}
                  <div className="mb-5">
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2.5">
                      Current Roles
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { org: "GetVidya", role: "CEO & Co-Founder", since: "Sep 2024" },
                        { org: "Mangalam Hotel", role: "Managing Director", since: "Aug 2025" },
                        { org: "Manipal Univ. Jaipur", role: "Startup Mentor · AIC-MUJ", since: "Sep 2025" },
                      ].map(({ org, role, since }) => (
                        <div key={org} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <div>
                            <span className="text-white text-sm font-medium">{org}</span>
                            <span className="text-white/50 text-sm"> · {role}</span>
                            <div className="text-white/30 text-xs">{since} – Present</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* contact */}
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <a href="mailto:ashish@getvidya.in" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm">
                      <Mail size={13} />
                      ashish@getvidya.in
                    </a>
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href="https://www.instagram.com/ashish_bijarniya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-white/50 hover:text-pink-400 transition-colors text-xs"
                      >
                        <Instagram size={13} />
                        @ashish_bijarniya
                      </a>
                      <span className="text-white/20">·</span>
                      <a
                        href="https://x.com/bijarniyaashish"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-white/50 hover:text-white/90 transition-colors text-xs"
                      >
                        <Twitter size={13} />
                        @bijarniyaashish
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────────────────────── */}
        <section className="py-14 bg-primary-500">
          <div className="container-xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{value}</div>
                  <div className="text-white/60 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IN HIS OWN WORDS ─────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <span className="section-tag mb-6">In His Own Words</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-8 leading-tight">
                An operator who thrives between idea and scalable reality
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  With over 7 years of experience across global tech giants (Microsoft),
                  hyper-growth startups (BYJU'S), and building my own ventures (GetVidya,
                  Mangalam Hotel), I specialise in turning complex operational challenges into
                  streamlined, profitable systems.
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Founder's Grit",
                      body: "Scaled products from zero to thousands of users on shoestring budgets and navigated the complexities of M&A — successfully integrating Clatmaxx under Prepdot Solutions.",
                    },
                    {
                      title: "Operational Systems",
                      body: "Whether it's managing a physical hospitality business or a digital EdTech platform, I build the SOPs that allow teams to scale without breaking.",
                    },
                    {
                      title: "Strategic Growth",
                      body: "From high-value technical sales at Microsoft to pioneering affordable exam prep for Tier 2/3 India — I know how to find product-market fit and drive revenue.",
                    },
                    {
                      title: "Tech-Forward Execution",
                      body: "I leverage AI and modern tooling (Supabase, Claude AI, Netlify) to build lean infrastructure that reduces burn and increases speed to market.",
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="bg-slate-50 rounded-2xl p-5">
                      <h3 className="font-bold text-primary-500 mb-2">{title}</h3>
                      <p className="text-slate-500 text-base leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500">
                  Currently mentoring early-stage founders via the{" "}
                  <strong className="text-primary-500">MAARG portal</strong> and{" "}
                  <strong className="text-primary-500">AIC-MUJ</strong>, while building GetVidya
                  into India's definitive government exam prep platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL CAREER TIMELINE ─────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="container-xl">
            <div className="text-center mb-16">
              <span className="section-tag mb-4">Career Timeline</span>
              <h2 className="section-heading mb-4">A track record built in the field</h2>
              <p className="section-subheading mx-auto">
                Every role — from OYO intern to Microsoft technical sales to GetVidya CEO —
                built a specific muscle. Here's how they stack.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-mint-dark" />

                <div className="space-y-8">
                  {timeline.map(({ year, org, title, location, desc, icon: Icon, color }) => (
                    <div key={`${org}-${title}`} className="flex gap-6 items-start">
                      {/* icon dot */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 shadow-card ${color}`}>
                        <Icon size={20} />
                      </div>

                      {/* card */}
                      <div className="card p-5 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="font-bold text-primary-500 text-lg leading-tight">{org}</div>
                            <div className="text-teal font-semibold text-sm">{title}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                              {year}
                            </div>
                            <div className="flex items-center justify-end gap-1 mt-0.5 text-slate-400 text-xs">
                              <MapPin size={10} />
                              {location}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ────────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center">
                  <GraduationCap size={20} className="text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-primary-500">Education</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {education.map(({ degree, school, period }) => (
                  <div key={school} className="card p-5">
                    <div className="w-8 h-8 rounded-xl bg-mint flex items-center justify-center mb-3">
                      <Award size={16} className="text-primary-500" />
                    </div>
                    <div className="font-bold text-primary-500 text-sm leading-tight mb-1">{degree}</div>
                    <div className="text-teal font-semibold text-sm">{school}</div>
                    {period && <div className="text-slate-400 text-xs mt-1">{period}</div>}
                  </div>
                ))}
              </div>

              {/* skills strip */}
              <div className="mt-10">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  Core Skills
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="text-sm font-medium bg-mint text-primary-500 px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PEEK BEHIND THE CURTAINS ─────────────────────────────────────── */}
        <section className="py-24 bg-primary-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(97,177,164,0.15)_0%,_transparent_60%)] pointer-events-none" />
          <div className="container-xl relative">
            <div className="text-center mb-16">
              <span className="section-tag mb-4 !bg-white/10 !text-white/90">
                <Code2 size={14} />
                Peek Behind the Curtains
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How GetVidya is actually built
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                No agency. Lean infrastructure. AI-first execution. Every tool chosen to reduce
                burn and increase speed to market — the operator's approach to product building.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {techStack.map(({ name, role, desc, icon: Icon }) => (
                <div key={name} className="glass-card p-6 group hover:bg-white/15 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <div className="text-xs font-semibold text-teal uppercase tracking-widest mb-1">
                    {role}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{name}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VIDYA-1 ──────────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="section-tag mb-6">
                  <Sparkles size={14} />
                  R&D Initiative
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6 leading-tight">
                  Vidya-1: India's first<br />exam-focused AI model
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-5">
                  Every AI model powering exam prep today — GPT-4, LLaMA, Gemini — is a
                  general-purpose model. They were not trained on the RPSC RAS syllabus.
                  They don't understand Rajasthani student error patterns in Quantitative
                  Aptitude. They hallucinate exam dates.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Vidya-1 is a fine-tuned language model trained exclusively on 10+ years of
                  SSC, Railway, UPSC, and RPSC Previous Year Questions — plus 5,000+
                  validated questions from GetVidya's own growing database. Designed to
                  generate questions, solve doubts, and explain concepts natively in the
                  context of India's 2 crore government exam aspirants.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["SSC CGL PYQ corpus", "RPSC RAS syllabus-aware", "Hinglish doubt resolution", "Zero hallucination guardrails", "Open academic license"].map((tag) => (
                    <span key={tag} className="text-sm font-medium bg-mint text-primary-500 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-primary-500 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="text-accent font-bold text-sm uppercase tracking-widest mb-6">
                    Phase 1 — In Progress
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "PYQ Dataset Target", value: "50,000+ questions" },
                      { label: "Sources", value: "SSC, Railway, UPSC, RPSC (public domain)" },
                      { label: "Base Model", value: "LLaMA 3 / Mistral (open-weight)" },
                      { label: "Compute", value: "Cloud GPU — Together AI / Lambda Labs" },
                      { label: "Phase 1 Budget", value: "₹2.4L (SISFS-funded)" },
                      { label: "License", value: "Academic open-license for other EdTechs" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                        <span className="text-white/60 text-sm">{label}</span>
                        <span className="text-white font-semibold text-sm text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGIC ROADMAP ────────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="container-xl">
            <div className="text-center mb-16">
              <span className="section-tag mb-4">
                <Lightbulb size={14} />
                Strategic Roadmap
              </span>
              <h2 className="section-heading mb-4">Three phases. One direction.</h2>
              <p className="section-subheading mx-auto">
                The same playbook used at Mangalam Hotel — start with one hyper-local problem,
                solve it completely, then scale the model across verticals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {roadmap.map(({ phase, title, period, items, status }) => (
                <div
                  key={phase}
                  className={`card p-8 relative overflow-hidden ${status === "active" ? "border-2 border-teal" : ""}`}
                >
                  {status === "active" && (
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-soft" />
                        Active Now
                      </span>
                    </div>
                  )}
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{phase}</div>
                  <h3 className="text-xl font-bold text-primary-500 mb-1">{title}</h3>
                  <p className="text-sm text-slate-400 mb-6">{period}</p>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container-xl">
            <div className="text-center mb-16">
              <span className="section-tag mb-4">
                <Star size={14} />
                Social Proof
              </span>
              <h2 className="section-heading mb-4">Voices from the field</h2>
              <p className="section-subheading mx-auto">
                From Rajasthan's Tier-2 districts — the exact students GetVidya was built for.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {socialProof.map(({ quote, name, location, exam }) => (
                <div key={name} className="card p-7 flex flex-col">
                  <MessageCircle size={24} className="text-teal mb-4" />
                  <p className="text-slate-600 leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="font-bold text-primary-500">{name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={12} className="text-slate-400" />
                      <span className="text-slate-400 text-sm">{location}</span>
                    </div>
                    <span className="inline-block mt-2 text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                      {exam}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* dual-domain leadership */}
            <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                  EdTech Leadership
                </div>
                <h3 className="text-white font-bold text-xl mb-4">GetVidya & Clatmaxx</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Building India's most affordable AI exam prep platform under Prepdot Solutions Pvt. Ltd.
                  Acquired Clatmaxx to expand the exam portfolio. Represented GetVidya in the MAARG portal
                  initiative, aligning with national mentorship and scalability standards.
                  Mentoring the next generation at AIC-MUJ, Manipal University Jaipur.
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                  Hospitality & AI Operations
                </div>
                <h3 className="text-white font-bold text-xl mb-4">Mangalam Hotel, NH52</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Led full digital and operational transformation at Mangalam Hotel, Lachhmangarh —
                  AI inventory management, custom delivery app, POS integration, La Carimali equipment,
                  and hyper-local SEO targeting NH52 and Mody University traffic. Innovation that
                  honours heritage while serving guests more efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONNECT CTA ──────────────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-tag mb-6 mx-auto">
                <Users size={14} />
                Work Together
              </span>
              <h2 className="section-heading mb-6">
                For students. For founders.
                <br />
                <span className="gradient-text">For builders from Bharat.</span>
              </h2>
              <p className="section-subheading mx-auto mb-10">
                If you're a student preparing for SSC, Railway, UPSC, or RPSC — start your AI
                study plan today. If you're an early-stage founder building in EdTech, consumer,
                or SaaS — Ashish mentors via the <strong>MAARG portal at AIC-MUJ</strong>,
                Manipal University Jaipur.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link href="/ai-study-plan" className="btn-primary text-base px-8 py-4">
                  Explore the AI Study Plan
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="https://www.linkedin.com/in/ashishbijarniya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-base px-8 py-4"
                >
                  Connect on LinkedIn
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* contact strip */}
              <div className="flex flex-wrap justify-center gap-5 text-slate-500 text-sm">
                <a href="mailto:ashish@getvidya.in" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                  <Mail size={15} />
                  ashish@getvidya.in
                </a>
                <a
                  href="https://www.linkedin.com/in/ashishbijarniya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#0A66C2] transition-colors"
                >
                  <Link2 size={15} />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/ashish_bijarniya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                >
                  <Instagram size={15} />
                  @ashish_bijarniya
                </a>
                <a
                  href="https://x.com/bijarniyaashish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary-500 transition-colors"
                >
                  <Twitter size={15} />
                  @bijarniyaashish
                </a>
              </div>

              <p className="mt-6 text-slate-400 text-sm">
                Mentorship for early-stage founders available through the{" "}
                <strong className="text-primary-500">MAARG network</strong> —
                AIC-MUJ, Manipal University Jaipur.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
