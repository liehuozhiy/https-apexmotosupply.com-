# P49 管理 Key 摘要比较边界

日期：2026-08-06（Asia/Shanghai）；发布：2026-08-08
状态：已发布

## 范围与约束

- 加固主 Cloudflare Worker 及兼容 Pages Functions 分析接口的管理 Key 比较，不修改 Key 值、请求头名称、后台使用方式、API 状态或 D1 字段。
- 管理认证继续先于 D1 绑定检查和查询；未经认证的请求不会触发 D1 初始化或读取。
- 本阶段只进行本地实现与隔离验证，没有访问生产管理接口、读取或写入生产 D1、提交询盘、部署、提交或推送。

## 实现边界

1. 取消 `inputKey !== adminKey` 的直接字符串比较。
2. 使用 Web Crypto 分别计算输入 Key 与环境变量 Key 的 SHA-256 摘要。
3. 对两个固定 32 字节摘要逐字节累积差异，并把原始 UTF-8 字节长度差异纳入最终判断。
4. 仅当长度和全部摘要字节均一致时通过认证；缺失、较短或同长度错误 Key 均保持 HTTP 401。
5. `ADMIN_KEY` 未配置仍为 HTTP 503，外部管理 Origin 仍在 Key 比较前返回 HTTP 403。
6. 该实现减少普通字符串提前退出造成的可观察比较差异；JavaScript 运行时不作绝对恒定时间保证。

## 本地验证

- `node --check api/worker.js`、`node --check api/functions/api/analytics.js` 与 `git diff --check` 通过。
- 隔离 Wrangler HTTPS Worker 使用本机端口 8795、本地 D1 和非生产测试 Key。
- `/api/analytics` 缺失 Key、较短错误 Key、同长度错误 Key 均返回 401。
- 正确测试 Key 读取 `/api/analytics`、`/api/inquiries`、`/api/smtp-status` 均返回 200。
- 带外部 Origin 的正确测试 Key 在认证前返回 403。
- 没有执行任何 POST、PATCH 或 DELETE；本地 Wrangler 及其 workerd 子进程均已停止，8795 无监听。

## 发布与回退边界

- 发布前重新运行两份 JavaScript 语法检查和本地认证矩阵；Worker-only 变更不需要生成或手工修改 `deploy/`。
- 发布后只使用不产生业务写入的管理 GET 验证 401／403／200 边界，并继续验证公开页面、sitemap、SY300/F29 身份和 F29 五图。
- 若目标运行时不支持 Web Crypto，应回退本阶段两个文件的摘要比较改动，而不是恢复硬编码备用 Key、URL Key 或认证后置。

## 生产发布验收

- Cloudflare Worker 版本为 `b1db7dfe-eec7-45e3-8be8-d029f82cbe8d`；Wrangler 4.120.0 读取 498 个静态文件，没有上传静态资产，只发布 Worker 变更。
- 首页、首页别名、SY300、F29 中文查询、询盘、robots、sitemap、后台和三个预览页共 11 个固定入口均为 HTTP 200。
- sitemap 恰好包含 43 个公开 URL，43/43 均返回 HTTP 200；SY300 与 F29 页面身份正确，F29 保持 `product-detail-v37-unified-layout`。
- F29 从生产页面实际解析出恰好五张唯一图库图片，五张均为 HTTP 200 且响应类型为图片。
- 分析接口缺失／错误 Key、询盘管理接口缺失 Key及 SMTP 状态缺失 Key 均为 401；外部 Origin 的分析管理请求为 403，以上响应均保持 `Cache-Control: no-store`。
- 没有读取或输出生产 `ADMIN_KEY`，因此没有执行正确 Key 的生产管理数据读取；正确 Key 的三个 GET 200 已在隔离 Wrangler 中验证。
- 全部生产验收只使用 GET，没有提交询盘、执行 PATCH/DELETE、读取管理数据或修改 D1。
