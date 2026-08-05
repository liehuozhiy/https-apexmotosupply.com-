# P45 询盘写入请求边界

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 仅加固公开 `/api/inquiries` POST 的请求解析边界，不改变表单字段、D1 字段、SMTP、`emailStatus`、Excel 下载或现有 5 次／小时限流。
- 前端现有请求已使用 `Content-Type: application/json` 与 `JSON.stringify`，因此不需要修改页面或脚本。
- 发布验收没有发送生产询盘 POST、使用真实管理 Key、读取管理数据或写入生产 D1；所有业务 POST 均只发送到隔离的本地 Wrangler。

## 本地加固

1. 公开询盘 POST 必须使用 `application/json`；其他类型在访问 D1 前返回 HTTP 415。
2. 请求体上限为 32 KB，同时检查声明的 `Content-Length` 与实际读取的原始 UTF-8 字节数；超限返回 HTTP 413，分块传输不能绕过。
3. 无效 JSON、空值、数组或其他非对象根值返回 HTTP 400，不再把解析失败静默转换为空对象。
4. 类型、大小和 JSON 结构检查全部在 D1 可用性检查及 schema 初始化之前完成，异常请求不会触发数据库工作。
5. 蜜罐请求仍返回 `{ "ok": true }` 且不写入 D1；有效询盘的成功响应、`id`、`emailStatus` 和邮件失败降级保持不变。
6. 通用请求大小辅助函数增加可选上限参数；分析接口继续使用原 16 KB 默认值，不改变 P43 行为。

## 验证结果

- `node --check api/worker.js` 与 `git diff --check` 通过。
- 隔离的 Wrangler 本地 HTTPS Worker 使用本地 D1 和临时测试 Key完成八项 POST 回归：
  - 错误 Content-Type 为 415；
  - 无效 JSON 与数组根值为 400；
  - 带 `Content-Length` 的超限请求和无该声明的分块超限请求均为 413；
  - 蜜罐为 200／`ok: true` 且不写入；
  - 缺少姓名和邮箱继续为 400；
  - 一个 `example.invalid` 有效询盘为 200／`ok: true`，SMTP 未配置时继续返回 `emailStatus: not_configured`。
- 八项公开响应均保留 P44 的 `Access-Control-Allow-Origin: *`，未破坏公开表单跨域兼容。
- 本地 D1 计数从 0 变为 1，证明只有有效请求落库；随后通过精确 ID 删除该本地测试记录，计数恢复为 0。
- 测试 Wrangler 及其子进程已停止，8791 无监听。

## 发布与生产验收

- 发布前只读确认 Cloudflare Secret 中存在 `ADMIN_KEY`、`SMTP_USER`、`SMTP_PASS` 三个变量名，未读取或记录任何值；Worker 语法和差异门禁通过。
- Cloudflare 版本为 `8d2d99e4-f935-4618-8244-09784f08d446`；Wrangler 读取 498 个静态文件，没有上传静态资产，仅更新 Worker。
- 生产 `/`、`/index.html`、`/sy300.html`、`/f29.html?lang=zh-CN`、`/inquiry.html`、`/robots.txt`、`/sitemap.xml` 和 `/admin` 均为 HTTP 200。
- 生产询盘 POST 预检为 200，继续返回 `Access-Control-Allow-Origin: *` 并允许 `Content-Type`；可信 Origin 的未认证询盘 GET 为 401，精确回显 Origin，六类安全头和 `no-store` 均存在。
- sitemap 为 43 条 URL；SY300/F29 身份、F29 `product-detail-v37-unified-layout` 标记及恰好五张唯一图库 PNG 均通过，五图全部为 HTTP 200。
- 生产验收没有发送询盘 POST；415／400／413 与有效提交契约已由隔离本地 Worker 验证，没有接触生产 D1。

## 回退边界

- 如现有客户端出现兼容问题，应确认其是否正确发送 JSON Content-Type 和对象根值；不得通过取消大小上限解决。
- 如未来确需增加字段体积，应基于明确字段需求调整 32 KB 上限，并同步更新本地超限矩阵。
