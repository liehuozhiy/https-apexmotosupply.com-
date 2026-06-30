# Shared Module Rules

- Scope: shared product fields, inquiry fields, analytics fields, constants, validators, i18n dictionaries, and pure utility functions.
- Do not add browser-only DOM code or Worker-only runtime APIs here.
- Keep field names stable for frontend, admin, and API consumers.
- Prefer plain data and small pure functions.
- Changes must remain backward compatible with existing product cards, inquiry records, analytics records, and admin status labels.
- Do not store secrets or deployment-specific credentials in shared files.
