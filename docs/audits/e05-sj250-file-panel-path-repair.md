# E05 SJ250 本地文件 Panel 路径修复

日期：2026-08-02

## 缺陷

用户在 `file:///.../frontend/pages/sj250.html` 中发现右上规格 Panel 的摩托车背景缺失。页面内其他 `../assets/...` 图片正常显示。

## 根因

`sj250.json` 的 `panelImage` 已是正确的 `../assets/...` 相对路径，但 `scripts/build-product-pages.mjs` 的 `toPanelSiteAssetUrl()` 将 Panel 专门转换为 `/assets/...` 根路径。该 URL 仅适用于 HTTP 站点根目录；从 `file:///.../pages/sj250.html` 打开时会解析到磁盘根目录而非项目 `frontend/assets`。

## 修复范围

- 修改 `scripts/build-product-pages.mjs`：Panel 保留经验证的页面相对资产路径，而不转换为站点根路径。
- 仅执行 `node scripts/build-product-pages.mjs sj250`，重建 `frontend/pages/sj250.html`。
- 未修改 SJ250 JSON、共享 CSS/JS、图片资产或其他车型页面。

## 验证

- `node --check scripts/build-product-pages.mjs` 通过。
- 定向构建成功。
- 生成页包含 `--product-panel-image:url('../assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2.webp')`。
- 旧 `/assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2.webp` 根路径不存在于生成页。
- 目标 WebP 文件存在。
- `git diff --check` 通过。

## 待补验

请在可直接打开本地文件的浏览器重新打开 SJ250 页面，确认右上 Panel 背景显示。内置浏览器仍不能执行该 `file:///` 可视化复验。
