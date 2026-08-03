# P24 公共页面顶部导航一致性复核

日期：2026-08-02

范围：`index.html`、`products.html`、`videos.html`、`news.html`、`inquiry.html`、`contact.html`。

- 六个页面均使用产品世界同一套 `site-header solid`、`brand`、`header-actions`、`nav`、`lang-toggle` 与 `menu-button` 结构。
- 菜单顺序统一为：首页、产品世界、视频展示、新闻／博客、联系我们；语言切换与移动端菜单保持同一组数据属性和共享脚本。
- 本次最小修订仅补齐 `news.html` 的新闻当前项，以及 `inquiry.html`／`contact.html` 的联系我们当前项高亮；未改动共享 CSS、JS、路由、询盘行为或车型数据。

结论：通过。公共页面页头现在与产品世界页使用相同模块及当前页状态。

## 验证

- 已运行 `node scripts/prepare-deploy.mjs`，公共页面已重新生成至本地预览目录。
- 已通过 `http://127.0.0.1:8010/news.html?lang=zh-CN` 浏览器核查：品牌区、五项导航、产品世界加号、语言切换和新闻当前项均正常显示。
- 已在同一浏览器视口中对比 `videos.html?lang=zh-CN` 与 `products.html?lang=zh-CN`：两页的顶部导航渲染一致；视频页仅保留“视频展示”的当前页红色状态。
- 已运行 `git diff --check`，通过。
