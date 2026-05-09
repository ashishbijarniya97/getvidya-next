import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// Dynamic because we read searchParams at request time
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const category = searchParams.get("category") || null;
    const subject  = searchParams.get("subject")  || null;
    const isRandom = searchParams.get("random") === "true";
    const limit    = Math.min(parseInt(searchParams.get("limit")  || "10", 10), 50);
    let   offset   = parseInt(searchParams.get("offset") || "0", 10);

    const supabase = createServiceClient();

    // Build base query
    const buildQuery = (sb: ReturnType<typeof createServiceClient>) => {
      let q = sb.from("questions").select("*").eq("is_active", true);
      if (category) q = q.eq("category", category);
      if (subject)  q = q.eq("subject",  subject);
      return q;
    };

    if (isRandom) {
      // Step 1: get total count matching filters
      let countQ = supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true);
      if (category) countQ = countQ.eq("category", category);
      if (subject)  countQ = countQ.eq("subject",  subject);

      const { count, error: countError } = await countQ;

      if (countError) {
        console.error("[questions] count error:", countError.message);
        return NextResponse.json({ error: "Failed to fetch question count" }, { status: 500 });
      }

      const total = count ?? 0;
      if (total === 0) {
        return NextResponse.json([]);
      }

      // Step 2: pick a random offset so we can get `limit` rows
      const maxOffset = Math.max(0, total - limit);
      offset = Math.floor(Math.random() * (maxOffset + 1));
    }

    // Fetch questions
    const { data, error } = await buildQuery(supabase)
      .range(offset, offset + limit - 1)
      .order("id");

    if (error) {
      console.error("[questions] fetch error:", error.message);
      return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("[questions] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
