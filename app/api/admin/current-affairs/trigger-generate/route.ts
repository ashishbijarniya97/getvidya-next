import { getAdminUser } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

// Admin-authenticated proxy to the cron generate endpoint
export async function POST(req: Request) {
  const user = await getAdminUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const origin = req.headers.get("x-forwarded-host")
    ? `https://${req.headers.get("x-forwarded-host")}`
    : "https://getvidya.in";

  const res = await fetch(`${origin}/api/cron/generate-ca`, {
    headers: { Authorization: `Bearer ${process.env.CRON_SECRET ?? ""}` },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
