# Operations Module Rules

- Scope: Cloudflare deployment workflow, Wrangler configuration review, generated deployment assets, environment-variable documentation, release verification, and rollback notes.
- Do not edit `deploy/` by hand. Generate it with `node scripts/prepare-deploy.mjs`.
- Preserve `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `REPORT_RECEIVER_EMAIL`, `ADMIN_KEY`, and D1 binding names unless an explicit migration is approved.
- Do not print, commit, or document secret values.
- Treat `wrangler.toml`, `api/worker.js` route mapping, and `scripts/prepare-deploy.mjs` as deployment-sensitive files. Verify public paths after changes.
- A deployment is not a code change by itself. Do not deploy unless requested or required by the task.
