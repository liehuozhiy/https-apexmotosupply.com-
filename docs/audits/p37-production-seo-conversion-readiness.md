# P37 生产 SEO 与转化监测准备

日期：2026-08-05

## 范围

- 生产站点公开页面的 HTTP、标题、描述、H1、canonical、Open Graph 与 GA4 基线。
- 27 个 JSON 驱动车型详情页的 sitemap 和分享元数据。
- 询盘成功后的 GA4 转化事件；不改变询盘 API、D1、SMTP 或 Excel 下载。

## 基线结论

- 生产环境抽取的 43 个公开页面全部返回 HTTP 200，标题、描述、单一 H1 和 GA4 脚本均存在。
- 原 sitemap 仅有 16 个 URL，缺少全部 27 个车型详情页。
- 27 个车型详情页缺少 canonical、`og:title` 和 `og:image`。
- 其余 15 个 sitemap 页面缺少 `og:image`；首页图片地址为相对路径。
- 询盘保存成功后没有明确的 GA4 转化事件。

## 实施

- 产品详情模板新增 canonical、Open Graph 标题、描述、URL、车型第 02 张图库分享图、产品类型和站点名。
- 生成器统一生成公开绝对 URL，并增加 canonical 与分享图门禁。
- 全量重建 27 个车型页；未改变车型 JSON、图库顺序、参数、翻译和布局。
- sitemap 从 16 个 URL 扩展到 43 个，车型集合与 27 份 JSON 完全一致。
- 公共页补齐绝对 `og:image`；首页分享图改为绝对 URL。
- 询盘保存成功时发送 GA4 推荐事件 `generate_lead`，参数仅包含提交方式、车型和邮件状态，不包含姓名、邮箱、留言或其他个人信息。

## 验证

- `node --check scripts/build-product-pages.mjs`：通过。
- `node --check frontend/assets/js/main.js`：通过。
- `node scripts/build-product-pages.mjs --all`：27/27 通过。
- sitemap XML 解析、43 个 URL、27 个车型集合一致性：通过。
- 43 个源码页面的标题、描述、canonical、`og:title` 和绝对 `og:image`：通过。
- Playwright 375×812：F29 canonical、车型分享图、H1 和五图正确，页面无横向溢出。
- Playwright 询盘事件捕获：`generate_lead` 参数正确，未包含姓名或邮箱。

## 发布状态与回退

- 已运行 `node scripts/prepare-deploy.mjs`，发布目录由源码重新生成，共解析并复制 334 个引用图片资源。
- Cloudflare 生产版本：`9c5aec9e-4348-40b2-84e6-8d0b7073f082`。
- 发布后主域名 43/43 页面、F29 五图、车型身份、布局标识和线上 `generate_lead` 脚本均验证通过。
- 静态资源在短暂传播窗口后由旧 ETag 自动切换为新 ETag，没有执行手工缓存清理。
- 回退 Cloudflare 时使用上一版本 `cc7c302a-bf32-4d7d-995f-aaae82de1d1e`；源码回退时撤销模板、生成器、生成页、sitemap、公共页分享图及 `main.js` 的本阶段变更即可，无需修改 D1。
