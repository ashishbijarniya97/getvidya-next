import { createClient } from "@/lib/supabase/server";
import { Inbox, Users, FileText, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LeadChart = dynamic(() => import("@/components/admin/LeadChart"), { ssr: false, loading: () => <div className="h-[220px] animate-pulse bg-slate-100 rounded-xl" /> });

async function getDashboardStats(supabase: ReturnType<typeof createClient>) {
  const [leadsRes, newLeadsRes] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
  ]);
  return {
    totalLeads: leadsRes.count ?? 0,
    newLeads: newLeadsRes.count ?? 0,
  };
}

async function getRecentLeads(supabase: ReturnType<typeof createClient>) {
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function getLeadChartData(supabase: ReturnType<typeof createClient>) {
  const since = new Date();
  since.setDate(since.getDate() - 29);
  const { data } = await supabase
    .from("leads")
    .select("created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  const counts: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    counts[d.toISOString().slice(0, 10)] = 0;
  }
  (data ?? []).forEach(({ created_at }) => {
    const day = created_at.slice(0, 10);
    if (day in counts) counts[day]++;
  });

  return Object.entries(counts).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    leads: count,
  }));
}

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const stats = await getDashboardStats(supabase);
  const recentLeads = await getRecentLeads(supabase);
  const chartData = await getLeadChartData(supabase);

  const cards = [
    { label: "Total Leads", value: stats.totalLeads, icon: Users, color: "bg-blue-50 text-blue-600", change: "All time" },
    { label: "New Leads", value: stats.newLeads, icon: Inbox, color: "bg-amber-50 text-amber-600", change: "Needs attention" },
    { label: "Content Blocks", value: "24", icon: FileText, color: "bg-purple-50 text-purple-600", change: "All pages covered" },
    { label: "Avg. Conversion", value: "3.2%", icon: TrendingUp, color: "bg-green-50 text-green-600", change: "+0.4% this month" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Welcome back, <strong>{user?.email}</strong>
        </p>
      </div>

      {/* Stats */}
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

      {/* Lead Analytics Chart */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-primary-500 text-lg">Lead Volume</h2>
            <p className="text-slate-400 text-sm mt-0.5">Daily signups over the last 30 days</p>
          </div>
          <Link href="/admin/leads" className="flex items-center gap-1 text-teal text-sm font-medium hover:underline">
            All Leads <ArrowUpRight size={15} />
          </Link>
        </div>
        <LeadChart data={chartData} />
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl shadow-card">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-bold text-primary-500">Recent Leads</h2>
          <Link href="/admin/leads" className="flex items-center gap-1 text-teal text-sm font-medium hover:underline">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Inbox size={40} className="mx-auto mb-3 opacity-40" />
            <p>No leads yet. They&apos;ll appear here once someone submits the contact form.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentLeads.map((lead: { id: string; name: string; email: string; phone: string; message: string; status: string; created_at: string }) => (
              <div key={lead.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-mint flex items-center justify-center text-primary-500 font-bold text-sm flex-shrink-0">
                  {lead.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-primary-500 text-sm">{lead.name}</div>
                  <div className="text-xs text-slate-400 truncate">{lead.email} · {lead.phone}</div>
                </div>
                <div className="hidden md:block text-xs text-slate-400 max-w-[200px] truncate">{lead.message}</div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  lead.status === "new" ? "bg-amber-100 text-amber-700"
                  : lead.status === "contacted" ? "bg-blue-100 text-blue-700"
                  : lead.status === "converted" ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
                }`}>
                  {lead.status}
                </span>
                <div className="text-xs text-slate-400 flex-shrink-0">
                  {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
