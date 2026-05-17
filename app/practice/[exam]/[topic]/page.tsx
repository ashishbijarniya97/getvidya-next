import type { Metadata } from "next";
import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, BookOpen, Trophy } from "lucide-react";

/* ── Helpers ────────────────────────────────────────────────────────────────── */

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── Static sample questions (SSC GK fallback) ───────────────────────────────
   These are used when no exam/topic-specific set exists.
   Replace with a real DB/API call for production.
──────────────────────────────────────────────────────────────────────────────── */

const SAMPLE_QUESTIONS: Record<
  string,
  {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[]
> = {
  default: [
    {
      id: 1,
      question:
        "Which planet in our solar system has the most natural satellites (moons)?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctIndex: 1,
      explanation:
        "Saturn holds the record with 146 confirmed moons as of 2023, surpassing Jupiter's 95.",
    },
    {
      id: 2,
      question:
        "The 'Right to Education' is guaranteed under which Article of the Indian Constitution?",
      options: ["Article 19", "Article 21", "Article 21A", "Article 24"],
      correctIndex: 2,
      explanation:
        "Article 21A, inserted by the 86th Constitutional Amendment Act (2002), provides free and compulsory education to children aged 6–14 years.",
    },
    {
      id: 3,
      question:
        "Which of the following is NOT a Fundamental Duty listed in Article 51A of the Indian Constitution?",
      options: [
        "To protect the natural environment",
        "To safeguard public property",
        "To vote in every election",
        "To uphold the sovereignty of India",
      ],
      correctIndex: 2,
      explanation:
        "Voting in elections is not listed as a Fundamental Duty under Article 51A, though it is considered a civic responsibility.",
    },
  ],
};

function getQuestions(exam: string, topic: string) {
  const key = `${exam}__${topic}`;
  return SAMPLE_QUESTIONS[key] ?? SAMPLE_QUESTIONS["default"];
}

/* ── JSON-LD Quiz/Question schema ────────────────────────────────────────────── */

function buildQuizSchema(
  exam: string,
  topic: string,
  questions: (typeof SAMPLE_QUESTIONS)["default"]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${slugToLabel(topic)} Practice Questions for ${slugToLabel(exam)}`,
    description: `Practice ${slugToLabel(topic)} MCQs for ${slugToLabel(exam)} exam. Free sample questions with explanations on GetVidya AI.`,
    educationalLevel: "Competitive Exam",
    about: {
      "@type": "Thing",
      name: slugToLabel(exam),
    },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.options[q.correctIndex],
        comment: { "@type": "Comment", text: q.explanation },
      },
      suggestedAnswer: q.options
        .filter((_, i) => i !== q.correctIndex)
        .map((opt) => ({ "@type": "Answer", text: opt })),
    })),
  };
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: { exam: string; topic: string };
}): Promise<Metadata> {
  const examLabel = slugToLabel(params.exam);
  const topicLabel = slugToLabel(params.topic);

  return generateSEO({
    title: `${topicLabel} Practice Questions | ${examLabel} Prep — GetVidya`,
    description: `Practice ${topicLabel} MCQs for ${examLabel}. Free sample questions with explanations on GetVidya AI.`,
    keywords: [
      `${topicLabel} questions ${examLabel}`,
      `${examLabel} ${topicLabel} MCQ`,
      `${examLabel} practice test`,
      `${topicLabel} quiz ${examLabel}`,
    ],
    canonical: `https://getvidya.in/practice/${params.exam}/${params.topic}`,
  });
}

/* ── Page component ──────────────────────────────────────────────────────── */

export default function PracticeTopicPage({
  params,
}: {
  params: { exam: string; topic: string };
}) {
  const examLabel = slugToLabel(params.exam);
  const topicLabel = slugToLabel(params.topic);
  const questions = getQuestions(params.exam, params.topic);
  const quizSchema = buildQuizSchema(params.exam, params.topic, questions);

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
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="container-xl relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-5">
              <Link href="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/exams"
                className="hover:text-white/80 transition-colors"
              >
                Exams
              </Link>
              <span>/</span>
              <Link
                href={`/exams/${params.exam}`}
                className="hover:text-white/80 transition-colors"
              >
                {examLabel}
              </Link>
              <span>/</span>
              <span className="text-white">{topicLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <BookOpen size={14} />
              Practice Questions
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {topicLabel} MCQs
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Free sample questions for{" "}
              <span className="text-white font-semibold">{examLabel}</span>.
              Powered by GetVidyaAI.
            </p>
          </div>
        </section>

        {/* Questions */}
        <section className="py-14">
          <div className="container-xl max-w-3xl">
            <p className="text-slate-500 text-sm mb-8 text-center">
              Showing 3 sample questions · Unlock 10,000+ questions with a free
              account
            </p>

            <div className="space-y-8">
              {questions.map((q, qi) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Question header */}
                  <div className="flex items-start gap-4 p-6 pb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold text-sm">
                      {qi + 1}
                    </div>
                    <h2 className="text-primary-500 font-semibold text-base leading-relaxed">
                      {q.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="px-6 pb-4 space-y-2 pl-[3.75rem]">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                          oi === q.correctIndex
                            ? "border-teal/40 bg-teal/5 text-teal font-medium"
                            : "border-slate-100 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {oi === q.correctIndex ? (
                          <CheckCircle2
                            size={15}
                            className="flex-shrink-0 text-teal"
                          />
                        ) : (
                          <span className="w-[15px] h-[15px] flex-shrink-0 rounded-full border border-slate-300 inline-block" />
                        )}
                        <span className="font-mono text-slate-400 mr-1">
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="mx-6 mb-6 mt-2 ml-[3.75rem] p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-blue-700 text-sm">
                      <span className="font-semibold">Explanation: </span>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 text-center bg-gradient-hero rounded-3xl p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 text-teal font-semibold text-sm mb-3">
                  <Trophy size={16} />
                  Ready to go further?
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Practice 10,000+ Questions Free
                </h3>
                <p className="text-white/65 text-sm mb-7 max-w-md mx-auto">
                  GetVidyaAI adapts to your performance and identifies your weak
                  areas automatically. Start free — no credit card needed.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
                >
                  Practice 10,000+ Questions Free{" "}
                  <ArrowRight size={16} />
                </Link>
                <p className="text-white/40 text-xs mt-4">
                  Free forever · No credit card required
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
