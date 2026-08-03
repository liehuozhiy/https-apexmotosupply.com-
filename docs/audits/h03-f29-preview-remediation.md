# H03 F29 预览候选整改与接入

日期：2026-08-02

旧 v1/v2 因白红蓝错误车型身份判退并保留。本任务使用 F29 官方正面和左侧图作为身份参照，仅生成一次新 v3：黑金前罩、紧凑三角灯组、黑金叉护、黑橙电动结构、完整车把/前轮/脚踏、顶部无字安全区、暗黑工业走廊与局部红光/湿地反射均符合门禁。

- 新文件：`frontend/assets/img/product-world-previews/f29-preview-headlight-v3.png`
- 尺寸：887 × 1774（1:2）
- SHA-256：`0f9adfdbd969328e0e51f5c7ffc4b63b10a0ff541d56be61f9c3c9fe11e199b9`
- 映射：`f29.html` 已登记到 `main.js`；`deploy/` 同步哈希一致。

验证：`node --check`（源与 deploy）和 `git diff --check` 均通过。未修改 JSON、来源索引、CSS 或既有候选。

结论：通过并正式接入；产品世界预览覆盖 25/27。
