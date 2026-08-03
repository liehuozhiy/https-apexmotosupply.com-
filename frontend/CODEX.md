# Frontend Module Rules

- Before any frontend work, read the repository root `CODEX.md` and this file completely.
- Frontend product work must use the existing Codex task hierarchy: the root control task communicates with `Apex 前端工程师`; that lead coordinates the existing independent `Apex + 型号 + 工程师` tasks.
- Do not create replacement internal sub-agents inside a single task when the corresponding user-visible model tasks already exist.
- Do not duplicate model tasks. Continue the existing matching model task and keep one responsible task per model.
- If an existing product page has no matching user-visible model task, only `Apex 前端工程师` may create one independent `Apex + 型号 + 工程师` task after explicit user authorization. The new task modifies the existing model files; it must not recreate or replace the existing page wholesale.
- The frontend lead may run at most three high-load jobs across model tasks at once. Never run two jobs that write the same model or shared file, and never start duplicate servers or validation processes.
- Keep all model tasks active concurrently for low-load model-scoped work, but queue their high-load requests through the three shared slots.
- Model tasks prepare and validate their own JSON/assets without launching full browser matrices or redundant servers. The frontend lead performs one batch build for a ready group and reuses one static server/browser pool for targeted page validation.
- Before starting a server, browser matrix, build, or test, check for an existing equivalent process and reuse or wait. Stop it immediately after verification.
- Prefer single-model generation and targeted breakpoints/languages during iteration; reserve full matrices for the final shared-template or release gate. When two image-generation jobs are active, keep the third high-load slot available for targeted verification unless the lead explicitly confirms it is safe to use.
- Exclude `node_modules/`, `dist/`, `build/`, `.git/`, caches, temporary browser data, and large generated output from routine searches.
- Scope: public website pages, public assets, SEO files, product display, News display, Contact page, and the public inquiry entry.
- Do not change Cloudflare Worker routes, D1 schema, SMTP logic, admin authentication, or backend API behavior from this module.
- Preserve existing public URLs and user interactions unless a task explicitly asks for a route or behavior change.
- Keep inquiry form submission, Excel download, and `emailStatus` handling compatible with the current API.
- Keep Chinese in static HTML as entities where practical, and JS Chinese strings as Unicode escapes when editing generated/static strings.
- Do not remove product images, video, JSZip, or inquiry templates unless a reference scan proves they are unused.
