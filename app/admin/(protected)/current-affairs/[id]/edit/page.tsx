import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import EditForm from "./EditForm";

export const dynamic = "force-dynamic";

export default async function EditEditionPage({ params }: { params: { id: string } }) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");

  const db = createServiceClient();
  const { data: edition, error } = await db
    .from("current_affairs_editions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !edition) redirect("/admin/current-affairs");

  return <EditForm edition={edition} />;
}
