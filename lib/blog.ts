import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: Record<string, unknown> | null;
  content_html: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  author_id: string | null;
  author_name: string | null;
  status: "draft" | "published";
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Public: fetch published posts (anon key, RLS filters to published)
export async function getPublishedPosts(limit = 20): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) { console.error("[blog] getPublishedPosts:", error.message); return []; }
  return (data ?? []) as BlogPost[];
}

// Public: fetch single published post by slug
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as BlogPost;
}

// Public: get all published slugs (for generateStaticParams)
export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((r) => r.slug);
}

// Admin: fetch all posts including drafts (service role)
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) { console.error("[blog] getAllPostsAdmin:", error.message); return []; }
  return (data ?? []) as BlogPost[];
}

// Admin: fetch single post by id (service role)
export async function getPostAdmin(id: string): Promise<BlogPost | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as BlogPost;
}

export function formatBlogDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export function readingTime(html: string | null): number {
  if (!html) return 1;
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
