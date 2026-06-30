# API Module Rules

- Scope: Cloudflare Worker, Pages Functions, D1 schema, API routes, SMTP sending, and server-side integrations.
- Preserve API response compatibility, especially inquiry creation fields and `emailStatus`.
- Never hardcode `SMTP_PASS`, `ADMIN_KEY`, API tokens, or passwords.
- Read secrets only from Cloudflare runtime environment variables and bindings.
- Keep D1 schema changes backward compatible and additive unless a migration plan is explicitly approved.
- Email sending failures must not block inquiry creation.
- Do not change public UI files from this module unless an API contract change requires coordinated frontend/admin updates.
