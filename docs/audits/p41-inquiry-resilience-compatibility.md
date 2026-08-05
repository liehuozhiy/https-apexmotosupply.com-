# P41 询盘容错与兼容性检查

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与基线

- 仅检查公开询盘页的浏览器端保存、Excel 下载、重复提交和异常反馈，不修改 `/api/inquiries` 契约、Worker、D1、SMTP 或后台。
- 生产页面和本地源码基线确认：保存请求没有超时与重复提交保护；Excel 生成失败会先报错，但后续仍可能显示“表单已下载”的成功或降级提示。
- 测试不向生产 API 提交询盘，不写入 D1；异常分支使用本地静态服务返回的 HTTP 501 和内存级 fetch 模拟完成。

## 实施内容

1. `saveInquiry` 使用 `AbortController` 加入 12 秒请求超时；超时与普通请求失败分别返回 `timeout`、`request_failed`，API 请求字段和响应契约保持不变。
2. 有效表单开始提交后设置单次提交锁、`aria-busy="true"` 并禁用提交按钮；无论保存、下载或提示结果如何，最终都会恢复表单与按钮状态。
3. `createInquirySheet` 返回明确的成功／失败布尔值；独立快速下载仍保留原失败 alert，询盘提交路径由统一结果提示处理。
4. 保存成功／失败与下载成功／失败的四种组合使用各自准确提示，避免下载失败时继续声称“已下载”；后端保存成功时仍按原逻辑记录不含个人信息的 `generate_lead`。
5. 询盘页把 `main.js` 查询版本更新为 `20260805-inquiry-resilience-v20`，避免浏览器继续使用旧脚本。

## 验证结果

- `node --check frontend/assets/js/main.js` 与 `git diff --check` 通过。
- 内存级保存分支测试通过：成功返回保留 `emailStatus`；HTTP 503 归类为 `request_failed`；缩短到 25 ms 的隔离超时测试在 27 ms 返回 `timeout`。
- 本地 `POST /api/inquiries` 返回 HTTP 501 时，Excel 降级下载与失败 alert 正常触发；关闭提示后提交锁清除、`aria-busy` 移除、按钮重新启用。
- Arabic RTL 页面 `lang="ar"`、`dir="rtl"` 正确，无横向溢出；两个必填字段和 v20 脚本均存在，真实带 `src` 图片无加载失败。
- 无效邮箱仍触发原校验提示；未发送生产询盘，未修改 D1。

## 发布与回退

- `node scripts/prepare-deploy.mjs` 已生成部署目录并校验 334 张引用图片；Cloudflare 版本为 `3be5ecfa-e92f-428c-93b2-fcbc7a1613d6`。
- 生产固定 7 个 URL 均返回 HTTP 200；询盘页已加载 v20 脚本，两个必填控件、12 秒超时、重复提交锁及 `aria-busy` 均存在。
- sitemap 43/43 URL、SY300 身份、F29 统一布局及五张图库图片均验证通过；未提交生产询盘，未写入 D1。
- 若发布后出现回归，可撤销 `main.js` 的超时／提交锁／结果矩阵和询盘页脚本版本后重新生成部署目录；无需回退 API、D1、SMTP、车型数据或图片。
