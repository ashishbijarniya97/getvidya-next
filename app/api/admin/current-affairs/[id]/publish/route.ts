import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// POST — publish a draft edition and revalidate ISR pages
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const db = createServiceClient();

    // Fetch the edition first to get its slug
    const { data: edition, error: fetchError } = await db
      .from("current_affairs_editions")
      .select("slug, status")
      .eq("id", params.id)
      .single();

    if (fetchError || !edition) {
      return Response.json({ error: "Edition not found" }, { status: 404 });
    }

    // Publish
    const { error } = await db
      .from("current_affairs_editions")
      .update({ status: "published" })
      .eq("id", params.id);

    if (error) return Response.json({ error: error.message }, { status: 500 });

    // Revalidate ISR pages
    revalidatePath("/current-affairs");
    revalidatePath(`/current-affairs/${edition.slug}`);

    return Response.json({ ok: true, slug: edition.slug });
  } catch (err) {
    console.error("[publish-ca] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — unpublish (revert to draft)
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const db = createServiceClient();
    const { data: edition } = await db
      .from("current_affairs_editions")
      .select("slug")
      .eq("id", params.id)
      .single();

    await db
      .from("current_affairs_editions")
      .update({ status: "draft" })
      .eq("id", params.id);

    if (edition?.slug) {
      revalidatePath("/current-affairs");
      revalidatePath(`/current-affairs/${edition.slug}`);
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
