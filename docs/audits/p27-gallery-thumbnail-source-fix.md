# P27 Gallery thumbnail source fix

Date: 2026-08-02

Issue: Generated product-page gallery thumbnail `<img>` tags used each image's alt text as `src`, causing broken thumbnail requests and visible alt text.

Resolution:

- Corrected `scripts/build-product-pages.mjs` so gallery thumbnail `src` uses `image.src` and `alt` remains `image.alt`.
- Rebuilt all 27 product-detail pages and refreshed the static preview directory.

Verification:

- `node --check scripts/build-product-pages.mjs` passed.
- Full product-page build passed.
- At 375px in the local HTTP preview, SY300 shows all five thumbnail images and the default #02 main image; no broken thumbnail or alt-text fallback remains.
- `git diff --check` passed.
