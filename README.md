# Apex Moto Supply Static Site

This static site has been updated from the supplied `2026H&T产品参数（英）.xlsx` workbook.

## What Changed

- Replaced generated motorcycle imagery with product images extracted from the Excel workbook.
- Added 26 confirmed models across gasoline, electric, and youth categories.
- Added Chinese / English language switching in the top-right header.
- Rebuilt the page into a stronger visual landing page plus product-catalog layout.
- The hero background uses the supplied off-road action image.
- Product cards include key highlights plus a floating parameter modal.
- Product images were centered on a uniform canvas so wheels are not cropped.
- Parameter viewing no longer changes product-card layout or creates blank space in neighboring cards.

## Main Files

- `frontend/pages/`: public website pages and SEO metadata.
- `frontend/assets/css/styles.css`: clean responsive catalog styling.
- `frontend/assets/js/site-data.js`: bilingual product data, translated UI text, and company contact details.
- `frontend/assets/js/main.js`: product rendering, category filters, mobile menu, and inquiry email behavior.
- `frontend/assets/js/analytics-config.js`: public analytics endpoint configuration.
- `admin/pages/admin.html`: private analytics and inquiry dashboard page.
- `admin/assets/js/analytics-config.js`: admin analytics endpoint configuration.
- `api/worker.js`: Cloudflare Worker entry, API routes, SMTP, D1, and static route mapping.
- `api/cloudflare-d1-schema.sql`: D1 database schema.
- `frontend/assets/img/products/`: real product images extracted from the provided workbook.

## Control Layer And Module Split

The repository root is the control layer for maintenance requests. It classifies each request and sends work to the smallest relevant module, so routine work does not require reading the entire codebase. The `control/` directory contains the routing table and task intake template; `ops/` owns deployment and environment-variable rules.

The business code is split into `frontend`, `admin`, `api`, and `shared`; `docs` owns project documentation. Cloudflare Worker uses `api/worker.js` as the entry point. Static assets are generated into the Git-ignored `deploy/` directory by `node scripts/prepare-deploy.mjs`; do not maintain or commit `deploy/` by hand. The deployment builder copies all runtime code and only the images referenced by the generated site, while historical source assets remain in `frontend/`. See `control/ROUTING.md` and `docs/project-split-plan.md` for route mapping and maintenance boundaries.

## Daily Maintenance

1. Edit product-detail data in `frontend/product-detail/data/` and catalog data in `frontend/assets/js/site-data.js`.
2. Replace a product image using the same filename in `frontend/assets/img/products/`; keep the 1400x950 centered canvas style for consistent previews.
3. Open the local preview and check desktop/mobile widths.
4. Run `node scripts/prepare-deploy.mjs`.
5. Deploy with Cloudflare Wrangler.

## Inquiry Form

The inquiry form generates an Excel report in the browser and also posts the same inquiry fields to `/api/inquiries` for backend management. The contact area also lists WhatsApp `+8618384234234`.

When SMTP environment variables are configured, each saved inquiry also sends an email notification to `REPORT_RECEIVER_EMAIL`. SMTP credentials must be configured in Cloudflare environment variables, not committed to the repository:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE`
- `REPORT_RECEIVER_EMAIL`

## Analytics

The site includes a Cloudflare Worker backend and an `admin.html` dashboard for analytics and inquiry management.

Cloudflare setup:

1. Create a D1 database.
2. Run the SQL in `api/cloudflare-d1-schema.sql`.
3. In Cloudflare Pages, bind the D1 database to this project with variable name `DB`.
4. Add an environment variable named `ADMIN_KEY`.
5. Run `node scripts/prepare-deploy.mjs`.
6. Deploy the site.
7. Open `/admin`, keep endpoint as `/api/analytics`, enter `ADMIN_KEY`, then load analytics or inquiries.

## Cloudflare Routing

- `/` and `/index.html` map to `deploy/index.html`.
- Public `.html` routes map to matching files at the root of `deploy/`.
- `/assets/*` maps to `deploy/assets/*`.
- `/admin` and `/admin/` map to `deploy/admin/index.html`.
- `/admin/assets/*` maps to `deploy/admin/assets/*`.
- `/robots.txt` and `/sitemap.xml` map to `deploy/frontend/public/`.
- `/api/*` routes are handled by `api/worker.js` and keep their public paths unchanged.

## Notes

- ER / ES / ETT data was taken from the embedded product-parameter images in the workbook.
- Update `frontend/public/robots.txt` and `frontend/public/sitemap.xml` if the final production domain changes.

