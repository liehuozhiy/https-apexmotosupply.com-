# P47 版本化静态资源缓存策略

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与约束

- 只调整主 Worker 对静态资源响应的浏览器缓存头，不修改资源内容、公开 URL、页面 HTML、API 契约、D1、SMTP 或后台认证。
- 仅对能够由 URL 明确区分版本的成功资源启用长期缓存；HTML、API、未版本化资源和错误响应不得长期缓存。
- 本阶段没有生成 `deploy/`、部署、提交或推送。

## 现状盘点

- 47 个 HTML 页面共有 318 个唯一站内资源引用。
- 25 个引用通过 `?v=` 查询参数版本化，251 个引用的文件名包含独立 `v数字` 版本标记，两组无重叠；合计 276 个引用可安全长期缓存。
- 其余 42 个引用没有明确版本标记，包括首页视频、部分图库和预览图；这些资源继续使用 Cloudflare Assets 原有的 `max-age=0, must-revalidate`。
- 发布前生产抽查的版本化 CSS、F29 图和未版本化首页视频均为 `max-age=0, must-revalidate`。

## 实现边界

1. 仅匹配 `/assets/` 或 `/admin/assets/` 下的成功响应。
2. URL 存在 `v` 查询参数，或资源文件名包含独立 `v数字` 标记时，返回 `Cache-Control: public, max-age=31536000, immutable`。
3. HTML 即使人为附加 `?v=` 也不进入长期缓存。
4. 未版本化资源保持上游缓存头，避免更新同路径资产后旧内容被浏览器锁定一年。
5. 任何静态资源 4xx/5xx 响应统一为 `Cache-Control: no-store`，防止“像版本号的缺失文件”被长期记住。
6. `/admin` 和 JSON API 的既有 `no-store` 优先级保持不变。

## 本地验证

- `node --check api/worker.js` 与 `git diff --check` 通过。
- 隔离的 Wrangler HTTPS Worker 使用端口 8793、本地 D1 与临时测试 Key；验证矩阵如下：
  - `styles.css?v=...`：200／一年 immutable；
  - F29 文件名 `...-v3.png`：200／一年 immutable；
  - 首页 `hero-intro.mp4`：200／`max-age=0, must-revalidate`；
  - 未版本化首页预览图：200／`max-age=0, must-revalidate`；
  - `index.html?v=test`：200／`max-age=0, must-revalidate`；
  - `/admin`：200／`no-store`；
  - 后台脚本 `?v=...`：200／一年 immutable；
  - 不存在的 `missing-v1.js`：404／`no-store`；
  - 未认证 `/api/analytics`：401／`no-store`。
- 测试 Wrangler 及其子进程已停止，8793 无监听。

## 发布与回退边界

- 发布后只读复核上述同类生产 URL 的状态和缓存头，同时确认固定页面、sitemap、SY300/F29 身份及 F29 五图不受影响。
- 不通过添加虚假查询参数验证浏览器缓存命中；只核对页面当前真实引用。
- 如出现同 URL 内容更新但客户端仍旧，应先检查该资源是否错误复用了版本标记；正确回退是移除 Worker 的长期缓存覆盖并发布新资源 URL，不能清理或覆盖用户资产。

## 生产发布验收

- 最终 Cloudflare 版本为 `a71b5107-650d-47c7-8589-c928d1594870`；Wrangler 读取 498 个静态文件，没有上传静态资产，仅更新 Worker。
- 生产 9 项缓存边界与本地一致：版本化 CSS、F29 图片和后台脚本为一年 immutable；首页视频、未版本化预览图和 HTML 继续重新验证；后台、未认证 API 及版本化 404 为 no-store。
- `/`、`/index.html`、`/sy300.html`、`/f29.html?lang=zh-CN`、`/inquiry.html`、`/robots.txt` 和 `/sitemap.xml` 均为 HTTP 200；sitemap 43/43 页面通过。
- SY300/F29 身份、F29 `product-detail-v37-unified-layout` 及恰好五张唯一图库 PNG 均通过；五图全部为 HTTP 200 且获得一年 immutable。
- 首轮生产矩阵发生一次 TLS 建连重置，没有产生业务失败结果；相同只读请求在短重试矩阵中全部通过。
- 验收只使用 GET 和询盘 OPTIONS，没有启动生产浏览器、发送业务 POST、使用管理 Key、读取管理数据或接触 D1。
