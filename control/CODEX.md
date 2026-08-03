# Control Module Rules

- Scope: task intake, module routing, cross-module sequencing, maintenance templates, and change records.
- Do not contain website business code, public assets, API handlers, secrets, or deployment output.
- Use `ROUTING.md` to classify work before any source file is read or edited.
- Prefer one owner module. Escalate to a multi-module task only for an explicit shared contract or deployment dependency.
- Record decisions concisely so future tasks can start with the relevant module instead of scanning the repository.
