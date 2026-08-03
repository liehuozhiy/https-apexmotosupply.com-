# F03 询盘前端 Excel / 提示交互验收

日期：2026-08-02

## 范围与环境

- 不修改业务代码、车型数据、D1 schema、SMTP 配置或共享 CSS/JS。
- 使用 `node scripts/prepare-deploy.mjs` 生成本地静态目录；源文件和生成目录的询盘页、`main.js` 哈希一致。
- 使用 Wrangler 4 的隔离本地 HTTPS Worker/D1，端口 `8787`；仅写入 `example.invalid` 测试邮箱，不访问远程 D1 或 SMTP。
- 本地 Worker 使用自签名证书；Playwright 仅为 `127.0.0.1` 临时会话忽略该证书错误。浏览器和 Worker 已停止，验收结束时 8787 无监听。

## 验收结果

| 场景 | 结果 | 证据 |
| --- | --- | --- |
| 无姓名/有效邮箱提交 | 通过 | 浏览器显示 `Please enter name and a valid email.`，未请求询盘 API。 |
| 英文有效提交、SMTP 未配置 | 通过 | `POST /api/inquiries` 返回 200；下载 `H&T-inquiry-form-202608020524.xlsx`（SHA-256 `0abb408c3ef0e88cdb811ffafa4ca9c1c450a908c71b15e510567ec87eb8bd59`），提示 `Inquiry submitted and the form was downloaded. Check the admin page for email status.`。 |
| 中文有效提交、SMTP 未配置 | 通过 | `POST /api/inquiries` 返回 200；下载 `H&T-inquiry-form-202608020528.xlsx`（SHA-256 `98c5ae4269853624680437e83b24920dfa3cbfcc7dd67ad3c542b3081fc1c51f`），提示 `询盘表单已提交并下载，但邮件未发送成功，请检查后台 SMTP 配置。`。 |
| API 不可达 | 通过 | 停止隔离 Worker 后，`POST /api/inquiries` 为 `net::ERR_CONNECTION_REFUSED`；仍下载 `H&T-inquiry-form-202608020525.xlsx`（SHA-256 `e109750ab95e206969a053327113375c037bed770ad3ca147461f1a3f8e246fa`），提示 `The form was downloaded, but backend saving failed. Please try again later or contact us by email.`。 |

## 补充验证

- `node --check frontend/assets/js/main.js` 通过。
- `node --check api/worker.js` 通过。
- `git diff --check` 通过。
- 仅在故意关闭本地 API 的失败场景产生两条预期控制台错误；正常英文和中文成功场景均无控制台错误。

## 结论

F03 通过。Excel 下载、英文/中文 `emailStatus: "not_configured"` 降级提示，以及 API 保存失败后继续下载并提示失败的路径均已在真实浏览器交互中验证。
