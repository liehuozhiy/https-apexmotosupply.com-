const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
  "Content-Type": "application/json; charset=utf-8"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders
  });
}

function todayPrefix() {
  return new Date().toISOString().slice(0, 10);
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return json({ ok: true });
  }

  if (!env.DB) {
    return json({ error: "D1 binding DB is missing" }, 500);
  }

  if (request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const headers = request.headers;
    const ip = headers.get("CF-Connecting-IP") || headers.get("X-Forwarded-For") || "";
    const country = request.cf?.country || headers.get("CF-IPCountry") || "Unknown";

    await env.DB.prepare(`
      INSERT INTO site_visits
        (created_at, ip, country, path, title, referrer, user_agent, language, screen, timezone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      new Date().toISOString(),
      ip,
      country,
      String(body.path || "/").slice(0, 300),
      String(body.title || "").slice(0, 200),
      String(body.referrer || headers.get("Referer") || "").slice(0, 500),
      String(headers.get("User-Agent") || "").slice(0, 500),
      String(body.language || "").slice(0, 80),
      String(body.screen || "").slice(0, 80),
      String(body.timezone || "").slice(0, 120)
    ).run();

    return json({ ok: true });
  }

  const adminKey = env.ADMIN_KEY || "";
  const inputKey = request.headers.get("x-admin-key") || new URL(request.url).searchParams.get("key") || "";
  if (!adminKey || inputKey !== adminKey) {
    return json({ error: "Unauthorized" }, 401);
  }

  const total = await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits").first();
  const today = await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits WHERE created_at >= ?").bind(todayPrefix()).first();
  const uniqueIps = await env.DB.prepare("SELECT COUNT(DISTINCT ip) AS count FROM site_visits WHERE ip != ''").first();
  const countryRows = await env.DB.prepare("SELECT country, COUNT(*) AS count FROM site_visits GROUP BY country ORDER BY count DESC").all();
  const visits = await env.DB.prepare(`
    SELECT created_at AS createdAt, ip, country, path, user_agent AS userAgent
    FROM site_visits
    ORDER BY created_at DESC
    LIMIT 200
  `).all();

  const countries = {};
  (countryRows.results || []).forEach((row) => {
    countries[row.country || "Unknown"] = row.count;
  });

  return json({
    total: total?.count || 0,
    today: today?.count || 0,
    uniqueIps: uniqueIps?.count || 0,
    countries,
    visits: visits.results || []
  });
}
