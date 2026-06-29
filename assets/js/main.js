const data = window.APEX_SITE_DATA;
const productGrid = document.querySelector("[data-product-grid]");
const filters = document.querySelector("[data-filters]");
const featured = document.querySelector("[data-featured-products]");
const year = document.querySelector("[data-year]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const quickInquiry = document.querySelector("[data-quick-inquiry]");
const langButton = document.querySelector("[data-lang-toggle]");
const modal = document.querySelector("[data-spec-modal]");
const modalBody = document.querySelector("[data-spec-modal-body]");
const modalClose = document.querySelector("[data-spec-modal-close]");
const hero = document.querySelector("[data-hero]");
const heroVideo = document.querySelector("[data-hero-video]");
const heroPlay = document.querySelector("[data-hero-play]");
const newsList = document.querySelector("[data-news-list]");
const assetVersion = "20260628-inquiry-bilingual-report";
const inquiryTemplateBase64 = "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";

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

function studioImageSrc(product) {
  return `assets/img/products/3.4/${product.slug}.png?v=${assetVersion}`;
}

function categoryLabel(category) {
  return category[currentLang] || category.en;
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
    langButton.textContent = currentLang === "zh" ? "EN" : "\u4e2d\u6587";
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
      <button class="product-image product-image-button" type="button" data-open-specs="${product.slug}" aria-label="${text("viewParameters")} ${product.model}">
        <img src="${studioImageSrc(product)}" alt="${product.model}" loading="lazy">
      </button>
      <div class="product-content">
        <p class="product-series">${productSeries(product)}</p>
        <h3 id="${product.slug}">${product.model}</h3>
        <p>${productIntro(product)}</p>
        <button class="parameters-button" type="button" data-open-specs="${product.slug}">
          <span aria-hidden="true">&#9656;</span>${text("viewParameters")}
        </button>
      </div>
    </article>
  `;
}

function renderProducts(category = "all") {
  if (!productGrid) return;
  const products = category === "all"
    ? data.products
    : data.products.filter((product) => product.category === category);

  productGrid.innerHTML = products.map(productCard).join("");
}

function renderFilters(active = "all") {
  if (!filters) return;
  filters.innerHTML = data.categories.map((category) => `
    <button class="filter-button${category.id === active ? " is-active" : ""}" type="button" data-category="${category.id}">
      ${categoryLabel(category)}
    </button>
  `).join("");
}

function renderFeatured() {
  if (!featured) return;
  featured.innerHTML = data.products
    .filter((product) => ["s300", "f29r", "es11"].includes(product.slug))
    .map((product) => `
      <button type="button" data-open-specs="${product.slug}">
        <span>${product.model}</span>
        <strong>${product.highlights.slice(0, 2).join(" / ")}</strong>
      </button>
    `).join("");
}

function fallbackNews() {
  return [
    {
      title: text("newsFallbackTitle"),
      source: "Apex Moto Supply",
      url: "#news",
      publishedAt: new Date().toISOString(),
      summary: text("newsFallbackText")
    }
  ];
}

function renderNews(items) {
  if (!newsList) return;
  const news = items && items.length ? items : fallbackNews();
  newsList.innerHTML = news.slice(0, 6).map((item) => {
    const date = item.publishedAt ? new Date(item.publishedAt).toLocaleDateString(currentLang === "zh" ? "zh-CN" : "en-US") : "";
    return `
      <a class="news-card" href="${item.url || "#news"}" target="${item.url && item.url !== "#news" ? "_blank" : "_self"}" rel="noopener">
        <span>${date}${item.source ? ` - ${item.source}` : ""}</span>
        <strong>${item.title}</strong>
        <p>${item.summary || ""}</p>
      </a>
    `;
  }).join("");
}

async function loadNews() {
  if (!newsList) return;
  newsList.innerHTML = `<div class="news-loading">${text("newsLoading")}</div>`;

  try {
    const response = await fetch(`/api/news?lang=${currentLang}`, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error("News request failed");
    const payload = await response.json();
    renderNews(payload.items);
  } catch (error) {
    renderNews(fallbackNews());
  }
}

function render(activeCategory = "all") {
  applyStaticText();
  renderFilters(activeCategory);
  renderFeatured();
  renderProducts(activeCategory);
}

function unmuteHeroVideo() {
  if (!heroVideo) return;
  heroVideo.muted = false;
  heroVideo.defaultMuted = false;
  heroVideo.volume = 1;
}

function playHeroVideo(userInitiated = false) {
  if (!heroVideo) return;

  if (hero) hero.classList.add("is-video-playing");
  if (hero) hero.classList.remove("is-copy-visible", "is-video-ended");
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
              if (hero) hero.classList.remove("is-video-playing");
              if (hero) hero.classList.add("is-copy-visible");
              if (heroPlay) heroPlay.hidden = false;
            });
          return;
        }

        if (hero) hero.classList.remove("is-video-playing");
        if (hero) hero.classList.add("is-copy-visible");
        if (heroPlay) heroPlay.hidden = false;
      });
  }
}

function showHeroFallback() {
  if (hero) hero.classList.remove("is-video-playing");
  if (hero) hero.classList.add("is-copy-visible");
  if (heroPlay) heroPlay.hidden = false;
}

function endHeroVideo() {
  if (!heroVideo) return;

  heroVideo.pause();
  heroVideo.currentTime = 0;
  if (hero) hero.classList.remove("is-video-playing");
  if (hero) hero.classList.add("is-copy-visible", "is-video-ended");
  if (heroPlay) heroPlay.hidden = false;
}

function updateHeroVideoProgress() {
  if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;

  const secondsLeft = heroVideo.duration - heroVideo.currentTime;
  if (secondsLeft <= 3.2) {
    if (hero) hero.classList.add("is-copy-visible");
  }
}

function openSpecModal(product) {
  if (!modal || !modalBody || !modalClose) return;
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
  if (!modal || !modalBody) return;
  modal.hidden = true;
  modalBody.innerHTML = "";
  document.body.classList.remove("modal-open");
}

function escapeXml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function xlsxInlineCell(ref, value, styleId) {
  return `<c r="${ref}" s="${styleId}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
}

function replaceXlsxCell(sheetXml, ref, value, styleId) {
  const cellPattern = new RegExp(`<c r="${ref}"[\\s\\S]*?<\\/c>`);
  return sheetXml.replace(cellPattern, xlsxInlineCell(ref, value, styleId));
}

function readInquiryFields(formElement) {
  const fields = {};
  const formData = new FormData(formElement);
  formData.forEach((fieldValue, fieldName) => {
    fields[fieldName] = fieldValue;
  });
  return fields;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  if (typeof link.click === "function") {
    link.click();
  } else {
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  }
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function validateInquiry(fields) {
  const name = String(fields.name || "").trim();
  const email = String(fields.email || "").trim();

  if (!name || !email) return false;
  return isValidEmail(email);
}

async function saveInquiry(fields = {}) {
  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fields.name || "",
        email: fields.email || "",
        model: fields.model || "",
        quantity: fields.quantity || "",
        message: fields.message || "",
        sourceUrl: window.location.href
      })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Inquiry save failed", error);
    return { ok: false, error: error.message };
  }
}

async function createInquirySheet(fields = {}) {
  try {
    if (!window.JSZip) {
      throw new Error("JSZip is not loaded");
    }

    const isZh = currentLang === "zh";
    const reportText = isZh ? {
      title: "H&T \u8d8a\u91ce\u6469\u6258\u8be2\u76d8\u8868\u5355",
      subtitle: "\u8bf7\u786e\u8ba4\u76ee\u6807\u8f66\u578b\u3001\u91c7\u8d2d\u6570\u91cf\u3001\u76ee\u7684\u5730\u3001\u989c\u8272\u548c\u5305\u88c5\u9700\u6c42\u3002",
      name: "\u59d3\u540d",
      email: "\u90ae\u7bb1",
      model: "\u8f66\u578b",
      quantity: "\u6570\u91cf",
      message: "\u9700\u6c42\u8bf4\u660e",
      contact: "\u8054\u7cfb\u65b9\u5f0f",
      generatedAt: "\u751f\u6210\u65f6\u95f4",
      locale: "zh-CN",
      filenamePrefix: "H&T-inquiry-form"
    } : {
      title: "H&T Off-road Motorcycle Inquiry Form",
      subtitle: "Please confirm target model, purchase quantity, destination, color and packing requirements.",
      name: "Name",
      email: "Email",
      model: "Model",
      quantity: "Quantity",
      message: "Requirements",
      contact: "Contact",
      generatedAt: "Generated at",
      locale: "en-US",
      filenamePrefix: "H&T-inquiry-form"
    };
    const submittedAt = new Date().toLocaleString(reportText.locale);
    const value = (key) => fields[key] || "";
    const zip = await JSZip.loadAsync(inquiryTemplateBase64, { base64: true });
    const sheet = zip.file("xl/worksheets/sheet1.xml");
    if (!sheet) throw new Error("Template worksheet is missing");

    let sheetXml = await sheet.async("string");
    sheetXml = replaceXlsxCell(sheetXml, "A1", reportText.title, 11);
    sheetXml = replaceXlsxCell(sheetXml, "A2", reportText.subtitle, 12);
    sheetXml = replaceXlsxCell(sheetXml, "A3", reportText.name, 2);
    sheetXml = replaceXlsxCell(sheetXml, "C3", reportText.email, 4);
    sheetXml = replaceXlsxCell(sheetXml, "A4", value("name"), 5);
    sheetXml = replaceXlsxCell(sheetXml, "C4", value("email"), 7);
    sheetXml = replaceXlsxCell(sheetXml, "A5", reportText.model, 8);
    sheetXml = replaceXlsxCell(sheetXml, "C5", reportText.quantity, 9);
    sheetXml = replaceXlsxCell(sheetXml, "A6", value("model"), 5);
    sheetXml = replaceXlsxCell(sheetXml, "C6", value("quantity"), 10);
    sheetXml = replaceXlsxCell(sheetXml, "A7", reportText.message, 13);
    sheetXml = replaceXlsxCell(sheetXml, "A8", value("message"), 16);
    sheetXml = replaceXlsxCell(sheetXml, "A9", `${reportText.contact}: ${data.company.email} / WhatsApp ${data.company.whatsapp}`, 19);
    sheetXml = replaceXlsxCell(sheetXml, "A10", `${reportText.generatedAt}: ${submittedAt}`, 22);
    zip.file("xl/worksheets/sheet1.xml", sheetXml);

    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");
    downloadBlob(blob, `${reportText.filenamePrefix}-${timestamp}.xlsx`);
  } catch (error) {
    console.error(error);
    alert(currentLang === "zh"
      ? `\u8be2\u76d8\u8868\u751f\u6210\u5931\u8d25\uff1a${error.message}`
      : `Inquiry form generation failed: ${error.message}`);
  }
}

function handleOpenSpecs(event) {
  const button = event.target.closest("[data-open-specs]");
  if (!button) return;

  const product = data.products.find((item) => item.slug === button.dataset.openSpecs);
  if (product) openSpecModal(product);
}

render();
loadNews();

if (heroVideo) {
  if (hero) hero.classList.add("is-video-playing");
  if (hero) hero.classList.remove("is-copy-visible", "is-video-ended");
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

[productGrid, featured].forEach((container) => {
  if (container) container.addEventListener("click", handleOpenSpecs);
});

if (langButton) {
  langButton.addEventListener("click", () => {
    const activeButton = filters ? filters.querySelector(".is-active") : null;
    const active = activeButton ? activeButton.dataset.category : "all";
    currentLang = currentLang === "zh" ? "en" : "zh";
    saveLang(currentLang);
    render(active);
    loadNews();
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

if (quickInquiry) {
  quickInquiry.addEventListener("click", () => createInquirySheet());
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fields = readInquiryFields(form);
    if (!validateInquiry(fields)) {
      alert(currentLang === "zh" ? "\u8bf7\u586b\u5199\u59d3\u540d\u548c\u6709\u6548\u90ae\u7bb1\u3002" : "Please enter name and a valid email.");
      return;
    }
    const inquiryResult = await saveInquiry(fields);
    await createInquirySheet(fields);
    if (inquiryResult.ok) {
      const mailSent = inquiryResult.emailStatus === "sent";
      alert(currentLang === "zh"
        ? `询盘已提交，表单已下载。${mailSent ? "邮件已发送成功。" : "邮件发送状态请在后台查看。"}`
        : `Inquiry submitted and the form was downloaded. ${mailSent ? "Email sent successfully." : "Check the admin page for email status."}`);
    } else {
      alert(currentLang === "zh"
        ? "表单已下载，但后台保存失败，请稍后重试或直接联系邮箱。"
        : "The form was downloaded, but backend saving failed. Please try again later or contact us by email.");
    }
  });
}
