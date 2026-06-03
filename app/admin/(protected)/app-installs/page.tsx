import { createClient } from "@/lib/supabase/server";
import { getInstallStats, getInstallsBySource, getRecentInstalls } from "@/lib/analytics/appInstalls";
import { Smartphone, Activity, CalendarClock, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

const sinceFmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function AppInstallsPage() {
  const supabase = createClient();
  const [stats, bySource, recent] = await Promise.all([
    getInstallStats(supabase),
    getInstallsBySource(supabase),
    getRecentInstalls(supabase),
  ]);

  const stickiness = stats.totalInstalls > 0 ? Math.round((stats.active30d / stats.totalInstalls) * 100) : 0;
  const sourceMax = Math.max(1, ...bySource.map((s) => s.count));

  const cards = [
    { label: "Total Installs", value: stats.totalInstalls.toLocaleString("en-IN"), icon: Smartphone,    color: "bg-blue-50 text-blue-600",       change: "All time" },
    { label: "Active (7d)",    value: stats.active7d.toLocaleString("en-IN"),      icon: Activity,      color: "bg-emerald-50 text-emerald-600", change: "Seen in last 7 days" },
    { label: "Active (30d)",   value: stats.active30d.toLocaleString("en-IN"),     icon: CalendarClock, color: "bg-amber-50 text-amber-600",     change: "Seen in last 30 days" },
    { label: "30d Stickiness", value: `${stickiness}%`,                            icon: Activity,      color: "bg-green-50 text-green-600",     change: "Active / installs" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">App Installs</h1>
        <p className="text-slate-500 text-sm mt-1">Mobile app installs, attribution source, and active users.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <span className="text-xs text-slate-400">{change}</span>
            </div>
            <div className="text-3xl font-bold text-primary-500 mb-1">{value}</div>
            <div className="text-slate-500 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Installs by source */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
        <h2 className="font-bold text-primary-500 text-lg mb-1">Installs by Source</h2>
        <p className="text-slate-400 text-sm mb-6">Where installs are coming from (first-touch attribution)</p>
        {bySource.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-sm">No install data yet.</div>
        ) : (
          <div className="space-y-3">
            {bySource.map(({ source, count }) => (
              <div key={source} className="flex items-center gap-4">
                <div className="w-32 text-sm text-slate-600 truncate" title={source}>{source}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-teal h-full rounded-full" style={{ width: `${(count / sourceMax) * 100}%` }} />
                </div>
                <div className="w-12 text-right text-sm font-semibold text-primary-500">{count}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent installs */}
      <div className="bg-white rounded-2xl shadow-card">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-primary-500">Recent Installs</h2>
        </div>
        {recent.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Smartphone size={40} className="mx-auto mb-3 opacity-40" />
            <p>No installs yet. They&apos;ll appear once the app reports its first launch.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map((row) => (
              <div key={row.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-mint flex items-center justify-center text-primary-500 flex-shrink-0">
                  <Smartphone size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-primary-500 text-sm capitalize">
                    {row.platform}{row.app_version ? ` · v${row.app_version}` : ""}
                  </div>
                  <div className="text-xs text-slate-400 truncate">{row.device_id}</div>
                </div>
                <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                  {row.install_source || "organic"}
                </span>
                {row.country && (
                  <span className="hidden md:flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                    <MapPin size={12} /> {row.country}
                  </span>
                )}
                <div className="text-xs text-slate-400 flex-shrink-0 w-28 text-right">{sinceFmt(row.first_seen)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
