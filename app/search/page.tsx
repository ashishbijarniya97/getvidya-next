import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createPublicClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string | null;
  updated_at: string | null;
}

interface CurrentAffairsEdition {
  slug: string;
  label: string;
  meta_description: string | null;
  published_date: string | null;
  status: string;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const q = searchParams.q?.trim() ?? "";
  return generateSEO({
    title: q ? `Search Results for "${q}" | GetVidya` : "Search | GetVidya",
    noIndex: true,
  });
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const q = searchParams.q?.trim() ?? "";

  let blogPosts: BlogPost[] = [];
  let caEditions: CurrentAffairsEdition[] = [];

  if (q.length > 0) {
    const supabase = createPublicClient();

    // Fetch blog posts matching title or excerpt
    try {
      const { data: titleMatches } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, updated_at")
        .ilike("title", `%${q}%`)
        .limit(10);

      const { data: excerptMatches } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, updated_at")
        .ilike("excerpt", `%${q}%`)
        .limit(10);

      const seen = new Set<string>();
      const merged: BlogPost[] = [];
      for (const post of [...(titleMatches ?? []), ...(excerptMatches ?? [])]) {
        if (!seen.has(post.slug)) {
          seen.add(post.slug);
          merged.push(post);
        }
      }
      blogPosts = merged.slice(0, 10);
    } catch {
      blogPosts = [];
    }

    // Fetch current affairs editions matching label
    try {
      const { data } = await supabase
        .from("current_affairs_editions")
        .select("slug, label, meta_description, published_date, status")
        .eq("status", "published")
        .ilike("label", `%${q}%`)
        .limit(10);
      caEditions = data ?? [];
    } catch {
      caEditions = [];
    }
  }

  const totalResults = blogPosts.length + caEditions.length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Search header */}
          <div className="mb-8">
            {q ? (
              <>
                <h1 className="text-2xl font-bold text-primary-500 mb-1">
                  Search results for: <span className="text-slate-800">{q}</span>
                </h1>
                <p className="text-slate-500 text-sm">
                  {totalResults > 0
                    ? `${totalResults} result${totalResults === 1 ? "" : "s"} found`
                    : "No results found"}
                </p>
              </>
            ) : (
              <h1 className="text-2xl font-bold text-primary-500">Search GetVidya</h1>
            )}
          </div>

          {/* Search form */}
          <form action="/search" method="GET" className="mb-10">
            <div className="flex gap-2">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search blog posts, current affairs..."
                className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 bg-white text-sm"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* No query state */}
          {!q && (
            <p className="text-slate-500 text-sm text-center py-12">
              Enter a keyword above to search across blog posts and current affairs.
            </p>
          )}

          {/* No results state */}
          {q && totalResults === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600 text-base font-medium mb-2">No results found.</p>
              <p className="text-slate-400 text-sm">Try a different keyword.</p>
            </div>
          )}

          {/* Blog posts results */}
          {blogPosts.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Blog Posts
              </h2>
              <ul className="space-y-3">
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group"
                    >
                      <p className="font-semibold text-primary-500 group-hover:underline text-base leading-snug mb-1">
                        {post.title}
                      </p>
                      {post.excerpt && (
                        <p className="text-slate-600 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                      )}
                      {post.updated_at && (
                        <p className="text-slate-400 text-xs">{formatDate(post.updated_at)}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Current affairs results */}
          {caEditions.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Current Affairs
              </h2>
              <ul className="space-y-3">
                {caEditions.map((edition) => (
                  <li key={edition.slug}>
                    <Link
                      href={`/current-affairs/${edition.slug}`}
                      className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group"
                    >
                      <p className="font-semibold text-primary-500 group-hover:underline text-base leading-snug mb-1">
                        {edition.label}
                      </p>
                      {edition.meta_description && (
                        <p className="text-slate-600 text-sm line-clamp-2 mb-2">
                          {edition.meta_description}
                        </p>
                      )}
                      {edition.published_date && (
                        <p className="text-slate-400 text-xs">{formatDate(edition.published_date)}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
