import { generateSEO, educationalAppSchema, faqSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Stats from "@/components/home/Stats";
import ExamGrid from "@/components/home/ExamGrid";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export const metadata = generateSEO({
  title: "GetVidya — India's Smartest Govt. Exam Prep",
  keywords: ["SSC CGL mock test 2025", "UPSC preparation online", "government exam app India", "free MCQ practice"],
});

const homeFaqs = [
  { question: "What is GetVidya?", answer: "GetVidya is an online platform offering 1,200+ mock tests and 140,000+ MCQs for government exams like UPSC, SSC CGL, Banking, Railway, State PSC, and Defence." },
  { question: "How much does GetVidya cost?", answer: "GetVidya's Vidya Pass Pro starts at ₹149/month, giving you unlimited access to all mock tests. Free tests and daily questions are available without any payment." },
  { question: "Which exams does GetVidya cover?", answer: "GetVidya covers SSC CGL, UPSC CSE, SBI PO/Clerk, Railway NTPC, State PSC, and NDA/CDS — with more exams being added regularly." },
  { question: "Is there a mobile app?", answer: "Yes! GetVidya is available on both Android (Google Play) and iOS (App Store). You can study on-the-go with full offline support." },
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
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
