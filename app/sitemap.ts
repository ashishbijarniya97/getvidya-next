import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { createPublicClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getvidya.in";
const MCQ_BATCH_SIZE = 50_000;

const STATIC_LASTMOD = {
  home:    "2026-05-01",
  content: "2026-04-01",
  legal:   "2024-01-01",
};

const EXAM_SLUGS = [
  "ssc-cgl", "upsc", "banking", "railway", "state-psc", "defence",
  "rpsc-ras", "rajasthan-police", "ib-acio", "rjs",
];
const TOPIC_SLUGS = ["math", "reasoning", "english", "gk", "law"];

const CITY_SLUGS = [
  "sikar", "laxmangarh", "churu", "jhunjhunu", "jaipur",
  "jodhpur", "kota", "ajmer", "bikaner", "delhi", "lucknow",
  "pune", "hyderabad", "bangalore",
];
const RAJASTHAN_TIER2 = new Set([
  "sikar", "laxmangarh", "churu", "jhunjhunu", "jodhpur", "kota", "ajmer", "bikaner",
]);

// How many MCQ batches do we need?
async function getMcqBatchCount(): Promise<number> {
  try {
    const supabase = createPublicClient();
    const { count } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true);
    return Math.ceil((count ?? 0) / MCQ_BATCH_SIZE);
  } catch {
    return 0;
  }
}

// generateSitemaps tells Next.js the full set of sitemap IDs.
// ID 0 → static + blog + exam hubs + practice topics
// IDs 1..N → MCQ question pages in 50K batches
export async function generateSitemaps() {
  const batchCount = await getMcqBatchCount();
  return [
    { id: 0 },
    ...Array.from({ length: batchCount }, (_, i) => ({ id: i + 1 })),
  ];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // ── Sitemap 0: static pages + exam hubs + practice topics + blog ───────────
  if (id === 0) {
    const staticPages: MetadataRoute.Sitemap = [
      { url: BASE_URL,                                     lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 1.0 },
      { url: `${BASE_URL}/what-is-getvidyaai`,             lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.95 },
      { url: `${BASE_URL}/free-assessment`,                lastModified: STATIC_LASTMOD.home,    changeFrequency: "monthly", priority: 0.95 },
      { url: `${BASE_URL}/ai-study-plan`,                  lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE_URL}/exams`,                          lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.9 },
      { url: `${BASE_URL}/exams/ssc-cgl`,                  lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.95 },
      { url: `${BASE_URL}/exams/ssc-cgl/mock-tests`,       lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.95 },
      { url: `${BASE_URL}/exams/ssc-cgl/syllabus`,         lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE_URL}/exams/upsc`,                     lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.9 },
      { url: `${BASE_URL}/exams/upsc/prelims-strategy`,    lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE_URL}/exams/banking`,                  lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.8 },
      { url: `${BASE_URL}/exams/railway`,                  lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.8 },
      { url: `${BASE_URL}/exams/state-psc`,                lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.8 },
      { url: `${BASE_URL}/exams/defence`,                  lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.7 },
      { url: `${BASE_URL}/exams/rpsc-ras`,                 lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.9 },
      { url: `${BASE_URL}/exams/rajasthan-police`,         lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.8 },
      { url: `${BASE_URL}/rajasthan`,                      lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.92 },
      { url: `${BASE_URL}/question-bank`,                  lastModified: STATIC_LASTMOD.home,    changeFrequency: "daily",   priority: 0.8 },
      { url: `${BASE_URL}/previous-year-questions`,        lastModified: STATIC_LASTMOD.home,    changeFrequency: "weekly",  priority: 0.8 },
      { url: `${BASE_URL}/compare/getvidya-vs-coaching`,   lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/compare/getvidya-vs-testbook`,   lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/compare/getvidya-vs-other-apps`, lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/blog`,                           lastModified: STATIC_LASTMOD.home,    changeFrequency: "daily",   priority: 0.8 },
      { url: `${BASE_URL}/about`,                          lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE_URL}/founder-ashish-bijarniya`,       lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.8 },
      { url: `${BASE_URL}/contact`,                        lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE_URL}/faqs`,                           lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.6 },
      { url: `${BASE_URL}/pricing`,                        lastModified: STATIC_LASTMOD.home,    changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/privacy-policy`,                 lastModified: STATIC_LASTMOD.legal,   changeFrequency: "yearly",  priority: 0.3 },
      { url: `${BASE_URL}/terms-of-service`,               lastModified: STATIC_LASTMOD.legal,   changeFrequency: "yearly",  priority: 0.3 },
      { url: `${BASE_URL}/refund-policy`,                  lastModified: STATIC_LASTMOD.legal,   changeFrequency: "yearly",  priority: 0.3 },
    ];

    const practicePages: MetadataRoute.Sitemap = EXAM_SLUGS.flatMap((exam) =>
      TOPIC_SLUGS.map((topic) => ({
        url: `${BASE_URL}/practice/${exam}/${topic}`,
        lastModified: STATIC_LASTMOD.home,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }))
    );

    const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
      url: `${BASE_URL}/city/${slug}`,
      lastModified: STATIC_LASTMOD.content,
      changeFrequency: "monthly" as const,
      priority: RAJASTHAN_TIER2.has(slug) ? 0.88 : 0.75,
    }));

    let blogPages: MetadataRoute.Sitemap = [];
    try {
      const posts = await getPublishedPosts(200);
      blogPages = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
    } catch {
      // don't break sitemap if DB is unreachable
    }

    return [...staticPages, ...practicePages, ...cityPages, ...blogPages];
  }

  // ── Sitemaps 1..N: MCQ question pages in 50K batches ──────────────────────
  // These pages are served at /practice/q/[id] once that route exists.
  // For now the sitemap infrastructure is wired; routes are added in a future sprint.
  try {
    const supabase = createPublicClient();
    const from = (id - 1) * MCQ_BATCH_SIZE;
    const to = from + MCQ_BATCH_SIZE - 1;

    const { data } = await supabase
      .from("questions")
      .select("id, updated_at")
      .eq("is_published", true)
      .order("id")
      .range(from, to);

    return (data ?? []).map((q) => ({
      url: `${BASE_URL}/practice/q/${q.id}`,
      lastModified: q.updated_at ? new Date(q.updated_at) : STATIC_LASTMOD.home,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}
