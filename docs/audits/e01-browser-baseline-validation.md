# Phase E — E01 Browser Baseline Validation

Date: 2026-08-02

## Scope and environment

- Read-only browser validation against a temporary local HTTP server rooted at `frontend/`; server stopped after the run.
- Routes checked: `pages/index.html`, `pages/sj250.html`, and `pages/inquiry.html?lang=ar`.
- No form was submitted and no production endpoint was contacted.

## HTTP results

| Area | Result |
| --- | --- |
| Home responsive widths | Pass at 375, 768, 1440, 1920, and 2560 viewport overrides: document width equalled scroll width at each tested breakpoint; no broken sourced images. |
| SJ250 desktop | Pass at 1440: five-angle gallery structure, 13 images, no sourced-image failures, and no console warnings/errors. |
| Seven languages | Pass on SJ250: `en`, `zh-CN`, `zh-TW`, `ru`, `ar`, `es`, `pt` all changed `document.documentElement.lang`; Arabic changed `dir` to `rtl`; no document-level horizontal overflow. |
| SJ250 mobile RTL | Pass at 375: `lang=ar`, `dir=rtl`, width and scroll width both 360, no sourced-image failures; visible layout retained gallery, product panel, and mobile menu. |
| Gallery and tabs | Pass: gallery thumbnail 02 became active and updated the main-gallery image; Arabic technical tab selected with exactly one visible tab panel. |
| Inquiry page | Pass non-submit inspection: one form, expected name/email/model/quantity/message controls, Arabic RTL, no sourced-image failure or console warning/error. |
| Home product link | Pass: the current homepage includes the SJ250 detail route; no sourced-image failure or console warning/error. |

## `file:///` limitation

The in-app browser blocked navigation to `file:///C:/.../frontend/pages/sj250.html` under its URL security policy.  This is a browser-tool restriction, not a project test failure; no bypass or alternate browser surface was attempted.  The file-protocol portion of the release matrix remains pending an approved browser surface that permits local-file navigation.

## Remaining E coverage

E01 establishes an HTTP baseline only.  It does not replace the required all-page matrix: remaining work includes representative product-world candidate integration review, broader 27-detail-page sampling, public page/News/Video matrices, and a permitted `file:///` validation surface.
