# P44 管理接口跨域边界

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 处理 P42/P43 后仍存在的统一 `Access-Control-Allow-Origin: *`：按公开接口与管理接口拆分 CORS，不改变管理 Key、D1、SMTP 或询盘成功响应契约。
- 当前 Wrangler Worker 与备用 Pages Functions 分析入口同步处理，避免未来切换入口时回归。
- 发布验收没有提交询盘、发送分析 POST、使用真实管理 Key 或写入生产 D1。

## 本地加固

1. JSON API 不再默认返回通配 CORS；由顶层路由按接口用途添加响应头。
2. `/api/news` 继续允许公开跨域 GET／OPTIONS，保持 `Access-Control-Allow-Origin: *`。
3. `/api/inquiries` 的公开 POST 及对应预检继续允许通配 Origin，保留站点、第三方嵌入和 `file:///` 表单兼容。
4. `/api/analytics` 仅对 `apexmotosupply.com`、`www.apexmotosupply.com` 及本地开发 Origin 回显精确 Origin；不可信分析预检和写入继续返回 403。
5. 分析读取、询盘读取／状态更新／删除及 SMTP 状态只接受可信站点或本地开发 Origin；带不可信 Origin 的管理预检和实际请求在认证前返回 403。
6. 可信跨域响应加入 `Vary: Origin`；同源浏览器 GET 可能不带 `Origin`，此时请求正常处理但不返回无意义的 CORS 头。
7. 未知 `/api/*` 不返回跨域授权头，仍保持 JSON 404。

## 验证结果

- `node --check api/worker.js`、`node --check api/functions/api/analytics.js` 与 `git diff --check` 通过。
- 隔离的 Wrangler 本地 HTTPS Worker 使用临时测试 Key，仅执行 OPTIONS 和只读 GET，共 14 项矩阵全部通过：
  - 外部 Origin 的新闻 GET 和询盘 POST 预检为 200／`*`；
  - 外部 Origin 的询盘管理、SMTP 和分析管理预检／GET 为 403，且没有 `Access-Control-Allow-Origin`；
  - 可信生产 Origin 的管理预检为 200、未认证 GET 为 401，精确回显 Origin 并带 `Vary: Origin`；
  - 可信 Origin 加临时测试 Key 的 SMTP 状态 GET 为 200；
  - 无 Origin 的同源式管理 GET 仍进入认证并返回预期 401；
  - 未知 API 为 404 且不授权跨域。
- 备用 Pages Functions 分析入口的 5 项独立调用矩阵通过：外部预检／GET 为 403，可信预检为 200，可信和无 Origin 的未认证 GET 均为预期 401。
- 首次用 HTTP 启动本地 Wrangler 时触发 Worker 的 HTTPS 重定向循环，未进入业务路由；随后改用本地 HTTPS 完成全部有效矩阵。测试 Wrangler 已停止，8790 无监听。
- 没有执行询盘或分析 POST，也没有读取管理数据或写入 D1。

## 发布与生产验收

- 发布前只读确认 Cloudflare Secret 中存在 `ADMIN_KEY`、`SMTP_USER`、`SMTP_PASS` 三个变量名，未读取或记录任何值。
- Cloudflare 版本为 `4633152a-726e-45b2-a3d8-6feba0a07c0f`；Wrangler 读取 498 个静态文件，没有上传静态资产，仅更新 Worker。
- 生产 `/`、`/index.html`、`/sy300.html`、`/f29.html?lang=zh-CN`、`/inquiry.html`、`/robots.txt`、`/sitemap.xml` 和 `/admin` 均为 HTTP 200；sitemap 为 43 条 URL，SY300/F29 身份、F29 统一布局及五张唯一图库 PNG 均通过。
- 生产 13 项 GET／OPTIONS CORS 矩阵通过：新闻和询盘 POST 预检继续为 200／`*`；外部管理 Origin 为 403 且无授权头；可信管理 Origin 精确回显并带 `Vary: Origin`；无 Origin 管理 GET 继续进入认证；未知 API 为 404 且无授权头。
- 首轮无查询参数检查中，分析与 SMTP 的两个 401 响应短暂出现旧通配头；使用唯一只读查询参数复查立即得到精确 Origin 与 `Vary: Origin`，完整矩阵随后通过，判定为发布后的边缘旧响应残留而非当前 Worker 行为。
- 生产验收没有使用真实管理 Key、发送询盘／分析 POST、读取管理数据或主动写入 D1。

## 回退边界

- 如公开询盘发生跨域兼容问题，只调整公开 POST／OPTIONS 策略，不得恢复管理接口的通配 Origin。
- 如增加新的管理域名，应把完整 HTTPS Origin 加入可信集合并完成预检矩阵，不接受后缀模糊匹配。
