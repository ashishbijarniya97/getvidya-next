import type { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, BookOpen, Trophy } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";

/* ── Slug → DB value maps ───────────────────────────────────────────────────── */

const EXAM_SLUG_MAP: Record<string, string> = {
  "ssc-cgl":   "SSC CGL",
  "ib-acio":   "IB ACIO",
  "rjs":       "RJS",
  "upsc":          "UPSC CSE",
  "upsc-cse":      "UPSC CSE",
  "railway":       "Railway NTPC",
  "railway-ntpc":  "Railway NTPC",
  "ntpc":          "Railway NTPC",
  "banking":       "SBI PO",
  "sbi-po":        "SBI PO",
  "sbi":           "SBI PO",
  "defence":       "NDA/CDS",
  "nda":           "NDA/CDS",
  "nda-cds":       "NDA/CDS",
  "cds":           "NDA/CDS",
  "state-psc":     "Mixed",
};

const TOPIC_SLUG_MAP: Record<string, string> = {
  "math":           "Math",
  "mathematics":    "Math",
  "quantitative":   "Math",
  "reasoning":      "Reasoning",
  "general-intelligence": "Reasoning",
  "english":        "English",
  "gk":             "GK",
  "general-knowledge": "GK",
  "general-awareness": "GK",
  "current-affairs": "GK",
  "law":            "Law",
};

function slugToLabel(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ── Fetch questions from Supabase ──────────────────────────────────────────── */

type DBQuestion = {
  id: string;
  question_text: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
};

async function fetchQuestions(examSlug: string, topicSlug: string): Promise<DBQuestion[]> {
  const category = EXAM_SLUG_MAP[examSlug];
  const subject  = TOPIC_SLUG_MAP[topicSlug];

  const supabase = createServiceClient();

  // Build query — if we have a direct mapping use it, otherwise fall back to any active questions
  let query = supabase
    .from("questions")
    .select("id, question_text, options, correct_option, explanation")
    .eq("is_active", true)
    .limit(100);

  if (category && category !== "Mixed") query = query.eq("category", category);
  if (subject)  query = query.eq("subject", subject);

  const { data } = await query;

  if (!data || data.length === 0) {
    // Last resort: return any 5 active questions
    const { data: fallback } = await supabase
      .from("questions")
      .select("id, question_text, options, correct_option, explanation")
      .eq("is_active", true)
      .limit(5);
    return (fallback ?? []) as DBQuestion[];
  }

  // Shuffle and return 5
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5) as DBQuestion[];
}

/* ── JSON-LD schema ─────────────────────────────────────────────────────────── */

function buildQuizSchema(exam: string, topic: string, questions: DBQuestion[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${slugToLabel(topic)} Practice Questions for ${slugToLabel(exam)}`,
    description: `Practice ${slugToLabel(topic)} MCQs for ${slugToLabel(exam)} exam. Free sample questions with explanations on GetVidyaAI.`,
    educationalLevel: "Competitive Exam",
    about: { "@type": "Thing", name: slugToLabel(exam) },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.question_text,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.options[q.correct_option],
        comment: { "@type": "Comment", text: q.explanation },
      },
      suggestedAnswer: Object.entries(q.options)
        .filter(([k]) => k !== q.correct_option)
        .map(([, v]) => ({ "@type": "Answer", text: v })),
    })),
  };
}

/* ── Metadata ───────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: { exam: string; topic: string };
}): Promise<Metadata> {
  return generateSEO({
    title: `${slugToLabel(params.topic)} Practice Questions | ${slugToLabel(params.exam)} Prep — GetVidya`,
    description: `Practice ${slugToLabel(params.topic)} MCQs for ${slugToLabel(params.exam)}. Free sample questions with explanations on GetVidyaAI.`,
    keywords: [
      `${slugToLabel(params.topic)} questions ${slugToLabel(params.exam)}`,
      `${slugToLabel(params.exam)} ${slugToLabel(params.topic)} MCQ`,
      `${slugToLabel(params.exam)} practice test`,
    ],
    canonical: `https://getvidya.in/practice/${params.exam}/${params.topic}`,
  });
}

/* ── Page ───────────────────────────────────────────────────────────────────── */

export default async function PracticeTopicPage({
  params,
}: {
  params: { exam: string; topic: string };
}) {
  const questions  = await fetchQuestions(params.exam, params.topic);
  const quizSchema = buildQuizSchema(params.exam, params.topic, questions);
  const examLabel  = slugToLabel(params.exam);
  const topicLabel = slugToLabel(params.topic);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <Navbar />

      <main className="pt-20 min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-hero py-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
          <div className="container-xl relative z-10">
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-5">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/exams" className="hover:text-white/80 transition-colors">Exams</Link>
              <span>/</span>
              <Link href={`/exams/${params.exam}`} className="hover:text-white/80 transition-colors">{examLabel}</Link>
              <span>/</span>
              <span className="text-white">{topicLabel}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <BookOpen size={14} />
              Practice Questions
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{topicLabel} MCQs</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Free sample questions for <span className="text-white font-semibold">{examLabel}</span>. Powered by GetVidyaAI.
            </p>
          </div>
        </section>

        {/* Questions */}
        <section className="py-14">
          <div className="container-xl max-w-3xl">
            {questions.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-400 text-sm mb-2">No questions available for this topic yet.</p>
                <p className="text-slate-400 text-xs">More questions are being added — check back soon.</p>
              </div>
            ) : (
              <>
                <p className="text-slate-500 text-sm mb-8 text-center">
                  Showing {questions.length} sample questions · Unlock 10,000+ questions with a free account
                </p>

                <div className="space-y-8">
                  {questions.map((q, qi) => {
                    const optionEntries = Object.entries(q.options).sort();
                    const correctIdx    = optionEntries.findIndex(([k]) => k === q.correct_option);

                    return (
                      <div key={q.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-start gap-4 p-6 pb-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold text-sm">
                            {qi + 1}
                          </div>
                          <h2 className="text-primary-500 font-semibold text-base leading-relaxed">{q.question_text}</h2>
                        </div>

                        <div className="px-6 pb-4 space-y-2 pl-[3.75rem]">
                          {optionEntries.map(([letter, text], oi) => (
                            <div
                              key={letter}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                                oi === correctIdx
                                  ? "border-teal/40 bg-teal/5 text-teal font-medium"
                                  : "border-slate-100 bg-slate-50 text-slate-600"
                              }`}
                            >
                              {oi === correctIdx ? (
                                <CheckCircle2 size={15} className="flex-shrink-0 text-teal" />
                              ) : (
                                <span className="w-[15px] h-[15px] flex-shrink-0 rounded-full border border-slate-300 inline-block" />
                              )}
                              <span className="font-mono text-slate-400 mr-1">{letter}.</span>
                              {text}
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <div className="mx-6 mb-6 mt-2 ml-[3.75rem] p-4 bg-blue-50 border border-blue-100 rounded-xl">
                            <p className="text-blue-700 text-sm">
                              <span className="font-semibold">Explanation: </span>{q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* CTA */}
            <div className="mt-12 text-center bg-gradient-hero rounded-3xl p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 text-teal font-semibold text-sm mb-3">
                  <Trophy size={16} />
                  Ready to go further?
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Practice 10,000+ Questions Free</h3>
                <p className="text-white/65 text-sm mb-7 max-w-md mx-auto">
                  GetVidyaAI adapts to your performance and identifies your weak areas automatically. Start free — no credit card needed.
                </p>
                <a
                  href="https://app.getvidya.in/signup"
                  className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
                >
                  Practice 10,000+ Questions Free <ArrowRight size={16} />
                </a>
                <p className="text-white/40 text-xs mt-4">Free forever · No credit card required</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
