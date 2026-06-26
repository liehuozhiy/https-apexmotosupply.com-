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

- `index.html`: page structure and SEO metadata.
- `assets/css/styles.css`: clean responsive catalog styling.
- `assets/js/site-data.js`: bilingual product data, translated UI text, and company contact details.
- `assets/js/main.js`: product rendering, category filters, mobile menu, and inquiry email behavior.
- `assets/js/analytics-config.js`: analytics endpoint configuration.
- `admin.html`: private analytics dashboard page for visit counts, IPs, and countries after the backend is deployed.
- `assets/img/products/`: real product images extracted from the provided workbook.

## Daily Maintenance

1. Edit product specs in `assets/js/site-data.js`.
2. Replace a product image using the same filename in `assets/img/products/`; keep the 1400x950 centered canvas style for consistent previews.
3. Open the local preview and check desktop/mobile widths.
4. Upload the full folder to static hosting.

## Inquiry Form

The inquiry form opens a pre-filled email to `sijunhe567@gmail.com`. The contact area also lists WhatsApp `+8618384234234`.

## Analytics

The site includes a Cloudflare Pages Function at `functions/api/analytics.js` and an `admin.html` dashboard.

Cloudflare setup:

1. Create a D1 database.
2. Run the SQL in `cloudflare-d1-schema.sql`.
3. In Cloudflare Pages, bind the D1 database to this project with variable name `DB`.
4. Add an environment variable named `ADMIN_KEY`.
5. Deploy the site.
6. Open `/admin.html`, keep endpoint as `/api/analytics`, enter `ADMIN_KEY`, then load data.

## Notes

- ER / ES / ETT data was taken from the embedded product-parameter images in the workbook.
- Update `robots.txt` and `sitemap.xml` if the final production domain changes.

