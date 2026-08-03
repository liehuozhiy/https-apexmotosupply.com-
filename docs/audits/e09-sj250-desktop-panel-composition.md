# E09 SJ250 桌面 Panel 构图修复

日期：2026-08-02

## 问题确认

用户最新截图仍未显示可辨认的摩托车。浏览器对照发现，截图虽然输出宽度约为 1014px，但其内部布局为桌面断点：右侧四项卖点纵向排列、底部四项参数横向排列。该构图对应 2560px 页面视口中约 1014px 宽的右侧 Panel，实际命中 `min-width:65.01rem`，因此此前仅针对 `48.01rem–65rem` 的平板覆盖不会生效。

指定原图 `frontend/assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2-master.png` 已直接检查，车型与暗黑工业红光场景完整，问题不是文件缺失或图片内容错误。

## 最小修复

- 在 `frontend/assets/css/product-detail.css` 中新增仅匹配 `body.model-sj250` 的桌面断点覆盖。
- 桌面图层继续直接引用用户指定的 master PNG，调整为 `100% auto` 构图并减弱多层暗色遮罩，使车身落在左中部可视区域。
- 保留右侧卖点、询盘入口和参数卡片的文字层级；不影响其他车型。
- 将 `frontend/product-detail/template.html` 的产品详情 CSS 查询版本从 v27 更新为 v28，避免浏览器继续复用旧样式缓存。
- 使用生成器仅重建 `frontend/pages/sj250.html`。

## 浏览器验证

在单个临时 HTTP 服务和单个 Playwright 会话中验证：

- 1440px 视口：SJ250 车身在桌面 Panel 左中部清晰可见，内容可读。
- 2560px 视口：Panel 截图宽度约 1014px，与用户截图尺寸及布局相符；车把、前轮、车身和红色工业背景可辨认。
- 控制台：0 错误、0 警告。
- 验证截图：`output/playwright/sj250-panel-e09-after-desktop.png`、`output/playwright/sj250-panel-e09-2560.png`。
- 临时服务和浏览器会话均已停止。

## 静态验证

- `node --check scripts/build-product-pages.mjs`：通过。
- `node scripts/build-product-pages.mjs sj250`：通过。
- 生成页已引用 `product-detail-v28` 和指定 master PNG。
- `git diff --check`：通过。

结论：桌面断点的真实根因已修复；HTTP 实际渲染通过，等待用户在本机 `file:///` 页面进行最终视觉确认。
