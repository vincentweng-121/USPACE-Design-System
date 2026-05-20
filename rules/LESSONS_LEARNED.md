# Lessons learned
> 每輪執行前必讀。上限 30 行，超過則將穩定規則移入 SKILL_TEMPLATE.dart。

## 不可違反的規則
- **Sidebar 子項目規則**：Component 頁面若包含多種分類（例如 List Menu / Order History / Payment），**必須**拆成獨立子頁面，在 sidebar 以 `_ExpandableSubGroup` 呈現子項（同 Button 的做法）。路由 ID 格式：`<component>-<variant>`（例如 `list-menu`、`list-order`）。**禁止**將多種分類塞進同一頁。
- 所有 component / style 的 source of truth 為 `styles/` 目錄。
- 所有 hex 值集中在 uspace_palette.dart，不在其他檔案直接寫 hex
- 唯一例外：帶透明度的色票用具名常量，例如 transparentBlack50 = Color(0x80000000)
- 發現 Figma 有新色票時，列出來通知使用者，不自行新增到 palette
- 絕對不碰 AppColorsExtension 和 AppTypographyExtension
- 絕對不碰 typography_extension.dart 的 textColor（等重構再處理）
- 只動 NODES.md 指定的檔案，不自行延伸到其他元件

## 錯誤記錄
<!-- [日期] 問題 → 正確做法 -->
- [2026-05-12] Figma Action 類 token 結構變更：不再區分 Text/Content，統一只有 Content。→ colors extension 的 action token 只保留 Content，不再自行拆分 Text。引用端（button.dart 等）需同步遷移。
- [2026-04-16] component 的 level/variant 名稱≠token 名稱，且同一 level 在不同 size 可能用不同 token（e.g. small/secondary bg = `action/tertiary/bg`，regular/secondary bg = `action/secondary/bg`）。→ 每次實作 component 時，逐一查 Figma 確認每個 level×size×state 套用的 token，不做語意推斷，不確定時必須問使用者。
- [2026-04-17] 透明度色票命名不得含底線，百分比直接拼接。正確：transparentGrey80015，錯誤：transparentGrey800_15
- [2026-04-17] token 前綴命名必須與 Figma JSON 路徑一致，且統一使用單數。正確：borderDivider，錯誤：bordersDivider

## 已淘汰規範
<!-- [日期] 舊規範 → 新規範，移入 CHANGELOG.md DEPRECATED 區塊 -->
- [2026-04-14] fontWeight 必須完全以 JSON 數值為準，不得依語意（heading/body/display）自行判斷。400=regular、500=medium、700=bold，照抄不改。
- [2026-04-15] captionS 和 displayM 的 fontSize：PingFang TC 與 SF Pro 刻意不同。captionS: PingFang=12 / SF=14，displayM: PingFang=18 / SF=20。這是設計意圖，不得統一。
