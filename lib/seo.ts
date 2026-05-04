import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getvidya.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-image.png`;

export const SITE_CONFIG = {
  name: "GetVidya",
  tagline: "India's Smartest Govt. Exam Prep Platform",
  description:
    "GetVidya offers 1200+ mock tests, 140,000+ expertly crafted MCQs for UPSC, SSC CGL, Banking & 6 other government exams — starting at ₹149/month.",
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
    "government exam preparation",
    "mock tests online",
    "SSC CGL mock test",
    "UPSC preparation",
    "banking exam MCQ",
    "GetVidya",
    "free question bank",
    "previous year question papers",
    "competitive exam app India",
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
  name: "GetVidya – Govt Exam Prep",
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
