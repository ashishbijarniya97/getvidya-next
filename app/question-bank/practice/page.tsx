"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Question {
  id: number;
  category: string;
  subject: string;
  question_text: string;
  options: { A: string; B: string; C: string; D: string };
  correct_option: "A" | "B" | "C" | "D";
  explanation: string | null;
}

type Step = "select" | "quiz" | "result";
type UserAnswer = "A" | "B" | "C" | "D" | null;

const CATEGORIES = ["SSC CGL", "IB ACIO", "RJS", "Mixed"] as const;
const SUBJECTS   = ["All", "Math", "Reasoning", "English", "GK", "Law"] as const;

const CATEGORY_ICONS: Record<string, string> = {
  "SSC CGL": "📋",
  "IB ACIO": "🏛️",
  "RJS":     "⚖️",
  "Mixed":   "📚",
};

const SUBJECT_COLORS: Record<string, string> = {
  All:       "border-slate-600 hover:border-slate-400",
  Math:      "border-blue-600  hover:border-blue-400",
  Reasoning: "border-violet-600 hover:border-violet-400",
  English:   "border-emerald-600 hover:border-emerald-400",
  GK:        "border-amber-600  hover:border-amber-400",
  Law:       "border-rose-600   hover:border-rose-400",
};

const OPTION_KEYS = ["A", "B", "C", "D"] as const;

// ─── Inner Component (uses useSearchParams — must be inside <Suspense>) ──────

function PracticeInner() {
  const searchParams = useSearchParams();

  // ── State ──────────────────────────────────────────────────────────────────
  const [step, setStep]               = useState<Step>("select");
  const [category, setCategory]       = useState<string>(searchParams.get("category") ?? "SSC CGL");
  const [subject, setSubject]         = useState<string>(searchParams.get("subject")  ?? "All");
  const [questions, setQuestions]     = useState<Question[]>([]);
  const [current, setCurrent]         = useState(0);
  const [answers, setAnswers]         = useState<UserAnswer[]>([]);
  const [revealed, setRevealed]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [fetchError, setFetchError]   = useState<string | null>(null);

  // ── Auto-advance timer when correct ───────────────────────────────────────
  useEffect(() => {
    if (!revealed) return;
    const q = questions[current];
    if (!q) return;
    const chosen = answers[current];
    if (chosen !== q.correct_option) return; // wrong → wait for manual "Next"

    const timer = setTimeout(() => goNext(), 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, current]);

  // ── Fetch Questions ────────────────────────────────────────────────────────
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params = new URLSearchParams({ random: "true", limit: "10" });
      if (category) params.set("category", category);
      if (subject && subject !== "All") params.set("subject", subject);

      const res = await fetch(`/api/questions?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch questions.");
      const data: Question[] = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No questions found for this combination. Try a different filter.");
      }

      setQuestions(data);
      setAnswers(new Array(data.length).fill(null));
      setCurrent(0);
      setRevealed(false);
      setStep("quiz");
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [category, subject]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAnswer = (option: UserAnswer) => {
    if (revealed) return; // already answered
    const next = [...answers];
    next[current] = option;
    setAnswers(next);
    setRevealed(true);
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setRevealed(false);
    } else {
      setStep("result");
    }
  };

  const reset = () => {
    setStep("select");
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setRevealed(false);
    setFetchError(null);
  };

  // ── Derived values ─────────────────────────────────────────────────────────
  const score = answers.filter((a, i) => a !== null && a === questions[i]?.correct_option).length;

  const subjectErrors: Record<string, number> = {};
  questions.forEach((q, i) => {
    if (answers[i] !== q.correct_option) {
      subjectErrors[q.subject] = (subjectErrors[q.subject] ?? 0) + 1;
    }
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── Page header ── */}
          <div className="text-center pt-8 mb-8">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">MCQ Practice</h1>
            <p className="text-slate-400 text-sm">
              10 random questions · Instant explanations · No login needed
            </p>
          </div>

          {/* ═══════════════════════════════════════════════
              STEP 1 — SELECT
          ════════════════════════════════════════════════ */}
          {step === "select" && (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Choose your practice set</h2>

              {/* Category */}
              <div className="mb-6">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">
                  Exam Category
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        category === cat
                          ? "border-emerald-400 bg-emerald-500/20 text-white"
                          : "border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white"
                      }`}
                    >
                      <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                      <span className="font-semibold text-sm leading-tight">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-8">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">
                  Subject
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSubject(sub)}
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        subject === sub
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                          : `${SUBJECT_COLORS[sub] ?? "border-slate-600 hover:border-slate-400"} text-slate-300 hover:text-white`
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error from previous fetch */}
              {fetchError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5 text-red-400 text-sm">
                  {fetchError}
                </div>
              )}

              <button
                onClick={fetchQuestions}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Loading questions…
                  </>
                ) : (
                  <>
                    Start Practice <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              STEP 2 — QUIZ
          ════════════════════════════════════════════════ */}
          {step === "quiz" && questions.length > 0 && (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">

              {/* Progress */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-sm font-medium">
                  Question {current + 1} / {questions.length}
                </span>
                <span className="text-xs font-semibold bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                  {questions[current].subject} · {questions[current].category}
                </span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-1.5 mb-6">
                <div
                  className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${((current + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <p className="text-white text-lg font-medium leading-relaxed mb-6">
                {questions[current].question_text}
              </p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {OPTION_KEYS.map((key) => {
                  const text    = questions[current].options[key];
                  const chosen  = answers[current];
                  const correct = questions[current].correct_option;

                  let cls = "border-slate-600 hover:border-slate-400 text-slate-300";
                  if (revealed) {
                    if (key === correct) {
                      cls = "border-emerald-400 bg-emerald-500/20 text-emerald-300";
                    } else if (key === chosen && key !== correct) {
                      cls = "border-red-400 bg-red-500/20 text-red-300";
                    } else {
                      cls = "border-slate-700 text-slate-500 cursor-default";
                    }
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswer(key)}
                      disabled={revealed}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group ${cls} ${
                        !revealed ? "hover:text-white active:scale-[0.99] cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span className={`font-mono text-sm font-bold flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border ${
                        revealed && key === questions[current].correct_option
                          ? "border-emerald-400 text-emerald-400"
                          : revealed && key === answers[current] && key !== questions[current].correct_option
                          ? "border-red-400 text-red-400"
                          : "border-slate-500 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-300"
                      }`}>
                        {key}
                      </span>
                      <span className="leading-snug">{text}</span>
                      {revealed && key === questions[current].correct_option && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-auto mt-0.5" />
                      )}
                      {revealed && key === answers[current] && key !== questions[current].correct_option && (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 ml-auto mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed && questions[current].explanation && (
                <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Explanation
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {questions[current].explanation}
                  </p>
                </div>
              )}

              {/* Auto-advance hint & Next button */}
              {revealed && (
                <div className="flex items-center justify-between">
                  {answers[current] === questions[current].correct_option ? (
                    <p className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Correct! Moving on…
                    </p>
                  ) : (
                    <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </p>
                  )}
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm"
                  >
                    {current < questions.length - 1 ? (
                      <>Next <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <>Finish</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              STEP 3 — RESULT
          ════════════════════════════════════════════════ */}
          {step === "result" && (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">

              {/* Score circle */}
              <div className="text-center mb-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 border-4 ${
                  score >= 8 ? "border-emerald-400 bg-emerald-500/10"
                  : score >= 5 ? "border-yellow-400 bg-yellow-500/10"
                  : "border-red-400 bg-red-500/10"
                }`}>
                  <span className={`text-4xl font-bold ${
                    score >= 8 ? "text-emerald-400"
                    : score >= 5 ? "text-yellow-400"
                    : "text-red-400"
                  }`}>
                    {score}/{questions.length}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {score >= 8 ? "Outstanding!" : score >= 5 ? "Good Effort!" : "Keep Practicing!"}
                </h2>
                <p className="text-slate-400 text-sm">
                  {score >= 8
                    ? "You nailed this set. Challenge yourself with more!"
                    : score >= 5
                    ? "You're on the right track — study the explanations above."
                    : "Don't worry — review the explanations and try again."}
                </p>
              </div>

              {/* Subject breakdown of errors */}
              {Object.keys(subjectErrors).length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                  <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
                    Subjects to Review
                  </p>
                  <div className="space-y-2">
                    {Object.entries(subjectErrors).map(([sub, count]) => (
                      <div key={sub} className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">{sub}</span>
                        <span className="text-red-400 text-xs font-semibold bg-red-500/10 px-2.5 py-0.5 rounded-full">
                          {count} wrong
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Question result list */}
              <div className="mb-8">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
                  All Questions
                </p>
                <div className="space-y-2">
                  {questions.map((q, i) => {
                    const isCorrect = answers[i] === q.correct_option;
                    return (
                      <div
                        key={q.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border ${
                          isCorrect
                            ? "border-emerald-500/20 bg-emerald-500/5"
                            : "border-red-500/20 bg-red-500/5"
                        }`}
                      >
                        {isCorrect
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          : <XCircle     className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                        <div className="min-w-0">
                          <p className="text-slate-300 text-sm leading-snug line-clamp-2">
                            {i + 1}. {q.question_text}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-400 text-xs mt-1">
                              Correct: {q.correct_option}. {q.options[q.correct_option]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Try Another Set
                </button>
                <a
                  href="https://app.getvidya.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  Get Full Bank in App <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-slate-500 text-xs text-center">
                  GetVidya Vidya Pass · Unlimited mock tests · AI study plan · ₹149/month
                </p>
              </div>
            </div>
          )}

          {/* Bottom breadcrumb */}
          <div className="mt-6 text-center">
            <Link href="/question-bank" className="text-slate-500 hover:text-slate-300 text-sm transition-colors inline-flex items-center gap-1">
              ← Back to Question Bank
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Page export — wraps inner in Suspense (required for useSearchParams) ────

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
      }
    >
      <PracticeInner />
    </Suspense>
  );
}
