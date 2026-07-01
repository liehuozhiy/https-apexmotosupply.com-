const videoGrid = document.querySelector("[data-video-grid]");
const videoPagination = document.querySelector("[data-video-pagination]");
const videosLangButton = document.querySelector("[data-lang-toggle]");
const videosPerPage = 8;
const videos = [
  {
    id: 1,
    src: "/assets/video/1.mp4#t=0.1",
    zhTitle: "越野摩托细节展示",
    zhDescription: "展示越野摩托的前叉、车架、发动机、排气和车身结构细节，适合客户快速了解整车配置。",
    enTitle: "Dirt Bike Detail Walkaround",
    enDescription: "A close look at the front suspension, frame, engine, exhaust, and body details of the dirt bike."
  },
  {
    id: 2,
    src: "/assets/video/2.mp4#t=0.1",
    zhTitle: "工厂装配与检测流程",
    zhDescription: "展示车辆在工厂区域内的装配、检查和流转过程，帮助客户了解生产与质检环境。",
    enTitle: "Factory Assembly and Inspection",
    enDescription: "A view of the assembly, inspection, and handling process inside the factory production area."
  },
  {
    id: 3,
    src: "/assets/video/3.mp4#t=0.1",
    zhTitle: "展厅车型陈列",
    zhDescription: "展示多款越野摩托在展厅中的整齐陈列，适合客户了解车型阵容和批量展示效果。",
    enTitle: "Showroom Model Display",
    enDescription: "Multiple dirt bike models displayed in the showroom, showing product variety and presentation quality."
  },
  {
    id: 4,
    src: "/assets/video/4.mp4#t=0.1",
    zhTitle: "电动越野车展示",
    zhDescription: "展示电动越野车型的外观、车身结构和整车细节，适合了解电动车产品线。",
    enTitle: "Electric Dirt Bike Showcase",
    enDescription: "A closer view of the electric dirt bike design, body structure, and key exterior details."
  },
  {
    id: 5,
    src: "/assets/video/5.mp4#t=0.1",
    zhTitle: "白色越野车型细节",
    zhDescription: "展示白色越野摩托的整车外观、车把、减震、脚踏和动力部分细节。",
    enTitle: "White Dirt Bike Detail View",
    enDescription: "A detailed view of the white dirt bike, including handlebar, suspension, footrest, and powertrain areas."
  },
  {
    id: 6,
    src: "/assets/video/6.mp4#t=0.1",
    zhTitle: "工厂展厅讲解",
    zhDescription: "工作人员在工厂展厅中介绍车辆和产品展示区域，适合客户了解现场规模与产品摆放。",
    enTitle: "Factory Showroom Introduction",
    enDescription: "A staff introduction inside the factory showroom, showing the product display area and vehicle lineup."
  },
  {
    id: 7,
    src: "/assets/video/7.mp4#t=0.1",
    zhTitle: "仓储与发货区域展示",
    zhDescription: "展示仓库、围栏存放区和木托盘等发货准备场景，适合了解批量供货与仓储能力。",
    enTitle: "Warehouse and Shipping Area",
    enDescription: "A look at the warehouse, storage area, and pallet preparation for bulk supply and shipping."
  },
  {
    id: 8,
    src: "/assets/video/8.mp4#t=0.1",
    zhTitle: "展会现场车型展示",
    zhDescription: "展示展会现场的越野车型、客户参观和产品演示氛围，适合体现品牌展示和市场推广。",
    enTitle: "Exhibition Bike Showcase",
    enDescription: "Dirt bike models displayed at an exhibition, showing product presentation and customer interaction."
  },
  {
    id: 9,
    src: "/assets/video/9.mp4#t=0.1",
    zhTitle: "蓝色越野车装配展示",
    zhDescription: "展示蓝色越野摩托在装配区域的细节，包括车架、轮组、动力部分和工人操作。",
    enTitle: "Blue Dirt Bike Assembly View",
    enDescription: "A close view of the blue dirt bike during assembly, including frame, wheels, power unit, and workshop handling."
  },
  {
    id: 10,
    src: "/assets/video/10.mp4#t=0.1",
    zhTitle: "工厂车辆与现场讲解",
    zhDescription: "展示工厂内车辆陈列、现场人员讲解和车型外观，适合客户了解真实工厂环境。",
    enTitle: "Factory Bike and On-site Introduction",
    enDescription: "A factory floor view with bike display and on-site explanation, helping customers understand the production environment."
  },
  {
    id: 11,
    src: "/assets/video/11.mp4#t=0.1",
    zhTitle: "展厅车辆陈列与出入库展示",
    zhDescription: "展示多台越野摩托在展厅和工厂门口的陈列、移动与出入库场景，适合客户了解现车展示和工厂环境。",
    enTitle: "Showroom Display and Factory Handling",
    enDescription: "Multiple dirt bikes displayed in the showroom and factory area, showing vehicle presentation and handling before delivery."
  },
  {
    id: 12,
    src: "/assets/video/12.mp4#t=0.1",
    zhTitle: "生产线装配区域展示",
    zhDescription: "展示工厂装配线、工位布局和车辆部件装配环境，帮助客户了解生产流程和现场管理。",
    enTitle: "Assembly Line Production Area",
    enDescription: "A view of the assembly line, workstation layout, and production environment for dirt bike manufacturing."
  },
  {
    id: 13,
    src: "/assets/video/13.mp4#t=0.1",
    zhTitle: "批量车辆检查与细节展示",
    zhDescription: "展示多台越野摩托集中摆放、工作人员检查车辆以及车身细节，适合体现批量供货和出厂检查能力。",
    enTitle: "Bulk Bike Inspection and Detail View",
    enDescription: "Multiple dirt bikes shown together with staff inspection and close-up details, highlighting bulk supply and pre-delivery checking."
  },
  {
    id: 14,
    src: "/assets/video/14.mp4#t=0.1",
    zhTitle: "红色电动越野车陈列",
    zhDescription: "展示多台红色电动越野车型在展厅中的排列和外观细节，适合客户了解电动车产品阵容。",
    enTitle: "Red Electric Dirt Bike Display",
    enDescription: "Red electric dirt bike models displayed in the showroom, showing product lineup and exterior details."
  }
];

function videoLang() {
  try {
    const savedLang = localStorage.getItem("apex-lang");
    if (savedLang === "zh" || savedLang === "en") return savedLang;
  } catch (error) {
    return document.documentElement.lang === "zh-CN" ? "zh" : "en";
  }
  return document.documentElement.lang === "zh-CN" ? "zh" : "en";
}

function pageFromUrl() {
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const requested = Number(new URLSearchParams(window.location.search).get("page") || "1");
  if (!Number.isFinite(requested) || requested < 1) return 1;
  if (requested > totalPages) return totalPages;
  return Math.floor(requested);
}

function videoCard(video, lang) {
  const title = lang === "zh" ? video.zhTitle : video.enTitle;
  const description = lang === "zh" ? video.zhDescription : video.enDescription;
  return `
    <article class="video-card">
      <div class="video-frame">
        <video controls preload="metadata">
          <source src="${video.src}" type="video/mp4">
        </video>
      </div>
      <h2>${title}</h2>
      <p>${description}</p>
    </article>
  `;
}

function renderVideoPagination(currentPage, lang) {
  if (!videoPagination) return;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const previousLabel = lang === "zh" ? "上一页" : "Previous";
  const nextLabel = lang === "zh" ? "下一页" : "Next";
  const pageLinks = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<a class="pagination-link${page === currentPage ? " is-active" : ""}" href="/videos.html?page=${page}">${page}</a>`;
  }).join("");

  videoPagination.innerHTML = `
    <a class="pagination-link" href="/videos.html?page=${previousPage}">${previousLabel}</a>
    ${pageLinks}
    <a class="pagination-link" href="/videos.html?page=${nextPage}">${nextLabel}</a>
  `;
}

function renderVideos() {
  if (!videoGrid) return;
  const lang = videoLang();
  const currentPage = pageFromUrl();
  const start = (currentPage - 1) * videosPerPage;
  const pageVideos = videos.slice(start, start + videosPerPage);
  videoGrid.innerHTML = pageVideos.map((video) => videoCard(video, lang)).join("");
  renderVideoPagination(currentPage, lang);
}

renderVideos();

if (videosLangButton) {
  videosLangButton.addEventListener("click", () => {
    window.setTimeout(renderVideos, 0);
  });
}
