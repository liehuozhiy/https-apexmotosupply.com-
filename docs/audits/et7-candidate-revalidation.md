# ET7 v2 产品世界预览候选复验

- 复验日期：2026-08-02（Asia/Shanghai）
- 任务性质：只读候选复验；不生成、修改、复制、移动或接入资产。
- 唯一候选：`et7-preview-headlight-v2.png`
- 最终结论：**通过候选资产资格**。该结论不等于正式接入，也不替代后续由前端负责人完成的 1440 悬停实显验收。

## 1. 候选文件事实

| 项目 | 值 |
| --- | --- |
| 绝对路径 | `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/product-world-previews/et7-preview-headlight-v2.png` |
| SHA-256 | `fd7326e93165a8f2e7fa6782c11ec4519b61b68b815db57136737ff5bcf7e16d` |
| 文件大小 | 1,534,830 bytes |
| 尺寸 | 887×1774 px |
| 格式 | PNG |
| 宽高比 | 0.5000（精确 1:2） |
| 当前状态 | 主项目存在；未验收、未接入产品世界映射 |

## 2. 身份对照基线

当前 `frontend/product-detail/data/et7.json` 的 SHA-256 为 `d9a6c8e57323a207022546abb59efdea84dc9a54862d7e3efe9a505edfb5b895`。JSON 固定五图中的正面和左前 3/4 图用于本次车型身份锁定。

| 身份资产 | SHA-256 | 尺寸 / 格式 | 对照作用 |
| --- | --- | --- | --- |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/catalog-dark-studio/et7-gallery-01-front-v1.png` | `8ccb09f2b3ff5ba107c5146fe7fb77ac742a17477adf5a1cc2168afe6ad7f149` | 1942×809 / PNG | JSON 直接引用的正面身份图；核对双镜、车把、头灯、橙色侧灯、前叉、叉护板、前轮、脚踏和支架 |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/catalog-dark-studio/et7-gallery-02-left-front-sample-v1.png` | `8e77ef6271658bd7b6d00987a4eb5267912289360544ad476881e17f253a59b4` | 1942×809 / PNG | JSON 直接引用的左前 3/4 图；核对角形前灯罩、黑色车架/电池舱、长座垫、辐条轮和盘刹结构 |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/products/3.4/et7.png` | `d7357a6f573c87e6ce79a1542310581315b29649d1751cd66c7421acbef834a4` | 1448×1086 / PNG | 补充真实产品结构：黑色长座垫、三角框架/电池舱、前后辐条轮、盘刹、单侧支架及角形灯罩 |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/products/et7.jpg` | `0c04087c9b1720abda5169786692525ee5ebd8b5e9c0bb00de79b7b49f2884c3` | 1600×1100 / JPEG | 补充侧视比例、车架、电池舱、摇臂、尾架和轮组身份 |

## 3. 身份一致性判断

| 身份锚点 | 候选观察 | 对照结果 |
| --- | --- | --- |
| 前灯罩与灯具 | 黑色多折面角形灯罩，中央嵌入式透明灯具并点亮 | 与 JSON 正面/左前图的灯罩外轮廓和灯具位置一致 |
| 后视镜与车把 | 左右各一黑色后视镜，宽车把和控制总成完整 | 与 JSON 正面图一致 |
| 橙色侧灯/反光件 | 头灯两侧各一橙色圆形件 | 与 JSON 正面及 3/4 图的位置、颜色一致 |
| 前叉与护板 | 黑色双前叉，下部银色护板带黄色闪电形标记 | 与 JSON 正面/3/4 图一致 |
| 前轮 | 窄幅粗齿越野胎、辐条轮、盘刹结构 | 与 JSON 图库及产品身份图一致 |
| 脚踏和支架 | 两侧脚踏可见；观察者右侧单支架落地 | 与 JSON 正面图和 `products/3.4/et7.png` 一致 |
| 车身类型 | 黑色电动越野车，未混入燃油发动机、排气或其他车型外壳 | 与 ET7 的电池舱/电驱身份一致 |

结论：候选的车型结构、附件数量和相对位置均能由 ET7 身份图闭环。未发现虚构头灯、替换面罩、错用轮组、缺失后视镜、混入其他车型发动机/排气或改变支架位置等关键冲突。

## 4. 统一预览门禁

| 门禁项 | 观察 | 结果 |
| --- | --- | --- |
| 约 1:2 竖版 | 887×1774，宽高比 0.5000 | 通过 |
| 无字底图 / HTML 文字层安全 | 图片无标题、参数、CTA 或叠加文字；上部留有大块纯暗安全区 | 通过 |
| 正面车型 | 车辆为头正视角，车轮沿画面中轴，非侧视或 3/4 假正面 | 通过 |
| 完整车辆 | 双镜、车把、头灯、前轮、两侧脚踏及支架均在画布内，无裁切 | 通过 |
| 车型尺度 | 主体在纵向画布中部偏下，缩略时仍能辨认灯具、轮胎和双镜；底部余量充足 | 通过 |
| 车灯能力 | 身份图明确存在头灯；候选仅点亮原有中央灯具，没有虚构新灯位 | 通过 |
| 暗黑工业环境 | 黑色金属长廊/门板结构明确 | 通过 |
| 局部红灯 | 两侧各一窄红灯，红色集中在边缘与地面反射，未使整幅发红 | 通过 |
| 烟雾与湿地反射 | 车辆后方有轻微暗雾/颗粒，地面湿亮并反射红灯和前灯 | 通过 |
| 人物 / Logo / 水印 / CTA | 未见人物、外加 Logo、水印或 CTA | 通过 |
| 黑边与画布异常 | 图像内容填满画布，无额外信箱黑边 | 通过 |

静态门禁：**11/11 通过**。

## 5. 最终结论与边界

### 结论：通过候选资产资格

ET7 v2 的文件事实可复核，车型身份与 `et7.json` 图库闭环，统一静态门禁全部通过。因此建议将其列为“可进入前端负责人集中接入与实显复验”的候选。

仍未完成、不得由本报告代替的事项：

1. 尚未修改 `main.js`，因此当前不是正式采用资产。
2. 尚未执行 1440 悬停实际加载、HTML 标题/八字宣传语重叠、容器裁切及横向滚动验证。
3. 若集中接入时出现实际裁切或文字安全区问题，应由前端负责人先记录实显证据；本任务不修改 CSS/JS 或候选图片。

## 6. 无变更声明

- 未修改、复制、移动、删除或生成任何图片资产。
- 未修改 `et7.json`、`site-data.js`、`source-audit-index.json`、共享 CSS/JS、HTML、`CODEX_HANDOFF.md` 或 `TASKS.md`。
- 未构建、部署、暂存、提交、推送、回退或清理。
- 本任务唯一写入为本报告。
