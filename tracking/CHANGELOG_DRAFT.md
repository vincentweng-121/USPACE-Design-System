# Changelog draft
> Claude Code 寫入，使用者審核後搬入 CHANGELOG.md。
> 狀態：DRAFT / REVIEW_REJECTED / APPROVED_PENDING

---

<!-- 新增記錄從這裡往下寫 -->

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

### 2026-05-12 | uspace_palette.dart | Figma Variables 同步
狀態：DRAFT
變更：
- 修正 neonLime800：#B4E002 → #A7D100（對齊 Figma ColorPalette）
- 修正 grey100：#F1F2F3 → #EEEEEE（對齊 Figma ColorPalette）
- 新增 red300 = #FF5151
- 新增透明度色票：transparentBlack40（40%）、transparentWhite10（10%）、transparentWhite70（70%）、transparentWhite80（80%）、transparentGrey8003（3%）、transparentGrey20020（20%）
來源：Mode 1.tokens.json

---

### 2026-05-12 | uspace_colors_extension.dart | Figma Variables 全量同步
狀態：DRAFT
⚠️ BREAKING CHANGE
變更：

#### 既有 token 值變更（Light）
- contentAccent：neonLime800 → neonLime600
- contentTertiary：grey200 → transparentGrey80015（grey800@15%）
- pageMask：transparentBlack50（50%）→ transparentBlack40（40%）
- pagePopup：transparentWhite50（50%）→ transparentWhite80（80%）
- borderDivider：grey100 → transparentGrey8003（grey800@3%）

#### 既有 token 值變更（Dark）— 正式補齊 dark action tokens
- contentTertiary：grey700 → grey800
- pageMask：transparentBlack50 → transparentBlack40
- pagePopup：transparentWhite50 → transparentWhite10（10%）
- borderDivider：grey900 → grey800
- actionPrimaryBg：grey800 → grey700
- actionPrimaryContent：grey200 → white
- actionSecondaryBg：grey300 → grey800
- actionSecondaryContent：grey800 → white
- actionTertiaryBg：grey100 → grey800
- actionTertiaryContent：grey800 → grey600
- actionDisabledBg：grey100 → white
- actionDisabledContent：grey200 → white

#### 移除的 token（Figma 已無對應）
- actionPrimaryTextAccent、actionPrimaryTextCharging、actionPrimaryText
- actionSecondaryText、actionTertiaryText、actionDisabledText
- ⚠️ button.dart 有 6 處引用需更新為對應 Content token

#### 新增 token
- 基礎：contentDisabledWithoutBg、textWarning、textDisabledMuted、sectionError
- Action：actionOutlineBg/Content、actionFabBg/Content/Selected/OpacityBg、actionGraphicBg/Content
- Input：inputBgDefault、inputBorderActive、inputBorderError、inputText、inputTextError、inputTextPlaceholder、inputTextDisabled
- Chip：chipBgPrimary、chipBgSecondary、chipBgAccent
- Project：projectCharging、projectGoldenCard、projectBlackCard、projectPlatinumCard、projectGreenCard、projectUspaceBlack、projectUspaceWhite

來源：Light.tokens.json + Dark.tokens.json（2026-05-12 匯出）

---

### 2026-04-17 | header.dart | Figma MCP 讀取
狀態：DRAFT
變更：
- 新增 USpacePageTitle widget
- 新增 USpaceHeaderType enum（fullPage / floating / modal）
- 新增 USpaceHeaderTitlePlace enum（left / center）
- 新增 USpaceHeaderLeftFunction enum（fullPageIcon / floatingIcon / title / profileTitle）
- 支援所有 boolean show/hide 控制：showStatusBar / showLeft / showRight / showTitle /
  showSubtitle / showParagraph / showInfo
- 新增 _StatusBarPlaceholder（iOS status bar placeholder）
- 新增 _GrabBarSpacing（Floating GrabBar，⚠️ 顏色透明度問題待確認）
- ⚠️ profileTitle 使用 FontWeight.w600（Figma Semibold），非標準 token weight，待確認
- ⚠️ Icon placeholder 全部使用 Material icon，待 icon 庫完成後替換
來源：Figma MCP，nodeId 1327:17998 / 1327:18205 / 1327:18962

---

### 2026-04-16 | button.dart | Small Button 473:11437
狀態：DRAFT
變更：
- 新增 USpaceButtonSize enum（regular / small）
- USpaceButton 新增 size 參數（預設 regular）
- small：padding vertical=8, horizontal=24；寬度 hug content（移除 SizedBox width: infinity）
- regular：padding vertical=12；保留 SizedBox width: infinity 填滿寬度
- 色彩、字體、level、status 邏輯完全共用，無新 token
來源：Figma node 473:11437

---

### 2026-04-15 | typography_extension.dart | SF Pro 補入
狀態：DRAFT
變更：
- 新增 SF Pro 字體樣式（sfHeadingL/M、sfBodyL/M/S、
  sfCaptionS、sfDisplayM/S、sfLabelL/M/S/Xs）
- 新增對應 Secondary variants（共 12 個）
- San Francisco Text 統一對應為 SF Pro
來源：typography.json 🔤 分類

---

### 2026-04-15 | uspace_colors_extension.dart | Button frame 473:10438
狀態：DRAFT
變更：
- 新增 15 個 action Color token（actionPrimaryBg、actionPrimaryText/ContentAccent、actionPrimaryText/ContentCharging、actionPrimaryText/Content、actionSecondaryBg、actionSecondaryText/Content、actionTertiaryText/Content、actionDisabledBg、actionDisabledText/Content）
- 新增 static const actionCustomizedBorder（LinearGradient，grey600 → grey200）
- ⚠️ dark action token 目前與 light 相同，待設計稿確認後補齊
來源：Figma node 473:10438

---

### 2026-04-15 | button.dart | Button frame 473:10438
狀態：DRAFT
變更：
- 新建 USpaceButtonLevel enum（accent / charging / primary / secondary / customized）
- 新建 USpaceButton widget（label、level 必填；icon 選填；onPressed=null 自動 disabled）
- 文字使用 actionPrimary/Secondary/TertiaryText* token
- Icon 使用 actionPrimary/Secondary/TertiaryContent* token
- Customized 以 _GradientBorderPainter 渲染 Silver Linear 漸層邊框
- 字體：context.typography.labelL
來源：Figma node 473:10438

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

### 2026-04-14 | typography_extension.dart | typography.json
狀態：DRAFT
⚠️ BREAKING CHANGE
變更：
- 字體替換：NotoSansTC/Poppins → PingFang TC
- 命名替換：notoH16/poppinsP14 → headingL/bodyM（語意命名）
- 新增：headingL/M、bodyL/M/S、captionS、displayM/S、labelL/M/S/Xs（共 12 樣式）
- 新增：所有樣式的 Secondary variants（getter，共 12 個）
- 舊引用需全專案 find & replace
來源：/Users/macpro-121/Desktop/typography.json
