import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/auth/admin";
import { sanitizeBlogHtml } from "@/lib/sanitize";

type Params = { params: { id: string } };

// GET /api/admin/blog/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createServiceClient();
  const { data, error } = await db.from("blogs").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

// PUT /api/admin/blog/[id] — update post
export async function PUT(request: NextRequest, { params }: Params) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title, slug, content, content_html, excerpt,
    featured_image_url, status, seo_title, seo_description,
    og_image_url, tags, published_at,
  } = body;

  const db = createServiceClient();

  // Get current record to check if status changed to published
  const { data: existing } = await db.from("blogs").select("status, slug").eq("id", params.id).single();

  const wasPublished = existing?.status === "published";
  const becomingPublished = status === "published" && !wasPublished;

  const { data, error } = await db.from("blogs").update({
    title, slug, content, content_html: sanitizeBlogHtml(content_html), excerpt,
    featured_image_url, status,
    seo_title, seo_description, og_image_url,
    tags: tags ?? [],
    published_at: status === "published"
      ? (published_at ?? existing?.slug ? undefined : new Date().toISOString())
      : null,
  }).eq("id", params.id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (becomingPublished || wasPublished) {
    await triggerRevalidate(slug ?? existing?.slug);
  }

  return NextResponse.json(data);
}

// DELETE /api/admin/blog/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createServiceClient();
  const { data: existing } = await db.from("blogs").select("slug").eq("id", params.id).single();
  const { error } = await db.from("blogs").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (existing?.slug) await triggerRevalidate(existing.slug);
  return NextResponse.json({ deleted: true });
}

async function triggerRevalidate(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://getvidya.in";
    await fetch(`${base}/api/admin/blog/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "x-revalidate-secret": process.env.REVALIDATE_SECRET ?? "" },
      body: JSON.stringify({ slug }),
    });
  } catch { /* non-critical */ }
}
