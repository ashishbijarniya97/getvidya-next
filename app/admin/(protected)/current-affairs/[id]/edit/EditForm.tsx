"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2, ArrowLeft, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface CAItem {
  headline: string;
  detail: string;
  examAngle: string;
}

interface CASection {
  category: string;
  colorClass: string;
  badgeClass: string;
  items: CAItem[];
}

interface Edition {
  id: string;
  slug: string;
  type: string;
  label: string;
  date_range: string;
  status: string;
  meta_title: string;
  meta_description: string;
  exam_tags: string;
  sections: CASection[];
  faqs: { q: string; a: string }[];
}

const CATEGORY_STYLES: Record<string, { colorClass: string; badgeClass: string }> = {
  "National Affairs":      { colorClass: "border-blue-400 bg-blue-50",    badgeClass: "bg-blue-100 text-blue-700" },
  "International Affairs": { colorClass: "border-violet-400 bg-violet-50", badgeClass: "bg-violet-100 text-violet-700" },
  "Economy & Finance":     { colorClass: "border-emerald-400 bg-emerald-50",badgeClass: "bg-emerald-100 text-emerald-700" },
  "Science & Technology":  { colorClass: "border-orange-400 bg-orange-50", badgeClass: "bg-orange-100 text-orange-700" },
  "Sports":                { colorClass: "border-rose-400 bg-rose-50",     badgeClass: "bg-rose-100 text-rose-700" },
};

export default function EditForm({ edition }: { edition: Edition }) {
  const router = useRouter();
  const [sections, setSections] = useState<CASection[]>(edition.sections);
  const [meta, setMeta] = useState({
    meta_title: edition.meta_title,
    meta_description: edition.meta_description,
    exam_tags: edition.exam_tags,
  });
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState("");

  function updateItem(sIdx: number, iIdx: number, field: keyof CAItem, value: string) {
    setSections((prev) => {
      const next = structuredClone(prev);
      next[sIdx].items[iIdx][field] = value;
      return next;
    });
    setSaved(false);
  }

  function removeItem(sIdx: number, iIdx: number) {
    setSections((prev) => {
      const next = structuredClone(prev);
      next[sIdx].items.splice(iIdx, 1);
      if (next[sIdx].items.length === 0) next.splice(sIdx, 1);
      return next;
    });
    setSaved(false);
  }

  function addItem(sIdx: number) {
    setSections((prev) => {
      const next = structuredClone(prev);
      next[sIdx].items.push({ headline: "", detail: "", examAngle: "" });
      return next;
    });
    setSaved(false);
  }

  function addSection(category: string) {
    if (sections.find((s) => s.category === category)) return;
    const style = CATEGORY_STYLES[category] ?? { colorClass: "border-slate-300 bg-slate-50", badgeClass: "bg-slate-100 text-slate-700" };
    setSections((prev) => [...prev, { category, ...style, items: [{ headline: "", detail: "", examAngle: "" }] }]);
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    const res = await fetch(`/api/admin/current-affairs/${edition.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections, ...meta }),
    });
    const json = await res.json();
    setSaving(false);
    if (json.ok) { setSaved(true); setMsg("Saved successfully."); }
    else setMsg(json.error ?? "Save failed.");
  }

  async function handlePublish() {
    // Save first
    await handleSave();
    setPublishing(true);
    setMsg("");
    const res = await fetch(`/api/admin/current-affairs/${edition.id}/publish`, { method: "POST" });
    const json = await res.json();
    setPublishing(false);
    if (json.ok) {
      setMsg("Published! Redirecting…");
      setTimeout(() => router.push("/admin/current-affairs"), 1200);
    } else {
      setMsg(json.error ?? "Publish failed.");
    }
  }

  async function handleUnpublish() {
    const res = await fetch(`/api/admin/current-affairs/${edition.id}/publish`, { method: "DELETE" });
    const json = await res.json();
    if (json.ok) router.push("/admin/current-affairs");
    else setMsg(json.error ?? "Failed.");
  }

  const isPublished = edition.status === "published";

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/current-affairs" className="text-slate-400 hover:text-slate-600">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">{edition.label}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{edition.date_range} · {edition.type}</p>
        </div>
        <div className="flex gap-2 items-center">
          {isPublished && (
            <Link
              href={`/current-affairs/${edition.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <Eye size={12} /> View Live
            </Link>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <Save size={12} /> {saving ? "Saving…" : "Save"}
          </button>
          {isPublished ? (
            <button
              onClick={handleUnpublish}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              <CheckCircle2 size={12} /> {publishing ? "Publishing…" : "Publish"}
            </button>
          )}
        </div>
      </div>

      {msg && (
        <div className={`mb-4 p-3 rounded-lg text-xs border ${saved ? "bg-green-50 border-green-200 text-green-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
          {msg}
        </div>
      )}

      {/* Meta fields */}
      <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">SEO & Metadata</h2>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Meta Title</label>
          <input
            value={meta.meta_title}
            onChange={(e) => setMeta((m) => ({ ...m, meta_title: e.target.value }))}
            className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Meta Description</label>
          <textarea
            value={meta.meta_description}
            onChange={(e) => setMeta((m) => ({ ...m, meta_description: e.target.value }))}
            rows={2}
            className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Exam Tags</label>
          <input
            value={meta.exam_tags}
            onChange={(e) => setMeta((m) => ({ ...m, exam_tags: e.target.value }))}
            className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal"
            placeholder="SSC CGL · UPSC CSE · Banking · Railway RRB"
          />
        </div>
      </div>

      {/* CA Items */}
      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <div key={section.category} className={`rounded-xl border-l-4 ${section.colorClass} p-4`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${section.badgeClass}`}>
                {section.category}
              </span>
              <button
                onClick={() => addItem(sIdx)}
                className="text-xs text-slate-500 hover:text-primary-500 underline"
              >
                + Add item
              </button>
            </div>

            <div className="space-y-4">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="bg-white rounded-lg border border-white/60 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs text-slate-400 font-medium">Item {iIdx + 1}</span>
                    <button
                      onClick={() => removeItem(sIdx, iIdx)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Headline</label>
                      <input
                        value={item.headline}
                        onChange={(e) => updateItem(sIdx, iIdx, "headline", e.target.value)}
                        className="w-full text-sm font-semibold border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal"
                        placeholder="News headline"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Detail</label>
                      <textarea
                        value={item.detail}
                        onChange={(e) => updateItem(sIdx, iIdx, "detail", e.target.value)}
                        rows={3}
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal resize-none"
                        placeholder="2–3 sentences with key facts, numbers, organisations"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Exam Angle</label>
                      <input
                        value={item.examAngle}
                        onChange={(e) => updateItem(sIdx, iIdx, "examAngle", e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal text-slate-600"
                        placeholder="SSC CGL / UPSC: key facts to memorise"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add section */}
      <div className="mt-6 p-4 rounded-xl border border-dashed border-slate-300">
        <p className="text-xs text-slate-500 mb-2">Add a category section:</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(CATEGORY_STYLES).filter((c) => !sections.find((s) => s.category === c)).map((cat) => (
            <button
              key={cat}
              onClick={() => addSection(cat)}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-300 text-slate-600 hover:border-primary-500 hover:text-primary-500"
            >
              + {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Publish footer */}
      <div className="mt-8 flex justify-end gap-3">
        <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50">
          {saving ? "Saving…" : "Save Draft"}
        </button>
        {!isPublished && (
          <button onClick={handlePublish} disabled={publishing} className="px-6 py-2.5 text-sm rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50">
            {publishing ? "Publishing…" : "Publish to Site"}
          </button>
        )}
      </div>
    </div>
  );
}
