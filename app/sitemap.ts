import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { createPublicClient } from "@/lib/supabase/server";
import { EDITIONS as STATIC_CA_EDITIONS } from "@/app/current-affairs/_data/editions";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getvidya.in";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      { url: `${BASE_URL}/ai-tutor`,                       lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/reviews`,                        lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.8  },
      { url: `${BASE_URL}/compare/getvidya-vs-coaching`,   lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/compare/getvidya-vs-testbook`,   lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/compare/getvidya-vs-other-apps`, lastModified: STATIC_LASTMOD.content, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE_URL}/compare/getvidya-vs-tarkvitark`,  lastModified: "2026-05-28",           changeFrequency: "monthly", priority: 0.85 },
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
      const posts = await getPublishedPosts(2000);
      blogPages = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
    } catch {
      // don't break sitemap if DB is unreachable
    }

    let caPages: MetadataRoute.Sitemap = [
      { url: `${BASE_URL}/current-affairs`, lastModified: STATIC_LASTMOD.home, changeFrequency: "daily", priority: 0.9 },
      ...STATIC_CA_EDITIONS.map((e) => ({
        url: `${BASE_URL}/current-affairs/${e.slug}`,
        lastModified: e.publishedDate,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      })),
    ];
    try {
      const supabase = createPublicClient();
      const { data } = await supabase
        .from("current_affairs_editions")
        .select("slug, published_date")
        .eq("status", "published");
      if (data && data.length > 0) {
        const dbSlugs = new Set(data.map((r: { slug: string }) => r.slug));
        caPages = [
          { url: `${BASE_URL}/current-affairs`, lastModified: STATIC_LASTMOD.home, changeFrequency: "daily", priority: 0.9 },
          ...data.map((r: { slug: string; published_date: string }) => ({
            url: `${BASE_URL}/current-affairs/${r.slug}`,
            lastModified: r.published_date,
            changeFrequency: "weekly" as const,
            priority: 0.85,
          })),
          ...STATIC_CA_EDITIONS.filter((e) => !dbSlugs.has(e.slug)).map((e) => ({
            url: `${BASE_URL}/current-affairs/${e.slug}`,
            lastModified: e.publishedDate,
            changeFrequency: "weekly" as const,
            priority: 0.85,
          })),
        ];
      }
    } catch {
      // fall back to static CA editions
    }

    return [...staticPages, ...practicePages, ...cityPages, ...blogPages, ...caPages];
}
