import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PenSquare, Plus, Eye, Clock, CheckCircle2, Trash2 } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  return status === "published" ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
      <CheckCircle2 size={10} /> Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
      <Clock size={10} /> Draft
    </span>
  );
}

export default async function BlogAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const db = createServiceClient();
  const { data } = await db
    .from("blogs")
    .select("id, title, slug, status, tags, published_at, updated_at, excerpt, featured_image_url")
    .order("updated_at", { ascending: false });

  const posts = (data ?? []) as BlogPost[];
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Blog Posts</h1>
          <p className="text-slate-500 text-sm mt-1">
            {published} published · {drafts} draft{drafts !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <PenSquare size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500 font-medium">No posts yet</p>
          <p className="text-slate-400 text-sm mt-1 mb-4">Create your first blog post to get started.</p>
          <Link href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600">
            <Plus size={15} /> Create first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Tags</th>
                <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Updated</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(posts as BlogPost[]).map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary-500 line-clamp-1">{post.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(post.tags ?? []).slice(0, 3).map((t) => (
                        <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-400 hidden lg:table-cell whitespace-nowrap">
                    {new Date(post.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary-500 transition-colors">
                        <PenSquare size={14} /> Edit
                      </Link>
                      {post.status === "published" && (
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal transition-colors">
                          <Eye size={14} /> View
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
