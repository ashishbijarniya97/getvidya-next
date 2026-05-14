import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getvidya.in";

const CITY_SLUGS = ["sikar", "laxmangarh", "churu", "jhunjhunu", "jaipur", "delhi", "lucknow", "pune", "hyderabad", "bangalore"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // ── Core ──────────────────────────────────────────────────────────────────
    { url: BASE_URL,                                   lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,                        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`,                      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faqs`,                         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog`,                         lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`,               lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`,             lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/refund-policy`,                lastModified: now, changeFrequency: "yearly",  priority: 0.3 },

    // ── Exam Hubs ─────────────────────────────────────────────────────────────
    { url: `${BASE_URL}/exams`,                        lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/exams/ssc-cgl`,                lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/exams/ssc-cgl/mock-tests`,     lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/exams/ssc-cgl/syllabus`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/exams/upsc`,                   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/exams/upsc/prelims-strategy`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/exams/banking`,                lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/exams/railway`,                lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/exams/state-psc`,              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/exams/defence`,                lastModified: now, changeFrequency: "weekly",  priority: 0.7 },

    // ── Content & Tools ───────────────────────────────────────────────────────
    { url: `${BASE_URL}/previous-year-questions`,      lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/question-bank`,                lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/ai-study-plan`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/free-assessment`,              lastModified: now, changeFrequency: "monthly", priority: 0.95 },

    // ── Comparison Pages ──────────────────────────────────────────────────────
    { url: `${BASE_URL}/compare/getvidya-vs-coaching`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/compare/getvidya-vs-testbook`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const RAJASTHAN_TIER2 = new Set(["sikar", "laxmangarh", "churu", "jhunjhunu"]);
  const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/city/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: RAJASTHAN_TIER2.has(slug) ? 0.88 : 0.75,
  }));

  return [...staticPages, ...cityPages];
}
