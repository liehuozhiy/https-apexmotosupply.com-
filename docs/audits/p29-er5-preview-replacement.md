# P29 ER5 preview replacement

Date: 2026-08-02

Input: `frontend/assets/img/product-world-previews/er5-preview-nolight-v2.png`.

Issue: The previous ER5 preview was a no-light asset and therefore failed the F4 visual gate.

Replacement:

- New asset: `frontend/assets/img/product-world-previews/er5-preview-headlight-v3.png`
- Dimensions: `887×1774`
- SHA-256: `94591aa772c0dfedd471a1c4351ec6a583c9ddb09e75d2d5164f6585d26227ba`
- Method: non-destructive image edit from the existing ER5 preview, preserving the green motorcycle, centered front pose, handlebars, forks, tire and footpegs; adds a compact lit LED headlight and retains the dark industrial wet-floor setting.
- Mapping: `frontend/assets/js/main.js` now maps `er5.html` to the new versioned asset. The original `er5-preview-nolight-v2.png` remains untouched.

Acceptance: pass. The new candidate is portrait, fully framed, visibly lit, centered at the F4-compatible scale, and contains no people, logo, text, or watermark.

Verification:

- `node --check frontend/assets/js/main.js` passed.
- Static preview preparation passed.
- Local HTTP request for the new asset returned 200.
- `git diff --check` passed.
