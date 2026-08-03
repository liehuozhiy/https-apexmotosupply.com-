# F9 产品世界候选复验

- 复验日期：2026-08-02（Asia/Shanghai）
- 范围：只读复验当前主项目 F9 v1 产品世界预览候选，并与当前 `f9.json` 图库身份锚点对照。
- 最终结论：**通过候选复验**。该结论表示候选可进入负责人集中接入及 1440 浏览器复验，不表示本报告已修改映射或完成正式接入。

## 候选文件

| 项目 | 结果 |
| --- | --- |
| 绝对路径 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\product-world-previews\f9-preview-headlight-v1.png` |
| SHA-256 | `ea1f7724ac95d4d9afb95f33ccc81aa3c0703d3c0859a33869c83efbeccc5eb0` |
| 格式 | PNG |
| 尺寸 | 853 × 1844 px |
| 文件大小 | 1,567,278 bytes |
| 宽高比 | 0.463，接近 1:2 竖版 |

候选文件可正常解码，无黑边、透明空洞、文字叠层、水印或 CTA。

## 当前车型身份依据

当前只读数据文件：

- `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\product-detail\data\f9.json`
- SHA-256：`2cacc50a011bb9634685211f4bbb3eea3925fdcc9c6f16f4611b0a6555519db0`
- 当前身份：F9，`TIME-F SERIES`，电动越野车型；9 kW、72V60Ah，前后轮规格 90/90-21 与 140/80-18。

本次直接目视对照的当前图库锚点：

| 角度 | 绝对路径 | SHA-256 | 尺寸/格式 |
| --- | --- | --- | --- |
| 正面 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\f9-detail\f9-gallery-01-v2.png` | `38ccf5dbd8248d2c53184e65d4414ef015de0cc00ac9812e972490ccce3db449` | 1942 × 809 PNG |
| 左前 3/4 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\f9-detail\f9-gallery-02-v2.png` | `b708e0b8d5691a8bf37cd6cacfa0e754e2c4d3a0307097b345aadb8d9c65cc36` | 1942 × 809 PNG |
| 左侧 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\f9-detail\f9-gallery-03-v2.png` | `016d16ae49b9ce4f9c4e0f67dff5d1edcb116725ab156bb6ef82d998e48518e1` | 1944 × 809 PNG |
| 产品身份辅助图 | `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\products\3.4\f9.png` | `e3a0a879f70c0c99d2b503e0b6d66103540d1176d575eb45db8ddc366e9aaac7` | 1448 × 1086 PNG |

## 车型一致性判断

候选与当前身份锚点的可见关键结构一致：

- 同为正面构图，保留双圆后视镜、镜杆位置、车把控制件与左右转向灯。
- 白色前罩、蓝橙双侧条纹、中央多边形头灯及点亮状态与当前正面图库一致。
- 橙色车架、白橙蓝侧壳、前叉护板图形、前轮与前制动结构一致。
- 左前图库确认其为带后视镜、头灯、转向灯和后牌架的电动越野车型；候选没有混入燃油车排气结构或其他车型外观。
- 候选没有改变车型颜色体系、车灯结构或主要车身轮廓。未发现可判定为另一车型的结构冲突。

因此，车型身份一致性判定为：**通过**。

## 统一资产门禁

| 门禁项 | 结果 | 说明 |
| --- | --- | --- |
| 约 1:2 竖版 | 通过 | 853 × 1844，宽高比 0.463。 |
| 顶部 HTML 文字安全区 | 通过 | 车辆上方保留大面积干净暗区，无图内文字。 |
| 完整真实车型正面 | 通过 | 后视镜、车把、脚踏和前轮均完整，无边缘裁切；后部仅因正面透视自然遮挡。 |
| 车型身份 | 通过 | 头灯、前罩、镜组、车架、配色和前叉细节与当前图库对应。 |
| 灯具能力 | 通过 | 当前图库明确存在同结构头灯、转向灯与后视镜；候选点亮头灯没有增加无依据灯具。 |
| 暗黑工业环境 | 通过 | 黑色工业长廊，纵深明确。 |
| 局部红光、烟雾、湿地反射 | 通过 | 红光集中于两侧与地面反射，主体没有整幅红洗。 |
| 无人物、Logo、水印、CTA | 通过 | 未见人物、外加 Logo、水印、按钮或宣传文字；车身原有装饰图形不属于叠加文字层。 |
| 无黑边/异常留白 | 通过 | 画布填充完整；顶部留白属于预览文字安全区。 |
| 1440 实际悬停加载与文字重叠 | 待集中接入复验 | 本任务禁止修改 `main.js`、CSS 或 HTML，未进行接入和浏览器验证；不影响候选资产本身通过。 |

## 决策

`f9-preview-headlight-v1.png` **通过候选复验**，可交由前端负责人集中接入，并在接入后完成 1440 悬停实际加载、标题/宣传语重叠、横向滚动与请求状态检查。

本任务未生成图片，未复制、移动或修改任何资产；未修改 `f9.json`、`site-data.js`、来源索引、CSS、JavaScript、HTML、`CODEX_HANDOFF.md` 或 `TASKS.md`。
