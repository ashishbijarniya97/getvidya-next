const HASHNODE_API = "https://gql.hashnode.com";
const PUBLICATION_HOST = "getvidya.hashnode.dev";

async function hashnodeQuery(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(HASHNODE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Hashnode API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
}

export interface HashnodePost {
  id: string;
  title: string;
  slug: string;
  brief: string;
  coverImage: { url: string } | null;
  author: { name: string; profilePicture: string | null };
  readTimeInMinutes: number;
  publishedAt: string;
  tags: { name: string; slug: string }[];
}

export interface HashnodePostFull extends HashnodePost {
  content: { html: string };
  seo: { title: string | null; description: string | null } | null;
}

export async function getPosts(first = 20): Promise<HashnodePost[]> {
  const data = await hashnodeQuery(
    `query GetPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id title slug brief
              coverImage { url }
              author { name profilePicture }
              readTimeInMinutes publishedAt
              tags { name slug }
            }
          }
        }
      }
    }`,
    { host: PUBLICATION_HOST, first }
  );
  return data.publication?.posts?.edges?.map((e: { node: HashnodePost }) => e.node) ?? [];
}

export async function getPost(slug: string): Promise<HashnodePostFull | null> {
  const data = await hashnodeQuery(
    `query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id title slug brief
          content { html }
          coverImage { url }
          author { name profilePicture }
          readTimeInMinutes publishedAt
          tags { name slug }
          seo { title description }
        }
      }
    }`,
    { host: PUBLICATION_HOST, slug }
  );
  return data.publication?.post ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts(100);
  return posts.map((p) => p.slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
