# 历史 worktree 差异审计

- 审计时间：2026-08-01 18:59:53 +08:00（Asia/Shanghai）
- 主项目：`C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static`
- 主项目分支：`main`
- 主项目 HEAD：`ff385827dde1d44efde4de70bf1a2507f7bed84e`
- 审计性质：只读差异盘点；不作接收、合并、清理或发布决策。

## 口径

- 旧 worktree 文件范围以各 worktree 的 `git -c core.quotepath=false ls-files --others --exclude-standard` 为准；四个 worktree 均无已跟踪 diff，相关成果全部表现为未跟踪文件。
- “主项目对应路径”采用相同仓库相对路径；状态按两端文件 SHA-256 判定为“相同”“不同”或“主项目缺失”。
- “直接引用”仅认定当前主项目 `frontend/product-detail/data/<model>.json`、`frontend/assets/js/main.js` 中的精确路径，以及当前车型 JSON（构建输入）和当前车型 HTML（`main.js` 车型入口）。同名但目录不同不算直接引用。
- QA、Playwright、验证截图、来源/生成记录按目录或证据子集汇总。汇总 SHA-256 是把该组文件按相对路径排序后，将每行 `相对路径<TAB>文件SHA-256<LF>` 拼接所得清单的 SHA-256；它不是任一单文件哈希。
- “明显更新版本”只据当前文件名版本序列和当前 JSON/`main.js` 实际采用路径陈述；没有明确证据时标记“未见”或“仍需 A02 决策”。

## worktree 清单与 ET 核实

| worktree | HEAD | 分支/状态 | 本报告车型 |
| --- | --- | --- | --- |
| `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static` | `ff385827dde1d44efde4de70bf1a2507f7bed84e` | `refs/heads/main` | 主项目 |
| `C:/Users/Administrator/.codex/worktrees/483f/apex-moto-static` | `ff385827dde1d44efde4de70bf1a2507f7bed84e` | detached | Babey |
| `C:/Users/Administrator/.codex/worktrees/6276/apex-moto-static` | `ff385827dde1d44efde4de70bf1a2507f7bed84e` | detached | F4 |
| `C:/Users/Administrator/.codex/worktrees/cd27/apex-moto-static` | `ff385827dde1d44efde4de70bf1a2507f7bed84e` | detached | SJ300 |
| `C:/Users/Administrator/.codex/worktrees/fa6a/apex-moto-static` | `ff385827dde1d44efde4de70bf1a2507f7bed84e` | detached | F29R |

**ET worktree 当前不存在。** `git worktree list --porcelain` 仅返回上表五项；因此 ET 节只记录主项目当前可访问的遗留资产和交接历史，不为不可访问的历史 worktree 虚构路径或哈希。

## Babey（worktree `483f`）

### 逐文件明细

| 旧 worktree 相对路径 | 旧 SHA-256 | 主项目对应路径 | 主项目 SHA-256 | 状态 | 直接引用 | 明显更新版本/事实 |
| --- | --- | --- | --- | --- | --- | --- |
| `frontend/assets/css/babey.css` | `13b060cd76a62cd1f3ab8247c25dec410b4231786556222b176e9714cb088231` | `frontend/assets/css/babey.css` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/assets/img/babey-official-highlights/babey-highlight-aluminum-body-official.jpg` | `11ba4dd606c5f35096fae199a0f5a9d1353958e89617da19f4c6e268488b21da` | `frontend/assets/img/babey-official-highlights/babey-highlight-aluminum-body-official.jpg` | `11ba4dd606c5f35096fae199a0f5a9d1353958e89617da19f4c6e268488b21da` | 相同 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/babey-official-highlights/babey-highlight-battery-official.jpg` | `acecf119c0587c9d7c55d68489595406200eccd26d23536e90a686832cfe016f` | `frontend/assets/img/babey-official-highlights/babey-highlight-battery-official.jpg` | `acecf119c0587c9d7c55d68489595406200eccd26d23536e90a686832cfe016f` | 相同 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/babey-official-highlights/babey-highlight-rear-hub-motor-official.jpg` | `84127de26a31b2557c0be6503467aaa07f72a2a522e457cb2da85d79f75cf27d` | `frontend/assets/img/babey-official-highlights/babey-highlight-rear-hub-motor-official.jpg` | `84127de26a31b2557c0be6503467aaa07f72a2a522e457cb2da85d79f75cf27d` | 相同 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/babey-official-highlights/babey-highlight-suspension-official.jpg` | `da48e4744a5c1e9498bb0c90d37e4ac9fc5cb646290e88718be4272a26813751` | `frontend/assets/img/babey-official-highlights/babey-highlight-suspension-official.jpg` | `da48e4744a5c1e9498bb0c90d37e4ac9fc5cb646290e88718be4272a26813751` | 相同 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-01-front-dark-v1.png` | `cf38e22471bbeb85ae238019fed09c01469a23180868315be50d9648f8d16484` | `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-01-front-dark-v1.png` | `cf38e22471bbeb85ae238019fed09c01469a23180868315be50d9648f8d16484` | 相同 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-02-left-front-half-dark-v1.png` | `698d00a88aca35ccc4ad9bb6e2f630eed88e5a490a504798f79fc7ed5c0d2581` | `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-02-left-front-half-dark-v1.png` | `698d00a88aca35ccc4ad9bb6e2f630eed88e5a490a504798f79fc7ed5c0d2581` | 相同 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-03-left-dark-v1.png` | `0bd54200fdf4fd830e9d070bd909de9f7edcc98e1ae8d0cb85244053d27f39c7` | `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-03-left-dark-v1.png` | `0bd54200fdf4fd830e9d070bd909de9f7edcc98e1ae8d0cb85244053d27f39c7` | 相同 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-04-left-rear-half-dark-v2.png` | `414cd9b49baba5756bfe73a9e271c27024d6a1ae48259fecfb0c50ed221a8509` | `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-04-left-rear-half-dark-v2.png` | `414cd9b49baba5756bfe73a9e271c27024d6a1ae48259fecfb0c50ed221a8509` | 相同 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-05-rear-dark-v1.png` | `af0a4f71ed9377de773c2a0824bf51e32bf74b40daecd2082d2c26e91337c068` | `frontend/assets/img/generated/babey-gallery-dark-v1/babey-angle-05-rear-dark-v1.png` | `af0a4f71ed9377de773c2a0824bf51e32bf74b40daecd2082d2c26e91337c068` | 相同 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-gallery-wide-v2/babey-angle-01-front-wide-dark-v2.png` | `ad01a7b99ac1bd7a2a804c8a0d80b25ea8655658350652e62745941105620d42` | `frontend/assets/img/generated/babey-gallery-wide-v2/babey-angle-01-front-wide-dark-v2.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-gallery-wide-v2/babey-angle-01-front-wide-dark-v3.png` | `68022cbdab66f87068191ee8a978051c6ca6aeaa74cc3be241e9370b1d181816` | `frontend/assets/img/generated/babey-gallery-wide-v2/babey-angle-01-front-wide-dark-v3.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 babey-gallery-wide-v3 五图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-01-battery-dark-v2.png` | `0039e84feca0eee30b5a95047d53751a49b66ea29ec748b0e7631e01e36d027a` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-01-battery-dark-v2.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-02-rear-hub-motor-dark-v2.png` | `172e4585c6ab2d8b0839e74cea6ec79a415b20d4832c1043d191272911d239fa` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-02-rear-hub-motor-dark-v2.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-03-suspension-dark-v2.png` | `093d1af437701ea6886c53bc7e71edeea7b62f1f2a0ad1841da97b3e2b1a23b1` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-03-suspension-dark-v2.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-04-aluminum-frame-dark-v2.png` | `0b9a78bdcabddd7755d798b70af4104dd5686b56c7cc2bb4297fd25bb9d40935` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-04-aluminum-frame-dark-v2.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-aluminum-body-dark-industrial-v3-master.png` | `bf843426d48baa95b061bc2669981a78d9cf328cb31309365fd6e188287d8193` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-aluminum-body-dark-industrial-v3-master.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-aluminum-body-dark-industrial-v3.webp` | `2f643f4d4a2d27e639af29cfc1e980d7edb0b9b6d3ea9ccef18a9abb156af849` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-aluminum-body-dark-industrial-v3.webp` | `2f643f4d4a2d27e639af29cfc1e980d7edb0b9b6d3ea9ccef18a9abb156af849` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-battery-dark-industrial-v2.webp` | `7c95568403fe8367dd9e062d36b440177b893ced25a10f10e4618513d36a3d77` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-battery-dark-industrial-v2.webp` | `7c95568403fe8367dd9e062d36b440177b893ced25a10f10e4618513d36a3d77` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-rear-hub-motor-dark-industrial-v2-master.png` | `e6704490de8cea6f3429979300184249460de8599d8fb93bad8054969d57f9ea` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-rear-hub-motor-dark-industrial-v2-master.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-rear-hub-motor-dark-industrial-v2.webp` | `26c61f672a8b9d0db5ce326c49a90011f284c2141cd393d92f065dfd89379cf5` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-rear-hub-motor-dark-industrial-v2.webp` | `26c61f672a8b9d0db5ce326c49a90011f284c2141cd393d92f065dfd89379cf5` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-suspension-dark-industrial-v2-master.png` | `726085a8b93c1631c7acb51132dcf262ff475acd584985fe6c88e23a1fdbeab8` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-suspension-dark-industrial-v2-master.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 industrial WebP v2/v3 亮点图；未直接采用的原图/PNG/master 为历史候选或源图。 |
| `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-suspension-dark-industrial-v2.webp` | `fd3eea4b40405c3e4bcc0f523d44b3c5de1d5c5383c89b511f6c7debc742a839` | `frontend/assets/img/generated/babey-highlights-dark-v2/babey-highlight-suspension-dark-industrial-v2.webp` | `fd3eea4b40405c3e4bcc0f523d44b3c5de1d5c5383c89b511f6c7debc742a839` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/product-world-previews/babey-preview-dark-metal-v1.png` | `47891b27a26d6fd824b26aeedfaee9e89cbba7b69c2054a0e3f28499f3ab9675` | `frontend/assets/img/product-world-previews/babey-preview-dark-metal-v1.png` | — | 主项目缺失 | 否 | 是：当前 main.js 采用 babey-preview-headlight-v3.png；旧预览已被更新版本取代。 |
| `frontend/assets/img/product-world-previews/babey-preview-headlight-v1.png` | `9b51ec070fc55e42a5e5bbfd45a48bbf67b7ff5936501eec27a32487b29c482d` | `frontend/assets/img/product-world-previews/babey-preview-headlight-v1.png` | — | 主项目缺失 | 否 | 是：当前 main.js 采用 babey-preview-headlight-v3.png；旧预览已被更新版本取代。 |
| `frontend/assets/img/product-world-previews/babey-preview-headlight-v2.png` | `0411b4ecc92b50a84911f275e8b9943db7a0fec2bfe1f8fb2596d43778a2b4df` | `frontend/assets/img/product-world-previews/babey-preview-headlight-v2.png` | — | 主项目缺失 | 否 | 是：当前 main.js 采用 babey-preview-headlight-v3.png；旧预览已被更新版本取代。 |
| `frontend/assets/img/product-world-previews/babey-preview-headlight-v3.png` | `44fe3145569e93190789d4d1b1eaf532d93404280c7145d48e6cd9c7e8c557bd` | `frontend/assets/img/product-world-previews/babey-preview-headlight-v3.png` | `44fe3145569e93190789d4d1b1eaf532d93404280c7145d48e6cd9c7e8c557bd` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/js/babey-analytics-config.js` | `60cb41da9e1c529b96f6fa397eccf45166a8d01680b9b974229d94ceee5aa762` | `frontend/assets/js/babey-analytics-config.js` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/assets/js/babey-analytics.js` | `2946af64250bcc07bacf9f8f11fcd44c0a85fc4760790661fd4ab87ba1426884` | `frontend/assets/js/babey-analytics.js` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/assets/js/babey-ga4.js` | `4ba409fbdff5608afbb03a59295af7a49328b14d972c32709fe2f0a9cd0a41a7` | `frontend/assets/js/babey-ga4.js` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/assets/js/babey-i18n.js` | `0c5a3bdc538a474e1fd9a84ca9e2f26058620423863859dfda59bab362040d51` | `frontend/assets/js/babey-i18n.js` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/assets/js/babey-main.js` | `197234df1f9f1142bb3dc7842d96209b669558bc297559c2ed3222d60432cba0` | `frontend/assets/js/babey-main.js` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/assets/js/babey-site-data.js` | `835763ff3a242248ae6e3466467cbfdf7e8cd27d22fb17d1f453965fa86ba0d2` | `frontend/assets/js/babey-site-data.js` | — | 主项目缺失 | 否 | 主项目未采用该车型专用文件；是否保留仍需 A02 决策。 |
| `frontend/pages/babey.html` | `4f38da99f2d1db2dc59b97e6299406eef565bc7a6bab0141e233917f85e17509` | `frontend/pages/babey.html` | `0388c3b897f456cf1ba49ee48797a3c0658a2b908ca397df78d40aacc78194d4` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |
| `frontend/product-detail/data/babey.json` | `49be1de9ece4fa93ddae3cad9d41991273d39a176fc3e3a4981259c363bfdb65` | `frontend/product-detail/data/babey.json` | `7a2037da534ef1737464b6045c3af70049fdb27c3e5f9a51702ff34754df76d5` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |

### QA / Playwright 等证据汇总

| 旧 worktree 范围 | 文件数 | 旧清单 SHA-256 | 主项目对应范围 | 主项目清单 SHA-256 | 相同/不同/缺失 | 直接引用 |
| --- | ---: | --- | --- | --- | --- | ---: |
| `output/playwright/` | 7 | `8b824107921e7cc90957ec1083ade840bae660717979ac9d478bc8b238891ed2` | `output/playwright/` | —（含缺失） | 0/0/7 | 0 |

本 worktree 统计：文件 42；相同 14；不同 2；主项目缺失 26；被主项目直接引用 7。

## F4（worktree `6276`）

### 逐文件明细

| 旧 worktree 相对路径 | 旧 SHA-256 | 主项目对应路径 | 主项目 SHA-256 | 状态 | 直接引用 | 明显更新版本/事实 |
| --- | --- | --- | --- | --- | --- | --- |
| `frontend/assets/img/f4-official/f4-angle-01-front-dark-industrial-panorama-v3.png` | `6c340e75c98a969a0e45d5fb480a5f5a3887ee7ac665c46c0d1f5fa4e12f22e9` | `frontend/assets/img/f4-official/f4-angle-01-front-dark-industrial-panorama-v3.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用同系列 panorama-v4。 |
| `frontend/assets/img/f4-official/f4-angle-01-front-dark-industrial-panorama-v4.png` | `fd6ea540391b7d604348f07cab0868ec29d9f799691df48a41eed23fd60aa555` | `frontend/assets/img/f4-official/f4-angle-01-front-dark-industrial-panorama-v4.png` | `fd6ea540391b7d604348f07cab0868ec29d9f799691df48a41eed23fd60aa555` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f4-official/f4-angle-01-front-dark-industrial-v2.png` | `21571413c8bc2f31612bc273d9c0ac359ccd057fa9c8fca26653c0a7b500c7b2` | `frontend/assets/img/f4-official/f4-angle-01-front-dark-industrial-v2.png` | `21571413c8bc2f31612bc273d9c0ac359ccd057fa9c8fca26653c0a7b500c7b2` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-angle-01-front.jpg` | `862e04d2f6abe76f9bdb8ccdce90cf1344c477fcd4120798d984bc71d81c95e6` | `frontend/assets/img/f4-official/f4-angle-01-front.jpg` | `862e04d2f6abe76f9bdb8ccdce90cf1344c477fcd4120798d984bc71d81c95e6` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-angle-02-left-front-half-dark-industrial-v2.png` | `4108c0c79b3440afc8695e6ce3c94ba7fa9f9420018e34aaecba6771887001d4` | `frontend/assets/img/f4-official/f4-angle-02-left-front-half-dark-industrial-v2.png` | `4108c0c79b3440afc8695e6ce3c94ba7fa9f9420018e34aaecba6771887001d4` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-02-left-front-half.jpg` | `30d46314b4a633bddddc91010b0314f776f4b5dbd8b22bcac96e2734b5e5f984` | `frontend/assets/img/f4-official/f4-angle-02-left-front-half.jpg` | `30d46314b4a633bddddc91010b0314f776f4b5dbd8b22bcac96e2734b5e5f984` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-03-left-dark-industrial-v2.png` | `07665d7ce1049b5443c75b9771748a61b828745a5bed14b02975c4934a2093ff` | `frontend/assets/img/f4-official/f4-angle-03-left-dark-industrial-v2.png` | `07665d7ce1049b5443c75b9771748a61b828745a5bed14b02975c4934a2093ff` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-03-left.jpg` | `9ff5a8c5475380caab8eb4610739794cd760f9139266cdb5501875e3c335d19a` | `frontend/assets/img/f4-official/f4-angle-03-left.jpg` | `9ff5a8c5475380caab8eb4610739794cd760f9139266cdb5501875e3c335d19a` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-04-left-rear-half-dark-industrial-v2.png` | `5843973d6d95ff5676c7597e8251f11d2dfc0eb713f842940c698c16f95702e8` | `frontend/assets/img/f4-official/f4-angle-04-left-rear-half-dark-industrial-v2.png` | `5843973d6d95ff5676c7597e8251f11d2dfc0eb713f842940c698c16f95702e8` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-04-left-rear-half.jpg` | `52a7309cff38913c4b45222fcf6301016dbb7024d36ac09f0e344e970adc93f0` | `frontend/assets/img/f4-official/f4-angle-04-left-rear-half.jpg` | `52a7309cff38913c4b45222fcf6301016dbb7024d36ac09f0e344e970adc93f0` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-05-rear-dark-industrial-v2.png` | `e8105ab96d6de7cf01a63ba3ead7f09456c33dbf7a982b839a1267fe6c4b2e54` | `frontend/assets/img/f4-official/f4-angle-05-rear-dark-industrial-v2.png` | `e8105ab96d6de7cf01a63ba3ead7f09456c33dbf7a982b839a1267fe6c4b2e54` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-angle-05-rear.jpg` | `c0f036eacd4e27cd88e33a16917bddc2e72afe33841586f0734a2551ac0195bd` | `frontend/assets/img/f4-official/f4-angle-05-rear.jpg` | `c0f036eacd4e27cd88e33a16917bddc2e72afe33841586f0734a2551ac0195bd` | 相同 | 否 | 是：当前 JSON 采用对应 panorama-v3。 |
| `frontend/assets/img/f4-official/f4-highlight-aluminum-body.jpg` | `67545313b541b442df30f86462198973ce73527500ef55a1a5d189fad4954894` | `frontend/assets/img/f4-official/f4-highlight-aluminum-body.jpg` | `67545313b541b442df30f86462198973ce73527500ef55a1a5d189fad4954894` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-highlight-endurance-battery-dark-industrial-v1.png` | `0c300c8d22dfdcaa12a90ddc1e16de7bb3f105f5259168935083a09641c0e7d4` | `frontend/assets/img/f4-official/f4-highlight-endurance-battery-dark-industrial-v1.png` | `0c300c8d22dfdcaa12a90ddc1e16de7bb3f105f5259168935083a09641c0e7d4` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f4-official/f4-highlight-frame-battery-dark-industrial-v1.png` | `bd221bb7590a1a23a3a7f541589b971ad3a1ffb9e3d159e313f296cada2888d6` | `frontend/assets/img/f4-official/f4-highlight-frame-battery-dark-industrial-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 v2。 |
| `frontend/assets/img/f4-official/f4-highlight-hub-motor-dark-industrial-v1.png` | `83faff38255de43a55e8ae06a2a0fea590f536fa9414cff0f0a1620e931ca1a1` | `frontend/assets/img/f4-official/f4-highlight-hub-motor-dark-industrial-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 v2。 |
| `frontend/assets/img/f4-official/f4-highlight-hub-motor.jpg` | `ac4be25c7ce1782f8e0e9e1979213750629fc2bf81e68d03e4f678d652c47d96` | `frontend/assets/img/f4-official/f4-highlight-hub-motor.jpg` | `ac4be25c7ce1782f8e0e9e1979213750629fc2bf81e68d03e4f678d652c47d96` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-highlight-rear-shock-dark-industrial-v1.png` | `a9f98796e04a83a0bb061239e103584d3b7472e1f126116abdcaa3d35d31092c` | `frontend/assets/img/f4-official/f4-highlight-rear-shock-dark-industrial-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 v2。 |
| `frontend/assets/img/f4-official/f4-highlight-rear-shock.jpg` | `1ae855f83dbbc9cf446798dcbfd3a6aba68b3e0d98047c6f3ab0cbd5e1c756bc` | `frontend/assets/img/f4-official/f4-highlight-rear-shock.jpg` | `1ae855f83dbbc9cf446798dcbfd3a6aba68b3e0d98047c6f3ab0cbd5e1c756bc` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-panel-left-front-red-showroom-v3-master.png` | `3c8b1daf3214041c0983ca114935d8fddb78859b1f8693a1e5308e0e3259dfba` | `frontend/assets/img/f4-official/f4-panel-left-front-red-showroom-v3-master.png` | `3c8b1daf3214041c0983ca114935d8fddb78859b1f8693a1e5308e0e3259dfba` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-panel-left-front-red-showroom-v3-web.jpg` | `00c650e37bc634d1045a588a470a0b53dc90b05e40b0be654e4242f98f182d92` | `frontend/assets/img/f4-official/f4-panel-left-front-red-showroom-v3-web.jpg` | `00c650e37bc634d1045a588a470a0b53dc90b05e40b0be654e4242f98f182d92` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v4-master.png` | `4f5d9ceea8aff7ab3accf682e8172eed76a099c317c193562f3c227b29b4d0d1` | `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v4-master.png` | `4f5d9ceea8aff7ab3accf682e8172eed76a099c317c193562f3c227b29b4d0d1` | 相同 | 否 | 是：当前 JSON 采用同系列 v5 WebP。 |
| `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v4-web.webp` | `53b08c6a583b43d42320b61633428cab4cb262c5c448f9b2459e319e537d490d` | `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v4-web.webp` | `53b08c6a583b43d42320b61633428cab4cb262c5c448f9b2459e319e537d490d` | 相同 | 否 | 是：当前 JSON 采用同系列 v5 WebP。 |
| `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v5-master.png` | `c4d09c80d361c94f9cd0036eac54c43899d4cd46947588600b0ebfd5a29a1bf8` | `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v5-master.png` | `c4d09c80d361c94f9cd0036eac54c43899d4cd46947588600b0ebfd5a29a1bf8` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v5-web.webp` | `249bef529ccca897a9872e8b3663989fc98e4467b2c2850bca48be08c52f0d5a` | `frontend/assets/img/f4-official/f4-panel-v11-left-front-red-curtain-v5-web.webp` | `249bef529ccca897a9872e8b3663989fc98e4467b2c2850bca48be08c52f0d5a` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/product-world-previews/f4-preview-headlight-v1.png` | `621864dcb30799e072d6556634bec46e4bdba690843d62e3d525e6069ed57f7d` | `frontend/assets/img/product-world-previews/f4-preview-headlight-v1.png` | — | 主项目缺失 | 否 | 是：当前 main.js 采用 f4-preview-headlight-centered-v6.png；v1/v2 已被更新版本取代。 |
| `frontend/assets/img/product-world-previews/f4-preview-headlight-v2.png` | `7b8902f5dcc8088bf6438d103fa14d1e03ca466d5d4fa553f0e9f0103b85ec07` | `frontend/assets/img/product-world-previews/f4-preview-headlight-v2.png` | — | 主项目缺失 | 否 | 是：当前 main.js 采用 f4-preview-headlight-centered-v6.png；v1/v2 已被更新版本取代。 |
| `frontend/pages/f4.html` | `a7b00a87b94717f6c3e34c3a1455706aba1dcd3582ae231a6a1ca72c4fba4543` | `frontend/pages/f4.html` | `48011dccac8b12d6a3ce1b1e88262e1b95bc012edfd3632f45bb5798a9398880` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |
| `frontend/product-detail/data/f4.json` | `076de1c51762313f85c2715aeced02c5e3c0e034771b25077e61c6243797561b` | `frontend/product-detail/data/f4.json` | `90188760eb834aff34d7307067fd6e48ea4b0687ea332bcc636944140f41d956` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |

### QA / Playwright 等证据汇总

| 旧 worktree 范围 | 文件数 | 旧清单 SHA-256 | 主项目对应范围 | 主项目清单 SHA-256 | 相同/不同/缺失 | 直接引用 |
| --- | ---: | --- | --- | --- | --- | ---: |
| `frontend/assets/img/f4-official/（证据子集）` | 1 | `67607826bc32d8ebd0087699be61b80a087b4338f72ecf0433c4e8be9076dca0` | `frontend/assets/img/f4-official/（证据子集）` | `c7092c5373ca0219ff8a89e8e8dfa480bb78661d9286af3335bd925412ae5e2a` | 0/1/0 | 0 |
| `output/playwright/` | 56 | `64d9bec2d03e3cf4c0d1b1a5302f102f0d25daebbf5afd815605b823fe083da8` | `output/playwright/` | —（含缺失） | 0/0/56 | 0 |

本 worktree 统计：文件 86；相同 21；不同 3；主项目缺失 62；被主项目直接引用 5。

## SJ300（worktree `cd27`）

### 逐文件明细

| 旧 worktree 相对路径 | 旧 SHA-256 | 主项目对应路径 | 主项目 SHA-256 | 状态 | 直接引用 | 明显更新版本/事实 |
| --- | --- | --- | --- | --- | --- | --- |
| `frontend/assets/css/product-detail.css` | `c8c7dc72a544ab926a915f5e3a1cab5280a90bd2edf84a0745b59573b7278fed` | `frontend/assets/css/product-detail.css` | `bb0d2189552661246987c0c9be47aab49f0308749378e624819d832e89022e28` | 不同 | 否 | 是：主项目同路径内容已更新。 |
| `frontend/assets/img/product-world-previews/sj300-preview-headlight-v1.png` | `7388ef3e08e57ba4d3a36ab76de0e0e8c0a5a3db7a66a1a0f2cc19a231fbb29b` | `frontend/assets/img/product-world-previews/sj300-preview-headlight-v1.png` | — | 主项目缺失 | 否 | 未见正式更新版本：当前 main.js 无 SJ300 预览映射；仍需 A02 决策。 |
| `frontend/assets/img/product-world-previews/sj300-preview-headlight-v2.png` | `12209d135d9536be49d599d302a499ca066ee787afcd2a619b4842f2336f47a3` | `frontend/assets/img/product-world-previews/sj300-preview-headlight-v2.png` | — | 主项目缺失 | 否 | 未见正式更新版本：当前 main.js 无 SJ300 预览映射；仍需 A02 决策。 |
| `frontend/assets/img/sj300-dark-studio-gallery/01-front-v2-dark-studio.png` | `f18ab771a52f2e075a97f43e16c167e6eaa13f49371064c4a266b866e9da3fc6` | `frontend/assets/img/sj300-dark-studio-gallery/01-front-v2-dark-studio.png` | `f18ab771a52f2e075a97f43e16c167e6eaa13f49371064c4a266b866e9da3fc6` | 相同 | 否 | 是：当前 JSON 采用对应 v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-dark-studio-gallery/01-front-v3-ultrawide.png` | `c7ecaccc062c461915e05f88c314bfb9a8447964520194b4d34c56ceec17dd20` | `frontend/assets/img/sj300-dark-studio-gallery/01-front-v3-ultrawide.png` | `c7ecaccc062c461915e05f88c314bfb9a8447964520194b4d34c56ceec17dd20` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-dark-studio-gallery/02-left-front-3q-v3-ultrawide.png` | `b3141ca73dc71fc2bc8d6f492d4e83cdf4e7f9fd70eb748549d203a0af01a480` | `frontend/assets/img/sj300-dark-studio-gallery/02-left-front-3q-v3-ultrawide.png` | `b3141ca73dc71fc2bc8d6f492d4e83cdf4e7f9fd70eb748549d203a0af01a480` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-dark-studio-gallery/02-left-front-half-v2-dark-studio.png` | `c0e3a18b9afe3e64a36657e6b960f509e16cf20e3054d4ac88d736338bcb128b` | `frontend/assets/img/sj300-dark-studio-gallery/02-left-front-half-v2-dark-studio.png` | `c0e3a18b9afe3e64a36657e6b960f509e16cf20e3054d4ac88d736338bcb128b` | 相同 | 否 | 是：当前 JSON 采用对应 v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-dark-studio-gallery/03-left-side-v2-dark-studio.png` | `c69467edfe7221961edd412960c54e87304522ef220d6a8ff59826fc16f529fa` | `frontend/assets/img/sj300-dark-studio-gallery/03-left-side-v2-dark-studio.png` | `c69467edfe7221961edd412960c54e87304522ef220d6a8ff59826fc16f529fa` | 相同 | 否 | 是：当前 JSON 采用对应 v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-dark-studio-gallery/03-left-side-v3-ultrawide.png` | `0d64782ffad8cbeb6c02499504139f7779dfdbc9dcf43b907d1ebcc1818baf21` | `frontend/assets/img/sj300-dark-studio-gallery/03-left-side-v3-ultrawide.png` | `0d64782ffad8cbeb6c02499504139f7779dfdbc9dcf43b907d1ebcc1818baf21` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-dark-studio-gallery/04-left-rear-3q-v3-ultrawide.png` | `3c6d921711cd5e6dc9062c915a88a93b052d1ff832e5d43e31e797731a16c73a` | `frontend/assets/img/sj300-dark-studio-gallery/04-left-rear-3q-v3-ultrawide.png` | `3c6d921711cd5e6dc9062c915a88a93b052d1ff832e5d43e31e797731a16c73a` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-dark-studio-gallery/04-left-rear-half-v2-dark-studio.png` | `d0e894eb936a27f141f70adf36bddd463920f64960b01d973ffa1c1d786dc01f` | `frontend/assets/img/sj300-dark-studio-gallery/04-left-rear-half-v2-dark-studio.png` | `d0e894eb936a27f141f70adf36bddd463920f64960b01d973ffa1c1d786dc01f` | 相同 | 否 | 是：当前 JSON 采用对应 v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-dark-studio-gallery/05-rear-v2-dark-studio.png` | `e26ad067b46fe107bdf0deab451f40c01819e8cb4f6d453ccd0a1a9136543e78` | `frontend/assets/img/sj300-dark-studio-gallery/05-rear-v2-dark-studio.png` | `e26ad067b46fe107bdf0deab451f40c01819e8cb4f6d453ccd0a1a9136543e78` | 相同 | 否 | 是：当前 JSON 采用对应 v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-dark-studio-gallery/05-rear-v3-ultrawide.png` | `1635f930af01a7a2281fc2c48ba505f07d183cc30ba9c7a0e52aca272f306e40` | `frontend/assets/img/sj300-dark-studio-gallery/05-rear-v3-ultrawide.png` | `1635f930af01a7a2281fc2c48ba505f07d183cc30ba9c7a0e52aca272f306e40` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-hero-panel-red-v1.png` | `b623839856bc54ad72c015806e943dfd6ed859fb7dd9259fe58e725d43342ee7` | `frontend/assets/img/sj300-hero-panel-red-v1.png` | `b623839856bc54ad72c015806e943dfd6ed859fb7dd9259fe58e725d43342ee7` | 相同 | 否 | 是：当前 JSON 采用 sj300-hero-panel-industrial-red-v11-v9plus-red-16x9.webp。 |
| `frontend/assets/img/sj300-hero-panel-red-v2.png` | `90d20cf07a98bdd7638ccfe98fc283e79fbe8ba576194b8b195593787b07de9f` | `frontend/assets/img/sj300-hero-panel-red-v2.png` | `90d20cf07a98bdd7638ccfe98fc283e79fbe8ba576194b8b195593787b07de9f` | 相同 | 否 | 是：当前 JSON 采用 sj300-hero-panel-industrial-red-v11-v9plus-red-16x9.webp。 |
| `frontend/assets/img/sj300-official-gallery/01-front.jpg` | `7ce90ce341ad5c0c7e06f5ab69b1e91226e83314f803ab88d7a5a46bbedc9da7` | `frontend/assets/img/sj300-official-gallery/01-front.jpg` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 sj300-dark-studio-gallery v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-official-gallery/02-left-front-half.jpg` | `8cfcc8c68049309860a3e6f34325dcaacc4c1c56a07893ee49bfccce992679ef` | `frontend/assets/img/sj300-official-gallery/02-left-front-half.jpg` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 sj300-dark-studio-gallery v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-official-gallery/03-left-side.jpg` | `cd20d4e34001ded4843eb12ecc49ad4e11a9cdc56087cd999da11a7bfa942fa3` | `frontend/assets/img/sj300-official-gallery/03-left-side.jpg` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 sj300-dark-studio-gallery v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-official-gallery/04-left-rear-half.jpg` | `36f5a761c4eebd7848823f9bcf66e5e9b4ec237691f20b70afad0a8ecb85b1c1` | `frontend/assets/img/sj300-official-gallery/04-left-rear-half.jpg` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 sj300-dark-studio-gallery v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-official-gallery/05-rear.jpg` | `ee2d0afe7295046f1ab68e1a95167f6e2086cda1502fcae258cdce37cdbdfc51` | `frontend/assets/img/sj300-official-gallery/05-rear.jpg` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 sj300-dark-studio-gallery v3-ultrawide 五图。 |
| `frontend/assets/img/sj300-official-highlights/01-xfh300-engine.jpg` | `63b1e0915ee9bab54b226f249ad9daec048fb1aaaabb17bd0072404277144d21` | `frontend/assets/img/sj300-official-highlights/01-xfh300-engine.jpg` | `63b1e0915ee9bab54b226f249ad9daec048fb1aaaabb17bd0072404277144d21` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-official-highlights/02-off-road-suspension-official-v2.jpg` | `c9be15d8e0ca256fb9c548230716aee71254978b0ed227518100a053d1d6e2cd` | `frontend/assets/img/sj300-official-highlights/02-off-road-suspension-official-v2.jpg` | `c9be15d8e0ca256fb9c548230716aee71254978b0ed227518100a053d1d6e2cd` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-official-highlights/02-off-road-suspension.jpg` | `6eba38e868e5eafdfc8a2722b2a2d250a02c73ec0468d6b42891b2e9501d5c35` | `frontend/assets/img/sj300-official-highlights/02-off-road-suspension.jpg` | — | 主项目缺失 | 否 | 是：当前 JSON 采用 02-off-road-suspension-official-v2.jpg。 |
| `frontend/assets/img/sj300-official-highlights/03-rear-wheel-assembly.jpg` | `97e3147d93fd40a45872323a069697ad57facca49950cc1a82d93341bee62778` | `frontend/assets/img/sj300-official-highlights/03-rear-wheel-assembly.jpg` | `97e3147d93fd40a45872323a069697ad57facca49950cc1a82d93341bee62778` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/sj300-official-highlights/04-instrument.jpg` | `9a319a2b98acb2571acddf8905fdda456319d2992f8999a3870f6bd9cb56faed` | `frontend/assets/img/sj300-official-highlights/04-instrument.jpg` | `9a319a2b98acb2571acddf8905fdda456319d2992f8999a3870f6bd9cb56faed` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/js/product-detail.js` | `454ecf47100313332248da53e26732ea3eb8fae83e9d5ab27f2a1e774f2fb98c` | `frontend/assets/js/product-detail.js` | `454ecf47100313332248da53e26732ea3eb8fae83e9d5ab27f2a1e774f2fb98c` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/pages/sj300.html` | `c50eb675c132e16f4e64ee1ecbc162e2c9b240cee08c8bd99307d75ab00f834d` | `frontend/pages/sj300.html` | `95e7c5631c2d43be89cdb0332bb362a6253c0444c7b22d3da79fedae1e21e511` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |
| `frontend/product-detail/README.md` | `87e78ce53007694bf0c3af14b5cc668d1ed2414f5f4c8fc1fb540b4bd3c668bc` | `frontend/product-detail/README.md` | `87e78ce53007694bf0c3af14b5cc668d1ed2414f5f4c8fc1fb540b4bd3c668bc` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/product-detail/data/sj300.json` | `144821b39b2e111e936b5a55b3bbac10219b377b61f63dc8563fa017198dfe5b` | `frontend/product-detail/data/sj300.json` | `06309b4782205306cb4154301b97ad475bc5edda19334d58cd4eca26d3b41675` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |
| `frontend/product-detail/schema.json` | `a936d7a8d4450624c87475bdf8289bc199884daabeea606a959da47899669885` | `frontend/product-detail/schema.json` | `50dfe5ecb417ce19d523a9befcd038ea00ac4d31bb09683779af5322cba09969` | 不同 | 否 | 是：主项目同路径内容已更新。 |
| `frontend/product-detail/template.html` | `6c1cb1a9125d05c469f629e93892891f7f2b0d84b0e7a8e85e66d6ac5c301fef` | `frontend/product-detail/template.html` | `dd847e4131770f437d95d461951ca49e6a34c7f2c6330842a3ebe0152155f18e` | 不同 | 否 | 是：主项目同路径内容已更新。 |
| `scripts/build-product-pages.mjs` | `9f03ea10cc0f9570e58e5d5f0c2d54287cdb980d9b804f53f6bff5ea7ae08fdf` | `scripts/build-product-pages.mjs` | `8870711b027d61d4287a4102a63be0a4572c10d0e0a6bdcd2d25ef34ac1a6ce5` | 不同 | 否 | 是：主项目同路径内容已更新。 |
| `scripts/compare-product-page.mjs` | `b9496039dbbe2e1edcafc1f2f28b5d5bba21b87388527dd1844b57a0a23338fb` | `scripts/compare-product-page.mjs` | `b9496039dbbe2e1edcafc1f2f28b5d5bba21b87388527dd1844b57a0a23338fb` | 相同 | 否 | 未见明确更新版本。 |

### QA / Playwright 等证据汇总

| 旧 worktree 范围 | 文件数 | 旧清单 SHA-256 | 主项目对应范围 | 主项目清单 SHA-256 | 相同/不同/缺失 | 直接引用 |
| --- | ---: | --- | --- | --- | --- | ---: |
| `.playwright-cli/` | 8 | `695dd6c3e79397cc29a117f9ac6ad87f61861b99462929a89a878e4b4aa22f63` | `.playwright-cli/` | —（含缺失） | 0/0/8 | 0 |
| `frontend/assets/img/sj300-dark-studio-gallery/（证据子集）` | 1 | `098f0113ba77e754042ae598f3a101e682875e25d4c179e9cf19a473a477848c` | `frontend/assets/img/sj300-dark-studio-gallery/（证据子集）` | —（含缺失） | 0/0/1 | 0 |
| `frontend/assets/img/sj300-official-highlights/（证据子集）` | 1 | `d81e99b8311cd041127545954aaedfa7de0a9bb63716d45fda59a58e5be3144b` | `frontend/assets/img/sj300-official-highlights/（证据子集）` | —（含缺失） | 0/0/1 | 0 |
| `frontend/assets/img/sj300-validation/` | 18 | `7bdcd9560c6133fae280860314a1d821149aea59f7f37e3848e8bfc09b37025f` | `frontend/assets/img/sj300-validation/` | —（含缺失） | 15/0/3 | 0 |
| `output/playwright/` | 129 | `ae6ad831b12d3fdda012013f648f788b76dbc2d8772b2034d6e2cddd5ca9f2e9` | `output/playwright/` | —（含缺失） | 0/0/129 | 0 |

本 worktree 统计：文件 190；相同 34；不同 6；主项目缺失 150；被主项目直接引用 11。

## F29R（worktree `fa6a`）

### 逐文件明细

| 旧 worktree 相对路径 | 旧 SHA-256 | 主项目对应路径 | 主项目 SHA-256 | 状态 | 直接引用 | 明显更新版本/事实 |
| --- | --- | --- | --- | --- | --- | --- |
| `frontend/assets/img/f29r-gallery/f29r-angle-01-front-ai-v1.png` | `2980ce59d0e3d66148c17cfd15d00b86ede75a107b152d4949c1ab1b290510e3` | `frontend/assets/img/f29r-gallery/f29r-angle-01-front-ai-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-01-front-dark-ai-v2.png` | `73dc6de42ebcfd9e598cdfc31a16f54a862ca02edcfb4f9c7c4055d6510d3bd4` | `frontend/assets/img/f29r-gallery/f29r-angle-01-front-dark-ai-v2.png` | `73dc6de42ebcfd9e598cdfc31a16f54a862ca02edcfb4f9c7c4055d6510d3bd4` | 相同 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-01-front-dark-wide-ai-v3.png` | `e5d7a07178727da14f3eb0b92fcf2a644a8c3acd907711e6c2186c2cc443f48d` | `frontend/assets/img/f29r-gallery/f29r-angle-01-front-dark-wide-ai-v3.png` | `e5d7a07178727da14f3eb0b92fcf2a644a8c3acd907711e6c2186c2cc443f48d` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-02-left-front-half-ai-v1.png` | `9d6211f095c98c344445faf25f0b86801a9e62f46f79de84f9c64e55c30fa151` | `frontend/assets/img/f29r-gallery/f29r-angle-02-left-front-half-ai-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-02-left-front-half-dark-ai-v2.png` | `7a97835efd9b81c0f1b57604745a5d9202223691f6d30e476729379839b3cc3e` | `frontend/assets/img/f29r-gallery/f29r-angle-02-left-front-half-dark-ai-v2.png` | `7a97835efd9b81c0f1b57604745a5d9202223691f6d30e476729379839b3cc3e` | 相同 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-02-left-front-half-dark-wide-ai-v3.png` | `f3bf12167cc237662ff780b750b672427f97d5c28f88a559b81d86aedeab859f` | `frontend/assets/img/f29r-gallery/f29r-angle-02-left-front-half-dark-wide-ai-v3.png` | `f3bf12167cc237662ff780b750b672427f97d5c28f88a559b81d86aedeab859f` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-03-left-dark-ai-v2.png` | `80bf7542886ce4385602f4a1334025d135704f0f578c759458350886726a7a31` | `frontend/assets/img/f29r-gallery/f29r-angle-03-left-dark-ai-v2.png` | `80bf7542886ce4385602f4a1334025d135704f0f578c759458350886726a7a31` | 相同 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-03-left-dark-wide-ai-v3.png` | `d3fa7c70b3c681897111554af4c2cb267bba9284b611c995bf7b2973c4bdf8dd` | `frontend/assets/img/f29r-gallery/f29r-angle-03-left-dark-wide-ai-v3.png` | `d3fa7c70b3c681897111554af4c2cb267bba9284b611c995bf7b2973c4bdf8dd` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-03-left-official.jpg` | `ddb78f4b45bd8f7e26b8653dd610576301265a4e7cf98005562ca95275c395fa` | `frontend/assets/img/f29r-gallery/f29r-angle-03-left-official.jpg` | `ddb78f4b45bd8f7e26b8653dd610576301265a4e7cf98005562ca95275c395fa` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-04-left-rear-half-ai-v1.png` | `183c1df2885b1e6706e05393217e739806aaf9da07bb16ecdb4b9cfbbc9606e3` | `frontend/assets/img/f29r-gallery/f29r-angle-04-left-rear-half-ai-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-04-left-rear-half-dark-ai-v2.png` | `b6981c43dba968034a281f92bf3db7b1a32d2bdea07560eef589e98812925978` | `frontend/assets/img/f29r-gallery/f29r-angle-04-left-rear-half-dark-ai-v2.png` | `b6981c43dba968034a281f92bf3db7b1a32d2bdea07560eef589e98812925978` | 相同 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-04-left-rear-half-dark-wide-ai-v3.png` | `4551b2b431ea723c99d50b622e487e57c0b0170e1d842038b7e60e790b2c05e3` | `frontend/assets/img/f29r-gallery/f29r-angle-04-left-rear-half-dark-wide-ai-v3.png` | `4551b2b431ea723c99d50b622e487e57c0b0170e1d842038b7e60e790b2c05e3` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-05-rear-ai-v1.png` | `663c24df024c6fb81c5e5674f51b12628cf4957db5fc2ef2959aef62a65600be` | `frontend/assets/img/f29r-gallery/f29r-angle-05-rear-ai-v1.png` | — | 主项目缺失 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-05-rear-dark-ai-v2.png` | `13b1d83b86c3fee98e5feb7bfcda48ccfd0f03cf5713601b34d7451e7e0264bd` | `frontend/assets/img/f29r-gallery/f29r-angle-05-rear-dark-ai-v2.png` | `13b1d83b86c3fee98e5feb7bfcda48ccfd0f03cf5713601b34d7451e7e0264bd` | 相同 | 否 | 是：当前 JSON 采用对应 dark-wide-ai-v3 五图。 |
| `frontend/assets/img/f29r-gallery/f29r-angle-05-rear-dark-wide-ai-v3.png` | `b23effb0b81b24b35367321b375f5b425149a9fb850a08cff9035346b09ed08d` | `frontend/assets/img/f29r-gallery/f29r-angle-05-rear-dark-wide-ai-v3.png` | `b23effb0b81b24b35367321b375f5b425149a9fb850a08cff9035346b09ed08d` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/f29r-hero-panel-industrial-red-v11-candidate-v1-master.png` | `a88745e5ac5d7d57dfb50c182a6b8b4cfbfa3a83cb858574b2de46875aa32561` | `frontend/assets/img/f29r-gallery/f29r-hero-panel-industrial-red-v11-candidate-v1-master.png` | `a88745e5ac5d7d57dfb50c182a6b8b4cfbfa3a83cb858574b2de46875aa32561` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/f29r-hero-panel-industrial-red-v11-candidate-v1.webp` | `f098d69e9498ef0c5866d72d491aa667fc100f54be7e172b977df0140bf2a734` | `frontend/assets/img/f29r-gallery/f29r-hero-panel-industrial-red-v11-candidate-v1.webp` | `f098d69e9498ef0c5866d72d491aa667fc100f54be7e172b977df0140bf2a734` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/f29r-hero-panel-red-ai-v1.png` | `0043a356b2d4d97ac3fbb917d1c8caed51b298cec0ea309eb2cb87d291a442fe` | `frontend/assets/img/f29r-gallery/f29r-hero-panel-red-ai-v1.png` | `0043a356b2d4d97ac3fbb917d1c8caed51b298cec0ea309eb2cb87d291a442fe` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-01-battery-bay-dark-ai-v3-master.png` | `657c8025e2e8cda41e25e62ada0989d75fbb4896016439e079ad9b91a89c1881` | `frontend/assets/img/f29r-gallery/feature-01-battery-bay-dark-ai-v3-master.png` | — | 主项目缺失 | 否 | 未见更高版本；当前 JSON 采用同版本 WebP 交付文件。 |
| `frontend/assets/img/f29r-gallery/feature-01-battery-bay-dark-ai-v3.webp` | `43c1ff26ee027912edbf29bb291862c5b3c198e767d43aaa6eeeadee0017e3fa` | `frontend/assets/img/f29r-gallery/feature-01-battery-bay-dark-ai-v3.webp` | `43c1ff26ee027912edbf29bb291862c5b3c198e767d43aaa6eeeadee0017e3fa` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/feature-01-battery-bay-official.jpg` | `8eb42615334a437ee2710996b45c59bab5a4d278e01aa01a895e6052280057f1` | `frontend/assets/img/f29r-gallery/feature-01-battery-bay-official.jpg` | `8eb42615334a437ee2710996b45c59bab5a4d278e01aa01a895e6052280057f1` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-02-pro-offroad-suspension-dark-ai-v2.png` | `dee73ea8082b52cd3aa3a62d8d7227d81d0b90cbd91c606fa4b36681fd04a8cd` | `frontend/assets/img/f29r-gallery/feature-02-pro-offroad-suspension-dark-ai-v2.png` | `dee73ea8082b52cd3aa3a62d8d7227d81d0b90cbd91c606fa4b36681fd04a8cd` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-02-pro-offroad-suspension-dark-ai-v3.webp` | `d494b08771b1dd410212e0e6492477d2b4863d6c1c9068c85d1c612b6d144128` | `frontend/assets/img/f29r-gallery/feature-02-pro-offroad-suspension-dark-ai-v3.webp` | `d494b08771b1dd410212e0e6492477d2b4863d6c1c9068c85d1c612b6d144128` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/feature-02-pro-offroad-suspension-official.jpg` | `ba446e98898c12be68c24a20da787411705d80582a7b7c435b82fdf16f14c6ac` | `frontend/assets/img/f29r-gallery/feature-02-pro-offroad-suspension-official.jpg` | `ba446e98898c12be68c24a20da787411705d80582a7b7c435b82fdf16f14c6ac` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-03-front-led-light-dark-ai-v2.png` | `e8c759de1f41ed1cadd0dbccb367a8f6a71da13b69a088de0cf1bfcc024903a1` | `frontend/assets/img/f29r-gallery/feature-03-front-led-light-dark-ai-v2.png` | `e8c759de1f41ed1cadd0dbccb367a8f6a71da13b69a088de0cf1bfcc024903a1` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-03-front-led-light-dark-ai-v3.webp` | `d7146e93407aefe5a570f7989b162b9ee653eaf70c18254e00f838f0e5d8539d` | `frontend/assets/img/f29r-gallery/feature-03-front-led-light-dark-ai-v3.webp` | `d7146e93407aefe5a570f7989b162b9ee653eaf70c18254e00f838f0e5d8539d` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/feature-03-front-led-light-official.jpg` | `1e8ace01b14d98821aab2ef12017c9c4ae86933b63327f916c00dbbdadc49e11` | `frontend/assets/img/f29r-gallery/feature-03-front-led-light-official.jpg` | `1e8ace01b14d98821aab2ef12017c9c4ae86933b63327f916c00dbbdadc49e11` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-04-gearless-motor-dark-ai-v3-master.png` | `e4ffccc3832cb18b9b26a278b48e5c4efe7c3def1cdccaf515df5b5bc2e60f1c` | `frontend/assets/img/f29r-gallery/feature-04-gearless-motor-dark-ai-v3-master.png` | — | 主项目缺失 | 否 | 未见更高版本；当前 JSON 采用同版本 WebP 交付文件。 |
| `frontend/assets/img/f29r-gallery/feature-04-gearless-motor-dark-ai-v3.webp` | `647fbacca1c07bfa912118ebb7937bfa3ab64683568c7490a8edbc9fea9a9caa` | `frontend/assets/img/f29r-gallery/feature-04-gearless-motor-dark-ai-v3.webp` | `647fbacca1c07bfa912118ebb7937bfa3ab64683568c7490a8edbc9fea9a9caa` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |
| `frontend/assets/img/f29r-gallery/feature-04-gearless-motor-official.jpg` | `f0f734e492b5067d3f3864328097ac2ab4f8c0ce5dacde676d17c4ee247f053d` | `frontend/assets/img/f29r-gallery/feature-04-gearless-motor-official.jpg` | `f0f734e492b5067d3f3864328097ac2ab4f8c0ce5dacde676d17c4ee247f053d` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/f29r-gallery/feature-05-front-wheel-assembly-official.jpg` | `58609088caa387e026f191af6f701c01855f94f8bebd17633706a3bdc5f2276b` | `frontend/assets/img/f29r-gallery/feature-05-front-wheel-assembly-official.jpg` | `58609088caa387e026f191af6f701c01855f94f8bebd17633706a3bdc5f2276b` | 相同 | 否 | 未见明确更新版本。 |
| `frontend/assets/img/product-world-previews/f29r-preview-headlight-v1.png` | `b693fdb446d444b1a7c7b6921c0da1eff612a03660d694757dd0749b1abcd3d8` | `frontend/assets/img/product-world-previews/f29r-preview-headlight-v1.png` | — | 主项目缺失 | 否 | 未见正式更新版本：当前 main.js 无 F29R 预览映射；仍需 A02 决策。 |
| `frontend/pages/f29r.html` | `7a1fe0545232094b002ac4834a528509687ccdc14819170f35b2d8f23a9f152f` | `frontend/pages/f29r.html` | `5ae57781dada5a92a839b4f265411e41a6416d4f722b921ec8ed645b9efc2a7b` | 不同 | 是 | 当前主项目直接采用同路径，但内容已更新。 |
| `frontend/product-detail/data/f29r.json` | `03baa42cc939ad523c920baac53bf5499094aa19e95912a62485aadaf46cf595` | `frontend/product-detail/data/f29r.json` | `03baa42cc939ad523c920baac53bf5499094aa19e95912a62485aadaf46cf595` | 相同 | 是 | 当前主项目直接采用该同路径文件。 |

### QA / Playwright 等证据汇总

| 旧 worktree 范围 | 文件数 | 旧清单 SHA-256 | 主项目对应范围 | 主项目清单 SHA-256 | 相同/不同/缺失 | 直接引用 |
| --- | ---: | --- | --- | --- | --- | ---: |
| `.playwright-cli/` | 2 | `9b5b93b1bb8f39f7b4d0ac3412c1eabff1d34c7f731ad72a7d4af7c56ea6b657` | `.playwright-cli/` | —（含缺失） | 0/0/2 | 0 |
| `frontend/assets/img/f29r-gallery/（证据子集）` | 7 | `39426d98a824647960936b9900a634601e13cb3a39cadc1dabf79023581c7adb` | `frontend/assets/img/f29r-gallery/（证据子集）` | `c185c99e8940312af880086ca118e9f68865de39f605b9fa8428a4b3237191ec` | 5/2/0 | 0 |

本 worktree 统计：文件 43；相同 31；不同 3；主项目缺失 9；被主项目直接引用 12。

## ET：仅主项目遗留资产与历史事实

历史事实：CODEX_HANDOFF.md 记载曾有 ET 独立 worktree，并称其中生成新版 Panel、修改 JSON；但该 worktree 当前不在 git worktree list，无法访问，也不在本报告中填写其文件哈希。主项目当前 et.json 的 panelImage 为空，banner 使用 et-panel-left-front-red-curtain-v13.webp；main.js 没有 ET 专属产品世界预览映射。

| 主项目遗留路径 | SHA-256 | 当前直接引用 | 当前事实 |
| --- | --- | --- | --- |
| `frontend/assets/css/et-preview.css` | `0f2f6e13abde276d60209f6e786b8259fbf4ec2be9f5c3a785149c3e2aa93cd2` | 否 | 遗留专用样式；不在本审计直接引用口径内。 |
| `frontend/assets/img/et-gallery-dark-metal/README.md` | `f8870c31055c7e8d5ed6a246839a0f83e705adb63e267081a75700426cc897be` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-01-front-dark-metal-v2.png` | `e29f213dfb5a2e5f17632303c146dd6fa12ee005e555116f63377197ffad0046` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-01-front-dark-metal-wide-v3.png` | `959266390d7a5c51e5c87177add4f4c37900d2423ed3a8f23742139d95415d53` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-02-left-front-dark-metal-wide-v3.png` | `83bac270aed25f35350759c3760f7a7540ee493a4c2c247d839a1ba31989970b` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-02-left-front-half-dark-metal-v2.png` | `5ac38984f649b57660627661e3e504435953c00df04a6e6c2cf88e042c6f5356` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-03-left-side-dark-metal-v2.png` | `55b980c473af291abc3b60f85dafafcfa5b0919f3907662806a9b8d6811b069f` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-03-left-side-dark-metal-wide-v3.png` | `f5ede7b7231fd29061c246527e41e853d405f26d8c98bc16cde8097933bfb120` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-04-left-rear-dark-metal-wide-v3.png` | `78e6f4a05649a1323ab8d6fc3c264d8cd1ae06730ef088482533835ef495c6ac` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-04-left-rear-half-dark-metal-v2.png` | `db9a72f642397e824ce87d5496d5151b2305a7da50bbaf896af08b3e730bcbbc` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-05-rear-dark-metal-v2.png` | `39f181e0de84220116cd65bd35c57b64d9e565087ccc2c5c483c451c6198e34a` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-angle-05-rear-dark-metal-wide-v3.png` | `c957acc2d85abaf0b178758d1fdf7f4d8c2d22e72dd4f25567a5c32c0bca56c7` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-highlight-head-instrument-dark-metal-v1.png` | `4508104aafab77d7b8a62c2a51503aec83d6033e9fe7a85afec8c04dd149a50c` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-highlight-head-instrument-dark-metal-v1.webp` | `7d072ec8e6e2664d3cfbf40c0819f06841fe32bb6cbf2fbff3b90beba848397f` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-highlight-offroad-suspension-dark-metal-v1.webp` | `630bed37dd97cae4e90d3611f1ce775c38a0418ac0bfde9617e4cdefebc5ee8b` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-curtain-v11.png` | `a79184f3e60bc40945ee858a9e8fdd65244829f7cf81ba49011d734255cc4e7d` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-curtain-v11.webp` | `d8a0a68ad4cfd6618b398fdcdccb6379f2addbccf43702063a55ac8fba8abf0c` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-curtain-v12.png` | `8932000ad3d582c2147a33b1b1226b5aa5875341a6ddacdea19da2d8d41b37ed` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-curtain-v12.webp` | `33e5bbd48b358d99646276dd44f6114adfd247288d1855ce0d1fa100294aa7aa` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-curtain-v13.png` | `98405e6c8dc44be8d3d4c232774ad995813ed6944b4b0064372fa671788207e8` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-curtain-v13.webp` | `f3688a1e2dcdccb0bfb890c51d59a87253b8e55374de76c05e90cf702d0162ac` | 是 | 当前 JSON banner 采用的 Panel。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-smoke-wide-v1.png` | `8e498db522df03bd4d4c2ec3c0f8574bb00af455b6088852b85b232f9b03e08f` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-gallery-dark-metal/et-panel-left-front-red-smoke-wide-v2.png` | `d285b901e10e4558e840b02c9ecf6984d67a3f5d6048cf0025f6befc542c5538` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-highlights/README.md` | `2846efd372f92777b1ba81b91f9a2ea793bbfd50c49b80a513b44caf7ef3531b` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-highlights/et-highlight-aluminum-footpeg-official.jpg` | `b070c115bd3f7c175a99c16b943263c2335637f504bee6c5110f77e7da03dffb` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-highlights/et-highlight-front-wheel-assembly-official.jpg` | `2bce3ae7e877306e78350b8116438bfdd7d99bc6d22f5364a357c12e0e542cc5` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-official-highlights/et-highlight-head-instrument-official.jpg` | `a1cd876d05017182da7b35446be564b3d6879642b54297f3cf00e5f064853ee6` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-highlights/et-highlight-motor-battery-official.jpg` | `87655c224842e3bfd070d798f246390bc27c3c6bd0fe4022bb3c01368507e8a9` | 是 | 当前 JSON 直接采用的图库/亮点资产。 |
| `frontend/assets/img/et-official-highlights/et-highlight-offroad-suspension-official.jpg` | `7ade5d078e49cca92cd961792636c65a951e3ecae17560d7b51c910cfb84c68f` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-reference/et-official-front.jpg` | `a0570293e795ab053cfcb38562444895d45a4db44b4859345db7ae92149df098` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-reference/et-official-left-angle-1.jpg` | `b6affc6d3b9aa663feb0cf3e245f5406f0bb344cc7cd5ba0029d2b0bc229fc0c` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-reference/et-official-left-side.jpg` | `20ac2435604620af3b7510361a0b57a49d4f5d9f79cb43e9ebd57e79feb2afb0` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-reference/et-official-rear.jpg` | `474a68094abc1780c5ebf55c8ca9761dda942238bbde80e6bdecfadb1f568218` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/et-official-reference/et-official-right-side.jpg` | `ca765418827a54ca0af6ecf66df287b84cecb1bf4b4d702e6c227ae5ab9fac92` | 否 | 主项目保留的源图、旧版、master/PNG 或记录文件；当前 JSON/main.js 未直接采用。 |
| `frontend/assets/img/product-world-previews/et-preview-headlight-v1-rejected-42pct.png` | `b02a9c5a2b97f2fc229cb2e3740655483adef2e840f96a9aa728856552dbce6d` | 否 | 旧预览候选；当前 main.js 未接入 ET 预览，其中 rejected 文件名明确标为判退。 |
| `frontend/assets/img/product-world-previews/et-preview-headlight-v1.png` | `f8936b54313c49db8f1535b5cd537304998c31f87aa06ad3e23b03a8ced676af` | 否 | 旧预览候选；当前 main.js 未接入 ET 预览，其中 rejected 文件名明确标为判退。 |
| `frontend/pages/et.html` | `a6c1652236303fa699b70df496a8dbee90135559db5122e4499e6c41ec53cf59` | 是 | 当前公开车型页；由 main.js 车型入口列出。 |
| `frontend/product-detail/data/et.json` | `20eb755dd5b57b3307126bb1c3f42ad4e64c7c3e2ebcdceb740a78ce6aafa0e5` | 是 | 当前车型构建输入。 |

ET 主项目遗留清单共 38 个文件，其中按本报告口径直接引用 12 个。此处不推断已消失 worktree 的内容，也不据此作接收或清理结论。

## 汇总统计

| worktree | 车型 | 文件数 | 相同 | 不同 | 主项目缺失 | 被主项目直接引用 |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 483f | Babey | 42 | 14 | 2 | 26 | 7 |
| 6276 | F4 | 86 | 21 | 3 | 62 | 5 |
| cd27 | SJ300 | 190 | 34 | 6 | 150 | 11 |
| fa6a | F29R | 43 | 31 | 3 | 9 | 12 |
| **合计** | — | **361** | **100** | **14** | **247** | **35** |

统计包含逐文件明细与证据汇总内的全部文件；每个 worktree 均满足“相同 + 不同 + 主项目缺失 = 文件数”。事实性收口：Babey 与 F4 的旧产品世界预览已有主项目正式更新版本；SJ300 与 F29R 的 worktree 预览候选在主项目缺失且当前 main.js 未接入，仍需 A02 决策；ET worktree 当前不存在。
