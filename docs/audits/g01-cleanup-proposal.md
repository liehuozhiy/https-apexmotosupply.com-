# G01 审查产物清理提案

日期：2026-08-02

## 任务边界

本提案只列出候选删除项，不执行删除、移动、暂存、提交或覆盖。结论基于当前工作区、文件内容、SHA-256 和既有任务 1 的分类；任何实际删除均需用户逐项或整体明确批准后，重新校验路径和哈希。

## 建议删除（10 个文件，41,057 bytes）

| 路径 | bytes | SHA-256 | 依据 |
| --- | ---: | --- | --- |
| `!i.complete` | 206 | `27a8d21fc095848def23c0817dad712ed2decb8d4f534325912a6e9e4c3e79bb` | 浏览器 evaluate 语法错误文本，不是源码或审计证据。 |
| `!i.naturalWidth).length` | 206 | `332891270f018df7378d28bb85a36a4a2309c1a9e774690326e6807a24714ffa` | 浏览器 evaluate 语法错误文本。 |
| `({src` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | 空命令碎片。 |
| `0}))` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | 空命令碎片。 |
| `String(r.status))` | 206 | `27a8d21fc095848def23c0817dad712ed2decb8d4f534325912a6e9e4c3e79bb` | 浏览器 evaluate 语法错误文本。 |
| `document.documentElement.clientWidth` | 235 | `df9ad33b5896373ad73ed38700876e106d69d5f551c0732572b0f6fca2e613ae` | 浏览器 evaluate 语法错误 JSON。 |
| `document.documentElement.scrollWidth` | 235 | `df9ad33b5896373ad73ed38700876e106d69d5f551c0732572b0f6fca2e613ae` | 浏览器 evaluate 语法错误 JSON。 |
| `getComputedStyle(document.getElementsByClassName('sy300-preview-spec-panel')[0]).getPropertyValue('--product-panel-image')` | 235 | `df9ad33b5896373ad73ed38700876e106d69d5f551c0732572b0f6fca2e613ae` | 浏览器 evaluate 语法错误 JSON。 |
| `r.status)` | 206 | `27a8d21fc095848def23c0817dad712ed2decb8d4f534325912a6e9e4c3e79bb` | 浏览器 evaluate 语法错误文本。 |
| `__pycache__/build_comparison_report.cpython-312.pyc` | 39,528 | `aa1daecc8c7a634eb8b6b6dd3d2d3a4d0cbc35115911f99476bbb1310c2f4eef` | Python 字节码缓存；不是源脚本或审计结果。 |

删除上述 `.pyc` 后，若 `__pycache__/` 为空，可一并删除该空目录；该目录本身不应在文件仍存在时递归删除。

## 明确保留

- 根 `CODEX.md`、`AGENTS.md`、控制/脚本/JSON/HTML/CSS/JS、工作簿和全部审计报告：有效源码、配置或过程记录。
- `_photo_review/` 的 10 张工作簿审阅图，以及根目录 17 张 `f4-product-world-*.png`：当前仍是视觉验收/历史决策证据。
- `frontend/assets/**` 中未引用的版本化候选、产品世界预览、来源参照、QA 截图：均可能服务于 D 阶段资产资格与后续集中接入，不因未引用即删除。
- `deploy/**`：虽为过期生成物，但不得手动删除或编辑；仅可在用户明确要求发布准备时由生成脚本重建。

## 执行前门禁

1. 用户明确批准本提案的 10 个文件；
2. 重新读取每个路径、大小和 SHA-256，若任一项变化则停止并报告；
3. 只处理上述精确文件；不使用通配符或递归删除；
4. 删除后运行 `git status --short` 和 `git diff --check`，并报告可恢复性。

## 2026-08-02 执行前复核

阶段 E 闭合后，已重新读取上述全部 10 个精确路径并重算大小与 SHA-256；结果与本提案表格完全一致，总大小仍为 41,057 bytes。`__pycache__/` 仅包含表内的 `build_comparison_report.cpython-312.pyc`，因此若获批删除该文件，可随后删除这个空目录。

## 执行结果

用户已明确批准本表所列 10 个文件。删除前再次核对路径、大小与 SHA-256，全部与本提案一致（41,057 bytes）。随后仅删除表内 10 个文件；`__pycache__/` 确认为空后一并移除。

删除后复核：10 个目标均不存在，缓存目录不存在，`git diff --check` 通过。未删除、移动、暂存或提交任何图片候选、工作簿、审计报告、`deploy/`、控制文档或业务代码。
