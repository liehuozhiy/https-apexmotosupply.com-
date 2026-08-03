# P31 ES11 preview replacement

Date: 2026-08-02

Input: `es11-preview-headlight-v1.png`.

Issue: ES11 v1 was underexposed and did not provide a readable vehicle or lit-headlight focal point at dropdown-card size.

Replacement:

- New asset: `frontend/assets/img/product-world-previews/es11-preview-headlight-v2.png`
- Dimensions: `887×1774`
- SHA-256: `399151855c298e5f9ad288584404f73045d9f84f57869432e14a23bdabd583d5`
- Method: non-destructive edit retaining the black angular ES11 mask, black fork guards, broad front fender, handlebars, tire, footpegs and head-on geometry; added a compact integrated LED and improved controlled industrial-corridor lighting.
- Mapping: `main.js` now maps `es11.html` to v2. Original v1 remains retained.

Acceptance: pass. Full vehicle, front-on composition, readable light focal point, wet-floor reflection, no people, no logo, no text, and no watermark.

Verification: `node --check frontend/assets/js/main.js`, static-preview preparation, local HTTP (200), and `git diff --check` passed.
