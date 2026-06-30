# Frontend Module Rules

- Scope: public website pages, public assets, SEO files, product display, News display, Contact page, and the public inquiry entry.
- Do not change Cloudflare Worker routes, D1 schema, SMTP logic, admin authentication, or backend API behavior from this module.
- Preserve existing public URLs and user interactions unless a task explicitly asks for a route or behavior change.
- Keep inquiry form submission, Excel download, and `emailStatus` handling compatible with the current API.
- Keep Chinese in static HTML as entities where practical, and JS Chinese strings as Unicode escapes when editing generated/static strings.
- Do not remove product images, video, JSZip, or inquiry templates unless a reference scan proves they are unused.
