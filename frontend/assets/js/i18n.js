(function () {
  const supported = ["en", "zh-CN", "zh-TW", "ru", "ar"];
  const labels = {
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
    ru: "Русский",
    ar: "العربية"
  };
  const storageKey = "apex-lang";

  function normalizeLang(value) {
    if (!value) return null;
    const clean = String(value).trim();
    const lower = clean.toLowerCase();
    if (lower === "zh" || lower === "zh-cn" || lower === "zh_hans") return "zh-CN";
    if (lower === "zh-tw" || lower === "zh_tw" || lower === "zh-hant") return "zh-TW";
    if (lower === "en") return "en";
    if (lower === "ru") return "ru";
    if (lower === "ar") return "ar";
    return supported.includes(clean) ? clean : null;
  }

  function urlLang() {
    try {
      return normalizeLang(new URLSearchParams(window.location.search).get("lang"));
    } catch (error) {
      return null;
    }
  }

  function readSavedLang() {
    try {
      return normalizeLang(localStorage.getItem(storageKey));
    } catch (error) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {}
  }

  function replaceUrlLang(lang) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.toString());
    } catch (error) {}
  }

  let currentLang = urlLang() || readSavedLang() || "en";
  saveLang(currentLang);

  function dictionary() {
    return (window.APEX_SITE_DATA && window.APEX_SITE_DATA.i18n) || {};
  }

  function t(key) {
    const dict = dictionary();
    return (dict[currentLang] && dict[currentLang][key]) || (dict.en && dict.en[key]) || key;
  }

  function isChinese() {
    return currentLang === "zh-CN" || currentLang === "zh-TW";
  }

  function locale() {
    if (currentLang === "zh-CN") return "zh-CN";
    if (currentLang === "zh-TW") return "zh-TW";
    if (currentLang === "ru") return "ru-RU";
    if (currentLang === "ar") return "ar";
    return "en-US";
  }

  function applyDocumentLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }

  function applyStaticText() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
  }

  function renderLanguageSwitchers() {
    document.querySelectorAll("[data-lang-toggle]").forEach((node) => {
      if (!node.classList.contains("language-switcher")) {
        const switcher = document.createElement("div");
        switcher.className = "language-switcher";
        switcher.setAttribute("data-lang-toggle", "");
        switcher.setAttribute("role", "group");
        switcher.setAttribute("aria-label", "Language selector");
        node.replaceWith(switcher);
        node = switcher;
      }

      const isOpen = node.classList.contains("is-open");
      node.innerHTML = `
        <button class="language-current" type="button" data-lang-menu-button aria-expanded="${isOpen}" aria-label="Select language">
          <span>${labels[currentLang]}</span>
          <span aria-hidden="true">&#9662;</span>
        </button>
        <div class="language-menu" data-lang-menu>
          ${supported.map((lang) => `
            <button class="language-option${lang === currentLang ? " is-active" : ""}" type="button" data-lang-option="${lang}" aria-pressed="${lang === currentLang}">
              ${labels[lang]}
            </button>
          `).join("")}
        </div>
      `;
    });
  }

  function applyAll() {
    applyDocumentLanguage();
    applyStaticText();
    renderLanguageSwitchers();
  }

  function setLang(lang, updateUrl = true) {
    const next = normalizeLang(lang) || "en";
    if (next === currentLang) {
      applyAll();
      return;
    }
    currentLang = next;
    saveLang(currentLang);
    if (updateUrl) replaceUrlLang(currentLang);
    applyAll();
    window.dispatchEvent(new CustomEvent("apex:languagechange", { detail: { lang: currentLang } }));
  }

  document.addEventListener("click", (event) => {
    const menuButton = event.target.closest("[data-lang-menu-button]");
    if (menuButton) {
      const switcher = menuButton.closest("[data-lang-toggle]");
      const isOpen = switcher.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const button = event.target.closest("[data-lang-option]");
    if (!button) {
      document.querySelectorAll("[data-lang-toggle].is-open").forEach((switcher) => {
        switcher.classList.remove("is-open");
        const currentButton = switcher.querySelector("[data-lang-menu-button]");
        if (currentButton) currentButton.setAttribute("aria-expanded", "false");
      });
      return;
    }
    const switcher = button.closest("[data-lang-toggle]");
    if (switcher) switcher.classList.remove("is-open");
    setLang(button.dataset.langOption);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-lang-toggle].is-open").forEach((switcher) => {
      switcher.classList.remove("is-open");
      const currentButton = switcher.querySelector("[data-lang-menu-button]");
      if (currentButton) currentButton.setAttribute("aria-expanded", "false");
    });
  });

  window.APEX_I18N = {
    supported,
    labels,
    getLang: () => currentLang,
    setLang,
    t,
    locale,
    isChinese,
    applyAll
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAll);
  } else {
    applyAll();
  }
})();
