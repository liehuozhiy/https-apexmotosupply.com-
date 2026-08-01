# B07 P1 集中决策与数据更新

- 决策日期：2026-08-01（Asia/Shanghai）
- 范围：集中复核 B01–B06；只更新无需人工确认、证据明确且能同步七语言的内容字段。
- 决策口径：官网存在且车型身份一致时官网优先；官网缺项或无独立车型页时使用 Excel 模型列；身份、配置、标签含义、图片来源链或翻译可靠性不明确时保持 Pending，原值不动。
- 工作簿限制：B01–B06 已使用 `load_workspace_dependencies` 与 `@oai/artifact-tool` 精确核验下列单元格。本 B07 子任务未暴露 `load_workspace_dependencies`，直接导入 `@oai/artifact-tool` 返回 `Module not found`；因此没有再次直接打开工作簿，没有改动、导出或覆盖工作簿。下表把对应报告章节与其已核单元格记录作为二级证据。

## 基线

| 对象 | 基线 SHA-256 / 聚合状态 |
| --- | --- |
| `source-audit-index.json` | `ce9c84231966fd3b8062b9738037a3fb4119791e791cff14be1e8e2f4891cc41` |
| `sy300.json` | `2059d00859a67e884c96fcdbc4d2b73c3c7099e1a02885052cf07bdaa17fa655` |
| `h300.json` | `d110642153dc5faef7e5f04feef32131a2eb820ef89057d4296155fc8d5a0ed8` |
| `hs85.json` | `5a01442e4f0a2071c0beea802a3ce604d4189878439bb36e7f485daf1fb56db7` |
| `sj250.json` | `3162d1740da817e710f57ff4317eef336d6501d3cd7d1698cca55705085852c0` |
| `s300r.json` | `4e015089de501aaaa3a8918ed4d49fc8dd5336d2aa06b3e9ce6b477ca60446fe` |
| `s300.json` | `03470d164cb7cceb398f742aff4fa4c679f72ebc78d00a92d51e7a9e7f0f4422` |
| 官网核对更新簿 | `7e6e857fac88412a3786c1bc489662c06ff824230c441772acd00e3223215778` |
| 网页对比分析簿 | `d7f0c5ee8717a13dd6eaf61e5d4c6fd5fff5d55bd55d1612cba4b0e6cdb64076` |
| `frontend/assets/css/**` | 3 文件；清单聚合 `246f557ac4184026a71edc6eb23dbf7161051a16878c0853120197deea7f8068` |
| `frontend/assets/js/**` | 9 文件；清单聚合 `7894ce3508350c00cf5cbdf7999c7d363699595e73f741f4dbdd1a3ee0662b75` |
| `frontend/assets/img/**` | 839 文件；清单聚合 `c918daa4a517a265767aa0d0c1ea85ed09771c089ffae817282e1b4c337c388b` |

基线时集中报告不存在。两份工作簿、六款 JSON、索引及大量 CSS/JS/图片原本即为未跟踪或已有用户改动；本任务不改变其既有 Git 归属。

## SY300 决策矩阵

| # | 字段 / JSON 路径 | 基线当前值 | 问题 | 精确证据 | 建议采用值 | 人工确认 | 决策 | 实际更新 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SY-01 | `technical.groups[1].items[5].value`、`translations.*` | 标配无灯，预留前灯/尾灯插口，无转向灯 | 接口与转向灯状态无模型级证据 | B01《23 项参数》#14、《灯具专项》1–4；`S300!E16 = No (can be added)` | 标配无灯，可选装灯具 | 否 | 立即更新 | 是；七语言同步 |
| SY-02 | `highlights[2].title/description` | S300 系列 LED 前灯；订单配置 | Excel 只证明可加灯；官网系列图未写 LED，也未绑定 SY300 标配 | B01《灯具专项》3–4；S300 系列页及报告内系列前灯 URL | 暂保留原值，待确定“选配展示”口径 | 是 | 保留 Pending | 否 |
| SY-03 | `technical.groups[2].items[6].value` | 12 V 4 Ah 铅酸电池 | 与 Excel `10A12V` 实质冲突，容量单位和化学体系不明 | B01《23 项参数》#22；`S300!E24` | 不猜测；取得额定电压、容量和化学体系 | 是 | 保留 Pending | 否 |
| SY-04 | `stats[0]` | 300 cc | Excel/官网均无排量字段，型号名不可代替排量 | B01《排量专项》；`S300!E3:E25` 无排量；S300 系列页 | 取得铭牌/规格书后决定 | 是 | 保留 Pending | 否 |
| SY-05 | `gallery[0..4]`、`panelImage` | 生成图库与 Panel | 锚点到生成资产未闭环，`left-side` 疑似排气侧 | B01《图片身份链》；`S300!E1` SHA `3c78...ad2`；官方 SY300 右侧/车尾 URL；本地 `generated/sy300-gallery-wide-v3/` | 补齐逐资产链并复核角度 | 是 | 保留 Pending | 否 |
| SY-06 | `highlights[0].image` | `01-ybs300-engine-ai-v1.png` | 与 YBS400 图同哈希，不能证明 YBS300 部件身份 | B01《图片身份链》；本地两文件 SHA `933706...269` | 取得独立 YBS300 部件证据 | 是 | 保留 Pending | 否 |

## H300 决策矩阵

H300 现有七语言映射存在语言错位和重复键，无法可靠同步本轮文案调整；因此即使英文证据明确，也不做单语更新。

| # | 字段 / JSON 路径 | 基线当前值 | 问题 | 精确证据 | 建议采用值 | 人工确认 | 决策 | 实际更新 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H3-01 | `stats[0]` | 300 cc | 无独立排量字段 | B02《重点风险》1、《四项统计》S01；`H300!A3:B24` 无排量；官网 O1/O2 无 H300 页 | 删除或换成有来源统计项 | 是 | 保留 Pending | 否 |
| H3-02 | `intro` | Four-stroke 300-class... | `300-class` 由型号推断 | B02《其他公开事实》C02；同上 | 删除 300-class | 是；需七语言修复后同步 | 保留 Pending | 否 |
| H3-03 | `technical...Maximum torque`、`overview.miniSpecs[0]`、`highlights[0]` | 27 N·m torque | 原表标签为 Maximum power，虽单位像扭矩但语义未确认 | B02《技术参数》T19、《亮点》H01、《其他》C04；`H300!A21:B21` | 供应方确认 A21 标签后采用 | 是 | 保留 Pending | 否 |
| H3-04 | `technical...Starting battery` | 2 A lithium-ion battery | 原表标签为 `Mode`，用途/额定含义不明 | B02《技术参数》T21；`H300!A23:B23` | 确认字段名、A/Ah、电压和用途 | 是 | 保留 Pending | 否 |
| H3-05 | `sellingPoints[2].description` | 220 km stated endurance | 省略 ≤50 km/h 条件 | B02《四项卖点》V03；`H300!B17` | 220 km at ≤50 km/h | 否（事实）；但七语言错位 | 保留 Pending | 否 |
| H3-06 | `highlights[3].description` | ...for durable off-road riding | 耐久性能无来源；高位排气仅图像可见 | B02《亮点》H04、《图片身份》；`H300!B13` 仅支持后减长度；本地 `h300-highlight-04...png` | Rear shock and high-mounted exhaust layout | 是；图片身份与翻译均未闭环 | 保留 Pending | 否 |
| H3-07 | `page.description` | official wholesale specifications | 无 H300 官网页，official 声明不成立 | B02《其他》C01；官网 O1/O2 | 删除 official | 否（英文事实）；但七语言错位 | 保留 Pending | 否 |
| H3-08 | `technical.subtitle` | Official website data first... verified workbook | 官网映射不存在，verified 超出 Pending 状态 | B02《其他》C08；`source-audit-index.json models.h300.official` | 明示 Excel 转录且模型级待核验 | 否（英文事实）；但七语言错位 | 保留 Pending | 否 |
| H3-09 | `highlights[2].description` | spoked wheel assembly... | 辐条只由未闭环图片外观支持 | B02《亮点》H03、《图片身份》；`H300!B9:B10`,`B14` | 21/18-inch wheel sizes and chain drive | 是；需身份/翻译确认 | 保留 Pending | 否 |
| H3-10 | `gallery[0..4]`、`panelImage`、`highlights[*].image` | 当前 H300 资产 | Excel B2 嵌入图与现有身份资产未建立映射 | B02《图片身份》；`H300!B2` SHA `8b5c...930`；本地 `products/h300.jpg` 等 | 提取/映射原始身份图后复核 | 是 | 保留 Pending | 否 |

## HS85 决策矩阵

| # | 字段 / JSON 路径 | 基线当前值 | 问题 | 精确证据 | 建议采用值 | 人工确认 | 决策 | 实际更新 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HS-01 | `technical.groups[0].items[5].value`、`translations.*` | 95# 汽油 + 2T 专用机油，40:1 | 遗漏 Excel 的进口 Maxima 2T 赛用机油限定 | B03《三项差异》燃油、《技术参数》T6；`HS85CC!A9:B9` | 预混燃油：95# 汽油 + 进口 Maxima 2T 赛用机油，40:1 | 否；按 Excel 原文准确转录，不解释为强制/推荐 | 立即更新 | 是；七语言同步 |
| HS-02 | `technical.groups[2].items[4].label` | 干重 | Excel 明确是 Kerb Weight，与同页统计冲突 | B03《三项差异》质量、《技术参数》T21；`HS85CC!A27:B27` | 整备质量 | 否 | 立即更新 | 是；复用既有七语言“整备质量”词条 |
| HS-03 | `highlights[3].title/description/image/alt` | 铝合金脚踏及排泥/轻量化 | 无脚踏材质或性能来源；官网亮点无脚踏 | B03《三项差异》脚踏、《亮点》H4、《图库与亮点》；HS85 官网 URL；本地 `04-alloy-footpeg*` | 用官网后轮总成或车头把手替代，但需相符图片与文案 | 是 | 保留 Pending | 否 |
| HS-04 | `gallery[0..4]`、前三张亮点图来源状态 | 当前 AI 暗黑派生图 | 模型上下文可核，但本地源图与官网媒体 URL 未做逐文件哈希链 | B03《图库与亮点来源记录》；HS85 官网五图/五部件入口；`Image Index!A21:O23` | 资产门禁补链 | 是 | 保留 Pending | 否 |

## SJ250 决策矩阵

| # | 字段 / JSON 路径 | 基线当前值 | 问题 | 精确证据 | 建议采用值 | 人工确认 | 决策 | 实际更新 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SJ-01 | `sellingPoints[2].description`、`translations.*` | 5.3 L tank, 100 km rated endurance | 省略 ≤50 km/h 条件 | B04《4 项卖点》#3；`SJ!B18` | 5.3 L tank; 100 km endurance at ≤50 km/h | 否 | 立即更新 | 是；七语言同步 |
| SJ-02 | `technical...Starter battery` | 2 A Li-ion battery | `2 A` 是容量、电流或其他额定值不明 | B04《技术参数》#23；`SJ!B24` | 保留原文，供应方确认 A/Ah/电压/用途 | 是 | 保留 Pending | 否 |
| SJ-03 | `sellingPoints[0,1,3]`、`intro`、`overview` | Explosive / Lightweight control / Long-travel / response 等 | 参数主体有 Excel，但性能效果/定性无模型级来源 | B04《4 项卖点》#1/#2/#4、《其他公开声明》；`SJ!B7,B12:B13,B21:B23` | 中性化为可核参数 | 是；需一次性可靠同步七语言 | 保留 Pending | 否 |
| SJ-04 | `highlights[0..3].title/description` | 膨胀室响应、Long-travel、rear hub、油箱轮廓等 | 含图片可见推断或无依据扩写；油箱结构另有冲突 | B04《4 项核心亮点》#1–#4 | 仅保留 MT250、838/509 mm、520/110L/42T、5.3 L 等可核事实 | 是；与图片整改联动 | 保留 Pending | 否 |
| SJ-05 | `technical` 几何四项 | 2120×800×1235、1440、340、910 mm | 官网为 SJ250/SJ300 合并值，不能升级为模型级验证 | B04《官网当前状态》《技术参数》#2–#5；`SJ!B3:B6`；SJ 系列 URL | 按 Excel 暂存，来源状态继续 Pending | 是（来源状态） | 保留 Pending、无需改值 | 否 |
| SJ-06 | `gallery[0..4]` | 五张 v4 生成图 | 官方/Excel锚点未接入逐资产来源记录 | B04《图片身份锚点》《五图逐资产》#1–#5；`SJ!B1` SHA `996be...412`；官方 SJ250 左/右/后 URL | 补齐父子链并逐角度复核 | 是 | 保留 Pending | 否 |
| SJ-07 | `panelImage` | v11-v2 WebP | 当前版本缺生成/编辑链 | B04《五图、Panel 与亮点图》#6；本地 `sj250-hero-panel...v11-v2.webp` | 补链后再验收 | 是 | 保留 Pending | 否 |
| SJ-08 | `highlights[*].image` | 四张 v4；油箱为白色上置结构 | 四张均缺当前版本记录；油箱与身份锚点座下银灰结构冲突 | B04《五图、Panel 与亮点图》#7–#10；本地 `sj250-highlight-*v4.png` | 取得真实部件资料后补链/重做 | 是 | 保留 Pending | 否 |

## S300R 决策矩阵

| # | 字段 / JSON 路径 | 基线当前值 | 问题 | 精确证据 | 建议采用值 | 人工确认 | 决策 | 实际更新 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SR-01 | `technical...Wheelbase` | 1500 mm | 误用未绑定型号的系列值 | B05《技术参数》T02；`S300!C4 = 1470mm` | 1470 mm | 否 | 立即更新 | 是 |
| SR-02 | `technical...Ground clearance` | 330 mm | 误用系列值 | B05 T03；`S300!C5 = 280mm` | 280 mm | 否 | 立即更新 | 是 |
| SR-03 | `technical...Seat height` | 970 mm | 误用系列值 | B05 T04；`S300!C6 = 940mm` | 940 mm | 否 | 立即更新 | 是 |
| SR-04 | `stats[3].label`、`sellingPoints[1].description`、`technical...Weight.label` | Net weight / 110 kg net weight | Excel 为 Kerb Weight | B05 T05、S04、P02；`S300!C7` | Kerb weight / 110 kg kerb weight | 否 | 立即更新 | 是；3 个业务字段、七语言同步 |
| SR-05 | `technical...Transmission.value` | 520 / 116L / 49T | 链节数与齿数冲突 | B05 T12；`S300!C14` | 520 / 110L / 42T | 否 | 立即更新 | 是 |
| SR-06 | `technical...Light.value` | LED head/tail; no turn signals | 尾灯和转向灯为无依据扩写 | B05 T14；`S300!C16 = LED` | LED | 否 | 立即更新 | 是 |
| SR-07 | `technical...Endurance.value` | 220 km at 50 km/h | 未保留 ≤ 条件 | B05 T16；`S300!C18` | 220 km at ≤50 km/h | 否 | 立即更新 | 是 |
| SR-08 | `intro`、`sellingPoints[0].description`、`overview.body`、`overview.miniSpecs[0].description`、`highlights[0].title/alt`、`technical...Engine type` | XFH two-stroke | Excel 明确是 XFH300，页面遗漏型号标识 | B05 T20、P01、H01；`S300!C21` | XFH300 two-stroke | 否 | 立即更新 | 是；8 个业务字段、七语言同步 |
| SR-09 | `technical...Sprocket.value` | Aluminum alloy | Excel 只写 Alloy，未明示铝 | B05 T13；`S300!C15` | Alloy 或供应方确认铝材 | 是 | 保留 Pending | 否 |
| SR-10 | `sellingPoints[1..3].title` | Lightweight / Large / High-performance | 无比较阈值或性能来源 | B05 P02–P04 | 改为数值/部件中性标题 | 是；需七语言内容审阅 | 保留 Pending | 否 |
| SR-11 | `highlights[1].title/description` | 大直径倒置叉、抗连续冲击 | Excel 仅支持 950 mm 长度 | B05 H02；`S300!C12` | Front fork, length 950 mm | 是；与图片身份联动 | 保留 Pending | 否 |
| SR-12 | `highlights[2].title/description/image` | S300 系列 LED 头灯及可见性主张 | 本地图灯体与官方 S300R 正面/系列部件明显不同 | B05 H03、I09；官方 S300R 车头 URL；本地 `s300r-headlight...png` | 仅保留 LED，先替换/核验灯体 | 是 | 保留 Pending | 否 |
| SR-13 | `highlights[3].title/description/image` | Alloy wide footpeg 及抓地/排泥 | Excel 无脚踏字段，本地图与系列图结构冲突 | B05 H04、I10；本地 `s300r-footpeg...png` | 取得 S300R 型号级脚踏证据 | 是 | 保留 Pending | 否 |
| SR-14 | `gallery[0..4]` | 五张 v3 生成图 | 外观相容但均无可审计父子链 | B05《图库、Panel 与亮点图》I01–I05；`S300!C1` SHA `8e411...40b`；官方 S300R 右侧/车头 URL | 补建来源链 | 是 | 保留 Pending | 否 |
| SR-15 | `panelImage` | `s300r-panel...v2-master.webp` | 编码关系可见，但未追到官网/Excel原图 | B05 I06；本地 Panel master/WebP | 补链并过 SJ300 Panel 门禁 | 是 | 保留 Pending | 否 |
| SR-16 | `highlights[0..1].image` | 发动机/前叉亮点 | 与系列部件目视相近但型号归属和生成链未闭环 | B05 I07–I08；官网系列发动机/前叉 URL | 补建型号级来源链 | 是 | 保留 Pending | 否 |

## S300 图片来源决策矩阵

S300 不修改任何 JSON 图片路径、资产或车型身份结论。

| # | 字段 / JSON 路径 | 基线当前值 | 问题 | 精确证据 | 建议采用值 | 人工确认 | 决策 | 实际更新 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S3-01 | 配置前提 / `powerType` 与动力文案 | NC300 四冲配置 | 本地 `official-*` 锚点却显示两冲膨胀室 | B06《结论摘要》《必须决策》1；`S300!B21 = NC300 Four-stroke`；本地 `official-s300-*` | 业务确定唯一配置 | 是 | 保留 Pending | 否 |
| S3-02 | 模型级身份锚点 | Excel B1、官网 S300 右侧或其他原图未选定 | 三类锚点未闭环且哈希不同 | B06《关键身份锚点》《必须决策》2；`S300!B1` SHA `b910...d98`；官网 S300 右侧 URL | 选定唯一锚点并记录配置/URL/哈希 | 是 | 保留 Pending | 否 |
| S3-03 | `gallery[0].src` | front v1 dark | 生成记录存在，确切四冲身份未锁定 | B06《当前资产矩阵》图库1；本地证据路径 | 获批真实整车锚点后复核 | 是 | 保留 Pending | 否 |
| S3-04 | `gallery[1].src` | left-front v1 dark | AI 将两冲锚点重构为四冲 | B06 图库2；本地证据路径 | 真实四冲结构证明 | 是 | 保留 Pending | 否 |
| S3-05 | `gallery[2].src` / `banner.image` | left-side v1；banner 为其 v2 上游 | 四冲动力总成未闭环 | B06 图库3、banner；本地证据路径 | 真实四冲结构证明 | 是 | 保留 Pending | 否 |
| S3-06 | `gallery[3].src` | left-rear v1 dark | 排气侧规则修正但依赖生成约束 | B06 图库4；本地证据路径 | 跨角度真实锚点复核 | 是 | 保留 Pending | 否 |
| S3-07 | `gallery[4].src` | rear v1 dark | 该角度不能确认发动机版本 | B06 图库5；本地证据路径 | 配置锚点通过后复核 | 是 | 保留 Pending | 否 |
| S3-08 | `highlights[0].image` | power-system v2 | 无逐图链，动力/排气可能混合 | B06 亮点1；本地 `s300-highlight-01-power-system-v2...png` | 真实 NC300 部件/整车证据后重做或补链 | 是 | 保留 Pending | 否 |
| S3-09 | `highlights[1].image` | front-fork v2 | 当前 v2 无来源记录 | B06 亮点2；本地证据路径 | 补逐图链 | 是 | 保留 Pending | 否 |
| S3-10 | `highlights[2].image` | wheel-hub v2 | 花鼓/辐条/制动细节无真实部件证明 | B06 亮点3；本地证据路径 | 补真实部件链 | 是 | 保留 Pending | 否 |
| S3-11 | `highlights[3].image` | front-disc-brake v2 | 盘片/花鼓/卡钳存在明显 AI 几何疑点 | B06 亮点4；本地证据路径 | 退回整改或真实部件图替换 | 是 | 保留 Pending | 否 |
| S3-12 | `panelImage` | v11 lighting WebP | 母版来源缺失，整幅红洗且机械细节过暗 | B06 Panel、《必须决策》5；本地 WebP/master | 退回或明确例外；身份仍需先通过 | 是 | 保留 Pending | 否 |
| S3-13 | 产品世界预览门禁 | 尚未制作正式预览 | 当前 AI 图不能互相迭代建立身份 | B06《必须决策》6 | 身份锚点+配置+结构一致后再制作 | 是 | 保留 Pending | 否 |
| S3-14 | `source-audit-index.json models.s300.p1Decision` | 无 B07 状态 | 需显式记录 11/11 当前图片仍 Pending | B06《汇总统计》 | image-identity-pending，0 资产获批 | 否 | 立即更新索引状态 | 是；仅状态记录 |

## 结果汇总

- 决策矩阵：58 行。
- 立即更新决策行：12；对应 20 个业务内容字段（SY300 1、HS85 2、SJ250 1、S300R 16）。
- 七语言映射同步：126 个新/替换映射项；未把 H300 的错位翻译继续扩散。
- `source-audit-index.json`：新增 6 个车型级 `p1Decision` 状态记录。
- 保留 Pending 决策行：46；所有要求人工确认的参数、标签语义、配置、图片身份/结构和来源链均未改值。
- 四项约束：六款车型仍各有 4 项统计、4 项卖点、4 项核心亮点。
- S300：JSON、图片路径和资产均未改；11/11 图片仍为 Pending。

## 边界核对标准

终态验证应满足：所有允许 JSON 与索引可解析；所有更新字符串在七语言映射中存在；两份工作簿哈希不变；CSS/JS/图片文件数、字节数和清单聚合哈希与基线一致；不生成或修改 `frontend/pages/**`；`git diff --check` 无空白错误。
