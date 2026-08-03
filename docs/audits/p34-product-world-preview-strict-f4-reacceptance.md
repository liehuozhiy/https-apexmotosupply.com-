# P34 产品世界下拉预览严格 F4 复验

日期：2026-08-02

## 范围

重新验收 `frontend/assets/js/main.js` 当前映射的 27 张产品世界下拉卡片图片。本任务只生成审计结论，不修改映射、图片、车型 JSON、CSS、模板或页面。

## F4 实际卡片基准

本次不再以“文件存在、HTTP 200、源图约 1:2”作为通过条件，而以 1440px 浏览器中 F4 的实际下拉卡片为唯一视觉标准：

- 卡片约为 264 × 512 px；上方系列、车型名和宣传语约占前 32% 安全区。
- F4 图片另有专用 `scale(1.15)` 与 `transform-origin: 50% 12%`，因此其实际车把约落在卡片 34%–36% 高度。
- 脚踏约落在 76%–82%，前轮接近 96%–100% 底边。
- 车辆正面居中，车把、前轮、脚踏完整；已证实存在灯具的车型应开灯。
- 暗黑工业长廊、局部红光和湿地反射存在，但不能压过车型主体。

## 结论

严格结果：**通过 1，判退／需重制 26**。上一轮 P33 只证明 27/27 文件存在并可通过 HTTP 读取，不能证明构图一致；P33 的视觉收口结论被本报告取代。

| 车型 | 当前映射 | 结论 | 主要问题 |
| --- | --- | --- | --- |
| Babey | `babey-preview-headlight-v3.png` | 判退 | 车把位置接近，但脚踏和前轮明显高于 F4，整车占比偏小。 |
| Babey+ | `babey-plus-preview-headlight-v5.png` | 判退 | 车身偏短偏窄，前轮未贴近卡片底边。 |
| Bumblebee | `bumblebee-preview-headlight-v5.png` | 判退 | 整车最小，前轮落点过高，大片下方空间与 F4 不一致。 |
| ER3 | `er3-preview-headlight-v3.png` | 判退 | 前部身份与亮灯不清晰，构图过低且过窄，不能作为 F4 正面标准图。 |
| ER5 | `er5-preview-headlight-v3.png` | 判退 | 车辆过高，车把／上部结构进入标题安全区；锚点整体上移。 |
| ER7 | `er7-preview-headlight-v2.png` | 判退 | 后视镜和车把侵入标题安全区，整车上移且侧撑可见。 |
| ES11 | `es11-preview-headlight-v2.png` | 判退 | 车辆上移、黑色主体可读性不足，灯具效果不清晰。 |
| ET | `et-preview-headlight-v1.png` | 判退 | 车把接近基准，但脚踏与前轮落点偏高，整车仍偏小。 |
| ET 2022 | `et-2022-preview-headlight-v3.png` | 判退 | 与 ET 相同，车辆高度和底部落点未达到 F4 卡片比例。 |
| ET 2024 | `et-2024-preview-headlight-v2.png` | 判退 | 车把过高并逼近文字层，整车纵向位置不一致。 |
| ET3 | `et3-preview-headlight-v2.png` | 判退 | 车辆过低、过窄且占比不足，头部和轮胎锚点均偏离。 |
| ET5 | `et5-preview-headlight-v1.png` | 判退 | 车辆过小、过低，前灯可读性不足。 |
| ET7 | `et7-preview-headlight-v3.png` | 判退 | 后视镜进入标题区，侧撑可见，车辆宽度与 F4 差异明显。 |
| ET9 | `et9-preview-headlight-v2.png` | 判退 | 车把与前脸整体过高，侵占标题／宣传语安全区。 |
| F4 | `f4-preview-headlight-centered-v6.png` | **通过／基准** | 实际卡片位置、占比、灯光、环境和完整性均作为本轮基准。 |
| F4+ | `f4-plus-preview-headlight-v2.png` | 判退 | 车辆明显过高，车把进入标题区；无已证实灯位不是本次判退主因。 |
| F9 | `f9-preview-headlight-v1.png` | 判退 | 车辆过高，标题安全区不足，前轮落点仍高于 F4。 |
| F29 | `f29-preview-headlight-v4.png` | 判退 | 车把过高且整车过大，车型上部与文字层冲突风险高。 |
| F29R | `f29r-preview-headlight-v1.png` | 判退 | 车身过短偏小，脚踏和前轮底部明显高于 F4。 |
| H300 | `h300-preview-headlight-v3.png` | 判退 | 风挡／车把过高，进入标题安全区，纵向锚点整体上移。 |
| HS85 | `hs85-preview-headlight-v3.png` | 判退 | 车辆过小过窄，前轮落点过高，灯具表现不清晰。 |
| S300 | `s300-preview-headlight-v3.png` | 判退 | 车辆显著过高，车把直接进入标题／车型名区域。 |
| S300R | `s300r-preview-headlight-v2.png` | 判退 | 车辆过低、过小，主体宽度与 F4 差异过大。 |
| SJ250 | `sj250-preview-headlight-v1.png` | 判退 | 接近但仍整体偏高，前轮底部和脚踏未达到 F4 落点。 |
| SJ300 | `sj300-preview-headlight-v3.png` | 判退 | 车体偏窄偏高，底部落点不足，四锚点未与 F4 对齐。 |
| SN300 | `sn300-preview-headlight-v5.png` | 判退 | 车辆显著过高，车把侵入文字安全区。 |
| SY300 | `sy300-preview-headlight-v2.png` | 判退 | 整车偏小偏短，前轮底部过高，左右宽度不足。 |

## 后续建议

按车型逐张制作新的版本化资产，优先解决标题安全区冲突最严重的 S300、SN300、F29、F4+、ER5、ER7、ET9、H300，再处理过小／过低的 Bumblebee、ET3、ET5、F29R、HS85、S300R、SY300。每张新图必须在实际下拉卡片中与 F4 并排验收，不能再以源图或 HTTP 可达代替视觉门禁。
