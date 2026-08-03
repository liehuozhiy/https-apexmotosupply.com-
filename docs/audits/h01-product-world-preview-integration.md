# H01 产品世界预览集中接入

日期：2026-08-02

## 目标与范围

将阶段 D 已通过资格门禁、且已位于当前主项目的产品世界竖版候选登记到 `frontend/assets/js/main.js` 的 `productWorldPreviewAssets`。本任务不修改车型 JSON、`site-data.js`、来源索引、共享 CSS 或图片资产。

## 接入结果

原有 5 个正式映射保持不变；新增以下 18 个已核验候选：

- ER3、ER5、ER7、ES11；
- ET、ET 2024、ET3、ET5、ET7、ET9；
- F4+、F9；
- H300、S300、S300R、SJ250、SN300、SY300。

`productWorldPreviewAssets` 现有 23 个映射；上述 18 个文件均存在，并与对应阶段 D 审计报告的 SHA-256 一致。

## 未接入车型

- F29R：唯一通过的 `f29r-preview-headlight-v1.png` 仍只存在于历史 worktree。遵循既有“不直接复制旧 worktree”边界，本任务不迁移该文件，故不登记映射。
- F29、HS85、SJ300：阶段 D 候选已判退，不登记映射。

因此正式产品世界预览覆盖率为 **23/27**。

## 验证

- `node --check frontend/assets/js/main.js` 通过。
- 18 个新增资源的本地 SHA-256 与审计记录逐一匹配。
- 浏览器 1440：燃油菜单悬停 SY300、电动菜单悬停 ET7 均显示正确的预览图片、车型名和既有 HTML 文案层。
- 浏览器 Arabic/RTL：燃油菜单悬停 SY300 正常显示预览，未改变图片顺序。
- `git diff --check` 通过。
- 本地静态服务和浏览器会话均已关闭。静态服务器自身不支持 `/api/analytics` POST，并返回 favicon 404；这些与产品世界预览无关，Arabic 验收时无页面脚本错误。

## 结论

H01 已完成。产品世界不再为当前主项目中的 18 个已通过候选回退到未验收的图库图；历史 F29R 迁移及三个判退车型仍需独立授权和候选处理。
