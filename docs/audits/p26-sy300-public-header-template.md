# P26 SY300 public-header template adoption

Date: 2026-08-02

Scope: `index.html`, `videos.html`, `news.html`, `inquiry.html`, `contact.html`, and the product-detail generator template.

- Introduced the shared `current-product-header` class, based on the current `sy300.html` header contract.
- The shared class applies the same fixed dark header, height, gutter, single-line brand, navigation scale and spacing, language control layering, and responsive mobile values.
- Each page retains only its own active navigation item; Product World continues to resolve to `sy300.html` when JavaScript is unavailable.
- The product-detail template also uses the class, keeping generated model pages in the same header system.
- The stylesheet URL was versioned to ensure existing local-browser caches receive the new shared header rules.

Verification:

- Full 27-model build passed.
- `node --check frontend/assets/js/main.js` passed.
- Static preview preparation and `git diff --check` passed.
- Browser checks passed at desktop, 768px, and 375px. At mobile widths, the brand, language control, and menu button remained visible with no horizontal overflow.
