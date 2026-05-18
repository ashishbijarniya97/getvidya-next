import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient, createServiceClient } from "@/lib/supabase/server";

// Groq (LLaMA 3.3 70B) — OpenAI-compatible, very fast
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// OpenAI GPT-4o-mini
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Gemini 1.5 Flash
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Priority matrix — [category, subject, target]
const TARGETS: [string, string, number][] = [
  ["SSC CGL",   "Math",      200],
  ["SSC CGL",   "Reasoning", 200],
  ["SSC CGL",   "English",   200],
  ["SSC CGL",   "GK",        200],
  ["IB ACIO",   "Reasoning", 150],
  ["IB ACIO",   "English",   150],
  ["IB ACIO",   "GK",        150],
  ["IB ACIO",   "Math",      150],
  ["RJS",       "Law",       200],
  ["RJS",       "Reasoning", 150],
  ["RJS",       "English",   150],
  ["UPSC CSE",     "GK",        400],
  ["UPSC CSE",     "Reasoning", 200],
  ["UPSC CSE",     "Math",      200],
  ["UPSC CSE",     "English",   200],
  ["Railway NTPC", "GK",        200],
  ["Railway NTPC", "Math",      200],
  ["Railway NTPC", "Reasoning", 200],
  ["SBI PO",       "English",   200],
  ["SBI PO",       "Math",      200],
  ["SBI PO",       "Reasoning", 200],
  ["SBI PO",       "GK",        200],
  ["NDA/CDS",      "Math",      200],
  ["NDA/CDS",      "GK",        200],
  ["NDA/CDS",      "English",   200],
];

function buildPrompt(category: string, subject: string, count = 50): string {
  return `Generate exactly ${count} MCQ questions for Indian government competitive exam preparation.

category = ${category}
subject = ${subject}

Output ONLY raw CSV. No markdown fences. No code blocks. No explanation. Start immediately with the header.

Header (line 1, exactly as written):
category,subject,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,type,source_type

Rules:
- correct_option must be A, B, C, or D only
- type = MCQ
- source_type = PRACTICE
- Wrap any field containing a comma in double quotes
- Questions must be factually accurate and ${category} exam level
- No duplicate questions
- explanation must be 1 sentence stating why the answer is correct
${subject === "GK" ? "- Cover Indian history, geography, polity, science, economy, current affairs" : ""}
${subject === "Law" ? "- Cover Indian Penal Code, CPC, Evidence Act, Constitutional Law for RJS level" : ""}
${subject === "Math" ? "- Cover arithmetic, algebra, geometry, percentages, time & work, speed & distance" : ""}
${subject === "Reasoning" ? "- Cover analogy, series, coding-decoding, blood relations, directions, syllogism" : ""}
${subject === "English" ? "- Cover grammar, vocabulary, idioms, fill in the blanks, error spotting, synonyms, antonyms" : ""}

Generate ${count} questions now:`;
}

function parseCsvToRecords(raw: string): Record<string, string>[] {
  const cleaned = raw
    .replace(/^```[a-z]*\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const lines = cleaned.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));

  return lines.slice(1).map((line) => {
    const cols: string[] = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQ = !inQ; continue; }
      if (line[i] === "," && !inQ) { cols.push(cur); cur = ""; continue; }
      cur += line[i];
    }
    cols.push(cur);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (cols[i] ?? "").trim(); });
    return obj;
  });
}

async function generateWithGroq(category: string, subject: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: buildPrompt(category, subject, 50) }],
    temperature: 0.7,
  });
  return completion.choices[0].message.content ?? "";
}

async function generateWithOpenAI(category: string, subject: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: buildPrompt(category, subject, 50) }],
    temperature: 0.7,
  });
  return completion.choices[0].message.content ?? "";
}

async function generateWithGemini(category: string, subject: string): Promise<string> {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(buildPrompt(category, subject, 50));
  return result.response.text();
}

function rowsToRecords(rows: Record<string, string>[], category: string, subject: string) {
  return rows
    .filter((r) => r.question_text && r.option_a && r.option_b && r.option_c && r.option_d && r.correct_option)
    .map((r) => ({
      category,
      subject,
      question_text:  r.question_text,
      options:        { A: r.option_a, B: r.option_b, C: r.option_c, D: r.option_d },
      correct_option: r.correct_option.toUpperCase().trim().charAt(0),
      explanation:    r.explanation ?? "",
      type:           "MCQ",
      source_type:    "PRACTICE",
      exam_id:        null,
      exam_name:      null,
      question_number: null,
      is_active:      true,
    }));
}

export async function POST(req: NextRequest) {
  // Auth: cron secret OR admin session
  const cronSecret = req.headers.get("x-cron-secret");
  if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createServiceClient();

  // Count existing questions per category+subject
  const { data: counts } = await db
    .from("questions")
    .select("category, subject")
    .eq("is_active", true);

  const countMap: Record<string, number> = {};
  for (const row of counts ?? []) {
    const key = `${row.category}||${row.subject}`;
    countMap[key] = (countMap[key] ?? 0) + 1;
  }

  // Pick the combo furthest below its target
  let bestTarget: [string, string, number] | null = null;
  let bestGap = -1;

  for (const [cat, subj, target] of TARGETS) {
    const have = countMap[`${cat}||${subj}`] ?? 0;
    const gap  = target - have;
    if (gap > bestGap) { bestGap = gap; bestTarget = [cat, subj, target]; }
  }

  if (!bestTarget || bestGap <= 0) {
    return NextResponse.json({ message: "All targets met — no generation needed." });
  }

  const [category, subject] = bestTarget;

  // Fire all 3 AIs in parallel
  const results = await Promise.allSettled([
    generateWithGroq(category, subject),
    generateWithOpenAI(category, subject),
    generateWithGemini(category, subject),
  ]);

  const sources = ["Groq/LLaMA", "OpenAI/GPT-4o-mini", "Gemini/Flash"];
  const allRecords: ReturnType<typeof rowsToRecords> = [];
  const perAI: Record<string, number> = {};

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "fulfilled") {
      const rows = parseCsvToRecords(r.value);
      const recs = rowsToRecords(rows, category, subject);
      allRecords.push(...recs);
      perAI[sources[i]] = recs.length;
    } else {
      perAI[sources[i]] = 0;
    }
  }

  if (allRecords.length === 0) {
    return NextResponse.json({ error: "All AI providers returned no parseable rows" }, { status: 500 });
  }

  const { data: inserted, error } = await db
    .from("questions")
    .insert(allRecords)
    .select("id");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    success:       true,
    category,
    subject,
    per_ai:        perAI,
    generated:     allRecords.length,
    inserted:      inserted?.length ?? 0,
    gap_remaining: bestGap - (inserted?.length ?? 0),
  });
}

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = createServiceClient();

  const { data: counts } = await db
    .from("questions")
    .select("category, subject")
    .eq("is_active", true);

  const countMap: Record<string, number> = {};
  for (const row of counts ?? []) {
    const key = `${row.category}||${row.subject}`;
    countMap[key] = (countMap[key] ?? 0) + 1;
  }

  const stats = TARGETS.map(([cat, subj, target]) => ({
    category: cat,
    subject: subj,
    target,
    have: countMap[`${cat}||${subj}`] ?? 0,
    gap: Math.max(0, target - (countMap[`${cat}||${subj}`] ?? 0)),
  }));

  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  return NextResponse.json({ stats, total });
}
