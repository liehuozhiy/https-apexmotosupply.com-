# F02 隔离 Worker / D1 询盘 API 回归

日期：2026-08-02

## 范围和隔离边界

本任务以 `npx.cmd --yes wrangler@4` 获取 Wrangler 4.118.0，并以 `wrangler dev --local --local-protocol https --port 8787 --persist-to <系统临时目录>` 启动本地 Worker。运行时绑定的是临时本地 D1；未访问远程 D1、未读取 SMTP 凭据、未发送邮件，也未修改仓库中的业务代码、D1 schema 或配置。

Worker 会将 HTTP 请求重定向到 HTTPS。首次 HTTP 请求得到 301，随后按该既有路由规则切换至本地 HTTPS（自签名证书仅用于本地测试）。这不是协议绕过。

## API 回归结果

| 用例 | 预期 | 实际 | 结论 |
| --- | --- | --- | --- |
| `OPTIONS /api/inquiries` | CORS 预检成功 | 200，`{"ok":true}` | 通过 |
| 空 POST | 必填字段拦截 | 400，`Name and email are required` | 通过 |
| 非法邮箱 | 邮箱格式拦截 | 400，`Invalid email address` | 通过 |
| 蜜罐 `website` | 静默接受且不创建询盘 | 200，`{"ok":true}` | 通过 |
| 有效隔离数据 | 创建本地记录，SMTP 未配置不阻断保存 | 200，`id: 1`、`emailStatus: "not_configured"`、缺失项仅为 `SMTP_USER, SMTP_PASS` | 通过 |
| 限流 | 同一 IP 每小时最多 5 条 | 本地 id 2–5 返回 200，第 6 条返回 429 | 通过 |

所有测试身份均为 `F02 Test` / `f02@example.invalid`，仅存在于临时本地 D1。未使用客户姓名、客户地址或真实邮件域名。

## 收尾

- 本地 Worker 已停止，8787 端口已确认无监听。
- 执行环境拒绝了删除命令，因此临时测试目录和响应文件仍保留在系统临时目录：`C:\Users\Administrator\AppData\Local\Temp\apex-f02-20260802`、`C:\Users\Administrator\AppData\Local\Temp\apex-f02-*.json`。它们不在项目工作区、不包含密钥或真实客户数据；后续可由拥有本机文件删除权限的操作者清理。
- F02 已完成。下一项应单独验证前端 Excel 下载与 API 成功/邮件降级提示的浏览器交互；不应重跑本任务。
