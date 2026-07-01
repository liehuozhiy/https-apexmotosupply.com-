const videoGrid = document.querySelector("[data-video-grid]");
const videoPagination = document.querySelector("[data-video-pagination]");
const videosPerPage = 8;
const videos = [
  {
    id: 1,
    src: "/assets/video/1.mp4#t=0.1",
    enTitle: "Dirt Bike Detail Walkaround",
    enDescription: "A close look at the front suspension, frame, engine, exhaust, and body details of the dirt bike.",
    zhCNTitle: "越野摩托细节展示",
    zhCNDescription: "展示越野摩托的前叉、车架、发动机、排气和车身结构细节，适合客户快速了解整车配置。",
    zhTWTitle: "越野摩托車細節展示",
    zhTWDescription: "展示越野摩托車的前叉、車架、引擎、排氣和車身結構細節，適合客戶快速了解整車配置。",
    ruTitle: "Детальный обзор внедорожного мотоцикла",
    ruDescription: "Крупный обзор передней подвески, рамы, двигателя, выхлопа и деталей корпуса мотоцикла.",
    arTitle: "عرض تفاصيل دراجة ديرت بايك",
    arDescription: "لقطة قريبة للتعليق الأمامي والإطار والمحرك والعادم وتفاصيل هيكل الدراجة."
  },
  {
    id: 2,
    src: "/assets/video/2.mp4#t=0.1",
    enTitle: "Factory Assembly and Inspection",
    enDescription: "A view of the assembly, inspection, and handling process inside the factory production area.",
    zhCNTitle: "工厂装配与检测流程",
    zhCNDescription: "展示车辆在工厂区域内的装配、检查和流转过程，帮助客户了解生产与质检环境。",
    zhTWTitle: "工廠裝配與檢測流程",
    zhTWDescription: "展示車輛在工廠區域內的裝配、檢查和流轉過程，幫助客戶了解生產與質檢環境。",
    ruTitle: "Сборка и проверка на заводе",
    ruDescription: "Процесс сборки, проверки и перемещения мотоциклов внутри производственной зоны.",
    arTitle: "التجميع والفحص داخل المصنع",
    arDescription: "عرض لعملية التجميع والفحص والمناولة داخل منطقة الإنتاج في المصنع."
  },
  {
    id: 3,
    src: "/assets/video/3.mp4#t=0.1",
    enTitle: "Showroom Model Display",
    enDescription: "Multiple dirt bike models displayed in the showroom, showing product variety and presentation quality.",
    zhCNTitle: "展厅车型陈列",
    zhCNDescription: "展示多款越野摩托在展厅中的整齐陈列，适合客户了解车型阵容和批量展示效果。",
    zhTWTitle: "展廳車型陳列",
    zhTWDescription: "展示多款越野摩托車在展廳中的整齊陳列，適合客戶了解車型陣容和批量展示效果。",
    ruTitle: "Экспозиция моделей в шоуруме",
    ruDescription: "Несколько моделей dirt bike представлены в шоуруме, демонстрируя ассортимент и качество презентации.",
    arTitle: "عرض الموديلات في صالة العرض",
    arDescription: "عدة موديلات ديرت بايك معروضة في صالة العرض لإظهار تنوع المنتجات وجودة العرض."
  },
  {
    id: 4,
    src: "/assets/video/4.mp4#t=0.1",
    enTitle: "Electric Dirt Bike Showcase",
    enDescription: "A closer view of the electric dirt bike design, body structure, and key exterior details.",
    zhCNTitle: "电动越野车展示",
    zhCNDescription: "展示电动越野车型的外观、车身结构和整车细节，适合了解电动车产品线。",
    zhTWTitle: "電動越野車展示",
    zhTWDescription: "展示電動越野車型的外觀、車身結構和整車細節，適合了解電動車產品線。",
    ruTitle: "Обзор электрического внедорожного мотоцикла",
    ruDescription: "Более близкий вид дизайна, конструкции корпуса и внешних деталей электрической модели.",
    arTitle: "عرض دراجة ديرت بايك كهربائية",
    arDescription: "نظرة أقرب على تصميم الدراجة الكهربائية وهيكلها وأهم التفاصيل الخارجية."
  },
  {
    id: 5,
    src: "/assets/video/5.mp4#t=0.1",
    enTitle: "White Dirt Bike Detail View",
    enDescription: "A detailed view of the white dirt bike, including handlebar, suspension, footrest, and powertrain areas.",
    zhCNTitle: "白色越野车型细节",
    zhCNDescription: "展示白色越野摩托的整车外观、车把、减震、脚踏和动力部分细节。",
    zhTWTitle: "白色越野車型細節",
    zhTWDescription: "展示白色越野摩托車的整車外觀、車把、減震、腳踏和動力部分細節。",
    ruTitle: "Детали белого внедорожного мотоцикла",
    ruDescription: "Обзор белой модели, включая руль, подвеску, подножки и силовой узел.",
    arTitle: "تفاصيل الدراجة البيضاء للطرق الوعرة",
    arDescription: "عرض لتفاصيل الدراجة البيضاء، بما في ذلك المقود والتعليق والدواسات ومنطقة نظام الحركة."
  },
  {
    id: 6,
    src: "/assets/video/6.mp4#t=0.1",
    enTitle: "Factory Showroom Introduction",
    enDescription: "A staff introduction inside the factory showroom, showing the product display area and vehicle lineup.",
    zhCNTitle: "工厂展厅讲解",
    zhCNDescription: "工作人员在工厂展厅中介绍车辆和产品展示区域，适合客户了解现场规模与产品摆放。",
    zhTWTitle: "工廠展廳講解",
    zhTWDescription: "工作人員在工廠展廳中介紹車輛和產品展示區域，適合客戶了解現場規模與產品擺放。",
    ruTitle: "Презентация заводского шоурума",
    ruDescription: "Сотрудник показывает зону демонстрации продукции и линейку мотоциклов в заводском шоуруме.",
    arTitle: "تعريف بصالة عرض المصنع",
    arDescription: "شرح من الموظفين داخل صالة عرض المصنع مع عرض منطقة المنتجات وتشكيلة الدراجات."
  },
  {
    id: 7,
    src: "/assets/video/7.mp4#t=0.1",
    enTitle: "Warehouse and Shipping Area",
    enDescription: "A look at the warehouse, storage area, and pallet preparation for bulk supply and shipping.",
    zhCNTitle: "仓储与发货区域展示",
    zhCNDescription: "展示仓库、围栏存放区和木托盘等发货准备场景，适合了解批量供货与仓储能力。",
    zhTWTitle: "倉儲與出貨區域展示",
    zhTWDescription: "展示倉庫、圍欄存放區和木托盤等出貨準備場景，適合了解批量供貨與倉儲能力。",
    ruTitle: "Склад и зона подготовки к отправке",
    ruDescription: "Складская зона, хранение и подготовка паллет для оптовых поставок и отправки.",
    arTitle: "منطقة التخزين والشحن",
    arDescription: "عرض للمستودع ومنطقة التخزين وتجهيز المنصات للطلبات بالجملة والشحن."
  },
  {
    id: 8,
    src: "/assets/video/8.mp4#t=0.1",
    enTitle: "Exhibition Bike Showcase",
    enDescription: "Dirt bike models displayed at an exhibition, showing product presentation and customer interaction.",
    zhCNTitle: "展会现场车型展示",
    zhCNDescription: "展示展会现场的越野车型、客户参观和产品演示氛围，适合体现品牌展示和市场推广。",
    zhTWTitle: "展會現場車型展示",
    zhTWDescription: "展示展會現場的越野車型、客戶參觀和產品演示氛圍，適合體現品牌展示和市場推廣。",
    ruTitle: "Показ моделей на выставке",
    ruDescription: "Модели dirt bike на выставке с демонстрацией продукции и взаимодействием с клиентами.",
    arTitle: "عرض الدراجات في المعرض",
    arDescription: "موديلات ديرت بايك معروضة في معرض لإظهار طريقة العرض وتفاعل العملاء."
  },
  {
    id: 9,
    src: "/assets/video/9.mp4#t=0.1",
    enTitle: "Blue Dirt Bike Assembly View",
    enDescription: "A close view of the blue dirt bike during assembly, including frame, wheels, power unit, and workshop handling.",
    zhCNTitle: "蓝色越野车装配展示",
    zhCNDescription: "展示蓝色越野摩托在装配区域的细节，包括车架、轮组、动力部分和工人操作。",
    zhTWTitle: "藍色越野車裝配展示",
    zhTWDescription: "展示藍色越野摩托車在裝配區域的細節，包括車架、輪組、動力部分和工人操作。",
    ruTitle: "Сборка синего внедорожного мотоцикла",
    ruDescription: "Крупный вид синей модели во время сборки: рама, колеса, силовой узел и работа в цехе.",
    arTitle: "عرض تجميع الدراجة الزرقاء",
    arDescription: "لقطة قريبة للدراجة الزرقاء أثناء التجميع، بما يشمل الإطار والعجلات ونظام الحركة والعمل داخل الورشة."
  },
  {
    id: 10,
    src: "/assets/video/10.mp4#t=0.1",
    enTitle: "Factory Bike and On-site Introduction",
    enDescription: "A factory floor view with bike display and on-site explanation, helping customers understand the production environment.",
    zhCNTitle: "工厂车辆与现场讲解",
    zhCNDescription: "展示工厂内车辆陈列、现场人员讲解和车型外观，适合客户了解真实工厂环境。",
    zhTWTitle: "工廠車輛與現場講解",
    zhTWDescription: "展示工廠內車輛陳列、現場人員講解和車型外觀，適合客戶了解真實工廠環境。",
    ruTitle: "Мотоциклы на заводе и объяснение на месте",
    ruDescription: "Вид производственной зоны с демонстрацией мотоциклов и объяснением условий на площадке.",
    arTitle: "دراجات المصنع والشرح الميداني",
    arDescription: "عرض لأرضية المصنع مع الدراجات والشرح في الموقع لمساعدة العملاء على فهم بيئة الإنتاج."
  },
  {
    id: 11,
    src: "/assets/video/11.mp4#t=0.1",
    enTitle: "Showroom Display and Factory Handling",
    enDescription: "Multiple dirt bikes displayed in the showroom and factory area, showing vehicle presentation and handling before delivery.",
    zhCNTitle: "展厅车辆陈列与出入库展示",
    zhCNDescription: "展示多台越野摩托在展厅和工厂门口的陈列、移动与出入库场景，适合客户了解现车展示和工厂环境。",
    zhTWTitle: "展廳車輛陳列與出入庫展示",
    zhTWDescription: "展示多台越野摩托車在展廳和工廠門口的陳列、移動與出入庫場景，適合客戶了解現車展示和工廠環境。",
    ruTitle: "Экспозиция шоурума и перемещение на заводе",
    ruDescription: "Несколько мотоциклов в шоуруме и заводской зоне, показывающие презентацию и перемещение перед поставкой.",
    arTitle: "عرض الصالة ومناولة المصنع",
    arDescription: "عدة دراجات معروضة في الصالة ومنطقة المصنع لإظهار العرض والمناولة قبل التسليم."
  },
  {
    id: 12,
    src: "/assets/video/12.mp4#t=0.1",
    enTitle: "Assembly Line Production Area",
    enDescription: "A view of the assembly line, workstation layout, and production environment for dirt bike manufacturing.",
    zhCNTitle: "生产线装配区域展示",
    zhCNDescription: "展示工厂装配线、工位布局和车辆部件装配环境，帮助客户了解生产流程和现场管理。",
    zhTWTitle: "生產線裝配區域展示",
    zhTWDescription: "展示工廠裝配線、工位布局和車輛部件裝配環境，幫助客戶了解生產流程和現場管理。",
    ruTitle: "Производственная зона сборочной линии",
    ruDescription: "Сборочная линия, расположение рабочих мест и производственная среда для изготовления dirt bike.",
    arTitle: "منطقة الإنتاج وخط التجميع",
    arDescription: "عرض لخط التجميع وتخطيط محطات العمل وبيئة إنتاج دراجات الديرت بايك."
  },
  {
    id: 13,
    src: "/assets/video/13.mp4#t=0.1",
    enTitle: "Bulk Bike Inspection and Detail View",
    enDescription: "Multiple dirt bikes shown together with staff inspection and close-up details, highlighting bulk supply and pre-delivery checking.",
    zhCNTitle: "批量车辆检查与细节展示",
    zhCNDescription: "展示多台越野摩托集中摆放、工作人员检查车辆以及车身细节，适合体现批量供货和出厂检查能力。",
    zhTWTitle: "批量車輛檢查與細節展示",
    zhTWDescription: "展示多台越野摩托車集中擺放、工作人員檢查車輛以及車身細節，適合體現批量供貨和出廠檢查能力。",
    ruTitle: "Проверка партии мотоциклов и детали",
    ruDescription: "Несколько мотоциклов вместе, проверка сотрудниками и крупные детали перед отправкой.",
    arTitle: "فحص دفعة الدراجات وتفاصيلها",
    arDescription: "عدة دراجات مع فحص من الموظفين ولقطات قريبة للتفاصيل قبل التسليم."
  },
  {
    id: 14,
    src: "/assets/video/14.mp4#t=0.1",
    enTitle: "Red Electric Dirt Bike Display",
    enDescription: "Red electric dirt bike models displayed in the showroom, showing product lineup and exterior details.",
    zhCNTitle: "红色电动越野车陈列",
    zhCNDescription: "展示多台红色电动越野车型在展厅中的排列和外观细节，适合客户了解电动车产品阵容。",
    zhTWTitle: "紅色電動越野車陳列",
    zhTWDescription: "展示多台紅色電動越野車型在展廳中的排列和外觀細節，適合客戶了解電動車產品陣容。",
    ruTitle: "Экспозиция красных электрических моделей",
    ruDescription: "Красные электрические внедорожные модели в шоуруме, показывающие линейку и внешние детали.",
    arTitle: "عرض الدراجات الكهربائية الحمراء",
    arDescription: "موديلات كهربائية حمراء معروضة في صالة العرض لإظهار التشكيلة والتفاصيل الخارجية."
  }
];

function videoLang() {
  return window.APEX_I18N ? window.APEX_I18N.getLang() : "en";
}

function videoText(video, field) {
  const lang = videoLang();
  const prefix = lang === "zh-CN" ? "zhCN" : lang === "zh-TW" ? "zhTW" : lang;
  return video[`${prefix}${field}`] || video[`en${field}`];
}

function pageFromUrl() {
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const requested = Number(new URLSearchParams(window.location.search).get("page") || "1");
  if (!Number.isFinite(requested) || requested < 1) return 1;
  if (requested > totalPages) return totalPages;
  return Math.floor(requested);
}

function pageHref(page) {
  const lang = videoLang();
  const params = new URLSearchParams(window.location.search);
  params.set("page", String(page));
  if (lang && lang !== "en") params.set("lang", lang);
  if (lang === "en") params.set("lang", "en");
  return `/videos.html?${params.toString()}`;
}

function videoCard(video) {
  return `
    <article class="video-card">
      <div class="video-frame">
        <video controls preload="metadata">
          <source src="${video.src}" type="video/mp4">
        </video>
      </div>
      <h2>${videoText(video, "Title")}</h2>
      <p>${videoText(video, "Description")}</p>
    </article>
  `;
}

function renderVideoPagination(currentPage) {
  if (!videoPagination) return;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const previousLabel = window.APEX_I18N ? window.APEX_I18N.t("previous") : "Previous";
  const nextLabel = window.APEX_I18N ? window.APEX_I18N.t("next") : "Next";
  const pageLinks = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<a class="pagination-link${page === currentPage ? " is-active" : ""}" href="${pageHref(page)}">${page}</a>`;
  }).join("");

  videoPagination.innerHTML = `
    <a class="pagination-link" href="${pageHref(previousPage)}">${previousLabel}</a>
    ${pageLinks}
    <a class="pagination-link" href="${pageHref(nextPage)}">${nextLabel}</a>
  `;
}

function renderVideos() {
  if (!videoGrid) return;
  const currentPage = pageFromUrl();
  const start = (currentPage - 1) * videosPerPage;
  const pageVideos = videos.slice(start, start + videosPerPage);
  videoGrid.innerHTML = pageVideos.map(videoCard).join("");
  renderVideoPagination(currentPage);
}

renderVideos();
window.addEventListener("apex:languagechange", renderVideos);
