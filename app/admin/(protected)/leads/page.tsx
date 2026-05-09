"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, Download, Inbox, RefreshCw, ChevronDown, Brain, Trophy, AlertTriangle } from "lucide-react";
import type { Lead } from "@/types";

const STATUS_OPTIONS: Lead["status"][] = ["new", "contacted", "converted", "closed"];

const STATUS_COLORS: Record<Lead["status"], string> = {
  new:       "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  converted: "bg-green-100 text-green-700",
  closed:    "bg-slate-100 text-slate-600",
};

function parseAssessment(message: string | null) {
  if (!message) return null;
  try {
    const d = JSON.parse(message);
    if (d.exam) return d as { exam: string; score: number; total: number; weakSubjects: string[] };
  } catch {}
  return null;
}

function ScoreBadge({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100);
  const color = pct >= 80 ? "bg-emerald-100 text-emerald-700" : pct >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      <Trophy size={10} /> {score}/{total}
    </span>
  );
}

export default function LeadsPage() {
  const [leads, setLeads]         = useState<Lead[]>([]);
  const [filtered, setFiltered]   = useState<Lead[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState<Lead["status"] | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "free-assessment" | "other">("all");
  const [updating, setUpdating]   = useState<string | null>(null);

  const supabase = createClient();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  useEffect(() => {
    let result = leads;
    if (statusFilter !== "all") result = result.filter((l) => l.status === statusFilter);
    if (sourceFilter === "free-assessment") result = result.filter((l) => l.source === "free-assessment");
    if (sourceFilter === "other") result = result.filter((l) => l.source !== "free-assessment");
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.message?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [leads, search, statusFilter, sourceFilter]);

  const updateStatus = async (id: string, status: Lead["status"]) => {
    setUpdating(id);
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setUpdating(null);
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Exam", "Score", "Weak Subjects", "Status", "Source", "Date"];
    const rows = filtered.map((l) => {
      const a = parseAssessment(l.message);
      return [
        l.name, l.phone, l.email,
        a?.exam ?? "",
        a ? `${a.score}/${a.total}` : "",
        a ? `"${a.weakSubjects.join(", ")}"` : "",
        l.status, l.source,
        new Date(l.created_at).toLocaleDateString("en-IN"),
      ];
    });
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "getvidya-leads.csv"; a.click();
  };

  // Stats
  const assessmentLeads = leads.filter((l) => l.source === "free-assessment");
  const avgScore = assessmentLeads.length
    ? Math.round(
        assessmentLeads.reduce((sum, l) => {
          const a = parseAssessment(l.message);
          return sum + (a ? (a.score / a.total) * 100 : 0);
        }, 0) / assessmentLeads.length
      )
    : 0;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Leads & Assessments</h1>
          <p className="text-slate-500 text-sm mt-1">{filtered.length} of {leads.length} total</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchLeads} className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
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
          { label: "Total Leads",       value: leads.length,             icon: "👥", color: "bg-blue-50 text-blue-700" },
          { label: "Assessments Taken", value: assessmentLeads.length,   icon: "🧠", color: "bg-emerald-50 text-emerald-700" },
          { label: "Avg Score",         value: `${avgScore}%`,           icon: "📊", color: "bg-amber-50 text-amber-700" },
          { label: "New (Uncontacted)", value: leads.filter((l) => l.status === "new").length, icon: "🔔", color: "bg-red-50 text-red-700" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`rounded-2xl p-4 ${color}`}>
            <p className="text-2xl font-bold">{icon} {value}</p>
            <p className="text-xs font-medium mt-1 opacity-80">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by name, phone, email, exam..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal bg-white"
          />
        </div>
        <div className="relative">
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as typeof sourceFilter)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white font-medium text-slate-700 cursor-pointer">
            <option value="all">All Sources</option>
            <option value="free-assessment">🧠 Free Assessment</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Lead["status"] | "all")}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white font-medium text-slate-700 cursor-pointer">
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
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
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Inbox size={40} className="mx-auto mb-3 opacity-40" />
            <p>No leads match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Student", "Phone", "Exam", "Score", "Weak Subjects", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((lead) => {
                  const assessment = parseAssessment(lead.message);
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
                            {lead.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{lead.name}</p>
                            {lead.email && <p className="text-slate-400 text-xs">{lead.email}</p>}
                          </div>
                        </div>
                      </td>
                      {/* Phone */}
                      <td className="px-5 py-4">
                        <a href={`tel:${lead.phone}`} className="text-slate-700 font-medium hover:text-teal transition-colors">{lead.phone}</a>
                      </td>
                      {/* Exam */}
                      <td className="px-5 py-4">
                        {assessment ? (
                          <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                            <Brain size={13} className="text-emerald-500 shrink-0" />
                            {assessment.exam}
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                      {/* Score */}
                      <td className="px-5 py-4">
                        {assessment ? (
                          <ScoreBadge score={assessment.score} total={assessment.total} />
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                      {/* Weak Subjects */}
                      <td className="px-5 py-4 max-w-[220px]">
                        {assessment?.weakSubjects?.length ? (
                          <div className="flex flex-wrap gap-1">
                            {assessment.weakSubjects.map((s: string) => (
                              <span key={s} className="inline-flex items-center gap-0.5 bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full">
                                <AlertTriangle size={9} /> {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <div className="relative">
                          <select value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                            disabled={updating === lead.id}
                            className={`appearance-none pl-3 pr-7 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer outline-none ${STATUS_COLORS[lead.status]}`}>
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                          <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>
                      {/* Date */}
                      <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
