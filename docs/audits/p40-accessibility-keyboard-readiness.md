# P40 可访问性与键盘操作准备

日期：2026-08-05（Asia/Shanghai）
状态：已发布

## 范围与基线

- 检查首页、公共分类页、F29 详情页、产品参数弹窗和询盘表单，不修改车型资料、图库顺序、API、D1、SMTP 或询盘返回契约。
- 首页、询盘、视频、新闻、联系及五个公共分类/批发页面均具备单一 H1、main 地标和有效 html lang；现有静态图片未发现缺少 alt。
- 生产浏览器基线确认产品世界菜单支持 ArrowDown 打开、Escape 关闭并返回触发器；F29 阿拉伯语 RTL 页签方向正确；详情灯箱关闭后能返回原亮点按钮。
- 基线缺口：询盘姓名和邮箱未声明必填，校验失败时焦点停留在提交按钮；产品参数弹窗关闭后不返回原触发按钮，两个模态界面也未显式约束 Tab 焦点。

## 实施内容

1. 询盘姓名与邮箱加入原生 `required` 和 `aria-required="true"`。
2. 自定义校验失败时为首个错误字段设置 `aria-invalid="true"` 并移动焦点；用户继续输入时清除该状态。现有 alert 文案、Excel 下载、API 提交和成功/失败分支不变。
3. 产品参数弹窗记录原触发按钮；打开时同步 `aria-hidden="false"`，关闭时同步为 true 并恢复焦点。
4. 产品参数弹窗和详情灯箱在打开期间把 Tab 保持在各自关闭按钮上；Escape 关闭和原有焦点返回行为保持可用。
5. 27 个车型详情页的灯箱初始状态统一加入 `aria-hidden="true"`。

## 验证结果

- `node --check frontend/assets/js/main.js`、`product-detail.js` 和生成器均通过。
- F29 定向构建及隔离的 `node scripts/build-product-pages.mjs --all` 全量构建通过。
- 27/27 车型页均含唯一的 modal dialog、`aria-modal="true"` 和初始 `aria-hidden="true"`。
- 询盘页姓名/邮箱的 required 与 aria-required 数量均为 2。
- 询盘页与 F29 在 375、768、1440 宽度的 Arabic RTL 下无横向溢出、图片失败或语言方向错误。
- 产品参数弹窗和 F29 灯箱打开后关闭按钮获得焦点；Tab 不离开模态界面；Escape 关闭后焦点返回原按钮。
- 本地浏览器控制台无 error/warn；`git diff --check` 通过。
- 验证未填写或发送询盘，未写入 D1。

## 发布与回退

- 已运行 `node scripts/prepare-deploy.mjs`，部署产物包含 334 张引用图片；Cloudflare 版本为 `36caa55d-c835-49fe-a606-7c88d1e87623`。
- 生产域名固定 7 个 URL、27/27 车型页、F29 五张图库图片和 sitemap 43/43 URL 均返回 HTTP 200；询盘两个必填字段、参数弹窗与灯箱键盘逻辑已在生产静态内容中确认生效。
- 发布验收未填写或发送询盘，未写入 D1。
- 若发布后出现焦点回归，可撤销 `main.js`、`product-detail.js`、询盘页必填属性和详情模板的本阶段变更后重新全量构建；无需回退车型 JSON、图片资产或后端。
