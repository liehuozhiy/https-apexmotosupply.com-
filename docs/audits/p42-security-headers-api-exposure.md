# P42 生产安全响应头与公开接口暴露审计

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 范围限定为 Cloudflare Worker、旧 Pages Functions 分析入口、静态响应头、管理认证入口和 `/api/*` 路由边界。
- 不修改公开页面、询盘字段、API 成功响应契约、D1 字段、SMTP 配置或管理端请求方式。
- 生产检查全部为只读；未提交询盘、未读取管理数据、未使用已知或猜测的管理 Key、未写入生产 D1。

## 生产基线

- 首页、`/admin` 和静态 JavaScript 均返回 HTTP 200，但没有 HSTS、CSP、`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy` 或 `Permissions-Policy`。
- `/api/smtp-status` 在无 Key 时正确返回 HTTP 401，但 API 响应没有 `no-store`，且沿用公开跨域响应头。
- 未知 `/api/does-not-exist` 回退为首页 HTML 与 HTTP 200，可能导致监控或客户端把不存在的 API 误判为成功。
- 非数字询盘子路径进入管理认证分支而不是先返回路由 404。
- Worker 源码存在硬编码管理 Key 备用值，并接受 URL 查询参数形式的管理 Key；旧 Pages Functions 分析入口也接受 URL Key。当前管理页面实际只通过 `x-admin-key` 请求头调用这些接口。

## 本地加固

1. 静态页面、静态资产、重定向和 JSON API 统一加入基础安全头：HSTS、最小 CSP、`nosniff`、`SAMEORIGIN`、严格来源策略和权限策略。
2. API 响应及 `/admin` HTML 使用 `Cache-Control: no-store`；普通公开静态资产继续保留 Cloudflare 原缓存策略。
3. 管理认证只读取 Cloudflare 环境变量 `ADMIN_KEY` 与 `x-admin-key` 请求头；缺少环境变量返回 HTTP 503，错误 Key 返回 HTTP 401，不再接受 URL Key。
4. 管理读取在认证通过后才检查或初始化 D1；未认证请求不会触碰数据库。
5. API 根路径、未知 `/api/*` 和非法询盘子路径返回 JSON HTTP 404；新闻、SMTP 状态和其他 API 使用明确方法边界，错误方法返回 HTTP 405。
6. 未参与当前 Wrangler 部署的旧 Pages Functions 分析入口同步移除 URL Key，并加入相同的 API 安全头与认证顺序，避免未来切换入口时回归。

## 验证结果

- `node --check api/worker.js`、`node --check api/functions/api/analytics.js` 与 `git diff --check` 通过。
- 敏感模式复扫通过：API、管理端和部署脚本中不存在硬编码备用 Key，也不存在 `searchParams.get("key")`。
- 隔离的 Wrangler 本地 HTTPS Worker 使用临时测试 Key 验证：页面、管理页和静态资产为 200；未知 API、非法询盘子路径及其 POST 为 404；无 Key 和 URL Key 为 401；请求头 Key 为 200；错误新闻方法为 405；询盘 OPTIONS 保持 200。
- 本地页面与资产均带六类安全头，`/admin` 为 `no-store`，API 为 JSON 且 `no-store`；测试 Worker 和 8788 端口已停止。
- 首次成功的 `wrangler secret list` 只读查询确认缺少 `ADMIN_KEY`；站点负责人随后通过 Wrangler 交互式流程设置新 Secret，复查只确认 `ADMIN_KEY`、`SMTP_USER`、`SMTP_PASS` 三个变量名存在，从未读取或记录值。
- 本阶段只修改 Worker/API 源码，不需要重新生成静态 `deploy/`；Cloudflare 发布未上传或改变静态资产。

## 兼容性边界与后续项

- 为保持现有公开询盘、分析上报及本地文件兼容，本阶段不改变 `Access-Control-Allow-Origin: *`；管理接口仍依赖不可由普通跨站表单伪造的自定义请求头认证。后续若取消 `file:///` API 兼容，可按可信 Origin 分离公开和管理 CORS。
- 当前 CSP 只限制嵌入、`base` 和对象资源，没有启用 `script-src`；站点仍有内联脚本和分析脚本，全面 CSP 需要先完成 nonce/hash 迁移和浏览器矩阵。
- 管理 Key 目前保存在管理域名的 `localStorage`，公开分析写入也没有独立的边缘限流；这两项应作为后续独立安全任务评估，避免在本次路由加固中改变管理体验或统计口径。

## 发布与回退

- Cloudflare 版本为 `3c3bac5d-ee82-4af6-8cfe-77f92fcea5a7`；部署读取 498 个静态文件且没有需要上传的静态资产，仅更新 Worker。
- 生产固定 7 个 URL 均为 HTTP 200；首页、静态资产和后台具备六类安全头，后台为 `no-store`，API 为 JSON 且 `no-store`。后台首次探测遇到边缘传播差异，随后独立复查为 HTTP 200 且全部目标头存在。
- `/api` 与未知 API 为 404，无 Key／URL 假 Key 的管理读取为 401，非法询盘子路径为 404，错误新闻方法为 405，询盘 OPTIONS 保持 200；未发送 POST、未读取管理数据、未提交询盘或写入 D1。
- sitemap 43/43、SY300/F29 身份、F29 统一布局及五张图库图片均通过生产只读验证。
- 如发生兼容回归，可回退统一响应头包装或单一路由判断；不得恢复硬编码备用 Key 或 URL Key。
