async (page) => {
  try {
  const baseUrl = "http://127.0.0.1:2840/pages/f29.html";
  const evidenceDir =
    "C:/Users/Administrator/.codex/worktrees/f78d/apex-moto-static/frontend/assets/img/f29-detail/qa-review-2026-07-27";
  const languages = ["ar", "es", "pt"];
  const widths = [375, 1440, 1920, 2560];
  const matrix = [];
  const responseErrors = [];
  const consoleErrors = [];

  page.on("response", (response) => {
    if (response.status() >= 400) {
      responseErrors.push({
        status: response.status(),
        method: response.request().method(),
        url: response.url(),
      });
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  async function waitForImages() {
    await page.waitForFunction(
      () =>
        [...document.images].every(
          (image) =>
            !image.getAttribute("src") ||
            (image.complete && image.naturalWidth > 0),
        ),
      null,
      { timeout: 60000 },
    );
  }

  for (const language of languages) {
    for (const width of widths) {
      const responseStart = responseErrors.length;
      const consoleStart = consoleErrors.length;
      await page.setViewportSize({ width, height: 1100 });
      const response = await page.goto(
        `${baseUrl}?lang=${encodeURIComponent(language)}`,
        { waitUntil: "load" },
      );
      await waitForImages();
      await page.waitForTimeout(120);

      const metrics = await page.evaluate(() => {
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0
          );
        };
        const textOverflow = [
          ...document.querySelectorAll(
            "h1,h2,h3,p,dt,dd,a,button,b,small,.sy300-preview-feature-lines span,.sy300-preview-mini-specs span",
          ),
        ]
          .filter(visible)
          .filter(
            (element) => {
              if (
                element.clientWidth <= 0 ||
                element.scrollWidth <= element.clientWidth + 1
              ) {
                return false;
              }
              if (
                element.matches(".sy300-preview-primary-cta") &&
                getComputedStyle(element).direction === "rtl"
              ) {
                const container = element.getBoundingClientRect();
                const childrenInside = [...element.children].every((child) => {
                  const rect = child.getBoundingClientRect();
                  return (
                    rect.left >= container.left - 1 &&
                    rect.right <= container.right + 1 &&
                    rect.top >= container.top - 1 &&
                    rect.bottom <= container.bottom + 1
                  );
                });
                return !childrenInside;
              }
              return true;
            },
          )
          .map((element) => ({
            tag: element.tagName,
            className: element.className || "",
            text: element.textContent.trim().slice(0, 80),
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
          }));
        const horizontalEscape = [
          ...document.querySelectorAll(
            ".sy300-preview-gallery,.sy300-preview-spec-panel,#core-highlights article,.sy300-preview-primary-cta,[data-product-detail-tab]",
          ),
        ]
          .filter(visible)
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.left < -1 || rect.right > innerWidth + 1;
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName,
              className: element.className || "",
              left: Number(rect.left.toFixed(2)),
              right: Number(rect.right.toFixed(2)),
            };
          });
        const brokenImages = [...document.images]
          .filter((image) => image.getAttribute("src"))
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src);
        const highlightCards = [
          ...document.querySelectorAll("#core-highlights article"),
        ].map((card) => {
          const rect = card.getBoundingClientRect();
          return Number(rect.height.toFixed(2));
        });
        const mainImage = document.querySelector(
          ".sy300-preview-main-frame img",
        );
        const mainStyle = getComputedStyle(mainImage);
        const panel = document.querySelector(".sy300-preview-spec-panel");
        const panelStyle = getComputedStyle(panel, "::before");
        const inquiryLinks = [
          ...document.querySelectorAll('a[href^="inquiry.html"]'),
        ].map((link) => link.getAttribute("href"));
        const processPanel = document.querySelector(
          ".sy300-preview-process-panel",
        );
        const benefitsPanel = document.querySelector(
          ".sy300-preview-benefits",
        );
        const processHeading = processPanel?.querySelector("h2");
        const benefitsHeading = benefitsPanel?.querySelector("h3");
        const processRect = processPanel?.getBoundingClientRect();
        const benefitsRect = benefitsPanel?.getBoundingClientRect();
        const processHeadingRect = processHeading?.getBoundingClientRect();
        const benefitsHeadingRect = benefitsHeading?.getBoundingClientRect();
        const sameRow =
          processRect &&
          benefitsRect &&
          Math.min(processRect.bottom, benefitsRect.bottom) >
            Math.max(processRect.top, benefitsRect.top) + 1;
        const dualColumnOverlap =
          sameRow &&
          Math.min(processRect.right, benefitsRect.right) >
            Math.max(processRect.left, benefitsRect.left) + 1;
        const rectInside = (child, parent) =>
          child &&
          parent &&
          child.left >= parent.left - 1 &&
          child.right <= parent.right + 1 &&
          child.top >= parent.top - 1 &&
          child.bottom <= parent.bottom + 1;
        return {
          lang: document.documentElement.lang,
          dir: document.documentElement.dir,
          bodyRtl: document.body.classList.contains("is-rtl"),
          viewportWidth: innerWidth,
          documentScrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          horizontalOverflow:
            document.documentElement.scrollWidth > innerWidth + 1 ||
            document.body.scrollWidth > innerWidth + 1,
          textOverflow,
          horizontalEscape,
          brokenImages,
          highlightCount: highlightCards.length,
          highlightHeights: highlightCards,
          mainImage: {
            src: mainImage.currentSrc,
            naturalWidth: mainImage.naturalWidth,
            naturalHeight: mainImage.naturalHeight,
            objectFit: mainStyle.objectFit,
            objectPosition: mainStyle.objectPosition,
          },
          panelBackgroundImage: panelStyle.backgroundImage,
          inquiryLinks,
          orderLayout: {
            dualColumnOverlap,
            processHeadingInside: rectInside(
              processHeadingRect,
              processRect,
            ),
            benefitsHeadingInside: rectInside(
              benefitsHeadingRect,
              benefitsRect,
            ),
            processHeadingOverflow:
              processHeading.scrollWidth > processHeading.clientWidth + 1,
            benefitsHeadingOverflow:
              benefitsHeading.scrollWidth > benefitsHeading.clientWidth + 1,
          },
        };
      });

      const gallery = await page
        .locator(".sy300-preview-still img")
        .evaluateAll((images) =>
          images.map((image) => ({
            src: image.currentSrc,
            alt: image.alt,
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
          })),
        );

      const currentResponses = responseErrors.slice(responseStart);
      const panelUrlMatch = metrics.panelBackgroundImage.match(
        /url\(["']?([^"')]+)["']?\)/,
      );
      const computedPanelUrl = panelUrlMatch?.[1] || "";
      const panelRequestResponse = computedPanelUrl
        ? await page.context().request.get(computedPanelUrl)
        : null;
      const computedPanelStatus = panelRequestResponse?.status() || 0;
      const panelFailures = currentResponses.filter(
        (item) =>
          item.url.includes("f29-detail/f29-panel-") &&
          item.status === 404,
      );
      const expectedStaticErrors = currentResponses.filter(
        (item) =>
          item.url.endsWith("/favicon.ico") ||
          item.url.includes("/api/analytics") ||
          item.url.includes("f29-detail/f29-panel-"),
      );
      const unexpectedResponses = currentResponses.filter(
        (item) => !expectedStaticErrors.includes(item),
      );
      const currentConsole = consoleErrors.slice(consoleStart);
      const unexpectedConsole = currentConsole.filter(
        (text) =>
          !text.includes("/favicon.ico") &&
          !text.includes("/api/analytics") &&
          !text.includes("f29-detail/f29-panel-"),
      );

      const passExcludingSharedPanel =
        response?.status() === 200 &&
        metrics.lang === language &&
        metrics.dir === (language === "ar" ? "rtl" : "ltr") &&
        metrics.bodyRtl === (language === "ar") &&
        !metrics.horizontalOverflow &&
        metrics.textOverflow.length === 0 &&
        metrics.horizontalEscape.length === 0 &&
        metrics.brokenImages.length === 0 &&
        metrics.highlightCount === 4 &&
        gallery.length === 5 &&
        gallery.every(
          (image) => image.naturalWidth > 0 && image.naturalHeight > 0,
        ) &&
        unexpectedResponses.length === 0 &&
        unexpectedConsole.length === 0 &&
        computedPanelStatus === 200 &&
        computedPanelUrl.includes("/assets/img/f29-detail/") &&
        !computedPanelUrl.includes("/assets/assets/") &&
        !metrics.orderLayout.dualColumnOverlap &&
        metrics.orderLayout.processHeadingInside &&
        metrics.orderLayout.benefitsHeadingInside &&
        !metrics.orderLayout.processHeadingOverflow &&
        !metrics.orderLayout.benefitsHeadingOverflow;

      matrix.push({
        language,
        width,
        httpStatus: response?.status() || 0,
        lang: metrics.lang,
        dir: metrics.dir,
        bodyRtl: metrics.bodyRtl,
        documentScrollWidth: metrics.documentScrollWidth,
        bodyScrollWidth: metrics.bodyScrollWidth,
        horizontalOverflow: metrics.horizontalOverflow,
        textOverflowCount: metrics.textOverflow.length,
        textOverflow: metrics.textOverflow,
        horizontalEscapeCount: metrics.horizontalEscape.length,
        horizontalEscape: metrics.horizontalEscape,
        brokenImageCount: metrics.brokenImages.length,
        brokenImages: metrics.brokenImages,
        highlightCount: metrics.highlightCount,
        highlightHeights: metrics.highlightHeights,
        mainImageObjectFit: metrics.mainImage.objectFit,
        mainImageObjectPosition: metrics.mainImage.objectPosition,
        panelBackgroundImage: metrics.panelBackgroundImage,
        galleryFiles: gallery.map((image) => image.src.split("/").pop()),
        galleryDimensions: gallery.map(
          (image) => `${image.naturalWidth}x${image.naturalHeight}`,
        ),
        panelStatus: computedPanelStatus,
        computedPanelUrl,
        orderLayout: metrics.orderLayout,
        panelFailureUrl: panelFailures[0]?.url || "",
        unexpectedResponseCount: unexpectedResponses.length,
        unexpectedResponses,
        unexpectedConsoleCount: unexpectedConsole.length,
        unexpectedConsole,
        passExcludingSharedPanel,
        overallPageGatePass: passExcludingSharedPanel && panelFailures.length === 0,
      });
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}?lang=en`, { waitUntil: "load" });
  await waitForImages();

  await page.locator("[data-lang-menu-button]").click();
  await page.locator('[data-lang-option="zh-CN"]').click();
  await page.waitForFunction(
    () => document.documentElement.lang === "zh-CN",
  );
  const languageSwitch = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    inquiryLinks: [
      ...document.querySelectorAll('a[href^="inquiry.html"]'),
    ].map((link) => link.getAttribute("href")),
  }));

  await page.locator(".sy300-preview-still").nth(3).click();
  const galleryInteraction = await page.evaluate(() => ({
    activeIndex: [
      ...document.querySelectorAll(".sy300-preview-still"),
    ].findIndex((item) => item.classList.contains("is-active")),
    mainSrc: document.querySelector(".sy300-preview-main-frame img").currentSrc,
    frameCode: document.querySelector(".sy300-preview-frame-code").textContent,
  }));

  const technicalTab = page.locator('[data-product-detail-tab="technical"]');
  await technicalTab.click();
  const tabAfterClick = await page.evaluate(() => ({
    technicalSelected: document
      .querySelector('[data-product-detail-tab="technical"]')
      .getAttribute("aria-selected"),
    technicalHidden: document.querySelector(
      '[data-product-detail-panel="technical"]',
    ).hidden,
    overviewHidden: document.querySelector(
      '[data-product-detail-panel="overview"]',
    ).hidden,
  }));
  await technicalTab.press("Home");
  const tabAfterKeyboard = await page.evaluate(() => ({
    activeTab: document.activeElement?.dataset?.productDetailTab || "",
    overviewSelected: document
      .querySelector('[data-product-detail-tab="overview"]')
      .getAttribute("aria-selected"),
  }));

  await page.locator('[data-product-detail-tab="overview"]').click();
  const opener = page
    .locator("[data-product-detail-highlight-open]")
    .first();
  const allHighlightOpeners = page.locator(
    "[data-product-detail-highlight-open]",
  );
  const allLightboxOpenResults = [];
  for (
    let index = 0;
    index < (await allHighlightOpeners.count());
    index += 1
  ) {
    const currentOpener = allHighlightOpeners.nth(index);
    await currentOpener.click();
    allLightboxOpenResults.push(
      await page.evaluate((expectedIndex) => {
        const lightbox = document.querySelector(
          "[data-product-detail-lightbox]",
        );
        const image = document.querySelector(
          "[data-product-detail-lightbox-image]",
        );
        return {
          index: expectedIndex,
          opened: !lightbox.hidden,
          imageLoaded: image.complete && image.naturalWidth > 0,
          src: image.currentSrc,
          alt: image.alt,
        };
      }, index),
    );
    await page.keyboard.press("Escape");
  }
  await page.evaluate(() => {
    const target = document.querySelector("#core-highlights");
    scrollTo(0, target.getBoundingClientRect().top + scrollY - 120);
  });
  await opener.scrollIntoViewIfNeeded();
  const initialScrollY = await page.evaluate(() => scrollY);

  async function lightboxState() {
    return page.evaluate(() => {
      const lightbox = document.querySelector(
        "[data-product-detail-lightbox]",
      );
      return {
        hidden: lightbox.hidden,
        ariaHidden: lightbox.getAttribute("aria-hidden"),
        bodyClass: document.body.classList.contains(
          "product-detail-lightbox-open",
        ),
        bodyOverflow: getComputedStyle(document.body).overflow,
        activeIsClose:
          document.activeElement ===
          document.querySelector("[data-product-detail-lightbox-close]"),
        activeIsOpener:
          document.activeElement ===
          document.querySelector("[data-product-detail-highlight-open]"),
        scrollY,
      };
    });
  }

  await opener.click();
  const openForButton = await lightboxState();
  await page.locator("[data-product-detail-lightbox-close]").click();
  const closeByButton = await lightboxState();

  await opener.click();
  const lightboxRect = await page
    .locator("[data-product-detail-lightbox]")
    .boundingBox();
  await page.mouse.click(lightboxRect.x + 4, lightboxRect.y + 4);
  const closeByOverlay = await lightboxState();

  await opener.click();
  await page.keyboard.press("Escape");
  const closeByEscape = await lightboxState();

  const interactions = {
    languageSwitch,
    galleryInteraction,
    tabAfterClick,
    tabAfterKeyboard,
    inquiryLanguagePreserved: languageSwitch.inquiryLinks.every((href) =>
      href.includes("lang=zh-CN"),
    ),
    lightbox: {
      allLightboxOpenResults,
      allFourOpen:
        allLightboxOpenResults.length === 4 &&
        allLightboxOpenResults.every(
          (item) => item.opened && item.imageLoaded,
        ),
      initialScrollY,
      openForButton,
      closeByButton,
      closeByOverlay,
      closeByEscape,
      buttonFocusReturned: closeByButton.activeIsOpener,
      overlayFocusReturned: closeByOverlay.activeIsOpener,
      escapeFocusReturned: closeByEscape.activeIsOpener,
      scrollRestored:
        Math.abs(closeByButton.scrollY - initialScrollY) <= 1 &&
        Math.abs(closeByOverlay.scrollY - initialScrollY) <= 1 &&
        Math.abs(closeByEscape.scrollY - initialScrollY) <= 1,
    },
  };

  const summary = {
    combinations: matrix.length,
    passExcludingSharedPanel: matrix.filter(
      (item) => item.passExcludingSharedPanel,
    ).length,
    overallPageGatePass: matrix.filter(
      (item) => item.overallPageGatePass,
    ).length,
    sharedPanelFailureCombinations: matrix.filter(
      (item) => item.panelStatus !== 200,
    ).length,
  };

  const compactMatrix = matrix.map((item) => ({
    language: item.language,
    width: item.width,
    pass: item.overallPageGatePass,
    httpStatus: item.httpStatus,
    lang: item.lang,
    dir: item.dir,
    bodyRtl: item.bodyRtl,
    pageScrollWidth: item.documentScrollWidth,
    horizontalOverflow: item.horizontalOverflow,
    textOverflowCount: item.textOverflowCount,
    horizontalEscapeCount: item.horizontalEscapeCount,
    brokenImageCount: item.brokenImageCount,
    highlightCount: item.highlightCount,
    highlightHeights: item.highlightHeights,
    galleryFiles: item.galleryFiles,
    galleryDimensions: item.galleryDimensions,
    panelStatus: item.panelStatus,
    computedPanelUrl: item.computedPanelUrl,
    orderLayout: item.orderLayout,
    unexpectedResponseCount: item.unexpectedResponseCount,
    unexpectedConsoleCount: item.unexpectedConsoleCount,
  }));
  return { summary, matrix: compactMatrix, interactions };
  } catch (error) {
    return { error: error.message, stack: error.stack };
  }
}
