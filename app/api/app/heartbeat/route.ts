import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// Called by the mobile app on each session/app-open to mark the device active.
// Refreshes last_seen so 7d / 30d active-user counts stay accurate.
export async function POST(req: NextRequest) {
  try {
    const { device_id } = await req.json();

    if (!device_id || typeof device_id !== "string") {
      return NextResponse.json({ error: "device_id is required" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const now = new Date().toISOString();
    const id = device_id.trim();

    const { data, error } = await supabase
      .from("app_installs")
      .update({ last_seen: now })
      .eq("device_id", id)
      .select("id");

    if (error) {
      console.error("[app/heartbeat] Supabase update error:", error.message);
      return NextResponse.json({ error: "Failed to record activity" }, { status: 500 });
    }

    // Heartbeat from a device we never saw install (e.g. install ping was lost).
    // Create a minimal record so it still counts toward active users.
    if (!data || data.length === 0) {
      await supabase.from("app_installs").insert({
        device_id:      id,
        install_source: "unknown",
        first_seen:     now,
        last_seen:      now,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[app/heartbeat] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
