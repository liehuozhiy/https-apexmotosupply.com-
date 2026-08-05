# P38 结构化数据准备

日期：2026-08-05

## 决策边界

- Google 的商品富结果依赖真实报价、价格或评价数据；本站为 B2B 询价制，当前没有可公开且可验证的价格、库存、评分或评价。
- 本阶段不创建 `Product`、`Offer`、价格、库存、评分或虚构 Logo，避免产生误导数据和富结果必填项错误。
- 首页仅标记页面已公开的组织与站点身份；车型页仅标记与可见分类一致的面包屑路径。

## 实施

- 首页新增一份 JSON-LD `@graph`：
  - `Organization`：名称、站点 URL、公开描述、销售邮箱和电话；
  - `WebSite`：站点名称、URL，并通过 `publisher` 关联组织。
- 产品详情模板新增 `BreadcrumbList` JSON-LD：
  - 电动车型：`Electric Dirt Bikes → 车型名`；
  - 燃油车型：`Gas Dirt Bikes → 车型名`。
- 最末级车型不写 `item`，由搜索引擎使用当前页面 URL；没有改变页面可见布局、车型参数、图库、询盘或多语言逻辑。
- 生成器增加 JSON-LD 解析和内容门禁，避免模板缺失、无效 JSON、车型名错误或层级数量错误。

## 验证

- `node --check scripts/build-product-pages.mjs`：通过。
- F29 目标构建及 BreadcrumbList JSON 解析：通过。
- `node scripts/build-product-pages.mjs --all`：27/27 通过。
- 27 个车型页均恰好包含一份有效 BreadcrumbList，分类 URL 与 `powerType` 一致。
- 首页 Organization/WebSite 两个节点均可由原生 `JSON.parse` 解析。
- 未发现 Product/Offer/价格/库存/评分结构化数据。
- `git diff --check`：通过。

## 发布状态与回退

- 已运行 `node scripts/prepare-deploy.mjs`，部署目录由源码重新生成，共解析并复制 334 个引用图片资源。
- Cloudflare 生产版本：`a8d7421d-936f-40fc-8db3-a0673a113288`。
- 发布后主域名首页的 Organization/WebSite 及 27/27 车型 BreadcrumbList 均返回 HTTP 200、可解析且分类正确；线上未出现 Product/Offer 虚构数据。
- 回退 Cloudflare 时使用上一版本 `9c5aec9e-4348-40b2-84e6-8d0b7073f082`；源码回退时撤销首页 JSON-LD、模板令牌、生成器渲染/门禁和 27 个生成页即可，不涉及 D1、SMTP 或图库资产。

## 依据

- Google Search Central：Organization structured data、Site name/WebSite structured data、Breadcrumb structured data、Product structured data 与通用结构化数据规范。
