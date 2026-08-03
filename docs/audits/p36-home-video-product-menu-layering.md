# P36 首页视频与产品菜单层级修复

日期：2026-08-02

## 问题

首页打开“产品世界”下拉菜单后，首屏视频/氛围层覆盖菜单，导致菜单局部不可见或不可操作。

## 根因

首页氛围规则对 `body.home-page` 的所有直接子元素设置了相同的 `position: relative; z-index: 1`。页头因此与首屏视频处于同级堆叠上下文，菜单自身的高 `z-index` 无法越过父级上下文。

## 最小修复

- 在 `frontend/assets/css/styles.css` 为 `body.home-page > .site-header` 建立独立的高层叠上下文：`z-index: 100`、`isolation: isolate`、`overflow: visible`。
- 将现有产品详情移动页头规则扩展到首页，并恢复移动导航的绝对定位，避免菜单参与文档宽度计算。
- `frontend/pages/index.html` 更新 CSS 缓存键。
- 未修改首页视频播放逻辑、产品数据、车型 JSON 或图片资产。

## 验收

- 1440px：菜单完整显示在视频和首屏上方，可切换 Fuel/Electric 并选择车型。
- 768px、375px：菜单不被视频遮挡，无文档横向溢出。
- 视频继续播放；重播控件行为正常。
- 源站 `http://127.0.0.1:8011/pages/index.html` 浏览器复验通过。
- `git diff --check` 通过（仅现有 LF/CRLF 提示）。

## 结论

通过。修复仅作用于首页页头堆叠上下文，没有改变视频层本身。`deploy/` 未重建。
