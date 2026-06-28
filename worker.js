const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
  "Content-Type": "application/json; charset=utf-8"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders });
}

function todayPrefix() {
  return new Date().toISOString().slice(0, 10);
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

  const adminKey = env.ADMIN_KEY || "";
  if (!adminKey) {
    return json({ error: "ADMIN_KEY is missing" }, 500);
  }

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/analytics") {
      return handleAnalytics(request, env);
    }

    if (url.pathname === "/api/news") {
      return handleNews(request);
    }

    return env.ASSETS.fetch(request);
  }
};
