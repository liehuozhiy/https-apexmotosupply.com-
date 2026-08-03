# P23 产品世界预览整改批次汇总

日期：2026-08-02

本轮依照“每车型仅一次候选、同时最多一个生成、失败不循环重试”的约束，已完成 P01 登记的 17 款待整改车型的首轮处理。

## 已接入（7）

- Babey+：`babey-plus-preview-headlight-v5.png`
- Bumblebee：`bumblebee-preview-headlight-v5.png`
- ER5：`er5-preview-nolight-v2.png`
- ET 2022：`et-2022-preview-headlight-v3.png`
- S300：`s300-preview-nolight-v2.png`（灯具证据仍 Pending）
- S300R：`s300r-preview-headlight-v2.png`
- SN300：`sn300-preview-nolight-v4.png`

七个映射资产均存在，`main.js` 语法通过，且本地 `http://127.0.0.1:8010/` 的对应资源请求均为 HTTP 200。

## 判退、等待下个资源窗口（10）

- ES11、ET、ET3、ET9、F4+、F29、F29R、H300、SJ250、SJ300。

每项的单次候选路径、哈希、车型身份结论和判退原因见 P09、P10、P12–P17、P20、P21。它们主要未满足统一的车辆位置／前轮落点门禁；F29 另有可读字样问题。所有判退候选均未复制到项目，也没有修改对应映射。

## 结论

本批次的已接入资产可继续本地验收。十项判退项不是“未处理”，而是受“不得循环重试”规则约束的待重制队列；在生成资源恢复并启动新的独立批次前保持当前映射。
