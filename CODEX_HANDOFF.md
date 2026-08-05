# Apex Moto Supply 新会话交接

更新时间：2026-08-05（Asia/Shanghai）

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
- 阶段 C 的 C01–C03 已完成：C01 的 582 项比较闭合后，C02 按 Excel 明确单元格同步 F29/F29R 六项几何参数与生成页；HS85 保留用途/车型家族双语义；C03 核对 ET 目录资格后维持其仅详情页状态，`site-data.js` 未修改。
- 已创建本地提交 `0043dad Complete audit and P1 data validation`；未推送远程、未部署、未回退或清理。

## 3. 当前可正常使用的功能

- 静态公开页面、产品分类页、新闻页、视频页、联系页和询盘页文件均存在。
- 27 个产品详情数据能通过当前 schema、图片存在性和 HTML 完整性门禁并生成。
- 当前产品详情页是完整静态 HTML，不需要运行时 fetch JSON，设计上支持 `file:///`。
- 产品世界菜单的分类、车型链接、响应式网格和已接入 5 款车型的悬停预览可用。
- 询盘前端仍保留浏览器 Excel 导出及 `/api/inquiries` 提交逻辑；本轮未做线上端到端发送验证。
- Cloudflare Worker 路由、D1/SMTP 和后台文件仍在；本轮只做了 Worker 语法检查，未部署验证。

## 4. 当前任务状态

- 第一版发布基线已于 2026-08-05 收口：27 个车型页按共享模板全量重建，`deploy/` 从源码生成并发布至 Cloudflare；当前生产版本为 `cc7c302a-bf32-4d7d-995f-aaae82de1d1e`。F29 使用统一详情布局、橙色主题及验收后的五角度图库。发布记录见 `docs/releases/v1.0.0.md`。
- P37 已于 2026-08-05 发布：sitemap 覆盖 43 个公开 URL 和全部 27 款车型，详情页具备 canonical 与分享卡片，公共页分享图使用绝对 URL，询盘成功发送不含个人信息的 GA4 `generate_lead` 事件。当前 Cloudflare 版本为 `9c5aec9e-4348-40b2-84e6-8d0b7073f082`，生产环境 43/43 页面与 F29 五图验证通过；详见 `docs/audits/p37-production-seo-conversion-readiness.md`。
- P38 已于 2026-08-05 发布：首页具备真实 Organization/WebSite JSON-LD，27 个车型页具备按燃油/电动分类生成的 BreadcrumbList；因站点为询价制且没有真实价格/评价，本阶段明确不生成 Product/Offer 富结果数据。Cloudflare 版本为 `a8d7421d-936f-40fc-8db3-a0673a113288`，生产环境首页及 27/27 车型 JSON-LD 解析通过；详见 `docs/audits/p38-structured-data-readiness.md`。
- P39 已于 2026-08-05 发布：首页移除 15.4 MB 首屏视频的独立 preload，首屏后六张车型图延迟加载；27 个车型详情页统一主图高优先级、图库缩略图低优先级、核心亮点和询盘横幅延迟加载。Cloudflare 版本为 `c932eb60-51a8-43f6-8c31-cb5cd46b499c`；生产固定 7 个 URL、27/27 车型页、F29 五图和 43 条 sitemap URL 验证通过。详见 `docs/audits/p39-production-performance-readiness.md`。
- P40 已于 2026-08-05 发布：询盘姓名/邮箱声明必填，校验失败会标记并聚焦首个错误字段；产品参数弹窗和详情灯箱增加模态 Tab 约束，关闭后焦点返回原按钮；27 款详情页统一初始 aria-hidden。Cloudflare 版本为 `36caa55d-c835-49fe-a606-7c88d1e87623`；生产固定 7 个 URL、27/27 车型页、F29 五图及 sitemap 43/43 验证通过，未提交询盘或写入 D1。详见 `docs/audits/p40-accessibility-keyboard-readiness.md`。
- P41 已于 2026-08-05 发布：询盘保存加入 12 秒超时、重复提交锁、`aria-busy` 与按钮恢复；Excel 生成返回明确结果，提交／下载四种组合分别提示，不再在下载失败时声称已下载。Cloudflare 版本为 `3be5ecfa-e92f-428c-93b2-fcbc7a1613d6`；生产固定 7 个 URL、询盘 v20 脚本、sitemap 43/43、F29 统一布局及五图验证通过，未提交生产询盘或写入 D1。详见 `docs/audits/p41-inquiry-resilience-compatibility.md`。
- 主控任务：阶段 A、阶段 B（B01–B08）、阶段 C（C01–C03）和阶段 D 的资产资格核验均已完成（2026-08-02）。通过候选资格但未接入的包括 F29R、ER3、ER5、ER7、ES11、ET、ET 2024、ET3、ET5、ET7、ET9、F4+、F9、H300、S300、S300R、SJ250、SN300、SY300；F29、HS85、SJ300 候选均判退。正式产品世界接入仍为 5/27。
- Apex 前端工程师：已停止本轮服务、浏览器、构建和车型派发；确认 2840、8010 无监听。
- 当前状态：阶段 E、F、G、H01 与 H02 均已于 2026-08-02 完成。HTTP 全站矩阵、27/27 Panel 资源路径和代表性桌面/平板渲染均通过；用户已完成本机 `file:///` 最终视觉验收。SJ250 使用用户最终指定的 `sj250-hero-panel-industrial-red-v11-master.png`；全车型生成页均使用相对于 `assets/css/product-detail.css` 的 `../img/...`，样式缓存为 v31。F03 已在隔离本地 Worker/D1 和浏览器中验证英文/中文 SMTP 未配置降级、XLSX 下载与 API 失败保底下载；H01/H02 已把 19 个合格候选登记到产品世界，正式预览覆盖 24/27。临时浏览器和服务均已停止。
- P35 已完成 P34 的 26 款产品世界预览整改：每款构图固化到独立新版本 PNG，旧版保留；`main.js` 现行 27 个映射全部存在且 HTTP 200，燃油 8 款、电动 19 款在实际菜单中逐款触发成功。最终实现没有保留用于校准的车型批量缩放 CSS；F4+、SJ300、S300R 未虚构无证据灯具。详见 `docs/audits/p35-product-world-preview-f4-remediation.md`。
- P36 已修复首页视频遮挡产品下拉菜单：根因是首页氛围层对所有直接子元素统一设置层级，导致页头与视频进入同级堆叠上下文；现对首页页头建立独立高层叠上下文并恢复移动菜单定位。1440/768/375 下菜单、视频播放/重播和横向溢出均通过。详见 `docs/audits/p36-home-video-product-menu-layering.md`。
- 阶段 G 已完成（G01，2026-08-02）：用户明确批准精确清单后，已删除 9 个根目录命令碎片和 1 个 Python 字节码缓存（共 41,057 bytes）；`__pycache__/` 已确认为空并移除。截图、候选资产、审计证据、`deploy/`、控制文档和源码均保留。
- H01 产品世界预览集中接入已完成（2026-08-02）：`main.js` 从 5 个映射扩展至 23 个，新增 ER3/ER5/ER7/ES11、ET/ET 2024/ET3/ET5/ET7/ET9、F4+/F9、H300、S300/S300R、SJ250、SN300、SY300。18 个新增资产哈希均复核，1440 燃油/电动悬停及 Arabic RTL 抽验通过；F29R 因唯一合格图仍位于历史 worktree 而未复制，F29/HS85/SJ300 维持判退。详见 `docs/audits/h01-product-world-preview-integration.md`。
- H02 F29R 历史预览接收与接入已完成（2026-08-02）：用户明确授权后，旧 worktree 的唯一已验收 PNG 已保留原件并复制到主项目；来源、主项目和 `deploy/` 的 SHA-256 均为 `b693fdb446d444b1a7c7b6921c0da1eff612a03660d694757dd0749b1abcd3d8`。`main.js` 映射数增至 24，1440 Electric/F29R 悬停显示通过；仅 F29、HS85、SJ300 尚无合格预览。详见 `docs/audits/h02-f29r-historical-preview-reception.md`。
- H03 F29 预览整改已完成（2026-08-02）：v1/v2 继续判退；一次以官方黑金 F29 正面/左侧图为参照的 v3（`0f9adfdbd969328e0e51f5c7ffc4b63b10a0ff541d56be61f9c3c9fe11e199b9`）已接入并同步 deploy，映射数增至 25。仅 HS85、SJ300 尚无合格预览。
- P01 预览门禁审计已完成（2026-08-02）：27 款当前映射均已按 F4 实显构图复核。统一锚点为车把 32–38%、车身中心 57–65%、脚踏 71–80%、前轮底部 86–93%，并保留顶部 HTML 文字安全区；10 款通过、17 款须以新版本资产整改，禁止依靠共享 CSS 批量缩放掩盖问题。详见 `docs/audits/p01-product-world-preview-gate-audit.md`。
- P04 Babey+ 构图整改已完成（2026-08-02）：`babey-plus-preview-headlight-v5.png`（SHA-256 `ae6ad3fa9f0764f3b12dc05e396dfecc748bee7ea881383eb96ee1ed0c5d6986`）已替换 v4 映射。它保留真实竖向头灯与原车型结构，按 F4 四位置锚点缩小、下移；旧版本未覆盖。详见 `docs/audits/p04-babey-plus-preview-composition.md`。
- P05/P06 已完成（2026-08-02）：首页已切换至与产品世界相同的标准 `site-header` 菜单；视频、新闻、询盘页原已使用同一模板，HTTP 复核一致。产品世界普通点击改为进入 `sy300.html?lang=…`，桌面端悬停和键盘 ArrowDown 仍可展开菜单。生成器统一把 27 个车型详情页左侧主图默认值改为第 02 张，五图资料顺序未改。详见 `docs/audits/p05-public-header-unification.md` 与 `docs/audits/p06-product-world-default-and-gallery-02.md`。
- P07 Bumblebee 构图整改已完成（2026-08-02）：`bumblebee-preview-headlight-v5.png`（SHA-256 `587534b6912e6f8483b79ae4ae805f2dc9de4527b27f3fd06e8686accf1824aa`）已接入。v5 保留车型白色侧板、圆形原灯、脚踏与全轮廓，并按 F4 锚点缩小和下移；旧 v4 保留。
- P08 ER5 构图整改已完成（2026-08-02）：`er5-preview-nolight-v2.png`（SHA-256 `df07d52701133559edea751a5104d276060417fe4943313545cdd979678ba251`）已接入。它保留绿色车身与黑色无灯号牌，未添加任何灯具；全车按 F4 四锚点构图，旧 v1 保留。
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
- C01 的 7 条双数据源冲突已由 C02 决策：F29/F29R 的外形尺寸、轴距、座高共 6 项按 Excel 同步至详情 JSON 与生成页；HS85 用途标签与车型家族字段保留双语义、不改任一数据。C03 确认 ET 不在 Excel 权威车型清单，故维持其仅存在于详情 JSON 的状态，不纳入目录数据。

### 资料差异

- SY300：灯具技术字段已收敛为 Excel 支持的“标配无灯，可选装灯具”；电池、排量、图片身份和灯具亮点仍 Pending。
- H300：本轮未改业务 JSON；300 cc、扭矩/启动电池异常标签、图片身份和现有来源/耐久文案仍 Pending，需先修复七语言映射错位再统一处理。
- HS85：已补回 Excel 的 Maxima 2T 燃油限定，并把 69 kg 标签改为“整备质量”；第四亮点脚踏材质/性能和图片来源仍 Pending。
- SJ250：已补回 100 km 续航的 `≤50 km/h` 条件；启动电池含义、营销扩写和 10 项图片身份链仍 Pending。
- S300R：已按 Excel 明确单元格修正轴距、离地间隙、座高、整备质量术语、传动、灯具、续航条件和 XFH300 命名；图片身份、灯具/脚踏结构冲突和未证实营销表述仍 Pending。
- S300：11/11 当前图片继续 Pending，未改 JSON、图片路径或资产。

### Git 与文件风险

- `git status`：29 个已跟踪文件修改，170 个未跟踪路径；其中本轮 C01、C02、C03 各新增一份报告；无暂存。B 阶段确认内容已提交为 `0043dad`，其余工作区改动保持原状。
- 跟踪文件 diff：3916 行新增、1257 行删除，29 个文件。
- 根目录命令碎片与 `__pycache__` 缓存已在 G01 中按用户批准的精确清单删除；未删除任何图片、审计证据、代码或配置。
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

### 阶段 C：双数据源一致性（C01–C03 已完成）

- 报告：`docs/audits/c01-dual-source-consistency.md`。
- 覆盖 27 份 `frontend/product-detail/data/*.json` 与 `frontend/assets/js/site-data.js` 的 26 条产品记录；25 款按 slug 直接映射，HS85 通过 `hs85cc`/`displayModel` 别名映射，ET 仅 JSON 侧存在。
- 582 个互斥审计单元闭合：一致 109、格式差异 267、真实冲突 7、仅单侧存在 199。
- 7 条真实冲突逐条定位为 F29 3 条、F29R 3 条、HS85 1 条；C01 本身不裁定来源，C02 负责后续证据决策。
- C02 报告：`docs/audits/c02-dual-source-conflict-decision.md`。依据 `Time-F!C3/C4/C6` 与 `D3/D4/D6` 的明确值，F29/F29R 各同步 Dimensions `2120 × 800 × 1235 mm`、Wheelbase `1440 mm`、Seat height `910 mm`；七语言映射与两页生成 HTML 同步。HS85 `HS85CC!B32` 仅证明用途，不证明需要替换详情车型家族字段，故无数据改动。
- 主任务复核：27 个车型统计行唯一且总和为 582；28 个 C01 源文件 SHA-256 与报告一致。C02 后两份原始工作簿及 `site-data.js` 哈希仍不变；F29/F29R 的 JSON、页面、七语言和 20 个图片引用通过定向验证；`node --check` 与 `git diff --check` 通过。
- C03 报告：`docs/audits/c03-et-directory-decision.md`。ET 详情 JSON 为完整详情结构，而目录是轻量卡片结构；`source-audit-index.json` 明确标记 ET 不在 Excel 权威车型清单，故不新增 `site-data.js` 记录。隔离定向构建的 ET 页面哈希与当前页一致，10/10 图片引用和七语言映射通过；无数据改动。

### 阶段 D：车型预览资产（第一批进行中）

- D14 报告：`docs/audits/d14-f29r-historical-candidate-revalidation.md`。旧 F29R worktree 的 v1 候选 SHA-256 为 `b693fdb446d444b1a7c7b6921c0da1eff612a03660d694757dd0749b1abcd3d8`；与当前 F29R 身份锚点、整车完整性、无字顶部安全区和暗黑工业预览门禁一致，复验通过但未复制或接入。
- D20 报告：`docs/audits/d20-sj300-historical-candidate-revalidation.md`。旧 SJ300 worktree 的 v1、v2 均为 887 × 1774 PNG；二者都把身份锚点的大面积嵌入式灯罩/前面罩改为无字斜纹号牌并新增独立三角灯，属于关键结构冲突，均判退。未复制、移动或接入旧候选。
- D16 报告：`docs/audits/d16-hs85-candidate-revalidation.md`。HS85 v1（`45cf350ea218795ef3d82d8805469c9e88d8481ead7cab766276abd381b2c114`）和 v2（`60edb2573061bacb0310069bfcfadbc4c2cb324450d92e1a8059b0d4b682b6a8`）均为 887 × 1774 PNG；两者在当前无灯前号牌位置虚构了发光头灯，均因关键前部结构冲突判退，未接入。
- D15 报告：`docs/audits/d15-h300-preview-creation.md`。本轮单次定向生成的正面 `frontend/assets/img/product-world-previews/h300-preview-headlight-v2.png`，SHA-256 为 `e17a06f395824c2984b9c71ad3b7865d4700f951eb51c00de6dd04fe02142093`，通过车型身份、1:2 尺寸、完整车把/轮胎/脚踏、无字顶部安全区、暗黑工业长廊、局部红光和湿地反射门禁。v1 左前 3/4 版本保留但不采用；v2 未接入。H300 图片来源仍 Pending，不声明官方来源。
- D17 报告：`docs/audits/d17-s300-preview-creation.md`。首次内置 ImageGen 调用返回“Selected model is at capacity”后未循环重试；在新的继续指令下执行一次新生成，新增未接入 `frontend/assets/img/product-world-previews/s300-preview-headlight-v1.png`，SHA-256 为 `615a66bdd722a8ce2119efd0dfb5a6af9ec3ab4791f19e67f7c1c1fe53bd06eb`。正面身份、1:2 尺寸、完整车辆、顶部安全区、暗黑工业/局部红光/湿地反射门禁通过；来源仍 Pending，不声明官方来源。
- D18 报告：`docs/audits/d18-s300r-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/s300r-preview-headlight-v1.png`，SHA-256 为 `d4bcd9feeabeb3e84583e79ed1438d65c14506532e85cc2997972d73b38f59ab`。正面身份、1:2 尺寸、完整车辆、顶部安全区、暗黑工业/局部红光/湿地反射门禁通过；来源仍 Pending，不声明官方来源。此前默认目录的未采用输出未复制或引用。
- ER3 整改报告：`docs/audits/er3-preview-remediation.md`。新增未接入 `frontend/assets/img/product-world-previews/er3-preview-headlight-v3.png`，SHA-256 为 `c2cb506fed966e54d6b29f46e7543ba85d97f9d3eecd93cdbaa376ee799c1b96`。v3 保持无灯黑色前号牌并把完整车型锁定在下半区，修复 v2 的虚构头灯与主体过大问题；1:2、顶部安全区、暗黑工业/局部红光/湿地反射门禁通过，来源仍 Pending，未接入。
- ER5 制作报告：`docs/audits/er5-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/er5-preview-headlight-v1.png`，SHA-256 为 `09816c213a6b6f6de143a016f5630fa1effd5bfe4f269a95af9e1f7076d498de`；无灯黑色号牌与绿色正面身份、1:2、完整车辆和统一场景门禁通过，来源仍 Pending，未接入。
- ER7 制作报告：`docs/audits/er7-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/er7-preview-headlight-v1.png`，SHA-256 为 `21775f8f36e6c48c26fbe9c238be577489672ac56d0179e867c270968ed4345f`；双镜头圆形头灯与橄榄绿正面身份、1:2、完整车辆和统一场景门禁通过，来源仍 Pending，未接入。
- ES11 制作报告：`docs/audits/es11-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/es11-preview-headlight-v1.png`，SHA-256 为 `925225e1974441802e91fd8620c81a12cd0c1eee29243117efc02f8b06a74efe`；全黑无灯正面身份、1:2、完整车辆和统一场景门禁通过，来源仍 Pending，未接入。
- ET 复验报告：`docs/audits/et-candidate-revalidation.md`。ET v1（`f8936b54313c49db8f1535b5cd537304998c31f87aa06ad3e23b03a8ced676af`）与当前正面身份锚点一致并通过构图门禁，获候选资产资格、未接入；`rejected-42pct` 继续历史保留。
- ET 2024 制作报告：`docs/audits/et-2024-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/et-2024-preview-headlight-v1.png`，SHA-256 为 `035bdd1a90f8812ec09ee6ac66636667fd09b0a08bf925496bca9c163d2fc2d7`；正面身份、1:2、完整车辆和统一场景门禁通过，来源仍 Pending。
- ET3 制作报告：`docs/audits/et3-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/et3-preview-headlight-v1.png`，SHA-256 为 `7a4859ae447f043e4362c4cf054af6f6155ae6e3a4a6d59c3a53d5fac212a39c`；红黑无灯正面身份、1:2、完整车辆和统一场景门禁通过，来源仍 Pending。
- ET5 复验报告：`docs/audits/et5-candidate-revalidation.md`。v1（`39aaab43dd663c429e4c32e6b120d1147ffa65f2ac54a3d337d770aee7e1965b`）的蓝色双三角灯正面身份与构图门禁通过，获候选资格、未接入。
- F9 复验报告：`docs/audits/f9-candidate-revalidation.md`。v1（`de77b086156bf0d5e85b0e34f8a65e1a5ea3f990b396d983fdaff7842b73f997`）与当前 F9 图库身份锚点一致并通过统一门禁，获候选资格、未接入。
- ET9 制作报告：`docs/audits/et9-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/et9-preview-headlight-v1.png`，SHA-256 为 `5bfaec6e3c3cead12a3c1d34ab9ff221a019b9fbe3bd15a1bed2632489b57f5a`；红色无灯正面身份与统一门禁通过。
- ET7 复验报告：`docs/audits/et7-candidate-revalidation.md`。v2（`fd7326e93165a8f2e7fa6782c11ec4519b61b68b815db57136737ff5bcf7e16d`）通过 11 项静态门禁，车型锚点与当前图库一致，获候选资格、未接入。
- F4+ 制作报告：`docs/audits/f4-plus-preview-creation.md`。新增未接入 `frontend/assets/img/product-world-previews/f4-plus-preview-headlight-v1.png`，SHA-256 为 `731817988cd1d2e21666c286cd986edef170c06671b1221f825bc1100404546d`；保留无灯黑色正面、暴露式车架/线缆、银色前叉和脚踏等身份锚点，并通过 1:2、完整车辆、顶部安全区及暗黑工业场景门禁。
- F29 复验报告：`docs/audits/f29-candidate-revalidation.md`。v1（`ddca1af6dd0938c9eb0f7477b2be653112168ad84556c7ef92db12a7eacdde4c`）和 v2（`b8919d7d28f1e421ae6ac267bf9ad4636cb2987d25021eae2583e03789f3a789`）均为白/红/蓝车型，和当前黑金 F29 的前面罩、灯组、前叉护板及涂装身份锚点冲突，均判退、未接入。
- SJ250 前置核对：`docs/audits/sj250-preview-dependency-check.md`。预览制作依赖的图片身份闭环未满足：五图、Panel 和四亮点共 10 项仍 Pending，当前官方图尚未接入可追溯身份链，且 v4 油箱图存在结构冲突；未生成、复制或接入候选，等待人工证据/决策。
- SJ250 单次授权尝试：`docs/audits/sj250-preview-generation-attempt.md`。以现有左前/左侧身份参照及银灰座下油箱参照生成的 887 × 1774 输出（SHA-256 `2196b860ec043fa8ca811e3d46ea485a19a51c53fe548278a4a0c3079c340cfa`）含虚构前叉文字/标记和前挡泥板徽记，门禁判退；未复制到仓库，未循环重试，图片身份闭环仍阻塞。
- SJ250 制作报告：`docs/audits/sj250-preview-creation.md`。在新的明确授权下，以相同身份参照进行一次新生成，新增未接入 `frontend/assets/img/product-world-previews/sj250-preview-headlight-v1.png`，SHA-256 为 `37fd5d8953d4aa0a5e5c702da5998e630313feb35eaed7dbda166ec33fd07a61`；红黑银前脸、竖置灯组、银色前叉、无字护板、轮胎、脚踏和两冲程膨胀室轮廓通过身份与统一预览门禁。既有五图/Panel/亮点来源仍 Pending。
- SN300 复验报告：`docs/audits/sn300-candidate-revalidation.md`。v3（`ad7d31dfd91b61944fe1e203afbfca9601496528d6c0cb64280dc7f58f2d4e77`）与当前官方右前身份图的蓝白黄涂装、中央灯组、前叉护板、轮胎和脚踏一致，通过候选门禁、未接入。
- SY300 复验报告：`docs/audits/sy300-candidate-revalidation.md`。v2（`947a4ff55df0ccc759e14f715197ee89239716a26eb2f82ee50d5bfdd27bb542`）与当前图库的蓝白黄前脸、中央灯组、散热器护板、前叉、轮胎和脚踏一致，通过候选门禁、未接入；图片来源继续 Pending。
- E01 浏览器基线报告：`docs/audits/e01-browser-baseline-validation.md`。临时 HTTP 服务下，首页在 375/768/1440/1920/2560 无文档横向溢出；SJ250 七语言、Arabic RTL、图库和技术页签、询盘页非提交状态、图片引用与控制台均通过。内置浏览器对 `file:///` 导航执行安全拦截，未绕过；全站矩阵仍待继续。
- E02 公共页面报告：`docs/audits/e02-public-pages-browser-validation.md`。产品目录、电动/燃油/迷你分类页、新闻、视频和联系页在 HTTP 375/768/1440 断点的文档宽度与滚动宽度一致，所有可见图片来源和控制台检查通过；临时服务已停止，产品详情全量与 `file:///` 矩阵仍待继续。
- E03 产品详情矩阵：`docs/audits/e03-product-detail-browser-matrix.md`。27 个生成详情页在 HTTP 375/768/1440 下均具有一个主 H1、至少 10 张图片、零失效图片来源、零未替换模板占位符、无文档横向溢出和零控制台告警；临时服务已停止，`file:///` 与剩余公共/新闻详情矩阵仍待继续。
- E04 剩余页面报告：`docs/audits/e04-remaining-pages-browser-validation.md`。批发、Pit Bikes、三个预览页和五篇新闻详情在 HTTP 375/768/1440 下均无失效图片、模板占位符、文档横向溢出或控制台告警；E01–E04 已闭合 HTTP 全站矩阵，`file:///` 仍受内置浏览器策略阻断。

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
- C01 双数据源复核通过：27 个车型统计行唯一，合计为一致 109、格式差异 267、真实冲突 7、仅单侧 199，共 582；28 个源文件哈希错误 0，`site-data.js` 语法检查通过。
- C02 冲突决策与同步通过：F29/F29R 六项几何参数均与 `Time-F!C3/C4/C6`、`D3/D4/D6` 一致，七语言映射完整，目标构建与页面图片引用通过；HS85 保持用途/系列双语义，`site-data.js` 和两份工作簿哈希未变。
- C03 ET 目录决策通过：ET 不在 Excel 权威车型清单，未加入 `site-data.js`；隔离 ET 目标构建、10/10 图片引用、七语言映射及 JS 语法检查通过。
- F01 API / 询盘静态契约与运行条件核对通过：`inquiry.html`、`main.js` 与 `worker.js` 的 name/email/model/quantity/message、`sourceUrl` 兼容及 `emailStatus` 返回/前端分支一致；`node --check api/worker.js`、`node --check frontend/assets/js/main.js` 通过。核对时无已安装 Wrangler 或项目依赖清单；后续 F02 已用 `npx.cmd` 的隔离工具完成运行时回归，见 `docs/audits/f01-inquiry-api-contract-readiness.md`。
- F02 隔离 Worker/D1 询盘 API 回归通过：以 Wrangler 4.118.0 的本地 HTTPS Worker 和临时 D1 验证 OPTIONS、必填/非法邮箱、蜜罐、有效保存后的 `emailStatus: "not_configured"` 降级及第 6 次请求返回 429。未访问远程 D1 或 SMTP，全部数据为 `example.invalid`；Worker 已停止、8787 端口已释放。系统临时 D1 路径和响应文件的删除被执行环境策略阻断，见 `docs/audits/f02-local-worker-inquiry-regression.md`。
- F03 询盘前端 Excel / 提示交互验收通过：隔离 Worker/D1 的真实浏览器路径已确认英文/中文 `emailStatus: "not_configured"` 提示、三份成功/失败路径的 XLSX 下载，以及 API 不可达后仍下载并告警。仅对 `127.0.0.1` 临时会话忽略本地自签名证书；不影响公开站点或浏览器常规安全设置。浏览器和 Worker 已停止，8787 已释放；详见 `docs/audits/f03-inquiry-browser-interaction-limitation.md`。
- F04 询盘 Excel 模板静态完整性核对通过：`main.js` 内嵌模板可解码为 11,328-byte XLSX ZIP，必要 Office 条目、A1–A10/C3–C6 的 14 个单元格和 14 个 `replaceXlsxCell` 映射均完整，未发现外部链接；JSZip Blob 生成链、`node --check` 与 `git diff --check` 通过。实际浏览器下载与提示仍由 F03 等待可访问本地页的环境，见 `docs/audits/f04-inquiry-xlsx-template-integrity.md`。
- E05 SJ250 本地文件 Panel 路径修复完成：`sj250.json` 原本正确使用 `../assets/...`，但生成器把 Panel 转为 `/assets/...`，导致 `file:///pages/sj250.html` 指向错误磁盘根路径。生成器现保留页面相对路径，SJ250 已定向重建；语法、目标构建、目标资产存在性和 `git diff --check` 通过。等待用户复验可视显示，见 `docs/audits/e05-sj250-file-panel-path-repair.md`。
- E06 SJ250 平板 Panel 背景可见性修复完成：用户约 1000px 截图命中 `max-width:65rem` 通用 `.24` 不透明度和重遮罩，暗黑原图近乎不可见。仅在 `48.01rem–65rem` 为 SJ250 覆盖为 `.64` 并减弱遮罩；不影响其他车型和手机断点。等待用户强制刷新后复验，见 `docs/audits/e06-sj250-tablet-panel-visibility-repair.md`。
- E07 SJ250 Panel 指定 Master PNG 完成：按用户明确指定，将 `panelImage` 从 WebP 切换至 `sj250-hero-panel-industrial-red-v11-v2-master.png`，只重建 SJ250。目标 PNG 存在、生成页不再引用旧 WebP、生成器语法和 `git diff --check` 通过；等待用户复验，见 `docs/audits/e07-sj250-panel-master-png-selection.md`。
- E08 SJ250 Panel 直接 CSS 资源引用完成：为排除伪元素自定义属性未呈现的差异，仅在 SJ250 平板断点直接加载用户指定的 master PNG；通用车型规则不变。临时 HTTP 服务确认页面、CSS 和 PNG 均为 200 后已停止；等待用户视觉复验，见 `docs/audits/e08-sj250-panel-direct-css-asset.md`。
- E09 SJ250 桌面 Panel 构图修复完成：浏览器对照表明用户截图对应 2560px 视口下约 1014px 宽的桌面 Panel，此前平板覆盖没有命中。仅为 `model-sj250` 的桌面断点增加指定 master PNG 的可见构图，保留平板覆盖，并将产品详情 CSS 查询版本升至 v28 后定向重建 SJ250。Playwright 1440/2560 截图中车身均清晰可见，控制台 0 错误；临时服务和浏览器已停止，见 `docs/audits/e09-sj250-desktop-panel-composition.md`。
- E10 SJ250 Panel 最终指定图切换完成：用户纠正最终资产应为不带 `-v2` 的 `sj250-hero-panel-industrial-red-v11-master.png`。该文件 SHA-256 为 `9a5259a5d4a9083969e5ad834574bd83e43d3b2250139b0b30f64c2e459f1b2d`；JSON、桌面及平板专用 CSS 引用均已统一，缓存版本升至 v29 并定向重建 SJ250。Playwright 2560px 实测新图请求 200 且 Panel 可见，见 `docs/audits/e10-sj250-panel-v11-master-selection.md`。
- E11 全车型 Panel 路径与可见性修复完成：除 SJ250 外的 26 个生成页仍含 `/assets/...` Panel 绝对路径；全量重建后虽转为 `../assets/img/...`，但浏览器确认 CSS 自定义属性在 `product-detail.css` 中解析为 `/assets/assets/img/...` 404。生成器现专门转换为 CSS 相对的 `../img/...`，全量重建 27 页并升至 v31。27/27 内联 Panel 路径与对应资产通过；Babey、F4、SY300 桌面和 F4 平板的实际渲染均显示车型，见 `docs/audits/e11-all-model-panel-path-and-visibility.md`。
- P09 ES11 产品世界预览复验完成：单次候选保留黑色无灯前号牌和完整车型，但车把／脚踏／前轮落点约为 30%／59%／81%，未满足 F4 统一构图约 35%／76%／90% 门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p09-es11-preview-composition.md`。
- P10 ET 产品世界预览复验完成：单次候选保留 ET 的白银前叉、青色图形、蓝黄号牌和原位置圆形头灯；但车把／脚踏／前轮落点约为 28%／61%／84%，未满足 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p10-et-preview-composition.md`。
- P11 ET 2022 产品世界预览整改完成：`et-2022-preview-headlight-v3.png`（SHA-256 `d6f7b83b62fc5ffc266091596f542afcc58780089c44ffef5660fb1be58760bc`）通过车型身份、真实圆形头灯、完整车辆与竖版构图门禁，映射已切至 v3；详见 `docs/audits/p11-et-2022-preview-composition.md`。
- P12 ET3 产品世界预览复验完成：单次候选保留无灯车型特征，但车把／脚踏／前轮落点约为 31%／62%／81%，不符合 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p12-et3-preview-composition.md`。
- P13 ET9 产品世界预览复验完成：单次候选保留红色车身、金色前叉和无灯号牌，但前轮底缘约 82%，未满足 F4 统一约 90% 落点。已判退、未复制候选、未更改映射；详见 `docs/audits/p13-et9-preview-composition.md`。
- P14 F4+ 产品世界预览复验完成：单次候选保留无灯黑色前端与完整车辆，但车把／脚踏／前轮落点约为 40%／69%／82%，未满足 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p14-f4-plus-preview-composition.md`。
- P15 F29 产品世界预览复验完成：单次候选保留车型和既有三角灯具，但车把／脚踏／前轮落点约为 31%／68%／88%，且前号牌出现可读字样，不满足位置和无文字／Logo 门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p15-f29-preview-composition.md`。
- P16 F29R 产品世界预览复验完成：单次候选保留金色车型、银色前叉与原位置灯具，也去除了可读字样；但车把／脚踏／前轮落点约为 26%／61%／85%，未满足 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p16-f29r-preview-composition.md`。
- P17 H300 产品世界预览复验完成：单次候选保留白色灯具围框、黄色车身和原位置厂灯，但车把／脚踏／前轮落点约为 42%／65%／79%，不符合 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p17-h300-preview-composition.md`。
- P18 S300 产品世界预览整改完成：`s300-preview-nolight-v2.png`（SHA-256 `66353c36a6782a7631a6ade76389b2e8db72a92a64016bf508ca34e8153c0514`）通过身份与构图门禁，映射已切换。因资料尚未证实中央面罩为可发光灯具，资产按无灯处理；v1 保留，详见 `docs/audits/p18-s300-preview-composition.md`。
- P19 S300R 产品世界预览整改完成：`s300r-preview-headlight-v2.png`（SHA-256 `a47423852ae4617aede8775963d5e27f45479cde0cf9d6048f36176d9335aff5`）通过身份、真实楔形头灯和竖版构图门禁，映射已切至 v2；v1 保留，详见 `docs/audits/p19-s300r-preview-composition.md`。
- P20 SJ250 产品世界预览复验完成：单次候选保留黑红车型、银色前叉、膨胀室和原位置灯具，但车把／脚踏／前轮落点约为 31%／58%／77%，未满足 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p20-sj250-preview-composition.md`。
- P21 SJ300 产品世界预览复验完成：单次候选保留黑红白车型、银色前叉、膨胀室与原位置透明灯具，但车把／脚踏／前轮落点约为 31%／59%／76%，未满足 F4 统一构图门禁。已判退、未复制候选、未更改映射；详见 `docs/audits/p21-sj300-preview-composition.md`。
- P22 SN300 产品世界预览整改完成：`sn300-preview-nolight-v4.png`（SHA-256 `705c49199145bf4fd61db74ffee4a6e958b414f5af49fcf2a2857dcefd6cf955`）保留车型身份并移除无证据的灯光，构图通过统一门禁，映射已切至 v4；v3 保留，详见 `docs/audits/p22-sn300-preview-composition.md`。
- P23 产品世界预览首轮汇总完成：P01 所列 17 款均已完成一次候选处理；Babey+、Bumblebee、ER5、ET 2022、S300、S300R、SN300 共 7 款已接入且资源 HTTP 200。ES11、ET、ET3、ET9、F4+、F29、F29R、H300、SJ250、SJ300 共 10 款已按门禁判退，等待新资源窗口后以独立批次单次重制；不得重复本轮失败请求。详见 `docs/audits/p23-product-world-preview-batch-summary.md`。
- P24 公共页面顶部导航一致性复核完成：首页、产品世界、视频、新闻及联系／询盘均已确认使用同一顶部导航模块；补齐新闻和联系当前项高亮，已重新生成本地预览，并在同一浏览器视口实测视频页与产品世界页顶部导航一致，通过 `git diff --check`。未修改共享样式、脚本、路由或询盘行为。详见 `docs/audits/p24-public-header-consistency.md`。
- P25 当前产品世界入口更正完成：旧 `products.html` 已取消，不再作为参照或备用入口。公共页和全量车型详情模板的产品世界链接统一回退至 `sy300.html`；全量车型页已重建，本地 HTTP 视频页确认不再含旧 `products.html` 链接。详见 `docs/audits/p25-current-product-world-entry-correction.md`。
- P26 SY300 公共页头模板化完成：首页、视频、新闻及联系／询盘页通过共享 `current-product-header` 采用与当前 `sy300.html` 相同的深色固定页头、品牌规格、导航间距和移动端规则；车型详情模板同步使用该类。已重建全部车型页，并完成桌面、768、375 浏览器验收。详见 `docs/audits/p26-sy300-public-header-template.md`。
- P27 车型图库缩略图路径修复完成：详情页生成器此前误把图库 alt 文本写入缩略图 `src`，导致所有车型缩略图失效；现已改为 `image.src`，全量车型页重新生成。SY300 在本地 HTTP 375px 复验中五图和默认第 02 张主图均正常显示。详见 `docs/audits/p27-gallery-thumbnail-source-fix.md`。
- P28 产品世界预览图复验完成：以 F4 竖版正面、点亮车灯、暗黑工业走廊、局部红光与湿地反射为门禁复验当前 27 张下拉预览。15 张通过，ER5、ER7、ES11、ET 2024、ET3、ET7、ET9、F4+、F29、H300、S300、SN300 共 12 张判退。仅记录结论，未改资产、映射、CSS 或 JS。详见 `docs/audits/p28-product-world-preview-reacceptance.md`。
- P29 ER5 下拉预览整改完成：基于原 ER5 图保留绿色车型身份及正面完整构图，创建 `er5-preview-headlight-v3.png` 并点亮自然 LED 前灯；新资产已映射，旧 `nolight-v2` 保留。静态检查、HTTP 资源检查和 `git diff --check` 已通过。详见 `docs/audits/p29-er5-preview-replacement.md`。
- P30 ER7 下拉预览整改完成：基于原 ER7 图保留橄榄绿色前部、圆形多 LED 灯组和完整正面构图，创建 `er7-preview-headlight-v2.png` 并增强前灯及卡片尺度可读性；新资产已映射，旧 v1 保留。静态检查、HTTP 资源检查和 `git diff --check` 已通过。详见 `docs/audits/p30-er7-preview-replacement.md`。
- P31 ES11 下拉预览整改完成：基于原 ES11 图保留黑色几何前脸、宽前挡泥板和完整正面构图，创建 `es11-preview-headlight-v2.png` 并新增嵌入式白色 LED 与可读的工业走廊照明；新资产已映射，旧 v1 保留。静态检查、HTTP 资源检查和 `git diff --check` 已通过。详见 `docs/audits/p31-es11-preview-replacement.md`。
- P32 产品世界预览整改第二批完成：ET 2024、ET3、ET7、ET9、F4+、F29、H300、S300、SN300 均已基于各自原始车型图创建并接入不覆盖的新版本；完整车型、中心位置、工业走廊、湿地反射和受控侧向红光均按 F4 门禁复验通过。F4+ 没有可证实的前灯外壳，保留真实无灯结构而未伪造灯光。`main.js` 语法、部署目录同步、九个资源 HTTP 200 与 `git diff --check` 均通过。详见 `docs/audits/p32-product-world-preview-replacement-batch-2.md`。
- P33 产品世界预览收口验收完成：`main.js` 的 27 个现行下拉预览映射均对应实际文件，且在本地 `http://127.0.0.1:8010/` 返回 HTTP 200。阶段 D / 产品世界预览构图统一主任务已闭合；未新增图片或修改 JSON、CSS、模板和页面。详见 `docs/audits/p33-product-world-preview-final-closure.md`。
- P34 严格 F4 视觉复验推翻 P33 的视觉收口结论：P33 只能证明文件与 HTTP 可达，未考虑 F4 卡片专用的 `scale(1.15)` 和标题安全区。1440px 实际下拉卡片与当前 27 张映射逐一复核后，仅 F4 通过，其余 26 款因车型占比、垂直锚点、安全区、正面角度或灯光至少一项不一致而判退／需重制。本次只更新审计和任务状态，未修改图片、映射、JSON、CSS、模板或页面。详见 `docs/audits/p34-product-world-preview-strict-f4-reacceptance.md`。
- 阶段 E 完成确认：用户于 2026-08-02 确认本机视觉验收通过；E01–E11 统一闭合。未启动后续阶段、未删除文件、未暂存或提交。
- G01 清理执行完成：2026-08-02 在用户明确批准后，再次核对 10 个候选的 SHA-256 与大小（共 41,057 bytes）并逐项删除；`__pycache__/` 为空后移除。未删除、移动、暂存或提交任何图片候选、工作簿、审计报告、`deploy/` 或控制文档，见 `docs/audits/g01-cleanup-proposal.md`。
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
3. 阶段 B 的 B01–B08 与阶段 C 的 C01–C03 已完成；F29/F29R 六项已同步，HS85 保留双语义；ET 因不在 Excel 权威车型清单而维持仅详情页状态，目录接入需未来单独取得产品范围依据。
4. D14/D20 历史候选复验已完成；SJ300 v1/v2 均判退且未接入。46 行 P1 Pending 继续按 B07 决策等待人工证据。
5. D 阶段资产资格核验及 P35 集中接入/严格 F4 构图复验已闭合；当前产品世界预览为 27/27 通过。SJ250 现有五图/Panel/亮点来源链仍 Pending，但不影响已通过的产品世界预览。
6. 阶段 E 的全站浏览器矩阵和 P36 首页视频/产品菜单层级复验均已完成。
7. 阶段 G 的批准清理已完成；其余候选与审计证据继续保留，不得无清单删除。
8. 下一项明确前置任务是任务 9“重建 deploy”；只有用户明确要求发布准备时才运行 `prepare-deploy.mjs`，运行 Wrangler、提交、推送或远程发布仍需分别遵守用户授权。

## 15. Git 状态摘要

- 分支工作区未清洁，禁止假设可以安全 reset/checkout。
- 已跟踪修改：57 个文件。
- 未跟踪：336 个路径；包含版本化图片、审计报告和历史候选，未做自动清理。
- 跟踪 diff：`+8082 / -2703`。
- 没有暂存、回退或自动清理；最新本地提交为 `0043dad`，未推送。
