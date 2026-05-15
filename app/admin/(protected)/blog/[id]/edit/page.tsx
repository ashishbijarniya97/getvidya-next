import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogEditor from "@/components/admin/blog/BlogEditor";
import type { BlogPost } from "@/lib/blog";

interface Props { params: { id: string } }

export default async function EditBlogPostPage({ params }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const db = createServiceClient();
  const { data: post, error } = await db
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !post) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-500 transition-colors mb-4">
          <ArrowLeft size={15} /> Back to posts
        </Link>
        <h1 className="text-2xl font-bold text-primary-500">Edit Post</h1>
      </div>
      <BlogEditor initialPost={post as BlogPost} />
    </div>
  );
}
