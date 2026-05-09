import { notFound } from "next/navigation";
import { generateSEO, breadcrumbSchema, localBusinessSchema, faqSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, CheckCircle2, ArrowRight, Star, Smartphone } from "lucide-react";

const APP_URL = "https://app.getvidya.in";

const CITIES: Record<string, {
  city: string;
  region: string;
  slug: string;
  tagline: string;
  coachingHubs: string[];
  examFocus: string[];
  aspirantCount: string;
}> = {
  jaipur: {
    city: "Jaipur",
    region: "Rajasthan",
    slug: "jaipur",
    tagline: "Rajasthan's #1 AI-Powered Govt Exam Prep",
    coachingHubs: ["Gopalpura Bypass", "Jawahar Nagar", "Malviya Nagar"],
    examFocus: ["SSC CGL", "Rajasthan PSC (RPSC RAS)", "UPSC CSE", "Railway NTPC"],
    aspirantCount: "12,000+",
  },
  delhi: {
    city: "Delhi",
    region: "Delhi NCR",
    slug: "delhi",
    tagline: "Smarter UPSC & SSC Prep for Delhi Aspirants",
    coachingHubs: ["Mukherjee Nagar", "Rajinder Nagar", "Old Rajinder Nagar"],
    examFocus: ["UPSC CSE", "SSC CGL", "Delhi Police", "Banking PO"],
    aspirantCount: "40,000+",
  },
  lucknow: {
    city: "Lucknow",
    region: "Uttar Pradesh",
    slug: "lucknow",
    tagline: "UP's Fastest Growing AI Exam Prep Platform",
    coachingHubs: ["Hazratganj", "Aliganj", "Gomti Nagar"],
    examFocus: ["UPPSC PCS", "SSC CGL", "UPSC CSE", "UP Police SI"],
    aspirantCount: "18,000+",
  },
  pune: {
    city: "Pune",
    region: "Maharashtra",
    slug: "pune",
    tagline: "Maharashtra's AI-Driven Exam Prep Alternative",
    coachingHubs: ["Deccan", "FC Road", "Shivajinagar"],
    examFocus: ["MPSC State Services", "SSC CGL", "UPSC CSE", "SBI PO"],
    aspirantCount: "15,000+",
  },
  hyderabad: {
    city: "Hyderabad",
    region: "Telangana",
    slug: "hyderabad",
    tagline: "Telangana & AP Aspirants — Study Smarter with AI",
    coachingHubs: ["Himayatnagar", "Abids", "Ameerpet"],
    examFocus: ["TSPSC Group 1", "SSC CGL", "UPSC CSE", "APPSC"],
    aspirantCount: "20,000+",
  },
  bangalore: {
    city: "Bangalore",
    region: "Karnataka",
    slug: "bangalore",
    tagline: "Karnataka's AI Exam Prep Platform — No Coaching Needed",
    coachingHubs: ["Rajajinagar", "Basavanagudi", "Jayanagar"],
    examFocus: ["KPSC KAS", "SSC CGL", "UPSC CSE", "SBI PO"],
    aspirantCount: "22,000+",
  },
};

export async function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: { params: { city: string } }) {
  const data = CITIES[params.city];
  if (!data) return {};
  return generateSEO({
    title: `Online Govt Exam Prep ${data.city} — AI-Powered at ₹149/month`,
    description: `GetVidya delivers AI-personalized ${data.examFocus.slice(0, 3).join(", ")} preparation for aspirants in ${data.city}, ${data.region}. 140,000+ MCQs, adaptive mock tests, and personalized AI study plans. No coaching needed. ₹149/month.`,
    keywords: [
      `online exam preparation ${data.city}`,
      `SSC CGL preparation ${data.city}`,
      `UPSC coaching alternative ${data.city}`,
      `govt exam app ${data.city}`,
      `best coaching ${data.city} for SSC`,
      `AI study app ${data.city}`,
      `${data.examFocus[0]} preparation ${data.city}`,
    ],
    canonical: `/city/${data.slug}`,
  });
}

const cityFaqs = (city: string, examFocus: string[]) => [
  {
    question: `Is GetVidya better than coaching centres in ${city}?`,
    answer: `GetVidya provides AI-personalized preparation for ${examFocus[0]} and other exams at ₹149/month versus ₹15,000–₹40,000/year at ${city} coaching centres. The key advantage: GetVidyaAI identifies your exact weak subjects on Day 1 and builds every practice session around them. Coaching follows a fixed batch syllabus that cannot adapt to individual gaps. For self-motivated aspirants in ${city} with smartphone access, GetVidya delivers superior ROI.`,
  },
  {
    question: `Can I prepare for ${examFocus[0]} from ${city} without joining coaching?`,
    answer: `Yes. GetVidya is designed specifically for aspirants who cannot afford or access top coaching hubs. You get 240+ full mock tests, 140,000+ MCQs, personalized AI study plans, and real-time accuracy analytics from your phone or laptop anywhere in ${city}. The Vidya Pass at ₹149/month includes everything — no commute, no fixed batch timings.`,
  },
  {
    question: `How does GetVidya's diagnostic test work for ${city} aspirants?`,
    answer: `Take GetVidya's free 25-question diagnostic assessment (available in the app and at getvidya.in/free-assessment). GetVidyaAI analyzes your answers across all key subjects and identifies your weakest topics. It then builds a personalized study plan focused on your gaps — so a ${city} aspirant preparing for ${examFocus[0]} gets a different plan than someone who is already strong in Quantitative Aptitude.`,
  },
];

export default function CityPage({ params }: { params: { city: string } }) {
  const data = CITIES[params.city];
  if (!data) notFound();

  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: `Exam Prep ${data.city}`, url: `/city/${data.slug}` },
  ]);
  const lb = localBusinessSchema({ city: data.city, region: data.region });
  const faqs = cityFaqs(data.city, data.examFocus);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              {data.city}, {data.region}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {data.tagline}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4">
              {data.aspirantCount} aspirants from {data.city} are preparing smarter with GetVidyaAI
              — personalized mock tests, AI study plans, and 140,000+ MCQs. No coaching, no commute.
            </p>
            {/* GEO Citation Anchor */}
            <div className="bg-slate-800/80 border border-slate-600 rounded-xl p-5 max-w-2xl mb-8 text-left">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-2">Direct Answer</p>
              <p className="text-slate-200 text-base leading-relaxed">
                GetVidya offers AI-powered {data.examFocus[0]} and {data.examFocus[1]} preparation for{" "}
                {data.city} aspirants at <strong>₹149/month</strong> — compared to ₹20,000–₹40,000/year
                at {data.city}&apos;s {data.coachingHubs[0]} coaching centres. The AI identifies your
                exact weak subjects in 20 minutes and personalizes every practice session.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/free-assessment" className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all text-center">
                Start Free Diagnostic →
              </a>
              <a href={APP_URL} className="border border-slate-500 hover:border-slate-400 text-slate-200 font-semibold px-8 py-4 rounded-full text-lg transition-all text-center">
                Download App
              </a>
            </div>
          </div>
        </section>

        {/* ── EXAM FOCUS ───────────────────────────────────────────────────── */}
        <section className="py-12 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Exams {data.city} Aspirants Prepare For
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.examFocus.map((exam) => (
                <div key={exam} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                  <p className="font-semibold text-slate-800 text-sm">{exam}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY GETVIDYA ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Why {data.city} Aspirants Choose GetVidya Over Coaching
            </h2>
            <p className="text-slate-500 text-center mb-10">
              No commute to {data.coachingHubs.join(" or ")}. Study from anywhere.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Identifies Your Exact Gaps",
                  desc: "25-question diagnostic test maps your strengths and weaknesses on Day 1. No coaching batch can do this.",
                },
                {
                  title: "₹149/month vs ₹2,500/month",
                  desc: `Save ₹28,000+ per year vs mid-tier coaching in ${data.city}. Full access to 140,000+ MCQs and 1,200+ mock tests.`,
                },
                {
                  title: "Study at Your Own Pace",
                  desc: "No fixed batch timings. Practice during commute, lunch break, or late nights — GetVidya works 24/7 on Android, iOS, and browser.",
                },
                {
                  title: "Personalized Weekly Plan",
                  desc: "GetVidyaAI generates a new study plan every week based on your performance data — topics to focus on, mock test schedule, and daily MCQ targets.",
                },
                {
                  title: "Covers All Exams",
                  desc: `${data.examFocus.join(", ")} — all covered in one subscription. No need to join separate courses.`,
                },
                {
                  title: "Track Progress in Real Time",
                  desc: "Accuracy per topic, exam readiness score, daily XP and streaks. Know exactly where you stand every day.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
              &quot;I was commuting 40 minutes daily to coaching in {data.coachingHubs[0]} and still not making progress.
              GetVidya&apos;s AI showed me I was weak in {data.examFocus[0].includes("UPSC") ? "Polity and Economy" : "Percentages and Algebra"} specifically.
              Three weeks of targeted practice changed my mock test score from 58 to 79.&quot;
            </blockquote>
            <p className="font-semibold text-slate-800">A GetVidya User</p>
            <p className="text-slate-500 text-sm">{data.examFocus[0]} Aspirant · {data.city}</p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Questions from {data.city} Aspirants
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

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center">
          <Smartphone className="w-10 h-10 mx-auto mb-4 text-emerald-200" />
          <h2 className="text-3xl font-bold mb-4">
            Start Preparing From {data.city} — No Coaching Needed
          </h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Take the free diagnostic test. See your weak subjects. Get your AI study plan.
            All free, from your phone.
          </p>
          <a href="/free-assessment" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-4 rounded-full text-lg inline-block transition-all">
            Start Free Diagnostic →
          </a>
          <p className="text-emerald-200 text-sm mt-4">Vidya Pass · ₹149/month · Cancel anytime</p>
        </section>

      </main>
      <Footer />
    </>
  );
}
