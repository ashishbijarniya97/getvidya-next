import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getvidya.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-image.png`;

export const SITE_CONFIG = {
  name: "GetVidya",
  tagline: "India's AI-Powered Govt. Exam Prep Platform",
  description:
    "GetVidya is India's first AI-powered government exam prep platform. VidyaAI — built on Gemini — delivers adaptive MCQ practice, personalized weekly study plans, and deep progress insights across 1,200+ mock tests and 140,000+ questions for UPSC, SSC CGL, Banking, Railway & more. Starting at ₹149/month.",
  url: BASE_URL,
  ogImage: DEFAULT_OG_IMAGE,
  twitter: "@GetVidya",
  company: "Prepdot Solutions Pvt. Ltd.",
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage,
  noIndex = false,
  canonical,
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
  const desc = description || SITE_CONFIG.description;
  const image = ogImage || DEFAULT_OG_IMAGE;
  const url = canonical || BASE_URL;

  const defaultKeywords = [
    "government exam preparation India",
    "AI exam preparation app",
    "adaptive learning government exam",
    "VidyaAI adaptive practice",
    "Gemini AI study plan",
    "mock tests online India",
    "SSC CGL mock test 2025",
    "UPSC preparation app",
    "banking exam MCQ practice",
    "GetVidya",
    "free question bank India",
    "previous year question papers",
    "competitive exam app India",
    "personalized study plan exam",
    "diagnostic test government exam",
    "XP streak study app",
    "SSC CGL preparation 2025",
    "UPSC CSE prelims practice",
    "SBI PO mock test",
    "Railway NTPC preparation",
  ];

  return {
    title: fullTitle,
    description: desc,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [image],
      creator: SITE_CONFIG.twitter,
    },
  };
}

/* ─── JSON-LD Schemas ──────────────────────── */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GetVidya",
  legalName: "Prepdot Solutions Pvt. Ltd.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-gv-full.png`,
  description:
    "GetVidya is India's first AI-powered government exam preparation platform, offering 1,200+ mock tests and 140,000+ MCQs for UPSC, SSC CGL, Banking, Railway, State PSC, and Defence exams. Powered by VidyaAI and Google Gemini AI.",
  sameAs: [
    "https://t.me/GetVidyaofficial",
    "https://www.youtube.com/@Get_Vidya",
    "https://www.facebook.com/profile.php?id=61552776714971",
    "https://www.linkedin.com/company/getvidya",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["English", "Hindi"],
    url: `${BASE_URL}/contact`,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GetVidya",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "GetVidya – AI-Powered Govt Exam Prep",
  description:
    "GetVidya features VidyaAI — an adaptive AI engine powered by Gemini that adjusts question difficulty based on performance, generates personalized weekly study plans, and delivers progress insights. Covers UPSC, SSC CGL, Banking, Railway, State PSC and Defence exams.",
  applicationCategory: "EducationApplication",
  operatingSystem: "Android, iOS",
  offers: {
    "@type": "Offer",
    price: "149",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      billingIncrement: 1,
      unitText: "MONTH",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "2400",
  },
  featureList: [
    "VidyaAI adaptive difficulty practice powered by Gemini AI",
    "Personalized weekly AI study plans",
    "25-question diagnostic assessment for subject mapping",
    "Daily XP and streak gamification system",
    "Progress insights with activity calendar and accuracy charts",
    "1,200+ full-length mock tests",
    "140,000+ practice MCQs",
    "6 government exam categories",
  ],
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

export const breadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});
