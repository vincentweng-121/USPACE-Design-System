# Changelog
> 審核通過後由使用者手動搬入。前端工程師以此為準。
> 版號規則（2026-07-29 起）：
>   目前全部為 0.x.y — 試做階段，介面與 token 仍可能變動。
>   **v1.0.0 保留給第一個完整可用的版本**，尚未發布。
>   0.x 的 x：破壞性變更（API 更名、元件改版）
>   0.x 的 y：新增或修正 token、新增元件、修 bug
>
> 註：2026-07-29 之前的版號原為 1.x / 2.x / 3.x，
> 因當時尚在試做，已統一重新編為 0.x。舊號與新號對照見下方 Deprecated 區塊。

---

## v0.7.6 | 2026-08-13

### 文件站 | Chip 頁改用 Button 頁的呈現邏輯，Accessibility 納入必要區塊
狀態：PUBLISHED

- Chip 頁全面對齊 Button 頁：Hero 補上來源與 Figma node、Variants 補四個 level 的
  逐項說明、Anatomy 補部件表、Color 改用 Swatch 表並改由 `chip.json` 產生、
  States 改為與 Button 同格式的表、Measurements 改用 `SpecTable` 且數值改讀
  `chip.json` 的 layout、Develop 分頁補上 Examples 與 API，Baseline tokens 由手抄
  改為從 variants 產生。此前 Develop 分頁的 token 表與 Measurements 的數值都是手抄，
  與 `chip.json`、`chip.dart` 各自為政，已是第三份副本。
- Configurations 的規則不變且已由 `check:pages` 把關：只呈現 size 與元素配置，
  level 因為差異就是顏色（accent 為螢光綠、outline 為品牌漸層）而不列入，
  預覽固定用中性的 secondary。
- `tokens/components/chip.json` 新增 `layout` 與 `size` 維度，數值照抄
  `styles/chip.dart` 的 `_padding`，讓文件站不再手抄尺寸。
- 元件頁的必要區塊由八個改為九個，新增 Accessibility。其餘八頁先以 `Pending`
  佔位，`check:pages` 同步更新。
- 修正 Outline 漸層的文件錯誤：`chip.dart` 註解與文件站原本寫
  neonLime200 → neonLime800，實作與 `gradients.json` 的 `limeLinear` 都是
  neonLime200 → neonLime700。

## v0.7.5 | 2026-08-04

### 文件站 | 移除 Tokens & specs，Changelog 與 Status 改讀原始檔
狀態：PUBLISHED

- 全站移除 Tokens & specs 區塊。Button 頁的內容大多與 Measurements 重複，
  唯一不重複的「文字 token」與「與 Figma 標示不同的原因」已移入 Measurements。
  元件頁的必要區塊由九個改為八個，`check:pages` 同步更新。
- Changelog 與 Status 頁原本把 markdown 的內容手抄成 tsx 陣列，
  分別停在 v0.2.10 與 2026-04，實際版號已到 v0.7.x。改為直接讀
  `tracking/CHANGELOG.md` 與 `tracking/SKILL_STATUS.md`，新增極簡
  Markdown 渲染元件，不再有副本。
- 新增 `check:changelog`：升了版號卻沒寫變更紀錄會被擋下。
- CHANGELOG_DRAFT.md 裡 18 筆已標 PUBLISHED 的條目搬入 CHANGELOG.md。

## v0.7.4 | 2026-08-04

### 文件站 | Configurations 改以渲染結果判定中性
狀態：PUBLISHED

先前只在 Configurations 區塊的 JSX 文字裡搜尋 accent，改掉一處就宣告完成；
但顏色多半是預覽元件查 token 得到的，字面上看不到。改為推導 token 的實際
解值（palette 名稱是否為 grey / white / black / transparent 開頭）。

- Chip：level 移出 Configurations（Accent 是 neonLime600、Outline 是漸層），預覽固定 Secondary
- Toggle：value 移出（ON 的軌道是 neonLime600），預覽固定 OFF
- TextField / TextArea：status 移出——它是狀態不是配置，且 active/typing 是綠邊框、
  error 是紅邊框。Configurations 改放 Label / Hint text / Trailing button
- 新增 `check:pages`：擋下缺區塊、順序錯、Configurations 渲染出非中性色

## v0.7.3 | 2026-08-04

### 文件站 | Tab Bar 與 Bottom Bar 分開
狀態：PUBLISHED

兩者用途不同：Tab Bar 是底部導航列，Bottom Bar 是頁面關鍵按鈕組成的動作列。
先前錯誤地把 roadmap 的「底部導航（tab Bar）」對應到 Bottom Bar。新增 Tab Bar
頁面與路由，Bottom Bar 的關鍵字改回自身語意。

## v0.7.2 | 2026-08-04

### 文件站 | 依 roadmap 補齊 Components 選單
狀態：PUBLISHED

新增 13 個 soon 元件（Action Area、Avatar、Card、Category、Checkbox、
Icon Button、Menu、Pagination、Progress Indicator、Radio、Skeleton、
Thumbnail、Toast）。Coming soon 頁改為顯示該元件在 roadmap 的三個階段日期。

## v0.7.1 | 2026-08-04

### 文件站 | 新增元件設計進度甘特圖
狀態：PUBLISHED

新增 Roadmap 頁（`/help/roadmap`），資料在 `website/src/data/roadmap.json`。
24 個項目、9 個週次，每個項目分樣式 / 內容 / 完稿三階段，狀態由 done 推導。

## v0.7.0 | 2026-08-04

### 2026-08-04 | 文件站 | Button 頁的結構複用到其餘元件頁（v0.7.0）
狀態：PUBLISHED

僅影響文件站，`styles/` 與 token 未變動。

#### 共用元件（website/src/components/spec.tsx）
| 元件 | 用途 |
|------|------|
| `Playground` | 左側即時預覽 + 右側 radio 控制卡，資料驅動 |
| `dimensionsOf` | 把 token JSON 的 `dimensions` 直接轉成控制卡的維度 |
| `NumberedCaptions` | 圖片下方對應標號的說明列表 |
| `PendingImage` | 與 `AnatomyImage` 同尺寸的佔位框，直接寫出還缺哪兩個檔案 |

Button 頁原本各自實作的 `Playground` / `ControlGroup` / `NumberedCaptions`
已移除，改用共用版本，行為不變。

#### 元件頁結構統一
9 個元件頁補上 Button 頁的區塊順序：
Variants → Configurations → Anatomy → Color → States → Measurements →
Touch areas → Usage →（各頁專屬區塊）

- **Configurations 改為互動式**：8 頁的靜態 `SpecimenRow` 換成 `Playground`，
  維度取自各元件的 token JSON。List 頁的 Configurations 是手工組的複合示意，
  沒有可參數化的預覽元件，維持原樣。
- **Variants / Touch areas**：新區塊，內容待補
- **Measurements**：補上量測圖的位置，說明表格不動
- **Usage**：補上 Do/Don't 圖例的待補標記

#### 待補清單
每頁三張說明圖，9 頁共 27 組（54 個檔案）：
`<slug>-variant`、`<slug>-measurements`、`<slug>-toucharea`，
各需 `-light.png` 與 `-dark.png`。Figma artboard 480×350，scale 2 匯出成 960×700。

另有 9 頁的 Do/Don't 圖例待補（`<slug>-do-caseN` / `<slug>-dont-caseN`）。

Anatomy 維持各頁既有的程式繪製圖——那是可用的內容，不是缺口，
等對應的 Figma artboard 產出後再換成圖片。

## v0.6.1 | 2026-07-31

### 2026-07-31 | 文件站 | 說明圖改為明暗雙版，並清理冗餘程式碼（v0.6.1）
狀態：PUBLISHED

僅影響文件站，`styles/` 與 token 未變動。

#### 說明圖規則變更
| 項目 | 舊 | 新 |
|------|----|----|
| 透明度 | 泛洪去背成透明 PNG | **取消**，整張圖直出 |
| 檔名 | `button-anatomy.png` | `button-anatomy-light.png` / `-dark.png` |
| 呼叫端 | `<AnatomyImage file="button-anatomy.png" />` | `<AnatomyImage image="button-anatomy" />` |
| 解析度 | `scale: 2`，960×700 | 不變 |
| 版面 | 容器固定高 400、圖片 480 CSS px 置中 | 不變 |

去背規則廢除的原因：容差稍大會把 tertiary 的 grey100 底一起挖掉，
容差稍小又留下白邊；Modal 類的圖更是無法分離。`tools/make-transparent.mjs`
已刪除。

新增 `ThemedImage`，同時渲染明暗兩張，由 CSS 依 `data-theme` 切換。
不用 `prefers-color-scheme`，因為站台主題可手動切換，媒體查詢不會跟著切。

`check:assets` 增加第三類檢查：基底名稱必須同時存在 `-light` 與 `-dark`，
只補一半會被擋下（已實測）。

#### 內容
- Usage 的 Do/Don't 從 1 組擴充為 3 組（權重、icon 單雙側、icon 是否配文字）
- Configurations 的 Icon option 移除 Both，只保留 None / Leading / Trailing
- 相關文案同步：hero、Anatomy 表的 Trailing icon 說明、Develop 範例

#### 清理
| 項目 | 說明 |
|------|------|
| `components/Controls.tsx` | Playground 控制項的舊版（分段按鈕），已被 radio 版取代，無人引用 |
| `pages/ComponentsPage.tsx` 等 3 個 | 索引頁，App.tsx 早已改為 `Navigate` 轉址，內容也已過時 |
| `tokens/util.ts` | 僅 ComponentsPage 使用，隨之成為孤兒 |
| `utils.ts` 的 `asOptions` | 從未被使用 |
| ButtonPage 的 `colorOf` / `cap` | 與 `utils.ts` 重複定義，改為引用共用版本 |

共移除 6 個檔案。盤點確認：無未使用的 CSS class、無未使用的 export、
無未被引用的檔案。

## v0.6.0 | 2026-07-31

### 2026-07-31 | button.dart | style 更名為 level（v0.6.0）
狀態：PUBLISHED
⚠️ BREAKING CHANGE — 所有 USpaceButton 呼叫端都要改

原因：這個維度表達的是行動權重的層級，不是視覺樣式。文件站的
Configurations 面板已改稱 Level，程式端一併對齊，避免設計與工程
講兩個名字。

#### API 變更
| 舊 | 新 |
|----|----|
| `USpaceButtonStyle` | `USpaceButtonLevel` |
| `style:` | `level:` |
| `USpaceListItem(buttonStyle:)` | `USpaceListItem(buttonLevel:)` |

`tokens/components/button.json` 的維度與 variants 也由 `style` 改為 `level`，
文件站的 Baseline tokens 表頭同步改為 Level。

#### 呼叫端遷移
```dart
// 舊
USpaceButton(label: '確認', style: USpaceButtonStyle.primary)
// 新
USpaceButton(label: '確認', level: USpaceButtonLevel.primary)
```

sed 可一次處理：
```bash
sed -i '' 's/USpaceButtonStyle/USpaceButtonLevel/g; s/\bstyle: USpaceButtonLevel/level: USpaceButtonLevel/g' <檔案>
```

#### 沒有變的
token 值、視覺、emphasis 機制、size 與 state 都不受影響。這是純更名。

#### 注意
2026-07-28 曾把 `USpaceButtonLevel` 改名為 `USpaceButtonStyle`，這次改回。
前端在三天內要改兩次同一個識別字，已向使用者說明後由其確認執行。

## v0.5.0 | 2026-07-31

### 2026-07-31 | button.dart | Secondary 與 Tertiary 改為實心底色（v0.5.0）
狀態：PUBLISHED
⚠️ BREAKING CHANGE — 視覺改版，前端不需改 API

來源：Figma node 52:3325（Secondary）與 1739:16858（Tertiary），2026-07-31 讀取。

#### 視覺改版
| style | 舊 | 新 |
|-------|----|----|
| Secondary | 透明底 + 2px 描邊 | 實心 `actionSecondaryBg`（grey300 `#B4B4B4`） |
| Tertiary | 純文字，無底色無描邊 | 實心 `actionTertiaryBg`（grey100 `#EEEEEE`） |

三個層級現在都是實心底色，**button 已無任何 style 使用描邊**。
`_borderColor()` 與 `_borderWidth` 隨之移除。

#### Token
未新增任何 token。Figma 的 `Action/Secondary/Bg` `#b4b4b4` 與
`Action/Tertiary/Bg` `#eeeeee` 對應到語意層既有的 `actionSecondaryBg`
（grey300）與 `actionTertiaryBg`（grey100），值完全吻合。這兩個 token
在 2026-07-28 改版後就沒有元件使用，這次接回。

文字色不變：secondary 與 tertiary 皆為 `#323237` = grey800，
與既有的 `actionSecondaryContent` / `actionTertiaryContent` 一致。

#### 需要注意
- **Secondary / Tertiary 的 disabled 在 Figma 無對應 node。** 既然兩者已改
  實心，沿用文件既有的「disabled 時所有 style 收斂為同一組配色」規則，
  套 `actionDisabledBg` + `actionDisabledContent`。待 Figma 補規格後核對。
- **暗色主題的階層會塌掉。** `actionSecondaryBg` 與 `actionTertiaryBg`
  的 dark 值都是 grey800，兩者背景完全相同；而 `actionPrimaryBg` 的
  dark 值是 grey700，比它們更淺，權重由深到淺的關係在暗色下反轉。
  另外 tertiary 暗色的文字（grey600 `#777777`）對 grey800 底的對比約
  2.9:1，低於 WCAG AA 的 4.5:1。這三個 dark 值都是既有 token，
  未取得 Figma 暗色規格前不自行更動。

## v0.4.0 | 2026-07-31

### 2026-07-31 | button.dart | style 收斂為三個權重層級（v0.4.0）
狀態：PUBLISHED
⚠️ BREAKING CHANGE — 使用 accent / charging 的呼叫端需調整

原因：`accent`、`charging`、`primary` 三者的容器底色完全相同（皆為
`actionPrimaryBg`），差別只在文字色。把它們並列為 style 會讓「行動權重」
這個語意被稀釋成五個選項，實際上只有三個層級。

#### API 變更
| 舊 | 新 |
|----|----|
| `USpaceButtonStyle.accent` | `style: primary` + `emphasis: accent` |
| `USpaceButtonStyle.charging` | `style: primary` + `emphasis: charging` |
| `style` 預設值 `accent` | `style` 預設值 `primary` |
| （無） | `emphasis: USpaceButtonEmphasis`，預設 `none` |

`USpaceButtonStyle` 現為 `primary` / `secondary` / `tertiary`。
新增 `USpaceButtonEmphasis`：`none` / `accent` / `charging`。

`emphasis` 只對 `primary` 的 enabled 狀態生效；secondary、tertiary
與所有 disabled 狀態一律忽略，已加測試斷言不會外溢。

#### Token 對應
沒有任何 token 值改變，只是重新歸類：

| style | emphasis | enabled | disabled |
|-------|----------|---------|----------|
| primary | none | actionPrimaryBg / actionPrimaryContent | actionDisabledBg / actionDisabledContent |
| primary | accent | actionPrimaryBg / actionPrimaryContentAccent | 同上 |
| primary | charging | actionPrimaryBg / actionPrimaryContentCharging | 同上 |
| secondary | none | 透明 + 2px 描邊 actionSecondaryContent | 透明 + actionDisabledBg 描邊 |
| tertiary | none | 透明 / actionTertiaryContent | 透明 / actionDisabledContent |

#### 呼叫端遷移
```dart
// 舊
USpaceButton(label: '確認', style: USpaceButtonStyle.accent)
// 新
USpaceButton(
  label: '確認',
  style: USpaceButtonStyle.primary,
  emphasis: USpaceButtonEmphasis.accent,
)
```

#### 待處理
Secondary 與 Tertiary 是否改為實心灰階（使用者 2026-07-31 提出），
需要 Figma 的實際 token，palette 目前沒有對應的中灰／淺灰底色票。
此版未動這兩個層級的外觀。

## v0.3.0 | 2026-07-28

### 2026-07-28 | button.dart | Figma 全量改版（v0.3.0）
狀態：PUBLISHED
⚠️ BREAKING CHANGE — 前端需全專案調整

來源：Figma node 3611:8842（Size: Regular）與 3611:8861（Size: Small），
20 個變體全部逐一讀取，無任何推斷。

#### API 變更
| 舊 | 新 |
|----|----|
| `USpaceButtonLevel` | `USpaceButtonStyle` |
| `USpaceButtonLevel.customized` | `USpaceButtonStyle.tertiary` |
| `level:` | `style:` |
| `icon:` | `leadingIcon:` / `trailingIcon:` |
| （無） | `state: USpaceButtonState` |

`state` 為 Figma 的獨立 property。`onPressed == null` 仍視為 disabled，
兩者取聯集，既有呼叫端不會因此壞掉。

#### 視覺改版
- **Secondary**：實心 grey300 底 → **透明底 + 2px 描邊**
- **Tertiary**：Silver Linear 漸層邊框 → **純文字按鈕**，無底色無描邊
- **Small 高度**：垂直 padding 8 → 固定高度 48，與 Regular 相同
- 移除「Secondary + Small 使用 actionTertiaryBg」規則（Figma 已無此區分）
- 移除 `_CustomizedButton`、`_GradientBorderContainer`、`_GradientBorderPainter`
  （共約 100 行）。`silverLinear` / `actionCustomizedBorder` token 保留但 Flutter 端已無引用。

#### Token 對應（顏色不隨 size 改變）
| style | enabled | disabled |
|-------|---------|----------|
| accent | actionPrimaryBg / actionPrimaryContentAccent | actionDisabledBg / actionDisabledContent |
| charging | actionPrimaryBg / actionPrimaryContentCharging | 同上 |
| primary | actionPrimaryBg / actionPrimaryContent | 同上 |
| secondary | 透明 + actionSecondaryContent 描邊 / actionSecondaryContent | 透明 + actionDisabledBg 描邊 / actionDisabledContent |
| tertiary | 透明 / actionTertiaryContent | 透明 / actionDisabledContent |

#### 版面
高度 48（固定）、圓角 full、icon 24px、icon 與文字間距 spacer8、
Small 水平 padding spacer24、Regular 滿寬。

#### 與 Figma 的三處差異（皆經使用者確認）
| 項目 | Figma | 採用 | 決定 |
|------|-------|------|------|
| 文字樣式 | 16px/24px Medium + 0.6px 字距 | `displayM`（18px/26px Medium，無字距） | 使用者指定沿用既有 token |
| disabled 文字 | `#ACACAC`（palette 無此色） | `actionDisabledContent` | 使用者確認原色正確 |
| primary 文字 | `#FFFFFF` | `actionPrimaryContent`（light 為 grey200） | 使用者確認不改 |

因文字改用 displayM（行高 26），若以 padding 推算高度會變成 50，
故改為固定高度 48 並置中，維持 Figma 標示的高度。

#### 連帶更新
- `list.dart`：`buttonLevel` → `buttonStyle`
- `text_field.dart`：內嵌按鈕改用 `style:`
- `tokens/components/button.json`：改為 style × state 共 10 個變體，新增 layout 與差異註記
- `test/component_token_test.dart`：Button 測試由 8 個增至 23 個
  （5 styles × 2 states × 2 sizes，加上 icon 省略、disabled 不可點、字體三項）
- 網站 ButtonPage 全面重寫：Configurator 支援五個維度切換，
  新增 Usage（Do/Don't）、Accessibility、Examples、API、Layout 區塊

#### 驗證
`dart analyze --fatal-infos` 無問題；60 個測試全數通過。
已用變異測試確認：把 secondary 描邊改成錯誤 token 會使 2 個測試失敗。

---

## v0.2.14 | 2026-07-28

### 2026-07-28 | header + 新色票 + 檔案拆分（v0.2.14）
狀態：PUBLISHED
⚠️ 無 BREAKING CHANGE — 元件 API 不變

#### 1. 修正 Floating Header 標題不顯示的 bug
`_buildFloating` 原本寫成 `if (showTitle && titlePlace == center)`，
但 `titlePlace` 預設為 `left`，導致
`USpacePageTitle(type: floating, title: 'X')` **靜默不顯示標題**。
fullPage 與 modal 都沒有這個限制，三者行為不一致。

改為：`titlePlace` 只決定對齊方式（center → `TextAlign.center`，
left → `TextAlign.start`），顯示與否只看 `showTitle`。
ParkingTitle / Info / subtitle 一併跟隨相同對齊。

新增 4 個測試涵蓋此行為（含三種 type 的標題顯示條件、對齊、subtitle 跟隨）。

#### 2. 新增陰影色票
Modal 陰影原本在 Dart 與網站兩邊各自寫死 `rgba(0,0,0,0.1)`，palette 無對應 token。

- `palette.json` 新增 `transparentBlack10` = `0x1A000000`（black @ 10%）
- `semantic-colors.json` 新增 **Effect** 群組，內含 `shadowDefault`
  （light / dark 皆為 `transparentBlack10`，維持目前無主題差異的行為）
- `scalars.json` 新增 **elevation** 群組，內含 `shadowBlur` = 30
- 新增產生檔 `styles/elevation_extension.dart`（`USpaceElevation.shadowBlur`）
- `modal.dart` 改用 `colors.shadowDefault` + `USpaceElevation.shadowBlur`
- 網站 ModalPage 同步改用 token

語意 token 數：63 → 64。**規則測試的裸 hex allowlist 已清空**
（原本 modal.dart 有 1 個例外，現在是零）。

#### 3. 拆分 header.dart
原本 662 行、單一 class `USpacePageTitle`，內含 12 個 `_buildXxx` 方法混在一起。
改用 `part` 檔拆成五個，各自職責單一：

| 檔案 | 行數 | 內容 |
|------|------|------|
| `header.dart` | 226 | enums、參數定義、依 type 分派版面 |
| `header_full_page.dart` | 103 | `_FullPageHeader` / `_FullPageTitleBlock` / `_Breadcrumb` |
| `header_floating.dart` | 169 | `_FloatingHeader` / `_FloatingTitleBlock` / `_FloatingScrollingHeader` / `_ScrollingActionBar` |
| `header_modal.dart` | 61 | `_ModalHeaderLayout` / `_ModalTitleBlock` |
| `header_sections.dart` | 215 | `_ActionBar` / `_LeftSection` / `_RightSection` / `_StatusBarPlaceholder` / `_GrabBarSpacing` |

結構改變：
- `_buildXxx(colors, typo)` 方法 → 獨立的 `StatelessWidget`，各自以
  `context.uColors` / `context.typography` 取用主題，不再層層傳遞
- `_LeftSection` 的四個分支原本各自展開，抽出 `_backIcon` 與 `_titleText` 兩個
  輔助方法，重複的 `GestureDetector + SizedBox + Align` 收斂
- 寫死的 310（標題最大寬）與 40（GrabBar 寬）改為具名常量
  `_leftTitleMaxWidth` / `_grabBarWidth`

總行數 662 → 774（多出的是每檔標頭與 class 宣告），但最大單檔從 662 降到 226。

#### 驗證
`dart analyze --fatal-infos` → No issues found。
48 個測試全數通過（拆分前後測試未修改，行為等價）。
`./verify_skill.sh` 四項全綠。

來源：使用者指定修正，無 Figma 讀取

---

## v0.2.13 | 2026-07-28

### 2026-07-28 | 專案品質 | 測試基礎建設（v0.2.13）
狀態：PUBLISHED
⚠️ 無 BREAKING CHANGE — 元件 API 與 token 值皆未變動

#### 動機
`styles/` 的 4176 行 Dart 是實際交付給工程師的程式碼，但**沒有任何工具編譯過它**：
沒有 pubspec、沒有測試、CI 只建置文件站。任何語法或型別錯誤要等工程師貼進 app 才會發現。

#### 新增：Flutter package 骨架
- `pubspec.yaml`（不搬動 `styles/`，維持既有交付方式）
- `analysis_options.yaml`（`flutter_lints`，排除 `website/` 與 `rules/`）
- `dart analyze --fatal-infos` → **No issues found**

導入 lint 後修正 3 處：
- `button.dart` 移除從未被使用的 `_GlassCircle.extraOverlay` 參數
  （該效果實際由 `_BarItem` 以 `USpaceGlass.fillColor` 實作，此參數為死碼）
- `button.dart` 移除 `isLG ? blurSigma : blurSigma` 這個兩邊相同的三元判斷
- `dropdown_menu.dart:89` 補上 if 的大括號

#### 新增：CI 從單一 job 改為三個
`.github/workflows/deploy.yml` 重構為 `flutter` / `web` / `deploy`：
- `flutter`：`dart analyze --fatal-infos` + `flutter test`
- `web`：token 漂移檢查 + 文件站建置
- `deploy`：兩者皆綠才執行，且 PR 只跑檢查不部署
- 新增 `pull_request` 觸發，問題在合併前就會出現

#### 新增：45 個測試
| 檔案 | 數量 | 內容 |
|------|------|------|
| `test/token_rules_test.dart` | 6 | 把 LESSONS_LEARNED 的規則機器化 |
| `test/component_token_test.dart` | 27 | 由規格 JSON 驅動的元件 token 驗證 |
| `test/header_test.dart` | 12 | USpacePageTitle 的行為與 token |

**規則測試**擋住的事：手寫檔出現裸 `Color(0x`、寫死圓角數字、
間距用了落在 spacing 階梯上的裸數值、直接寫 `FontWeight.wNNN`、
元件繞過語意 token 直接引用 `USpacePalette`、產生檔的 GENERATED 標頭被移除。
已知例外以 allowlist 凍結（modal.dart 陰影 1 處、chip.dart 品牌漸層 3 處），
目的是擋住**新增**的違規而非假裝問題不存在。

為讓規則能設在零，順帶修正：
- 新增 `semibold`（w600）具名常量，取代 chip.dart / header.dart 共 4 處裸寫
  （w600 = Figma PingFang TC Semibold，值本來就在用，只是沒有名字）
- `header.dart` 的 `EdgeInsets.only(left: 2)` → `USpaceSpacing.spacer2`

#### 新增：元件規格 JSON 雙向驅動
`tokens/components/{button,toggle,chip}.json` 定義 level × size × state → token，
**同一份檔案**同時驅動：
- `test/component_token_test.dart` — pump 真實 widget，斷言畫面上的色值
- `website/src/tokens/componentSpecs.ts` — 文件站 Develop 分頁的規格表

已用變異測試確認有效：把 `button.json` 的 accent 底色改成錯誤 token，
2 個測試立刻失敗。ButtonPage 與 TogglePage 的 Token Mapping 表已改吃此規格，
其中 Button 表因此多出 size / state 兩欄，並顯示出
「secondary + small 使用 actionTertiaryBg」這個原本表格藏起來的差異。

#### website 去重
- 新增 `components/Controls.tsx`：`Segmented`（3 頁完全相同）、
  `Toggle`（2 頁相同 + 1 頁為子集）、`asOptions`
- 另有 6 處 Playground 選擇器內嵌重複，以 `compact` 變體取代
- ModalPage 496→448、TextFieldPage 471→421、TextAreaPage 471→421 行

#### 其他
- `verify_skill.sh` 改寫：舊版 grep 檢查的三個檔案現在都由產生器產出，
  結構已由產生器保證、該檢查不可能失敗。新版執行與 CI 相同的四項檢查
- 版本號改為單一來源：`package.json` → 產生 `website/src/tokens/version.ts`，
  並檢查 `pubspec.yaml` 是否一致，不一致直接擋下
- `rules/PROMPT_TEMPLATE.md` 更新為新流程（改 JSON → gen:tokens → verify_skill）

#### ⚠️ 測試發現的既有行為問題
| 項目 | 說明 |
|------|------|
| `USpacePageTitle(type: floating, title: 'X')` 靜默不顯示標題 | `_buildFloating` 只在 `titlePlace == center` 時渲染標題區塊，但 `titlePlace` 預設為 `left`。fullPage 與 modal 皆無此限制，三者行為不一致。已用測試釘住現況，待確認是否要改預設值 |

#### 未處理：header.dart 拆分
原規劃拆分 655 行的 `header.dart`，實際檢視後**未執行**：
該檔只有一個 class `USpacePageTitle`（508 行），Dart 的 `part` 檔無法承載
class 的方法，唯一路徑是重構成多個子 widget——這是專案裡最複雜的元件
（3 種 type × 約 20 個開關參數），在沒有覆蓋率的情況下風險過高。
本輪改為先補 12 個 widget test 作為安全網，拆分列入待處理。

來源：程式碼品質改善，無 Figma 讀取

---

## v0.2.12 | 2026-07-28

### 2026-07-28 | website | 元件頁內嵌 hex 全面改吃 token（v0.2.12）
狀態：PUBLISHED
承接同日 v0.2.11 的 token 產生器導入。

#### 動機
v0.2.11 只讓 `website/src/tokens/*.ts` 與 Dart 同源，但 12 個元件頁仍把色碼
直接寫在 JSX 裡，改一個色票仍需手動掃過所有頁面。

#### 改為引用 token 的頁面（共 50 處）
| 頁面 | 處數 | 主要對應 |
|------|------|---------|
| ButtonPage | 10 | actionPrimary/Secondary/Disabled/Tertiary + actionCustomizedBorder |
| ChipPage | 5 | chipBgAccent/Primary/Secondary、neonLime200、limeLinear |
| ListPage | 6 | actionPrimaryContentAccent/Content/Bg、contentInverse、contentAccent |
| HeaderPage | 6 | semanticDark 的 pagePrimary/pageSecondary/borderDivider/textPrimary/textSecondary |
| ModalPage | 5 | pagePopup、inputBgDefault、inputTextPlaceholder、glass.blurSigma |
| TogglePage | 4 | actionPrimaryContentAccent/Content、actionDisabledBg、contentInverse |
| GlassPage | 4 | glass.fillColor/blurSigma、grey900/800/700 |
| OverviewPage | 4 | neonLime600/400/200、blue400 |
| ColorPage | 2 | grey800、white |
| TextFieldPage | 2 | contentError、actionPrimaryContent |
| TabPage | 1 | textInverse |
| DropdownMenuPage | 1 | inputTextError |

每個對應都逐一比對 `styles/*.dart` 中該元件實際使用的 token，未依名稱推斷。
替換處均加上來源註解（例如「token 對應來源：styles/button.dart 的 _resolveBg」）。

#### 產生器新增輸出
- `colors.ts` 新增 `semanticLight` / `semanticDark`（`semantic` 保留為 light 別名）
- `colors.ts` 新增 `gradients`（CSS 字串，來源 `tokens/gradients.json` 的 `css` 欄位）
- `scalars.ts` 新增 `glass`（fillColor / fillColorDart / blurSigma）

#### 新增手寫工具
- `website/src/tokens/util.ts` — `withAlpha(hex, alpha)`，
  供需要半透明品牌色的場景使用，取代把色票拆成十進位寫死
  （3 個導覽頁的 `rgba(195,244,0,0.1)` 即為 neonLime600 的十進位形式）

#### 其他去重
- `ColorPage` 的淺色判斷由寫死 4 個 hex 改為相對亮度計算，新色票自動適用
- `OverviewPage` 的統計數字（Color Tokens / Typography Styles / Components）
  改由 token 資料計算，不再手寫；原本寫「60+」，實際為 63

#### ⚠️ 校正的不一致（website 原本與 Dart 不符，已對齊 Dart）
| 頁面 | 原值 | 改為 | 依據 |
|------|------|------|------|
| ButtonPage Customized 文字 | `#777777`（grey600） | `actionTertiaryContent` = `#323237` | button.dart `_resolveTextColor` |
| TextFieldPage 內嵌按鈕文字 | `#fff` | `actionPrimaryContent` = `#D9D9D9` | button.dart primary level |
| HeaderPage GrabBar | `rgba(255,255,255,0.15)` | `semanticDark.borderDivider` = `#323237` | header.dart `_GrabBarSpacing` |
| HeaderPage 副標 | `rgba(255,255,255,0.6)` | `semanticDark.textSecondary` = `#D9D9D9` | header.dart |
| ModalPage 模糊半徑 | `blur(15px)` | `glass.blurSigma` = `10.0` | glass_extension.dart（modal.dart 已於 2026-05-20 修正，website 未跟上） |
| ChipPage Outline 漸層 | `linear-gradient(90deg, …)` | `gradients.limeLinear`（261.99deg + Figma stops） | uspace_colors_extension.dart `limeLinear` |

#### 驗證
逐處解析替換後的實際色值：**44 / 50 完全等值（畫面不變）**，
其餘 6 處即上表的刻意校正。`npm run build` 通過、`npm run check:tokens` 通過。

#### 未處理
| 項目 | 原因 |
|------|------|
| ModalPage `boxShadow: rgba(0,0,0,0.1)` | modal.dart 同樣寫死 `Color(0x1A000000)`，palette 無對應 token，未自行新增 |
| eslint 6 errors / 2 warnings | 全為既有的 React hooks 問題（setState in effect、PageTabs 匯出非元件），與本輪 token 替換無關 |

來源：styles/*.dart 逐一比對，無 Figma 讀取

---

## v0.2.11 | 2026-07-28

### 2026-07-28 | 專案結構 | Token 產生器導入（v0.2.11）
狀態：PUBLISHED
⚠️ 無 BREAKING CHANGE — 所有既有 API 與 token 值完全不變

#### 動機
`uspace_colors_extension.dart` 的 63 個 token 各自重複 5 次（建構子 / 欄位 /
light / dark / copyWith / lerp），新增一個 token 要改 6 個地方；`website/src/tokens/`
是第三份手抄資料，已與 Dart 漂移（`borderDivider` 停在 `grey100`，Dart 早已是
`transparentGrey8003`；缺 `neonLime700`、`transparentWhite5`；63 個語意 token 只收錄 30 個）。

#### 新增：tokens/ 單一真實來源
- `tokens/palette.json` — 36 個基底色票
- `tokens/semantic-colors.json` — 63 個語意 token 的 light / dark 對應
- `tokens/gradients.json` — 5 個漸層 token
- `tokens/typography.json` — 24 個字體樣式
- `tokens/scalars.json` — spacing 12 / radius 3 / glass 2
- `tokens/README.md` — 工作流程與規則

#### 新增：產生器
- `tools/generate-tokens.mjs`（Node，零相依）
- `npm run gen:tokens` — 產生 9 個檔案
- `npm run check:tokens` — 比對漂移，有差異 exit 1
- `.github/workflows/deploy.yml` 加入 Check token drift 步驟，擋住手改產生檔

#### 改為產生（內容等價，僅結構重整）
| 檔案 | 行數 |
|------|------|
| styles/uspace_palette.dart | 62 → 66 |
| styles/uspace_colors_extension.dart | 580 → 592 |
| styles/typography_extension.dart | 261 → 249 |
| styles/spacing_extension.dart | 47 → 50 |
| styles/radius_extension.dart | 18 → 22 |
| styles/glass_extension.dart | 21 → 24 |
| website/src/tokens/colors.ts | 產生 |
| website/src/tokens/typography.ts | 產生 |
| website/src/tokens/scalars.ts | 新增 |

手動維護面：989 行 Dart + 約 300 行 TS → **302 行 JSON**。
新增一個語意 token 從「改 6 處」變成「JSON 加 1 行」。

#### typography_extension.dart 去重
- light 與 dark 原本各自宣告 24 個 TextStyle，經比對逐字完全相同
- 改為以建構子預設值提供樣式，兩個主題只指定 `textColor` / `textSecondaryColor`
- 結構上不再可能出現 light / dark 樣式漂移
- 建構子的 24 個樣式參數由 required 放寬為 optional（既有呼叫端不受影響）

#### 新增：主題組裝入口
- `styles/uspace_theme.dart` — `USpaceTheme.light` / `.dark` 直接餵給 MaterialApp；
  `USpaceTheme.extensionsFor(brightness)` 供已有 ThemeData 的 App 併入
- `styles/uspace_design_system.dart` — barrel file，前端一行 import 取得全部 token 與元件

#### 型別與警告修正
- `tab.dart`（6 處）、`chip.dart`（2 處）、`dropdown_menu.dart`（1 處）：
  `dynamic typo` → `AppTypographyExtension typo`
- `chip.dart`：`typo.labelM as TextStyle` 多餘轉型移除
- `button.dart` / `header.dart` / `modal.dart` / `text_area.dart` / `text_field.dart`：
  移除未使用的 `uspace_palette.dart` import
- `dart analyze` 6 warnings → 1（僅餘既有的 `_GlassCircle.extraOverlay` 未使用參數）

#### website
- `SpacingPage.tsx` 的 spacer / radius 清單改吃 `tokens/scalars.ts`，不再手抄
- ColorPage / TypographyPage 自動取得完整 token（semantic 30 → 63、palette 34 → 36）
- 元件頁內嵌的 hex（ButtonPage 13 處等）本輪未動，留待下一輪
- `npm run build` 通過

#### 驗證
逐 token 比對重構前後的實際值：palette 36、semantic light 63、semantic dark 63、
欄位宣告 63、copyWith 參數 63、gradients 5、typography 樣式 24、
secondary getters 24、spacing 12、radius 3、glass 2 — **全部一致，零值差異**。
TS palette 僅新增 `transparentWhite5`、`neonLime700`，無移除、無值變更。

#### ⚠️ 待確認（未自行決定）
| 項目 | 說明 |
|------|------|
| bottomBarGray1B / 2B 的 dark 值 | 兩個漸層寫死 `grey50`（亮色值），dark 模式下不正確。Figma 無對應 dark token，未自行推斷，維持現況 |
| button.dart `_GlassCircle.extraOverlay` | 參數從未被傳值，屬元件邏輯，未在本輪 token 重構範圍內處理 |

來源：專案結構重構，無 Figma 讀取

---

## 未標版號 | 2026-05-20

### 2026-05-20 | header.dart | Figma 全量同步 + Token 修正
狀態：PUBLISHED
⚠️ BREAKING CHANGE
變更：

#### Token 修正
- GrabBar 顏色：contentTertiary → borderDivider（Figma --border/divider）
- LeftSection title 字體：headingM (22px Regular) → displayM (18px Medium)（Figma Display/L）
- ProfileTitle fontWeight：w700 → w600（Figma PingFang TC:Semibold）
- Modal title 字體：headingM (22px) → displayM (18px Medium)（Figma Display/L）
- Modal paragraph 字體：bodyM (16px) → bodyS (14px)（Figma 14px/20px）
- FloatingPage 圓角：寫死 Radius.circular(24) → _modalRadius 常量（Figma --modal-radius = 24px）

#### 新增功能
- USpaceHeaderStatus enum（defaultStatus / scrolling）— FloatingPage 滾動時 title 移入 ActionBar
- USpaceHeaderRightFunction enum（icon24 / icon32 / textButton）— 3 種 RightSection 樣式
- showGrabBar — 控制 FloatingPage GrabBar 顯示
- showBreadcrumb + firstDrawer / secondDrawer — FullPage Breadcrumb
- showParkingTitle + parkingTitle — FloatingPage 標題上方 displayM 文字
- showRightInfo — RightSection Info icon（icon24 模式）
- LeftSection title / profileTitle 加 maxWidth=310（對齊 Figma）
- ProfileTitle 加 pl=2（對齊 Figma）

來源：Figma MCP，node 1395:8937 / 964:9246 / 961:9111

---

### 2026-05-20 | button.dart | 寫死值加註解
狀態：PUBLISHED
變更：
- ScaleDownOrderButton vertical:6 — 加註解說明 Figma 元件特定值，無對應 spacing token
- ScaleDownOrderButton dot 6×6 — 加註解說明 Figma dot indicator 固定尺寸
- _GlassCircle extraOverlay Color(0x55FFFFFF) — 加註解說明 fillColor 雙層疊加近似值，無獨立 palette token
來源：Token audit

---

### 2026-05-20 | chip.dart | 寫死值加註解
狀態：PUBLISHED
變更：
- _padding vertical:1 / small left:6 — 加註解說明 Figma 元件特定值，無對應 spacing token
- outline border USpacePalette.neonLime200 — 加註解說明品牌漸層色，無對應 semantic token
- outline icon USpacePalette.neonLime200 — 同上
來源：Token audit

---

### 2026-05-20 | tab.dart | Radius token 修正
狀態：PUBLISHED
變更：
- Tab / TabIcon / TabGraphic 3 處 BorderRadius.circular(32) → BorderRadius.circular(USpaceRadius.full)
來源：Token audit

---

### 2026-05-20 | modal.dart | Glass blur token 修正
狀態：PUBLISHED
變更：
- BackdropFilter blur 寫死 sigmaX/Y: 15 → USpaceGlass.blurSigma (10.0)
- 補上 glass_extension.dart import
來源：Token audit

---

### 2026-04-14 | uspace_palette.dart | Node 799-6281
狀態：PUBLISHED
備註：Dark token 待補齊後一起 publish
變更：無（本輪未修改任何色票，原因見下方）
來源：Figma MCP 第 1 輪

#### 待確認：Red 色系數值與現有 palette 不一致
| token | 現有 palette | Figma 設計稿 |
|-------|-------------|-------------|
| red600 | `#DE1135` | `#F40000` |
| red500 | `#F40000` | `#FF4A20` |

依 SKILL_TEMPLATE 規則「只新增常量，不修改現有常量的 hex 值」，本輪未自行覆寫。
請確認是否要更新這兩個色票的 hex 值。

---

### 2026-04-14 | uspace_palette.dart | ColorPalette.json 匯入
狀態：PUBLISHED
備註：Dark token 待補齊後一起 publish
變更：
- 命名修正：lime → neonLime，gray → grey（對齊 Figma JSON）
- 新增：neonLime900、yellow400、red400、transparentWhite50
- 修正：blue600 ↔ blue800 編號對調（對齊 Figma JSON：blue600=#5948D0、blue800=#3F5CEE）
- 刪除：red600（#DE1135，Figma JSON 無此值）
來源：ColorPalette.json 直接匯入

---

### 2026-04-14 | uspace_colors_extension.dart | Light.tokens.json + Dark.tokens.json
狀態：PUBLISHED
備註：Dark token 待補齊後一起 publish
變更：
- 修正：contentError 改為 red400（原 red600 已不存在）
- 修正：textError 改為 red500
- 修正：所有 gray → grey、lime → neonLime（對齊 palette）
- 新增：contentUC、contentUW、pagePopup 三個語意 token
- 修正：dark sectionPrimary/pageSecondary 改為 black/grey900（對齊 Dark.tokens.json）
來源：Light.tokens.json + Dark.tokens.json 直接匯入

---

## v0.1.1 | 2026-04-15

### uspace_colors_extension.dart
狀態：PUBLISHED
變更：
- 新增 15 個 action Color token（actionPrimaryBg、actionPrimary/Secondary/TertiaryText*、actionPrimary/Secondary/TertiaryContent*、actionDisabledBg/Text/Content）
- 新增 static const actionCustomizedBorder（LinearGradient，grey600 → grey200）
備註：action dark token 待設計稿確認後補齊（v1.2.0）
來源：Figma node 473:10438

### button.dart
狀態：PUBLISHED
變更：
- 新建 USpaceButtonLevel enum（accent / charging / primary / secondary / customized）
- 新建 USpaceButton widget
- 文字使用 actionText* token；icon 使用 actionContent* token
- Customized 使用 Silver Linear 漸層邊框（_GradientBorderPainter）
來源：Figma node 473:10438

---

## v0.1.0 | 2026-04-14

### uspace_palette.dart
狀態：PUBLISHED
變更：
- 命名修正：lime → neonLime，gray → grey（對齊 Figma JSON）
- 新增：neonLime900、yellow400、red400、transparentWhite50
- 修正：blue600 ↔ blue800 編號對調
- 刪除：red600（#DE1135，Figma 無此值）
Figma 來源：ColorPalette.json

### uspace_colors_extension.dart
狀態：PUBLISHED
變更：
- 修正：contentError → red400、textError → red500
- 修正：所有 gray → grey、lime → neonLime
- 新增：contentUC、contentUW、pagePopup
備註：Dark token 待補齊，預計 v0.1.1
來源：Light_tokens.json + Dark_tokens.json

### typography_extension.dart
狀態：PUBLISHED
⚠️ BREAKING CHANGE
變更：
- 字體替換：NotoSansTC/Poppins → PingFang TC
- 命名替換：notoH16/poppinsP14 → headingL/bodyM（語意命名）
- 新增：headingL/M、bodyL/M/S、captionS、displayM/S、labelL/M/S/Xs
- Secondary variants 全部補齊
前端必讀：所有 context.typography.notoXxx 引用需 find & replace
來源：typography.json

---

## 版號重新編號（2026-07-29）

試做階段的版本不應佔用 1.x，全部重編為 0.x：

| 舊 | 新 |  | 舊 | 新 |
|----|----|--|----|----|
| v1.0.0 | v0.1.0 |  | v2.6.0 | v0.2.6 |
| v1.1.0 | v0.1.1 |  | v2.7.0 | v0.2.7 |
| v1.1.1 | v0.1.2 |  | v2.8.0 | v0.2.8 |
| v2.0.0 | v0.2.0 |  | v2.8.1 | v0.2.9 |
| v2.1.0 | v0.2.1 |  | v2.8.2 | v0.2.10 |
| v2.2.0 | v0.2.2 |  | v2.9.0 | v0.2.11 |
| v2.3.0 | v0.2.3 |  | v2.9.1 | v0.2.12 |
| v2.4.0 | v0.2.4 |  | v2.10.0 | v0.2.13 |
| v2.5.0 | v0.2.5 |  | v2.11.0 | v0.2.14 |
|  |  |  | v3.0.0 | v0.3.0 |

舊的 major 升級（破壞性變更）對應新的 minor 升級，其餘對應 patch。
`tracking/SKILL_STATUS.md` 裡各檔案的版號是獨立軸線，未受影響。

---

## Deprecated
<!-- 目前無淘汰項目 -->
<!-- 已淘汰的規範統一放這裡 -->
<!-- 格式：### Token 名稱｜淘汰於 vX.X.X｜原值 → 新值｜原因 -->

