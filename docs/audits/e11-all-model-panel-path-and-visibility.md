# E11 全车型 Panel 路径与可见性修复

日期：2026-08-02

## 范围

按用户要求，将 SJ250 Panel 的本地显示问题扩展核对到全部 27 个产品详情页。未替换其他车型的 Panel 资产、未修改车型业务数据、共享 JavaScript 或图片文件。

## 根因

1. SJ250 之外的 26 个已生成页面仍使用 `/assets/img/...`。该根目录 URL 在 HTTP 服务可用，但在 `file:///frontend/pages/*.html` 中会指向磁盘根目录而失效。
2. 初次批量重建后，生成器将内联 CSS 变量写为 `../assets/img/...`。该 URL 被 `frontend/assets/css/product-detail.css` 的 `background` 属性消费时，浏览器按 CSS 文件目录解析，实际请求为 `/assets/assets/img/...`，导致 404。
3. 通用背景层的遮罩与裁切也让已加载图片几乎不可辨认。

## 修复

- `scripts/build-product-pages.mjs` 现将 Panel URL 转换为相对于 `frontend/assets/css/product-detail.css` 的 `../img/...`。
- 全量重建 27 个详情页；每页的内联 `--product-panel-image` 均为 CSS 可解析的相对路径。
- 调整通用桌面与平板 Panel 的背景大小、定位和遮罩，以保留车型可见度及文字对比。
- 产品详情 CSS 查询版本升至 `20260802-product-detail-v31`，避免旧路径或旧遮罩被浏览器缓存。
- SJ250 的专用最终图片覆盖继续使用用户指定的 `sj250-hero-panel-industrial-red-v11-master.png`。

## 验证

- `node --check scripts/build-product-pages.mjs`：通过。
- `node scripts/build-product-pages.mjs --all`：27/27 成功。
- 静态解析：27/27 生成页均使用 `../img/...`，对应文件全部存在，全部引用 v31 CSS。
- `git diff --check`：通过。
- HTTP 浏览器请求：SY300 Panel WebP 返回 200；此前的 `/assets/assets/...` 404 已消除。
- 实际渲染：Babey（PNG）、F4（WebP）、SY300（WebP）在 2560px 桌面宽度均显示车型；F4 在 768px 平板宽度显示车型且文字可读、控制台 0 错误。
- 证据截图：`output/playwright/panel-batch-babey-v31-2560.png`、`output/playwright/panel-batch-f4-v31-2560.png`、`output/playwright/panel-batch-sy300-v31-2560.png`、`output/playwright/panel-batch-f4-v31-768.png`。

结论：全车型 Panel 已统一使用可同时满足 HTTP 与 `file:///` 的 CSS 相对路径，并恢复了可辨认的背景车型图。等待用户对本机本地文件页面进行集中视觉复验。
