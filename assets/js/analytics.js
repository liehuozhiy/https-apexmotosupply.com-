(function () {
  const endpoint = window.APEX_ANALYTICS_ENDPOINT;
  if (!endpoint || !window.fetch) return;

  try {
    if (sessionStorage.getItem("apex-visit-tracked") === "1") return;
    sessionStorage.setItem("apex-visit-tracked", "1");
  } catch (error) {}

  const payload = {
    path: "/",
    title: "Apex Moto Supply",
    referrer: document.referrer || "",
    language: navigator.language || "",
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    timestamp: new Date().toISOString()
  };

  window.fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {});
})();
