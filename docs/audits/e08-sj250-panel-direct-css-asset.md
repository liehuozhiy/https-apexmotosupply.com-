# E08 SJ250 Panel 直接 CSS 资源引用

日期：2026-08-02

用户继续报告 SJ250 Panel 背景在本地页面中不可见。为排除 Panel 伪元素中自定义属性未呈现的差异，仅在 SJ250 的平板断点专用规则中，将图片层改为直接引用用户指定的 master PNG：

`url("../img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2-master.png")`

该 URL 相对于 `frontend/assets/css/product-detail.css` 解析，实际文件为 `frontend/assets/img/sj250-gallery/...`，同时适用于 HTTP 和本地文件路径。通用车型规则仍保持 `var(--product-panel-image)`，未被改动。

## HTTP 资源验证

临时静态服务下列请求均返回 200：

- `/pages/sj250.html`
- `/assets/css/product-detail.css`
- `/assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2-master.png`

临时服务已停止。内置浏览器策略仍不允许本地页面视觉检查，故 HTTP 状态码验证不替代人工可视验收。`git diff --check` 通过。
