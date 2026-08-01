# B08 P1 车型生成验证报告

- 日期：2026-08-01（Asia/Shanghai）
- 范围：仅 SY300、HS85、SJ250、S300R 的生成页同步与只读验证
- 结论：通过
- 写入边界：仅四个目标 HTML 与本报告；未修改车型 JSON、审计索引、模板、生成器、共享 CSS/JS、图片、工作簿、`deploy/`、交接或任务文件。

## 执行命令与结果

1. 完整读取 `AGENTS.md`、根 `CODEX.md`、`frontend/CODEX.md`、`CODEX_HANDOFF.md`、`TASKS.md`、`frontend/product-detail/README.md`、`frontend/product-detail/schema.json`、`scripts/build-product-pages.mjs`。
2. 用 `Get-FileHash -Algorithm SHA256` 记录 `frontend/product-detail/data/*.json` 对应 27 个车型页的构建前哈希；构建前未发现运行中的 `build-product-pages.mjs` 进程。
3. 首次定向构建：

   ```powershell
   node scripts/build-product-pages.mjs sy300 hs85 sj250 s300r
   ```

   结果：四页全部成功生成，退出码 0。

4. 使用 UTF-8 Node 内联只读检查器反解析四页的嵌入 i18n、图库、Panel、亮点、统计/卖点数量、B07 参数、标签闭合、资源存在性、模板标记与脚本/样式引用。第一次尝试因 PowerShell 管道默认编码把中文正则转换为问号，在检查执行前发生正则语法错误；未写文件。显式设置 UTF-8 后重跑，四页全部通过。
5. 第二次执行相同定向构建，四页全部成功；第二次 SHA-256 与第一次逐页一致，幂等通过。
6. 语法检查均退出码 0：

   ```powershell
   node --check scripts/build-product-pages.mjs
   node --check frontend/assets/js/product-detail.js
   node --check frontend/assets/js/i18n.js
   node --check frontend/assets/js/main.js
   node --check frontend/assets/js/site-data.js
   node --check frontend/assets/js/ga4.js
   node --check frontend/assets/js/analytics-config.js
   node --check frontend/assets/js/analytics.js
   ```

7. `git diff --check`：退出码 0，无空白错误。

## 页面哈希前后对照

四个目标页均发生预期变化；另外 23 个车型页前后哈希完全一致。目标页首轮与第二轮构建哈希相同。

| 车型 | 范围 | 构建前 SHA-256 | 最终 SHA-256 | 结果 |
| --- | --- | --- | --- | --- |
| babey | 其他 | `0388c3b897f456cf1ba49ee48797a3c0658a2b908ca397df78d40aacc78194d4` | `0388c3b897f456cf1ba49ee48797a3c0658a2b908ca397df78d40aacc78194d4` | 未变 |
| babey-plus | 其他 | `443226989a2bda871c474d938b69b68e577c9ff2601525c6e1ddd4ff69f23070` | `443226989a2bda871c474d938b69b68e577c9ff2601525c6e1ddd4ff69f23070` | 未变 |
| bumblebee | 其他 | `3432e2ea3379253e62994e812e56655a4037d47794339b1025fd32746845f5dd` | `3432e2ea3379253e62994e812e56655a4037d47794339b1025fd32746845f5dd` | 未变 |
| er3 | 其他 | `47bca8c13d0443d2872273ea3a777b49e397c72a2e2da9dd14528b2f38d4db3d` | `47bca8c13d0443d2872273ea3a777b49e397c72a2e2da9dd14528b2f38d4db3d` | 未变 |
| er5 | 其他 | `937f6d5e9f2baefd059f8f7fce1af657344b3a8ca917dc02b67003a8aa9e8411` | `937f6d5e9f2baefd059f8f7fce1af657344b3a8ca917dc02b67003a8aa9e8411` | 未变 |
| er7 | 其他 | `4b5e44de6f1fdd2654870329f3de1f233aa05bf1f86b879c017b204b5b9fdeeb` | `4b5e44de6f1fdd2654870329f3de1f233aa05bf1f86b879c017b204b5b9fdeeb` | 未变 |
| es11 | 其他 | `10f67b374489c12e45a4796f67c8a46517343f1b6a6c310a069331a39966f76a` | `10f67b374489c12e45a4796f67c8a46517343f1b6a6c310a069331a39966f76a` | 未变 |
| et | 其他 | `a6c1652236303fa699b70df496a8dbee90135559db5122e4499e6c41ec53cf59` | `a6c1652236303fa699b70df496a8dbee90135559db5122e4499e6c41ec53cf59` | 未变 |
| et-2022 | 其他 | `4a8d6bbfaece3d6285e1f406b22c057e2e1452685e19c24d3de6edb54a88d32f` | `4a8d6bbfaece3d6285e1f406b22c057e2e1452685e19c24d3de6edb54a88d32f` | 未变 |
| et-2024 | 其他 | `2929400e39a7cf0c6e23d6a40294c529908512ff3cfb73faceb0a6ae3248f5e5` | `2929400e39a7cf0c6e23d6a40294c529908512ff3cfb73faceb0a6ae3248f5e5` | 未变 |
| et3 | 其他 | `64f777db1a352d40e2c557f2fab2592a78d16d50b13a96711e515739a3597e2e` | `64f777db1a352d40e2c557f2fab2592a78d16d50b13a96711e515739a3597e2e` | 未变 |
| et5 | 其他 | `f88218fe389dbd1f1d58c341016e7912396f306c9656cf447d6d050d31b865ee` | `f88218fe389dbd1f1d58c341016e7912396f306c9656cf447d6d050d31b865ee` | 未变 |
| et7 | 其他 | `ef38f78594a643a2ba7194c2f828005c21645d5409b42a39d1e50aa73fa5e793` | `ef38f78594a643a2ba7194c2f828005c21645d5409b42a39d1e50aa73fa5e793` | 未变 |
| et9 | 其他 | `b1a02d7e2ccc4bbc454ffa3c2e30e61ab410432329359177f684f6faeaf8e1f4` | `b1a02d7e2ccc4bbc454ffa3c2e30e61ab410432329359177f684f6faeaf8e1f4` | 未变 |
| f29 | 其他 | `2e2b51e166e1654defa21f89d930f7a6fda49191c726fb51aa660dbab79e4493` | `2e2b51e166e1654defa21f89d930f7a6fda49191c726fb51aa660dbab79e4493` | 未变 |
| f29r | 其他 | `5ae57781dada5a92a839b4f265411e41a6416d4f722b921ec8ed645b9efc2a7b` | `5ae57781dada5a92a839b4f265411e41a6416d4f722b921ec8ed645b9efc2a7b` | 未变 |
| f4 | 其他 | `48011dccac8b12d6a3ce1b1e88262e1b95bc012edfd3632f45bb5798a9398880` | `48011dccac8b12d6a3ce1b1e88262e1b95bc012edfd3632f45bb5798a9398880` | 未变 |
| f4-plus | 其他 | `695171453fb4ec6ec99f957decbc1314a6dc94f6744fae28fdeb7c5b6b540b95` | `695171453fb4ec6ec99f957decbc1314a6dc94f6744fae28fdeb7c5b6b540b95` | 未变 |
| f9 | 其他 | `c54f9dd5a6f7681c8ba7c7f5d614aa586001b0a3287ddc1ac1fb2b5335390006` | `c54f9dd5a6f7681c8ba7c7f5d614aa586001b0a3287ddc1ac1fb2b5335390006` | 未变 |
| h300 | 其他 | `46c20465ddbd105d533604e07dd2655c11d87374b24ccf34fc70cf72457d678e` | `46c20465ddbd105d533604e07dd2655c11d87374b24ccf34fc70cf72457d678e` | 未变 |
| hs85 | 目标 | `24282ca2276207620a6b95e8e233fb4e44d1816ebf9122c1db837752757459fd` | `ec0111c7f50d570e619fe2940d443c5202dfa8e829b8e4a6a8f8828763dcd4da` | 变化 |
| s300 | 其他 | `943ec58a622193cab927cd7c6594b06bd14c587d2d86b393b717b576b08866a5` | `943ec58a622193cab927cd7c6594b06bd14c587d2d86b393b717b576b08866a5` | 未变 |
| s300r | 目标 | `33dc717fe6cd9b34c75d3a6a8285ef848cb92ee8a44513216886a86a658f8a3a` | `471785cbfb647751dd88085fc3b5442b335a433b5f70f93bb397f842b7f085b5` | 变化 |
| sj250 | 目标 | `652984620cb8fc65c54d70d0a8f1b8cee845446ee6b43102dc2325e0f71d2661` | `05999a32a62bae8f5c4cbaaa61e437050fc2b5426e16362ecf815e554ea71a34` | 变化 |
| sj300 | 其他 | `95e7c5631c2d43be89cdb0332bb362a6253c0444c7b22d3da79fedae1e21e511` | `95e7c5631c2d43be89cdb0332bb362a6253c0444c7b22d3da79fedae1e21e511` | 未变 |
| sn300 | 其他 | `62c4d22d03e9d323f727a629b8b9ac35fafc7bd8c03ef4c1da32188a67b66b14` | `62c4d22d03e9d323f727a629b8b9ac35fafc7bd8c03ef4c1da32188a67b66b14` | 未变 |
| sy300 | 目标 | `a3ba0a7129241d80b7049bd599f2231f56a2854a3605818bfdb5d93f9263e340` | `f9ca71f357db4c2278145639648313b585da28a4bb4fe996ef1d2ec117cc5524` | 变化 |

目标页文件长度由构建前到最终分别为：

- SY300：72,087 → 71,668 bytes
- HS85：81,314 → 81,742 bytes
- SJ250：97,363 → 97,537 bytes
- S300R：67,485 → 75,205 bytes

## 四车型逐项验证

### SY300

- 生成：通过；最终 SHA-256 `f9ca71f357db4c2278145639648313b585da28a4bb4fe996ef1d2ec117cc5524`。
- B07 参数：JSON 与生成 HTML 均为“灯光 = 标配无灯，可选装灯具”。
- 七语言：`en`、`zh-CN`、`zh-TW`、`ru`、`ar`、`es`、`pt` 每种均嵌入 125 个同键、非空翻译项。
- 结构数量：5 图库、4 统计、4 卖点、4 亮点；未替换占位符 0。
- 图片：页面反解析得到 10 个要求引用（5 图库 + 1 Panel + 4 亮点），10/10 文件存在。
  - 图库：`sy300-angle-01-front-wide-v3.png`、`sy300-angle-02-left-front-34-wide-v3.png`、`sy300-angle-03-left-side-wide-v3.png`、`sy300-angle-04-left-rear-34-wide-v3.png`、`sy300-angle-05-rear-wide-v3.png`。
  - Panel：`sy300-panel-center-red-dark-v4-web.webp`。
  - 亮点：`01-ybs300-engine-ai-v1.png`、`03-front-fork-dark-studio-v1.png`、`04-headlight-dark-studio-v1.png`、`04-alloy-footpeg-dark-studio-v1.png`。

### HS85

- 生成：通过；最终 SHA-256 `ec0111c7f50d570e619fe2940d443c5202dfa8e829b8e4a6a8f8828763dcd4da`。
- B07 参数：
  - 燃油类型 = `预混燃油：95# 汽油 + 进口 Maxima 2T 赛用机油，汽油:机油 = 40:1`。
  - 第四统计 = `整备质量 69 kg`；技术参数也为 `整备质量 = 69 kg`。
- 七语言：七种语言每种均嵌入 127 个同键、非空翻译项。
- 结构数量：5 图库、4 统计、4 卖点、4 亮点；未替换占位符 0。
- 图片：10/10 要求引用存在。
  - 图库：`01-front-ai-dark-wide-v2.png`、`02-left-front-half-ai-dark-wide-v2.png`、`03-left-side-ai-dark-wide-v2.png`、`04-left-rear-half-ai-dark-wide-v2.png`、`05-rear-ai-dark-wide-v2.png`。
  - Panel：`hs85-panel-sj300-v11-center-red-v7-web.webp`。
  - 亮点：`01-two-stroke-engine-ai-dark-v1.png`、`02-off-road-suspension-ai-dark-v1.png`、`03-front-brake-disc-ai-dark-v1.png`、`04-alloy-footpeg-ai-dark-v1.png`。

### SJ250

- 生成：通过；最终 SHA-256 `05999a32a62bae8f5c4cbaaa61e437050fc2b5426e16362ecf815e554ea71a34`。
- B07 参数：JSON 与生成 HTML 均为 `Endurance = 100 km at ≤ 50 km/h`。
- 七语言：七种语言每种均嵌入 194 个同键、非空翻译项。
- 结构数量：5 图库、4 统计、4 卖点、4 亮点；未替换占位符 0。
- 图片：10/10 要求引用存在。
  - 图库：`sj250-angle-01-front-dark-ultrawide-v4.png`、`sj250-angle-02-left-front-half-dark-ultrawide-v4.png`、`sj250-angle-03-left-dark-ultrawide-v4.png`、`sj250-angle-04-left-rear-half-dark-ultrawide-v4.png`、`sj250-angle-05-rear-dark-ultrawide-v4.png`。
  - Panel：`sj250-hero-panel-industrial-red-v11-v2.webp`。
  - 亮点：`sj250-highlight-01-engine-power-dark-v4.png`、`sj250-highlight-02-front-fork-dark-v4.png`、`sj250-highlight-03-rear-drivetrain-dark-v4.png`、`sj250-highlight-04-fuel-tank-dark-v4.png`。

### S300R

- 生成：通过；最终 SHA-256 `471785cbfb647751dd88085fc3b5442b335a433b5f70f93bb397f842b7f085b5`。
- B07 参数逐项通过：
  - Wheelbase = `1470 mm`
  - Ground clearance = `280 mm`
  - Seat height = `940 mm`
  - 第四统计及技术参数 Kerb weight = `110 kg`
  - Transmission = `Chain drive 520 / 110L / 42T`
  - Light = `LED`
  - Endurance = `220 km at ≤50 km/h`
  - Engine type = `XFH300 two-stroke`
- 七语言：七种语言每种均嵌入 150 个同键、非空翻译项。
- 结构数量：5 图库、4 统计、4 卖点、4 亮点；未替换占位符 0。
- 图片：10/10 要求引用存在。
  - 图库：`s300r-front-dark-industrial-wide-v3.png`、`s300r-left-front-dark-industrial-wide-v3.png`、`s300r-left-side-dark-industrial-wide-v3.png`、`s300r-left-rear-dark-industrial-wide-v3.png`、`s300r-rear-dark-industrial-wide-v3.png`。
  - Panel：`s300r-panel-left-front-red-v2-master.webp`。
  - 亮点：`s300r-engine-highlight-dark-v1.png`、`s300r-fork-highlight-dark-v1.png`、`s300r-headlight-highlight-dark-v1.png`、`s300r-footpeg-highlight-dark-v1.png`。

## 七语言、RTL 与模板检查

- 四页嵌入的语言集合及顺序均严格为 `en, zh-CN, zh-TW, ru, ar, es, pt`。
- 每页七个翻译映射的键集合完全一致、值均为非空字符串，Arabic 映射包含阿拉伯文字。
- 页面保持模板的 `lang="en"` 初始结构并加载 `i18n.js` 与 `product-detail.js`；两段现有运行时代码均在 Arabic 时设置 `dir="rtl"`，图库 HTML 顺序仍固定为 front、left-front、left-side、left-rear、rear，没有生成时重排。
- 四页均含有效 doctype、`html/head/body/main` 基础结构及闭合标签；生成标记存在；未解析模板占位符为 0；明显乱码/替换字符扫描为 0。
- 每页所需 2 个样式引用和 7 个页面脚本引用均存在，包括 `styles.css`、`product-detail.css`、`ga4.js`、`site-data.js`、`i18n.js`、`main.js`、`analytics-config.js`、`analytics.js`、`product-detail.js`。

## 限制

- 本任务是 B08 生成同步与静态构建验证，没有修改 UI 模板、CSS、JS 或图片，因此未另启 HTTP 服务或浏览器矩阵，也未做像素级目视验收；本报告对图片的结论限定为页面引用可解析、顺序正确且目标文件存在。
- 未运行 `--all`，因为任务明确要求只一次性构建四个目标车型，且必须证明其他车型页不被写入；通过 27 页构建前后哈希对照完成该证明。
- 工作区原本包含大量其他任务的修改和未跟踪文件；本任务没有暂存、提交、推送、回退、清理或部署。
