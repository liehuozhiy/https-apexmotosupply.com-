# P48 公共路由真实 404 边界

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 修复未匹配公共 URL 回退首页并返回 HTTP 200 的假成功，不修改任何页面内容、公开 API 契约、D1、SMTP、后台认证或静态资产。
- 已知公开页面、车型页、三个预览页、后台入口、SEO 文件、语言查询参数和资源路径必须保持可用。
- 本阶段没有生成 `deploy/`、部署、提交或推送。

## 生产基线

- 发布前只读检查 `/definitely-missing-p48`、`/missing-p48.html` 和 `/admin/missing-p48`：三者均返回 HTTP 200、`text/html`，且正文包含首页标题。
- 缺失静态资源 `/assets/js/missing-p48.js` 已由 P47 返回 404/no-store，但尚未包含 `X-Robots-Tag`。
- 根因是 Worker 最终兜底固定读取 `/index.html`，状态与正文都无法反映原请求不存在。

## 实现边界

1. 最终未匹配请求改为按原始 pathname 查询 Cloudflare Assets；不存在时保留真实 404，不再读取首页。
2. 补齐实际存在但原路由表遗漏的 `/hs85-preview.html`、`/sy300-preview.html`，与既有 `/home-preview.html` 一起返回真实预览内容。
3. `/admin/index.html` 显式映射至后台文件并保持 no-store；`/admin` 与 `/admin/` 行为不变。
4. 静态响应状态大于等于 400 时增加 `X-Robots-Tag: noindex`；P47 的 no-store 错误缓存边界保持不变。
5. P47 判断错误响应的条件从 `!response.ok` 收窄为 `status >= 400`，避免把合法 304 条件响应误当作错误并附加 no-store/noindex。
6. P42 的未知 `/api/*` 404 行为不变。

## 本地验证

- `node --check api/worker.js` 与 `git diff --check` 通过。
- 隔离的 Wrangler HTTPS Worker 使用端口 8794、本地 D1 与临时测试 Key。
- 46 个 `frontend/pages` HTML、首页别名、三种后台入口、robots 和 sitemap 共 52 个合法入口全部为 HTTP 200，非首页入口没有首页假回退。
- `/home-preview.html`、`/hs85-preview.html`、`/sy300-preview.html` 均返回各自真实页面。
- 未知普通路径、未知 `.html?lang=zh-CN`、非法后台子路径和缺失静态资源四类均为 404/no-store/noindex，正文不含首页标题。
- 版本化 CSS 的条件请求为 304／一年 immutable／无 noindex；未版本化 JS 的条件请求为 304／`max-age=0, must-revalidate`／无 noindex。
- 测试 Wrangler 及其子进程已停止，8794 无监听。

## 发布与回退边界

- 发布后以只读 GET 复核固定页面、sitemap 43/43、SY300/F29 身份、F29 五图及上述已知预览页，再检查多个唯一未知路径确实为 404/no-store/noindex。
- 404 验收必须同时检查状态、正文身份和响应头，避免 CDN 或首页回退继续制造假成功。
- 如合法页面意外 404，应先补入明确路由或确认其静态文件存在；不得恢复全站首页兜底。

## 生产发布验收

- 最终 Cloudflare 版本为 `624fcf79-6294-4af1-a0a3-a2c44bf81c30`；Wrangler 读取 498 个静态文件，没有上传静态资产，仅更新 Worker。
- 部署后首次主域矩阵仍观察到上一版 Worker 的首页兜底与 304/no-store；同一时刻 workers.dev 已返回新 404 行为，判定为短暂边缘传播差异。没有重复部署；随后主域顺序复查和完整矩阵均切换至新版本。
- 生产 46 个公开 HTML、首页别名、三种后台入口、robots 和 sitemap 共 52 个合法入口全部为 HTTP 200，非首页入口均无首页正文回退。
- `/home-preview.html`、`/hs85-preview.html`、`/sy300-preview.html` 均返回真实预览内容；`/admin/index.html` 返回后台内容并保持 no-store。
- 唯一未知普通路径、未知 `.html?lang=zh-CN`、非法后台子路径和缺失静态资源四类均为 404/no-store/noindex，正文不含首页标题。
- 版本化 CSS 的条件请求为 304／一年 immutable／无 noindex；未版本化 JS 为 304／重新验证／无 noindex。
- sitemap 43/43 页面、F29 统一布局及恰好五张唯一图库 PNG 均通过，五图全部为 HTTP 200。
- 验收仅使用 GET 和询盘 OPTIONS，没有启动生产浏览器、发送业务 POST、使用管理 Key、读取管理数据或接触 D1。
