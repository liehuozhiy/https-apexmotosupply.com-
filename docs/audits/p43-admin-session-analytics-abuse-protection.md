# P43 后台凭据会话与分析写入防滥用

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 仅处理 P42 留下的两项风险：后台管理 Key 的浏览器持久化，以及公开分析写入缺少独立防滥用控制。
- 不修改询盘字段、`/api/inquiries` 契约、SMTP、D1 既有字段或公开页面统计成功响应 `{ "ok": true }`。
- 发布验收没有提交生产询盘、发送分析 POST 或主动写入生产 D1。

## 本地加固

1. 后台管理 Key 从 `localStorage` 改为 `sessionStorage`，只在当前标签页会话内保留；页面加载和成功读取时都会清除旧版持久化值。关闭标签页或浏览器会话后需要重新输入 Key。
2. `/api/analytics` 写入只接受生产域名 `apexmotosupply.com`、`www.apexmotosupply.com`，并为本地验收保留 `localhost`、`127.0.0.1`；缺少或不可信 `Origin` 返回 HTTP 403。
3. 写入必须使用 `application/json`，请求体必须是有效的 JSON 对象；错误类型返回 415，无效 JSON 或数组返回 400。
4. 请求体上限为 16 KB，同时检查声明的 `Content-Length` 与解析后实际序列化字节数；超限返回 413。
5. 默认按来源 IP 限制每小时 120 次写入；超限返回 429，主 Worker 附带 `Retry-After: 3600`。本地可通过 `ANALYTICS_HOURLY_LIMIT` 调低阈值测试，不需要改变生产默认值。
6. D1 仅新增索引 `idx_site_visits_ip_created_at`，用于按 IP 和创建时间统计最近写入；不改变表字段或既有数据。
7. 当前 Wrangler 使用的 Worker 与备用 Pages Functions 分析入口保持相同的来源、类型、大小和限流规则，避免未来入口切换时回归。

## 验证结果

- `node --check api/worker.js`、`node --check api/functions/api/analytics.js` 与 `git diff --check` 通过。
- `deploy/` 已通过 `node scripts/prepare-deploy.mjs` 重新生成；源文件与生成后台中均不存在管理 Key 的 `localStorage.getItem/setItem`，只保留 `sessionStorage` 读写与旧值清除。
- 隔离的本地 Wrangler HTTPS Worker 使用本地 D1 和临时测试配置验证：无 Origin 403、外部 Origin 403、错误类型 415、无效 JSON 400、超大请求 413；同一 IP 前两次 200、第三次 429 且 `Retry-After: 3600`，另一 IP 仍为 200。
- 本地 D1 查询确认测试 IP 只产生 2 条和 1 条成功记录，拒绝请求没有插入；所有响应继续使用 `Cache-Control: no-store`。
- 交互式浏览器在本地 Wrangler 自签名证书页被工具 URL 策略阻断，无法完成标签页关闭后的真实会话复验；因此本阶段以源文件、生成文件的静态断言作为存储行为证据。该限制不影响 API 的本地运行时矩阵。
- 本轮本地 Wrangler 与静态 HTTP 服务均已停止，8789、8011 无本项目监听。

## 发布与生产验收

- 发布前只读确认 Cloudflare Secret 中存在 `ADMIN_KEY`、`SMTP_USER`、`SMTP_PASS` 三个变量名，未读取或记录任何值。
- Cloudflare 版本为 `3b456207-4c77-4b86-bc22-ae9d6654262f`；Wrangler 读取 498 个静态文件，仅上传更新后的 `/admin/index.html`，Worker 同步更新。
- 生产 `/`、`/index.html`、`/sy300.html`、`/f29.html?lang=zh-CN`、`/inquiry.html`、`/robots.txt`、`/sitemap.xml` 和 `/admin` 均为 HTTP 200；`/api` 为 404，未认证 `/api/analytics` GET 为 401。
- 后台生产 HTML 已确认使用 `sessionStorage`、清除旧 `localStorage` 值且不存在持久化读写；六类安全头存在，缓存策略为 `no-store`。
- sitemap 为 43 条 URL；SY300/F29 身份、F29 `product-detail-v37-unified-layout` 标记及恰好五张唯一图库图片均通过，五图全部为 `image/png` 与 HTTP 200。
- 生产验收全程只读，没有发送分析或询盘 POST，也没有主动写入生产 D1。后台操作人员下次使用时需要重新输入一次管理 Key，这是迁移到会话存储的预期行为。

## 回退边界

- 如可信来源或限流造成真实统计丢失，应优先修正来源白名单或阈值，不得恢复任意来源写入。
- 如后台体验需要调整，可改用更短的受控认证会话，但不得恢复管理 Key 的长期 `localStorage` 持久化。
