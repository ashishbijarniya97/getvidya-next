import type { createClient } from "@/lib/supabase/server";

type DB = ReturnType<typeof createClient>;

export type InstallStats = {
  totalInstalls: number;
  active7d: number;
  active30d: number;
};

export type SourceBreakdown = { source: string; count: number };

export type InstallRow = {
  id: string;
  device_id: string;
  platform: string;
  app_version: string | null;
  install_source: string | null;
  country: string | null;
  first_seen: string;
  last_seen: string;
};

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export async function getInstallStats(supabase: DB): Promise<InstallStats> {
  const [total, a7, a30] = await Promise.all([
    supabase.from("app_installs").select("*", { count: "exact", head: true }),
    supabase.from("app_installs").select("*", { count: "exact", head: true }).gte("last_seen", daysAgo(7)),
    supabase.from("app_installs").select("*", { count: "exact", head: true }).gte("last_seen", daysAgo(30)),
  ]);
  return {
    totalInstalls: total.count ?? 0,
    active7d:      a7.count ?? 0,
    active30d:     a30.count ?? 0,
  };
}

export async function getInstallsBySource(supabase: DB): Promise<SourceBreakdown[]> {
  const { data } = await supabase.from("app_installs").select("install_source");
  const counts: Record<string, number> = {};
  (data ?? []).forEach(({ install_source }) => {
    const key = install_source || "organic";
    counts[key] = (counts[key] ?? 0) + 1;
  });
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getRecentInstalls(supabase: DB, limit = 12): Promise<InstallRow[]> {
  const { data } = await supabase
    .from("app_installs")
    .select("id, device_id, platform, app_version, install_source, country, first_seen, last_seen")
    .order("first_seen", { ascending: false })
    .limit(limit);
  return (data ?? []) as InstallRow[];
}
