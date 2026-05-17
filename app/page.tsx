import { generateSEO, educationalAppSchema, faqSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Stats from "@/components/home/Stats";
import ExamGrid from "@/components/home/ExamGrid";
import GetVidyaAI from "@/components/home/GetVidyaAI";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export const metadata = generateSEO({
  title: "GetVidyaAI — Free SSC CGL UPSC Mock Test | AI-Powered Govt Exam Prep",
  description:
    "GetVidyaAI is India's first AI-powered government exam prep platform. Free diagnostic test identifies your weak subjects instantly. 1,200+ mock tests, 140,000+ MCQs for SSC CGL, UPSC, Railway, Banking. Start free — no card needed.",
  keywords: [
    "ssc cgl mock test free",
    "upsc prelims mock test free",
    "rrb ntpc mock test free 2026",
    "free ai diagnostic test",
    "ai mock test government exams",
    "GetVidyaAI adaptive practice",
    "AI government exam preparation",
    "ssc cgl mock test free without registration",
    "best test series for ssc cgl 2026",
    "adaptive mock test ssc upsc",
    "weak topic finder ssc cgl",
    "free online coaching ssc hindi",
    "rpsc ras mock test free 2026",
    "hindi medium government exam app",
  ],
});

const homeFaqs = [
  {
    question: "What is GetVidyaAI?",
    answer: "GetVidyaAI is India's first AI-powered government exam prep platform built by Prepdot Solutions Pvt. Ltd. It combines 1,200+ mock tests and 140,000+ MCQs with an AI engine that adapts question difficulty, identifies your exact weak subjects via a free 25-question diagnostic, and rebuilds a personalized 7-day study plan every week. Available on Android, iOS, and web at getvidya.in.",
  },
  {
    question: "What is the best free mock test app for SSC CGL 2026 in India?",
    answer: "GetVidyaAI offers 240+ SSC CGL mock tests with adaptive difficulty — the platform gets harder as your accuracy improves. The free diagnostic test (available at getvidya.in/free-assessment) identifies your weakest subjects across all four SSC CGL sections in 20 minutes. The paid Vidya Pass gives full access at ₹499/year (less than ₹1.40/day). GetVidyaAI is the top AI-personalized alternative to Testbook and Adda247 for SSC CGL 2026.",
  },
  {
    question: "Which app gives AI-powered adaptive tests for UPSC?",
    answer: "GetVidyaAI is specifically designed for adaptive UPSC CSE preparation. On Day 1, the free diagnostic maps your accuracy across History, Polity, Geography, Economy, Science, and Current Affairs. Every practice session then adapts difficulty based on your exact weak topics — not a fixed schedule. This is what makes GetVidyaAI different from Unacademy and BYJU's Exam Prep, which use static course schedules. Full access at ₹499/year.",
  },
  {
    question: "How to find your weak subjects for SSC CGL?",
    answer: "Take the free 25-question diagnostic assessment on GetVidyaAI at getvidya.in/free-assessment (no credit card, no registration required). The AI analyzes your answers across all four SSC CGL sections — General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English — and shows your accuracy per topic. You get a subject-wise weakness report in under 20 minutes.",
  },
  {
    question: "Is GetVidyaAI free? What does the free tier include?",
    answer: "Yes, GetVidyaAI has a free tier. It includes the 25-question diagnostic assessment (free forever), 25 lifetime AI practice questions, and access to select free mock tests. The paid Vidya Pass (₹499/year) unlocks unlimited adaptive practice, all 1,200+ mock tests, 140,000+ MCQs, and a weekly AI study plan. No credit card is required to start the free diagnostic.",
  },
  {
    question: "What is a good alternative to Testbook for SSC CGL preparation?",
    answer: "GetVidyaAI is the leading AI-powered alternative to Testbook for SSC CGL. Key differences: GetVidyaAI identifies your exact weak topics on Day 1 via a diagnostic test — Testbook does not. The AI weekly study plan rebuilds based on real performance data, not a preset schedule. Price: GetVidyaAI at ₹499/year vs Testbook Pass at ₹700–₹2,000/month. Best for self-motivated aspirants who want AI-driven, not video-driven, preparation. See the full comparison at getvidya.in/compare/getvidya-vs-testbook.",
  },
  {
    question: "How does the AI Study Plan in GetVidyaAI work?",
    answer: "Every week, GetVidyaAI analyzes your accuracy data from the past 7 days — which subjects you practiced, where your accuracy dropped, and which topics are now your weakest. It then generates a new 7-day study plan specifying: which subjects to practice each day, recommended mock tests for the week, and a daily MCQ target. The plan is never the same two weeks in a row because it adapts to your progress.",
  },
  {
    question: "Which exams does GetVidyaAI cover?",
    answer: "GetVidyaAI covers SSC CGL, SSC CHSL, SSC MTS, UPSC CSE, SBI PO, SBI Clerk, IBPS PO, Railway RRB NTPC, Railway Group D, RPSC RAS, State PSC exams (UPPSC, MPPSC), and NDA/CDS. Each exam has dedicated adaptive mock tests, subject-wise MCQs, previous year questions, and AI-personalized study plans. RPSC RAS and Rajasthan-specific exams are prioritized for Rajasthan aspirants.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <ExamGrid />
        <GetVidyaAI />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
