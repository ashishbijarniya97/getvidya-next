import { NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

async function assertAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
}

// GET — fetch single edition
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await assertAdmin();
    const db = createServiceClient();
    const { data, error } = await db
      .from("current_affairs_editions")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) return Response.json({ error: error.message }, { status: 404 });
    return Response.json({ edition: data });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// PATCH — update edition content (sections, faqs, metadata)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await assertAdmin();
    const body = await req.json();
    // Never allow overriding status via this route — use /publish
    delete body.status;
    const db = createServiceClient();
    const { error } = await db
      .from("current_affairs_editions")
      .update(body)
      .eq("id", params.id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// DELETE — remove edition
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await assertAdmin();
    const db = createServiceClient();
    const { error } = await db
      .from("current_affairs_editions")
      .delete()
      .eq("id", params.id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
