import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogEditor from "@/components/admin/blog/BlogEditor";

export default async function NewBlogPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-500 transition-colors mb-4">
          <ArrowLeft size={15} /> Back to posts
        </Link>
        <h1 className="text-2xl font-bold text-primary-500">New Post</h1>
      </div>
      <BlogEditor />
    </div>
  );
}
