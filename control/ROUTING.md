# Task Routing

## Single-Module Examples

| User request | Route | Typical verification |
| --- | --- | --- |
| Change homepage layout or a language label | `frontend` | Static check and public-page review |
| Change the inquiry dashboard table | `admin` | Admin UI review with existing API paths |
| Fix SMTP delivery or D1 persistence | `api` | Worker syntax and targeted API check |
| Update an environment variable or deploy | `ops` | Wrangler deployment check |
| Update a maintenance guide | `docs` | Markdown review |

## Multi-Module Examples

| User request | Route order |
| --- | --- |
| Add a new inquiry field stored in D1 and shown in admin | `shared` -> `api` -> `frontend` -> `admin` |
| Add a new public static page | `frontend` -> `api` route mapping -> `ops` |
| Add a translated product field | `shared` -> `frontend` |

## Intake Template

Before editing, record these points in the task update:

1. Requested result.
2. Selected module or modules.
3. Files expected to change.
4. Public routes, API contracts, or secrets that must remain unchanged.
5. Verification command or manual check.
