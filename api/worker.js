import { connect } from "cloudflare:sockets";

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
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
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

const securityHeaders = {
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
const INQUIRY_MAX_BODY_BYTES = 32 * 1024;
const IMMUTABLE_ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable";
const trustedAnalyticsOrigins = new Set([
  "https://apexmotosupply.com",
  "https://www.apexmotosupply.com"
]);

const productPagePaths = new Set([
  "/babey.html",
  "/babey-plus.html",
  "/bumblebee.html",
  "/er3.html",
  "/er5.html",
  "/er7.html",
  "/es11.html",
  "/et.html",
  "/et-2022.html",
  "/et-2024.html",
  "/et3.html",
  "/et5.html",
  "/et7.html",
  "/et9.html",
  "/f29.html",
  "/f29r.html",
  "/f4.html",
  "/f4-plus.html",
  "/f9.html",
  "/h300.html",
  "/hs85.html",
  "/s300.html",
  "/s300r.html",
  "/sj250.html",
  "/sj300.html",
  "/sn300.html",
  "/sy300.html"
]);

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, ...extraHeaders } });
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

function withCors(response, request, policy) {
  const headers = new Headers(response.headers);
  const origin = String(request.headers.get("Origin") || "").trim();
  if (policy === "public") {
    headers.set("Access-Control-Allow-Origin", "*");
  } else if (policy === "trusted" && isTrustedSiteOrigin(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    const vary = String(headers.get("Vary") || "").split(",").map((value) => value.trim()).filter(Boolean);
    if (!vary.some((value) => value.toLowerCase() === "origin")) vary.push("Origin");
    headers.set("Vary", vary.join(", "));
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function methodNotAllowed(allowedMethods) {
  return json({ error: "Method not allowed" }, 405, { Allow: allowedMethods.join(", ") });
}

function todayPrefix() {
  return new Date().toISOString().slice(0, 10);
}

function nowIso() {
  return new Date().toISOString();
}

function oneHourAgoIso() {
  return new Date(Date.now() - 60 * 60 * 1000).toISOString();
}

function cleanText(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function requestIp(request) {
  return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "";
}

function isTrustedAnalyticsOrigin(request) {
  const origin = String(request.headers.get("Origin") || "").trim();
  return Boolean(origin) && isTrustedSiteOrigin(origin);
}

function requestBodyTooLarge(request, maxBytes = ANALYTICS_MAX_BODY_BYTES) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  return Number.isFinite(contentLength) && contentLength > maxBytes;
}

function analyticsHourlyLimit(env) {
  const configured = Number(env.ANALYTICS_HOURLY_LIMIT || ANALYTICS_DEFAULT_HOURLY_LIMIT);
  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : ANALYTICS_DEFAULT_HOURLY_LIMIT;
}

async function ensureColumn(env, table, column, definition) {
  try {
    await env.DB.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
  } catch (error) {}
}

async function ensureSchema(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS site_visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      ip TEXT,
      country TEXT,
      path TEXT,
      title TEXT,
      referrer TEXT,
      user_agent TEXT,
      language TEXT,
      screen TEXT,
      timezone TEXT,
      client_hints TEXT
    )
  `).run();
  await ensureColumn(env, "site_visits", "client_hints", "TEXT");
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      model TEXT,
      quantity TEXT,
      message TEXT NOT NULL,
      source_url TEXT,
      status TEXT NOT NULL DEFAULT 'unread',
      ip TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON site_visits (created_at)").run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_site_visits_country ON site_visits (country)").run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_site_visits_ip_created_at ON site_visits (ip, created_at)").run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at)").run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status)").run();
}

function requireAdmin(request, env) {
  const adminKey = String(env.ADMIN_KEY || "").trim();
  if (!adminKey) return { error: json({ error: "Admin access is not configured" }, 503) };

  const inputKey = request.headers.get("x-admin-key") || "";
  if (inputKey !== adminKey) return { error: json({ error: "Unauthorized" }, 401) };

  return { ok: true };
}

function smtpConfigured(env) {
  return Boolean(String(env.SMTP_USER || "").trim() && String(env.SMTP_PASS || "").trim());
}

function base64Utf8(value) {
  const bytes = new TextEncoder().encode(String(value || ""));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function readSmtpResponse(reader, decoder) {
  let response = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    response += decoder.decode(value);
    const lines = response.split(/\r?\n/).filter(Boolean);
    const last = lines[lines.length - 1] || "";
    if (/^\d{3}\s/.test(last)) return { code: Number(last.slice(0, 3)), text: response };
  }
  return { code: 0, text: response };
}

async function smtpCommand(writer, reader, decoder, command, expectedCodes) {
  if (command) await writer.write(new TextEncoder().encode(`${command}\r\n`));
  const response = await readSmtpResponse(reader, decoder);
  if (!expectedCodes.includes(response.code)) {
    throw new Error(`SMTP ${response.code}: ${response.text.slice(0, 160)}`);
  }
  return response;
}

function buildInquiryEmail(env, inquiry) {
  const to = env.REPORT_RECEIVER_EMAIL || "sijunhe567@gmail.com";
  const from = env.SMTP_USER;
  const subject = `=?UTF-8?B?${base64Utf8(`Apex Moto Supply Inquiry - ${inquiry.name}`)}?=`;
  const body = [
    "Apex Moto Supply New Inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Model: ${inquiry.model || "-"}`,
    `Quantity: ${inquiry.quantity || "-"}`,
    `Submitted at: ${inquiry.createdAt}`,
    "",
    "Requirements:",
    inquiry.message || "-"
  ].join("\r\n");

  return [
    `From: Apex Moto Supply <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${Date.now()}.${Math.random().toString(36).slice(2)}@apexmotosupply.com>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
    ""
  ].join("\r\n");
}

async function sendInquiryEmail(env, inquiry) {
  if (!smtpConfigured(env)) return { status: "not_configured", error: smtpStatus(env).missing.join(", ") };
  const smtpHost = String(env.SMTP_HOST || "smtp.qq.com").trim();
  const smtpPort = Number(env.SMTP_PORT || 465);
  const smtpUser = String(env.SMTP_USER || "").trim();
  const receiver = env.REPORT_RECEIVER_EMAIL || "sijunhe567@gmail.com";
  const secure = String(env.SMTP_SECURE || "true") !== "false";

  const socket = connect(
    { hostname: smtpHost, port: smtpPort },
    { secureTransport: secure ? "on" : "off" }
  );
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const decoder = new TextDecoder();

  try {
    await smtpCommand(writer, reader, decoder, "", [220]);
    await smtpCommand(writer, reader, decoder, "EHLO apexmotosupply.com", [250]);
    await smtpCommand(writer, reader, decoder, "AUTH LOGIN", [334]);
    await smtpCommand(writer, reader, decoder, btoa(smtpUser), [334]);
    await smtpCommand(writer, reader, decoder, btoa(String(env.SMTP_PASS || "").trim()), [235]);
    await smtpCommand(writer, reader, decoder, `MAIL FROM:<${smtpUser}>`, [250]);
    await smtpCommand(writer, reader, decoder, `RCPT TO:<${receiver}>`, [250, 251]);
    await smtpCommand(writer, reader, decoder, "DATA", [354]);
    await smtpCommand(writer, reader, decoder, `${buildInquiryEmail(env, inquiry)}\r\n.`, [250]);
    await smtpCommand(writer, reader, decoder, "QUIT", [221]);
    return { status: "sent" };
  } catch (error) {
    console.error("Inquiry email failed", error);
    return { status: "failed", error: error.message };
  } finally {
    try { writer.releaseLock(); } catch (error) {}
    try { reader.releaseLock(); } catch (error) {}
    try { socket.close(); } catch (error) {}
  }
}

function smtpStatus(env) {
  const required = ["SMTP_USER", "SMTP_PASS"];
  const missing = required.filter((key) => !String(env[key] || "").trim());
  return {
    configured: missing.length === 0,
    missing,
    host: String(env.SMTP_HOST || "smtp.qq.com").trim(),
    port: String(env.SMTP_PORT || "465").trim(),
    secure: String(env.SMTP_SECURE || "true").trim(),
    userConfigured: Boolean(String(env.SMTP_USER || "").trim()),
    passConfigured: Boolean(String(env.SMTP_PASS || "").trim()),
    receiver: String(env.REPORT_RECEIVER_EMAIL || "sijunhe567@gmail.com").trim()
  };
}

function secureResponse(response, { noStore = false, cacheControl = "" } = {}) {
  const headers = new Headers(response.headers);
  Object.entries(securityHeaders).forEach(([name, value]) => headers.set(name, value));
  if (noStore) headers.set("Cache-Control", "no-store");
  else if (cacheControl) headers.set("Cache-Control", cacheControl);
  if (response.status >= 400) headers.set("X-Robots-Tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function isImmutableAssetRequest(request, internalPath) {
  if (!internalPath.startsWith("/assets/") && !internalPath.startsWith("/admin/assets/")) return false;
  const url = new URL(request.url);
  if (url.searchParams.has("v")) return true;
  const filename = internalPath.split("/").pop() || "";
  return /(?:^|[-_.])v\d+(?:[-_.]|$)/i.test(filename);
}

async function assetRequest(request, env, internalPath, options = {}) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = internalPath;
  const response = await env.ASSETS.fetch(new Request(assetUrl, request));
  const cacheControl = response.status >= 400
    ? "no-store"
    : isImmutableAssetRequest(request, internalPath)
      ? IMMUTABLE_ASSET_CACHE_CONTROL
      : options.cacheControl;
  return secureResponse(response, { ...options, cacheControl });
}

function redirectToPublicPath(url, pathname) {
  const target = new URL(url);
  target.pathname = pathname;
  return new Response(null, {
    status: 301,
    headers: { ...securityHeaders, Location: target.toString() }
  });
}

function decodeXml(text) {
  return String(text || "")
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(text) {
  return decodeXml(text).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]).trim() : "";
}

async function handleNews(request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") === "zh" ? "zh-CN" : "en-US";
  const query = encodeURIComponent("motocross OR enduro OR off-road motorcycle racing");
  const feedUrl = `https://news.google.com/rss/search?q=${query}&hl=${lang}&gl=US&ceid=US:${lang.startsWith("zh") ? "zh-Hans" : "en"}`;

  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "ApexMotoSupply/1.0"
      }
    });
    if (!response.ok) throw new Error("News feed failed");

    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 8).map((match) => {
      const item = match[1];
      const title = stripTags(tagValue(item, "title"));
      const url = stripTags(tagValue(item, "link"));
      const source = stripTags(tagValue(item, "source"));
      const publishedAt = new Date(stripTags(tagValue(item, "pubDate")) || Date.now()).toISOString();
      const summary = stripTags(tagValue(item, "description")).replace(title, "").slice(0, 180);

      return { title, url, source, publishedAt, summary };
    }).filter((item) => item.title && item.url);

    return json({ items, updatedAt: new Date().toISOString() });
  } catch (error) {
    return json({ items: [], error: "News unavailable" }, 200);
  }
}

async function handleAnalytics(request, env) {
  if (request.method === "OPTIONS") {
    if (!isTrustedAdminOrigin(request)) return json({ error: "Forbidden origin" }, 403);
    return json({ ok: true });
  }

  if (request.method === "POST") {
    if (!isTrustedAnalyticsOrigin(request)) return json({ error: "Forbidden origin" }, 403);
    if (!String(request.headers.get("Content-Type") || "").toLowerCase().startsWith("application/json")) {
      return json({ error: "Content-Type must be application/json" }, 415);
    }
    if (requestBodyTooLarge(request)) return json({ error: "Request body too large" }, 413);
    if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);
    await ensureSchema(env);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Invalid JSON body" }, 400);
    if (new TextEncoder().encode(JSON.stringify(body)).byteLength > ANALYTICS_MAX_BODY_BYTES) {
      return json({ error: "Request body too large" }, 413);
    }
    const ip = requestIp(request);
    const country = request.cf?.country || request.headers.get("CF-IPCountry") || "Unknown";

    const recent = await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits WHERE ip = ? AND created_at >= ?")
      .bind(ip, oneHourAgoIso())
      .first();
    if ((recent?.count || 0) >= analyticsHourlyLimit(env)) {
      return json({ error: "Too many analytics events" }, 429, { "Retry-After": "3600" });
    }

    const clientHints = body.clientHints ? JSON.stringify(body.clientHints).slice(0, 500) : "";

    await env.DB.prepare(`
      INSERT INTO site_visits
        (created_at, ip, country, path, title, referrer, user_agent, language, screen, timezone, client_hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      new Date().toISOString(),
      ip,
      country,
      "/",
      "Apex Moto Supply",
      String(body.referrer || request.headers.get("Referer") || "").slice(0, 500),
      String(request.headers.get("User-Agent") || "").slice(0, 500),
      String(body.language || "").slice(0, 80),
      String(body.screen || "").slice(0, 80),
      String(body.timezone || "").slice(0, 120),
      clientHints
    ).run();

    return json({ ok: true });
  }

  if (request.method !== "GET") return methodNotAllowed(["GET", "POST", "OPTIONS"]);
  if (!isTrustedAdminOrigin(request)) return json({ error: "Forbidden origin" }, 403);
  const auth = requireAdmin(request, env);
  if (auth.error) return auth.error;
  if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);
  await ensureSchema(env);

  const url = new URL(request.url);
  const country = cleanText(url.searchParams.get("country"), 80);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const limit = 20;
  const offset = (page - 1) * limit;
  const where = country ? "WHERE country = ?" : "";

  const total = await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits").first();
  const filteredTotal = country
    ? await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits WHERE country = ?").bind(country).first()
    : await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits").first();
  const today = await env.DB.prepare("SELECT COUNT(*) AS count FROM site_visits WHERE created_at >= ?").bind(todayPrefix()).first();
  const uniqueIps = await env.DB.prepare("SELECT COUNT(DISTINCT ip) AS count FROM site_visits WHERE ip != ''").first();
  const countryRows = await env.DB.prepare("SELECT country, COUNT(*) AS count FROM site_visits GROUP BY country ORDER BY count DESC").all();
  const visitsQuery = env.DB.prepare(`
    SELECT created_at AS createdAt, ip, country, path, user_agent AS userAgent, screen, client_hints AS clientHints
    FROM site_visits
    ${where}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `);
  const visits = country
    ? await visitsQuery.bind(country, limit, offset).all()
    : await visitsQuery.bind(limit, offset).all();

  const countries = {};
  (countryRows.results || []).forEach((row) => {
    countries[row.country || "Unknown"] = row.count;
  });

  return json({
    total: total?.count || 0,
    today: today?.count || 0,
    uniqueIps: uniqueIps?.count || 0,
    countries,
    visits: visits.results || [],
    page,
    pageSize: limit,
    filteredTotal: filteredTotal?.count || 0,
    selectedCountry: country
  });
}

async function handleInquiries(request, env) {
  if (request.method === "OPTIONS") {
    const requestedMethod = String(request.headers.get("Access-Control-Request-Method") || "").toUpperCase();
    if (requestedMethod && requestedMethod !== "POST" && !isTrustedAdminOrigin(request)) {
      return json({ error: "Forbidden origin" }, 403);
    }
    return json({ ok: true });
  }

  const url = new URL(request.url);
  const isCollectionPath = url.pathname === "/api/inquiries";
  const idMatch = url.pathname.match(/^\/api\/inquiries\/(\d+)$/);

  if (request.method === "POST" && isCollectionPath) {
    if (!String(request.headers.get("Content-Type") || "").toLowerCase().startsWith("application/json")) {
      return json({ error: "Content-Type must be application/json" }, 415);
    }
    if (requestBodyTooLarge(request, INQUIRY_MAX_BODY_BYTES)) {
      return json({ error: "Request body too large" }, 413);
    }
    const rawBody = await request.text().catch(() => null);
    if (rawBody === null) return json({ error: "Invalid JSON body" }, 400);
    if (new TextEncoder().encode(rawBody).byteLength > INQUIRY_MAX_BODY_BYTES) {
      return json({ error: "Request body too large" }, 413);
    }
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (body.website) return json({ ok: true });
    if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);
    await ensureSchema(env);

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 180);
    const model = cleanText(body.model, 120);
    const quantity = cleanText(body.quantity, 120);
    let message = cleanText(body.message, 4000);
    const sourceUrl = cleanText(body.source_url || body.sourceUrl, 500);

    if (!message) {
      message = cleanText([model && `Model: ${model}`, quantity && `Quantity: ${quantity}`].filter(Boolean).join("; "), 4000);
    }

    if (!name || !email) return json({ error: "Name and email are required" }, 400);
    if (!isEmail(email)) return json({ error: "Invalid email address" }, 400);
    if (!message) message = "Inquiry form submitted without extra message.";

    const ip = requestIp(request);
    const recent = await env.DB.prepare("SELECT COUNT(*) AS count FROM inquiries WHERE ip = ? AND created_at >= ?")
      .bind(ip, oneHourAgoIso())
      .first();
    if ((recent?.count || 0) >= 5) return json({ error: "Too many submissions. Please try later." }, 429);

    const createdAt = nowIso();
    const inquiry = {
      name,
      email,
      model,
      quantity,
      message,
      sourceUrl,
      createdAt
    };
    const result = await env.DB.prepare(`
      INSERT INTO inquiries
        (name, email, model, quantity, message, source_url, status, ip, user_agent, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'unread', ?, ?, ?, ?)
    `).bind(
      name,
      email,
      model,
      quantity,
      message,
      sourceUrl,
      ip,
      cleanText(request.headers.get("User-Agent"), 500),
      createdAt,
      createdAt
    ).run();
    const emailResult = await sendInquiryEmail(env, inquiry);

    return json({ ok: true, id: result.meta?.last_row_id, emailStatus: emailResult.status, emailError: emailResult.error || "" });
  }

  if (!isCollectionPath && !idMatch) return json({ error: "API route not found" }, 404);
  if (!isTrustedAdminOrigin(request)) return json({ error: "Forbidden origin" }, 403);
  const auth = requireAdmin(request, env);
  if (auth.error) return auth.error;
  if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);
  await ensureSchema(env);

  if (request.method === "GET" && isCollectionPath) {
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const limit = 20;
    const offset = (page - 1) * limit;
    const total = await env.DB.prepare("SELECT COUNT(*) AS count FROM inquiries").first();
    const rows = await env.DB.prepare(`
      SELECT id, name, email, model, quantity, message, source_url AS sourceUrl,
             status, created_at AS createdAt, updated_at AS updatedAt
      FROM inquiries
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all();

    return json({
      inquiries: (rows.results || []).map((row) => ({
        ...row,
        summary: cleanText(row.message, 120)
      })),
      page,
      pageSize: limit,
      total: total?.count || 0
    });
  }

  if (request.method === "GET" && idMatch) {
    const row = await env.DB.prepare(`
      SELECT id, name, email, model, quantity, message, source_url AS sourceUrl,
             status, ip, user_agent AS userAgent, created_at AS createdAt, updated_at AS updatedAt
      FROM inquiries
      WHERE id = ?
    `).bind(Number(idMatch[1])).first();
    if (!row) return json({ error: "Inquiry not found" }, 404);
    return json({ inquiry: row });
  }

  if (request.method === "PATCH" && idMatch) {
    const body = await request.json().catch(() => ({}));
    const status = String(body.status || "");
    if (!["unread", "read", "handled"].includes(status)) return json({ error: "Invalid status" }, 400);

    await env.DB.prepare("UPDATE inquiries SET status = ?, updated_at = ? WHERE id = ?")
      .bind(status, nowIso(), Number(idMatch[1]))
      .run();
    return json({ ok: true });
  }

  if (request.method === "DELETE" && idMatch) {
    await env.DB.prepare("DELETE FROM inquiries WHERE id = ?").bind(Number(idMatch[1])).run();
    return json({ ok: true });
  }

  return methodNotAllowed(["GET", "POST", "PATCH", "DELETE", "OPTIONS"]);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return new Response(null, {
        status: 301,
        headers: { ...securityHeaders, Location: url.toString() }
      });
    }

    if (url.pathname === "/api/analytics") {
      return withCors(await handleAnalytics(request, env), request, "trusted");
    }

    if (url.pathname === "/api/inquiries" || url.pathname.startsWith("/api/inquiries/")) {
      const requestedMethod = String(request.headers.get("Access-Control-Request-Method") || "").toUpperCase();
      const publicInquiry = request.method === "POST" || (request.method === "OPTIONS" && requestedMethod === "POST");
      return withCors(await handleInquiries(request, env), request, publicInquiry ? "public" : "trusted");
    }

    if (url.pathname === "/api/smtp-status") {
      if (!isTrustedAdminOrigin(request)) return withCors(json({ error: "Forbidden origin" }, 403), request, "trusted");
      if (request.method === "OPTIONS") return withCors(json({ ok: true }), request, "trusted");
      if (request.method !== "GET") return withCors(methodNotAllowed(["GET", "OPTIONS"]), request, "trusted");
      const auth = requireAdmin(request, env);
      if (auth.error) return withCors(auth.error, request, "trusted");
      return withCors(json(smtpStatus(env)), request, "trusted");
    }

    if (url.pathname === "/api/news") {
      if (request.method === "OPTIONS") return withCors(json({ ok: true }), request, "public");
      if (request.method !== "GET") return withCors(methodNotAllowed(["GET", "OPTIONS"]), request, "public");
      return withCors(await handleNews(request), request, "public");
    }

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return json({ error: "API route not found" }, 404);
    }

    const frontendPageRedirects = {
      "/frontend/pages/": "/",
      "/frontend/pages/index.html": "/",
      "/frontend/pages/products.html": "/products.html",
      "/frontend/pages/wholesale-dirt-bikes.html": "/wholesale-dirt-bikes.html",
      "/frontend/pages/gas-dirt-bikes.html": "/gas-dirt-bikes.html",
      "/frontend/pages/electric-dirt-bikes.html": "/electric-dirt-bikes.html",
      "/frontend/pages/mini-dirt-bikes.html": "/mini-dirt-bikes.html",
      "/frontend/pages/pit-bikes.html": "/pit-bikes.html",
      "/frontend/pages/videos.html": "/videos.html",
      "/frontend/pages/home-preview.html": "/home-preview.html",
      "/frontend/pages/news.html": "/news.html",
      "/frontend/pages/news/how-to-choose-wholesale-dirt-bike-supplier-china.html": "/news/how-to-choose-wholesale-dirt-bike-supplier-china.html",
      "/frontend/pages/news/gas-vs-electric-dirt-bikes-for-dealers.html": "/news/gas-vs-electric-dirt-bikes-for-dealers.html",
      "/frontend/pages/news/importing-dirt-bikes-in-bulk-checklist.html": "/news/importing-dirt-bikes-in-bulk-checklist.html",
      "/frontend/pages/news/oem-dirt-bikes-for-dealers.html": "/news/oem-dirt-bikes-for-dealers.html",
      "/frontend/pages/news/dirt-bike-shipping-bulk-order-guide.html": "/news/dirt-bike-shipping-bulk-order-guide.html",
      "/frontend/pages/contact.html": "/contact.html",
      "/frontend/pages/inquiry.html": "/inquiry.html"
    };

    if (frontendPageRedirects[url.pathname]) {
      return redirectToPublicPath(url, frontendPageRedirects[url.pathname]);
    }

    if (url.pathname.startsWith("/frontend/assets/")) {
      return redirectToPublicPath(url, url.pathname.replace(/^\/frontend\/assets/, "/assets"));
    }

    if (url.pathname === "/admin/pages/admin.html") {
      return redirectToPublicPath(url, "/admin");
    }

    const pageRoutes = {
      "/": "/index.html",
      "/index.html": "/index.html",
      "/products.html": "/products.html",
      "/wholesale-dirt-bikes.html": "/wholesale-dirt-bikes.html",
      "/gas-dirt-bikes.html": "/gas-dirt-bikes.html",
      "/electric-dirt-bikes.html": "/electric-dirt-bikes.html",
      "/mini-dirt-bikes.html": "/mini-dirt-bikes.html",
      "/pit-bikes.html": "/pit-bikes.html",
      "/videos.html": "/videos.html",
      "/home-preview.html": "/home-preview.html",
      "/hs85-preview.html": "/hs85-preview.html",
      "/sy300-preview.html": "/sy300-preview.html",
      "/news.html": "/news.html",
      "/news/how-to-choose-wholesale-dirt-bike-supplier-china.html": "/news/how-to-choose-wholesale-dirt-bike-supplier-china.html",
      "/news/gas-vs-electric-dirt-bikes-for-dealers.html": "/news/gas-vs-electric-dirt-bikes-for-dealers.html",
      "/news/importing-dirt-bikes-in-bulk-checklist.html": "/news/importing-dirt-bikes-in-bulk-checklist.html",
      "/news/oem-dirt-bikes-for-dealers.html": "/news/oem-dirt-bikes-for-dealers.html",
      "/news/dirt-bike-shipping-bulk-order-guide.html": "/news/dirt-bike-shipping-bulk-order-guide.html",
      "/contact.html": "/contact.html",
      "/inquiry.html": "/inquiry.html",
      "/admin": "/admin/index.html",
      "/admin/": "/admin/index.html",
      "/admin/index.html": "/admin/index.html",
      "/robots.txt": "/robots.txt",
      "/sitemap.xml": "/sitemap.xml"
    };

    if (pageRoutes[url.pathname]) {
      const noStore = url.pathname === "/admin" || url.pathname === "/admin/" || url.pathname === "/admin/index.html";
      return assetRequest(request, env, pageRoutes[url.pathname], { noStore });
    }

    if (productPagePaths.has(url.pathname)) {
      return assetRequest(request, env, url.pathname);
    }

    if (url.pathname.startsWith("/admin/assets/")) {
      return assetRequest(request, env, url.pathname);
    }

    if (url.pathname.startsWith("/assets/")) {
      return assetRequest(request, env, url.pathname);
    }

    return assetRequest(request, env, url.pathname);
  }
};
