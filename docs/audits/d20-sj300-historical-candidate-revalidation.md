# D20 SJ300 历史候选复验

- 复验日期：2026-08-01（Asia/Shanghai）
- 任务性质：只读复验；不生成图片，不复制、移动、删除或修改旧 worktree 与主项目资产。
- 前置结论：A01 已确认旧 SJ300 worktree `cd27` 存在；A02 将 v2 列为“进入复验”、v1 列为“历史保留”。本报告执行最终身份门禁，不把“进入复验”等同于通过。
- 最终结果：**v1 判退；v2 判退。当前两张历史候选均不可接收。**

## 1. 复验范围与判定口径

本次只核对以下内容：

1. 旧 worktree `C:/Users/Administrator/.codex/worktrees/cd27/apex-moto-static` 内两张 SJ300 产品世界预览候选。
2. 当前主项目 `frontend/product-detail/data/sj300.json` 所引用的正面图库，以及主项目内可直接识别 SJ300 结构的两张产品身份图。
3. A01/A02 记录中的路径、SHA-256、尺寸和既有状态。

门禁顺序：**车型身份一致性优先于构图与风格**。候选即使满足 1:2、顶部安全区、暗黑工业环境、红灯和湿地反射，只要关键车型结构发生变化，仍必须判退。

## 2. 当前 worktree 与证据基线

- 当前 `git worktree list --porcelain` 仍列出 `cd27`，旧 worktree HEAD 为 `ff385827dde1d44efde4de70bf1a2507f7bed84e`，未被移动或修改。
- 当前主项目 SJ300 JSON：
  - 绝对路径：`C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/product-detail/data/sj300.json`
  - SHA-256：`06309b4782205306cb4154301b97ad475bc5edda19334d58cd4eca26d3b41675`
  - 正面图库引用：`../assets/img/sj300-dark-studio-gallery/01-front-v3-ultrawide.png`

### 主项目身份对照资产

| 资产 | SHA-256 | 尺寸 / 格式 | 对照作用 |
| --- | --- | --- | --- |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/products/sj300.jpg` | `471b45efb6fd700065209732355d0f0ac9fd611cf769618c5f236629375877e9` | 1600×1100 / JPEG | 真实侧视身份：红黑白车身、两冲程膨胀室、前叉/轮组、座垫和尾部轮廓 |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/products/3.4/sj300.png` | `e459ccb70fc00c06c43a4b3f081d5d7b512086af390fb22eb8b30aa25a6bbd0e` | 1448×1086 / PNG | 左前 3/4 身份：前面罩内的大面积透明灯罩、面罩外形、双叉、红黑白涂装及膨胀室最清楚 |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/sj300-dark-studio-gallery/01-front-v3-ultrawide.png` | `c7ecaccc062c461915e05f88c314bfb9a8447964520194b4d34c56ceec17dd20` | 1942×809 / PNG | 当前 JSON 直接引用的正面图；可核对车把、前叉、前面罩、前轮、左侧膨胀室和脚踏位置 |

三张对照资产共同锁定的识别点：高位宽车把、银色长行程双前叉、红黑白前面罩/车身、粗齿前轮、观察者左侧可见的两冲程膨胀室、两侧脚踏。最关键的差异判断来自 `products/3.4/sj300.png`：其灯具是嵌入前面罩的大面积透明灯罩，不是面罩下方独立的小型三角灯。

## 3. 候选逐张复验

### 3.1 v1

| 项目 | 复验结果 |
| --- | --- |
| 候选绝对路径 | `C:/Users/Administrator/.codex/worktrees/cd27/apex-moto-static/frontend/assets/img/product-world-previews/sj300-preview-headlight-v1.png` |
| SHA-256 | `7388ef3e08e57ba4d3a36ab76de0e0e8c0a5a3db7a66a1a0f2cc19a231fbb29b` |
| 尺寸 / 格式 / 文件大小 | 887×1774 / PNG / 1,893,883 bytes；宽高比 0.5000 |
| A01/A02 历史状态 | 主项目缺失、`main.js` 未接入；A02 为“历史保留” |
| 构图门禁 | 通过：1:2 竖版，整车正面居中；车把、前轮和脚踏未裁；顶部留白、暗黑工业长廊、局部红灯、烟雾、湿地反射成立；无人物、CTA 或额外文字层 |
| 身份一致部分 | 红黑白主色、双前叉、粗齿前轮、观察者左侧膨胀室、车把与脚踏的大体位置与主项目 SJ300 相符 |
| 身份冲突 | 候选把参考图的大面积嵌入式灯罩/面罩改成无字红白斜纹号牌，并在号牌下方新增独立发光三角灯；灯具位置、形状和前面罩结构均改变。候选号牌顶部的圆孔与重绘线缆也不能由主项目身份图闭环。该差异不是简单去 Logo 或背景重绘。 |
| 一致性判断 | **关键身份不一致**。整体仍像同类两冲程越野车，但不能可靠认定为主项目 SJ300 的忠实正面呈现。 |
| 结论 | **判退，不可接收。** A02 的“历史保留”继续仅作为历史证据，不得接入。 |

### 3.2 v2

| 项目 | 复验结果 |
| --- | --- |
| 候选绝对路径 | `C:/Users/Administrator/.codex/worktrees/cd27/apex-moto-static/frontend/assets/img/product-world-previews/sj300-preview-headlight-v2.png` |
| SHA-256 | `12209d135d9536be49d599d302a499ca066ee787afcd2a619b4842f2336f47a3` |
| 尺寸 / 格式 / 文件大小 | 887×1774 / PNG / 1,773,793 bytes；宽高比 0.5000 |
| A01/A02 历史状态 | 主项目缺失、`main.js` 未接入；A02 为“进入复验” |
| 与 v1 的变化 | 同一重绘车辆缩小并下移，顶部 HTML 文字安全区更充足，四周及前轮下方余量更稳；没有修正车辆结构 |
| 构图门禁 | 通过：1:2，完整车把、前轮和脚踏；顶部安全区优于 v1；暗黑工业长廊、局部红灯、烟雾和湿地反射完整；无人物、CTA 或额外文字层 |
| 身份一致部分 | 与 v1 相同：主色、双前叉、粗齿前轮、左侧膨胀室和整体正面轮廓接近主项目身份 |
| 身份冲突 | 完整继承 v1 的错误前面罩与独立三角灯：大面积嵌入式参考灯罩消失，灯具形状和安装位置被改造；红白斜纹号牌、圆孔和线缆组合没有主项目身份依据。缩放和下移只改善版式，不改善身份。 |
| 一致性判断 | **关键身份不一致**。A02 提出的“号牌装饰是否会被误读为文字”和容器裁切已不是主要风险；灯具/面罩结构冲突本身足以否决。 |
| 结论 | **判退，不可接收。** 不建议复制到主项目、不建议接入 `main.js`。 |

## 4. 对比汇总

| 候选 | 文件事实 | 构图/风格 | 车型身份 | 最终结论 |
| --- | --- | --- | --- | --- |
| v1 | 哈希、887×1774 PNG 与 A01/A02 一致 | 通过；主体较大、顶部安全区少于 v2 | 前面罩与灯具结构冲突 | **判退** |
| v2 | 哈希、887×1774 PNG 与 A01/A02 一致 | 通过；顶部安全区和底部余量优于 v1 | 完整继承 v1 的前面罩与灯具结构冲突 | **判退** |

### 可接收性结论

- 可接收：**0 张**。
- 判退：**2 张**（v1、v2）。
- v1 可继续作为历史证据保留，但“保留”不表示可接入。
- v2 的“进入复验”资格在本次身份门禁后终止；不应继续进入接入或容器实显阶段。
- 本任务不生成替代图片。若未来另立制作任务，必须以 `products/3.4/sj300.png` 和当前 JSON 正面图锁定前面罩、嵌入式灯罩、双前叉、膨胀室与脚踏结构，并创建新版本，不能覆盖历史候选。

## 5. 无变更声明

- 未修改、复制、移动或删除旧 `cd27` worktree 的任何文件。
- 未修改或复制主项目图片资产。
- 未修改 `sj300.json`、`site-data.js`、`source-audit-index.json`、共享 CSS/JS、HTML、`CODEX_HANDOFF.md` 或 `TASKS.md`。
- 未生成图片，未构建、部署、暂存、提交、推送、回退或清理。
- 本任务唯一写入为本报告。
