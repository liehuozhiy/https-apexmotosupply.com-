(function () {
  const endpoint = window.APEX_ANALYTICS_ENDPOINT;
  if (!endpoint || !window.fetch) return;

  const payload = {
    path: location.pathname + location.search,
    title: document.title,
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
