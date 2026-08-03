# C01 双数据源一致性审计

审计日期：2026-08-01（Asia/Shanghai）

审计方式：只读解析；未修改 `site-data.js`、车型 JSON 或任何生成页。

审计对象：`frontend/assets/js/site-data.js` 与 `frontend/product-detail/data/*.json` 的当前工作区内容。

## 1. 结论

- JSON 实际有 27 个车型文件；`site-data.js` 的 `products` 有 26 条记录。
- 25 款可用 `products[*].slug === JSON.id` 直接映射；HS85 使用明确的旧标识映射 `hs85cc` / `displayModel: HS85` → `hs85.json`；`et.json` 在 `site-data.js` 中完全缺失。
- 冻结的比较口径得到 582 个互斥审计单元：一致 109、格式差异 267、真实冲突 7、仅单侧存在 199；`109 + 267 + 7 + 199 = 582`。
- 7 条真实冲突为：F29 三项几何数据、F29R 三项几何数据、HS85 系列字段一项。报告不判断哪一侧正确，也不建议自动覆盖。
- 仅单侧车型 1 款：JSON 侧的 ET。另有 JSON `technical` 单侧字段 197 项、site-data 单侧规格字段 1 项（HS85 Purpose）。

## 2. 实际清单、结构和覆盖

### 2.1 JSON 的 27 款实际清单

`babey`、`babey-plus`、`bumblebee`、`er3`、`er5`、`er7`、`es11`、`et`、`et-2022`、`et-2024`、`et3`、`et5`、`et7`、`et9`、`f4`、`f4-plus`、`f9`、`f29`、`f29r`、`h300`、`hs85`、`s300`、`s300r`、`sj250`、`sj300`、`sn300`、`sy300`。

### 2.2 两侧结构并不同构

- `site-data.js` 导出 `window.APEX_SITE_DATA`，顶层键为 `company`、`i18n`、`specLabelsZh`、`categories`、`products`。每个产品主要包含 `slug`、`model`、可选 `displayModel`、`category`、`series`、`seriesZh`、`image`、七语言简介字段、四项 `highlights`、二维数组 `specs`。
- 每份车型 JSON 是详情页完整记录，顶层包括身份、SEO、五图图库、四项统计、四项卖点、询盘、概述、四项详情亮点、横幅、分组 `technical`、七语言及字符串翻译映射。
- 因职责不同，本审计不假设两个对象同构，也不把卡片图强配到详情图库、不把卡片简介强配到详情长文、不把卡片四项 highlights 强配到详情 stats/sellingPoints/highlights。

### 2.3 车型映射与覆盖状态

| JSON id | site-data 映射 | 覆盖状态 |
| --- | --- | --- |
| babey | `products[22].slug = babey` | 直接覆盖 |
| babey-plus | `products[23].slug = babey-plus` | 直接覆盖 |
| bumblebee | `products[24].slug = bumblebee` | 直接覆盖 |
| er3 | `products[12].slug = er3` | 直接覆盖 |
| er5 | `products[13].slug = er5` | 直接覆盖 |
| er7 | `products[14].slug = er7` | 直接覆盖 |
| es11 | `products[15].slug = es11` | 直接覆盖 |
| et | 无 | **仅 JSON 侧存在** |
| et-2022 | `products[11].slug = et-2022` | 直接覆盖 |
| et-2024 | `products[10].slug = et-2024` | 直接覆盖 |
| et3 | `products[16].slug = et3` | 直接覆盖 |
| et5 | `products[17].slug = et5` | 直接覆盖 |
| et7 | `products[18].slug = et7` | 直接覆盖 |
| et9 | `products[19].slug = et9` | 直接覆盖 |
| f4 | `products[20].slug = f4` | 直接覆盖 |
| f4-plus | `products[21].slug = f4-plus` | 直接覆盖 |
| f9 | `products[7].slug = f9` | 直接覆盖 |
| f29 | `products[8].slug = f29` | 直接覆盖 |
| f29r | `products[9].slug = f29r` | 直接覆盖 |
| h300 | `products[6].slug = h300` | 直接覆盖 |
| hs85 | `products[25].slug = hs85cc` 且 `displayModel = HS85` | 明确别名覆盖 |
| s300 | `products[0].slug = s300` | 直接覆盖 |
| s300r | `products[1].slug = s300r` | 直接覆盖 |
| sj250 | `products[4].slug = sj250` | 直接覆盖 |
| sj300 | `products[5].slug = sj300` | 直接覆盖 |
| sn300 | `products[2].slug = sn300` | 直接覆盖 |
| sy300 | `products[3].slug = sy300` | 直接覆盖 |

覆盖关系闭合：`25 直接覆盖 + 1 别名覆盖 + 1 仅 JSON = 27`。

## 3. 可复现的字段映射

### 3.1 顶层字段

| 语义 | site-data.js | JSON |
| --- | --- | --- |
| 车型 ID | `products[i].slug` | `id` |
| 展示车型名 | `products[i].displayModel ?? products[i].model` | `name` |
| 系列 | `products[i].series` | `series` |

HS85 的 `slug: hs85cc` 是唯一 ID 别名；其展示名使用已有 `displayModel: HS85`，没有用推测规则改写。

### 3.2 规格字段

每个 `products[i].specs[j] = [label, value]` 只与同一车型 `technical.groups[g].items[k] = {label, value}` 的同义标签比较。主要标签映射如下：

| 规范语义 | site-data 标签示例 | JSON 标签示例 |
| --- | --- | --- |
| 外形尺寸 | Apparent size | Dimensions / Overall dimensions / 长 × 宽 × 高 |
| 轴距、离地间隙、座高、整备质量 | Wheelbase, Ground clearance, Seat height, Kerb weight | 对应英文标签或轴距、离地间隙、座高、整备质量/净重 |
| 前后轮胎 | Front / rear tire；Tire | Front tire + Rear tire；Tire sizes；轮胎规格（前 / 后） |
| 制动 | Brake / Brake modes | Brake system / Brakes / 制动方式 / 前后制动模式 |
| 速度、续航 | Top speed；Endurance / Range | Top speed / 最大速度；Endurance / Range / 最大里程 |
| 动力 | Engine type；Maximum/Peak power；Maximum/Max/Wheel torque | 对应英文标签或发动机类型、最大功率、最大扭矩 |
| 电气 | Battery；Battery capacity；Charging time；IP rating；Motor type | 对应英文标签或电池容量、充电时间、防护等级、电机类型 |
| 底盘 | Transmission；Frame；Front Fork Travel；Rear Shock / Wheel Travel | 对应英文标签或传动方式、车架材质、前/后减震 |
| HS85 专项 | Displacement；Starting system；Fuel system；Gearbox | 排量；启动方式；供油形式；变速器形式 |

前后轮胎是唯一常见的 1→2 路径映射：site-data 的一个合并字段对应 JSON 的前轮和后轮两个 item；若 JSON 本身已有合并 `Tire sizes`，则为 1→1。一个共享语义仍只计一个审计单元，但报告保留全部实际 JSON 路径。重复出现而未被该映射消费的 JSON item 计入 JSON 单侧字段，不被去重隐藏。

### 3.3 规范化规则

规范化只用于判断“格式差异”，不改变源值：

1. Unicode 使用 NFKC；去首尾空格、折叠连续空格；英文比较忽略大小写。
2. 尺寸乘号 `x`、`X`、`*`、`×` 视为同一排版符号；不改变三个数字及顺序。
3. 单位大小写和邻接空格统一，例如 `KW`/`kW`、`Kg`/`kg`、`KM/H`/`km/h`、`15Ah`/`15 Ah`。
4. 扭矩标点 `Nm`、`N.m`、`N·m` 视为格式差异；数值必须保持相同。
5. `<=` 与 `≤`、`>` 与 `＞`、`@ 25 km/h` 与 `at 25 km/h` 视为等义格式；速度条件中的数字和不等号方向必须保持。
6. 连字符/短横线/长横线和列表标点可规范化；数字范围端点不得改变。
7. 标签允许已列明的英中翻译及同义标签。值的语言翻译只在词义明确时采用，例如“四冲程”↔“four-stroke”、“前后碟式刹车”↔“front and rear disc brakes”；无法可靠确认的表述不强行配对。
8. 数字不做舍入，不移除条件，不把同系列或相近车型视为相同。任何数值、范围端点、单位量纲、配置类型或系列归属变化均为真实冲突。

分类判定：原值完全相同为“一致”；仅以上表达差异且语义不变为“格式差异”；实质值或归属不同为“真实冲突”；没有可靠同语义路径为“仅单侧存在”。

## 4. 汇总与逐车型闭合统计

统计单元为上述冻结映射形成的“公开语义字段”。顶层 3 项与 specs↔technical 分别计数；1→2 轮胎映射仍计一项。职责不同的 UI/SEO/图片/多语言结构只按字段族列在第 6 节，不与本表的语义字段行混算。

| 车型 | 一致 | 格式差异 | 真实冲突 | 仅单侧存在 | 合计 |
| --- | ---: | ---: | ---: | ---: | ---: |
| s300 | 5 | 9 | 0 | 12 | 26 |
| s300r | 5 | 10 | 0 | 11 | 26 |
| sn300 | 3 | 12 | 0 | 11 | 26 |
| sy300 | 3 | 12 | 0 | 11 | 26 |
| sj250 | 5 | 10 | 0 | 10 | 25 |
| sj300 | 3 | 12 | 0 | 10 | 25 |
| h300 | 5 | 9 | 0 | 10 | 24 |
| f9 | 6 | 10 | 0 | 11 | 27 |
| f29 | 5 | 8 | 3 | 13 | 29 |
| f29r | 5 | 8 | 3 | 12 | 28 |
| et-2024 | 6 | 9 | 0 | 14 | 29 |
| et-2022 | 5 | 9 | 0 | 16 | 30 |
| er3 | 4 | 11 | 0 | 0 | 15 |
| er5 | 4 | 11 | 0 | 0 | 15 |
| er7 | 4 | 11 | 0 | 0 | 15 |
| es11 | 4 | 11 | 0 | 0 | 15 |
| et3 | 4 | 11 | 0 | 0 | 15 |
| et5 | 4 | 11 | 0 | 0 | 15 |
| et7 | 4 | 11 | 0 | 0 | 15 |
| et9 | 4 | 11 | 0 | 0 | 15 |
| f4 | 4 | 9 | 0 | 11 | 24 |
| f4-plus | 3 | 10 | 0 | 11 | 24 |
| babey | 3 | 11 | 0 | 6 | 20 |
| babey-plus | 3 | 11 | 0 | 9 | 23 |
| bumblebee | 6 | 9 | 0 | 6 | 21 |
| hs85 | 2 | 11 | 1 | 14 | 28 |
| et | 0 | 0 | 0 | 1 | 1 |
| **总计** | **109** | **267** | **7** | **199** | **582** |

横向复算：`109 + 267 + 7 + 199 = 582`。

仅单侧复算：`197 JSON-only technical + 1 site-only spec + 1 JSON-only model = 199`。

车型复算：26 个映射车型行合计 581，加 ET 单侧车型 1，等于 582。

## 5. 真实冲突（逐条定位）

| # | 车型 | site-data.js 路径和值 | JSON 路径和值 | 冲突原因 |
| ---: | --- | --- | --- | --- |
| 1 | F29 | `products[8].specs[0][1]` = `2120*800*1235mm` | `technical.groups[0].items[0].value` = `2160 × 820 × 1230 mm` | 长、宽、高三个数值均不同，不是乘号或空格差异。 |
| 2 | F29 | `products[8].specs[1][1]` = `1440mm` | `technical.groups[0].items[1].value` = `1480 mm` | 轴距数值不同。 |
| 3 | F29 | `products[8].specs[3][1]` = `910mm` | `technical.groups[0].items[3].value` = `940 mm` | 座高数值不同。 |
| 4 | F29R | `products[9].specs[0][1]` = `2120*800*1235mm` | `technical.groups[0].items[0].value` = `2160 × 820 × 1230 mm` | 长、宽、高三个数值均不同，不是乘号或空格差异。 |
| 5 | F29R | `products[9].specs[1][1]` = `1440mm` | `technical.groups[0].items[1].value` = `1480 mm` | 轴距数值不同。 |
| 6 | F29R | `products[9].specs[3][1]` = `910mm` | `technical.groups[0].items[3].value` = `940 mm` | 座高数值不同。 |
| 7 | HS85 | `products[25].series` = `Youth Motocross` | `series` = `HS85 系列` | 两侧都公开表达系列归属，但一个是用途/年龄段系列，一个是车型名系列；无法用大小写或翻译规范化为同一值。 |

以上均保持中立：本报告不判断正确来源，不提出自动覆盖。

## 6. 仅单侧存在

### 6.1 车型仅单侧存在

- JSON-only：`frontend/product-detail/data/et.json`；`site-data.js products` 没有 `slug: et` 或其他可由现有字段可靠证明为 ET 的记录。
- site-data-only：无。

### 6.2 字段仅单侧存在（纳入 582 行统计）

- site-data-only 规格 1 项：HS85 `products[25].specs[11]`，`Purpose = Off-road / Motocross junior competition class`。JSON `technical` 没有同义 item；不以 `intro` 或营销长文强行代替。
- JSON-only technical 共 197 项。下列括号是逐车型数量；同一规范标签下若 JSON 有两个不同实际 item，按两个字段保留计数，因此 F29/F29R 的 drive 字段及 Babey/Babey+ 的重复 maximum-load item没有被去重隐藏。

| 车型 | JSON-only technical 字段（实际标签） |
| --- | --- |
| s300 (12) | Maximum load；Brake modes；Front shock absorber；Rear shock absorber；Sprocket；Light；Petrol tank；Model；Maximum climbing angle；Maximum torque；Maximum power；Starter battery |
| s300r (11) | Maximum load；Brake modes；Front shock absorber；Rear shock absorber；Transmission；Sprocket；Light；Fuel tank；Model；Maximum climbing angle；Starter battery |
| sn300 (11) | 最大负载；前后制动模式；前减震；后减震；传动方式；链盘材质；灯光；油箱容量；车型；最大爬坡度；启动电池 |
| sy300 (11) | 最大负载；前后制动模式；前减震；后减震；传动方式；链盘材质；灯光；油箱容量；车型；最大爬坡度；启动电池 |
| sj250 (10) | Maximum load；Front shock absorber；Rear shock absorber；Transmission；Sprocket；Light；Endurance；Model；Maximum climbing angle；Starter battery |
| sj300 (10) | 最大负载；前减；后减；传动方式；链盘材质；灯光；最大里程数；车型；最大爬行坡度；启动电池 |
| h300 (10) | Maximum load；Front shock absorber；Rear shock absorber；Transmission；Lighting；Endurance；Maximum climbing angle；Engine type；Maximum torque；Starting battery |
| f9 (11) | Maximum load；Brake system；Front shock absorber；Rear shock absorber；Drive assembly；Sprocket；Lighting；Maximum climbing angle；Riding modes；Battery temperature；Charging time |
| f29 (13) | Maximum load；Brake system；Front shock absorber；Rear shock absorber；Drive assembly；Sprocket；Drive type；Lighting；Maximum climbing angle；Model；Motor type；Wheel torque；Battery temperature condition |
| f29r (12) | Maximum load；Brakes；Front shock absorber；Rear shock absorber；Transmission；Sprocket；Drive type；Light；Maximum climbing angle；Motor type；Wheel torque；Battery temperature |
| et-2024 (14) | 最大载重；车架；制动方式；传动方式；链轮；前减震；后减震；照明；最大爬坡角；骑行模式；档位；车型；电池温度条件；充电时间 |
| et-2022 (16) | 最大载重；车架材质；采购条件；最大爬坡角；前减震；后减震；传动规格；链轮；灯光；制动方式；车型；电机类型；骑行模式；挡位；电池温度条件；防护等级 |
| f4 (11) | Maximum load；Front fork；Rear shock absorber；Transmission；Motor type；Maximum power；Voltage；Endurance；Battery temperature；Gear setting；Colour |
| f4-plus (11) | Maximum load；Front fork；Rear shock absorber；Transmission；Motor type；Maximum power；Voltage；Endurance；Battery temperature；Gear setting；Colour |
| babey (6) | 车身材质；驱动方式；车型；最大功率；电压；第二处重复的最大负载 |
| babey-plus (9) | 驱动方式；车型；最大功率；电压；续航里程；档位设置；颜色；电池温度条件；第二处重复的最大负载 |
| bumblebee (6) | Maximum load；Brake system；Transmission；Front shock absorber；Rear shock absorber；Riding modes |
| hs85 (13) | 动力技术；离合器；燃油类型；点火方式；档位方式；发动机净重量；前悬挂；后悬挂；悬挂行程（前 / 后）；摇臂；前制动；后制动；机油容量 |

ER3、ER5、ER7、ES11、ET3、ET5、ET7、ET9 的 12 个 site-data specs 与 12 个 JSON technical item 全部覆盖，JSON technical 单侧项为 0。上述数量求和为 197。

### 6.3 两侧职责不同导致的预期单侧字段族（不混入 582 行）

这些字段没有可靠的同语义对端；为避免把 UI 结构数量误当数据冲突，按结构族记录，不展开成跨源比较行：

- site-data 预期单侧：卡片 `category`、列表 `image`、七语言卡片简介（`intro`、`introZh`、`introZhTW`、`introRu`、`introAr`、`introEs`、`introPt`）、四项卡片 `highlights`。
- JSON 预期单侧：`page` SEO、`powerType`、`panelImage`、五图 `gallery`、四项 `stats`、四项 `sellingPoints`、`quote`、`inquiry`、`overview`、四项详情 `highlights`（含图片）、`banner`、technical 标题/分组标题、`languages`、`translations`。
- 内部/交付元数据 `schemaVersion` 同样仅 JSON 存在，但不是公开内容，不进入公开字段统计。

此处“预期”只表示当前代码职责不同，不表示可以删除或永远不需要统一；其中营销文本的事实主张若未来要同步，应另建有明确句级映射的审计，不能依靠模糊相似度自动配对。

## 7. 一致字段与格式差异说明

- 一致字段 109 项是源值完全相同的共享语义字段，主要包括直接相同的 id、展示名、部分 series、TFT/IP 值及部分轮胎/配置文本。
- 格式差异 267 项都保留了相同实质值，常见原因是单位空格和大小写、`*`/`x`/`×`、`N.m`/`N·m`、`<=`/`≤`、英文大小写、英中标签/值翻译、`Front/Rear` 展开方式。
- 格式差异不授权批量格式化；尤其静态 HTML、中文实体和现有 Unicode 转义策略受项目规则保护。

## 8. 只读命令与复算方法

本次使用的命令均不写业务源文件；没有创建持久化辅助脚本：

```powershell
Get-ChildItem frontend/product-detail/data -Filter *.json | Sort-Object Name
Get-FileHash -Algorithm SHA256 frontend/assets/js/site-data.js
Get-ChildItem frontend/product-detail/data -Filter *.json | Get-FileHash -Algorithm SHA256
node --check frontend/assets/js/site-data.js
git diff --check
```

解析采用 Node 内联脚本：用 `vm.runInContext` 在仅含空 `window` 的上下文执行 `site-data.js`，读取 `window.APEX_SITE_DATA.products`；用 `JSON.parse` 读取全部 `data/*.json`；按第 3 节标签表建立显式规范键；输出每条的 site 路径、JSON 路径、原值、规范化判定及逐车型计数。未使用网络、工作簿或生成 HTML 作为替代数据源。

## 9. 源文件 SHA-256

| 文件 | SHA-256 |
| --- | --- |
| `frontend/assets/js/site-data.js` | `835763ff3a242248ae6e3466467cbfdf7e8cd27d22fb17d1f453965fa86ba0d2` |
| `data/babey.json` | `7a2037da534ef1737464b6045c3af70049fdb27c3e5f9a51702ff34754df76d5` |
| `data/babey-plus.json` | `332998bbcf45210f5413081f26d7afe9930cc90fed946213894a45aeb0b7de32` |
| `data/bumblebee.json` | `c5cbd832ce644f420f00ed946c25734ad5055ccd7613621688a8a244dd1a0836` |
| `data/er3.json` | `8dd45a19bbdb12daadbae15b091fde6b5f49be7d1ec2d49e2ccf2007fc8d6397` |
| `data/er5.json` | `ad7609a6233e8fcb584d0ec15bfdff40f6472518d1a0e362b5e364350b2122af` |
| `data/er7.json` | `2d3c385b4cc5aed5aca08718fda369a7a7d840bcc8069521f2c450eef96a30e1` |
| `data/es11.json` | `ff18b16b12d0e933f4e08c53fac2d76971d08ce29d31a9bc3ab9c905f13cf299` |
| `data/et.json` | `20eb755dd5b57b3307126bb1c3f42ad4e64c7c3e2ebcdceb740a78ce6aafa0e5` |
| `data/et-2022.json` | `f378ce1a9831368de8b2a6b7aa672b7d7ac82c548a455bcef8a8bdd6ce2c3678` |
| `data/et-2024.json` | `3c64267f35a63ea22ad07ec71352f064fef451210d9f0c8d80ce1be79f7b8e47` |
| `data/et3.json` | `aec8ad26296bc3171561511b4251d85f892f3c861d02da819096bdf7a463411a` |
| `data/et5.json` | `3b9951dd1d75a6be04b8dc1e9a581ebaea4d11a3421e26c1c098a2161f14f829` |
| `data/et7.json` | `d9a6c8e57323a207022546abb59efdea84dc9a54862d7e3efe9a505edfb5b895` |
| `data/et9.json` | `cae5138c85c6a6814288549c9fae71a860c618d93ab63616cbdcf4fc97989560` |
| `data/f29.json` | `f66a9876be6482e13ea6ef48b809b84b453eaafba3cdb2792f5afb4256e002ad` |
| `data/f29r.json` | `03baa42cc939ad523c920baac53bf5499094aa19e95912a62485aadaf46cf595` |
| `data/f4.json` | `90188760eb834aff34d7307067fd6e48ea4b0687ea332bcc636944140f41d956` |
| `data/f4-plus.json` | `15668474b44e66bbb3e9e138008ca9263cb7e0b2db4ebff42e26d7320e8c630d` |
| `data/f9.json` | `2cacc50a011bb9634685211f4bbb3eea3925fdcc9c6f16f4611b0a6555519db0` |
| `data/h300.json` | `d110642153dc5faef7e5f04feef32131a2eb820ef89057d4296155fc8d5a0ed8` |
| `data/hs85.json` | `392a067feed3614d94d55db6c1e377028e52dfb0beef54391e13f16e5001023a` |
| `data/s300.json` | `03470d164cb7cceb398f742aff4fa4c679f72ebc78d00a92d51e7a9e7f0f4422` |
| `data/s300r.json` | `19f6da9c8dcd2e89286dbda8ff525572c67782722e58571b218f7b2dc1f0c7a3` |
| `data/sj250.json` | `735b8d7812f9f3ec9d1229ad62e9a70509504232da4905e5b9b878deb6293786` |
| `data/sj300.json` | `06309b4782205306cb4154301b97ad475bc5edda19334d58cd4eca26d3b41675` |
| `data/sn300.json` | `88ebc365cd7c7b253dc8fd81244984fc7a4043d66d13c0236168dcd98732c51f` |
| `data/sy300.json` | `f20a65aa9354fe58ed6e244fbe262cc69e61e3bcdf3214c32a85ca0800c825a8` |

表中 `data/...` 均指 `frontend/product-detail/data/...`。

## 10. 限制与后续人工决策

- 本报告只比较当前代码中的两份公开数据源，不重新裁定官网、Excel 或 `source-audit-index.json` 的证据优先级。
- 简介与营销亮点可能重复技术事实，但两侧结构和文案职责不同；本轮没有用关键词相似度制造不可靠的一对一映射。
- `site-data.js` 的 `category` 是列表筛选分类，JSON 的 `category`/`powerType` 服务详情页分类与技术类型，未强制视为同一个字段。
- 人工决策应先处理 7 条真实冲突及 ET 是否应进入 site-data 产品列表；决定时回到官网/Excel/现有 P1 决策证据。任何修订只能针对经批准的一侧逐项修改，禁止自动互相覆盖。
- HS85 的 `hs85cc` 别名目前可映射，但是否统一公开路由 ID 属于产品/URL 决策，本报告不建议改名。
