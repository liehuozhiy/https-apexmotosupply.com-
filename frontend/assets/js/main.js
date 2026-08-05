const data = window.APEX_SITE_DATA;
const productGrid = document.querySelector("[data-product-grid]");
const filters = document.querySelector("[data-filters]");
const featured = document.querySelector("[data-featured-products]");
const year = document.querySelector("[data-year]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-inquiry-form]");
const quickInquiry = document.querySelector("[data-quick-inquiry]");
const modal = document.querySelector("[data-spec-modal]");
const modalBody = document.querySelector("[data-spec-modal-body]");
const modalClose = document.querySelector("[data-spec-modal-close]");
const hero = document.querySelector("[data-hero]");
const heroVideo = document.querySelector("[data-hero-video]");
const heroPlay = document.querySelector("[data-hero-play]");
const newsList = document.querySelector("[data-news-list]");
const assetVersion = "20260628-inquiry-bilingual-report";
const inquiryTemplateBase64 = "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";

const i18n = window.APEX_I18N || null;
let currentLang = i18n ? i18n.getLang() : "en";

// Gallery[0] is captured at build time from each product-detail data file.  The
// menu never fetches model JSON at runtime, so it remains usable over HTTP and file://.
const productWorldGroups = [
  { name: "Babey", power: "electric", models: [["Babey", "babey.html", "../assets/img/generated/babey-gallery-wide-v3/babey-angle-01-front-wide-dark-v3.png"], ["Babey+", "babey-plus.html", "../assets/img/babey-plus-gallery-dark-v1/babey-plus-angle-01-front-dark-v2.png"]] },
  { name: "F4", power: "electric", models: [["F4", "f4.html", "../assets/img/f4-official/f4-angle-01-front-dark-industrial-panorama-v4.png"], ["F4+", "f4-plus.html", "../assets/img/f4-plus-detail/f4-plus-gallery-01-front-v2.png"]] },
  { name: "ET", power: "electric", models: [["ET", "et.html", "../assets/img/et-gallery-dark-metal/et-angle-01-front-dark-metal-wide-v3.png"], ["ET 2022", "et-2022.html", "../assets/img/et-2022-gallery-dark-v1/et-2022-angle-01-front-dark-v2.png"], ["ET 2024", "et-2024.html", "../assets/img/et-2024-gallery-dark-v1/et-2024-angle-01-front-dark-v2.png"]] },
  { name: "Time-F", power: "electric", models: [["F9", "f9.html", "../assets/img/f9-detail/f9-gallery-01-v2.png"], ["F29", "f29.html", "../assets/img/f29-detail/f29-gallery-01-front-dark-industrial-official-identity-ai-v1.png"], ["F29R", "f29r.html", "../assets/img/f29r-gallery/f29r-angle-01-front-dark-wide-ai-v3.png"]] },
  { name: "SJ", power: "fuel", models: [["SJ250", "sj250.html", "../assets/img/sj250-gallery/sj250-angle-01-front-dark-ultrawide-v4.png"], ["SJ300", "sj300.html", "../assets/img/sj300-dark-studio-gallery/01-front-v3-ultrawide.png"]] },
  { name: "S300", power: "fuel", models: [["S300", "s300.html", "../assets/img/products/s300-detail/s300-wide-angle-01-front-v1-dark.png"], ["S300R", "s300r.html", "../assets/img/products/s300r/s300r-front-dark-industrial-wide-v3.png"], ["SN300", "sn300.html", "../assets/img/sn300/sn300-ai-angle-01-front-wide-dark-v3.png"], ["SY300", "sy300.html", "../assets/img/generated/sy300-gallery-wide-v3/sy300-angle-01-front-wide-v3.png"]] },
  { name: "H300", power: "fuel", models: [["H300", "h300.html", "../assets/img/h300-detail/h300-gallery-01-front-dark-v1.png"]] },
  { name: "Bumblebee", power: "electric", models: [["Bumblebee", "bumblebee.html", "../assets/img/bumblebee-detail/bumblebee-gallery-01-front-v2.png"]] },
  { name: "HS85CC", power: "fuel", models: [["HS85CC", "hs85.html", "../assets/img/hs85-official-gallery/01-front-ai-dark-wide-v2.png"]] },
  { name: "ER", power: "electric", models: [["ER3", "er3.html", "../assets/img/gallery-corrected-v1/er3/er3-angle-01-front-v2.png"], ["ER5", "er5.html", "../assets/img/catalog-dark-studio/er5-01-front-v1.png"], ["ER7", "er7.html", "../assets/img/catalog-dark-studio/er7-01-front-studio.png"]] },
  { name: "ES", power: "electric", models: [["ES11", "es11.html", "../assets/img/catalog-dark-studio/es11-gallery-01-front-v1.png"]] },
  { name: "ETT", power: "electric", models: [["ET3", "et3.html", "../assets/img/catalog-dark-studio/et3-angle-01-front.png"], ["ET5", "et5.html", "../assets/img/catalog-dark-studio/et5-gallery-01-front-v1.png"], ["ET7", "et7.html", "../assets/img/catalog-dark-studio/et7-gallery-01-front-v1.png"], ["ET9", "et9.html", "../assets/img/catalog-dark-studio/et9-01-front-dark-industrial-v1.png"]] }
];

// Only approved, text-free portrait plates are registered here.  Missing
// entries deliberately show no preview rather than falling back to a gallery
// image that has not passed the product-world visual gate.
const productWorldPreviewAssets = {
  "babey.html": "../assets/img/product-world-previews/babey-preview-headlight-v4.png",
  "babey-plus.html": "../assets/img/product-world-previews/babey-plus-preview-headlight-v6.png",
  "bumblebee.html": "../assets/img/product-world-previews/bumblebee-preview-headlight-v6.png",
  "er3.html": "../assets/img/product-world-previews/er3-preview-headlight-v4.png",
  "er5.html": "../assets/img/product-world-previews/er5-preview-headlight-v5.png",
  "er7.html": "../assets/img/product-world-previews/er7-preview-headlight-v4.png",
  "es11.html": "../assets/img/product-world-previews/es11-preview-headlight-v3.png",
  "et.html": "../assets/img/product-world-previews/et-preview-headlight-v2.png",
  "et-2022.html": "../assets/img/product-world-previews/et-2022-preview-headlight-v4.png",
  "et-2024.html": "../assets/img/product-world-previews/et-2024-preview-headlight-v3.png",
  "et3.html": "../assets/img/product-world-previews/et3-preview-headlight-v3.png",
  "et5.html": "../assets/img/product-world-previews/et5-preview-headlight-v2.png",
  "et7.html": "../assets/img/product-world-previews/et7-preview-headlight-v5.png",
  "et9.html": "../assets/img/product-world-previews/et9-preview-headlight-v4.png",
  "f4.html": "../assets/img/product-world-previews/f4-preview-headlight-centered-v6.png",
  "f4-plus.html": "../assets/img/product-world-previews/f4-plus-preview-headlight-v3.png",
  "f9.html": "../assets/img/product-world-previews/f9-preview-headlight-v3.png",
  "f29.html": "../assets/img/product-world-previews/f29-preview-headlight-v6.png",
  "f29r.html": "../assets/img/product-world-previews/f29r-preview-headlight-v2.png",
  "h300.html": "../assets/img/product-world-previews/h300-preview-headlight-v5.png",
  "hs85.html": "../assets/img/product-world-previews/hs85-preview-headlight-v4.png",
  "s300.html": "../assets/img/product-world-previews/s300-preview-headlight-v5.png",
  "s300r.html": "../assets/img/product-world-previews/s300r-preview-headlight-v3.png",
  "sj250.html": "../assets/img/product-world-previews/sj250-preview-headlight-v3.png",
  "sj300.html": "../assets/img/product-world-previews/sj300-preview-headlight-v4.png",
  "sn300.html": "../assets/img/product-world-previews/sn300-preview-headlight-v7.png",
  "sy300.html": "../assets/img/product-world-previews/sy300-preview-headlight-v3.png",
};

// Accents belong to each model and do not inherit the currently open page.
const productWorldModelThemes = {
  "babey-plus.html": { accent: "#9dff13", bright: "#d1ff74", rgb: "157,255,19" },
  "babey.html": { accent: "#bac7d0", bright: "#f2f7fa", rgb: "186,199,208" },
  "bumblebee.html": { accent: "#bfe9ff", bright: "#f4fbff", rgb: "124,207,255" },
  "er3.html": { accent: "#e8ad2f", bright: "#ffe07a", rgb: "232,173,47" },
  "er5.html": { accent: "#39c85a", bright: "#8aff9e", rgb: "57,200,90" },
  "er7.html": { accent: "#9daa52", bright: "#d8df8b", rgb: "157,170,82" },
  "es11.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "et.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "et-2022.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "et-2024.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "et3.html": { accent: "#e23a3a", bright: "#ff7777", rgb: "226,58,58" },
  "et5.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "et7.html": { accent: "#bac7d0", bright: "#f2f7fa", rgb: "186,199,208" },
  "et9.html": { accent: "#e23a3a", bright: "#ff7777", rgb: "226,58,58" },
  "f29.html": { accent: "#f08b24", bright: "#ffc06a", rgb: "240,139,36" },
  "f29r.html": { accent: "#e8ad2f", bright: "#ffe07a", rgb: "232,173,47" },
  "f4-plus.html": { accent: "#9dff13", bright: "#d1ff74", rgb: "157,255,19" },
  "f4.html": { accent: "#9dff13", bright: "#d1ff74", rgb: "157,255,19" },
  "f9.html": { accent: "#f08b24", bright: "#ffc06a", rgb: "240,139,36" },
  "h300.html": { accent: "#e8ad2f", bright: "#ffe07a", rgb: "232,173,47" },
  "hs85.html": { accent: "#e8ad2f", bright: "#ffe07a", rgb: "232,173,47" },
  "s300.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "s300r.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "sj250.html": { accent: "#e23a3a", bright: "#ff7777", rgb: "226,58,58" },
  "sj300.html": { accent: "#e23a3a", bright: "#ff7777", rgb: "226,58,58" },
  "sn300.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
  "sy300.html": { accent: "#28a9ff", bright: "#82d6ff", rgb: "40,169,255" },
};

function productWorldModelTheme(fileName) {
  return productWorldModelThemes[fileName] || productWorldModelThemes["sj300.html"];
}

// Preview-card copy is kept separate from model names so each card can follow
// the active site language without changing product identity or artwork.
const productWorldPreviewSlogans = Object.freeze({
  en: Object.freeze({
    "babey.html": "Start with joy. Ride free.",
    "babey-plus.html": "More power. More growing fun.",
    "bumblebee.html": "Agile spirit. Boundless adventure.",
    "er3.html": "Agile electric drive. Light off-road freedom.",
    "er5.html": "Strong electric drive. Own the open trail.",
    "er7.html": "High-energy off-road. Conquer every challenge.",
    "es11.html": "Flagship electric drive. Ride beyond limits.",
    "et.html": "Electric pioneer. Quietly master the trail.",
    "et-2022.html": "Light electric off-road. Agile all the way.",
    "et-2024.html": "Renewed electric drive. Race beyond limits.",
    "et3.html": "Your electric start. Off-road freedom.",
    "et5.html": "Advanced electric drive. Cross with confidence.",
    "et7.html": "Powerful electric drive. A journey without limits.",
    "et9.html": "Peak electric drive. Master the extreme.",
    "f4.html": "Fearless performance. Break the rules.",
    "f4-plus.html": "Lightweight upgrade. Full power ahead.",
    "f9.html": "Light electric drive. Flow through the wild.",
    "f29.html": "High-power electric drive. Push beyond boundaries.",
    "f29r.html": "Race-grade electric drive. Unleash your edge.",
    "h300.html": "Four-stroke power. Steady on every trail.",
    "hs85.html": "Lightweight racing. A young rider's edge.",
    "s300.html": "Steady four-stroke. Roam every trail.",
    "s300r.html": "Two-stroke punch. Rule the track.",
    "sj250.html": "Light two-stroke. Win with agility.",
    "sj300.html": "Track-bred two-stroke. Full race spirit.",
    "sn300.html": "Enduring four-stroke. Conquer the distance.",
    "sy300.html": "Tough four-stroke. Cross without fear.",
  }),
  "zh-CN": Object.freeze({
    "babey.html": "\u7ae5\u8da3\u542f\u7a0b \u81ea\u5728\u9a70\u9a8b",
    "babey-plus.html": "\u8fdb\u9636\u52a8\u529b \u5feb\u4e50\u6210\u957f",
    "bumblebee.html": "\u7075\u52a8\u8702\u9a70 \u91ce\u8da3\u65e0\u754c",
    "er3.html": "\u654f\u6377\u7535\u9a71 \u8f7b\u8d8a\u5c71\u91ce",
    "er5.html": "\u5f3a\u52b2\u7535\u9a71 \u7eb5\u6a2a\u65f7\u91ce",
    "er7.html": "\u9ad8\u80fd\u8d8a\u91ce \u5f81\u670d\u9669\u5883",
    "es11.html": "\u65d7\u8230\u7535\u9a71 \u6781\u5883\u9a70\u9a8b",
    "et.html": "\u7535\u9a71\u5148\u950b \u9759\u9a6d\u5c71\u91ce",
    "et-2022.html": "\u8f7b\u7535\u8d8a\u91ce \u7075\u654f\u968f\u884c",
    "et-2024.html": "\u7115\u65b0\u7535\u9a71 \u75be\u9a70\u65e0\u754c",
    "et3.html": "\u5165\u95e8\u7535\u9a71 \u81ea\u5728\u8d8a\u91ce",
    "et5.html": "\u8fdb\u9636\u7535\u9a71 \u4ece\u5bb9\u8de8\u8d8a",
    "et7.html": "\u5f3a\u608d\u7535\u9a71 \u65e0\u754c\u5f81\u9014",
    "et9.html": "\u5dc5\u5cf0\u7535\u9a71 \u9a70\u9a8b\u6781\u5883",
    "f4.html": "\u5f3a\u608d\u6027\u80fd \u6562\u4e8e\u98a0\u8986",
    "f4-plus.html": "\u8f7b\u91cf\u8fdb\u9636 \u52a8\u529b\u5168\u5f00",
    "f9.html": "\u8f7b\u76c8\u7535\u9a71 \u7545\u884c\u5c71\u91ce",
    "f29.html": "\u9ad8\u80fd\u7535\u9a71 \u7a81\u7834\u8fb9\u754c",
    "f29r.html": "\u8d5b\u7ea7\u7535\u9a71 \u950b\u8292\u5c3d\u663e",
    "h300.html": "\u56db\u51b2\u52a8\u529b \u7a33\u9a6d\u5c71\u91ce",
    "hs85.html": "\u8f7b\u91cf\u8d5b\u9a6d \u5c11\u5e74\u950b\u8292",
    "s300.html": "\u7a33\u5065\u56db\u51b2 \u7eb5\u6a2a\u5c71\u91ce",
    "s300r.html": "\u4e24\u51b2\u7206\u53d1 \u8d5b\u9053\u79f0\u96c4",
    "sj250.html": "\u8f7b\u76c8\u4e24\u51b2 \u654f\u6377\u5236\u80dc",
    "sj300.html": "\u8d5b\u9053\u4e24\u51b2 \u950b\u8292\u5168\u5f00",
    "sn300.html": "\u8010\u4e45\u56db\u51b2 \u5f81\u670d\u957f\u9014",
    "sy300.html": "\u5f3a\u97e7\u56db\u51b2 \u65e0\u754f\u7a7f\u8d8a",
  }),
  "zh-TW": Object.freeze({
    "babey.html": "\u7ae5\u8da3\u555f\u7a0b \u81ea\u5728\u99b3\u9a01",
    "babey-plus.html": "\u9032\u968e\u52d5\u529b \u5feb\u6a02\u6210\u9577",
    "bumblebee.html": "\u9748\u52d5\u8702\u99b3 \u91ce\u8da3\u7121\u754c",
    "er3.html": "\u654f\u6377\u96fb\u9a45 \u8f15\u8d8a\u5c71\u91ce",
    "er5.html": "\u5f37\u52c1\u96fb\u9a45 \u7e31\u6a6b\u66e0\u91ce",
    "er7.html": "\u9ad8\u80fd\u8d8a\u91ce \u5f81\u670d\u96aa\u5883",
    "es11.html": "\u65d7\u8266\u96fb\u9a45 \u6975\u5883\u99b3\u9a01",
    "et.html": "\u96fb\u9a45\u5148\u92d2 \u975c\u99ad\u5c71\u91ce",
    "et-2022.html": "\u8f15\u96fb\u8d8a\u91ce \u9748\u654f\u96a8\u884c",
    "et-2024.html": "\u7165\u65b0\u96fb\u9a45 \u75be\u99b3\u7121\u754c",
    "et3.html": "\u5165\u9580\u96fb\u9a45 \u81ea\u5728\u8d8a\u91ce",
    "et5.html": "\u9032\u968e\u96fb\u9a45 \u5f9e\u5bb9\u8de8\u8d8a",
    "et7.html": "\u5f37\u608d\u96fb\u9a45 \u7121\u754c\u5f81\u9014",
    "et9.html": "\u5dc5\u5cf0\u96fb\u9a45 \u99b3\u9a01\u6975\u5883",
    "f4.html": "\u5f37\u608d\u6027\u80fd \u6562\u65bc\u985b\u8986",
    "f4-plus.html": "\u8f15\u91cf\u9032\u968e \u52d5\u529b\u5168\u958b",
    "f9.html": "\u8f15\u76c8\u96fb\u9a45 \u66a2\u884c\u5c71\u91ce",
    "f29.html": "\u9ad8\u80fd\u96fb\u9a45 \u7a81\u7834\u908a\u754c",
    "f29r.html": "\u8cfd\u7d1a\u96fb\u9a45 \u92d2\u8292\u76e1\u986f",
    "h300.html": "\u56db\u885d\u52d5\u529b \u7a69\u99ad\u5c71\u91ce",
    "hs85.html": "\u8f15\u91cf\u8cfd\u99ad \u5c11\u5e74\u92d2\u8292",
    "s300.html": "\u7a69\u5065\u56db\u885d \u7e31\u6a6b\u5c71\u91ce",
    "s300r.html": "\u5169\u885d\u7206\u767c \u8cfd\u9053\u7a31\u96c4",
    "sj250.html": "\u8f15\u76c8\u5169\u885d \u654f\u6377\u5236\u52dd",
    "sj300.html": "\u8cfd\u9053\u5169\u885d \u92d2\u8292\u5168\u958b",
    "sn300.html": "\u8010\u4e45\u56db\u885d \u5f81\u670d\u9577\u9014",
    "sy300.html": "\u5f37\u97cc\u56db\u885d \u7121\u754f\u7a7f\u8d8a",
  }),
  ru: Object.freeze({
    "babey.html": "Радостный старт. Свободная езда.",
    "babey-plus.html": "Больше мощности. Больше радости.",
    "bumblebee.html": "Маневренный дух. Приключения без границ.",
    "er3.html": "Маневренный электропривод. Легкость на трассе.",
    "er5.html": "Мощный электропривод. Покоряй просторы.",
    "er7.html": "Энергия бездорожья. Покоряй преграды.",
    "es11.html": "Флагманский электропривод. За пределами.",
    "et.html": "Пионер электротяги. Тишина на трассе.",
    "et-2022.html": "Легкий электрокросс. Маневренность в пути.",
    "et-2024.html": "Новый электропривод. Скорость без границ.",
    "et3.html": "Первый электрокросс. Свобода на трассе.",
    "et5.html": "Новый уровень. Уверенно вперед.",
    "et7.html": "Мощный электропривод. Путь без границ.",
    "et9.html": "Пик электротяги. Покоряй пределы.",
    "f4.html": "Мощный характер. Ломай правила.",
    "f4-plus.html": "Легче и мощнее. Полная тяга.",
    "f9.html": "Легкий электропривод. Свобода в пути.",
    "f29.html": "Высокая мощность. За границы.",
    "f29r.html": "Гоночный электропривод. Яркий характер.",
    "h300.html": "Четыре такта. Уверенно на трассе.",
    "hs85.html": "Легкая гонка. Юный характер.",
    "s300.html": "Надежные четыре такта. Везде уверенно.",
    "s300r.html": "Взрыв двух тактов. Лидер трассы.",
    "sj250.html": "Легкие два такта. Победа в маневре.",
    "sj300.html": "Гоночные два такта. Полный накал.",
    "sn300.html": "Ресурс четырех тактов. Дальние маршруты.",
    "sy300.html": "Мощные четыре такта. Вперед без страха.",
  }),
  ar: Object.freeze({
    "babey.html": "بداية مرحة. انطلاق بحرية.",
    "babey-plus.html": "قوة أكبر. متعة تنمو.",
    "bumblebee.html": "روح رشيقة. مغامرة بلا حدود.",
    "er3.html": "دفع كهربائي رشيق. خفة على الطرق الوعرة.",
    "er5.html": "دفع كهربائي قوي. سيطر على الدروب.",
    "er7.html": "طاقة للطرق الوعرة. تغلب على التحديات.",
    "es11.html": "دفع كهربائي رائد. انطلق أبعد.",
    "et.html": "رائد كهربائي. هدوء يسيطر على الدروب.",
    "et-2022.html": "قيادة كهربائية خفيفة. رشاقة طوال الطريق.",
    "et-2024.html": "دفع كهربائي متجدد. سرعة بلا حدود.",
    "et3.html": "بدايتك الكهربائية. حرية على الدروب.",
    "et5.html": "دفع كهربائي متقدم. عبور بثقة.",
    "et7.html": "دفع كهربائي قوي. رحلة بلا حدود.",
    "et9.html": "قمة الدفع الكهربائي. سيطر على القمم.",
    "f4.html": "أداء جريء. اكسر القواعد.",
    "f4-plus.html": "ترقية خفيفة. قوة كاملة.",
    "f9.html": "دفع كهربائي خفيف. انطلق في البرية.",
    "f29.html": "طاقة كهربائية عالية. تجاوز الحدود.",
    "f29r.html": "دفع كهربائي للسباق. أطلق قوتك.",
    "h300.html": "قوة رباعية الأشواط. ثبات على كل درب.",
    "hs85.html": "سباق خفيف. روح شابة.",
    "s300.html": "أداء رباعي ثابت. انطلق في كل درب.",
    "s300r.html": "اندفاع ثنائي الأشواط. سيطر على الحلبة.",
    "sj250.html": "خفة ثنائية الأشواط. فوز بالرشاقة.",
    "sj300.html": "ثنائي الأشواط للسباق. حماس كامل.",
    "sn300.html": "تحمل رباعي الأشواط. للمسافات الطويلة.",
    "sy300.html": "قوة رباعية الأشواط. اعبر بلا خوف.",
  }),
  es: Object.freeze({
    "babey.html": "Empieza con alegría. Conduce con libertad.",
    "babey-plus.html": "Más potencia. Más diversión al crecer.",
    "bumblebee.html": "Espíritu ágil. Aventura sin límites.",
    "er3.html": "Impulso eléctrico ágil. Ligereza todoterreno.",
    "er5.html": "Impulso eléctrico potente. Domina el camino.",
    "er7.html": "Energía todoterreno. Supera cada reto.",
    "es11.html": "Impulso eléctrico insignia. Llega más lejos.",
    "et.html": "Pionera eléctrica. Domina el camino en silencio.",
    "et-2022.html": "Todoterreno eléctrico ligero. Agilidad total.",
    "et-2024.html": "Impulso eléctrico renovado. Velocidad sin límites.",
    "et3.html": "Tu inicio eléctrico. Libertad todoterreno.",
    "et5.html": "Impulso eléctrico avanzado. Avanza con confianza.",
    "et7.html": "Impulso eléctrico potente. Ruta sin límites.",
    "et9.html": "Máximo impulso eléctrico. Domina lo extremo.",
    "f4.html": "Rendimiento audaz. Rompe las reglas.",
    "f4-plus.html": "Evolución ligera. Potencia total.",
    "f9.html": "Impulso eléctrico ligero. Fluye por la naturaleza.",
    "f29.html": "Alta potencia eléctrica. Supera los límites.",
    "f29r.html": "Impulso eléctrico de competición. Libera tu carácter.",
    "h300.html": "Potencia de cuatro tiempos. Firme en cada camino.",
    "hs85.html": "Competición ligera. Espíritu joven.",
    "s300.html": "Cuatro tiempos estable. Recorre cada camino.",
    "s300r.html": "Explosión de dos tiempos. Domina la pista.",
    "sj250.html": "Dos tiempos ligero. Vence con agilidad.",
    "sj300.html": "Dos tiempos de competición. Pasión total.",
    "sn300.html": "Cuatro tiempos duradero. Conquista la distancia.",
    "sy300.html": "Cuatro tiempos resistente. Cruza sin miedo.",
  }),
  pt: Object.freeze({
    "babey.html": "Comece com alegria. Pilote com liberdade.",
    "babey-plus.html": "Mais potência. Mais diversão ao crescer.",
    "bumblebee.html": "Espírito ágil. Aventura sem limites.",
    "er3.html": "Propulsão elétrica ágil. Leveza fora de estrada.",
    "er5.html": "Propulsão elétrica forte. Domine as trilhas.",
    "er7.html": "Energia fora de estrada. Supere cada desafio.",
    "es11.html": "Propulsão elétrica de ponta. Vá além.",
    "et.html": "Pioneira elétrica. Domine a trilha em silêncio.",
    "et-2022.html": "Off-road elétrico leve. Agilidade no caminho.",
    "et-2024.html": "Propulsão elétrica renovada. Velocidade sem limites.",
    "et3.html": "Seu início elétrico. Liberdade fora de estrada.",
    "et5.html": "Propulsão elétrica avançada. Avance com confiança.",
    "et7.html": "Propulsão elétrica forte. Jornada sem limites.",
    "et9.html": "Propulsão elétrica máxima. Domine o extremo.",
    "f4.html": "Desempenho ousado. Quebre as regras.",
    "f4-plus.html": "Evolução leve. Potência total.",
    "f9.html": "Propulsão elétrica leve. Flua pela natureza.",
    "f29.html": "Alta potência elétrica. Supere os limites.",
    "f29r.html": "Propulsão elétrica de competição. Revele sua força.",
    "h300.html": "Potência de quatro tempos. Firme em cada trilha.",
    "hs85.html": "Competição leve. Espírito jovem.",
    "s300.html": "Quatro tempos estável. Domine cada trilha.",
    "s300r.html": "Explosão de dois tempos. Domine a pista.",
    "sj250.html": "Dois tempos leve. Vença com agilidade.",
    "sj300.html": "Dois tempos de competição. Paixão total.",
    "sn300.html": "Quatro tempos durável. Conquiste a distância.",
    "sy300.html": "Quatro tempos resistente. Atravesse sem medo.",
  }),
});

const productWorldPreviewFiles = productWorldGroups.flatMap((group) => group.models.map(([, fileName]) => fileName));
const invalidProductWorldPreviewSlogans = Object.keys(productWorldPreviewSlogans).flatMap((language) =>
  productWorldPreviewFiles
    .filter((fileName) => !productWorldPreviewSlogans[language][fileName])
    .map((fileName) => `${language}:${fileName}`)
);
if (invalidProductWorldPreviewSlogans.length) {
  throw new Error(`Missing product-world preview slogans: ${invalidProductWorldPreviewSlogans.join(", ")}`);
}

const productWorldLabels = {
  en: { world: "Product World", fuel: "Fuel", electric: "Electric", series: "Series", previewSeries: "Series", preview: "preview", offRoadMotorcycle: "off-road motorcycle" },
  "zh-CN": { world: "\u4ea7\u54c1\u4e16\u754c", fuel: "\u71c3\u6cb9", electric: "\u7535\u52a8", series: "\u7cfb\u5217", previewSeries: "\u7cfb\u5217", preview: "\u9884\u89c8", offRoadMotorcycle: "\u8d8a\u91ce\u6469\u6258\u8f66" },
  "zh-TW": { world: "\u7522\u54c1\u4e16\u754c", fuel: "\u71c3\u6cb9", electric: "\u96fb\u52d5", series: "\u7cfb\u5217", previewSeries: "\u7cfb\u5217", preview: "\u9810\u89bd", offRoadMotorcycle: "\u8d8a\u91ce\u6469\u6258\u8eca" },
  ru: { world: "\u041c\u0438\u0440 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432", fuel: "\u0411\u0435\u043d\u0437\u0438\u043d\u043e\u0432\u044b\u0435", electric: "\u042d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0435", series: "\u0421\u0435\u0440\u0438\u0438", previewSeries: "\u0421\u0435\u0440\u0438\u044f", preview: "\u043f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440", offRoadMotorcycle: "\u0432\u043d\u0435\u0434\u043e\u0440\u043e\u0436\u043d\u044b\u0439 \u043c\u043e\u0442\u043e\u0446\u0438\u043a\u043b" },
  ar: { world: "\u0639\u0627\u0644\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a", fuel: "\u0628\u0646\u0632\u064a\u0646", electric: "\u0643\u0647\u0631\u0628\u0627\u0626\u064a", series: "\u0627\u0644\u0633\u0644\u0633\u0644\u0629", previewSeries: "\u0633\u0644\u0633\u0644\u0629", preview: "\u0645\u0639\u0627\u064a\u0646\u0629", offRoadMotorcycle: "\u062f\u0631\u0627\u062c\u0629 \u0646\u0627\u0631\u064a\u0629 \u0644\u0644\u0637\u0631\u0642 \u0627\u0644\u0648\u0639\u0631\u0629" },
  es: { world: "Mundo de productos", fuel: "Gasolina", electric: "El\u00e9ctrico", series: "Series", previewSeries: "Serie", preview: "vista previa", offRoadMotorcycle: "motocicleta todoterreno" },
  pt: { world: "Mundo dos produtos", fuel: "Gasolina", electric: "El\u00e9trico", series: "S\u00e9ries", previewSeries: "S\u00e9rie", preview: "pr\u00e9via", offRoadMotorcycle: "motocicleta off-road" }
};

function productWorldLanguage() {
  const language = i18n ? i18n.getLang() : new URLSearchParams(window.location.search).get("lang");
  return productWorldLabels[language] ? language : "en";
}

function productWorldLabel(key) {
  return productWorldLabels[productWorldLanguage()][key] || productWorldLabels.en[key];
}

function productWorldSeriesTitle(series) {
  const language = productWorldLanguage();
  const label = productWorldLabel("previewSeries");
  return ["ru", "ar", "es", "pt"].includes(language) ? `${label} ${series}` : `${series} ${label}`;
}

function productWorldPreviewSlogan(fileName) {
  const language = productWorldLanguage();
  return productWorldPreviewSlogans[language][fileName] || productWorldPreviewSlogans.en[fileName] || "";
}

function productWorldRelativeHref(fileName) {
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const isNewsDetail = /\/news\//.test(currentPath);
  return isNewsDetail ? `../${fileName}` : fileName;
}

function productWorldModelHref(fileName) {
  const relativePath = productWorldRelativeHref(fileName);
  const lang = i18n ? i18n.getLang() : (new URLSearchParams(window.location.search).get("lang") || "en");
  return `${relativePath}?lang=${encodeURIComponent(lang || "en")}`;
}

function productWorldPreviewHref(source) {
  return productWorldRelativeHref(source);
}

function productWorldPreviewCard(fileName) {
  return {
    image: productWorldPreviewAssets[fileName] || "",
  };
}

function productWorldModels(power) {
  return productWorldGroups.flatMap((group) => group.power === power
    ? group.models.map(([name, fileName, preview]) => ({ name, fileName, preview, series: group.name, power }))
    : []);
}

function hideProductWorldPreview(menu) {
  const preview = menu.querySelector("[data-product-world-preview]");
  if (!preview) return;
  preview.hidden = true;
  preview.classList.remove("is-visible", "has-card");
  preview.removeAttribute("data-product-world-preview-file");
  preview.style.removeProperty("--product-model-accent");
  preview.style.removeProperty("--product-model-bright");
  preview.style.removeProperty("--product-model-rgb");
  const image = preview.querySelector("img");
  if (image) image.removeAttribute("src");
}

function showProductWorldPreview(menu, link) {
  if (!window.matchMedia("(min-width: 901px)").matches) return;
  const preview = menu.querySelector("[data-product-world-preview]");
  const image = preview?.querySelector("img");
  if (!preview || !image) return;
  if (!link.dataset.productWorldPreviewSrc) {
    hideProductWorldPreview(menu);
    return;
  }
  image.src = productWorldPreviewHref(link.dataset.productWorldPreviewSrc);
  image.alt = `${link.dataset.productWorldModel} ${productWorldLabel("preview")}`;
  preview.dataset.productWorldPreviewFile = link.dataset.productWorldFile;
  const theme = productWorldModelTheme(link.dataset.productWorldFile);
  preview.style.setProperty("--product-model-accent", theme.accent);
  preview.style.setProperty("--product-model-bright", theme.bright);
  preview.style.setProperty("--product-model-rgb", theme.rgb);
  const modelName = link.dataset.productWorldModel;
  const modelTitle = preview.querySelector("[data-product-world-preview-model]");
  modelTitle.textContent = modelName;
  modelTitle.dataset.model = modelName;
  preview.querySelector("[data-product-world-preview-series]").textContent = productWorldSeriesTitle(link.dataset.productWorldSeries);
  preview.querySelector("[data-product-world-preview-slogan]").textContent = productWorldPreviewSlogan(link.dataset.productWorldFile);
  preview.classList.add("has-card");
  preview.hidden = false;
  preview.classList.add("is-visible");
}

function closeProductWorldMenus(exceptMenu = null) {
  document.querySelectorAll("[data-product-world-menu]").forEach((menu) => {
    if (menu === exceptMenu) return;
    menu.hidden = true;
    menu.classList.remove("is-open");
    hideProductWorldPreview(menu);
    const trigger = document.getElementById(menu.getAttribute("aria-labelledby"));
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
}

function setProductWorldPower(menu, power) {
  menu.querySelectorAll("[data-product-world-power]").forEach((button) => {
    const isActive = button.dataset.productWorldPower === power;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  menu.querySelectorAll("[data-product-world-family]").forEach((family) => {
    family.hidden = family.dataset.productWorldFamily !== power;
  });
  hideProductWorldPreview(menu);
}

function refreshProductWorldLinks() {
  document.querySelectorAll("[data-product-world-menu] a[data-product-world-file]").forEach((link) => {
    link.href = productWorldModelHref(link.dataset.productWorldFile);
  });
  document.querySelectorAll("[data-product-world-default]").forEach((link) => {
    link.href = productWorldModelHref(link.dataset.productWorldDefault);
  });
}

function refreshProductWorldLabels() {
  document.querySelectorAll("[data-product-world-label]").forEach((node) => {
    node.textContent = productWorldLabel(node.dataset.productWorldLabel);
  });
  document.querySelectorAll("[data-product-world-preview-series]").forEach((node) => {
    const preview = node.closest("[data-product-world-preview]");
    const menu = preview?.closest("[data-product-world-menu]");
    const activeFile = preview?.dataset.productWorldPreviewFile;
    const activeLink = Array.from(menu?.querySelectorAll("[data-product-world-file]") || [])
      .find((link) => link.dataset.productWorldFile === activeFile);
    if (!activeLink) return;
    node.textContent = productWorldSeriesTitle(activeLink.dataset.productWorldSeries);
    const image = preview.querySelector("img");
    if (image) image.alt = `${activeLink.dataset.productWorldModel} ${productWorldLabel("preview")}`;
    const slogan = preview.querySelector("[data-product-world-preview-slogan]");
    if (slogan) slogan.textContent = productWorldPreviewSlogan(activeFile);
  });
}

function productWorldGroupMarkup(group) {
  const models = group.models.map(([model, fileName]) => {
    const card = productWorldPreviewCard(fileName);
    const theme = productWorldModelTheme(fileName);
    return `<a href="${productWorldModelHref(fileName)}" style="--product-model-accent:${theme.accent};--product-model-bright:${theme.bright};--product-model-rgb:${theme.rgb}" data-product-world-file="${fileName}" data-product-world-model="${model}" data-product-world-series="${group.name}" data-product-world-preview-src="${card.image}">${model}<span aria-hidden="true">&#8599;</span></a>`;
  }).join("");
  return `<section class="product-world-menu__group" data-product-world-group="${group.name}"><span class="product-world-menu__group-status" aria-hidden="true"></span><h3><span class="product-world-menu__group-name">${group.name}</span><span class="product-world-menu__group-series" data-product-world-label="series">${productWorldLabel("series")}</span></h3><div>${models}</div></section>`;
}

function renderProductWorldCategoryPages() {
  document.querySelectorAll("[data-product-world-category-grid]").forEach((grid) => {
    const power = grid.dataset.productWorldCategoryGrid;
    const models = productWorldModels(power);
    grid.innerHTML = models.map((model) => `
      <a class="category-product-card" href="${productWorldModelHref(model.fileName)}">
        <img src="${productWorldPreviewHref(model.preview)}" alt="${model.name}" loading="lazy">
        <div><span>${model.series} ${productWorldLabel("series")}</span><h2>${model.name}</h2><p>${productWorldLabel(power)} ${productWorldLabel("offRoadMotorcycle")}</p></div>
      </a>
    `).join("");
  });
}

function createProductWorldMenu(productLink, index) {
  const navElement = productLink.closest("[data-nav]");
  if (!navElement || navElement.querySelector("[data-product-world-menu]")) return;

  const trigger = document.createElement("a");
  const menu = document.createElement("section");
  const triggerId = `product-world-trigger-${index + 1}`;
  const menuId = `product-world-menu-${index + 1}`;

  trigger.id = triggerId;
  trigger.className = `product-world-trigger${productLink.classList.contains("is-active") ? " is-active" : ""}`;
  trigger.dataset.productWorldDefault = "sy300.html";
  trigger.href = productWorldModelHref("sy300.html");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", menuId);
  trigger.setAttribute("aria-haspopup", "true");
  trigger.innerHTML = `<span data-i18n="navProducts">${productLink.textContent.trim()}</span><span class="product-world-trigger-icon" aria-hidden="true">+</span>`;

  menu.id = menuId;
  menu.className = "product-world-menu";
  menu.hidden = true;
  menu.setAttribute("data-product-world-menu", "");
  menu.setAttribute("aria-labelledby", triggerId);
  menu.innerHTML = `<div class="product-world-menu__header"><span class="product-world-menu__eyebrow">Apex Moto Supply</span><strong data-product-world-label="world">Product World</strong></div><div class="product-world-menu__categories" role="group" aria-label="Product power type"><button type="button" class="is-active" data-product-world-power="fuel" aria-pressed="true"><span data-product-world-label="fuel">Fuel</span></button><button type="button" data-product-world-power="electric" aria-pressed="false"><span data-product-world-label="electric">Electric</span></button></div><div class="product-world-menu__body"><div class="product-world-menu__groups">${["fuel", "electric"].map((power) => `<section class="product-world-menu__family" data-product-world-family="${power}"${power === "electric" ? " hidden" : ""}><h2 data-product-world-label="${power}">${productWorldLabel(power)}</h2><div class="product-world-menu__grid">${productWorldGroups.filter((group) => group.power === power).map(productWorldGroupMarkup).join("")}</div></section>`).join("")}</div><aside class="product-world-preview" data-product-world-preview hidden><img alt=""><div class="product-world-preview__copy"><span data-product-world-preview-series></span><strong data-product-world-preview-model></strong><p data-product-world-preview-slogan></p></div></aside></div>`;

  productLink.replaceWith(trigger);
  trigger.insertAdjacentElement("afterend", menu);

  const close = ({ focus = false } = {}) => {
    menu.hidden = true;
    menu.classList.remove("is-open");
    hideProductWorldPreview(menu);
    trigger.setAttribute("aria-expanded", "false");
    if (focus) trigger.focus();
  };

  const open = () => {
    closeProductWorldMenus(menu);
    const header = trigger.closest("header");
    if (header) menu.style.setProperty("--product-world-top", `${Math.ceil(header.getBoundingClientRect().bottom)}px`);
    menu.hidden = false;
    menu.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const desktopProductWorld = window.matchMedia("(min-width: 901px)");
  const mobileNav = trigger.closest("[data-nav], .concept-nav");
  if (mobileNav) mobileNav.style.overflowAnchor = "none";

  const revealMobileProductWorldTop = () => {
    if (!mobileNav) return;
    window.requestAnimationFrame(() => {
      mobileNav.scrollTop = Math.max(0, trigger.offsetTop - 10);
    });
  };

  trigger.addEventListener("pointerenter", () => {
    if (desktopProductWorld.matches) open();
  });

  trigger.addEventListener("click", (event) => {
    if (desktopProductWorld.matches) return;
    event.preventDefault();
    if (menu.hidden) {
      open();
      revealMobileProductWorldTop();
    } else {
      close();
    }
  });

  desktopProductWorld.addEventListener("change", () => close());

  trigger.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    open();
    menu.querySelector("[data-product-world-power]")?.focus();
  });

  menu.addEventListener("click", (event) => {
    const powerButton = event.target.closest("[data-product-world-power]");
    if (powerButton) {
      setProductWorldPower(menu, powerButton.dataset.productWorldPower);
      return;
    }
    if (event.target.closest("a")) close();
  });

  const previewFromPointer = (event) => {
    const link = event.target.closest("[data-product-world-file]");
    if (link && menu.contains(link)) {
      showProductWorldPreview(menu, link);
      return;
    }
    hideProductWorldPreview(menu);
  };

  menu.addEventListener("pointerover", previewFromPointer);
  menu.addEventListener("mousemove", previewFromPointer);

  menu.addEventListener("focusin", (event) => {
    const link = event.target.closest("[data-product-world-file]");
    if (link) showProductWorldPreview(menu, link);
  });

  menu.addEventListener("pointerleave", () => hideProductWorldPreview(menu));
  menu.addEventListener("focusout", (event) => {
    if (!menu.contains(event.relatedTarget)) hideProductWorldPreview(menu);
  });

  document.addEventListener("pointerdown", (event) => {
    const isMobileNavGesture = !desktopProductWorld.matches && mobileNav?.contains(event.target);
    if (!menu.hidden && !menu.contains(event.target) && !trigger.contains(event.target) && !isMobileNavGesture) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      event.preventDefault();
      close({ focus: true });
    }
  });
}

function enhanceProductWorldNavigation() {
  document.querySelectorAll('a[data-i18n="navProducts"]').forEach(createProductWorldMenu);
  refreshProductWorldLinks();
  refreshProductWorldLabels();
  renderProductWorldCategoryPages();
}

if (year) year.textContent = new Date().getFullYear();

function syncCurrentLang() {
  currentLang = i18n ? i18n.getLang() : "en";
}

function syncContactInquiryLinks() {
  const lang = i18n ? i18n.getLang() : currentLang;
  const isNestedNewsPage = /(?:^|\/)news\/[^/]+\.html$/i.test(window.location.pathname);
  const href = `${isNestedNewsPage ? "../inquiry.html" : "inquiry.html"}?lang=${encodeURIComponent(lang || "en")}`;
  document.querySelectorAll('a[data-i18n="navContact"]').forEach((link) => {
    link.setAttribute("href", href);
  });
}

syncContactInquiryLinks();
enhanceProductWorldNavigation();

function text(key) {
  return i18n ? i18n.t(key) : ((data.i18n[currentLang] && data.i18n[currentLang][key]) || data.i18n.en[key] || key);
}

function isChineseLang() {
  return currentLang === "zh-CN" || currentLang === "zh-TW" || currentLang === "zh";
}

function localeCode() {
  return i18n ? i18n.locale() : "en-US";
}

function specLabel(label) {
  return isChineseLang() ? (data.specLabelsZh[label] || label) : label;
}

function productIntro(product) {
  if (currentLang === "zh-CN" || currentLang === "zh") return product.introZh || product.intro;
  if (currentLang === "zh-TW") return product.introZhTW || product.introZh || product.intro;
  if (currentLang === "ru") return product.introRu || product.intro;
  if (currentLang === "ar") return product.introAr || product.intro;
  if (currentLang === "es") return product.introEs || product.intro;
  if (currentLang === "pt") return product.introPt || product.intro;
  return product.intro;
}

function productSeries(product) {
  return isChineseLang() ? (product.seriesZh || product.series) : product.series;
}

function productDisplayModel(product) {
  return product.displayModel || product.model;
}

function productDetailHref(product) {
  const detailSlug = product.slug === "hs85cc" ? "hs85" : product.slug;
  return `${detailSlug}.html`;
}

function allProductsInDisplayOrder() {
  const pinnedSlugs = ["sy300", "f29r", "hs85cc"];
  const pinnedProducts = pinnedSlugs
    .map((slug) => data.products.find((product) => product.slug === slug))
    .filter(Boolean);
  const pinnedSet = new Set(pinnedSlugs);
  return pinnedProducts.concat(data.products.filter((product) => !pinnedSet.has(product.slug)));
}

function imageSrc(product) {
  return `${product.image}?v=${assetVersion}`;
}

function studioImageSrc(product) {
  return `../assets/img/products/3.4/${product.slug}.png?v=${assetVersion}`;
}

function categoryLabel(category) {
  if (isChineseLang()) return category.zh || category.en;
  return category[currentLang] || category.en;
}
function applyStaticText() {
  syncCurrentLang();
  if (i18n) i18n.applyAll();

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

}

function specRows(product) {
  return product.specs
    .map(([key, value]) => `<div><dt>${specLabel(key)}</dt><dd>${value}</dd></div>`)
    .join("");
}

function productCard(product) {
  const displayModel = productDisplayModel(product);
  return `
    <article class="product-card" data-category="${product.category}">
      <button class="product-image product-image-button" type="button" data-open-specs="${product.slug}" aria-label="${text("viewParameters")} ${displayModel}">
        <img src="${studioImageSrc(product)}" alt="${displayModel}" loading="lazy">
      </button>
      <div class="product-content">
        <p class="product-series">${productSeries(product)}</p>
        <h3 id="${product.slug}"><a class="product-detail-link" href="${productDetailHref(product)}" aria-label="${text("productDetails")} ${displayModel}">${displayModel}</a></h3>
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
    ? allProductsInDisplayOrder()
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
        <span>${productDisplayModel(product)}</span>
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
    const date = item.publishedAt ? new Date(item.publishedAt).toLocaleDateString(localeCode()) : "";
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
  const displayModel = productDisplayModel(product);
  modalBody.innerHTML = `
    <div class="modal-product">
      <div class="modal-product-image">
        <img src="${imageSrc(product)}" alt="${displayModel}">
      </div>
      <div>
        <p class="product-series">${productSeries(product)}</p>
        <h3>${displayModel}</h3>
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

function trackInquiryConversion(fields = {}, inquiryResult = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "generate_lead", {
    method: "website_inquiry_form",
    model: String(fields.model || "").trim() || "unspecified",
    email_status: inquiryResult.emailStatus || "unknown"
  });
}

async function createInquirySheet(fields = {}) {
  try {
    if (!window.JSZip) {
      throw new Error("JSZip is not loaded");
    }

    const isZh = isChineseLang();
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
    alert(isChineseLang()
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

window.addEventListener("apex:languagechange", () => {
  const activeButton = filters ? filters.querySelector(".is-active") : null;
  const active = activeButton ? activeButton.dataset.category : "all";
  syncCurrentLang();
  syncContactInquiryLinks();
  refreshProductWorldLinks();
  refreshProductWorldLabels();
  renderProductWorldCategoryPages();
  render(active);
  loadNews();
});
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
    closeProductWorldMenus();
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && !link.classList.contains("product-world-trigger")) {
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
      alert(isChineseLang() ? "\u8bf7\u586b\u5199\u59d3\u540d\u548c\u6709\u6548\u90ae\u7bb1\u3002" : "Please enter name and a valid email.");
      return;
    }
    const inquiryResult = await saveInquiry(fields);
    await createInquirySheet(fields);
    if (inquiryResult.ok) {
      trackInquiryConversion(fields, inquiryResult);
      const mailSent = inquiryResult.emailStatus === "sent";
      alert(isChineseLang()
        ? (mailSent ? "\u8be2\u76d8\u8868\u5355\u5df2\u63d0\u4ea4\u5e76\u4e0b\u8f7d\uff0c\u90ae\u4ef6\u5df2\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u7b49\u5f85\u56de\u590d\u3002" : "\u8be2\u76d8\u8868\u5355\u5df2\u63d0\u4ea4\u5e76\u4e0b\u8f7d\uff0c\u4f46\u90ae\u4ef6\u672a\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u68c0\u67e5\u540e\u53f0 SMTP \u914d\u7f6e\u3002")
        : `Inquiry submitted and the form was downloaded. ${mailSent ? "Email sent successfully." : "Check the admin page for email status."}`);
    } else {
      alert(isChineseLang()
        ? "\u8868\u5355\u5df2\u4e0b\u8f7d\uff0c\u4f46\u540e\u53f0\u4fdd\u5b58\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u6216\u76f4\u63a5\u8054\u7cfb\u90ae\u7bb1\u3002"
        : "The form was downloaded, but backend saving failed. Please try again later or contact us by email.");
    }
  });
}
