# D18 S300R 预览制作

日期：2026-08-02
范围：仅新增一个未接入的 S300R 产品世界预览候选；不修改车型 JSON、`site-data.js`、来源索引、HTML、共享 CSS 或共享 JS。

## 使用资产

| 项目 | 路径 / 值 |
| --- | --- |
| 身份锚点 | `frontend/assets/img/products/s300r/s300r-front-dark-industrial-wide-v3.png` |
| 正式候选 | `frontend/assets/img/product-world-previews/s300r-preview-headlight-v1.png` |
| 格式与尺寸 | PNG，887 × 1774 px，竖版 1:2 |
| SHA-256 | `d4bcd9feeabeb3e84583e79ed1438d65c14506532e85cc2997972d73b38f59ab` |
| 制作方式 | 内置 ImageGen，以正面身份锚点为 reference image；未覆盖既有资产 |

## 身份与门禁检查

- 车型身份：保持 S300R 的蓝黄车身、黑色正面号牌与黄色 S 图案、蓝色前挡泥板、银色前叉、蓝黄前叉护板、黑色车把、越野前胎、脚踏及两冲程膨胀室轮廓。
- 构图：严格正面，车把两端、完整前轮、前叉和两侧脚踏均在画面内；顶部保留无字 HTML 文字安全区。
- 场景：暗黑工业金属长廊、局部红色轮廓光、轻微烟雾和湿地反射；未出现整幅红洗。
- 禁止项：无人、无叠加 Logo、无文字、水印、CTA 或第二辆车；候选未接入 `main.js`。

## 结论

**通过（正式候选资产资格）**。该图满足身份和统一预览门禁；S300R 图片来源仍 Pending，因此不表述为官方来源。正式接入仍需独立共享 JS 接入任务及页面断点、七语言和 RTL 验证。
