async (page) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("http://127.0.0.1:2840/pages/f29.html?lang=ar", {
    waitUntil: "load",
  });
  return page.evaluate(() => {
    const cta = document.querySelector(".sy300-preview-primary-cta");
    const label = cta.querySelector("span");
    const original = label.textContent;
    const candidates = ["ابدأ الاستفسار", "استفسر", "اتصل بنا"];
    const candidateWidths = candidates.map((text) => {
      label.textContent = text;
      return {
        text,
        clientWidth: cta.clientWidth,
        scrollWidth: cta.scrollWidth,
        labelClientWidth: label.clientWidth,
        labelScrollWidth: label.scrollWidth,
      };
    });
    label.textContent = original;
    const overflow = [
      ...document.querySelectorAll("h1,h2,h3,p,dt,dd,a,button,b,small"),
    ]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0 &&
          element.scrollWidth > element.clientWidth + 1
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const parentRect = element.parentElement?.getBoundingClientRect();
        return {
          tag: element.tagName,
          className: element.className,
          text: element.textContent.trim(),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
          rect: {
            left: rect.left,
            right: rect.right,
            width: rect.width,
          },
          parentRect: parentRect
            ? {
                left: parentRect.left,
                right: parentRect.right,
                width: parentRect.width,
              }
            : null,
        };
      });
    return {
      overflow,
      candidateWidths,
      ctaStyle: {
        direction: getComputedStyle(cta).direction,
        justifyContent: getComputedStyle(cta).justifyContent,
        gap: getComputedStyle(cta).gap,
        letterSpacing: getComputedStyle(cta).letterSpacing,
        whiteSpace: getComputedStyle(cta).whiteSpace,
      },
      childRects: [...cta.children].map((child) => {
        const rect = child.getBoundingClientRect();
        const style = getComputedStyle(child);
        return {
          tag: child.tagName,
          text: child.textContent,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          direction: style.direction,
          transform: style.transform,
          marginLeft: style.marginLeft,
          marginRight: style.marginRight,
        };
      }),
    };
  });
}
