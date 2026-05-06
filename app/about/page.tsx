import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateSEO } from "@/lib/seo";
import { Target, Heart, Zap, Users, Brain } from "lucide-react";
import CTA from "@/components/home/CTA";

export const metadata = generateSEO({
  title: "About GetVidya",
  description: "GetVidya is India's first AI-powered government exam prep platform, built by Prepdot Solutions Pvt. Ltd. Powered by VidyaAI, it helps 50,000+ students crack UPSC, SSC, Banking, Railway & more.",
  canonical: "https://getvidya.in/about",
});

const values = [
  { icon: Target, title: "Mission-Driven", desc: "We exist to make government exam preparation accessible to every Indian student, regardless of their background or location." },
  { icon: Heart, title: "Student First", desc: "Every product decision starts with one question: does this help our students crack their exam faster and more confidently?" },
  { icon: Brain, title: "AI-Powered", desc: "VidyaAI adapts to every student's performance, making truly personalized exam prep a reality at ₹149/month, not ₹1,49,000." },
  { icon: Zap, title: "Expert-Curated", desc: "Our question bank and mock tests are crafted by subject matter experts with deep knowledge of each exam's pattern and syllabus." },
  { icon: Users, title: "Community", desc: "50,000+ students prepare together on GetVidya. We foster peer learning through Telegram and WhatsApp communities." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero py-24">
          <div className="container-xl text-center">
            <span className="section-tag mb-6 !bg-white/10 !text-white/90">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Making exam prep smarter
              <br />
              <span className="text-accent">with AI, for every Indian student</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              GetVidya is built by Prepdot Solutions Pvt. Ltd. with a singular mission:
              give every aspiring government job candidate the power of AI-driven, personalized preparation.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-white">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <span className="section-tag mb-6">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
                Why we built GetVidya
              </h2>
              <div className="prose prose-lg text-slate-600 space-y-5">
                <p>
                  Millions of Indian students aspire to crack government exams — UPSC, SSC, Banking, Railway.
                  But quality preparation material was either too expensive, poorly organized, or scattered across the internet.
                </p>
                <p>
                  We built GetVidya to solve exactly that. Starting with a focused question bank and growing into
                  1,200+ mock tests across 6 major exams, our platform is built on the belief that every student
                  deserves the same quality preparation as those attending expensive coaching institutes.
                </p>
                <p>
                  Today, we&apos;ve gone further — introducing <strong>VidyaAI</strong>, India&apos;s first adaptive AI study engine built specifically
                  for government exams. VidyaAI adjusts question difficulty to your performance,
                  generates your personalized weekly study plan, and tracks your progress in real-time. Coaching-institute-level
                  personalization, at ₹149/month.
                </p>
                <p>
                  50,000+ students trust GetVidya to prepare for their exams. We&apos;re determined to keep it affordable,
                  powerful, and built around you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-slate-50">
          <div className="container-xl">
            <div className="text-center mb-14">
              <span className="section-tag mb-4">Our Values</span>
              <h2 className="section-heading">What drives us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center mx-auto mb-5">
                    <Icon size={24} className="text-primary-500" />
                  </div>
                  <h3 className="font-bold text-primary-500 text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-16 bg-primary-500">
          <div className="container-xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              {[
                { value: "50,000+", label: "Students" },
                { value: "1,200+", label: "Mock Tests" },
                { value: "140K+", label: "Questions" },
                { value: "6", label: "Exams Covered" },
                { value: "AI", label: "VidyaAI Powered" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-4xl font-bold text-accent mb-1">{value}</div>
                  <div className="text-white/60 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
