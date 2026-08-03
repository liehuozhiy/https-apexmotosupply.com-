# E07 SJ250 Panel 指定 Master PNG

日期：2026-08-02

用户明确指定 `sj250-hero-panel-industrial-red-v11-v2-master.png` 为正确的 SJ250 Panel 背景来源。

已将 `frontend/product-detail/data/sj250.json` 的 `panelImage` 从 WebP 切换至该相对 PNG 路径，并只重建 `frontend/pages/sj250.html`。

验证：目标 PNG 存在；生成页包含 `../assets/img/sj250-gallery/sj250-hero-panel-industrial-red-v11-v2-master.png`；不再包含旧 WebP 引用；生成器语法检查、目标构建和 `git diff --check` 通过。
