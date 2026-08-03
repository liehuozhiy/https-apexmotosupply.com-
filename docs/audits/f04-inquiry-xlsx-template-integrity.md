# F04 询盘 Excel 模板静态完整性核对

日期：2026-08-02

## 范围

只读检查 `frontend/assets/js/main.js` 内嵌的询盘 Excel 模板和字段替换逻辑；未打开浏览器、未生成下载文件、未修改任何业务代码或资产。

## 结果

| 检查项 | 结果 |
| --- | --- |
| Base64 模板可解码 | 通过，11,328 bytes |
| XLSX ZIP 结构 | 通过，10 个条目；`[Content_Types].xml`、关系文件、`xl/workbook.xml`、`xl/worksheets/sheet1.xml`、`xl/styles.xml` 均存在 |
| 工作表单元格 | 通过，A1、A2、A3、C3、A4、C4、A5、C5、A6、C6、A7、A8、A9、A10 全部存在 |
| 字段替换映射 | 通过，以上 14 个单元格全部由 `replaceXlsxCell` 覆盖 |
| 外部链接 | 通过，未发现 `xl/externalLinks/*` |
| 浏览器生成逻辑 | 通过，使用内置 JSZip 的 `loadAsync` 与 Blob 型 `generateAsync` |
| 语法/空白门禁 | 通过，`node --check frontend/assets/js/main.js`、`git diff --check` 均通过 |

## 结论

内嵌模板和字段映射完整，不存在静态结构缺失。实际浏览器下载触发和提示展示仍由 F03 在允许本地页面访问的浏览器环境中补验。
