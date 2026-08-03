# Apex Moto Supply Control Rules

## Role

This repository root is the control layer. Receive requests here, classify the affected module or modules, and then read and change only those modules.

## Module Routing

| Request area | Owner module |
| --- | --- |
| Public pages, styling, SEO, languages, video, product display, public inquiry UI | `frontend` |
| Dashboard, admin login UI, inquiry management UI, admin reports | `admin` |
| Worker routes, D1, SMTP, inquiry persistence, authentication, API contracts | `api` |
| Shared fields, validation, language dictionaries, pure utilities | `shared` |
| Deployment, Cloudflare configuration, environment-variable documentation, release checks | `ops` |
| Plans, runbooks, migration notes, change records | `docs` |

## Dispatch Process

0. At the start of every Apex task, read this root `CODEX.md` and then the selected module's `CODEX.md` before inspecting or changing project files.
1. Identify the requested behavior and public surface affected.
2. Select the smallest owning module. Read its `CODEX.md` before editing.
3. Add another module only when there is a real contract, route, or shared-data dependency.
4. State the selected module scope before editing. Do not scan unrelated modules or large assets.
5. Validate the changed module, then run the required deployment preparation only when static source changed.
6. Keep `deploy/` generated. Never edit it by hand.

## Persistent Task Hierarchy

- Use the existing user-visible Apex tasks in the Codex sidebar as the project workforce. Do not create multiple internal sub-agents inside one task to replace those existing tasks.
- The root task is the Apex project control center. It coordinates only the existing lead tasks: `Apex 前端工程师`, `Apex Docs & QA`, `Apex 运维工程师`, `Apex 模块化`, `Apex API`, and `Apex 系统管理`.
- Product-model implementation is routed through `Apex 前端工程师`, which coordinates the existing independent model tasks such as `Apex SJ300 工程师`, `Apex F4 工程师`, and the other `Apex + 型号 + 工程师` tasks.
- The root task must not bypass `Apex 前端工程师` to manage model engineers directly.
- Reuse and continue an existing matching task. Do not create a duplicate task for a model that already has one.
- Existing files/pages are not proof that a dedicated model task already exists. Locate a matching task by model slug, page name, or historical task title before deciding.
- If no matching user-visible model task exists, the `Apex 前端工程师` lead creates exactly one new independent user-visible `Apex + 型号 + 工程师` task after the user explicitly requests it. It must own only that model's existing files and assets; it does not recreate a page from scratch or duplicate existing files.
- When the current working-tree diff exceeds Codex's worktree creation limit, do not delete, stage, commit, reset, or move user changes to make a worktree. The `Apex 前端工程师` lead may instead create a local-directory independent model task with an explicit, non-overlapping file boundary; such local tasks must not change shared CSS, templates, build scripts, or another model's files.
- Before dispatching work, read this section again and verify the target task name and responsibility.

## Cross-Module Order

- Shared fields or API contracts: `shared` -> `api` -> `frontend` or `admin`.
- Public inquiry behavior: `api` first when the request changes data or response behavior; otherwise `frontend` only.
- Public route changes: `frontend` -> `api` route mapping -> `ops` verification.
- Admin display of existing API data: `admin` only unless an API field is missing.
- Deployment-only requests: `ops` only.

## Global Safeguards

- Limit high-load concurrency: run at most three high-CPU tasks at a time across the Apex project.
- All model tasks may remain active concurrently for low-load reading, asset manifests, JSON editing, copy review, and status reporting. The three-slot limit applies only to high-CPU work.
- Do not exceed three concurrent builds, browser matrices, test runs, dependency installations, image generations, or full-project scans in total. Never run duplicate processes for the same task or target.
- Before a potentially long or CPU-intensive command, state what will run and confirm no equivalent process is already active.
- Prefer targeted validation for the files and routes changed in the current task; do not default to the complete test suite.
- File searches must exclude `node_modules/`, `dist/`, `build/`, `.git/`, cache directories, temporary browser data, and large generated outputs unless a specific file is required.
- Do not start duplicate background servers or test processes. Stop development servers, browsers, test runners, and child processes as soon as their verification completes. Prefer reserving one slot for verification when two image-generation tasks are active.
- Product-model tasks must not each start their own full build, static server, or browser matrix. Batch builds and browser validation are centralized and reused across models.
- Preserve public URLs, API response compatibility, product data, and inquiry behavior unless the request explicitly changes them.
- Never expose or commit passwords, tokens, SMTP credentials, or `ADMIN_KEY`.
- Do not read `node_modules`, `.wrangler`, `deploy`, logs, build output, or large media unless required for the specific task.
- A request must name no module. The control layer determines the scope and reports it before edits.
