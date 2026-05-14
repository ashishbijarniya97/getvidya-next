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
  title: "GetVidya — India's AI-Powered Govt. Exam Prep",
  keywords: [
    "GetVidyaAI adaptive practice",
    "AI government exam preparation",
    "AI study plan exam preparation",
    "SSC CGL mock test 2025",
    "UPSC preparation online",
    "adaptive difficulty MCQ",
    "diagnostic test exam prep",
    "daily streak study app",
  ],
});

const homeFaqs = [
  {
    question: "What is GetVidya?",
    answer: "GetVidya is India's first AI-powered government exam prep platform, offering 1,200+ mock tests and 140,000+ MCQs for UPSC, SSC CGL, Banking, Railway, State PSC, and Defence exams. It is built by Prepdot Solutions Pvt. Ltd. and available on Android and iOS.",
  },
  {
    question: "What is GetVidyaAI?",
    answer: "GetVidyaAI is GetVidya's AI-powered study engine. It adapts question difficulty based on your accuracy, generates a personalized 7-day study plan each week, and provides progress insights — all automatically, without any manual setup.",
  },
  {
    question: "How does adaptive difficulty work in GetVidya?",
    answer: "GetVidyaAI tracks your accuracy across practice sessions. If you consistently score above 70% over 3 sessions in a subject, the system automatically promotes you to a harder difficulty tier. This ensures you are always challenged at the right level.",
  },
  {
    question: "What is the Diagnostic Assessment in GetVidya?",
    answer: "The Diagnostic Assessment is a 25-question quiz that covers your enrolled exam's key subjects. GetVidya uses your answers to identify your strong and weak subjects, then uses that data to personalize your AI study plan and practice sessions from day one.",
  },
  {
    question: "How does the AI Study Plan work?",
    answer: "Every week, GetVidyaAI analyzes your weak subjects, current difficulty level, and target exam, then generates a personalized 7-day study plan. The plan specifies which subjects and topics to focus on each day, with a study tip for each session.",
  },
  {
    question: "How much does GetVidya cost?",
    answer: "GetVidya offers a free tier with a 25-question diagnostic and 25 lifetime AI questions. Vidya Pass starts at ₹499/year (₹79/month) with 30 AI questions per day, 5 mock tests per month, and a weekly AI study plan. Personal Mentor at ₹999/year includes unlimited everything plus weekly AI profile analysis.",
  },
  {
    question: "Which exams does GetVidya cover?",
    answer: "GetVidya covers SSC CGL, UPSC CSE, SBI PO/Clerk, Railway NTPC, State PSC, and NDA/CDS — with more exams being added regularly. Each exam has dedicated mock tests, subject-wise MCQs, and AI-personalized study plans.",
  },
  {
    question: "Is there a mobile app for GetVidya?",
    answer: "Yes, GetVidya is available on both Android (Google Play) and iOS (App Store). The mobile app includes all GetVidyaAI features — adaptive practice, streaks, XP rewards, study plans, diagnostic assessment, and progress insights.",
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
