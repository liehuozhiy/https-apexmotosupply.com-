# P03 本地公共页面预览路径修复

日期：2026-08-02

## 修复范围

- `frontend/pages/index.html`
- `frontend/pages/videos.html`
- `frontend/pages/news.html`
- `frontend/pages/inquiry.html`
- `frontend/assets/js/videos.js`

将这四个页面直接依赖的静态资源改为相对 `../assets/...` 路径；从 `frontend/pages/*.html` 直接打开时，资源会解析到 `frontend/assets/...`。页面内“联系我们”入口统一指向同目录的 `inquiry.html`。视频列表的 14 个动态媒体源也使用相同的相对路径。

这些相对路径在公开站点的根页面（如 `/videos.html`）会由浏览器规范化为原有的 `/assets/...`，因此不改变 HTTP 的公开路径。

## 验证

- 静态路径解析：`index.html` 16 个、`videos.html` 8 个、`news.html` 7 个、`inquiry.html` 8 个本地资源引用均存在，缺失数为 0。
- `node --check frontend/assets/js/videos.js`：通过。
- `git diff --check`：通过。
- 浏览器的 `file:///` 导航仍被当前浏览器工具安全策略拦截；未绕过该限制。文件系统解析验证已确认四个页面的直接资源路径可由本地文件解析。
