import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

// GET /api/admin/blog — list all posts (admin only)
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createServiceClient();
  const { data, error } = await db
    .from("blogs")
    .select("id, title, slug, status, tags, published_at, updated_at, excerpt, featured_image_url")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/blog — create post
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title, slug, content, content_html, excerpt,
    featured_image_url, status, seo_title, seo_description,
    og_image_url, tags, published_at,
  } = body;

  if (!title || !slug) return NextResponse.json({ error: "title and slug required" }, { status: 400 });

  const db = createServiceClient();
  const { data, error } = await db.from("blogs").insert({
    title, slug, content, content_html, excerpt,
    featured_image_url, status: status ?? "draft",
    seo_title, seo_description, og_image_url,
    tags: tags ?? [],
    published_at: status === "published" ? (published_at ?? new Date().toISOString()) : null,
    author_id: user.id,
    author_name: user.email,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (status === "published") await triggerRevalidate(slug);
  return NextResponse.json(data, { status: 201 });
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
