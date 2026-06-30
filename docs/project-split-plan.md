# Apex Moto Supply Project Split Plan

This project has been split into smaller maintenance modules to reduce context size and make future Codex work more focused. Frontend, admin, and API files have been moved into their module directories; `deploy/` is generated from those source modules for Cloudflare assets.

## Target Modules

- `frontend`: public website pages, public assets, SEO files, product display, News, Contact, and the public inquiry entry.
- `admin`: `/admin` dashboard UI, analytics views, inquiry management UI, SMTP status display, and future admin-only management screens.
- `api`: Cloudflare Worker, Pages Functions, D1 schema, API routes, SMTP sending, and server-side integrations.
- `shared`: shared product fields, inquiry fields, analytics fields, constants, validators, i18n dictionaries, and pure utilities.
- `docs`: migration plans, runbooks, deployment notes, and maintenance documentation.

## Completed Layout

- `frontend/pages`: public website pages.
- `frontend/assets`: public website CSS, JS, images, video, vendor files, and templates.
- `frontend/public`: SEO public files such as `robots.txt` and `sitemap.xml`.
- `admin/pages`: `/admin` dashboard UI.
- `admin/assets`: admin-only static assets.
- `api/worker.js`: Cloudflare Worker entry.
- `api/cloudflare-d1-schema.sql`: D1 schema.
- `api/functions`: archived or future Pages Functions API files.
- `shared`: future shared types, constants, schemas, validators, and pure utilities.
- `docs`: migration plans, runbooks, deployment notes, and maintenance documentation.

## Cloudflare Deployment

- Worker entry: `api/worker.js`.
- Wrangler assets directory: `deploy`.
- Generate assets with `node scripts/prepare-deploy.mjs`.
- `deploy/` is generated output and should not be edited by hand.

## Public Route Mapping

- `/` -> `deploy/frontend/pages/index.html`
- `/index.html` -> `deploy/frontend/pages/index.html`
- `/products.html` -> `deploy/frontend/pages/products.html`
- `/news.html` -> `deploy/frontend/pages/news.html`
- `/contact.html` -> `deploy/frontend/pages/contact.html`
- `/inquiry.html` -> `deploy/frontend/pages/inquiry.html`
- `/assets/*` -> `deploy/frontend/assets/*`
- `/admin` and `/admin/` -> `deploy/admin/pages/admin.html`
- `/admin/assets/*` -> `deploy/admin/assets/*`
- `/robots.txt` -> `deploy/frontend/public/robots.txt`
- `/sitemap.xml` -> `deploy/frontend/public/sitemap.xml`
- `/api/*` -> `api/worker.js`, with public API paths unchanged.

## Remaining Phases

1. Extract shared data, constants, schemas, and validators into `shared` only when a low-risk shared boundary is clear.
2. Add package metadata only if a future build or test workflow needs it.
3. Keep deployment wiring in `wrangler.toml`, `api/worker.js`, and `scripts/prepare-deploy.mjs`.

## Safety Rules

- Use one commit per phase where practical.
- Preserve current public routes, API routes, environment variable names, and `emailStatus` compatibility.
- Verify each phase independently before continuing.
- Regenerate `deploy/` before every Cloudflare deployment.
