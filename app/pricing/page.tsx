import { generateSEO, faqSchema, breadcrumbSchema } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingClient from "./PricingClient";

export const metadata = generateSEO({
  title: "Pricing — GetVidyaAI | AI Exam Prep from ₹499/year",
  description:
    "3 plans for SSC, Railway & UPSC aspirants. Free tier included. AI-adaptive practice that knows your weak areas. From ₹499/year — less than ₹1.37/day.",
  canonical: "https://getvidya.in/pricing",
  keywords: [
    "GetVidya pricing",
    "GetVidyaAI plans",
    "SSC CGL prep price",
    "AI exam prep India affordable",
    "Vidya Pass 499",
    "government exam prep app subscription",
    "cheap SSC CGL preparation online",
  ],
});

const pricingFaqs = [
  {
    question: "Can I cancel my GetVidya subscription anytime?",
    answer:
      "Yes. There are no lock-ins. You can cancel your Vidya Pass or Personal Mentor subscription at any time from your account settings. Your access continues until the end of the billing period — no pro-rated refunds, but no penalty either.",
  },
  {
    question: "Is my data safe with GetVidya?",
    answer:
      "Absolutely. Your practice data, diagnostic results, and personal information are stored securely and never sold to third parties. GetVidya is built by Prepdot Solutions Pvt. Ltd. and follows industry-standard data protection practices.",
  },
  {
    question: "Is GetVidyaAI content available in Hindi?",
    answer:
      "Yes. GetVidyaAI supports both English and Hindi for practice questions, study plans, and AI chat. You can switch languages from your profile settings. Hindi medium aspirants preparing for SSC CGL, Railway NTPC, and State PSC will find full bilingual support.",
  },
  {
    question: "Which plan is best for SSC CGL 2026?",
    answer:
      "Vidya Pass (₹499/year) is the ideal pick for SSC CGL 2026. It gives you 30 adaptive practice questions per day, 5 full mock tests per month, and a weekly AI study plan built around your weak areas. Most CGL aspirants see a +12 to +18 mark improvement after 8 weeks. For unlimited mocks and a monthly PDF report, upgrade to Personal Mentor.",
  },
  {
    question: "What is the difference between Vidya Pass and Personal Mentor?",
    answer:
      "Vidya Pass gives you 30 AI questions/day and a weekly study plan — perfect for consistent daily preparation. Personal Mentor removes all limits: unlimited questions, unlimited mocks, a weekly LLaMA AI profile analysis, a monthly PDF report, and access to all 6 exam categories including Defence (NDA/CDS) and State PSC.",
  },
];

export default function PricingPage() {
  const bc = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(pricingFaqs)) }}
      />
      <Navbar />
      <main>
        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
