# Admin Module Rules

- Scope: `/admin` dashboard UI, analytics views, inquiry management UI, SMTP status display, and future admin-only product/news/image management screens.
- Reuse existing admin authentication through `ADMIN_KEY` protected API calls.
- Do not bypass login, expose secrets, or add unauthenticated admin actions.
- Keep admin Chinese ASCII-safe: HTML entities for static markup and Unicode escapes for JS strings where practical.
- Admin may call `/api/analytics`, `/api/inquiries`, `/api/inquiries/:id`, and `/api/smtp-status`.
- Do not change public frontend pages or Worker deployment configuration from this module.
