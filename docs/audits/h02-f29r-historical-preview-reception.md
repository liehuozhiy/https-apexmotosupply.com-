# H02 F29R 历史预览资产接收与正式接入

日期：2026-08-02

## 授权与边界

用户明确授权接收唯一已通过复验的 F29R 历史 PNG。本任务只复制该单一文件、登记 `main.js` 映射并同步生成目录；不修改历史 worktree、车型 JSON、`site-data.js`、来源索引或共享 CSS。

## 接收记录

| 项目 | 值 |
| --- | --- |
| 历史来源 | `C:\Users\Administrator\.codex\worktrees\fa6a\apex-moto-static\frontend\assets\img\product-world-previews\f29r-preview-headlight-v1.png` |
| 主项目接收路径 | `frontend/assets/img/product-world-previews/f29r-preview-headlight-v1.png` |
| SHA-256（来源与接收后） | `b693fdb446d444b1a7c7b6921c0da1eff612a03660d694757dd0749b1abcd3d8` |
| 文件大小 | 1,954,957 bytes |
| 映射 | `f29r.html` → `../assets/img/product-world-previews/f29r-preview-headlight-v1.png` |

历史来源文件保持原状。`deploy/` 已由 `node scripts/prepare-deploy.mjs` 生成，生成目录中的同名文件哈希一致。

## 验证

- `node --check frontend/assets/js/main.js` 与 `node --check deploy/assets/js/main.js` 通过。
- 产品世界映射数由 23 增至 24。
- 1440 浏览器：打开 Electric 产品世界并悬停 F29R，显示 `F29R preview`、Time-F 系列标签、车型名及既有 HTML 文案层；截图保存于 `output/playwright/h02-f29r-preview.png`。
- `git diff --check` 通过；临时浏览器和静态服务均已关闭。

## 结论

H02 通过。F29R 已正式接入产品世界；当前覆盖率为 **24/27**。剩余 F29、HS85、SJ300 仍只有判退候选，未登记映射。
