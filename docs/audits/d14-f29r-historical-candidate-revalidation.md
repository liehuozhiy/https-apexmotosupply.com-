# D14 F29R 历史候选复验

日期：2026-08-01
范围：仅复验旧 F29R worktree 的产品世界预览候选；未复制、移动、删除或修改任何 worktree、车型数据、共享文件或图片资产。

## 候选固定信息

| 项目 | 值 |
| --- | --- |
| 旧 worktree | `C:\Users\Administrator\.codex\worktrees\fa6a\apex-moto-static`（detached，`ff385827dde1d44efde4de70bf1a2507f7bed84e`） |
| 候选绝对路径 | `C:\Users\Administrator\.codex\worktrees\fa6a\apex-moto-static\frontend\assets\img\product-world-previews\f29r-preview-headlight-v1.png` |
| 格式 | PNG（文件头 `\x89PNG\r\n\x1a\n`） |
| 尺寸 | 887 × 1774 px（约 1:2 竖版） |
| 文件大小 | 1,954,957 bytes |
| SHA-256 | `b693fdb446d444b1a7c7b6921c0da1eff612a03660d694757dd0749b1abcd3d8` |
| 主项目状态 | 主项目同路径缺失；`frontend/assets/js/main.js` 尚无 F29R 预览映射。本项复验不执行接入。 |

上述路径和哈希也与既有只读历史盘点 `docs/audits/historical-worktree-diff.md` 的 F29R 条目一致。

## 身份参照与比对依据

主项目的 `frontend/product-detail/data/f29r.json` 将车型明确为 `id: "f29r"`、`name: "F29R"`、`series: "TIME-F SERIES"`、`powerType: "electric"`；其现行图库采用 F29R 五视图。用于本次视觉身份核验的最小参照如下：

| 参照 | 绝对路径 | 格式 / 尺寸 | SHA-256 | 用途 |
| --- | --- | --- | --- | --- |
| 现行正面图 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\f29r-gallery\f29r-angle-01-front-dark-wide-ai-v3.png` | PNG / 1944 × 809 px | `e5d7a07178727da14f3eb0b92fcf2a644a8c3acd907711e6c2186c2cc443f48d` | 正面比例、前灯、前叉、挡泥板和配色比对。 |
| 官方左侧图 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\f29r-gallery\f29r-angle-03-left-official.jpg` | JPEG / 1600 × 1100 px | `ddb78f4b45bd8f7e26b8653dd610576301265a4e7cf98005562ca95275c395fa` | 车型级金黑涂装、车架/前叉、橙色后减震与越野轮组的独立身份依据。 |

## 视觉核验结果

| 核验项 | 观察 | 结论 |
| --- | --- | --- |
| 车型身份 | 候选的金黑图形涂装、细长黑色中置前灯罩、银色双前叉、橙色叉护与现行正面图相符；官方左侧图可交叉确认相同的金黑车身、银色车架/前叉、橙色悬挂细节和全尺寸越野轮组。候选挡泥板上还保留可辨的 `F29R` 车型标记。 | 一致。 |
| 车型类别 | 候选为无内燃机外露的电动越野车形态，符合 JSON 的 Time-F 电动越野身份；未混入燃油 SJ 系列或其他车型的车身结构。 | 一致。 |
| 正面构图 | 车把、前叉、脚踏、前后可见车体和前轮均在画布内，无黑边或车辆裁切。顶部存在大面积无字安全区，适合由 HTML 叠加标题。 | 通过。 |
| 预览风格 | 黑色工业墙面、局部红色竖灯、湿地反射及无人物/CTA/水印，符合产品世界预览的暗黑工业要求。车辆自身的 `F29R` 标记不属于叠加水印。 | 通过。 |

## 结论

**可接收（仅限历史候选资产资格）**。`f29r-preview-headlight-v1.png` 已满足 F29R 身份一致性、整车完整性和产品世界预览的基础构图要求；没有发现足以触发判退或重新出图的身份冲突。

本结论不等同于正式接入：后续如要上线，仍须由拥有 `main.js` 映射权限的任务单独完成接入与页面断点/七语言/RTL 验证。本任务未进行任何资产迁移或接入。
