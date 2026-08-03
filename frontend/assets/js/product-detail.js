(() => {
  "use strict";

  const payloadNode = document.getElementById("product-detail-i18n");
  if (!payloadNode) return;

  let payload;
  try {
    payload = JSON.parse(payloadNode.textContent);
  } catch (error) {
    console.error("Invalid embedded product-detail translations.", error);
    return;
  }

  const modelId = payload.modelId;
  const translations = payload.translations || {};
  const defaultLanguage = payload.defaultLanguage || "en";
  const leafNodes = [...document.querySelectorAll("body *")].filter(
    (node) =>
      node.children.length === 0 &&
      node.textContent.trim() &&
      !node.closest("#product-detail-i18n"),
  );

  leafNodes.forEach((node) => {
    node.dataset.productDetailSource = node.textContent.trim();
  });
  document.querySelectorAll("[placeholder]").forEach((node) => {
    node.dataset.productDetailPlaceholder = node.getAttribute("placeholder");
  });

  function normalizeLanguage(value) {
    if (translations[value]) return value;
    if (value?.toLowerCase().startsWith("zh-tw")) return "zh-TW";
    if (value?.toLowerCase().startsWith("zh")) return "zh-CN";
    const short = value?.split("-")[0];
    return translations[short] ? short : defaultLanguage;
  }

  function currentLanguage() {
    const params = new URLSearchParams(location.search);
    const requested = params.get("lang");
    if (requested) return normalizeLanguage(requested);
    if (window.APEX_I18N?.getLang) {
      return normalizeLanguage(window.APEX_I18N.getLang());
    }
    try {
      return normalizeLanguage(localStorage.getItem("apex-lang"));
    } catch {
      return defaultLanguage;
    }
  }

  function applyLanguage(language) {
    const lang = normalizeLanguage(language);
    const copy = translations[lang] || {};
    leafNodes.forEach((node) => {
      const source = node.dataset.productDetailSource;
      if (Object.prototype.hasOwnProperty.call(copy, source)) {
        node.textContent = copy[source];
      }
    });
    document.querySelectorAll("[data-product-detail-placeholder]").forEach((node) => {
      const source = node.dataset.productDetailPlaceholder;
      if (Object.prototype.hasOwnProperty.call(copy, source)) {
        node.setAttribute("placeholder", copy[source]);
      }
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("is-rtl", lang === "ar");
    document.querySelectorAll('a[href^="inquiry.html"]').forEach((link) => {
      const url = new URL(link.getAttribute("href"), location.href);
      url.searchParams.set("lang", lang);
      link.setAttribute(
        "href",
        `${url.pathname.split("/").pop()}${url.search}${url.hash}`,
      );
    });
    syncPanelHeight();
  }

  const galleryButtons = [...document.querySelectorAll(".sy300-preview-still")];
  const mainImage = document.querySelector(".sy300-preview-main-frame img");
  const frameCode = document.querySelector(".sy300-preview-frame-code");
  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (!mainImage) return;
      galleryButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      const image = button.querySelector("img");
      mainImage.src = image.src;
      mainImage.alt = image.alt;
      if (frameCode) {
        frameCode.textContent = `STILL IMAGE / ${String(index + 1).padStart(2, "0")}`;
      }
    });
  });

  const tabs = [...document.querySelectorAll("[data-product-detail-tab]")];
  const panels = [...document.querySelectorAll("[data-product-detail-panel]")];
  function activatePanel(name, focus = false) {
    tabs.forEach((tab) => {
      const active = tab.dataset.productDetailTab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => {
      const active = panel.dataset.productDetailPanel === name;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    syncPanelHeight();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activatePanel(tab.dataset.productDetailTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const delta = document.documentElement.dir === "rtl" ? -1 : 1;
      let next = index;
      if (event.key === "ArrowRight") next = (index + delta + tabs.length) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - delta + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activatePanel(tabs[next].dataset.productDetailTab, true);
    });
  });

  const lightbox = document.querySelector("[data-product-detail-lightbox]");
  const lightboxImage = lightbox?.querySelector("[data-product-detail-lightbox-image]");
  const lightboxClose = lightbox?.querySelector("[data-product-detail-lightbox-close]");
  let lightboxOpener = null;

  function openLightbox(button) {
    const image = button.querySelector("img");
    if (!lightbox || !lightboxImage || !image) return;
    lightboxOpener = button;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("product-detail-lightbox-open");
    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("product-detail-lightbox-open");
    lightboxImage?.removeAttribute("src");
    lightboxOpener?.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-product-detail-highlight-open]").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  function syncPanelHeight() {
    const overview = document.querySelector('[data-product-detail-panel="overview"]');
    const technical = document.querySelector('[data-product-detail-panel="technical"]');
    if (!overview || !technical || innerWidth <= 1040 || overview.hidden) return;
    technical.style.setProperty(
      "--sy300-panel-height",
      `${overview.getBoundingClientRect().height}px`,
    );
  }

  if (location.protocol === "file:") {
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      link.href = `../${link.getAttribute("href").replace(/^\/+/, "")}`;
    });
  }

  addEventListener("resize", syncPanelHeight);
  addEventListener("apex:languagechange", (event) => applyLanguage(event.detail?.lang));
  applyLanguage(currentLanguage());
  activatePanel("overview");
})();
