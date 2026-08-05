const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Content-Security-Policy": "frame-ancestors 'self'; base-uri 'self'; object-src 'none'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN"
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

  if (request.method === "POST") {
    if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);
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

  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  const adminKey = String(env.ADMIN_KEY || "").trim();
  if (!adminKey) {
    return json({ error: "Admin access is not configured" }, 503);
  }

  const inputKey = request.headers.get("x-admin-key") || "";
  if (inputKey !== adminKey) {
    return json({ error: "Unauthorized" }, 401);
  }
  if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);

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
