const data = window.APEX_SITE_DATA;
const productGrid = document.querySelector("[data-product-grid]");
const filters = document.querySelector("[data-filters]");
const featured = document.querySelector("[data-featured-products]");
const year = document.querySelector("[data-year]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const langButton = document.querySelector("[data-lang-toggle]");
const modal = document.querySelector("[data-spec-modal]");
const modalBody = document.querySelector("[data-spec-modal-body]");
const modalClose = document.querySelector("[data-spec-modal-close]");
const hero = document.querySelector("[data-hero]");
const heroVideo = document.querySelector("[data-hero-video]");
const heroPlay = document.querySelector("[data-hero-play]");
const assetVersion = "20260626-lang-fix";

function readSavedLang() {
  try {
    return localStorage.getItem("apex-lang");
  } catch (error) {
    return null;
  }
}

function saveLang(lang) {
  try {
    localStorage.setItem("apex-lang", lang);
  } catch (error) {}
}

let currentLang = readSavedLang() || "en";
if (!data.i18n[currentLang]) currentLang = "en";

if (year) year.textContent = new Date().getFullYear();

function text(key) {
  return data.i18n[currentLang][key] || data.i18n.en[key] || key;
}

function specLabel(label) {
  return currentLang === "zh" ? (data.specLabelsZh[label] || label) : label;
}

function productIntro(product) {
  return currentLang === "zh" ? (product.introZh || product.intro) : product.intro;
}

function productSeries(product) {
  return currentLang === "zh" ? (product.seriesZh || product.series) : product.series;
}

function imageSrc(product) {
  return `${product.image}?v=${assetVersion}`;
}

function applyStaticText() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-company-name]").forEach((node) => {
    node.textContent = data.company.name;
  });

  document.querySelectorAll("[data-company-email]").forEach((node) => {
    node.textContent = data.company.email;
    node.href = `mailto:${data.company.email}`;
  });

  document.querySelectorAll("[data-company-whatsapp]").forEach((node) => {
    const phone = data.company.whatsapp.replace(/\D/g, "");
    node.textContent = `WhatsApp ${data.company.whatsapp}`;
    node.href = `https://wa.me/${phone}`;
  });

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = text(node.dataset.i18n);
  });

  const modelCount = document.querySelector("[data-model-count]");
  if (modelCount) modelCount.textContent = data.products.length;

  if (langButton) {
    langButton.textContent = text("lang");
    langButton.setAttribute("aria-label", currentLang === "zh" ? "Switch to English" : "Switch to Chinese");
  }
}

function specRows(product) {
  return product.specs
    .map(([key, value]) => `<div><dt>${specLabel(key)}</dt><dd>${value}</dd></div>`)
    .join("");
}

function productCard(product) {
  return `
    <article class="product-card" data-category="${product.category}">
      <div class="product-image">
        <img src="${imageSrc(product)}" alt="${product.model}" loading="lazy">
      </div>
      <div class="product-content">
        <p class="product-series">${productSeries(product)}</p>
        <h3 id="${product.slug}">${product.model}</h3>
        <p>${productIntro(product)}</p>
        <ul class="quick-specs">
          ${product.highlights.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <button class="parameters-button" type="button" data-open-specs="${product.slug}">
          <span aria-hidden="true">▸</span>${text("viewParameters")}
        </button>
      </div>
    </article>
  `;
}

function renderProducts(category = "all") {
  const products = category === "all"
    ? data.products
    : data.products.filter((product) => product.category === category);

  productGrid.innerHTML = products.map(productCard).join("");
}

function renderFilters(active = "all") {
  filters.innerHTML = data.categories.map((category) => `
    <button class="filter-button${category.id === active ? " is-active" : ""}" type="button" data-category="${category.id}">
      ${category[currentLang]}
    </button>
  `).join("");
}

function renderFeatured() {
  featured.innerHTML = data.products
    .filter((product) => ["s300", "f29r", "es11"].includes(product.slug))
    .map((product) => `
      <a href="#${product.slug}">
        <span>${product.model}</span>
        <strong>${product.highlights.slice(0, 2).join(" / ")}</strong>
      </a>
    `).join("");
}

function render(activeCategory = "all") {
  applyStaticText();
  if (filters) renderFilters(activeCategory);
  if (featured) renderFeatured();
  if (productGrid) renderProducts(activeCategory);
}

function unmuteHeroVideo() {
  if (!heroVideo) return;

  heroVideo.muted = false;
  heroVideo.defaultMuted = false;
  heroVideo.volume = 1;
}

function playHeroVideo(userInitiated = false) {
  if (!heroVideo) return;

  hero?.classList.add("is-video-playing");
  hero?.classList.remove("is-copy-visible", "is-video-ended");
  if (heroPlay) heroPlay.hidden = true;

  heroVideo.volume = 1;
  heroVideo.muted = !userInitiated;
  heroVideo.defaultMuted = !userInitiated;

  const playAttempt = heroVideo.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt
      .then(() => {})
      .catch(() => {
        if (userInitiated) {
          heroVideo.muted = true;
          heroVideo.defaultMuted = true;
          heroVideo.play()
            .then(() => {})
            .catch(() => {
              hero?.classList.remove("is-video-playing");
              hero?.classList.add("is-copy-visible");
              if (heroPlay) heroPlay.hidden = false;
            });
          return;
        }

        hero?.classList.remove("is-video-playing");
        hero?.classList.add("is-copy-visible");
        if (heroPlay) heroPlay.hidden = false;
      });
  }
}

function showHeroFallback() {
  hero?.classList.remove("is-video-playing");
  hero?.classList.add("is-copy-visible");
  if (heroPlay) heroPlay.hidden = false;
}

function endHeroVideo() {
  if (!heroVideo) return;

  heroVideo.pause();
  heroVideo.currentTime = 0;
  hero?.classList.remove("is-video-playing");
  hero?.classList.add("is-copy-visible", "is-video-ended");
  if (heroPlay) heroPlay.hidden = false;
}

function updateHeroVideoProgress() {
  if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;

  const secondsLeft = heroVideo.duration - heroVideo.currentTime;
  if (secondsLeft <= 3.2) {
    hero?.classList.add("is-copy-visible");
  }
}

function openSpecModal(product) {
  modalBody.innerHTML = `
    <div class="modal-product">
      <div class="modal-product-image">
        <img src="${imageSrc(product)}" alt="${product.model}">
      </div>
      <div>
        <p class="product-series">${productSeries(product)}</p>
        <h3>${product.model}</h3>
        <p>${productIntro(product)}</p>
        <ul class="quick-specs">
          ${product.highlights.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="modal-divider"></div>
    <h4>${text("viewParameters")}</h4>
    <dl class="spec-table">${specRows(product)}</dl>
  `;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeSpecModal() {
  modal.hidden = true;
  modalBody.innerHTML = "";
  document.body.classList.remove("modal-open");
}

render();

if (heroVideo) {
  hero?.classList.add("is-video-playing");
  hero?.classList.remove("is-copy-visible", "is-video-ended");
  if (heroPlay) heroPlay.hidden = true;

  playHeroVideo();

  heroVideo.addEventListener("timeupdate", updateHeroVideoProgress);
  heroVideo.addEventListener("ended", endHeroVideo);
  heroVideo.addEventListener("error", showHeroFallback);

  window.setTimeout(() => {
    if (heroVideo.paused && heroVideo.currentTime < 0.2) showHeroFallback();
  }, 1800);
}

if (heroPlay) {
  heroPlay.addEventListener("click", () => {
    heroVideo.currentTime = 0;
    playHeroVideo(true);
  });
}

if (filters) {
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    render(button.dataset.category);
  });
}

if (productGrid) {
  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-specs]");
    if (!button) return;

    const product = data.products.find((item) => item.slug === button.dataset.openSpecs);
    if (product) openSpecModal(product);
  });
}

if (langButton) {
  langButton.addEventListener("click", () => {
    const active = filters?.querySelector(".is-active")?.dataset.category || "all";
    currentLang = currentLang === "zh" ? "en" : "zh";
    saveLang(currentLang);
    render(active);
  });
}

if (modalClose) modalClose.addEventListener("click", closeSpecModal);

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeSpecModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeSpecModal();
});

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const subject = encodeURIComponent(`Product inquiry - ${fields.get("model")}`);
    const body = encodeURIComponent([
      `Name: ${fields.get("name")}`,
      `Email: ${fields.get("email")}`,
      `Target model: ${fields.get("model")}`,
      `Quantity: ${fields.get("quantity")}`,
      "",
      fields.get("message")
    ].join("\n"));

    window.location.href = `mailto:${data.company.email}?subject=${subject}&body=${body}`;
  });
}
