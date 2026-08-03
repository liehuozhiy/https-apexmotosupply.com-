# C02 dual-source conflict decision

Date: 2026-08-01 (Asia/Shanghai)

## Scope and evidence baseline

Only these outputs are in scope: `frontend/product-detail/data/f29.json`,
`frontend/product-detail/data/f29r.json`, their generated pages, and this
report. The source workbooks were read only; no workbook was exported or
modified.

| File | SHA-256 before C02 |
| --- | --- |
| `frontend/assets/js/site-data.js` | `835763ff3a242248ae6e3466467cbfdf7e8cd27d22fb17d1f453965fa86ba0d2` |
| `frontend/product-detail/data/f29.json` | `f66a9876be6482e13ea6ef48b809b84b453eaafba3cdb2792f5afb4256e002ad` |
| `frontend/product-detail/data/f29r.json` | `03baa42cc939ad523c920baac53bf5499094aa19e95912a62485aadaf46cf595` |
| `frontend/pages/f29.html` | `2e2b51e166e1654defa21f89d930f7a6fda49191c726fb51aa660dbab79e4493` |
| `frontend/pages/f29r.html` | `5ae57781dada5a92a839b4f265411e41a6416d4f722b921ec8ed645b9efc2a7b` |
| `2026H&Q产品参数_网页对比分析.xlsx` | `d7f0c5ee8717a13dd6eaf61e5d4c6fd5fff5d55bd55d1612cba4b0e6cdb64076` |
| `frontend/product-detail/2026H&Q产品参数（英）-官网核对更新.xlsx` | `7e6e857fac88412a3786c1bc489662c06ff824230c441772acd00e3223215778` |

`source-audit-index.json` records the exact, read-only workbook cells below.
The mapped official URLs have category-level status and no model-level parameter
verification; therefore they provide no competing model-specific value for these
six geometry fields. Under the project priority rule, the Excel values are used
where the official source is missing.

## Decisions for all C01 conflicts

| # | Model / field | Current site-data.js | Current JSON | Excel / official evidence | Decision and adopted value | Manual confirmation | Updated |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | F29 Dimensions | `products[8].specs[0][1]`: `2120*800*1235mm` | `technical.groups[0].items[0]`: `2160 × 820 × 1230 mm` | `Time-F!C3` = `2120*800*1235mm`; official mapped category has no model-level verification | Adopt Excel/site value: `2120 × 800 × 1235 mm` | No; explicit workbook value and no competing official parameter | Yes |
| 2 | F29 Wheelbase | `products[8].specs[1][1]`: `1440mm` | `technical.groups[0].items[1]`: `1480 mm` | `Time-F!C4` = `1440mm`; official model parameter missing | Adopt Excel/site value: `1440 mm` | No | Yes |
| 3 | F29 Seat height | `products[8].specs[3][1]`: `910mm` | `technical.groups[0].items[3]`: `940 mm` | `Time-F!C6` = `910mm`; official model parameter missing | Adopt Excel/site value: `910 mm` | No | Yes |
| 4 | F29R Dimensions | `products[9].specs[0][1]`: `2120*800*1235mm` | `technical.groups[0].items[0]`: `2160 × 820 × 1230 mm` | `Time-F!D3` = `2120*800*1235mm`; official model parameter missing | Adopt Excel/site value: `2120 × 800 × 1235 mm` | No; explicit workbook value and no competing official parameter | Yes |
| 5 | F29R Wheelbase | `products[9].specs[1][1]`: `1440mm` | `technical.groups[0].items[1]`: `1480 mm` | `Time-F!D4` = `1440mm`; official model parameter missing | Adopt Excel/site value: `1440 mm` | No | Yes |
| 6 | F29R Seat height | `products[9].specs[3][1]`: `910mm` | `technical.groups[0].items[3]`: `940 mm` | `Time-F!D6` = `910mm`; official model parameter missing | Adopt Excel/site value: `910 mm` | No | Yes |
| 7 | HS85 series semantics | `products[25].series`: `Youth Motocross` | `hs85.json.series`: `HS85 系列` | `HS85CC!B32` Purpose = `Off-road / Motocross (Junior/Youth competition class)`; it is not a series field | Retain both values; do not convert a purpose/use label into a series value | Yes, only if product owners later want a unified taxonomy | No |

For #7, `site-data.products[25].series = Youth Motocross` is a list-facing
audience/use grouping, while `hs85.json.series = HS85 系列` is a detail-page
model-family identifier. `HS85CC!B32` supplies a purpose statement, not evidence
that either existing series semantic is wrong. C01's original conflict category
is therefore retained rather than auto-rewritten.

## Applied data synchronization

Both F29 files now use the three Excel-backed technical values above. Every
language map (`en`, `zh-CN`, `zh-TW`, `ru`, `ar`, `es`, `pt`) replaces the three
old factual value keys. F29R also replaces its one overview mini-spec sentence
and all seven translations from `1480 ... 940` to `1440 ... 910`; this prevents a
second public rendering path from retaining old geometry. No stats, selling
points, highlights, gallery, panel, series, route, marketing copy, assets,
template, generator, site-data, workbook, or source-audit index was changed.

## Verification record

- JSON parse and generator schema/integrity gates: `f29` and `f29r` pass.
- Targeted generator build: `node scripts/build-product-pages.mjs f29 f29r`.
- Generated-page checks cover all seven languages, the three revised parameters,
  exactly five gallery images, a panel image, four highlight image references,
  and no unresolved template placeholder.
- `node --check scripts/build-product-pages.mjs`, `node --check frontend/assets/js/site-data.js`, and `git diff --check` pass.
- Post-build SHA-256 checks confirm the two workbooks and `site-data.js` remain
  identical to the baseline above; generated changes are limited to the two
  requested pages, their two requested JSON sources, and this report.
