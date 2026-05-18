export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = req.headers.get("x-forwarded-host")
    ? `https://${req.headers.get("x-forwarded-host")}`
    : "https://getvidya.in";

  const res = await fetch(`${origin}/api/admin/auto-questions`, {
    method: "POST",
    headers: {
      "x-cron-secret": process.env.CRON_SECRET ?? "",
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
