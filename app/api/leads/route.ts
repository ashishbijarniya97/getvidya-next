import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, exam, score, total, weakSubjects } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "name, email, and phone are required" }, { status: 400 });
    }

    const supabase = createServiceClient();

    const message = exam
      ? `Exam: ${exam} | Score: ${score}/${total} | Weak: ${(weakSubjects ?? []).join(", ")}`
      : undefined;

    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      source: "free-assessment",
      status: "new",
      ...(message && { message }),
    });

    if (error) {
      console.error("[leads] Supabase insert error:", error.message);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
