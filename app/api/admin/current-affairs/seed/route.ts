import { createClient, createServiceClient } from "@/lib/supabase/server";
import { EDITIONS } from "@/app/current-affairs/_data/editions";

export const dynamic = "force-dynamic";

// POST — seed static editions.ts data into Supabase (one-time setup)
export async function POST() {
  try {
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const db = createServiceClient();
    const results: { slug: string; result: string }[] = [];

    for (const e of EDITIONS) {
      const { error } = await db
        .from("current_affairs_editions")
        .upsert(
          {
            slug:             e.slug,
            type:             e.type,
            label:            e.label,
            date_range:       e.dateRange,
            published_date:   e.publishedDate,
            status:           "published",
            meta_title:       e.metaTitle,
            meta_description: e.metaDescription,
            keywords:         e.keywords,
            exam_tags:        e.examTags,
            sections:         e.sections,
            faqs:             e.faqs,
            about_things:     e.aboutThings,
          },
          { onConflict: "slug", ignoreDuplicates: false }
        );

      results.push({ slug: e.slug, result: error ? error.message : "ok" });
    }

    return Response.json({ seeded: results });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
