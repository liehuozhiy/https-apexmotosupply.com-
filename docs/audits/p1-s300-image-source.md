# B06 S300 图片来源审计

审计日期：2026-08-01（Asia/Shanghai）
范围：只读核对 `frontend/product-detail/data/s300.json` 当前直接引用的图库、亮点、Panel、banner，以及必要的官网/Excel身份锚点和关键 AI 历史版本。未把普通 QA 截图纳入清单，也未修改 JSON、来源索引、工作簿或图片。

## 1. 结论摘要

- 当前 JSON 有 **11 个图片引用槽位，11 个唯一资产**：图库 5、亮点 4、Panel 1、banner 1；JSON 内没有路径重复。
- 来源闭环结论：**完整闭环 0、部分闭环 7、未闭环 4**。部分闭环为图库 5、Panel 1、banner 1；未闭环为当前 4 张 v2 亮点图。
- 所有 11 个当前资产的车型身份审批均应保持 **Pending / 待 B07**。现有记录能说明部分 AI 制作过程，但不能证明用于生成的两张本地 `official-*` 锚点就是 Excel 中的 S300 四冲车型。
- 最重要的身份风险是动力总成漂移：两张本地 `official-*` 锚点目视均为带明显膨胀室的两冲程结构；当前 JSON 定义为 `NC300 four-stroke`，当前图库、banner、Panel 和发动机亮点则展示了另一套四冲程发动机。官网当前页面又是 S300/S300R/SN300/SY300 的系列级混合图库，不能据此补齐准确的 S300 四冲整车身份链。
- 条件性结论：**当前证据不足以直接支持后续 S300 产品世界预览制作**。只有 B07 明确批准“用于预览的确切 S300 配置/颜色/发动机版本”并指定至少一张模型级整车身份锚点后，才可进入制作；现有 AI 图只能作为构图/风格候选，不能当作官方身份源。

## 2. 判定口径与证据

- `来源闭环`：能追到原始官网或 Excel 文件，并能证明该源对应当前 S300 的确切配置；AI 派生还需有逐图生成/编辑记录。
- `部分闭环`：有生成记录或上游文件关系，但模型级身份锚点、确切配置或某一转换步骤仍缺证据。
- `未闭环`：当前文件只有文件名、JSON 引用或视觉推断，缺逐图来源记录；文件名中的 `official` / `ai` 不作为充分证据。
- 目视身份特征主要核对：蓝/黄/白塑料与贴花、头灯面罩、车架/副车架、油箱与座垫、发动机形式、排气位置、链条/链轮侧、前叉、轮毂和制动件。

证据源：

1. 当前 JSON：`frontend/product-detail/data/s300.json`。
2. 资产记录：`frontend/assets/img/products/s300-detail/asset-and-source-record.md`。
3. 来源索引：`frontend/product-detail/source-audit-index.json`。
4. 官网核对更新簿：`frontend/product-detail/2026H&Q产品参数（英）-官网核对更新.xlsx`，`Image Index!A24:O24`、`Summary!A22:P22`、`Field Matrix!A294:O316`。
5. 网页对比分析簿：`2026H&Q产品参数_网页对比分析.xlsx`，`图片对比!A13:J13`、`对比总览!A11:L11`。
6. 当前官网系列页：`https://h5.cqxstx.com/?lang=en&id=s300`（2026-08-01 只读访问）。

## 3. 当前 JSON 采用资产逐项矩阵

审批状态全部为 **Pending / 待 B07**。

| 用途 | JSON 路径 / SHA-256 / 尺寸 | 资产类型 | 来源记录与身份锚点匹配 | 角度/部件一致性 | 风险 | 来源闭环 |
| --- | --- | --- | --- | --- | --- | --- |
| 图库 1：front | `frontend/assets/img/products/s300-detail/s300-wide-angle-01-front-v1-dark.png`<br>`2921bb490926b4c3c30c9868ff0767aab552d308ad3dff4a1539e46f986f7739`<br>1942×809 | AI 派生 | 记录称由两张本地 `official-*` 和前代 front 图做身份/角度参考；但这些锚点没有与 Excel 四冲 S300 闭环。 | 正面、整车完整；头灯/前叉/蓝黄贴花大体延续锚点。正面无法证明发动机配置。 | 高：模型配置未锁定。 | 部分 |
| 图库 2：left-front | `frontend/assets/img/products/s300-detail/s300-wide-angle-02-left-front-v1-dark.png`<br>`a38daf0b048c499fc3fd14a417b5411b3e12d15975590a7db58ebea613cdf40e`<br>1942×809 | AI 派生 | 有 2026-07-27 panoramic 生成记录；上游仍是未闭环的 `official-*` 与 AI 前代。 | 左前 3/4、链条侧可见、左侧无排气，角度规则成立；发动机变成四冲结构，与两冲锚点不一致。 | 高：动力总成被重构。 | 部分 |
| 图库 3：left-side | `frontend/assets/img/products/s300-detail/s300-wide-angle-03-left-side-v1-dark.png`<br>`cff7df97551c7976c758d3902fca4e30edd2b0926d85d250da2877d6f59d6c0e`<br>1942×809 | AI 派生 | 有 panoramic 生成记录；由 `s300-ai-angle-03-left-side-v2-dark.png` 等参考扩景。 | 左侧正投影、链条/链轮侧可见、右侧排气隐藏；车身贴花接近锚点，但发动机形式不匹配锚点。 | 高：确切四冲 S300 结构无真实整车锚点。 | 部分 |
| 图库 4：left-rear | `frontend/assets/img/products/s300-detail/s300-wide-angle-04-left-rear-v1-dark.png`<br>`3c5a9e9787152046fd0422b77233af1d22034765ef9702e29bcdddb522a19ee3`<br>1942×809 | AI 派生 | 有 panoramic 生成记录；记录明确要求修正早期左侧排气漂移。 | 左后 3/4、链条侧可见且左侧无消声器，角度和排气侧规则成立；动力总成身份仍未闭环。 | 高：结构正确性依赖生成约束而非真实该配置照片。 | 部分 |
| 图库 5：rear | `frontend/assets/img/products/s300-detail/s300-wide-angle-05-rear-v1-dark.png`<br>`bfbd3b10cfb5990971dcb592c539a1dfbb97c559dca61567c697261c9430d771`<br>1942×809 | AI 派生 | 有 panoramic 生成记录；上游为本地 `official-*` 和 AI 前代 rear。 | 正后方、车轮居中、排气仅在车辆右侧，角度规则成立；无法由该角度确认发动机版本。 | 高：身份仍由未批准锚点继承。 | 部分 |
| 亮点 1：power system | `frontend/assets/img/products/s300-detail/s300-highlight-01-power-system-v2-dark-ai.png`<br>`861c5649bb9e8beafc9c1f64375855fa856f9fca9b9e2922d64ee6b64ceec1a8`<br>1536×1024 | AI 派生（文件名与目视） | 当前 v2 未出现在资产记录的逐图生成表；记录只覆盖旧 `nc300-engine-v1`。 | 画面表现四冲发动机，但同时出现与两冲锚点相近的车身/排气元素；无法确认这是 S300 NC300 的真实安装结构。 | **很高**：无逐图链，且动力/排气组合可能混合。 | 未闭环 |
| 亮点 2：front fork | `frontend/assets/img/products/s300-detail/s300-highlight-02-front-fork-v2-dark-ai.png`<br>`8fa39bbd043c72cc4c0ab509731515e139cebbbd123d6b98a2e5a56218fada7b`<br>1536×1024 | AI 派生（文件名与目视） | 当前 v2 无逐图来源记录；旧记录只覆盖 `25kw-power-v1`，不是同一部件/用途。 | 前叉、头灯面罩、前泥瓦外观与本地锚点相近；邻近发动机仍是未闭环四冲配置。 | 高：部件近似但来源/版本不明。 | 未闭环 |
| 亮点 3：wheel hub | `frontend/assets/img/products/s300-detail/s300-highlight-03-wheel-hub-v2-dark-ai.png`<br>`b07e017a10d5f20b9a626df3da44712d330377e3f69158c91b4d2457d49a4ebc`<br>1536×1024 | AI 派生（文件名与目视） | 当前 v2 无逐图来源记录；旧记录只覆盖 `27nm-torque-v1`。 | 轮圈/前叉贴花与本地锚点接近，但花鼓、辐条和制动盘细节不能由记录证明为真实 S300 部件。 | 高：部件真实性 Pending；“蓝色轮圈”文字虽已移除，图片仍不能反推规格。 | 未闭环 |
| 亮点 4：front disc brake | `frontend/assets/img/products/s300-detail/s300-highlight-04-front-disc-brake-v2-dark-ai.png`<br>`91cc277840214f6df5e3058dd1831aa21a3ff26b1315b0cfc771b88e78567c45`<br>1536×1024 | AI 派生（文件名与目视） | 当前 v2 无逐图来源记录；旧记录只覆盖 `11-4l-tank-v1`。官网确有系列级部件图，但当前文件未记录由该官方部件图派生。 | 画面有疑似重叠/重复的盘片与不自然的花鼓/卡钳连接关系，和本地整车锚点中的前制动结构不能可靠对齐。 | **很高**：明显 AI 几何疑点，不能作为真实制动部件证据。 | 未闭环 |
| Panel | `frontend/assets/img/products/s300-detail/s300-hero-panel-industrial-red-v2-v11-lighting.webp`<br>`ebac45467da564029e01fa3a865e81b7f533f6f9eee87ee33f58c8ee52c66d86`<br>1672×941 | AI 派生 + WebP 导出 | 与同目录 `...v11-lighting-master.png` 同尺寸，解码后 SSIM 约 0.971，足以支持 WebP 是该 master 的压缩派生；但资产记录只覆盖旧 `s300-hero-panel-left-front-red-v1-dark.png`，没有 v11 master 的生成来源。 | 完整左前 3/4、湿地反射和工业环境存在；但车辆机械细节过暗，整幅明显红洗，偏离“局部红色轮廓光、禁止整幅发红”的 Panel 规则。发动机仍是未闭环四冲版本。 | **很高**：上游 master 无记录；身份与表现门禁同时失败。 | 部分 |
| banner | `frontend/assets/img/products/s300-detail/s300-ai-angle-03-left-side-v2-dark.png`<br>`638d51f942749bd163c1fb67e81b7731139ef52fe3131597a14445eb0f21dc32`<br>1536×1024 | AI 派生 | 资产记录明确列为五角度 AI 图之一，使用两张本地 `official-*`；但锚点与 Excel 四冲 S300 不闭环。 | 左侧、链条侧与右侧排气隐藏规则成立；发动机由 AI 重构为四冲，与本地锚点的两冲结构不一致。 | 高：可作风格参考，不可作模型级身份锚点。 | 部分 |

### 去重说明

- JSON 的 11 个槽位均指向不同文件，因此“采用资产总数”按唯一文件计仍为 11。
- `s300-wide-angle-01-front-v1-dark.png` 另被 `frontend/assets/js/main.js` 用作产品列表普通缩略图；这不是已经完成的 S300 专属产品世界预览，不增加本报告的 JSON 采用资产数。
- 当前 Panel WebP 与未采用的同名 `master.png` 是同一画面的压缩/母版关系，不能算两个当前采用资产。

## 4. 关键身份锚点

| 锚点 | SHA-256 / 尺寸 | 类型与来源记录 | 审计判断 |
| --- | --- | --- | --- |
| `frontend/assets/img/products/s300-detail/official-s300-right-side.jpg` | `9ea6f579b92e9ffc943cd1879faa1c763b3d0e52a188382cf17df06773120c98` / 1600×1100 | 与 `frontend/assets/img/products/s300.jpg` 同哈希；记录称为“official S300 right-side”。 | 目视是蓝黄 S300 贴花整车，但有明显两冲膨胀室。当前官网确有 `S300-右侧.jpg`，其原图为 9504×6336、SHA-256 `3fedae8bbb422006b4752e2376da4c301a369b9ba412808a8ac8ded43c3636fb`，与本地文件不相同；尚无变换记录证明二者为同一源。**Pending**。 |
| `frontend/assets/img/products/s300-detail/official-s300-right-front.png` | `fde39d8fc3b078d14f89d3d9fa465574a9819df3babb54346b604fb2acca2b60` / 1448×1086 | 与 `frontend/assets/img/products/3.4/s300.png` 同哈希；记录称为“official S300 right-front”。 | 车型外观与上一张一致，也显示两冲膨胀室；没有官网 URL、下载哈希或 Excel 映射记录。**Pending**。 |
| 官网当前 S300 系列页的 `S300-右侧.jpg` | `3fedae8bbb422006b4752e2376da4c301a369b9ba412808a8ac8ded43c3636fb` / 9504×6336 | 官网原图 URL 位于 S300 系列混合图库。 | 这是比本地 `official-*` 更强的官网来源锚点，但官网页面同时混用 S300R、S300、SN300、SY300，且当前 JSON 的 exact S300 四冲配置仍未核准。该远程图未被当前 JSON 直接采用。**Pending**。 |
| Excel 嵌入图：`S300!B1` | `b91072f07702ffe5cdad8e99d4b0229b882407498efe233ab7aa1287f0d5dd98` / 4096×2732 / 6,245,676 bytes | 官网核对更新簿 `Image Index` 明确标为 `Excel embedded identity image`。 | 哈希与两张本地 `official-*` 均不同；`Official image match = Pending`，`Current page reference` 为空。网页对比分析簿对该 S300 图给出的最佳网页匹配是 `SY300-车尾.jpg`，相似度 0.556，结论“差异明显（未找到接近图片）”。它是关键 Excel 身份锚点，但尚未与当前采用资产闭环。**Pending**。 |

## 5. 关键 AI 历史版本与上游链

以下只列会影响当前采用资产判定的历史版本，不列 QA 截图。

| 历史文件 | SHA-256 / 尺寸 | 与当前资产关系 | 状态 |
| --- | --- | --- | --- |
| `s300-ai-angle-01-front-v2-dark.png` | `a4c384634b9fff628d5e5cf472a3e529d08875d26018f878fd0f943093681920` / 1536×1024 | panoramic 图库 1 的角度/身份上游 | 未采用；历史保留；身份 Pending |
| `s300-ai-angle-02-left-front-half-v2-dark.png` | `13eb1767ea59b1da204c336fe12fa282c82f437b246de7a55d97b1c0de4fc309` / 1536×1024 | panoramic 图库 2 及 Panel 旧记录的上游 | 未采用；历史保留；身份 Pending |
| `s300-ai-angle-03-left-side-v2-dark.png` | `638d51f942749bd163c1fb67e81b7731139ef52fe3131597a14445eb0f21dc32` / 1536×1024 | panoramic 图库 3 的上游，同时仍被当前 banner 采用 | 当前仅作为 banner 采用；身份 Pending |
| `s300-ai-angle-04-left-rear-half-v3-dark.png` | `4d2357c114a3123bd790274b69ddade5ea9943feacb8f867d3a5f0daafa8fe59` / 1536×1024 | panoramic 图库 4 的修正版上游 | 未采用；历史保留；身份 Pending |
| `s300-ai-angle-05-rear-v2-dark.png` | `99f70bc4dff8a7280b73f9f0c42620e2e00bf11293667c4f5251e2ba9b394abd` / 1536×1024 | panoramic 图库 5 的角度上游 | 未采用；历史保留；身份 Pending |
| `s300-highlight-01-nc300-engine-v1-dark-ai.png` | `b88866982e7b113c2d549933d86923cfc40f2b7f9773af6b8cee4f26dd6b54f8` / 1536×1024 | 有逐图 prompt 记录的旧发动机亮点；已被当前无记录的 v2 替换 | 未采用；历史保留；不能替当前 v2 补链 |
| `s300-highlight-02-25kw-power-v1-dark-ai.png` | `21eb3e0a1fda1c6790fd05cb3e06ebead62e961ea94e946afd3948f0b2ed1d47` / 1536×1024 | 有记录的旧 power 亮点，当前改为前叉 v2 | 未采用；历史保留 |
| `s300-highlight-03-27nm-torque-v1-dark-ai.png` | `fbee7d070c98ac8c73ba21e7f9fc6ec15892040c6f811618470a6d551131fe21` / 1536×1024 | 有记录的旧 torque 亮点，当前改为轮组 v2 | 未采用；历史保留 |
| `s300-highlight-04-11-4l-tank-v1-dark-ai.png` | `545d596c1d4fd7ab804fbd5f37c43deda9f23fc2c17ec08e210e10a7409050fd` / 1536×1024 | 有记录的旧油箱亮点，当前改为前碟刹 v2 | 未采用；历史保留 |
| `s300-hero-panel-left-front-red-v1-dark.png` | `1744b35f7d969572ae246b86b0621c9a975f12e1854fd29e2149de5515cb23fb` / 1672×941 | 资产记录明确覆盖的旧 Panel；并非当前 v11 | 未采用；历史保留；不能替 v11 补链 |
| `s300-hero-panel-industrial-red-v2-v11-lighting-master.png` | `7ca196e71dcbfd9ddc86de0611a1cc5fd74a62d5372228a365760cfc05c5505d` / 1672×941 | 当前 WebP Panel 的母版，画面高度一致 | 未直接采用；母版来源记录缺失，Pending |

资产记录还提到一组 light-background v1 和一个 `left-rear ... rejected-exhaust-drift` 文件，但这些文件不在当前 `s300-detail` 目录，且不影响本次当前采用资产计数；不据此推断其现存位置或审批状态。

## 6. B07 必须决策的事项

1. **先定车型配置**：当前页面是 Excel `S300` 的 NC300 四冲配置，还是官网系列中两冲/四冲某一具体整车？未定配置前不得把任何现有 AI 成图认定为“准确 S300”。
2. **指定唯一模型级身份锚点**：在 Excel `S300!B1`、官网 `S300-右侧.jpg` 或其他经业务确认的原图中明确选定；记录原始 URL/单元格、哈希和车型配置。不得继续仅凭本地 `official-*` 文件名批准。
3. **处理当前图库与 banner 的动力总成漂移**：若采用 NC300 四冲，需真实四冲整车/部件图证明 AI 图中的发动机、排气、车架安装关系；否则保持 Pending 或替换。
4. **四张 v2 亮点图逐张补链或撤换**：优先使用官网已有的真实 S300 系列发动机、前叉等部件图，但必须确认其对应确切配置。尤其前碟刹图需因几何疑点重新审定。
5. **Panel 决策**：即使身份通过，当前 v11 仍因整幅红洗、机械细节过暗而不满足既定 SJ300 Panel 门禁；需退回或明确例外，不能仅以 16:9 和完整车辆通过。
6. **产品世界预览门禁**：B07 仅在“身份锚点 + 配置 + 可见结构特征”三者一致时批准制作。预览生成应引用获批真实整车图，不应以当前 AI 图互相迭代来建立身份。

## 7. 汇总统计

| 项目 | 数量 |
| --- | ---: |
| 当前 JSON 图片槽位 | 11 |
| 当前唯一采用资产 | 11 |
| 来源完整闭环 | 0 |
| 来源部分闭环 | 7 |
| 来源未闭环 | 4 |
| 高/很高风险当前资产 | 11 |
| 当前可正式批准 | 0 |
| 当前审批 Pending | 11 |

最终判断：S300 当前图片体系在视觉上形成了统一的蓝黄暗黑工业系列，五图库角度顺序也正确；但统一风格不能替代真实车型身份。由于本地“official”锚点、Excel 嵌入图、官网系列混合图库与当前四冲 AI 成图之间没有形成一条可审计的模型级来源链，B07 完成上述决策之前，不能据此启动正式的 S300 产品世界预览制作。
