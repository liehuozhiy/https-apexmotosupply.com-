# Apex Moto Supply 剩余任务

执行前必须读 `AGENTS.md`、根 `CODEX.md`、目标模块 `CODEX.md` 和 `CODEX_HANDOFF.md`。状态以 2026-08-01 当前工作区为准。

## 必须顺序执行的收口任务

| 任务名称 | 涉及文件 | 前置依赖 | 验收标准 | 当前状态 | 可并行 | 禁止修改范围 |
| --- | --- | --- | --- | --- | --- | --- |
| 1. 未跟踪文件分类清单 | `git status` 中 909 个路径（含本轮 3 份交接文档） | 无 | 分成有效源码、正式资产、候选/证据、缓存、明显命令碎片；仅报告，不删除 | 已完成（2026-08-01；见 `CODEX_HANDOFF.md` 第 6 节） | 否 | 全部业务文件、Git 历史 |
| 2. 独立工作树成果差异与接收决策 | 当前 4 个工作树：F29R、SJ300、Babey、F4；ET 仅核对主项目遗留资产 | 任务 1（已满足） | A01 逐文件差异；A02 对每个历史预览候选给出进入复验/历史保留/已被取代决策 | A01、A02 均已完成（2026-08-01；见 `docs/audits/historical-*.md`） | 可低负载并行 | 共享 CSS/JS、其他车型、Git |
| 3. 官网/Excel P1 决策 | `source-audit-index.json`、两份核对工作簿、相关车型 JSON | 任务 1 | SY300、H300、HS85、SJ250、S300R 每项差异有采用值、来源和审批结论；原始 Excel 不被覆盖 | 已完成（B01–B08，2026-08-01；集中决策及四车型生成验证均通过） | 可按车型并行 | 图片生成、共享布局、原始 Excel |
| 4. 双数据源一致性审计 | `frontend/assets/js/site-data.js`、`frontend/product-detail/data/*.json` | 任务 3 | 覆盖 27 款并将共享语义字段分为一致、格式差异、真实冲突、仅单侧存在；经证据决策后仅同步明确字段 | 已完成（C01–C03，2026-08-01；6 项几何参数已按 Excel 同步，HS85 保留双语义，ET 经范围核对继续仅详情页） | 否 | 自动覆盖任一数据源、页面布局 |
| 5. 产品世界预览构图统一 | `docs/audits/p35-product-world-preview-f4-remediation.md` | P34 已按 1440px 实际 F4 卡片重开视觉门禁 | 每款与 F4 的标题安全区、车把、脚踏、前轮底边、正面角度和灯光一致后才能通过 | 已完成（2026-08-02）：P35 将 26 款整改为独立版本化底图，移除临时批量缩放规则；27/27 实际卡片、映射与 HTTP 资源复验通过 | 图片生成最多 1 个并串行 | 不修改车型数据；不得用共享 CSS 批量缩放掩盖构图问题 |
| 6. 全站集中浏览器验收 | `frontend/pages/**`、共享 CSS/JS、全部有效资产 | 任务 3–5 | HTTP/file、375/768/1440、1920/2560抽查、七语言/RTL、无404/横滚/裁切/重叠、控制台0错误 | 已完成（阶段 E，2026-08-02）：HTTP 全站矩阵、27/27 Panel 资源路径与代表性桌面/平板渲染通过；用户已完成本机 `file:///` 最终视觉验收 | 仅 1 个集中验证槽 | 功能整改需另立最小任务，不能边验边大改 |
| 7. API/询盘回归 | `frontend/pages/inquiry.html`、`frontend/assets/js/main.js`、`api/worker.js` | 任务 6 公共页面稳定 | Excel 下载、请求字段/API响应兼容；测试环境验证，不发送真实客户邮件 | 已完成（阶段 F，2026-08-02）：F01–F04 已通过，包含真实浏览器的下载、双语 SMTP 未配置与 API 失败保底下载验证 | 否 | D1 schema、SMTP密钥、后台认证 |
| 8. 审查产物清理提案 | 根截图、`_photo_review/`、`__pycache__/`、命令碎片 | 任务 1、6 | 提交精确删除清单并获得用户批准；有效证据/正式资产不删 | 已完成（G01，2026-08-02）：用户批准后删除 9 个命令碎片和 1 个 Python 缓存文件（41,057 bytes），空 `__pycache__/` 同步移除；有效证据与正式资产均保留 | 否 | 未确认文件、产品资产、根 `CODEX.md` |
| 9. 重建 deploy | `scripts/prepare-deploy.mjs`、`deploy/**` | 任务 6–8 完成且用户明确要求 | `deploy` 与 `frontend/admin` 源一致，路由抽测通过 | 已完成（2026-08-05）：27 个车型页按共享模板全量重建，发布目录由源码生成；Cloudflare 版本 `cc7c302a-bf32-4d7d-995f-aaae82de1d1e` 已上线 | 否 | 不得手改 deploy，不得自动部署/Git |

## 阶段 B：P1 资料审计、决策与生成验证状态

B01–B06 只生成独立报告；B07 依据六份报告集中决策，只更新证据明确且无需人工确认的车型 JSON 与 `source-audit-index.json`；B08 仅同步并验证四个目标生成页。工作簿、共享 CSS/JS、图片和未确认字段均未修改。

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| B01 SY300 P1 资料审计 | `docs/audits/p1-sy300.md` | 已完成（2026-08-01） | 23/23 参数覆盖；Excel 规范化一致 21、灯光部分一致 1、启动电池冲突 1；23 项模型级官网证据均缺失并保持 Pending，排量与图片身份链另有 2 项 Pending |
| B02 H300 P1 资料审计 | `docs/audits/p1-h300.md` | 已完成（2026-08-01） | 42 项：Excel 一致/格式差异 32、明确冲突 6、来源缺失 3、图片身份链未闭环 1；42/42 Pending，需 B07 明确决策 7 |
| B03 HS85 P1 资料审计 | `docs/audits/p1-hs85.md` | 已完成（2026-08-01） | 核心 36 项：一致/有来源 33、冲突 2、来源缺失 1；需 B07 决策 3 |
| B04 SJ250 P1 资料审计 | `docs/audits/p1-sj250.md` | 已完成（2026-08-01） | 核心 35 项全部 Pending；Excel 一致 30、部分支持 5；官网模型级不足 32/35；正式图片身份链 10/10 未闭环；B07 决策组 6 |
| B05 S300R P1 资料审计 | `docs/audits/p1-s300r.md` | 已完成（2026-08-01） | 公开内容 36 项：一致 20、冲突 13、来源缺失 3，全部 Pending；正式图片 10/10 未闭环、结构冲突 2；B07 决策簇 9 |
| B06 S300 图片来源审计 | `docs/audits/p1-s300-image-source.md` | 已完成（2026-08-01） | 当前采用 11 个唯一资产：完整闭环 0、部分闭环 7、未闭环 4；11 项全部 Pending 且均为高/很高风险；B07 前不足以支持正式预览制作 |
| B07 P1 集中决策与数据更新 | `docs/audits/p1-consolidated-decisions.md` | 已完成（2026-08-01） | 58 行决策矩阵；12 行立即更新、对应 20 个业务字段和 126 个七语言映射项；46 行保留 Pending；索引新增 6 个车型级 `p1Decision`；原始 Excel、图片、共享 CSS/JS 未改 |
| B08 P1 车型生成验证 | `docs/audits/p1-model-build-validation.md` | 已完成（2026-08-01） | SY300、HS85、SJ250、S300R 两次定向构建成功且幂等；七语言、B07 参数、40/40 图片引用、模板结构通过；其他 23 个车型页哈希不变 |

## 阶段 C：双数据源一致性

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| C01 双数据源一致性报告 | `docs/audits/c01-dual-source-consistency.md` | 已完成（2026-08-01） | 27 份 JSON 全覆盖；`site-data.js` 覆盖 26 款；582 项闭合为一致 109、格式差异 267、真实冲突 7、仅单侧 199；ET 仅 JSON 侧存在；后续决策由 C02 完成 |
| C02 双数据源冲突决策与同步 | `docs/audits/c02-dual-source-conflict-decision.md` | 已完成（2026-08-01） | Excel `Time-F!C3/C4/C6`、`D3/D4/D6` 明确支持 F29/F29R 六项几何参数；仅更新两份 JSON、七语言映射及两页生成 HTML；HS85 Purpose/series 保留双语义，`site-data.js` 未改 |
| C03 ET 目录数据最小修订 | `docs/audits/c03-et-directory-decision.md` | 已完成（2026-08-01） | ET 详情 JSON 与目录卡片为异构结构，且 ET 不在 Excel 权威车型清单；不新增 `site-data.js` 产品记录，不改任何车型数据 |

## 阶段 D：车型预览资产（第一批）

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| D14 F29R 历史候选复验 | `docs/audits/d14-f29r-historical-candidate-revalidation.md` | 已完成（2026-08-01） | 旧 worktree 的 v1 身份、整车完整性和预览构图通过；仅获候选资产资格，未复制或接入 |
| D20 SJ300 历史候选复验 | `docs/audits/d20-sj300-historical-candidate-revalidation.md` | 已完成（2026-08-01） | 旧 worktree 的 v1、v2 均因关键前部结构与身份锚点不一致而判退；未复制或接入 |
| D16 HS85 候选复验 | `docs/audits/d16-hs85-candidate-revalidation.md` | 已完成（2026-08-01） | v1、v2 均将身份锚点的无灯前号牌虚构为发光头灯，属于关键前部结构冲突，均判退 |
| D17 S300 预览制作 | `docs/audits/d17-s300-preview-creation.md` | 已完成（2026-08-02） | 新单次生成授权后 v1 正面候选通过身份与预览门禁；未接入，图片来源仍 Pending |
| D15 H300 预览制作 | `docs/audits/d15-h300-preview-creation.md` | 已完成（2026-08-02） | v2 正面候选通过身份与预览门禁；v1 左前 3/4 版本保留但不采用，未接入 |
| D18 S300R 预览制作 | `docs/audits/d18-s300r-preview-creation.md` | 已完成（2026-08-02） | 新单次生成 v1 正面候选通过身份与预览门禁；未接入，图片来源仍 Pending |

## 产品世界预览独立任务

统一验收：约 1:2 竖版无字底图；顶部 HTML 文字安全区；完整真实车型正面，车把/轮胎/脚踏不裁切；车灯按车型能力开启；黑色工业长廊、局部红灯和湿地反射；无人物、Logo、水印、CTA；1440 悬停实际加载、标题/八字宣传语不重叠、无横滚。车型任务只写本车型版本化资产；`main.js` 映射由前端负责人集中修改。

| 任务名称 | 涉及文件 | 前置依赖 | 当前状态 | 可并行 | 禁止修改范围 |
| --- | --- | --- | --- | --- | --- |
| ER3 预览整改 | `product-world-previews/er3-preview-headlight-v3.png`、ER3 身份图 | 废弃 v2，重新锁定 bbox | 已完成（2026-08-02）；v3 通过身份与构图门禁，未接入 | 是，图片槽 | 共享文件、其他车型 |
| ER5 预览制作 | `product-world-previews/er5-preview-headlight-v1.png`、`er5-detail/**` | 身份图确认 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| ER7 预览制作 | `product-world-previews/er7-preview-headlight-v1.png`、ER7 正面图 | 准备已完成 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| ES11 预览制作 | `product-world-previews/es11-preview-headlight-v1.png`、ES11 正面图 | 准备已完成 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| ET 候选独立复验 | 主项目 `et-preview-headlight-v1.png`、ET 身份图 | A02 已完成 | 已完成（2026-08-02）；v1 通过候选资格，`rejected-42pct` 历史保留，均未接入 | 是，验证 | 不虚构已消失 worktree；不直接接入或修改共享文件 |
| ET 2024 预览制作 | `product-world-previews/et-2024-preview-headlight-v1.png` | 准备已完成 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| ET3 预览制作 | `product-world-previews/et3-preview-headlight-v1.png` | 准备已完成 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| ET5 候选复验 | `et5-preview-headlight-v1.png` | 身份比对 | 已完成（2026-08-02）；v1 通过候选资格，未接入 | 是，验证 | 不重新出图直到判定 v1 |
| ET7 候选复验 | `et7-preview-headlight-v2.png` | 身份比对 | 已完成（2026-08-02）；v2 通过候选资格，未接入 | 是，验证 | 不重新出图直到判定 v2 |
| ET9 预览制作 | `product-world-previews/et9-preview-headlight-v1.png` | 准备已完成 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| F4+ 预览制作 | `product-world-previews/f4-plus-preview-headlight-v1.png` | 准备已完成 | 已完成（2026-08-02）；v1 通过门禁，未接入 | 是，图片槽 | JSON参数、共享文件 |
| F9 候选复验 | `f9-preview-headlight-v1.png` | 身份比对 | 已完成（2026-08-02）；v1 通过候选资格，未接入 | 是，验证 | 不重新出图直到判定 v1 |
| F29 候选复验 | `f29-preview-headlight-v1.png`、`f29-preview-headlight-v2.png` | 身份比对 | 已完成（2026-08-02）；v1/v2 均因关键前部结构和涂装与 F29 身份锚点冲突而判退，未接入 | 是，验证 | 不改中性化 JSON |
| F29R 工作树候选独立复验 | 工作树 `f29r-preview-headlight-v1.png` | A02 已完成 | D14 复验通过；仅资产资格，主项目仍缺失、未接入 | 否 | 禁止复制或整目录接收；不修改共享文件 |
| H300 预览制作 | `product-world-previews/h300-preview-headlight-v2.png`、H300 身份图 | H300 来源 P1 决策 | D15 v2 正面候选已通过门禁；未接入，来源仍 Pending | 是，图片槽 | 参数/亮点未批准前不改 |
| HS85 候选复验 | `hs85-preview-headlight-v1.png`、`hs85-preview-headlight-v2.png` | HS85 来源 P1 决策 | 已完成（D16，2026-08-01）；v1/v2 均因虚构前灯与无灯前号牌身份锚点冲突而判退，未接入 | 是，验证 | 不改 JSON 参数 |
| S300 预览制作 | `product-world-previews/s300-preview-headlight-v1.png` | S300 图片来源确认 | D17 v1 正面候选通过门禁；未接入，来源仍 Pending | 是，图片槽 | 已修正文案、共享文件 |
| S300R 预览制作 | `product-world-previews/s300r-preview-headlight-v1.png` | S300R 来源 P1 决策 | D18 v1 正面候选通过门禁；未接入，来源仍 Pending | 是，图片槽 | 参数/共享文件 |
| SJ250 预览制作 | `product-world-previews/sj250-preview-headlight-v1.png`、`docs/audits/sj250-preview-creation.md` | 新授权的车型身份参照决策 | 已完成（2026-08-02）；v1 通过身份与统一门禁，未接入；现有五图/Panel/亮点图片来源仍 Pending | 是，图片槽 | 参数/共享文件 |
| SJ300 工作树候选独立复验 | `docs/audits/d20-sj300-historical-candidate-revalidation.md` | A02 已完成 | 已完成（D20，2026-08-01）；v1/v2 均因关键前部结构与身份锚点冲突而判退，未复制或接入 | 否 | 禁止复制或整目录接收；不修改共享文件 |
| SN300 候选复验 | `sn300-preview-headlight-v3.png` | 身份比对 | 已完成（2026-08-02）；v3 通过候选资格，未接入 | 是，验证 | JSON参数、共享文件 |
| SY300 候选复验 | `sy300-preview-headlight-v2.png` | SY300 来源 P1 决策 | 已完成（2026-08-02）；v2 通过候选资格，未接入；图片来源仍 Pending | 是，验证 | 参数/共享文件 |

## 阶段 E：集中浏览器验收

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| E01 HTTP 基线浏览器验收 | `docs/audits/e01-browser-baseline-validation.md` | 已完成（2026-08-02） | 首页、SJ250 和询盘页的 HTTP 基线在 375/768/1440/1920/2560、七语言/RTL、图库/页签、图片与控制台检查均通过；`file:///` 被当前浏览器安全策略阻断，完整矩阵仍待继续 |
| E02 公共页面浏览器验收 | `docs/audits/e02-public-pages-browser-validation.md` | 已完成（2026-08-02） | 产品目录、三类产品页、新闻、视频和联系页在 HTTP 375/768/1440 下均无文档横向溢出、图片失败或控制台告警；完整产品详情与 `file:///` 矩阵仍待继续 |
| E03 产品详情全量浏览器矩阵 | `docs/audits/e03-product-detail-browser-matrix.md` | 已完成（2026-08-02） | 27 个生成详情页在 HTTP 375/768/1440 下均通过 H1、图片、模板占位符、文档横向溢出和控制台检查；`file:///` 与剩余公共/新闻详情矩阵仍待继续 |
| E04 剩余公共与新闻详情页矩阵 | `docs/audits/e04-remaining-pages-browser-validation.md` | 已完成（2026-08-02） | 批发、Pit Bikes、三个预览页和五篇新闻详情在 HTTP 375/768/1440 下均无图片失败、模板占位符、文档横向溢出或控制台告警；HTTP 全站矩阵闭合，`file:///` 仍被工具策略阻断 |
| E05–E10 SJ250 Panel 修复链 | `docs/audits/e05-*.md` 至 `e10-*.md` | 已完成（2026-08-02）；由 E11 统一闭环，用户本机视觉验收通过 | 相对路径、断点构图、最终指定 `v11-master.png` 与缓存更新均已纳入全车型方案 |
| E11 全车型 Panel 路径与可见性修复 | `docs/audits/e11-all-model-panel-path-and-visibility.md` | 已完成（2026-08-02）；用户本机 `file:///` 最终视觉验收通过 | 27/27 页均使用 `product-detail.css` 可解析的 `../img/...`，缓存版本 v31；代表性桌面/平板渲染通过 |

## 阶段 F：API / 询盘回归

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| F01 API / 询盘静态契约与运行条件核对 | `docs/audits/f01-inquiry-api-contract-readiness.md` | 已完成（2026-08-02） | 表单字段、`sourceUrl` 兼容、`emailStatus` 返回/前端分支及两份 JS 语法检查均通过；核对时无全局 Wrangler、`package.json` 或 `package-lock.json`，后续 F02 已通过不写入项目依赖的 `npx.cmd` 完成运行时回归 |
| F02 隔离 Worker / D1 询盘 API 回归 | `docs/audits/f02-local-worker-inquiry-regression.md` | 已完成（2026-08-02） | Wrangler 4.118.0 的本地 HTTPS Worker/D1 通过 OPTIONS、必填/邮箱校验、蜜罐、保存后 SMTP 未配置降级和 5 次/小时限流；仅使用 `example.invalid` 数据，Worker 已停止；临时 D1 清理受执行环境删除策略阻断，路径已记录 |
| F03 询盘前端 Excel / 提示交互验收 | `docs/audits/f03-inquiry-browser-interaction-limitation.md` | 已完成（2026-08-02） | 隔离本地 Worker/D1 的真实浏览器验收通过：英文/中文 `not_configured` 提示、XLSX 下载及 API 不可达时下载继续和失败提示均正确；浏览器和 Worker 已停止 |
| F04 询盘 Excel 模板静态完整性核对 | `docs/audits/f04-inquiry-xlsx-template-integrity.md` | 已完成（2026-08-02） | 内嵌 XLSX 可解码，ZIP 结构、14 个目标单元格、14 个替换映射和 JSZip Blob 生成链完整；未发现外部链接 |

## 阶段 G：审查产物治理

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| G01 审查产物清理提案 | `docs/audits/g01-cleanup-proposal.md` | 已完成（2026-08-02） | 用户批准后，10 个已复核候选（41,057 bytes）已删除，空 `__pycache__/` 已移除；所有截图、候选资产、审计证据、`deploy/`、控制文档和源码均保留 |

## 阶段 H：产品世界正式接入

| 子任务 | 报告 | 当前状态 | 核心结论 |
| --- | --- | --- | --- |
| H01 已通过候选预览集中接入 | `docs/audits/h01-product-world-preview-integration.md` | 已完成（2026-08-02） | `main.js` 新增 18 个当前主项目候选映射，正式预览覆盖 23/27；F29R 历史 worktree 文件未复制，F29/HS85/SJ300 维持判退 |
| H02 F29R 历史候选接收与接入 | `docs/audits/h02-f29r-historical-preview-reception.md` | 已完成（2026-08-02） | 用户明确授权后，单一历史 PNG 已以哈希一致方式接收、登记并在 1440 菜单悬停通过；正式预览覆盖 24/27 |
| H03 F29 候选整改与接入 | `docs/audits/h03-f29-preview-remediation.md` | 已完成（2026-08-02） | 一次受官方身份图约束的 v3 生成通过门禁并接入；正式预览覆盖 25/27 |

| P04 Babey+ 预览构图统一 | `docs/audits/p04-babey-plus-preview-composition.md` | 已完成（2026-08-02） | v5 保留真实竖向前灯，按 F4 四位置锚点重新构图并接入；旧 v4 保留 |
| P05 公共页顶部菜单统一 | `docs/audits/p05-public-header-unification.md` | 已完成（2026-08-02） | 首页改用产品世界标准顶部菜单；视频、新闻、询盘复核为同一模板；语言切换保持相对询盘链接 |
| P06 产品世界默认入口与图库首图 | `docs/audits/p06-product-world-default-and-gallery-02.md` | 已完成（2026-08-02） | 点击产品世界进入 SY300；27 个生成车型页默认显示左侧第 02 张图库预览 |
| P24 公共页面顶部导航一致性复核 | `docs/audits/p24-public-header-consistency.md` | 已完成（2026-08-02） | 首页、产品世界、视频、新闻和联系／询盘均使用同一 `site-header / nav / header-actions` 模块；补齐新闻与联系当前项高亮 |
| P25 当前产品世界入口更正 | `docs/audits/p25-current-product-world-entry-correction.md` | 已完成（2026-08-02） | 旧 `products.html` 已取消；公共页和车型详情模板的产品世界备用入口统一为 `sy300.html`，全量车型页已重建 |
| P26 SY300 公共页头模板化 | `docs/audits/p26-sy300-public-header-template.md` | 已完成（2026-08-02） | 首页、视频、新闻和联系／询盘采用与 `sy300.html` 一致的共享页头规格，并完成桌面、768 和 375 宽度验收 |
| P27 车型图库缩略图路径修复 | `docs/audits/p27-gallery-thumbnail-source-fix.md` | 已完成（2026-08-02） | 修正详情页生成器将 alt 文本写入缩略图 `src` 的问题；全量车型页已重建，SY300 移动端五图验证通过 |
| P28 产品世界预览图复验 | `docs/audits/p28-product-world-preview-reacceptance.md` | 已完成（2026-08-02） | 以 F4 为构图门禁复验 27 张下拉预览：15 张通过、12 张判退；仅生成审计，不改映射或资产 |
| P29 ER5 下拉预览整改 | `docs/audits/p29-er5-preview-replacement.md` | 已完成（2026-08-02） | 使用保留 ER5 身份的新版本点亮前灯并对齐 F4 构图；原图保留，新版本映射已接入 |
| P30 ER7 下拉预览整改 | `docs/audits/p30-er7-preview-replacement.md` | 已完成（2026-08-02） | 保留 ER7 圆形多 LED 灯组与车型外形，提升车身尺度及前灯可读性；原图保留，新版本映射已接入 |
| P31 ES11 下拉预览整改 | `docs/audits/p31-es11-preview-replacement.md` | 已完成（2026-08-02） | 保留 ES11 黑色几何前脸与完整正面结构，新增嵌入式灯光并提升暗色车型可读性；原图保留，新版本映射已接入 |
| P32 产品世界预览整改第二批 | `docs/audits/p32-product-world-preview-replacement-batch-2.md` | 已完成（2026-08-02） | ET 2024、ET3、ET7、ET9、F4+、F29、H300、S300、SN300 已逐张按 F4 门禁整改并接入版本化新图；原图均保留，F4+ 因无已证实灯位不伪造头灯 |
| P34 产品世界下拉预览严格 F4 复验 | `docs/audits/p34-product-world-preview-strict-f4-reacceptance.md` | 已完成（2026-08-02） | 以 1440px 实际卡片及 F4 专用 1.15 倍渲染为唯一基准重新检查 27 款：F4 通过，其余 26 款因安全区、锚点、占比、角度或灯光至少一项不符而判退；只更新审计，不改业务资产 |
| P35 产品世界预览 F4 整改收口 | `docs/audits/p35-product-world-preview-f4-remediation.md` | 已完成（2026-08-02） | P34 的 26 款判退项均已用独立版本化 PNG 固化构图；最终映射 27/27、HTTP 27/27 通过，实际燃油/电动菜单逐款触发成功；除 F4 基准规则外不保留车型缩放 CSS，不虚构 F4+、SJ300、S300R 灯具 |
| P36 首页视频与产品菜单层级修复 | `docs/audits/p36-home-video-product-menu-layering.md` | 已完成（2026-08-02） | 修正首页通用子元素层级覆盖页头的问题；产品下拉菜单稳定显示在视频/首屏上方，1440/768/375 无横向溢出，视频播放与重播不受影响 |
| P37 生产 SEO 与转化监测准备 | `docs/audits/p37-production-seo-conversion-readiness.md` | 已发布（2026-08-05） | sitemap 覆盖从 16 扩展至 43 个公开 URL；27 个车型页统一 canonical 和分享卡片；公共页补齐绝对分享图；询盘成功新增无个人信息的 GA4 `generate_lead` 事件；Cloudflare 版本 `9c5aec9e-4348-40b2-84e6-8d0b7073f082` |
| P38 结构化数据准备 | `docs/audits/p38-structured-data-readiness.md` | 已发布（2026-08-05） | 首页加入真实 Organization/WebSite JSON-LD；27 个车型页加入燃油/电动分类 BreadcrumbList；询价制缺少真实价格与评价，因此不虚构 Product/Offer 富结果数据；Cloudflare 版本 `a8d7421d-936f-40fc-8db3-a0673a113288` |
| P39 生产性能与加载体验准备 | `docs/audits/p39-production-performance-readiness.md` | 已发布（2026-08-05） | 移除首页 15.4 MB 视频的独立 preload，延后首屏后车型图；27 个车型页统一主图高优先级、缩略图低优先级和亮点图懒加载；Cloudflare 版本 `c932eb60-51a8-43f6-8c31-cb5cd46b499c`，生产 27/27 车型页及 F29 五图验证通过 |
| P40 可访问性与键盘操作准备 | `docs/audits/p40-accessibility-keyboard-readiness.md` | 已发布（2026-08-05） | 询盘必填与错误焦点已补齐；产品参数弹窗和详情灯箱增加 Tab 约束及关闭后焦点返回；Cloudflare 版本 `36caa55d-c835-49fe-a606-7c88d1e87623`，生产 27/27 车型页、F29 五图及 sitemap 43/43 验证通过 |
| P41 询盘容错与兼容性检查 | `docs/audits/p41-inquiry-resilience-compatibility.md` | 已发布（2026-08-05） | 保存请求加入 12 秒超时、重复提交锁和按钮恢复；提交／下载四种结果分别反馈；Cloudflare 版本 `3be5ecfa-e92f-428c-93b2-fcbc7a1613d6`，生产固定 URL、sitemap 43/43 与 F29 五图验证通过，未提交生产询盘或写入 D1 |
| P42 生产安全响应头与公开接口暴露审计 | `docs/audits/p42-security-headers-api-exposure.md` | 已发布（2026-08-05） | 移除硬编码／URL 管理 Key，认证前置于 D1；静态与 API 增加基础安全头，API 与后台禁缓存，未知 API／非法子路径／错误方法分别返回 404／405；Cloudflare 版本 `3c3bac5d-ee82-4af6-8cfe-77f92fcea5a7`，固定 URL、sitemap 43/43 与 F29 五图通过 |
| P43 后台凭据会话与分析写入防滥用 | `docs/audits/p43-admin-session-analytics-abuse-protection.md` | 已发布（2026-08-05） | 管理 Key 改为标签页会话存储并清除旧持久值；分析 POST 限定可信 Origin、JSON 对象、16 KB 与每 IP 每小时 120 次，新增查询索引；Cloudflare 版本 `3b456207-4c77-4b86-bc22-ae9d6654262f`，生产固定 URL、后台会话脚本、安全头、sitemap 43/43 与 F29 五图通过，未发送生产 POST 或主动写 D1 |
| P44 管理接口跨域边界 | `docs/audits/p44-admin-api-cors-boundary.md` | 已发布（2026-08-05） | 新闻与询盘 POST 保持公开 CORS；分析及后台读取／修改仅回显可信站点 Origin，外部管理 Origin 在认证前 403；Cloudflare 版本 `4633152a-726e-45b2-a3d8-6feba0a07c0f`，生产 13 项 CORS、固定页面、sitemap 43/43 与 F29 五图通过，未发送 POST |
| P45 询盘写入请求边界 | `docs/audits/p45-inquiry-request-boundary.md` | 已发布（2026-08-05） | 询盘 POST 在访问 D1 前强制 JSON、32 KB 原始字节上限和对象根值；Cloudflare 版本 `8d2d99e4-f935-4618-8244-09784f08d446`，生产固定页面、询盘预检、安全头、sitemap 43/43 与 F29 五图通过，未发送生产 POST 或接触 D1 |
| P46 CSP 报告模式基线 | `docs/audits/p46-csp-report-only-baseline.md` | 已发布（2026-08-05） | 保留现有强制 CSP，新增包含 GA、GTM 与 Cloudflare Insights 的完整报告模式策略；Cloudflare 版本 `1341501d-2d7a-4293-89cd-40350975d074`，生产 43/43 sitemap 页面、F29 五图和最终 Chrome 零 CSP 报告通过 |
| P47 版本化静态资源缓存策略 | `docs/audits/p47-versioned-asset-cache-policy.md` | 已发布（2026-08-05） | 276 个明确版本化引用获得一年 immutable，42 个未版本化引用继续重新验证；Cloudflare 版本 `a71b5107-650d-47c7-8589-c928d1594870`，生产 9 项缓存边界、sitemap 43/43 与 F29 五图通过 |
| P48 公共路由真实 404 边界 | `docs/audits/p48-public-route-real-404-boundary.md` | 已发布（2026-08-05） | 取消未知路径首页假 200并补齐预览/后台入口；Cloudflare 版本 `624fcf79-6294-4af1-a0a3-a2c44bf81c30`，生产 52 个合法入口、四类真实 404、304 缓存、sitemap 43/43 与 F29 五图通过 |
| P49 管理 Key 摘要比较边界 | `docs/audits/p49-admin-key-digest-comparison.md` | 已发布（2026-08-08） | 主 Worker 与兼容 Pages Functions 改用 SHA-256 固定长度摘要累积比较，认证继续前置于 D1；Cloudflare 版本 `b1db7dfe-eec7-45e3-8be8-d029f82cbe8d`，生产 11 个固定入口、sitemap 43/43、F29 五图与未授权 401／外部 Origin 403 均通过 |
| P50 生产只读验收脚本 | `docs/audits/p50-production-readonly-verification-script.md` | 已完成（2026-08-08） | 新增无依赖、仅同源 GET 的发布后门禁；生产实测 11 个固定入口、5 个管理拒绝边界、2 个真实 404、sitemap 43/43、SY300/F29 身份和 F29 五图，共 69 请求零失败 |

## 已完成且不要重复的任务

- 27 份车型 JSON/HTML 的生成一致性：本轮隔离构建和哈希比对已通过。
- F4、Babey、Babey+、Bumblebee、ET 2022 产品世界预览：已正式接入；除非用户反馈具体缺陷，不要重做。
- 产品世界菜单四列机甲模块、系列标题和等宽红线、移除扫描线：已完成。
- S300 第三亮点中无依据“蓝色轮圈”主张已改为中性轮组描述。
- ER5 技术副标题的“官网资料”无依据声称已移除。
- HS85 对共享“产品概述”词条的重复车型翻译已删除。
