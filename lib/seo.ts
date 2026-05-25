import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getvidya.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/api/og`;

export const SITE_CONFIG = {
  name: "GetVidya",
  tagline: "India's AI-Powered Govt. Exam Prep Platform",
  description:
    "GetVidya is India's first AI-powered government exam prep platform. GetVidyaAI delivers adaptive MCQ practice, personalized weekly study plans, and deep progress insights across 1,200+ mock tests and 140,000+ questions for UPSC, SSC CGL, Banking, Railway & more. Starting at ₹499/year.",
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
  const url = canonical ?? BASE_URL;

  const defaultKeywords = [
    "GetVidya",
    "GetVidyaAI",
    "government exam preparation India",
    "AI exam preparation app",
    "adaptive learning government exam",
    "GetVidyaAI adaptive practice",
    "AI study plan exam preparation",
    "ssc cgl mock test free",
    "ssc cgl online test series 2026",
    "ssc chsl free mock test",
    "ssc mts mock test",
    "upsc prelims mock test free",
    "rrb ntpc mock test free 2026",
    "railway group d mock test",
    "ibps po mock test free",
    "free ai diagnostic test",
    "ai mock test for government exams",
    "adaptive mock test ssc",
    "weak topic finder ssc",
    "personalized study plan exam",
    "diagnostic test government exam",
    "ssc cgl mock test free without registration",
    "free online coaching for ssc in hindi",
    "hindi mock test government exam",
    "rpsc ras mock test free",
    "rajasthan gk questions hindi",
    "rajasthan current affairs 2026",
    "best test series for ssc cgl",
    "best app for railway exam",
    "SSC CGL preparation 2026",
    "UPSC CSE prelims practice",
    "SBI PO mock test",
    "Railway NTPC preparation",
    "mock tests online India",
    "free question bank India",
    "previous year question papers",
    "competitive exam app India",
  ];

  return {
    title: fullTitle,
    description: desc,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    metadataBase: new URL(BASE_URL),
    ...(canonical && { alternates: { canonical } }),
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

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────────── */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "GetVidya",
  alternateName: ["GetVidyaAI", "Prepdot Solutions"],
  legalName: "Prepdot Solutions Pvt. Ltd.",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Ashish Bijarniya",
    url: `${BASE_URL}/founder-ashish-bijarniya`,
  },
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-gv-full.png`,
  description:
    "GetVidya (GetVidyaAI) is India's first AI-powered government exam preparation platform. It offers adaptive mock tests, personalized AI study plans, and free diagnostic assessments for UPSC, SSC CGL, RRB NTPC, Banking PO, RPSC RAS, and other government exams. Built by Prepdot Solutions Pvt. Ltd., Rajasthan.",
  areaServed: [
    { "@type": "City", name: "Sikar", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Laxmangarh", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Jaipur", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Jhunjhunu", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Churu", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Jodhpur", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Kota", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Ajmer", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "City", name: "Bikaner", containedInPlace: { "@type": "State", name: "Rajasthan" } },
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "SSC CGL Preparation",
    "SSC CHSL Preparation",
    "UPSC Civil Services Examination",
    "RRB NTPC Railway Preparation",
    "Banking PO and Clerk Exam Preparation",
    "RPSC RAS Rajasthan Administrative Services",
    "Rajasthan Police Constable Exam",
    "RSMSSB Patwari Exam",
    "Adaptive Learning for Government Exams",
    "AI-Powered Mock Tests",
    "Free Diagnostic Assessment for Exams",
    "Hindi Medium Government Exam Preparation",
    "Personalized Study Plans",
    "Weak Subject Analysis",
    "Competitive Exam Coaching",
    "Government Job Preparation India",
  ],
  availableLanguage: ["English", "Hindi"],
  sameAs: [
    "https://en.wikipedia.org/wiki/GetVidya",
    "https://t.me/GetVidyaofficial",
    "https://www.youtube.com/@Get_Vidya",
    "https://www.facebook.com/profile.php?id=61552776714971",
    "https://www.linkedin.com/company/getvidya",
    "https://play.google.com/store/apps/details?id=app.getvidya.prod",
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
};

export const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "GetVidya – AI-Powered Govt Exam Prep",
  description:
    "GetVidya features GetVidyaAI — an adaptive AI engine that adjusts question difficulty based on performance, generates personalized weekly study plans, and delivers progress insights. Covers UPSC, SSC CGL, Banking, Railway, State PSC and Defence exams.",
  applicationCategory: "EducationApplication",
  operatingSystem: "Android, iOS",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "499",
    highPrice: "149",
    priceCurrency: "INR",
    offerCount: 2,
    offers: [
      {
        "@type": "Offer",
        name: "Vidya Pass Annual",
        price: "499",
        priceCurrency: "INR",
        priceSpecification: { "@type": "UnitPriceSpecification", billingIncrement: 1, unitText: "YEAR" },
      },
      {
        "@type": "Offer",
        name: "Vidya Pass Monthly",
        price: "149",
        priceCurrency: "INR",
        priceSpecification: { "@type": "UnitPriceSpecification", billingIncrement: 1, unitText: "MONTH" },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: 2400,
  },
  featureList: [
    "GetVidyaAI adaptive difficulty practice",
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

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

// ── Course Schema — for exam-specific pages ───────────────────────────────────
export const courseSchema = ({
  name,
  description,
  provider = "GetVidya by Prepdot Solutions Pvt. Ltd.",
  url,
  price = "149",
  duration,
  level = "Beginner to Advanced",
}: {
  name: string;
  description: string;
  provider?: string;
  url: string;
  price?: string;
  duration?: string;
  level?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name,
  description,
  provider: {
    "@type": "Organization",
    name: provider,
    sameAs: BASE_URL,
  },
  url: `${BASE_URL}${url}`,
  offers: {
    "@type": "Offer",
    price,
    priceCurrency: "INR",
    category: "Monthly Subscription",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: duration ?? "Self-paced",
    instructor: {
      "@type": "Organization",
      name: "GetVidyaAI",
    },
  },
  educationalLevel: level,
  inLanguage: ["en", "hi"],
  isAccessibleForFree: false,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Government Exam Aspirants in India",
  },
});

// ── Review / AggregateRating Schema ──────────────────────────────────────────
export const reviewSchema = ({
  itemName,
  ratingValue = "4.7",
  reviewCount = "2400",
  bestRating = "5",
}: {
  itemName: string;
  ratingValue?: string;
  reviewCount?: string;
  bestRating?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: itemName,
  brand: { "@type": "Brand", name: "GetVidya" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating,
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Sharma" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "GetVidyaAI identified that I was weak in Reasoning and gave me exactly the practice I needed. I cleared SSC CGL Tier-1 in my second attempt after using GetVidya for 3 months.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Rahul Verma" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "At ₹149/month, GetVidya gives me more value than coaching centres that charge ₹30,000. The AI study plan changed how I prepare.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Anjali Meena" },
      reviewRating: { "@type": "Rating", ratingValue: "4" },
      reviewBody:
        "The diagnostic test at the start was eye-opening. I thought I was good at GK but the AI showed I had gaps in Economics. Fixed that in 4 weeks.",
    },
  ],
});

// ── HowTo Schema — for outcome/guide pages ───────────────────────────────────
export const howToSchema = ({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  description,
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
  tool: [{ "@type": "HowToTool", name: "GetVidya App (Android / iOS)" }],
  supply: [{ "@type": "HowToSupply", name: "GetVidya Vidya Pass — ₹149/month" }],
});

// ── Quiz Schema — for practice topic and mock test pages ─────────────────────
export const quizSchema = ({
  name,
  description,
  url,
  numberOfQuestions,
  about,
  educationalLevel = "intermediate",
}: {
  name: string;
  description: string;
  url: string;
  numberOfQuestions?: number;
  about?: string;
  educationalLevel?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Quiz",
  name,
  description,
  url: `${BASE_URL}${url}`,
  learningResourceType: "Quiz",
  educationalLevel,
  ...(about && { about: { "@type": "Thing", name: about } }),
  ...(numberOfQuestions !== undefined && { numberOfQuestions }),
  provider: {
    "@type": "Organization",
    name: "GetVidya",
    sameAs: BASE_URL,
  },
  offers: {
    "@type": "Offer",
    price: "149",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  },
  inLanguage: ["en", "hi"],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Government Exam Aspirants in India",
  },
});

// ── Local Business Schema — for city landing pages ────────────────────────────
export const localBusinessSchema = ({
  city,
  region = "India",
}: {
  city: string;
  region?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: `GetVidya — Online Exam Prep for ${city} Students`,
  description: `GetVidya provides AI-powered government exam preparation for students in ${city}, ${region}. Covers SSC CGL, UPSC, Banking, and Railway exams with adaptive mock tests and personalized study plans.`,
  url: `${BASE_URL}/city/${city.toLowerCase().replace(/\s+/g, "-")}`,
  areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "State", name: region } },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Government Exam Prep Plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Vidya Pass Pro",
        price: "149",
        priceCurrency: "INR",
        description: "Unlimited access to all mock tests, AI practice, and GetVidyaAI features.",
      },
    ],
  },
  sameAs: [BASE_URL],
});
