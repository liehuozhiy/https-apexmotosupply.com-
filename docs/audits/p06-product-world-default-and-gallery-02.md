# P06 产品世界默认入口与图库第 02 张

日期：2026-08-02

## 变更

- 产品世界入口由按钮改为链接：普通点击进入同级 `sy300.html?lang=<当前语言>`；桌面指针悬停仍会打开产品世界菜单，键盘 ArrowDown 也可打开。
- `scripts/build-product-pages.mjs` 将所有生成车型页的左侧默认主图和高亮缩略图统一设置为第 02 张；JSON 内固定五图顺序未修改。

## 验证

- `node --check frontend/assets/js/main.js`
- `node --check scripts/build-product-pages.mjs`
- `node scripts/build-product-pages.mjs --all`：27 页通过。
- 逐页静态检查：27/27 生成页均有 `STILL IMAGE / 02` 与第 02 张活动缩略图。
- HTTP 浏览器检查：中文首页的产品世界链接解析为 `sy300.html?lang=zh-CN`；SY300 页左侧主图为“left-front … 02”。
- `git diff --check` 通过。
