import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const VALID_CATEGORIES  = ["SSC CGL", "IB ACIO", "RJS", "Mixed"] as const;
const VALID_SUBJECTS    = ["Math", "Reasoning", "English", "GK", "Law"] as const;
const VALID_SOURCE_TYPES = ["PRACTICE", "EXAM_VAULT"] as const;
const VALID_OPTIONS     = ["A", "B", "C", "D"] as const;

type RawRow = {
  category: string;
  subject: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation?: string;
  type?: string;
  source_type?: string;
};

function parseCSV(text: string): RawRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));

  return lines.slice(1).map((line) => {
    // Handle quoted fields with commas inside
    const cols: string[] = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuote = !inQuote; continue; }
      if (line[i] === "," && !inQuote) { cols.push(cur); cur = ""; continue; }
      cur += line[i];
    }
    cols.push(cur);

    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (cols[i] ?? "").trim(); });
    return obj as unknown as RawRow;
  });
}

function validateRow(row: RawRow, idx: number): string | null {
  if (!row.question_text) return `Row ${idx + 1}: question_text is required`;
  if (!VALID_CATEGORIES.includes(row.category as never))
    return `Row ${idx + 1}: invalid category "${row.category}" — must be one of: ${VALID_CATEGORIES.join(", ")}`;
  if (!VALID_SUBJECTS.includes(row.subject as never))
    return `Row ${idx + 1}: invalid subject "${row.subject}" — must be one of: ${VALID_SUBJECTS.join(", ")}`;
  if (!VALID_OPTIONS.includes(row.correct_option?.toUpperCase() as never))
    return `Row ${idx + 1}: correct_option must be A, B, C, or D`;
  if (!row.option_a || !row.option_b || !row.option_c || !row.option_d)
    return `Row ${idx + 1}: all four options (option_a–d) are required`;
  return null;
}

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") ?? "";
  let rows: RawRow[] = [];

  if (contentType.includes("text/csv")) {
    const text = await req.text();
    rows = parseCSV(text);
  } else {
    const body = await req.json();
    // Accept { questions: RawRow[] } or raw array
    rows = Array.isArray(body) ? body : body.questions ?? [];
  }

  if (!rows.length) {
    return NextResponse.json({ error: "No questions found in payload" }, { status: 400 });
  }

  // Validate
  const errors: string[] = [];
  rows.forEach((row, i) => {
    const err = validateRow(row, i);
    if (err) errors.push(err);
  });
  if (errors.length) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 422 });
  }

  // Shape for insert
  const records = rows.map((row) => ({
    category:       row.category,
    subject:        row.subject,
    question_text:  row.question_text,
    options: {
      A: row.option_a,
      B: row.option_b,
      C: row.option_c,
      D: row.option_d,
    },
    correct_option: row.correct_option.toUpperCase(),
    explanation:    row.explanation ?? "",
    type:           row.type ?? "MCQ",
    source_type:    VALID_SOURCE_TYPES.includes(row.source_type as never)
                      ? row.source_type
                      : "PRACTICE",
    exam_id:        null,
    exam_name:      null,
    question_number: null,
    is_active:      true,
  }));

  const db = createServiceClient();
  const { data, error } = await db
    .from("questions")
    .insert(records)
    .select("id");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ inserted: data?.length ?? 0 });
}
