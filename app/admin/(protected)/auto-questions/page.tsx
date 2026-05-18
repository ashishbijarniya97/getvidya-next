"use client";

import { useEffect, useState } from "react";
import { Zap, RefreshCw, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

type Stat = {
  category: string;
  subject:  string;
  target:   number;
  have:     number;
  gap:      number;
};

type StatusMsg = { type: "success" | "error"; text: string };

export default function AutoQuestionsPage() {
  const [stats, setStats]       = useState<Stat[]>([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [running, setRunning]   = useState(false);
  const [msg, setMsg]           = useState<StatusMsg | null>(null);

  async function fetchStats() {
    setLoading(true);
    const res  = await fetch("/api/admin/auto-questions");
    const data = await res.json();
    setStats(data.stats ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }

  useEffect(() => { fetchStats(); }, []);

  async function handleGenerate() {
    setRunning(true);
    setMsg(null);
    try {
      const res  = await fetch("/api/admin/auto-questions", { method: "POST" });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMsg({ type: "error", text: data.error ?? "Generation failed." });
      } else if (data.message) {
        setMsg({ type: "success", text: data.message });
      } else {
        setMsg({
          type: "success",
          text: `Generated ${data.inserted} questions for ${data.category} › ${data.subject}. Gap remaining: ${data.gap_remaining}`,
        });
        fetchStats();
      }
    } catch (e) {
      setMsg({ type: "error", text: e instanceof Error ? e.message : "Unexpected error" });
    } finally {
      setRunning(false);
    }
  }

  const totalTarget = stats.reduce((a, s) => a + s.target, 0);
  const totalGap    = stats.reduce((a, s) => a + s.gap, 0);
  const pct         = totalTarget > 0 ? Math.round(((totalTarget - totalGap) / totalTarget) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Auto-Question Engine</h1>
          <p className="text-slate-500 text-sm mt-1">AI generates 50 questions per run · 4× daily · targets weakest subject first</p>
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700 text-sm font-medium self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE · 200 questions/day
        </span>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Total Questions</p>
          <p className="text-4xl font-bold text-primary-500">{total.toLocaleString("en-IN")}</p>
          <p className="text-xs text-slate-400 mt-1">across all categories</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Target Progress</p>
          <p className="text-4xl font-bold text-primary-500">{pct}%</p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-teal h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Gap to Fill</p>
          <p className="text-4xl font-bold text-primary-500">{totalGap.toLocaleString("en-IN")}</p>
          <p className="text-xs text-slate-400 mt-1">~{Math.ceil(totalGap / 200)} days at current rate</p>
        </div>
      </div>

      {/* Generate button */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-600">
            Manually trigger one generation run. Picks the category+subject furthest below its target and generates 50 questions via Gemini AI.
          </p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={running}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {running ? (
            <><RefreshCw size={15} className="animate-spin" /> Generating…</>
          ) : (
            <><Zap size={15} /> Generate 50 Now</>
          )}
        </button>
      </div>

      {msg && (
        <div className={`flex items-start gap-3 px-5 py-4 rounded-xl text-sm border ${
          msg.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {msg.type === "success"
            ? <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
            : <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />}
          {msg.text}
        </div>
      )}

      {/* Progress table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp size={15} /> Progress by Category
          </h2>
          <button onClick={fetchStats} disabled={loading} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Category", "Subject", "Have", "Target", "Gap", "Progress"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">Loading…</td></tr>
              ) : (
                stats
                  .sort((a, b) => b.gap - a.gap)
                  .map((s) => {
                    const pctRow = Math.round((s.have / s.target) * 100);
                    return (
                      <tr key={`${s.category}-${s.subject}`} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">{s.category}</span>
                        </td>
                        <td className="px-5 py-3 font-medium text-slate-700">{s.subject}</td>
                        <td className="px-5 py-3 text-slate-700 font-semibold">{s.have.toLocaleString("en-IN")}</td>
                        <td className="px-5 py-3 text-slate-400">{s.target.toLocaleString("en-IN")}</td>
                        <td className="px-5 py-3">
                          <span className={`font-semibold ${s.gap === 0 ? "text-emerald-600" : "text-orange-500"}`}>
                            {s.gap === 0 ? "✓ Done" : s.gap}
                          </span>
                        </td>
                        <td className="px-5 py-3 min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all ${pctRow >= 100 ? "bg-emerald-500" : "bg-teal"}`}
                                style={{ width: `${Math.min(100, pctRow)}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 w-8 text-right">{pctRow}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-5">How It Works</h2>
        <ol className="space-y-3">
          {[
            "Runs automatically 4× daily (6 AM, 12 PM, 6 PM, 11 PM IST)",
            "Counts current questions per category+subject, picks the one furthest below target",
            "Sends a strict prompt to Gemini AI — generates 50 accurate MCQs in one call",
            "Parses the CSV response, validates every row, inserts into Supabase",
            "At 200 questions/day, all 1,850 targets are met in ~6 days",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 text-primary-500 text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <span className="text-sm text-slate-600 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}
