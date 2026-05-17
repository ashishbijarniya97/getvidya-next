import type { Metadata } from "next";
import { generateSEO, faqSchema } from "@/lib/seo";
import FAQsClient from "./FAQsClient";

export const metadata: Metadata = generateSEO({
  title: "FAQs | GetVidya AI Exam Prep",
  description:
    "Frequently asked questions about GetVidya — India's AI-adaptive competitive exam preparation platform.",
  canonical: "https://getvidya.in/faqs",
});

const FAQ_DATA = [
  { question: "What is GetVidya?", answer: "GetVidya is an online exam preparation platform offering 1,200+ mock tests and 140,000+ MCQs for UPSC, SSC CGL, Banking, Railway, State PSC, and Defence exams. Built by Prepdot Solutions Pvt. Ltd." },
  { question: "How much does GetVidya cost?", answer: "GetVidya's Vidya Pass Pro starts at just ₹149/month, giving you unlimited access to all mock tests, question banks, and analysis tools. Free daily questions are always available at no cost." },
  { question: "Which government exams does GetVidya cover?", answer: "We currently cover 6 major exams: SSC CGL, UPSC CSE, SBI PO/Clerk, Railway NTPC, State PSC, and NDA/CDS. More exams are being added continuously." },
  { question: "Is there a mobile app available?", answer: "Yes! GetVidya is available on Android (Google Play Store) and iOS (App Store). Search for 'GetVidya' or scan the QR code on our website. The app supports offline study mode." },
  { question: "Are the mock tests up to date with the latest exam pattern?", answer: "Absolutely. Our expert team continuously updates all mock tests to reflect the latest official exam patterns, syllabus changes, and previous year question trends." },
  { question: "How is GetVidya different from other platforms?", answer: "GetVidya offers exam-specific personalization, chapter-wise analysis, daily study targets, and detailed weakness reports — not just a dump of questions. Plus, at ₹149/month, it's the most affordable comprehensive prep platform in India." },
  { question: "Can I try GetVidya for free?", answer: "Yes! You can attempt free mock tests without any payment. Daily free questions from our question bank are also available to all registered users." },
  { question: "How do I cancel my subscription?", answer: "You can cancel your Vidya Pass Pro subscription anytime. Please contact us via WhatsApp or email at support@getvidya.in and we'll process your request immediately." },
  { question: "What is the refund policy?", answer: "We offer refunds within 7 days of purchase if you haven't used more than 2 mock tests. Please see our full Refund Policy page for details." },
  { question: "How do I delete my account?", answer: "You can request account deletion from the app settings or by contacting support@getvidya.in. Your data will be fully erased within 30 days as per our privacy policy." },
];

export default function FAQsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_DATA)) }}
      />
      <FAQsClient />
    </>
  );
}
