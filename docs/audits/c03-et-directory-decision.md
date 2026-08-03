# C03 ET 目录数据最小修订决策

日期：2026-08-01
范围：仅核对 `frontend/product-detail/data/et.json` 与 `frontend/assets/js/site-data.js`，并按 C02 已确认项目决定是否需要最小修订。

## 结论

不将 ET 新增到 `site-data.js` 的产品目录。本次不修改 `site-data.js`、任何车型 JSON、生成页、图片或共享 CSS/JS。

## 结构核对

`et.json` 是完整详情页记录：包含 `id`、车型/系列/动力类型、5 张图库、4 项亮点、技术参数分组、详情页文案和七语言翻译（`en`、`zh-CN`、`zh-TW`、`ru`、`ar`、`es`、`pt`）。

`site-data.js` 的 `products` 条目则是产品世界/列表的轻量卡片结构：`slug`、`model`、分类与系列、单张卡片图、各语言简介、4 项 highlights，以及二维 `specs` 数组。它不是详情 JSON 的同构副本；直接从 ET 详情数据推导并加入卡片，会新增未经权威车型清单确认的目录公开入口。

## 证据与决策

| 项目 | 发现 | 依据 | 决策 |
| --- | --- | --- | --- |
| C02 已确认同步项 | 仅 F29/F29R 的 6 项几何参数；ET 不在该清单 | `docs/audits/c02-dual-source-conflict-decision.md` | ET 无待同步字段 |
| ET 的双源状态 | ET 仅存在于详情 JSON，不在 `site-data.js` 26 条产品记录中 | `docs/audits/c01-dual-source-consistency.md` | 保持单侧状态 |
| 车型范围 | ET 被标记为“existing product page but not in Excel authoritative model list” | `frontend/product-detail/source-audit-index.json` 的 `existingOutsideExcel` | 没有 Excel 车型范围依据前，不扩展产品目录 |

因此，ET 的详情页继续保留，但不会以本次 C03 为由加入产品列表。日后只有获得 Excel 车型清单或等效人工产品范围确认后，才可单独创建目录接入任务，并补齐经确认的卡片文案、分类、单图和参数摘要。

## 验证

- 使用隔离临时副本定向生成 ET，成功输出 `frontend/pages/et.html`；输出 SHA-256 为 `a6c1652236303fa699b70df496a8dbee90135559db5122e4499e6c41ec53cf59`，与当前 ET 页面一致。
- `et.json` 的 5 张图库、4 张亮点图和 1 张 Banner 图共 10 个引用均存在，且都由当前页面引用。
- 7 个语言翻译映射完整；`frontend/assets/js/site-data.js` 与 `scripts/build-product-pages.mjs` 的 `node --check` 通过。
- 本任务不产生数据源修改；最终 `git diff --check` 另行通过。
