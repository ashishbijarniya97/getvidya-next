import { createServiceClient, createPublicClient } from "@/lib/supabase/server";

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

function normalizeSeoContent(row: Record<string, unknown>): BlogPost {
  const slug = String(row.slug ?? "").replace(/^\//, "");
  return {
    id:                String(row.id ?? ""),
    title:             String(row.title ?? ""),
    slug,
    content:           null,
    content_html:      String(row.content_html ?? ""),
    excerpt:           String(row.meta_description ?? ""),
    featured_image_url: null,
    author_id:         null,
    author_name:       "GetVidyaAI",
    status:            "published",
    seo_title:         String(row.title ?? ""),
    seo_description:   String(row.meta_description ?? ""),
    og_image_url:      null,
    tags:              row.opportunity_type ? [String(row.opportunity_type).replace(/_/g, " ")] : [],
    published_at:      String(row.generated_at ?? row.created_at ?? new Date().toISOString()),
    created_at:        String(row.generated_at ?? new Date().toISOString()),
    updated_at:        String(row.generated_at ?? new Date().toISOString()),
  };
}

// Public: fetch published posts from both blogs + seo_content tables
export async function getPublishedPosts(limit = 20): Promise<BlogPost[]> {
  const supabase = createPublicClient();
  const serviceSupabase = createServiceClient();

  const [blogsRes, seoRes] = await Promise.all([
    supabase
      .from("blogs")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit),
    serviceSupabase
      .from("seo_content")
      .select("id, title, slug, meta_description, content_html, opportunity_type, generated_at, status")
      .eq("status", "published")
      .not("content_html", "is", null)
      .neq("content_html", "")
      .order("generated_at", { ascending: false })
      .limit(limit),
  ]);

  const blogs: BlogPost[] = (blogsRes.data ?? []).map((p: BlogPost) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : [],
    content_html: p.content_html ?? "",
  }));

  const seoBlogs: BlogPost[] = (seoRes.data ?? []).map(normalizeSeoContent);

  // Merge: manual blogs first (higher quality), then AI-generated
  const allSlugs = new Set(blogs.map((b) => b.slug));
  const merged = [
    ...blogs,
    ...seoBlogs.filter((b) => !allSlugs.has(b.slug)),
  ];

  merged.sort((a, b) =>
    new Date(b.published_at ?? b.created_at).getTime() -
    new Date(a.published_at ?? a.created_at).getTime()
  );

  return merged.slice(0, limit);
}

// Public: fetch single published post by slug (checks both tables)
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const supabase = createPublicClient();
  const serviceSupabase = createServiceClient();

  const { data: blogData } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (blogData) {
    const post = blogData as BlogPost;
    post.tags = Array.isArray(post.tags) ? post.tags : [];
    post.content_html = post.content_html ?? "";
    return post;
  }

  // Fall back to seo_content (service role bypasses RLS)
  const { data: seoData } = await serviceSupabase
    .from("seo_content")
    .select("id, title, slug, meta_description, content_html, opportunity_type, generated_at, faq")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (!seoData) return null;

  const post = normalizeSeoContent(seoData as Record<string, unknown>);

  // Append FAQ as HTML if present
  const faq = Array.isArray((seoData as Record<string, unknown>).faq)
    ? ((seoData as Record<string, unknown>).faq as Array<{ q: string; a: string }>)
    : [];
  if (faq.length > 0) {
    const faqHtml = `<h2>Frequently Asked Questions</h2>` +
      faq.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`).join("");
    post.content_html = (post.content_html ?? "") + faqHtml;
  }

  return post;
}

// Public: get all published slugs (for generateStaticParams)
export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const serviceSupabase = createServiceClient();

  const [blogsRes, seoRes] = await Promise.all([
    supabase.from("blogs").select("slug").eq("status", "published"),
    serviceSupabase.from("seo_content").select("slug").eq("status", "published").not("content_html", "is", null),
  ]);

  const blogSlugs = (blogsRes.data ?? []).map((r: { slug: string }) => r.slug);
  const seoSlugs = (seoRes.data ?? []).map((r: { slug: string }) => String(r.slug).replace(/^\//, ""));

  return [...new Set([...blogSlugs, ...seoSlugs])];
}

// Admin: fetch all posts including drafts (service role)
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) { console.error("[blog] getAllPostsAdmin:", error.message); return []; }
  return (data ?? []).map((p: BlogPost) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : [],
    content_html: p.content_html ?? "",
  })) as BlogPost[];
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
