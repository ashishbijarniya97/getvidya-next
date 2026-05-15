/**
 * One-time migrator: imports all Hashnode posts into Supabase `blogs` table.
 *
 * Run with:
 *   cd getvidya-next
 *   npx tsx scripts/migrate-hashnode-to-supabase.ts
 *
 * Requires env vars (copy from .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const HASHNODE_API = "https://gql.hashnode.com";
const PUBLICATION_HOST = "getvidya.hashnode.dev";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY);

// ── Hashnode types ────────────────────────────────────────────────────────────

interface HNTag { name: string; slug: string }

interface HNPostNode {
  id: string;
  title: string;
  slug: string;
  brief: string;
  coverImage: { url: string } | null;
  author: { name: string };
  publishedAt: string;
  tags: HNTag[];
}

interface HNPostFull extends HNPostNode {
  content: { html: string };
  seo: { title: string | null; description: string | null } | null;
}

// ── GQL helpers ───────────────────────────────────────────────────────────────

async function hnQuery(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(HASHNODE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Hashnode HTTP ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

async function fetchAllSlugs(): Promise<HNPostNode[]> {
  const posts: HNPostNode[] = [];
  let cursor: string | null = null;

  while (true) {
    const data = await hnQuery(
      `query ListPosts($host: String!, $first: Int!, $after: String) {
        publication(host: $host) {
          posts(first: $first, after: $after) {
            pageInfo { hasNextPage endCursor }
            edges {
              node {
                id title slug brief publishedAt
                coverImage { url }
                author { name }
                tags { name slug }
              }
            }
          }
        }
      }`,
      { host: PUBLICATION_HOST, first: 50, after: cursor }
    );

    const { edges, pageInfo } = data.publication.posts;
    posts.push(...edges.map((e: { node: HNPostNode }) => e.node));
    if (!pageInfo.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }

  return posts;
}

async function fetchFullPost(slug: string): Promise<HNPostFull | null> {
  try {
    const data = await hnQuery(
      `query GetPost($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            id title slug brief publishedAt
            content { html }
            coverImage { url }
            author { name }
            tags { name slug }
            seo { title description }
          }
        }
      }`,
      { host: PUBLICATION_HOST, slug }
    );
    return data.publication?.post ?? null;
  } catch (err) {
    console.warn(`  ⚠ Failed to fetch full post for "${slug}":`, (err as Error).message);
    return null;
  }
}

// ── Strip HTML to plain text excerpt ─────────────────────────────────────────

function extractExcerpt(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching post list from Hashnode…");
  let stubs: HNPostNode[];
  try {
    stubs = await fetchAllSlugs();
  } catch (err) {
    console.error("Could not fetch post list:", (err as Error).message);
    console.error("Hashnode GQL API may be deprecated/blocked. Migrate manually if needed.");
    process.exit(1);
  }

  console.log(`Found ${stubs.length} posts. Migrating…\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const stub of stubs) {
    process.stdout.write(`  → ${stub.slug} … `);

    // Check if already exists
    const { data: existing } = await db
      .from("blogs")
      .select("id")
      .eq("slug", stub.slug)
      .maybeSingle();

    if (existing) {
      console.log("already exists, skipping");
      skipped++;
      continue;
    }

    const full = await fetchFullPost(stub.slug);
    if (!full) { failed++; continue; }

    const contentHtml = full.content.html;
    const excerpt = full.brief || extractExcerpt(contentHtml);

    const { error } = await db.from("blogs").insert({
      title: full.title,
      slug: full.slug,
      content: null,
      content_html: contentHtml,
      excerpt,
      featured_image_url: full.coverImage?.url ?? null,
      author_name: full.author.name,
      status: "published",
      seo_title: full.seo?.title ?? null,
      seo_description: full.seo?.description ?? null,
      og_image_url: full.coverImage?.url ?? null,
      tags: full.tags.map((t) => t.slug),
      published_at: full.publishedAt,
    });

    if (error) {
      console.log(`FAILED: ${error.message}`);
      failed++;
    } else {
      console.log("created");
      created++;
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone. Created: ${created} · Skipped: ${skipped} · Failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
