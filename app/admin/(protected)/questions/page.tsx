"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Search, Download, RefreshCw, ChevronDown, ChevronUp,
  CheckCircle2, XCircle, BookOpen, Filter, Inbox,
} from "lucide-react";

type Question = {
  id: string;
  category: string;
  subject: string;
  question_text: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
  type: string;
  source_type: "PRACTICE" | "EXAM_VAULT";
  exam_id: string | null;
  exam_name: string | null;
  question_number: number | null;
  is_active: boolean;
  created_at: string;
};

const CATEGORIES  = ["SSC CGL", "IB ACIO", "RJS", "Mixed"];
const SUBJECTS    = ["Math", "Reasoning", "English", "GK", "Law"];
const SOURCE_TYPES = ["PRACTICE", "EXAM_VAULT"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "SSC CGL": "bg-blue-100 text-blue-700",
  "IB ACIO": "bg-purple-100 text-purple-700",
  "RJS":     "bg-rose-100 text-rose-700",
  "Mixed":   "bg-amber-100 text-amber-700",
};
const SUBJECT_COLORS: Record<string, string> = {
  Math:      "bg-sky-100 text-sky-700",
  Reasoning: "bg-violet-100 text-violet-700",
  English:   "bg-emerald-100 text-emerald-700",
  GK:        "bg-orange-100 text-orange-700",
  Law:       "bg-red-100 text-red-700",
};

const PAGE_SIZE = 25;

function OptionBadge({ letter, text, isCorrect, isSelected }: {
  letter: string; text: string; isCorrect: boolean; isSelected: boolean;
}) {
  return (
    <div className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm border ${
      isCorrect
        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
        : "bg-slate-50 border-slate-200 text-slate-600"
    }`}>
      <span className={`font-bold text-xs mt-0.5 w-4 shrink-0 ${isCorrect ? "text-emerald-600" : "text-slate-400"}`}>
        {letter}.
      </span>
      <span className="flex-1">{text}</span>
      {isCorrect && <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />}
    </div>
  );
}

function QuestionRow({ q, onToggleActive }: {
  q: Question;
  onToggleActive: (id: string, val: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className={`hover:bg-slate-50 transition-colors cursor-pointer ${!q.is_active ? "opacity-50" : ""}`}
        onClick={() => setExpanded((e) => !e)}
      >
        {/* Question text */}
        <td className="px-5 py-4 max-w-[380px]">
          <p className="text-sm text-slate-800 font-medium line-clamp-2 leading-snug">
            {q.question_text}
          </p>
        </td>
        {/* Category */}
        <td className="px-4 py-4 whitespace-nowrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[q.category] ?? "bg-slate-100 text-slate-600"}`}>
            {q.category}
          </span>
        </td>
        {/* Subject */}
        <td className="px-4 py-4 whitespace-nowrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SUBJECT_COLORS[q.subject] ?? "bg-slate-100 text-slate-600"}`}>
            {q.subject}
          </span>
        </td>
        {/* Source type */}
        <td className="px-4 py-4 whitespace-nowrap">
          {q.source_type === "EXAM_VAULT" ? (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700" title={q.exam_name ?? q.exam_id ?? ""}>
              🔒 {q.exam_id ? q.exam_id.replace(/_/g, " ").substring(0, 16) : "Exam Vault"}
            </span>
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
              🎯 Practice
            </span>
          )}
        </td>
        {/* Correct */}
        <td className="px-4 py-4 text-center">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
            {q.correct_option}
          </span>
        </td>
        {/* Active toggle */}
        <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onToggleActive(q.id, !q.is_active)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${q.is_active ? "bg-emerald-400" : "bg-slate-300"}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${q.is_active ? "left-6" : "left-1"}`} />
          </button>
        </td>
        {/* Expand chevron */}
        <td className="px-4 py-4 text-slate-400">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>

      {/* Expanded detail row */}
      {expanded && (
        <tr className="bg-slate-50 border-t border-slate-100">
          <td colSpan={7} className="px-8 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {Object.entries(q.options).sort().map(([letter, text]) => (
                <OptionBadge
                  key={letter}
                  letter={letter}
                  text={text}
                  isCorrect={letter === q.correct_option}
                  isSelected={false}
                />
              ))}
            </div>
            {q.explanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800">
                <span className="font-semibold">Explanation: </span>{q.explanation}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default function QuestionsPage() {
  const [questions, setQuestions]   = useState<Question[]>([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("all");
  const [subject, setSubject]       = useState("all");
  const [sourceType, setSourceType] = useState("all");
  const [activeFilter, setActive]   = useState<"all" | "active" | "inactive">("all");
  const [page, setPage]             = useState(0);

  const supabase = createClient();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);

    let q = supabase
      .from("questions")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (category   !== "all") q = q.eq("category",    category);
    if (subject    !== "all") q = q.eq("subject",     subject);
    if (sourceType !== "all") q = q.eq("source_type", sourceType);
    if (activeFilter === "active")   q = q.eq("is_active", true);
    if (activeFilter === "inactive") q = q.eq("is_active", false);
    if (search) q = q.ilike("question_text", `%${search}%`);

    const { data, count } = await q.range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    setQuestions(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [supabase, category, subject, activeFilter, search, page]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  // Reset page on filter change
  useEffect(() => { setPage(0); }, [category, subject, sourceType, activeFilter, search]);

  const toggleActive = async (id: string, val: boolean) => {
    await supabase.from("questions").update({ is_active: val }).eq("id", id);
    setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, is_active: val } : q));
  };

  const exportCSV = () => {
    const headers = ["category", "subject", "question_text", "option_a", "option_b", "option_c", "option_d", "correct_option", "explanation"];
    const rows = questions.map((q) => [
      q.category, q.subject,
      `"${q.question_text.replace(/"/g, '""')}"`,
      q.options.A ?? "", q.options.B ?? "", q.options.C ?? "", q.options.D ?? "",
      q.correct_option,
      `"${(q.explanation ?? "").replace(/"/g, '""')}"`,
    ]);
    const csv  = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "getvidya-questions.csv"; a.click();
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Question Bank</h1>
          <p className="text-slate-500 text-sm mt-1">
            {total.toLocaleString("en-IN")} questions · Page {page + 1} of {totalPages || 1}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchQuestions} className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Questions", value: total.toLocaleString("en-IN"), color: "bg-blue-50 text-blue-700" },
          { label: "SSC CGL",         value: category === "SSC CGL" ? questions.length : "—", color: "bg-slate-50 text-slate-700" },
          { label: "IB ACIO",         value: category === "IB ACIO" ? questions.length : "—", color: "bg-purple-50 text-purple-700" },
          { label: "RJS",             value: category === "RJS" ? questions.length : "—",     color: "bg-rose-50 text-rose-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`rounded-2xl p-4 ${color}`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs font-medium mt-1 opacity-70">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" placeholder="Search question text..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal bg-white"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="appearance-none pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white font-medium text-slate-700 cursor-pointer">
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Subject */}
        <div className="relative">
          <BookOpen size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select value={subject} onChange={(e) => setSubject(e.target.value)}
            className="appearance-none pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white font-medium text-slate-700 cursor-pointer">
            <option value="all">All Subjects</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Source type */}
        <div className="relative">
          <select value={sourceType} onChange={(e) => setSourceType(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white font-medium text-slate-700 cursor-pointer">
            <option value="all">All Types</option>
            <option value="PRACTICE">🎯 Practice Pool</option>
            <option value="EXAM_VAULT">🔒 Exam Vault</option>
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Active filter */}
        <div className="relative">
          <select value={activeFilter} onChange={(e) => setActive(e.target.value as typeof activeFilter)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white font-medium text-slate-700 cursor-pointer">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Inbox size={40} className="mx-auto mb-3 opacity-40" />
            <p>No questions match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Question", "Category", "Subject", "Type", "Ans", "Active", ""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {questions.map((q) => (
                  <QuestionRow key={q.id} q={q} onToggleActive={toggleActive} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-slate-400">
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total.toLocaleString("en-IN")}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
              return (
                <button key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                    p === page ? "bg-primary-500 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {p + 1}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
