# P50 生产只读验收脚本

日期：2026-08-08（Asia/Shanghai）
状态：已完成

## 目标与边界

- 将 P48、P49 发布时反复使用的生产只读检查固化为无依赖 Node 脚本，减少人工命令差异和漏检。
- 脚本只允许同源 GET，不接受、读取或输出 `ADMIN_KEY`，也没有 POST、PATCH、DELETE、D1、SMTP 或询盘提交入口。
- 本阶段不修改 Worker、前端、静态资产、`deploy/` 或 Cloudflare 配置，因此不需要部署。

## 实现

- 新增 `scripts/verify-production-readonly.mjs`。
- 默认目标为 `https://apexmotosupply.com`，也可通过唯一位置参数传入其他 HTTP/HTTPS 根域名。
- 每个请求最多等待 20 秒，最多四个并发；所有 sitemap 和图库 URL 必须与目标根域同源，避免跟随页面内容请求第三方地址。
- 未知公共路径使用每次运行唯一的随机后缀，避免 CDN 缓存掩盖真实 404。
- 失败时输出具体检查项并返回非零退出码；成功时输出 `PRODUCTION_READONLY_VERIFICATION=PASS`。

## 固定门禁

1. 11 个固定入口必须返回 HTTP 200：首页、首页别名、SY300、F29 中文查询、询盘、robots、sitemap、后台和三个预览页。
2. 分析接口缺失／错误 Key、询盘管理接口缺失 Key、SMTP 状态缺失 Key必须为 401；外部 Origin 管理请求必须为 403；全部必须 `no-store`。
3. 唯一未知公共路径和未知 API 路径必须为 404／`no-store`，公共 404 还必须 `noindex`。
4. sitemap 必须恰好 43 个不重复同源 URL，且 43/43 返回 HTTP 200。
5. SY300、F29 身份和 F29 `product-detail-v37-unified-layout` 标记必须存在。
6. F29 页面必须实际解析出恰好五张唯一图库图片，五张均须为 HTTP 200 图片响应。

## 验证结果

- `node --check scripts/verify-production-readonly.mjs`、帮助入口和 `git diff --check` 通过。
- 静态扫描确认脚本唯一请求方法为 GET，没有环境变量、管理 Key或写方法入口。
- 对生产站点运行 `node scripts/verify-production-readonly.mjs`：
  - 固定入口 11/11；
  - 管理拒绝边界 5/5；
  - 真实 404 边界 2/2；
  - sitemap 43/43；
  - F29 图库 5/5；
  - SY300/F29 身份通过；
  - 共 69 个请求、0 个失败。
- 没有提交询盘、读取管理数据、访问 D1 或修改生产环境。

## 使用方式

```powershell
node scripts/verify-production-readonly.mjs
node scripts/verify-production-readonly.mjs https://apexmotosupply.com
```

后续发布完成后运行一次即可；如果车型范围、sitemap 数量或固定入口发生经批准的变化，应在同一变更中更新脚本常量和对应审计记录。
