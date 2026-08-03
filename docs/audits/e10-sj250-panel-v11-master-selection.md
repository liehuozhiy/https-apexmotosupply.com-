# E10 SJ250 Panel 最终指定图切换

日期：2026-08-02

## 用户纠正

用户确认最终应采用：

`frontend/assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-master.png`

而不是此前引用的：

`frontend/assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2-master.png`

## 资产核验

- 文件存在，大小 2,226,773 bytes。
- SHA-256：`9a5259a5d4a9083969e5ad834574bd83e43d3b2250139b0b30f64c2e459f1b2d`。
- 图片内容为完整 SJ250 左前 3/4 车型、暗黑工业环境、局部红光及湿地反射。

## 修改范围

- `frontend/product-detail/data/sj250.json`：Panel 数据源改为最终指定图。
- `frontend/assets/css/product-detail.css`：SJ250 桌面和平板专用图层均改为最终指定图。
- `frontend/product-detail/template.html`：CSS 查询版本升至 v29，避免缓存旧图路径。
- `frontend/pages/sj250.html`：通过生成器定向重建，未手工修改。

未修改其他车型 JSON、共享 JavaScript、图片文件或部署目录。

## 验证

- `node --check scripts/build-product-pages.mjs`：通过。
- `node scripts/build-product-pages.mjs sj250`：通过。
- `git diff --check`：通过。
- 生成页引用 `product-detail-v29`，Panel 内联数据路径为 `v11-master.png`。
- Playwright 2560 × 1440 实际渲染中，Panel 背景清晰可见。
- 浏览器静态请求确认 `sj250-hero-panel-industrial-red-v11-master.png` 返回 HTTP 200。
- 验证截图：`output/playwright/sj250-panel-e10-v11-master-2560.png`。

结论：SJ250 Panel 已统一采用用户最终指定的 `v11-master.png`，不再使用 `v11-v2-master.png`。
