import { NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

async function assertAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

// GET — list all editions
export async function GET() {
  try {
    await assertAdmin();
    const db = createServiceClient();
    const { data, error } = await db
      .from("current_affairs_editions")
      .select("id, slug, type, label, date_range, published_date, status, created_at, updated_at")
      .order("published_date", { ascending: false })
      .limit(60);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ editions: data });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// POST — create new draft edition (manual)
export async function POST(req: NextRequest) {
  try {
    await assertAdmin();
    const body = await req.json();
    const db = createServiceClient();
    const { data, error } = await db
      .from("current_affairs_editions")
      .insert({ ...body, status: "draft" })
      .select("id")
      .single();
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ id: data.id }, { status: 201 });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
