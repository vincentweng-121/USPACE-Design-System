# Lessons learned
> 每輪執行前必讀。上限 30 行，超過則將穩定規則移入 SKILL_TEMPLATE.dart。

## 不可違反的規則
- **版號目前為 0.x**：試做階段，`v1.0.0` 保留給第一個完整可用的版本。破壞性變更升 minor（0.3→0.4），其餘升 patch。改版號要同時改 `package.json` 與 `pubspec.yaml`，否則 `check:tokens` 會擋下。
- **不直接推 main**：main 一有 push 就自動部署。一律走分支 → PR → CI 綠 → 合併，分支命名與完整流程見 `rules/GIT_WORKFLOW.md`。
- **提交前跑 `./verify_skill.sh`**：token 同步、`dart analyze --fatal-infos`、`flutter test`、文件站建置四項全綠才提交。規則違反（裸 hex／寫死圓角／間距魔術數字／`FontWeight.wNNN`）由 `test/token_rules_test.dart` 擋下。
- **Token 只改 JSON**：`styles/` 的 6 個 token .dart 與 `website/src/tokens/*.ts` 檔頭標有 `⚠️ GENERATED FILE`，一律不得手改。改 `tokens/*.json` 後執行 `npm run gen:tokens`；CI 會跑 `check:tokens` 擋下漂移。
- **元件頁必須包含九個區塊**，順序固定：Variants → Configurations → Anatomy → Color → States → Measurements → Touch areas → Usage → Accessibility。內容還沒有的用 `PendingImage` 或 `Pending` 佔位，不可整段省略——少一塊讀者不知道是還沒做還是不適用。各頁專屬的補充區塊接在 Accessibility 之後。
- **Configurations 只講配置，畫面必須是黑灰白**：只放結構性的維度（尺寸、有無 icon、有無按鈕）。**任何切換後會渲染出非中性色的維度都要移出**，改在 Color 區塊說明，預覽固定用中性的那一個變體。差異本身就是顏色的維度（Chip 的 level、Toggle 的 value、TextField 的 status）屬於 States 與 Color，不屬於 Configurations。判斷依據是 **token 解出來的 palette 名稱**是否為 grey / white / black / transparent 開頭，不是原始碼裡有沒有寫顏色——顏色多半是預覽元件查 token 得到的，字面上看不到。`npm run check:pages` 會實際推導並擋下。
- **Chip 與 Tab(filter) 的分界**（2026-08-14 使用者確認）：`USpaceChip` 傳 `onTap` 後可點擊，用於**同一個頁面內的篩選條件，可以複選**；`USpaceTab` 的 `filter` type 是**點擊後切換分頁，因此只能單選**。判準是「選完之後還在不在同一頁」。兩者外觀相近，寫文件或選元件時先問這一句。
- **可擺放 icon 的位置一律用虛線方框**：預覽裡凡是由使用者自行傳入、可替換的 icon 或圖形位置（Button 的 leading / trailing icon、Chip 的 leading icon、Tab 的 icon 與 graphic、Modal 的標題 icon 與提示 icon），一律用 `spec.tsx` 的 `<IconPlaceholder size={n} color={c} />`，**不畫任何具體圖示**——畫了星星或驚嘆號，讀者會以為那個圖示是規範的一部分。相對的，元件行為固定的圖示（關閉鈕的 ×、選取的勾、收合的箭頭）要照實畫，那是元件規範本身。頁面不得自行複製一份虛線方框，`npm run check:pages` 會擋下。
- **說明圖一律明暗成對**：Figma artboard 以 `scale: 2` 匯出（960×700），檔名為 `<基底>-light.png` 與 `<基底>-dark.png`，**不做去背**，整張圖直接用。頁面只給基底名稱：`<AnatomyImage image="button-anatomy" />`。少補一版 `npm run check:assets` 會擋下。
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
- [2026-08-04] 被要求「Configurations 拿掉 accent 顏色」時，只在區塊的 JSX 文字裡搜 accent，改掉唯一一處就宣告完成。Chip 的綠色其實是 `<ChipPreview>` 依 level 從 token 查出來的，區塊文字裡一個顏色字都沒有；自己寫的 CI 檢查也沿用同一個錯誤定義，回報「通過」反而增加了誤判的信心。→ 驗證顏色一律推導 token 的實際解值，不看原始碼字面。
- [2026-07-31] 說明圖曾以泛洪去背成透明 PNG，容差稍大就會連 tertiary 的 grey100 底一起挖掉，Modal 的白卡也保不住。→ 已廢除去背規則與 `tools/make-transparent.mjs`，改為明暗兩版整張直出。
- [2026-07-30] 圖片寫成 `/images/x.png` 且大小寫與實際檔名不符，本機正常但上線 404（macOS 檔案系統不分大小寫，看不出來）。→ 圖片一律用 `<AnatomyImage image="…" />`，路徑由元件處理；`npm run check:assets` 會擋下錯誤，已納入 CI。
- [2026-07-28] Figma 的 Button 已改版：Secondary 由實心改為描邊、Tertiary 由漸層邊框改為純文字，且 style 的第五項名為 Tertiary 而非 Customized。→ 元件改版時要逐一讀完所有變體（本次 20 個）再動手，不可假設只是新增屬性。
- [2026-07-28] `styles/` 的 4176 行 Dart 從未被任何工具編譯，改壞了要等工程師貼進 app 才發現。→ 已加 pubspec + CI；元件的 token 對應改由 `tokens/components/*.json` 定義，同時驅動 Flutter 測試與網站規格表，改一邊忘了另一邊會失敗。
- [2026-07-28] website 的 token 是第三份手抄資料，已與 Dart 漂移（borderDivider 停在 grey100，Dart 早已是 transparentGrey8003）。→ Dart 與 website 一律由 tokens/*.json 產生，不再兩邊各自維護。
- [2026-07-28] website 元件頁寫死色碼，導致 6 處與 Dart 不符（Customized 文字色、內嵌按鈕文字、GrabBar、Header 副標、modal blur、chip 漸層角度）。→ 頁面一律引用 `tokens/colors.ts`，且對應的 token 必須逐一查 `styles/*.dart` 該元件實際使用的值，不得由名稱推斷。
- [2026-05-12] Figma Action 類 token 結構變更：不再區分 Text/Content，統一只有 Content。→ colors extension 的 action token 只保留 Content，不再自行拆分 Text。引用端（button.dart 等）需同步遷移。
- [2026-04-16] component 的 level/variant 名稱≠token 名稱，且同一 level 在不同 size 可能用不同 token（e.g. small/secondary bg = `action/tertiary/bg`，regular/secondary bg = `action/secondary/bg`）。→ 每次實作 component 時，逐一查 Figma 確認每個 level×size×state 套用的 token，不做語意推斷，不確定時必須問使用者。
- [2026-04-17] 透明度色票命名不得含底線，百分比直接拼接。正確：transparentGrey80015，錯誤：transparentGrey800_15
- [2026-04-17] token 前綴命名必須與 Figma JSON 路徑一致，且統一使用單數。正確：borderDivider，錯誤：bordersDivider

## 已淘汰規範
<!-- [日期] 舊規範 → 新規範，移入 CHANGELOG.md DEPRECATED 區塊 -->
- [2026-04-14] fontWeight 必須完全以 JSON 數值為準，不得依語意（heading/body/display）自行判斷。400=regular、500=medium、700=bold，照抄不改。
- [2026-04-15] captionS 和 displayM 的 fontSize：PingFang TC 與 SF Pro 刻意不同。captionS: PingFang=12 / SF=14，displayM: PingFang=18 / SF=20。這是設計意圖，不得統一。
