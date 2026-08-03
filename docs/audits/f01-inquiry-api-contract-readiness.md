# F01 API / 询盘静态契约与运行条件核对

日期：2026-08-02

## 范围

本次为阶段 F 的首个最小任务，仅核对 `frontend/pages/inquiry.html`、`frontend/assets/js/main.js`、`api/worker.js` 和 `wrangler.toml` 的静态契约及本地运行条件。未启动 Worker、未访问 D1、未发送邮件、未读取任何密钥，也未修改业务代码或配置。

阶段 E 的 `file:///` 项仍待外部验证环境；用户已明确授权在该项待补验期间开始阶段 F。本报告不将该授权解释为允许绕过本地文件浏览器策略。

## 契约结果

| 检查项 | 结果 | 证据 |
| --- | --- | --- |
| 询盘表单字段 | 通过 | `inquiry.html` 提供 `name`、`email`、`model`、`quantity`、`message`。 |
| 前端请求字段 | 通过 | `main.js` 向 `POST /api/inquiries` 发送上述字段及 `sourceUrl: window.location.href`。 |
| Worker 字段兼容 | 通过 | `worker.js` 接收 `source_url || sourceUrl`，并保存 name、email、model、quantity、message、source_url。 |
| 响应兼容 | 通过 | Worker 返回 `ok`、`id`、`emailStatus`、`emailError`；前端仅以 `emailStatus === "sent"` 区分邮件提示，保存失败不会阻断 Excel 下载。 |
| 邮件失败语义 | 通过（静态） | `sendInquiryEmail` 的结果写入 `emailStatus`，且在保存记录后执行，符合“邮件失败不阻断询盘创建”的模块规则。 |
| 语法检查 | 通过 | `node --check api/worker.js`、`node --check frontend/assets/js/main.js` 均通过。 |

## 本地运行条件

- `wrangler.toml` 声明 Worker、静态资产绑定及 D1 `DB` 绑定。
- 当前项目根目录不存在 `package.json` 或 `package-lock.json`；系统未发现 `wrangler` 可执行程序。
- 因此无法在不安装新工具的前提下启动隔离的 Worker/D1 回归环境。
- 真实 D1、SMTP 和任何客户邮件均未接触，符合阶段 F 的安全边界。

## 结论与后续

F01 静态契约与前端语法门禁通过。此核对当时未发现已安装的 Wrangler；随后 F02 已通过 `npx.cmd` 在系统临时目录完成隔离 Worker/D1 回归，未写入项目依赖。后续只需单独验证 Excel 下载与浏览器提示交互。
