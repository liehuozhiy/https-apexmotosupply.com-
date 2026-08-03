# P25 Current product-world entry correction

Date: 2026-08-02

The former `products.html` catalogue is retired and is not the product-world reference.

- The active product-world experience is the shared product menu in the current detail pages under `frontend/pages/`, with `sy300.html` as its default target.
- The public headers in `index.html`, `videos.html`, `news.html`, `inquiry.html`, and `contact.html` now use `sy300.html` as their no-script fallback for the Product World item.
- The product-detail generator template uses the same fallback, and the isolated full `--all` product-page build has regenerated every model page from that template.
- `main.js` already changes the Product World link into the shared interactive menu and already used `sy300.html`; no shared JavaScript or CSS change was necessary.

Verification:

- `node scripts/build-product-pages.mjs --all` passed for all 27 model pages.
- `node --check frontend/assets/js/main.js` passed.
- `node scripts/prepare-deploy.mjs` passed.
- The local HTTP response for `videos.html` is 200 and includes `href="sy300.html"`, with no `href="products.html"` in the header.
- `git diff --check` passed.
