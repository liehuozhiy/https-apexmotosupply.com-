const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
  "Content-Type": "application/json; charset=utf-8"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
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

function requireAdmin(request, env) {
  const adminKey = env.ADMIN_KEY || "ht2026admin";

  const inputKey = request.headers.get("x-admin-key") || new URL(request.url).searchParams.get("key") || "";
  if (inputKey !== adminKey) return { error: json({ error: "Unauthorized" }, 401) };

  return { ok: true };
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
  if (request.method === "OPTIONS") return json({ ok: true });

  if (!env.DB) {
    return json({ error: "D1 binding DB is missing" }, 500);
  }

  if (request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "";
    const country = request.cf?.country || request.headers.get("CF-IPCountry") || "Unknown";

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
      String(body.referrer || request.headers.get("Referer") || "").slice(0, 500),
      String(request.headers.get("User-Agent") || "").slice(0, 500),
      String(body.language || "").slice(0, 80),
      String(body.screen || "").slice(0, 80),
      String(body.timezone || "").slice(0, 120)
    ).run();

    return json({ ok: true });
  }

  const adminKey = env.ADMIN_KEY || "ht2026admin";

  const inputKey = request.headers.get("x-admin-key") || new URL(request.url).searchParams.get("key") || "";
  if (inputKey !== adminKey) {
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

async function handleInquiries(request, env) {
  if (request.method === "OPTIONS") return json({ ok: true });
  if (!env.DB) return json({ error: "D1 binding DB is missing" }, 500);

  const url = new URL(request.url);
  const idMatch = url.pathname.match(/^\/api\/inquiries\/(\d+)$/);

  if (request.method === "POST" && !idMatch) {
    const body = await request.json().catch(() => ({}));
    if (body.website) return json({ ok: true });

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

    return json({ ok: true, id: result.meta?.last_row_id });
  }

  const auth = requireAdmin(request, env);
  if (auth.error) return auth.error;

  if (request.method === "GET" && !idMatch) {
    const rows = await env.DB.prepare(`
      SELECT id, name, email, model, quantity, message, source_url AS sourceUrl,
             status, created_at AS createdAt, updated_at AS updatedAt
      FROM inquiries
      ORDER BY created_at DESC
      LIMIT 300
    `).all();

    return json({
      inquiries: (rows.results || []).map((row) => ({
        ...row,
        summary: cleanText(row.message, 120)
      }))
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

  return json({ error: "Method not allowed" }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/admin") {
      return env.ASSETS.fetch(new Request(new URL("/admin.html", url), request));
    }

    if (url.pathname === "/api/analytics") {
      return handleAnalytics(request, env);
    }

    if (url.pathname === "/api/inquiries" || url.pathname.startsWith("/api/inquiries/")) {
      return handleInquiries(request, env);
    }

    if (url.pathname === "/api/news") {
      return handleNews(request);
    }

    return env.ASSETS.fetch(request);
  }
};
