import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

// Refresh the ISR-cached current-affairs pages so a new/just-published
// edition appears immediately instead of waiting for the revalidate window.
function refreshCurrentAffairs(slug: string) {
  revalidatePath("/current-affairs");
  revalidatePath(`/current-affairs/${slug}`);
}

export const dynamic = "force-dynamic";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function todayIST(): string {
  // Convert UTC to IST (+5:30) and return YYYY-MM-DD
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().split("T")[0];
}

function dailySlug(dateISO: string): string {
  // "2026-05-25" → "may-25-2026"
  const [year, month, day] = dateISO.split("-");
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  return `${months[parseInt(month) - 1]}-${parseInt(day)}-${year}`;
}

function formatDisplayDate(dateISO: string): string {
  const d = new Date(dateISO + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

const SECTION_STYLES: Record<string, { colorClass: string; badgeClass: string }> = {
  "National Affairs":       { colorClass: "border-blue-400 bg-blue-50",    badgeClass: "bg-blue-100 text-blue-700" },
  "International Affairs":  { colorClass: "border-violet-400 bg-violet-50", badgeClass: "bg-violet-100 text-violet-700" },
  "Economy & Finance":      { colorClass: "border-emerald-400 bg-emerald-50",badgeClass: "bg-emerald-100 text-emerald-700" },
  "Science & Technology":   { colorClass: "border-orange-400 bg-orange-50", badgeClass: "bg-orange-100 text-orange-700" },
  "Sports":                 { colorClass: "border-rose-400 bg-rose-50",     badgeClass: "bg-rose-100 text-rose-700" },
};

async function generateCAContent(dateISO: string): Promise<object[]> {
  const displayDate = formatDisplayDate(dateISO);

  const prompt = `You are an expert current affairs editor for Indian government competitive exam preparation (SSC CGL, UPSC CSE, IBPS PO, Railway RRB).

Today's date: ${displayDate}

Generate 5–7 current affairs items for today, covering events relevant to Indian government exams. Focus on:
- Events that realistically could happen in India or involving India on this date
- National policy announcements, scheme launches, appointments
- International bilateral meets, summits, treaty signings
- RBI/SEBI/Finance Ministry decisions, economic indicators
- ISRO/DRDO/CSIR scientific achievements
- Sports: national team results, international tournaments, athlete records

For each item provide:
- "headline": concise factual headline (under 15 words)
- "detail": 2–3 sentences with specific numbers, dates, organisations, and key facts that an exam aspirant needs to know
- "examAngle": which exams this targets and what specific facts to memorise (e.g. "SSC CGL / Banking: repo rate, MPC vote count, basis points definition")
- "category": exactly one of: "National Affairs", "International Affairs", "Economy & Finance", "Science & Technology", "Sports"

Return ONLY valid JSON (no markdown fences, no explanation):
{
  "items": [
    { "category": "...", "headline": "...", "detail": "...", "examAngle": "..." },
    ...
  ]
}`;

  const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  let raw = result.response.text().trim();

  // Strip markdown fences if Gemini adds them
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "").trim();
  }

  const parsed = JSON.parse(raw) as { items: { category: string; headline: string; detail: string; examAngle: string }[] };

  // Group by category preserving order
  const grouped = new Map<string, { headline: string; detail: string; examAngle: string }[]>();
  for (const item of parsed.items) {
    const cat = item.category;
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push({ headline: item.headline, detail: item.detail, examAngle: item.examAngle });
  }

  const sections: object[] = [];
  for (const [category, items] of grouped.entries()) {
    const style = SECTION_STYLES[category] ?? { colorClass: "border-slate-400 bg-slate-50", badgeClass: "bg-slate-100 text-slate-700" };
    sections.push({ category, ...style, items });
  }

  return sections;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayIST();
  const slug = dailySlug(today);
  const db = createServiceClient();

  // Idempotency: skip if edition already exists for today
  const { data: existing } = await db
    .from("current_affairs_editions")
    .select("id, status")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    // Ensure the page reflects an already-generated edition (e.g. after a
    // status change or a cache miss) even when we skip regeneration.
    refreshCurrentAffairs(slug);
    return Response.json({ skipped: true, slug, reason: "Edition already exists", status: existing.status });
  }

  // Generate content
  let sections: object[];
  try {
    sections = await generateCAContent(today);
  } catch (e) {
    // Surface the real cause (e.g. a deprecated model) instead of an empty 500.
    console.error("[generate-ca] generation failed:", e);
    return Response.json({ error: "Generation failed", detail: String(e) }, { status: 500 });
  }
  const displayDate = formatDisplayDate(today);
  const label = `Daily — ${displayDate}`;

  const { data, error } = await db
    .from("current_affairs_editions")
    .insert({
      slug,
      type: "daily",
      label,
      date_range: displayDate,
      published_date: today,
      status: "published",
      meta_title: `Current Affairs Today ${displayDate} — SSC CGL UPSC Banking Daily Update`,
      meta_description: `Daily current affairs ${displayDate} for SSC CGL, UPSC, IBPS PO, Railway exams. AI-curated events with exam angles — review and practice on GetVidyaAI.`,
      keywords: [`current affairs today ${displayDate}`, "daily current affairs India", "GetVidyaAI current affairs"],
      exam_tags: "SSC CGL · UPSC CSE · Banking · Railway RRB",
      sections,
      faqs: [],
      about_things: [],
    })
    .select("id")
    .single();

  if (error) {
    console.error("[generate-ca] Supabase error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  refreshCurrentAffairs(slug);

  return Response.json({ ok: true, slug, id: data.id, sections_count: sections.length });
}
