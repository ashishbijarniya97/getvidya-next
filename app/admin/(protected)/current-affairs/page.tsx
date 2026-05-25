"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Pencil, Flame, Calendar, RefreshCw, Database } from "lucide-react";

interface Edition {
  id: string;
  slug: string;
  type: "daily" | "weekly";
  label: string;
  date_range: string;
  published_date: string;
  status: "draft" | "published";
  updated_at: string;
}

function StatusBadge({ status }: { status: string }) {
  return status === "published" ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
      <CheckCircle2 size={10} /> Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
      <Clock size={10} /> Draft
    </span>
  );
}

export default function CurrentAffairsAdminPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [msg, setMsg] = useState("");

  async function loadEditions() {
    setLoading(true);
    const res = await fetch("/api/admin/current-affairs");
    const json = await res.json();
    setEditions(json.editions ?? []);
    setLoading(false);
  }

  async function handleGenerate() {
    setGenerating(true);
    setMsg("");
    const res = await fetch(`/api/cron/generate-ca`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET ?? ""}` },
    });
    // Cron requires the secret — trigger via server-side proxy instead
    const proxyRes = await fetch("/api/admin/current-affairs/trigger-generate", { method: "POST" });
    const json = await proxyRes.json();
    if (json.skipped) setMsg(`Already exists: ${json.slug}`);
    else if (json.ok) setMsg(`Draft created: ${json.slug}`);
    else setMsg(json.error ?? "Failed");
    setGenerating(false);
    loadEditions();
  }

  async function handleSeed() {
    setSeeding(true);
    setMsg("");
    const res = await fetch("/api/admin/current-affairs/seed", { method: "POST" });
    const json = await res.json();
    setMsg(`Seeded: ${JSON.stringify(json.seeded?.map((s: { slug: string; result: string }) => `${s.slug}: ${s.result}`))}`);
    setSeeding(false);
    loadEditions();
  }

  useEffect(() => { loadEditions(); }, []);

  const drafts = editions.filter((e) => e.status === "draft");
  const published = editions.filter((e) => e.status === "published");

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Current Affairs</h1>
          <p className="text-slate-500 text-sm mt-1">{drafts.length} draft{drafts.length !== 1 ? "s" : ""} · {published.length} published</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <Database size={13} />
            {seeding ? "Seeding…" : "Seed Static Editions"}
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50"
          >
            <RefreshCw size={14} className={generating ? "animate-spin" : ""} />
            {generating ? "Generating…" : "Generate Today's Draft"}
          </button>
        </div>
      </div>

      {msg && (
        <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs">
          {msg}
        </div>
      )}

      {/* Drafts — shown prominently */}
      {drafts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
            Needs Review — {drafts.length} draft{drafts.length !== 1 ? "s" : ""}
          </h2>
          <div className="space-y-2">
            {drafts.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4 rounded-xl border-2 border-amber-300 bg-amber-50">
                <div className="flex items-center gap-3">
                  {e.type === "daily" ? <Flame size={16} className="text-orange-500" /> : <Calendar size={16} className="text-blue-500" />}
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{e.label}</div>
                    <div className="text-xs text-slate-500">{e.date_range}</div>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
                <Link
                  href={`/admin/current-affairs/${e.id}/edit`}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                >
                  <Pencil size={11} /> Review &amp; Publish
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Published */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Published</h2>
        {loading ? (
          <div className="text-slate-400 text-sm">Loading…</div>
        ) : published.length === 0 ? (
          <div className="text-slate-400 text-sm">No published editions yet. Seed static editions or generate a draft and publish it.</div>
        ) : (
          <div className="space-y-2">
            {published.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  {e.type === "daily" ? <Flame size={16} className="text-orange-400" /> : <Calendar size={16} className="text-blue-400" />}
                  <div>
                    <div className="font-semibold text-slate-700 text-sm">{e.label}</div>
                    <div className="text-xs text-slate-400">{e.date_range}</div>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
                <Link
                  href={`/admin/current-affairs/${e.id}/edit`}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary-500"
                >
                  <Pencil size={11} /> Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
