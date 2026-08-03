async (page) => {
  const baseUrl = "http://127.0.0.1:2840/pages/f29.html";
  const evidenceDir =
    "C:/Users/Administrator/.codex/worktrees/f78d/apex-moto-static/frontend/assets/img/f29-detail/qa-review-2026-07-27";

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

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(`${baseUrl}?lang=en`, { waitUntil: "load" });
  await waitForImages();
  await page.screenshot({
    path: `${evidenceDir}/f29-v27-final-1440-en.jpg`,
    fullPage: true,
    type: "jpeg",
    quality: 82,
  });
  await page.locator(".sy300-preview-spec-panel").screenshot({
    path: `${evidenceDir}/f29-v27-final-1440-panel.png`,
  });

  const overviewTab = page.locator(
    '[data-product-detail-tab="overview"]',
  );
  await overviewTab.click();
  const opener = page
    .locator("[data-product-detail-highlight-open]")
    .first();
  await opener.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  let baselineScrollY = await page.evaluate(() => scrollY);
  if (baselineScrollY < 100) {
    await page.evaluate(() => scrollTo(0, 520));
    await page.waitForTimeout(100);
    baselineScrollY = await page.evaluate(() => scrollY);
  }

  async function state() {
    return page.evaluate(() => {
      const lightbox = document.querySelector(
        "[data-product-detail-lightbox]",
      );
      return {
        hidden: lightbox.hidden,
        ariaHidden: lightbox.getAttribute("aria-hidden"),
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
  const openByButton = await state();
  await page.locator("[data-product-detail-lightbox-close]").click();
  const closeByButton = await state();

  await opener.click();
  const lightboxRect = await page
    .locator("[data-product-detail-lightbox]")
    .boundingBox();
  await page.mouse.click(lightboxRect.x + 4, lightboxRect.y + 4);
  const closeByOverlay = await state();

  await opener.click();
  await page.keyboard.press("Escape");
  const closeByEscape = await state();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(`${baseUrl}?lang=ar`, { waitUntil: "load" });
  await waitForImages();
  await page.screenshot({
    path: `${evidenceDir}/f29-v27-final-375-ar.jpg`,
    fullPage: true,
    type: "jpeg",
    quality: 82,
  });

  return {
    screenshots: [
      `${evidenceDir}/f29-v27-final-1440-en.jpg`,
      `${evidenceDir}/f29-v27-final-1440-panel.png`,
      `${evidenceDir}/f29-v27-final-375-ar.jpg`,
    ],
    lightbox: {
      baselineScrollY,
      openByButton,
      closeByButton,
      closeByOverlay,
      closeByEscape,
      buttonFocusReturned: closeByButton.activeIsOpener,
      overlayFocusReturned: closeByOverlay.activeIsOpener,
      escapeFocusReturned: closeByEscape.activeIsOpener,
      scrollRestored:
        Math.abs(closeByButton.scrollY - baselineScrollY) <= 1 &&
        Math.abs(closeByOverlay.scrollY - baselineScrollY) <= 1 &&
        Math.abs(closeByEscape.scrollY - baselineScrollY) <= 1,
    },
  };
}
