# 阶段 D：ER3 预览整改

日期：2026-08-02
范围：仅新增 ER3 产品世界预览 v3 候选；不修改车型 JSON、`site-data.js`、来源索引、HTML、共享 CSS 或共享 JS。

## 历史问题与修正

旧 `er3-preview-headlight-v2.png` 已判退：它在 ER3 的无灯黑色前号牌处虚构了发光头灯，且车辆主体过大，压缩了顶部安全区。v2 保留为历史证据，不覆盖或接入。

## 使用资产

| 项目 | 路径 / 值 |
| --- | --- |
| 身份锚点 | `frontend/assets/img/gallery-corrected-v1/er3/er3-angle-01-front-v2.png` |
| 新候选 | `frontend/assets/img/product-world-previews/er3-preview-headlight-v3.png` |
| 格式与尺寸 | PNG，887 × 1774 px，竖版 1:2 |
| SHA-256 | `c2cb506fed966e54d6b29f46e7543ba85d97f9d3eecd93cdbaa376ee799c1b96` |
| 制作方式 | 内置 ImageGen，以正面身份锚点为 reference image；未覆盖既有资产 |

## 门禁检查

- 身份：保留黄色外框、**无灯的黑色前号牌**、黑色前挡泥板、黑色前叉、黄色/黑色侧护板、车把、越野轮胎和脚踏；未生成头灯、发光透镜或灯条。
- 构图：严格正面，车把两端、完整前轮和两侧脚踏均在画面内；车型主体锁定在下半区，顶部形成大面积无字安全区。
- 场景：暗黑工业金属长廊、局部红色边缘光、轻微烟雾和湿地反射；无整幅红洗。
- 禁止项：无人、无叠加 Logo、无文字、水印、CTA 或第二辆车；未接入 `main.js`。

## 结论

**通过（正式候选资产资格）**。v3 修复了 v2 的身份与构图问题；ER3 图片来源仍 Pending，因此不表述为官方来源。正式接入仍需独立共享 JS 接入任务及页面断点、七语言和 RTL 验证。
