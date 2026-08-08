const DEFAULT_BASE_URL = "https://apexmotosupply.com";
const EXPECTED_SITEMAP_COUNT = 43;
const REQUEST_TIMEOUT_MS = 20_000;
const CONCURRENCY = 4;

const fixedPaths = [
  "/",
  "/index.html",
  "/sy300.html",
  "/f29.html?lang=zh-CN",
  "/inquiry.html",
  "/robots.txt",
  "/sitemap.xml",
  "/admin/",
  "/home-preview.html",
  "/hs85-preview.html",
  "/sy300-preview.html"
];

function usage() {
  console.log("Usage: node scripts/verify-production-readonly.mjs [base-url]");
  console.log(`Default base URL: ${DEFAULT_BASE_URL}`);
}

const input = process.argv[2];
if (input === "--help" || input === "-h") {
  usage();
  process.exit(0);
}
if (process.argv.length > 3) {
  usage();
  process.exit(2);
}

let baseUrl;
try {
  const parsed = new URL(input || DEFAULT_BASE_URL);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("URL must use HTTP or HTTPS");
  baseUrl = parsed.origin;
} catch (error) {
  console.error(`Invalid base URL: ${error.message}`);
  process.exit(2);
}

const failures = [];
let requestCount = 0;

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

async function request(pathOrUrl, init = {}) {
  const url = new URL(pathOrUrl, `${baseUrl}/`);
  if (url.origin !== baseUrl) throw new Error(`Refusing cross-origin request: ${url.href}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  requestCount += 1;
  try {
    return await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: {
        "Cache-Control": "no-cache",
        ...init.headers
      },
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function pool(items, worker) {
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

function hasNoStore(response) {
  return /(?:^|,)\s*no-store(?:\s*(?:,|$))/i.test(response.headers.get("cache-control") || "");
}

function hasNoIndex(response) {
  return /(?:^|,)\s*noindex(?:\s*(?:,|$))/i.test(response.headers.get("x-robots-tag") || "");
}

async function verifyFixedPaths() {
  await pool(fixedPaths, async (path) => {
    const response = await request(path);
    if (response.status !== 200) fail(`fixed ${path} expected 200, received ${response.status}`);
  });
  if (!failures.some((message) => message.startsWith("fixed "))) pass(`fixed routes ${fixedPaths.length}/${fixedPaths.length}`);
}

async function verifyAdminBoundaries() {
  const cases = [
    { path: "/api/analytics", expected: 401, label: "analytics missing key" },
    { path: "/api/analytics", expected: 401, label: "analytics invalid key", headers: { "x-admin-key": "readonly-verification-invalid-key" } },
    { path: "/api/inquiries", expected: 401, label: "inquiries missing key" },
    { path: "/api/smtp-status", expected: 401, label: "smtp status missing key" },
    {
      path: "/api/analytics",
      expected: 403,
      label: "analytics external origin",
      headers: { "x-admin-key": "readonly-verification-invalid-key", Origin: "https://example.invalid" }
    }
  ];

  for (const testCase of cases) {
    const response = await request(testCase.path, { headers: testCase.headers });
    if (response.status !== testCase.expected) fail(`${testCase.label} expected ${testCase.expected}, received ${response.status}`);
    if (!hasNoStore(response)) fail(`${testCase.label} missing Cache-Control: no-store`);
  }
  if (!failures.some((message) => cases.some((testCase) => message.startsWith(testCase.label)))) pass(`admin denial boundaries ${cases.length}/${cases.length}`);
}

async function verifyNotFoundBoundaries() {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const cases = [
    { path: `/missing-readonly-${suffix}`, label: "public unknown route", noIndex: true },
    { path: `/api/missing-readonly-${suffix}`, label: "API unknown route", noIndex: false }
  ];

  for (const testCase of cases) {
    const response = await request(testCase.path);
    if (response.status !== 404) fail(`${testCase.label} expected 404, received ${response.status}`);
    if (!hasNoStore(response)) fail(`${testCase.label} missing Cache-Control: no-store`);
    if (testCase.noIndex && !hasNoIndex(response)) fail(`${testCase.label} missing X-Robots-Tag: noindex`);
  }
  if (!failures.some((message) => cases.some((testCase) => message.startsWith(testCase.label)))) pass(`not-found boundaries ${cases.length}/${cases.length}`);
}

async function verifySitemap() {
  const response = await request("/sitemap.xml");
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  const uniqueUrls = [...new Set(urls)];

  if (urls.length !== EXPECTED_SITEMAP_COUNT) fail(`sitemap expected ${EXPECTED_SITEMAP_COUNT} URLs, found ${urls.length}`);
  if (uniqueUrls.length !== urls.length) fail(`sitemap contains ${urls.length - uniqueUrls.length} duplicate URLs`);
  for (const url of uniqueUrls) {
    if (new URL(url).origin !== baseUrl) fail(`sitemap contains cross-origin URL: ${url}`);
  }
  if (failures.some((message) => message.startsWith("sitemap contains cross-origin"))) return;

  let passed = 0;
  await pool(uniqueUrls, async (url) => {
    const pageResponse = await request(url);
    if (pageResponse.status === 200) passed += 1;
    else fail(`sitemap URL ${url} expected 200, received ${pageResponse.status}`);
  });
  if (passed === EXPECTED_SITEMAP_COUNT && uniqueUrls.length === EXPECTED_SITEMAP_COUNT) pass(`sitemap routes ${passed}/${EXPECTED_SITEMAP_COUNT}`);
}

async function verifyProductIdentityAndGallery() {
  const sy300Response = await request("/sy300.html");
  const sy300Html = await sy300Response.text();
  if (!/SY300/i.test(sy300Html)) fail("SY300 identity marker missing");

  const f29Response = await request("/f29.html?lang=zh-CN");
  const f29Html = await f29Response.text();
  if (!/F29/i.test(f29Html)) fail("F29 identity marker missing");
  if (!f29Html.includes("product-detail-v37-unified-layout")) fail("F29 unified layout marker missing");

  const imagePaths = [...f29Html.matchAll(/class="sy300-preview-still(?: is-active)?"[^>]*data-main-src="([^"]+)"/g)]
    .map((match) => match[1]);
  const uniqueImagePaths = [...new Set(imagePaths)];
  if (uniqueImagePaths.length !== 5) fail(`F29 gallery expected 5 unique images, found ${uniqueImagePaths.length}`);

  let passed = 0;
  await pool(uniqueImagePaths, async (path) => {
    const response = await request(new URL(path, `${baseUrl}/f29.html`).href);
    const contentType = response.headers.get("content-type") || "";
    if (response.status === 200 && contentType.startsWith("image/")) passed += 1;
    else fail(`F29 image ${path} expected image HTTP 200, received ${response.status} ${contentType || "without content type"}`);
  });
  if (passed === 5 && uniqueImagePaths.length === 5) pass("F29 gallery images 5/5");
  if (!failures.some((message) => /^(SY300|F29 identity|F29 unified)/.test(message))) pass("SY300 and F29 identity markers");
}

try {
  console.log(`Read-only production verification: ${baseUrl}`);
  await verifyFixedPaths();
  await verifyAdminBoundaries();
  await verifyNotFoundBoundaries();
  await verifySitemap();
  await verifyProductIdentityAndGallery();
} catch (error) {
  fail(error.name === "AbortError" ? `request timed out after ${REQUEST_TIMEOUT_MS} ms` : error.message);
}

console.log(`Requests: ${requestCount}; failures: ${failures.length}`);
if (failures.length) process.exitCode = 1;
else console.log("PRODUCTION_READONLY_VERIFICATION=PASS");
