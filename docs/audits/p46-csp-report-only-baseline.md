# P46 CSP 报告模式基线

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 为静态页面和 JSON API 增加 `Content-Security-Policy-Report-Only`，先观察完整资源策略，不在本阶段阻断现有页面、询盘、后台或统计功能。
- P42 已发布的强制策略 `frame-ancestors 'self'; base-uri 'self'; object-src 'none'` 保持完全不变。
- 没有增加报告接收端点，因此没有提交任何 CSP 报告、写入 D1 或引入新的数据处理路径。
- 本阶段仅修改 Worker 安全头和文档；没有生成 `deploy/`、部署、提交或推送。

## 策略基线

- 默认、表单、媒体、字体、样式、脚本、连接、框架、Worker 和 manifest 均显式限定来源。
- 图片只允许站点自身与 `data:`；样式允许站点自身及现有内联样式。
- 脚本允许站点自身、现有内联脚本、`https://www.googletagmanager.com` 及 Cloudflare 在生产环境自动注入的 `https://static.cloudflareinsights.com`。
- 连接允许站点自身、Google Tag Manager、Google Analytics 主域及其 HTTPS 子域。
- `base-uri`、`object-src`、`frame-ancestors` 等基础边界与现有强制策略一致。
- 主 Worker 的静态响应、重定向和 API JSON 响应，以及兼容 Pages Functions 分析入口，使用同一报告模式策略。

## 验证结果

- `node --check api/worker.js`、`node --check api/functions/api/analytics.js` 与 `git diff --check` 通过。
- 隔离的本地 Wrangler HTTPS Worker 使用端口 8792、本地 D1 与临时测试 Key；首页静态响应和未认证分析 API 响应均同时包含原强制 CSP 和新增报告模式 CSP。
- 使用 Playwright CLI 驱动真实 Chrome 检查首页、`sy300.html`、`inquiry.html` 和 `/admin`：四页标题与关键页面标记正确，均无 CSP 报告、浏览器错误或警告。
- 首页动态加载的 Google Tag Manager 脚本为 HTTP 200，Google Analytics `collect` 请求为 HTTP 204；页面控制台为 0 条消息。
- SY300 正文车型标记存在；询盘页保留一个表单；后台保留密码输入入口，均未进行提交、登录或数据写入。
- 后台仅出现 Chrome 的 verbose 级提示“密码字段未包含在 form 内”，不是 CSP、安全策略或网络错误。
- Playwright 会话及本地 Wrangler 已停止，8792 无监听；未触碰生产环境。

## 生产发布复验

- 首次生产 Chrome 复验发现 Cloudflare Web Analytics 自动注入的 `static.cloudflareinsights.com` 脚本产生一条报告模式记录；脚本仍正常返回 HTTP 200，没有被阻断。
- 该来源只在生产环境注入，因此本地资源盘点无法观察到。策略已补充这一明确脚本来源，没有扩大图片、框架、表单或对象来源。
- 首次生产首页浏览器打开时，站点既有分析脚本自动发送了一次 `/api/analytics` 页面访问事件并返回 200；该请求可能按现有契约新增一条访问统计记录。没有提交询盘、使用管理 Key、读取管理数据或修改询盘数据。后续生产浏览器复验已在导航前模拟拦截站点分析、Cloudflare RUM 与 GA 写请求。
- 最终 Cloudflare 版本为 `1341501d-2d7a-4293-89cd-40350975d074`；Wrangler 读取 498 个静态文件，没有上传静态资产，仅更新 Worker。
- 生产 `/`、`/index.html`、`/sy300.html`、`/f29.html?lang=zh-CN`、`/inquiry.html`、`/sitemap.xml` 和 `/admin` 均为 HTTP 200，原强制 CSP 与包含 Google Analytics、Google Tag Manager、Cloudflare Insights 的报告模式 CSP 均正确；`robots.txt` 为 HTTP 200 的纯文本。
- sitemap 为 43 条 URL，43/43 页面均为 HTTP 200 且带最终报告模式 CSP；SY300/F29 身份、F29 `product-detail-v37-unified-layout` 及恰好五张唯一图库 PNG 均通过，五图全部为 HTTP 200。
- 询盘只执行 OPTIONS 并返回 200／公开 CORS；分析接口只执行未认证 GET 并返回 401，没有发送业务 POST。
- 最终生产 Chrome 首页实际加载 Google Tag Manager 与 Cloudflare Insights，控制台为 0 条消息；复验中的三类分析写请求均由浏览器路由模拟为 204，未到达生产端。

## 发布与回退边界

- 发布后先只读确认固定页面、API 响应及重定向均带报告模式头，再复核生产浏览器控制台和 GA 请求；不得通过生产 POST 触发验证。
- 报告模式不会拦截资源。如发现真实违规，应先确认资源用途与来源，再收窄或补充来源，不能直接切换为强制完整策略。
- 如报告头本身造成兼容问题，只需移除 `Content-Security-Policy-Report-Only` 引用；原强制 CSP 不需要回退。
