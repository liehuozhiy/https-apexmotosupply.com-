# Apex Moto Supply 新会话交接

更新时间：2026-08-01（Asia/Shanghai）

本文件以当前工作区、`git status`、`git diff`、隔离构建结果和已启动任务的最后状态为依据。聊天记录只用于补充文件归属；发生冲突时以当前工作区为准。

## 1. 项目最终目标

完成 Apex Moto Supply 暗黑金属风、多语言、响应式摩托车批发官网。车型范围以 Excel 为准；官网同型号资料优先，官网缺项由 Excel 补齐。全部资料齐全车型需要独立详情页、五角度完整车辆图库、四项核心亮点、SJ300 风格 Panel、询盘入口、七语言/RTL，以及 HTTP 与 `file:///` 双打开方式验收。

## 2. 当前已完成内容

- 建立模块化控制规则：根控制层、`frontend`、`admin`、`api`、`shared`、`ops`、`docs`。
- 建立 JSON 驱动的产品详情页生成系统：模板、schema、共享七语言词典和单车型/全车型构建器。
- 当前有 27 份车型 JSON，且 27 个对应生成页均存在：Babey、Babey+、Bumblebee、ER3/5/7、ES11、ET/ET 2022/ET 2024/ET3/5/7/9、F4/F4+、F9/F29/F29R、H300、HS85、S300/S300R、SJ250/SJ300、SN300、SY300。
- 当前 27 个车型 JSON 与对应生成页一致。B08 已用当前生成器定向重建 SY300、HS85、SJ250、S300R；两次构建输出哈希一致，其他 23 个车型页哈希未变。
- 产品详情模板具备：五图图库、响应式主图区、四项统计、四项卖点、四项核心亮点灯箱、参数页签、询盘 CTA、共享海外合作流程/Why choose us/底部服务条和七语言数据。
- 产品世界顶部菜单已改为燃油/电动分类、暗黑金属四列模块：桌面 4 列、768 双列、390 单列；系列标题为“大号主名 + 小号系列”，主名下红线等宽，已移除越界扫描线。
- 产品世界专属悬停预览已正式接入 5 款：F4、Babey、Babey+、Bumblebee、ET 2022。
- 资料审计文件已存在：`frontend/product-detail/source-audit-index.json`、`frontend/product-detail/2026H&Q产品参数（英）-官网核对更新.xlsx`、根目录 `2026H&Q产品参数_网页对比分析.xlsx`。
- 阶段 B 的 B01–B08 已完成：集中报告含 58 行逐字段决策，20 个有明确依据的业务字段已更新并同步七语言，46 行不确定项保持 Pending；四个目标生成页已同步验证，原始 Excel、图片和共享 CSS/JS 未修改。
- 本轮没有部署、Git 提交、暂存或回退。

## 3. 当前可正常使用的功能

- 静态公开页面、产品分类页、新闻页、视频页、联系页和询盘页文件均存在。
- 27 个产品详情数据能通过当前 schema、图片存在性和 HTML 完整性门禁并生成。
- 当前产品详情页是完整静态 HTML，不需要运行时 fetch JSON，设计上支持 `file:///`。
- 产品世界菜单的分类、车型链接、响应式网格和已接入 5 款车型的悬停预览可用。
- 询盘前端仍保留浏览器 Excel 导出及 `/api/inquiries` 提交逻辑；本轮未做线上端到端发送验证。
- Cloudflare Worker 路由、D1/SMTP 和后台文件仍在；本轮只做了 Worker 语法检查，未部署验证。

## 4. 当前任务状态

- 主控任务：阶段 A 与阶段 B（B01–B08）均已完成。B07 汇总六份报告并完成有据数据更新；B08 已重建和验证 SY300、HS85、SJ250、S300R 四页。46 行不确定项继续 Pending；H300、S300 业务 JSON 未修改。
- Apex 前端工程师：已停止本轮服务、浏览器、构建和车型派发；确认 2840、8010 无监听。
- 当前正在处理的功能任务：无。所有任务应停在最后安全点，下一会话先按 `TASKS.md` 恢复。
- `Apex ET 工程师` 在任务列表仍显示 `active / waitingOnApproval`，是旧的“复制参考图到 ImageGen 缓存”审批残留；停止指令已投递，未获批、未启动 ImageGen、未产生写入。不得批准、重试或把该状态误当作仍在开发。
- 当前 `git worktree list` 只有主工作区及 4 个独立工作树：Babey（`483f`）、F4（`6276`）、SJ300（`cd27`）、F29R（`fa6a`）。交接中原称存在的 ET 独立工作树当前已不存在；ET 相关文件只能按主工作区遗留资产核对，不能再表述为“仅在工作树”。
- 外部 8188 端口仍由非本项目进程监听，负责人认定为外部 ComfyUI；不得当作本项目遗留服务擅自终止。

## 5. 已启动子任务结果

状态说明：“主项目”表示文件已在当前工作区；“工作树”表示成果只在 `.codex/worktrees`，尚未同步；“准备”表示只完成审计/提示词/路径规划，没有写入正式候选。

| 子任务 | 最后结果 | 实际文件/边界 | 当前结论 |
| --- | --- | --- | --- |
| Apex 前端工程师 | 完成共享产品世界菜单与 5 款正式预览接入 | `frontend/assets/js/main.js`、`frontend/assets/css/styles.css` | 已停止；共享文件是主要冲突热点 |
| Apex F4 工程师 | 工作树保留 v1/v2 预览候选；主项目另有正式 v6 | 工作树 `f4-preview-headlight-v1.png`、`v2.png`；主项目 `f4-preview-headlight-centered-v6.png` | A02 决策：v1/v2 均已被正式 v6 取代 |
| Apex Babey 工程师 | 工作树保留旧版及当前 v3；主项目已有相同 v3 | 工作树 `babey-preview-dark-metal-v1.png`、`headlight-v1/v2/v3.png`；主项目 v3 | A02 决策：前三个旧候选已被取代；同哈希 v3 仅历史保留，主项目正式映射不变 |
| 补齐 Babey+ 七语言翻译 / 预览 | 主项目生成多版候选并形成 v4 | `babey-plus.json`、`product-world-previews/babey-plus-*.png` | v4 已接入；旧版本保留 |
| Apex Bumblebee 工程师 | 主项目生成候选，负责人后续接入 v4 | `bumblebee-detail/**`、`product-world-previews/bumblebee-*.png` | v4 已接入 |
| ET 2022 任务 | 最初只准备；负责人后续生成并接入 v2 | `et-2022.json`、ET 2022 资产、`et-2022-preview-headlight-v2.png` | v2 已接入；当前隔离构建已通过 |
| Apex ET 工程师 | 历史记录称工作树生成新版 Panel 并修改 JSON；A01 确认当前该工作树不存在 | 主项目可访问遗留清单 38 项，其中直接引用 12 项；另有 2 个旧预览候选 | A02 决策：v1 进入后续独立复验，`rejected-42pct` 历史保留；均未接入 |
| 同步 Apex ET 既有成果 | 仅完成身份和提示词准备 | 无正式写入 | 未完成专属悬停预览 |
| Apex ER3 工程师 | 主项目有 v1/v2；最新候选构图未达门禁 | `er3-detail/**`、`gallery-corrected-v1/er3/**`、`product-world-previews/er3-*.png`、`er3.json` | 未正式接入；需要重新出图并验收 |
| Apex ER5 工程师 | 修正中性来源文案 | `frontend/product-detail/data/er5.json` | JSON 构建通过；悬停预览未做 |
| Apex ER7 工程师 | 只完成预览准备 | 无正式预览写入；已有 ER7 详情资产 | 悬停预览未做 |
| Apex ES11 工程师 | 只完成预览准备 | 无正式预览写入；已有 ES11 详情资产 | 悬停预览未做 |
| Apex ET3 工程师 | 只完成预览准备 | 无正式预览写入 | 悬停预览未做 |
| Apex ET5 工程师 | 准备后主项目出现 v1 候选 | `product-world-previews/et5-preview-headlight-v1.png` | 未接入、未集中复验 |
| Apex ET7 工程师 | 准备后主项目出现 v1/v2 候选 | `product-world-previews/et7-preview-headlight-*.png` | 未接入、未集中复验 |
| Apex ET9 工程师 | 只完成预览准备 | 无正式预览写入 | 悬停预览未做 |
| Apex ET 2024 工程师 | 只完成预览准备 | 无正式预览写入 | 悬停预览未做 |
| Apex F4+ 工程师 | 只完成预览准备 | 无正式预览写入；详情资产/JSON 已存在 | 悬停预览未做 |
| Apex F9 工程师 | 准备后主项目出现 v1 候选 | `product-world-previews/f9-preview-headlight-v1.png` | 未接入、未集中复验 |
| 接管并修复 F29 车型图片 | 中性化资源名并更新 JSON | `frontend/product-detail/data/f29.json`、F29 资源副本 | 构建通过；预览 v1/v2 未正式接入 |
| Apex F29R 工程师 | 工作树生成 v1 候选 | 工作树 `f29r-preview-headlight-v1.png` | A02 决定进入后续独立复验；主项目仍缺失、`main.js` 未接入 |
| Apex H300 工程师 | 完成只读来源矩阵 | 无功能写入 | 参数多数与 Excel 一致；仍有 P1 来源问题 |
| Apex HS85 Local 替代 | 删除车型词典对共享词条的重复覆盖 | `frontend/product-detail/data/hs85.json` | 构建通过；来源审计仍有 3 项差异 |
| Apex S300 Local 替代 | 修正第三项亮点的无依据颜色主张 | `frontend/product-detail/data/s300.json` | 构建通过；AI 图来源链仍待审核 |
| Apex S300R Local 替代 | 完成只读来源矩阵 | 无明确功能写入 | 官网模型级核验仍 Pending |
| Apex SJ250 Local 替代 | 完成只读来源矩阵 | 无明确功能写入 | 官网模型级核验及图片身份链仍 Pending |
| Apex SJ300 工程师 | 工作树保留 v1/v2 两个预览候选 | 工作树 `sj300-preview-headlight-v1.png`、`v2.png` | A02 决策：v2 进入后续独立复验，v1 历史保留；主项目仍缺失、`main.js` 未接入 |
| Apex SN300 Local 替代 | 完成来源矩阵 | `sn300.json` 与 Excel 23 项一致；主项目另有 v1-v3 候选 | 候选未正式接入 |
| Apex SY300 工程师 | 完成来源矩阵但官网字段未闭环 | `sy300.json`、SY300 详情资产、v1/v2 预览候选 | 23 项仍待官网车型级核验；候选未接入 |
| HS85 官网优先核对 | 只读核对出 3 项差异 | 无写入 | 见“未解决问题” |
| 对比网站图片与参数差异 | 产出对比工作簿 | 根目录 `2026H&Q产品参数_网页对比分析.xlsx` | 需人工确认后再作为修订依据 |
| Apex 模块化及其他模块负责人 | 本轮无可证明的业务写入 | 模块边界文件 | 保持待命；不得把无记录视为已验收 |

注意：部分任务状态为 `notLoaded` 或位于独立工作树，这不等价于成果已合入。当前主项目文件是唯一合入判据。

## 6. 尚未解决的问题、报错和风险

### 当前未完成

- 产品世界专属悬停预览仅正式接入 5/27；其余 22 款需要逐款资产门禁和集中浏览器复验。
- F29R、SJ300 候选仍在独立工作树，尚未经过主项目冲突检查和同步决策；ET 工作树当前不存在，只能核对主项目遗留资产及历史记录。
- ER3 当前 v2 构图被负责人判退；ET、ER5 未出现符合最新门禁并正式接入的候选。
- 尚未在本轮执行全站 375/768/1440/1920/2560、七语言/RTL、HTTP/file、交互和控制台完整矩阵；历史局部通过不能替代最终发布门禁。
- 官网与 Excel 的车型级闭环仍不完整；B07 已对有明确依据的字段作出决策，但 46 行身份、配置、标签含义、图片来源链或营销表述仍需人工确认。
- B08 已将 SY300、HS85、SJ250、S300R 生成 HTML 与 B07 后的源 JSON 同步；当前恢复为 27/27 车型页与生成器一致。

### 资料差异

- SY300：灯具技术字段已收敛为 Excel 支持的“标配无灯，可选装灯具”；电池、排量、图片身份和灯具亮点仍 Pending。
- H300：本轮未改业务 JSON；300 cc、扭矩/启动电池异常标签、图片身份和现有来源/耐久文案仍 Pending，需先修复七语言映射错位再统一处理。
- HS85：已补回 Excel 的 Maxima 2T 燃油限定，并把 69 kg 标签改为“整备质量”；第四亮点脚踏材质/性能和图片来源仍 Pending。
- SJ250：已补回 100 km 续航的 `≤50 km/h` 条件；启动电池含义、营销扩写和 10 项图片身份链仍 Pending。
- S300R：已按 Excel 明确单元格修正轴距、离地间隙、座高、整备质量术语、传动、灯具、续航条件和 XFH300 命名；图片身份、灯具/脚踏结构冲突和未证实营销表述仍 Pending。
- S300：11/11 当前图片继续 Pending，未改 JSON、图片路径或资产。

### Git 与文件风险

- `git status`：27 个已跟踪文件修改，919 个未跟踪路径；相对任务 1 的 909 项分类快照，新增 A01、A02、B01–B08 十份审计报告；无暂存、无提交。
- 跟踪文件 diff：3882 行新增、1246 行删除，27 个文件。
- 根目录存在明显命令碎片：`!i.complete`、`!i.naturalWidth).length`、`({src`、`0}))`、`String(r.status))`、`document.documentElement.clientWidth`、`document.documentElement.scrollWidth`、`getComputedStyle(...)`、`r.status)`。尚未删除，需先确认。
- 根目录还堆积大量 F4 验收截图、`_photo_review/`、`__pycache__/` 和其他审查产物；它们可能是证据，不得无清单直接删除。
- `deploy/assets/css/styles.css`、`deploy/inquiry.html`、`deploy/assets/js/main.js` 与 `frontend` 源文件哈希不同。`deploy/` 当前是过期生成物，禁止手改；最终只用 `prepare-deploy.mjs` 重建。
- 根 `CODEX.md` 当前是未跟踪文件；它包含长期有效的任务层级规则，不能被清理脚本误删。
- 工作区过大曾触发 Codex worktree 创建上限：`Working tree diff exceeds the 67108864-byte limit`。
- 行尾检查只出现 LF 将来转 CRLF 的警告；目前 `git diff --check` 没有空白错误。
- CSS 共享文件经过多轮叠加。关键选择器多次出现（部分是媒体查询而非冲突）：`.sy300-preview-spec-panel` 10 次、`.sy300-preview-tech-cards` 11 次、`.product-world-menu__grid` 3 次。后续修改前必须按级联和断点检查，不可简单删除“重复”定义。

### 未跟踪文件分类清单（任务 1，已完成）

快照口径：`git -c core.quotepath=false ls-files --others --exclude-standard`，共 909 项。分类互斥，总数校验为 `76 + 302 + 521 + 1 + 9 = 909`。正式资产以当前 `frontend/product-detail/data/*.json`、前端 CSS/JS 和 HTML 中可解析到的直接引用为准；没有引用的版本化图片仍归候选/证据，不因位于 `frontend/assets/` 就自动视为正式资产。

| 分类 | 数量 | 范围与结论 |
| --- | ---: | --- |
| 有效源码/配置 | 76 | 根控制文档 4、`.codex` 1、`control` 2、`ops` 1、脚本 2、共享数据 1、前端 CSS/JS 4、公开/生成页 30、车型 JSON 27、产品详情系统文件 4。不得清理。 |
| 正式资产 | 302 | 被当前车型 JSON、前端 CSS/JS 或 HTML 直接引用的 `frontend/assets/**` 图片；包括当前正式接入的 5 张产品世界预览。不得清理。 |
| 候选/证据 | 521 | `frontend` 483（未引用旧版/候选图、QA 截图、来源日志及核对副本）、根目录 19（F4/ER7 验收截图及对比工作簿）、`_photo_review` 10、过期 `deploy` 生成物 9。仅表示“未被当前页面直接采用或属于证据”，不表示可删除。 |
| 缓存 | 1 | `__pycache__/build_comparison_report.cpython-312.pyc`。后续清理仍需按任务 8 提交精确清单并获批。 |
| 明显命令碎片 | 9 | 见下方精确文件名。后续清理仍需按任务 8 获批。 |

9 个明显命令碎片为：`!i.complete`、`!i.naturalWidth).length`、`({src`、`0}))`、`String(r.status))`、`document.documentElement.clientWidth`、`document.documentElement.scrollWidth`、`getComputedStyle(document.getElementsByClassName('sy300-preview-spec-panel')[0]).getPropertyValue('--product-panel-image')`、`r.status)`。

任务 1 未执行删除、移动、复制、暂存或提交。A01 已完成工作树比较，但候选接收仍需 A02 决策；浏览器验收和精确清理审批完成前，不得进一步处置候选/证据文件。

### A01 历史 worktree 差异审计（已完成）

- 报告：`docs/audits/historical-worktree-diff.md`。
- 旧 worktree 全部保留且未修改：Babey `483f`、F4 `6276`、SJ300 `cd27`、F29R `fa6a`。
- 覆盖 361 个旧 worktree 文件：相同 100、不同 14、主项目缺失 247、被主项目直接引用 35；各 worktree 均满足分类数之和等于文件总数。
- Babey：42 项；工作树 v3 与主项目正式采用的同路径预览哈希一致，旧预览已被 v3 取代。
- F4：86 项；工作树 v1/v2 预览在主项目缺失，主项目已采用更新的 centered-v6。
- SJ300：190 项；工作树 v1/v2 预览均在主项目缺失且未接入，需 A02 决策。
- F29R：43 项；工作树 v1 预览在主项目缺失且未接入，需 A02 决策。
- ET：当前无 worktree；只记录主项目 38 项可访问遗留文件及其哈希，其中直接引用 12 项，不推断历史工作树内容。
- 主任务复核：四个 worktree 实际文件数与报告一致；复算报告内 169 个旧端/ET 哈希及 91 个主项目对应哈希，错误 0。

### A02 历史成果接收决策（已完成）

- 报告：`docs/audits/historical-candidate-intake-decisions.md`。
- 评估范围严格限定为 11 张历史产品世界预览候选；没有扩展到详情图库、Panel、JSON 或 QA 截图的接收决策。
- `a. 进入复验`（3）：SJ300 v2、F29R v1、ET v1。进入复验不代表正式接入，三者当前均未被 `main.js` 采用。
- `b. 历史保留`（3）：与主项目正式文件同哈希的 Babey v3、SJ300 v1、ET `rejected-42pct`。
- `c. 已被取代`（5）：Babey dark-metal-v1、Babey headlight-v1/v2、F4 headlight-v1/v2。
- 主任务复核：11 个候选的路径、SHA-256 和像素尺寸全部复算一致；目视抽查三个进入复验候选及 SJ300 v1/v2 差异，决策依据成立。
- A02 未复制、移动、重命名或接入候选，未修改 CSS、JS、JSON、HTML、生成页或旧 worktree。

### 阶段 B：P1 资料审计与集中决策（已完成）

- B01 SY300：`docs/audits/p1-sy300.md`。23/23 参数完整；页面与 JSON 23 项一致；与 Excel 规范化一致 21 项，灯光部分一致但存在无依据扩写 1 项，启动电池实质冲突 1 项。当前官方 S300 系列页不能提供 SY300 模型级参数证明，因此 23 项全部保持 Pending；排量和图片身份链另有 2 项 Pending。
- B01 强制交 B07 的重点：Excel `10A12V` 与页面/JSON `12 V 4 Ah 铅酸电池` 冲突；灯具接口/无转向灯细节缺来源；300 cc 缺独立来源；当前生成图不得标为官方图。
- B03 HS85：`docs/audits/p1-hs85.md`。核心公开矩阵 36 项：一致/有来源 33、冲突 2、来源缺失 1、需 B07 决策 3。
- B03 三个决策点：燃油描述补回 Excel 的 Maxima 2T 限定；将 69 kg 从“干重”纠正为 Excel 的“整备质量”；第四亮点脚踏的铝合金/排泥/轻量化主张无模型级来源。
- B02 H300：`docs/audits/p1-h300.md`。覆盖 42 项：与 Excel 一致或仅格式规范化 32、明确冲突 6、来源缺失 3、部分支持但图片身份链未闭环 1；官网模型级证据 0/42，因此 42/42 Pending。
- B02 七个决策点包括：300 cc/300-class 缺来源、A21 扭矩标签异常、A23 启动电池标签异常、220 km 条件遗漏、高位排气/耐久主张、错误的 official/verified 来源声明、图片身份链未闭环。
- 三项审计均使用 bundled spreadsheet runtime 只读导入两份工作簿，没有编辑或导出副本；主任务复核报告矩阵计数与已知 P1 风险一致。
- B04 SJ250：`docs/audits/p1-sj250.md`。核心内容 35/35 与页面/JSON 一致；Excel 完全/规范化一致 30、部分支持 5；严格模型级官网来源缺失或不足 32/35。当前五图、Panel、四亮点共 10 项全部身份链未闭环，其中油箱亮点存在明显结构冲突风险；45 项内容与图片状态全部 Pending，归并为 6 个 B07 决策组。
- B05 S300R：`docs/audits/p1-s300r.md`。公开内容 36 项中一致 20、冲突 13、来源缺失 3；官网模型级参数证据 0/36，全部 Pending。正式图片 10/10 身份链未闭环，其中头灯和脚踏与官方锚点存在可见结构冲突；归并为 9 个 B07 决策簇。
- B06 S300：`docs/audits/p1-s300-image-source.md`。当前 JSON 有 11 个图片槽位且对应 11 个唯一资产：来源完整闭环 0、部分闭环 7、未闭环 4；11 项全部 Pending，且均为高/很高风险。
- B06 关键风险：本地 `official-*` 锚点呈现两冲程膨胀室，而当前 JSON 与 AI 图描述 NC300 四冲；Excel 嵌入图与本地锚点哈希不同且 official match 仍为 Pending；四张当前 v2 亮点图无逐图生成记录；v11 Panel 上游记录缺失且整幅红洗不符合既定门禁。
- B07：`docs/audits/p1-consolidated-decisions.md`。汇总 58 行差异/决策点；12 行立即更新，对应 20 个业务字段与 126 个七语言映射项；46 行保留 Pending。`source-audit-index.json` 新增六款车型的 `p1Decision` 状态。
- B07 实际数据更新：SY300 1 项、HS85 2 项、SJ250 1 项、S300R 16 项；H300、S300 业务 JSON 未改。两份原始 Excel 的 SHA-256 复核不变，CSS/JS/图片未改。
- B08：`docs/audits/p1-model-build-validation.md`。SY300、HS85、SJ250、S300R 两次定向构建均成功且输出幂等；四页七语言、Arabic RTL 静态结构、B07 重点参数、40/40 图片引用、4 统计/4 卖点/4 亮点和模板结构均通过；其他 23 个车型页 SHA-256 全部未变。

### 历史报错，当前状态

- `et-2022.json`、`bumblebee.json` 曾在任务的只读解析中报结构错误；当前隔离全量构建已成功，因此不是当前阻塞。若再次出现，应先确认读取的是主项目而非旧工作树。
- 曾从 `C:\Users\Administrator` 运行 `node scripts/build-product-pages.mjs`，报 `MODULE_NOT_FOUND`；必须先进入项目根目录。
- 平台审批/只读任务无法由主控“自动批准”；旧任务采用唯一 Local 替代任务处理。不要声称能绕过平台强制审批。
- 本轮隔离构建临时目录 `C:\Users\Administrator\AppData\Local\Temp\apex-handoff-build-093ebfea9c104d95aa84481f3fb51ab1` 删除被安全策略拒绝，目录仍可能存在；不要用跨 shell 或不安全命令强删。

## 7. 多任务冲突检查

- 未发现 `<<<<<<<`、`=======`、`>>>>>>>` 合并冲突标记。
- 明确共享写入热点：`frontend/assets/css/styles.css` 和 `frontend/assets/js/main.js`。多个车型任务不得直接修改；只允许前端负责人集中处理。
- `frontend/assets/js/site-data.js` 与 `frontend/product-detail/data/*.json` 同时保存产品资料，存在双数据源漂移风险；当前不能自动互相覆盖。
- 车型 JSON 与生成 HTML 必须成对看待；当前 27/27 与生成器一致。禁止手改生成页。
- 当前独立工作树的 F29R、SJ300、Babey、F4 候选与主项目存在不同版本；ET 只有历史工作树记录和主项目遗留资产。同步前必须逐文件比较，禁止整目录复制覆盖。
- `deploy/` 与 `frontend/` 是源/生成关系，不是双向合并关系；以 `frontend/` 为准。

## 8. 已修改的重要文件

| 文件/目录 | 当前作用与修改摘要 |
| --- | --- |
| `frontend/assets/css/styles.css` | 全站暗黑金属风、SY300/SJ300 详情布局、响应式、产品世界菜单和悬停预览；最大共享改动文件 |
| `frontend/assets/js/main.js` | 产品世界分组、燃油/电动切换、悬停预览映射、八字宣传语、导航交互 |
| `frontend/assets/js/site-data.js` | 公共产品/页面数据和多语言内容，已大幅修改 |
| `frontend/assets/js/i18n.js` | 公共语言切换逻辑调整 |
| `frontend/product-detail/template.html` | 27 个详情页的唯一生成模板 |
| `frontend/product-detail/schema.json` | 车型 JSON 结构约束 |
| `frontend/product-detail/data/*.json` | 27 款车型的参数、翻译、五图、亮点、Panel 与询盘数据 |
| `shared/product-detail-common-translations.json` | 详情页七语言共享词典 |
| `scripts/build-product-pages.mjs` | schema/翻译/资产验证和原子生成脚本 |
| `scripts/prepare-deploy.mjs` | 清空并重建 `deploy/`；具有覆盖生成目录的行为 |
| `frontend/pages/<model>.html` | 27 个生成页；当前与模板/JSON 完全一致 |
| `frontend/pages/index.html` 及公共页面 | 导航、暗黑风、产品链接和公共内容调整 |
| `api/worker.js` | 增加 `home-preview.html` 静态路由；API 主体未在本轮继续改 |
| `deploy/**` | 过期生成物，当前与源文件不同步 |
| `frontend/CODEX.md`、根 `CODEX.md` | 项目任务层级、模块边界和负载规则 |

## 9. 项目目录与关键入口

```text
.
├─ frontend/
│  ├─ pages/                       # 公开页和生成的车型详情页
│  ├─ assets/css/styles.css        # 全站共享样式
│  ├─ assets/js/main.js            # 导航、产品世界和公共交互
│  ├─ assets/js/product-detail.js  # 详情页图库/标签/语言/灯箱
│  ├─ assets/js/site-data.js       # 旧公共产品数据
│  ├─ product-detail/
│  │  ├─ template.html             # 详情页模板
│  │  ├─ schema.json               # 数据 schema
│  │  ├─ data/*.json               # 27 款车型数据
│  │  └─ source-audit-index.json   # 官网/Excel/页面来源索引
│  └─ public/                      # robots、sitemap 等
├─ admin/                          # 管理后台静态页面和脚本
├─ api/worker.js                   # Cloudflare Worker/API/静态路由入口
├─ shared/                         # 共享翻译和纯数据
├─ scripts/
│  ├─ build-product-pages.mjs      # 产品页构建
│  ├─ compare-product-page.mjs     # 页面文本/图片/链接对比
│  └─ prepare-deploy.mjs           # 重建 deploy
├─ deploy/                         # 生成目录，不手改
├─ wrangler.toml                   # Cloudflare 配置
├─ CODEX.md                        # 根控制规则
├─ AGENTS.md                       # 长期开发规则
└─ TASKS.md                        # 剩余任务队列
```

## 10. 技术栈和依赖

- 原生 HTML5、CSS3、JavaScript，无前端框架。
- Node.js ESM 脚本；本轮环境 Node.js 24.18.0。
- Cloudflare Workers、静态 Assets、D1；Wrangler 配置位于 `wrangler.toml`。
- 浏览器端 JSZip 为 vendored 文件：`frontend/assets/vendor/jszip.min.js`。
- 可使用 Python `http.server` 做本地静态预览。
- 仓库没有 `package.json`，因此没有 `npm test`、`npm run build` 或锁文件；不要凭空添加依赖。

## 11. 启动、构建和测试命令

所有命令从项目根目录执行。

```powershell
# 本地静态预览；结束后停止该进程
python -m http.server 2850 --bind 127.0.0.1 --directory frontend
# 示例：http://127.0.0.1:2850/pages/sj300.html

# 构建单车型 / 全车型（会写 frontend/pages，先确认数据和写入范围）
node scripts/build-product-pages.mjs sj300
node scripts/build-product-pages.mjs --all

# JS/Worker 语法检查
node --check frontend/assets/js/main.js
node --check frontend/assets/js/product-detail.js
node --check frontend/assets/js/i18n.js
node --check frontend/assets/js/site-data.js
node --check api/worker.js
node --check scripts/prepare-deploy.mjs
node --check scripts/compare-product-page.mjs

# Git 形式检查
git diff --check
git status --short
git diff --stat

# 仅在明确进行发布准备时运行；会删除并重建 deploy/
node scripts/prepare-deploy.mjs
```

浏览器验收至少覆盖：375/768/1440，最终共享验收抽查 1920/2560；七语言与 Arabic RTL；HTTP 和 `file:///`；图库、tab、灯箱、询盘、导航、产品世界预览、控制台和图片请求。

## 12. 本轮真实测试结果

- 2026-08-01 接管复验：全量构建通过，27/27 车型生成成功；构建前后全部带生成标记页面 SHA-256 无变化。
- `node --check`：`main.js`、`product-detail.js`、`i18n.js`、`site-data.js`、`api/worker.js`、`prepare-deploy.mjs`、`compare-product-page.mjs` 全部通过。
- `git diff --check`：通过；只有 LF/CRLF 警告。
- 合并冲突标记扫描：0。
- HTTP 启动抽测通过：`index.html`、`products.html`、`sj300.html`、`main.js`、F4 正式产品世界预览均返回 200；临时 2850 服务已停止。
- A01 报告复核通过：361 项覆盖完整，260 个文件哈希复算一致，ET 缺失结论与当前 `git worktree list` 一致；报告无占位标记。
- A02 报告复核通过：11/11 候选覆盖完整，路径、哈希、尺寸错误 0；决策汇总为进入复验 3、历史保留 3、已被取代 5。
- B01 报告复核通过：23 项参数分类和为 23；23 项全部保留 Pending，另列排量与图片身份链 2 项 Pending。
- B03 报告复核通过：核心矩阵 36 项，`33 + 2 + 1 = 36`；三项已知 P1 差异均有证据、建议值和审批状态。
- B02 报告复核通过：42 项分类满足 `32 + 6 + 3 + 1 = 42`；42/42 Pending，七个 B07 决策点与已知风险一致。
- B04 报告复核通过：核心矩阵 35/35、图片资产 10/10，合计 45 项 Pending；官网直接/等义闭环仅 3/35，未把系列页弱旁证误报为模型级参数。
- B05 报告复核通过：公开内容满足 `20 + 13 + 3 = 36`；图片 10/10 未闭环，头灯与脚踏两项结构冲突证据明确。
- B06 报告复核通过：11 个当前采用资产全部覆盖，`0 + 7 + 4 = 11`；主任务只移除了报告日期行的 Markdown 尾随空格，当前 SHA-256 为 `3400e0721e1f72c267e0349400bca4f89b02dd5990aec87f48cd3dbf77fc847b`，无占位或冲突标记。
- B07 集中决策复核通过：58 个唯一决策行；12 行立即更新、对应 20 个业务字段和 126 个七语言映射项，46 行保持 Pending；两份原始 Excel 哈希不变。
- B08 生成验证通过：四个目标页两次定向构建成功且哈希幂等；报告记录的 27 个页面最终哈希与当前文件全部一致，其他 23 页未变；8 个相关 JS/MJS `node --check`、40/40 图片引用和 `git diff --check` 均通过。
- 未运行：全站浏览器矩阵、API/D1/SMTP 端到端、部署构建、Wrangler 预览、真实邮件发送。

## 13. 已尝试但失败或不应重复的方法

- 不要使用 `screenshot-to-html`：用户已明确取消。
- 不要从错误目录运行构建脚本；会得到 `C:\Users\Administrator\scripts\build-product-pages.mjs` 不存在。
- 不要为每个车型启动自己的服务器、浏览器或全量构建；曾造成 CPU 100% 和长时间停滞。
- 不要以 CSS 放大/裁切替代正确构图，也不要镜像或借用其他车型；会产生身份/角度错误。
- 不要把静态路径推导当作图片实际加载证据；必须检查 HTTP/file 请求和目视结果。
- 不要通过删除、暂存或提交用户改动来绕过 64 MiB worktree 限制。
- 不要尝试由任务自动批准平台权限；平台强制审批只能由用户或任务权限设置解决。
- 不要手工同步 `deploy/`，也不要在源文件未冻结前反复运行 `prepare-deploy.mjs`。
- 不要继续使用已判退的 ER3 v2 或 ET 旧候选作为正式预览。

## 14. 下一步顺序

1. 新会话先读 `AGENTS.md`、`CODEX.md`、本文件和 `TASKS.md`；涉及前端时再读 `frontend/CODEX.md`。
2. 阶段 A 的 A01、A02 已完成。旧 worktree 继续只读保留；SJ300 v2、F29R v1、ET v1 只获得“可进入后续独立复验”资格，尚未复制、接入或正式验收。
3. 阶段 B 的 B01–B08 已完成；当前停在 D 阶段前，不得在未收到用户指令时创建 D 阶段任务。
4. 46 行 Pending 资料差异继续按 B07 决策等待人工证据，不得猜测或自动覆盖。
5. 逐款完成剩余 22 个产品世界预览资产；两款一批，由前端负责人集中接入和复验。
6. 完成全站浏览器、七语言/RTL、HTTP/file、交互和图片加载矩阵。
7. 资料与 UI 全部通过后，再决定清理审查产物和根目录命令碎片。
8. 只有用户明确要求发布时才重建 `deploy/`、运行 Wrangler、提交或推送。

## 15. Git 状态摘要

- 分支工作区未清洁，禁止假设可以安全 reset/checkout。
- 已跟踪修改：27 个文件。
- 未跟踪：919 个路径；其中 909 项沿用任务 1 分类快照，新增 A01、A02、B01–B08 十份 `docs/audits/` 审计报告。
- 跟踪 diff：`+3882 / -1246`。
- 没有暂存、提交、回退或自动清理。
