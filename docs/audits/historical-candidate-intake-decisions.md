# A02 历史产品世界预览候选接收决策

更新日期：2026-08-01（Asia/Shanghai）

## 范围、依据与口径

本报告只判断 A01 明确列出的历史产品世界预览候选是否值得进入后续独立复验，不表示正式接入，也不处理详情页图库、Panel、车型 JSON 或 QA 截图。

事实依据按优先级为：当前文件、当前 `git worktree list --porcelain`、当前 `frontend/assets/js/main.js`、A01 报告 `docs/audits/historical-worktree-diff.md`。本次确认当前存在主工作区及 Babey `483f`、F4 `6276`、SJ300 `cd27`、F29R `fa6a` 四个旧 worktree；ET worktree 当前不存在，因此 ET 仅按主项目可访问遗留文件判断，不虚构旧路径或哈希。

逐张检查了原路径文件的存在性、SHA-256、像素尺寸/纵横比并直接目视。统一门禁为：约 1:2 竖版、完整真实车型正面、车把/轮胎/脚踏不裁切、顶部 HTML 文字安全区、暗黑工业长廊、局部红灯、湿地反射、无额外文字/人物/Logo/水印/CTA、车型身份一致。车身随车型参考图固有的装饰图形或型号样式单独标注，留给复验判断是否构成禁用 Logo。

决策含义固定为：`a. 进入复验`（有足够价值，允许后续只读复验）、`b. 历史保留`（保留证据或参考，不值得复验）、`c. 已被取代`（仅用于已有当前主项目更高版本且已正式采用的直接证据）。

## 当前正式映射基线

- `main.js` 当前采用 Babey `babey-preview-headlight-v3.png`；主项目文件为 887×1774（宽高比 0.5000），SHA-256 `44fe3145569e93190789d4d1b1eaf532d93404280c7145d48e6cd9c7e8c557bd`。
- `main.js` 当前采用 F4 `f4-preview-headlight-centered-v6.png`；主项目文件为 941×1672（宽高比 0.5628），SHA-256 `32f5d104f7d7dd4aca7cae37beac18ab95072725ba5c8b5497c7191316fec672`。
- `main.js` 当前没有 SJ300、F29R 或 ET 的专属产品世界预览映射；缺少映射不等于候选通过门禁。

## Babey（worktree `483f`）

### 1. `babey-preview-dark-metal-v1.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/483f/apex-moto-static/frontend/assets/img/product-world-previews/babey-preview-dark-metal-v1.png`；SHA-256 `47891b27a26d6fd824b26aeedfaee9e89cbba7b69c2054a0e3f28499f3ab9675`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 未采用。它是无点亮头灯的早期暗金属版；当前主项目已正式采用同车型更高的 headlight v3，且 v3 与 worktree 同名文件哈希一致。
- **门禁观察：** 优点是 1:2、正面居中、顶部留白充足、车把和前轮未裁、暗黑长廊与湿地红光成立，且无额外文字、人物、水印或 CTA；缺陷是头灯未点亮、主体前部构图偏紧且脚踏不可辨，视觉完成度低于 v3。车型轮廓与当前 Babey 正面参考一致。
- **是否值得复验：** 否。主项目采用的 v3 已补足头灯、脚踏可辨性和构图平衡，没有继续复验早期版本的增量价值。
- **决策：** **c. 已被取代**。

### 2. `babey-preview-headlight-v1.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/483f/apex-moto-static/frontend/assets/img/product-world-previews/babey-preview-headlight-v1.png`；SHA-256 `9b51ec070fc55e42a5e5bbfd45a48bbf67b7ff5936501eec27a32487b29c482d`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 未采用。相较 dark-metal v1 增加点亮头灯和可见脚踏；后续 headlight v2、v3 继续调整主体尺度与上下安全空间，当前正式采用 v3。
- **门禁观察：** 1:2、车型正面完整，车把、前轮和两侧脚踏未裁；顶部留白、暗黑工业背景、局部红灯和湿地反射均具备，无额外文字、人物、Logo、水印或 CTA。主要缺陷是主体较大、轮胎下沿安全余量偏小，红色地面反射较强，构图不如 v3 稳定。
- **是否值得复验：** 否。正式采用的 v3 保留其有效视觉语言并提供更均衡的安全空间。
- **决策：** **c. 已被取代**。

### 3. `babey-preview-headlight-v2.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/483f/apex-moto-static/frontend/assets/img/product-world-previews/babey-preview-headlight-v2.png`；SHA-256 `0411b4ecc92b50a84911f275e8b9943db7a0fec2bfe1f8fb2596d43778a2b4df`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 未采用。它较 headlight v1 提高顶部留白并收敛主体尺度；后续 v3 进一步改善背景层次、上下余量与车体居中，当前正式采用 v3。
- **门禁观察：** 1:2、正面身份一致，车把、前轮和脚踏完整，顶部文字安全区明显；暗黑长廊、局部红灯、烟雾和湿地反射成立，无额外文字、人物、Logo、水印或 CTA。缺陷是前轮仍接近下缘，红色反射较抢眼，主体与背景的层次弱于 v3。
- **是否值得复验：** 否。现行 v3 是同一演进链的更完整版本，复验 v2 不会形成可用增量。
- **决策：** **c. 已被取代**。

### 4. `babey-preview-headlight-v3.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/483f/apex-moto-static/frontend/assets/img/product-world-previews/babey-preview-headlight-v3.png`；SHA-256 `44fe3145569e93190789d4d1b1eaf532d93404280c7145d48e6cd9c7e8c557bd`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** worktree 与主项目均存在且哈希完全相同；`main.js` 正式采用主项目同路径文件。它是前三版之后的当前版本，不存在更高的 Babey 正式预览版本证据。
- **门禁观察：** 1:2，正面车型与当前 Babey 参考一致；车把、前轮和脚踏未裁，顶部 HTML 文字安全区及底部余量更均衡；暗黑工业背景、局部红灯、轻烟和湿地反射成立，无额外文字、人物、Logo、水印或 CTA。目视未见足以重开历史候选复验的明显缺陷。
- **是否值得复验：** 否。该 worktree 文件只是当前已采用文件的同哈希历史副本；它已走出现行接入结果，不需要再作为“待接收候选”复验。
- **决策：** **b. 历史保留**。

## F4（worktree `6276`）

### 5. `f4-preview-headlight-v1.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/6276/apex-moto-static/frontend/assets/img/product-world-previews/f4-preview-headlight-v1.png`；SHA-256 `621864dcb30799e072d6556634bec46e4bdba690843d62e3d525e6069ed57f7d`；941×1672，宽高比 0.5628。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 未采用。当前主项目已正式采用更高且明确标注 centered 的 v6；v6 与候选尺寸相同但 SHA-256 不同。
- **门禁观察：** 约 1:2、正面车型与当前 F4 参考一致，车把、轮胎和两侧脚踏完整；顶部留白、暗黑长廊、点亮头灯、局部红灯与湿地反射均成立，无额外文字、人物、Logo、水印或 CTA。缺陷是主体略偏离视觉中轴、轮胎下方空间较少，车体与两侧红灯的平衡弱于 centered-v6。
- **是否值得复验：** 否。当前正式采用的 centered-v6 对同一构图做了更明确的居中和余量修正。
- **决策：** **c. 已被取代**。

### 6. `f4-preview-headlight-v2.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/6276/apex-moto-static/frontend/assets/img/product-world-previews/f4-preview-headlight-v2.png`；SHA-256 `7b8902f5dcc8088bf6438d103fa14d1e03ca466d5d4fa553f0e9f0103b85ec07`；941×1672，宽高比 0.5628。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 未采用。它较 v1 调整了主体横向位置和尺度；当前主项目正式采用后续 centered-v6，尺寸相同但哈希不同。
- **门禁观察：** 约 1:2，正面车型身份一致，车把、轮胎和脚踏均未裁，顶部 HTML 文字安全区充足；工业长廊、局部红灯、湿地反射和轻烟成立，无额外文字、人物、Logo、水印或 CTA。缺陷是主体仍稍显大、左右视觉重量和下方余量不如 centered-v6 稳定。
- **是否值得复验：** 否。centered-v6 已正式解决这一演进链的居中问题，v2 没有独立复验价值。
- **决策：** **c. 已被取代**。

## SJ300（worktree `cd27`）

### 7. `sj300-preview-headlight-v1.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/cd27/apex-moto-static/frontend/assets/img/product-world-previews/sj300-preview-headlight-v1.png`；SHA-256 `7388ef3e08e57ba4d3a36ab76de0e0e8c0a5a3db7a66a1a0f2cc19a231fbb29b`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 无 SJ300 映射。v2 是同 worktree 的后续候选，缩小并下移主体，扩大顶部文字安全区；没有当前主项目正式采用更高版本的证据，因此不能标为“已被取代”。
- **门禁观察：** 1:2，红黑车身、正面号牌和左侧膨胀室与当前 SJ300 正面参考一致；车把、前轮和脚踏均未裁，暗黑工业背景、局部红灯和湿地反射成立，无额外文字、人物、Logo、水印或 CTA。缺陷是主体相对较大、顶部留白少于 v2，车把与号牌区域视觉拥挤。
- **是否值得复验：** 否。v2 保留相同身份和环境，同时提供更好的顶部安全区与主体尺度；后续复验只需带入 v2。
- **决策：** **b. 历史保留**。

### 8. `sj300-preview-headlight-v2.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/cd27/apex-moto-static/frontend/assets/img/product-world-previews/sj300-preview-headlight-v2.png`；SHA-256 `12209d135d9536be49d599d302a499ca066ee787afcd2a619b4842f2336f47a3`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 无 SJ300 映射。相较 v1，主体更小、更低，顶部安全区更大；A01 未发现正式更新版本。
- **门禁观察：** 1:2，完整正面车型与当前 SJ300 参考的号牌、红黑涂装、前叉和左侧膨胀室一致；车把、轮胎和脚踏未裁，顶部 HTML 文字区充分；暗黑工业长廊、局部红灯、烟雾和湿地反射完整，无额外文字、人物、Logo、水印或 CTA。主要待复验点是缩小后的菜单实显清晰度、号牌装饰是否会被误读为文字，以及前轮下方余量是否满足实际容器裁切。
- **是否值得复验：** 是。它满足大部分静态门禁、身份证据直接且当前没有正式 SJ300 专属预览，具备独立复验价值。
- **决策：** **a. 进入复验**。

## F29R（worktree `fa6a`）

### 9. `f29r-preview-headlight-v1.png`

- **候选路径与哈希：** `C:/Users/Administrator/.codex/worktrees/fa6a/apex-moto-static/frontend/assets/img/product-world-previews/f29r-preview-headlight-v1.png`；SHA-256 `b693fdb446d444b1a7c7b6921c0da1eff612a03660d694757dd0749b1abcd3d8`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅旧 worktree 存在，主项目缺失，`main.js` 无 F29R 映射。A01 未发现正式更新版本；候选与主项目当前 F29R 正面图库参考在金色车身、前灯面罩、前叉和挡泥板结构上相符。
- **门禁观察：** 1:2、正面居中，车把、前轮和两侧脚踏未裁，顶部安全区充分；暗黑工业背景、局部红灯、烟雾和湿地反射成立，无人物、水印或 CTA。缺陷/待核项是车身面罩与挡泥板存在固有样式标记，需复验确认是否触发“无 Logo”门禁；同时要在实际菜单尺寸核对金色细节和头灯是否仍清楚。
- **是否值得复验：** 是。构图和身份匹配度高，且当前没有正式 F29R 专属预览；标记合规与实际裁切可以由最小只读复验明确判定。
- **决策：** **a. 进入复验**。

## ET（仅主项目遗留文件）

### 10. `et-preview-headlight-v1.png`

- **候选路径与哈希：** `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/product-world-previews/et-preview-headlight-v1.png`；SHA-256 `f8936b54313c49db8f1535b5cd537304998c31f87aa06ad3e23b03a8ced676af`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅主项目存在，不属于可访问 worktree，`main.js` 无 ET 映射。与同目录 `rejected-42pct` 相比，v1 主体明显更大、菜单缩略显示潜力更高；当前没有正式 ET 专属预览或更高版本证据。
- **门禁观察：** 1:2、正面车型与主项目当前 ET 参考的蓝白面罩、环形头灯、前叉护板和脚踏位置一致；车把、前轮、脚踏未裁，顶部文字安全区、暗黑长廊、局部红灯、烟雾和湿地反射均具备，无人物、水印或 CTA。待复验点是主体较大时实际容器底部裁切余量，以及车身固有图形/字样是否触发“无 Logo/文字”门禁。
- **是否值得复验：** 是。身份一致、主体可读性强且当前没有正式 ET 映射；其剩余问题适合在不接入的独立复验中确认。
- **决策：** **a. 进入复验**。

### 11. `et-preview-headlight-v1-rejected-42pct.png`

- **候选路径与哈希：** `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/product-world-previews/et-preview-headlight-v1-rejected-42pct.png`；SHA-256 `b02a9c5a2b97f2fc229cb2e3740655483adef2e840f96a9aa728856552dbce6d`；887×1774，宽高比 0.5000。
- **当前状态与历史差异：** 仅主项目存在，不属于可访问 worktree，`main.js` 未采用；文件名明确记录 `rejected-42pct`。它与 ET v1 身份和场景一致，但主体按约 42% 尺度缩小，顶部与四周空白显著增加。
- **门禁观察：** 1:2，车辆、车把、轮胎和脚踏均完整，身份与当前 ET 参考一致；暗黑工业长廊、局部红灯和湿地反射成立，无人物、水印或 CTA。主要缺陷是车型过小，大量空白削弱菜单悬停预览的车型辨识度；车身固有图形/字样问题仍存在，且文件名已有明确判退证据。
- **是否值得复验：** 否。与 v1 相比没有新的身份或合规优势，主体过小的已知缺陷足以维持判退历史状态。
- **决策：** **b. 历史保留**。

## 决策汇总

### a. 进入复验（3）

1. `cd27/.../product-world-previews/sj300-preview-headlight-v2.png`
2. `fa6a/.../product-world-previews/f29r-preview-headlight-v1.png`
3. 主项目 `frontend/assets/img/product-world-previews/et-preview-headlight-v1.png`

### b. 历史保留（3）

1. `483f/.../product-world-previews/babey-preview-headlight-v3.png`（与主项目正式文件同哈希）
2. `cd27/.../product-world-previews/sj300-preview-headlight-v1.png`
3. 主项目 `frontend/assets/img/product-world-previews/et-preview-headlight-v1-rejected-42pct.png`

### c. 已被取代（5）

1. `483f/.../product-world-previews/babey-preview-dark-metal-v1.png`
2. `483f/.../product-world-previews/babey-preview-headlight-v1.png`
3. `483f/.../product-world-previews/babey-preview-headlight-v2.png`
4. `6276/.../product-world-previews/f4-preview-headlight-v1.png`
5. `6276/.../product-world-previews/f4-preview-headlight-v2.png`

总计 11 张：`a` 3 张、`b` 3 张、`c` 5 张。

## 后续最小复验任务

允许创建的最小任务名称：**A03 SJ300/F29R/ET 产品世界预览候选独立复验**。

- **只读边界：** 仅可读取上述 `a` 类 3 张候选的原路径、当前 `frontend/assets/js/main.js`、相应车型当前正面参考资产，以及产品世界预览容器相关现有 HTML/CSS；可做文件元数据、像素级观察和不写盘的容器适配推演。
- **写入边界：** 仅允许新增或更新 `docs/audits/historical-preview-candidate-reverification.md`，记录逐张门禁结论与“建议接入/不建议接入”；不得复制候选、不得修改或接入 CSS/JS/JSON/HTML，不得写入旧 worktree，不得构建、启动浏览器、生成图片、部署或执行 Git 写操作。

## 无变更声明

本任务没有复制、移动、重命名或接入任何候选，没有修改 CSS、JS、JSON、HTML、生成页或旧 worktree；没有执行构建、浏览器、图片生成、部署、Git 暂存、提交、回退或清理。除本报告外未写入其他文件。
