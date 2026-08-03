# P30 ER7 preview replacement

Date: 2026-08-02

Input: `frontend/assets/img/product-world-previews/er7-preview-headlight-v1.png`.

Issue: At product-world card size, the prior ER7 preview was too dark and its round headlight was not sufficiently readable against the corridor.

Replacement:

- New asset: `frontend/assets/img/product-world-previews/er7-preview-headlight-v2.png`
- Dimensions: `887×1774`
- SHA-256: `9dc393a02f1d7c9700b1079d9a4a849831c6813556206c8ea69c24ce2697401d`
- Method: non-destructive edit of ER7 v1. The olive-green front body, round multi-LED headlight, handlebars, forks, wheel, footpegs and front-on pose were retained; only the card scale, headlight illumination and scene readability were improved.
- Mapping: `frontend/assets/js/main.js` now maps `er7.html` to v2. Original v1 remains retained.

Acceptance: pass. The vehicle is complete, centered, visibly lit and uses the F4-compatible dark industrial / red side-light / wet-floor composition.

Verification:

- `node --check frontend/assets/js/main.js` passed.
- Static preview preparation passed.
- Local HTTP request for the new asset returned 200.
- `git diff --check` passed.
