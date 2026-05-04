"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, RefreshCw, CheckCircle, Search } from "lucide-react";
import type { SiteContent } from "@/types";

const SECTIONS = ["All", "Hero", "Stats", "About", "Contact", "Footer", "SEO"];

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [filtered, setFiltered] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("All");
  const [edits, setEdits] = useState<Record<string, string>>({});

  const supabase = createClient();

  const fetchContent = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("site_content").select("*").order("section").order("label");
    setContent(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  useEffect(() => {
    let result = content;
    if (section !== "All") result = result.filter((c) => c.section === section);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.label?.toLowerCase().includes(q) || c.key?.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [content, section, search]);

  const handleEdit = (id: string, value: string) => {
    setEdits((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (item: SiteContent) => {
    const value = edits[item.id] ?? item.value;
    setSaving(item.id);
    await supabase.from("site_content").update({ value, updated_at: new Date().toISOString() }).eq("id", item.id);
    setContent((prev) => prev.map((c) => (c.id === item.id ? { ...c, value } : c)));
    setSaving(null);
    setSaved(item.id);
    setTimeout(() => setSaved(null), 2000);
  };

  const getValue = (item: SiteContent) => edits[item.id] ?? item.value;
  const isDirty = (item: SiteContent) => edits[item.id] !== undefined && edits[item.id] !== item.value;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Site Content</h1>
          <p className="text-slate-500 text-sm mt-1">Edit all website text content inline.</p>
        </div>
        <button onClick={fetchContent} className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search content blocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                section === s
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Content blocks */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p>No content blocks found. Add them to your Supabase <code>site_content</code> table.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Group by section */}
          {SECTIONS.filter((s) => s !== "All").map((sec) => {
            const items = filtered.filter((c) => c.section === sec);
            if (items.length === 0) return null;
            return (
              <div key={sec} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-semibold text-primary-500 text-sm uppercase tracking-wider">{sec}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div key={item.id} className="px-6 py-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="font-medium text-primary-500 text-sm">{item.label}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{item.key}</div>
                        </div>
                        <button
                          onClick={() => handleSave(item)}
                          disabled={saving === item.id || !isDirty(item)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            saved === item.id
                              ? "bg-green-100 text-green-700"
                              : isDirty(item)
                              ? "bg-primary-500 text-white hover:bg-primary-400"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          {saved === item.id ? (
                            <><CheckCircle size={13} /> Saved</>
                          ) : saving === item.id ? (
                            <><span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                          ) : (
                            <><Save size={13} /> Save</>
                          )}
                        </button>
                      </div>

                      {item.type === "html" || getValue(item).length > 100 ? (
                        <textarea
                          value={getValue(item)}
                          onChange={(e) => handleEdit(item.id, e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 resize-y font-mono"
                        />
                      ) : (
                        <input
                          type="text"
                          value={getValue(item)}
                          onChange={(e) => handleEdit(item.id, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Ungrouped items */}
          {filtered.filter((c) => !SECTIONS.slice(1).includes(c.section)).length > 0 && (
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-primary-500 text-sm uppercase tracking-wider">Other</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {filtered.filter((c) => !SECTIONS.slice(1).includes(c.section)).map((item) => (
                  <div key={item.id} className="px-6 py-5 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-primary-500 text-sm">{item.label}</div>
                      <input
                        type="text"
                        value={getValue(item)}
                        onChange={(e) => handleEdit(item.id, e.target.value)}
                        className="w-full mt-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-teal"
                      />
                    </div>
                    <button onClick={() => handleSave(item)} disabled={saving === item.id || !isDirty(item)}
                      className="flex-shrink-0 p-2.5 rounded-xl bg-primary-500 text-white disabled:opacity-40 hover:bg-primary-400 transition-colors">
                      {saved === item.id ? <CheckCircle size={16} /> : <Save size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
