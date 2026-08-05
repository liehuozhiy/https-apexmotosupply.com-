const enforcedContentSecurityPolicy = "frame-ancestors 'self'; base-uri 'self'; object-src 'none'";
const reportOnlyContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "frame-src 'none'",
  "worker-src 'self'",
  "manifest-src 'self'"
].join("; ");

const corsHeaders = {
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Content-Security-Policy": enforcedContentSecurityPolicy,
  "Content-Security-Policy-Report-Only": reportOnlyContentSecurityPolicy,
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN"
};

const ANALYTICS_MAX_BODY_BYTES = 16 * 1024;
const ANALYTICS_DEFAULT_HOURLY_LIMIT = 120;
const trustedAnalyticsOrigins = new Set([
  "https://apexmotosupply.com",
  "https://www.apexmotosupply.com"
]);

function json(data, status = 200, request = null) {
  const headers = { ...corsHeaders };
  const origin = String(request?.headers.get("Origin") || "").trim();
  if (isTrustedSiteOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }
  return new Response(JSON.stringify(data), {
    status,
    headers
  });
}

function todayPrefix() {
  return new Date().toISOString().slice(0, 10);
}

function oneHourAgoIso() {
  return new Date(Date.now() - 60 * 60 * 1000).toISOString();
}

function isTrustedAnalyticsOrigin(request) {
  const origin = String(request.headers.get("Origin") || "").trim();
  return Boolean(origin) && isTrustedSiteOrigin(origin);
}

function isTrustedSiteOrigin(origin) {
  if (trustedAnalyticsOrigins.has(origin)) return true;
  try {
    const url = new URL(origin);
    return ["127.0.0.1", "localhost"].includes(url.hostname) && ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
}

function isTrustedAdminOrigin(request) {
  const origin = String(request.headers.get("Origin") || "").trim();
  return !origin || isTrustedSiteOrigin(origin);
}

function analyticsHourlyLimit(env) {
  const configured = Number(env.ANALYTICS_HOURLY_LIMIT || ANALYTICS_DEFAULT_HOURLY_LIMIT);
  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : ANALYTICS_DEFAULT_HOURLY_LIMIT;
}

export async function onRequest(context) {
  const { request, env } = context;
  const respond = (data, status = 200) => json(data, status, request);

  if (request.method === "OPTIONS") {
    if (!isTrustedAdminOrigin(request)) return respond({ error: "Forbidden origin" }, 403);
    return respond({ ok: true });
  }

  if (request.method === "POST") {
    if (!isTrustedAnalyticsOrigin(request)) return respond({ error: "Forbidden origin" }, 403);
    if (!String(request.headers.get("Content-Type") || "").toLowerCase().startsWith("application/json")) {
      return respond({ error: "Content-Type must be application/json" }, 415);
    }
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (Number.isFinite(contentLength) && contentLength > ANALYTICS_MAX_BODY_BYTES) {
      return respond({ error: "Request body too large" }, 413);
    }
    if (!env.DB) return respond({ error: "D1 binding DB is missing" }, 500);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) return respond({ error: "Invalid JSON body" }, 400);
    if (new TextEncoder().encode(JSON.stringify(body)).byteLength > ANALYTICS_MAX_BODY_BYTES) {
      return respond({ error: "Request body too large" }, 413);
    }
    const headers = request.headers;
    const ip = headers.get("CF-Connecting-IP") || headers.get("X-Forwarded-For") || "";
    const country = request.cf?.country || headers.get("CF-IPCountry") || "Unknown";

    const recent = await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits WHERE ip = ? AND created_at >= ?")
      .bind(ip, oneHourAgoIso())
      .first();
    if ((recent?.count || 0) >= analyticsHourlyLimit(env)) {
      return respond({ error: "Too many analytics events" }, 429);
    }

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

    return respond({ ok: true });
  }

  if (request.method !== "GET") {
    return respond({ error: "Method not allowed" }, 405);
  }

  if (!isTrustedAdminOrigin(request)) return respond({ error: "Forbidden origin" }, 403);

  const adminKey = String(env.ADMIN_KEY || "").trim();
  if (!adminKey) {
    return respond({ error: "Admin access is not configured" }, 503);
  }

  const inputKey = request.headers.get("x-admin-key") || "";
  if (inputKey !== adminKey) {
    return respond({ error: "Unauthorized" }, 401);
  }
  if (!env.DB) return respond({ error: "D1 binding DB is missing" }, 500);

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

  return respond({
    total: total?.count || 0,
    today: today?.count || 0,
    uniqueIps: uniqueIps?.count || 0,
    countries,
    visits: visits.results || []
  });
}
