# Skill status
> 最後更新：2026-07-28

---

## Infrastructure

### Token 產生器

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| tokens/*.json | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 單一真實來源：palette 36 / semantic 63 / gradients 5 / typography 24 / scalars 17 |
| tools/generate-tokens.mjs | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 產生 6 個 Dart + 3 個 TS；`npm run gen:tokens` / `check:tokens` |
| .github/workflows/deploy.yml | v1.1.0 | ✅ PUBLISHED | 2026-07-28 | 新增 Check token drift 步驟 |
| styles/uspace_theme.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | USpaceTheme.light / .dark / extensionsFor |
| styles/uspace_design_system.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | barrel file，一行 import 取得全部 |
| website 元件頁改吃 token | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 12 個頁面共 50 處寫死色值改為引用 token；44 處等值、6 處校正與 Dart 的不一致 |
| website/src/tokens/util.ts | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | withAlpha() 手寫工具，供半透明品牌色使用 |
| pubspec.yaml + analysis_options.yaml | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | styles/ 首次可被 dart analyze 檢查；flutter_lints，No issues found |
| .github/workflows/deploy.yml | v2.0.0 | ✅ PUBLISHED | 2026-07-28 | 拆成 flutter / web / deploy 三個 job；PR 只跑檢查 |
| test/token_rules_test.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 6 條規則：裸 hex / 圓角 / 間距 / fontWeight / palette 直引 / GENERATED 標頭 |
| test/component_token_test.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 27 個測試，由 tokens/components/*.json 驅動 |
| test/header_test.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 12 個測試，USpacePageTitle 行為與 token |
| tokens/components/*.json | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | button / toggle / chip；同時驅動 Flutter 測試與網站規格表 |
| website/src/components/Controls.tsx | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | Segmented / Toggle / asOptions；9 處重複收斂 |
| verify_skill.sh | v2.0.0 | ✅ PUBLISHED | 2026-07-28 | 改為執行與 CI 相同的四項檢查 |
| header.dart 拆分 | v3.0.0 | ✅ PUBLISHED | 2026-07-28 | 662 行單檔 → 5 個 part 檔，最大 226 行；12 個 _buildXxx 方法改為獨立 widget |
| floating 標題 bug 修正 | v2.1.0 | ✅ PUBLISHED | 2026-07-28 | titlePlace 改為只控制對齊，不再影響顯示；新增 4 個測試 |
| elevation_extension.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | 新增 shadowDefault 語意色 + shadowBlur；裸 hex allowlist 已清空 |
| 版本號單一來源 | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | package.json → version.ts；pubspec.yaml 不一致會被擋下 |

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| website eslint | - | 🔲 待處理 | 2026-07-28 | 6 errors / 2 warnings，皆為既有 React hooks 問題（setState in effect），與 token 無關 |
| 其餘元件的規格 JSON | - | 🔲 待處理 | 2026-07-28 | 目前只有 button / toggle / chip；tab / text_field / dropdown_menu / list / modal / header 尚未建立 |

---

## Styles

### Color

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| uspace_palette.dart | v1.1.0 | 📝 DRAFT | 2026-05-12 | hex 修正（neonLime800、grey100）；新增 red300 + 7 透明度色票 |
| uspace_colors_extension.dart | v2.0.0 | 📝 DRAFT | 2026-05-12 | ⚠️ BREAKING：全量同步 Figma Variables；移除 action Text tokens；新增 Input/Chip/Project/FAB/Outline/Graphic |
| 改由 tokens/*.json 產生 | v2.1.0 | ✅ PUBLISHED | 2026-07-28 | ⚙️ GENERATED，請勿手改；token 值零變更 |

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| Dark token 完整對應 | v2.0.0 | ✅ 已完成 | 2026-05-12 | 併入 uspace_colors_extension v2.0.0 |
| bottomBarGray1B / 2B 的 dark 值 | - | ⚠️ 待確認 | 2026-07-28 | 兩個漸層寫死 grey50（亮色值），dark 模式不正確；Figma 無對應 dark token，需設計確認後填入 gradients.json |

---

### Typography

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| typography_extension.dart | v1.1.0 | ✅ PUBLISHED | 2026-04-15 | v1.0.0 ⚠️ BREAKING CHANGE；v1.1.0 SF Pro 字體樣式補入 |
| typography_extension.dart（去重 + 產生化）| v1.2.0 | ✅ PUBLISHED | 2026-07-28 | ⚙️ GENERATED；light/dark 重複的 24 個 TextStyle 改為建構子預設值，樣式不可能漂移 |

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| 前端 find & replace | - | 🔲 待處理 | - | 工程師需全專案替換舊命名 |

---

### Glass

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| glass_extension.dart | - | 📝 DRAFT | 2026-07-28 | 高斯模糊 sigmaX/Y 暫定值 10.0，待使用者提供正確數值；⚙️ 改由 tokens/scalars.json 產生 |

---

### Spacing

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| spacing_extension.dart | v1.0.1 | ✅ PUBLISHED | 2026-07-28 | Margin (20px) + 11 Spacer tokens (2-56px)；⚙️ 改由 tokens/scalars.json 產生 |

#### 待處理
（尚無）

---

### Radius

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| radius_extension.dart | v1.0.1 | ✅ PUBLISHED | 2026-07-28 | Small (8) / Medium (20) / Full (1000)；⚙️ 改由 tokens/scalars.json 產生 |

#### 待處理
（尚無）

---

### Elevation

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| elevation_extension.dart | v1.0.0 | ✅ PUBLISHED | 2026-07-28 | shadowBlur (30)；陰影色為語意 token `shadowDefault` |
| shadowDefault（Effect 群組）| v1.0.0 | ✅ PUBLISHED | 2026-07-28 | transparentBlack10；light / dark 相同 |

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| shadowDefault 的 dark 值 | - | ⚠️ 待確認 | 2026-07-28 | 目前 light / dark 同值（維持原本無主題差異的行為），Figma 無對應 dark token |
| 完整 elevation 階層 | - | 🔲 待處理 | 2026-07-28 | 目前只有 modal 用到的一組，尚無 elevation 階層定義 |

---

## Components

### Button

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| button.dart | v1.1.0 | ✅ PUBLISHED | 2026-04-15 | 基本 USpaceButton（accent/charging/primary/secondary/customized） |
| button.dart（Small size） | v1.2.0 | ✅ PUBLISHED | 2026-04-16 | USpaceButtonSize enum；small padding/hug content |
| button.dart（Square / Floating） | v1.0.0 | ✅ PUBLISHED | 2026-04-16 | USpaceFloatingButton + USpaceFloatingButtonBar |
| button.dart（寫死值註解） | v1.2.1 | ✅ PUBLISHED | 2026-05-20 | ScaleDownOrder vertical:6 / dot 6×6 / GlassCircle overlay 色值加註解 |
| button.dart（Figma 全量改版）| v2.0.0 | ✅ PUBLISHED | 2026-07-28 | ⚠️ BREAKING：level→style、customized→tertiary、雙 icon、state 明確化；Secondary 改描邊、Tertiary 改純文字 |

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| button.dart（action Text→Content 遷移）| - | 🔲 待處理 | 2026-05-12 | 6 處 actionXxxText 引用需改為 actionXxxContent |

#### ⚠️ 待補數值
| 項目 | 說明 |
|------|------|
| glass 高斯模糊 sigmaX/Y | 目前為暫定值 10.0，等使用者提供正確數值後更新 glass_extension.dart |

---

### Toggle

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| toggle.dart | v2.0.0 | ✅ PUBLISHED | 2026-05-19 | 重寫：自訂實作取代 Flutter Switch，64×24 track + 34×20 pill thumb，支援 Enable/Disable |

#### 待處理
（尚無）

---

### List item

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| list.dart | v1.0.0 | 📝 DRAFT | 2026-04-16 | 來源：Figma MCP |

---

### Header

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| header.dart | v2.0.0 | ✅ PUBLISHED | 2026-05-20 | ⚠️ BREAKING：Figma 全量同步；token 修正（GrabBar/LeftTitle/Modal）；新增 Scrolling/Breadcrumb/RightFunction |

#### 待處理
（尚無）

---

### Bottom bar

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| bottom_bar.dart | - | 🔲 待處理 | - | 尚未開始 |

---

### Icon

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| icon.dart | - | 🔲 待處理 | - | 尚未開始 |

---

### Navigation

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| navigation.dart | - | 🔲 待處理 | - | 尚未開始 |

---

### Text field

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| text_field.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | 9 states, trailing button, Figma node 40:3307 |

#### 待處理
（尚無）

---

### Tab

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| tab.dart | v1.0.1 | ✅ PUBLISHED | 2026-05-20 | 修正 BorderRadius.circular(32) → USpaceRadius.full (1000) |

#### 待處理
（尚無）

---

### Chip

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| chip.dart | v1.0.1 | ✅ PUBLISHED | 2026-05-20 | 寫死值加註解（vertical:1 / left:6 / outline palette 引用） |

#### 待處理
（尚無）

---

### Dropdown Menu

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| dropdown_menu.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | 5 states, dropdown panel, Figma node 2141:11030 |

#### 待處理
（尚無）

---

### Text Area

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| text_area.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | 8 states, multiline 144px, Figma node 634:8456 |

#### 待處理
（尚無）

---

### Modal

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| modal.dart | v1.0.1 | ✅ PUBLISHED | 2026-05-20 | 修正 blur 寫死 15 → USpaceGlass.blurSigma (10.0) |

#### 待處理
（尚無）

---

### Divider

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| divider.dart | - | 🔲 待處理 | - | 尚未開始 |

---

## 狀態說明
| 符號 | 意思 |
|------|------|
| ✅ PUBLISHED | 審核通過，已交付前端 |
| 🔄 APPROVED_PENDING | 審核通過，等待發佈 |
| 📝 DRAFT | Claude Code 產出，待審核 |
| ❌ REVIEW_REJECTED | 審核退回，待修正 |
| 🔲 待處理 | 尚未開始 |
| ⚠️ OUT_OF_SYNC | Figma 已更新，skill 待同步 |

---

## 版本紀錄
### v2.1.0 | 2026-05-20
- header.dart v2.0.0：⚠️ BREAKING CHANGE — Figma 全量同步（node 1395:8937 / 964:9246 / 961:9111）
  - Token 修正：GrabBar contentTertiary → borderDivider；LeftTitle headingM → displayM；ProfileTitle w700 → w600；Modal title headingM → displayM；Modal paragraph bodyM → bodyS
  - FloatingPage 圓角：寫死 24 → `_modalRadius` 常量（Figma --modal-radius）
  - 新增 USpaceHeaderStatus enum（defaultStatus / scrolling）
  - 新增 USpaceHeaderRightFunction enum（icon24 / icon32 / textButton）
  - 新增：showGrabBar / showBreadcrumb / showParkingTitle / showRightInfo
- tab.dart v1.0.1：BorderRadius.circular(32) → USpaceRadius.full (1000)
- modal.dart v1.0.1：blur 寫死 15 → USpaceGlass.blurSigma (10.0)
- button.dart v1.2.1：寫死值加註解（ScaleDownOrder vertical:6 / dot 6×6 / GlassCircle overlay 色值）
- chip.dart v1.0.1：寫死值加註解（vertical:1 / left:6 / outline palette 引用）

### v2.0.0 | 2026-05-12
- uspace_palette.dart v1.1.0：neonLime800/grey100 hex 修正；新增 red300 + 7 透明度色票
- uspace_colors_extension.dart v2.0.0：⚠️ BREAKING CHANGE
  - 全量同步 Figma Variables（Light + Dark）
  - Dark action tokens 正式補齊
  - 移除 action Text tokens（Figma 已無對應）
  - 新增 Input/Chip/Project/FAB/Outline/Graphic 等 31 個新 token

### v1.1.1 | 2026-04-17
- uspace_colors_extension.dart：`bordersDivider` → `borderDivider`（對齊 Figma JSON Border/Divider 單數命名）
- list.dart：同步更新引用

### v1.0.1 | 2026-04-17
- uspace_palette.dart：命名修正 `transparentGrey800_15` → `transparentGrey80015`（camelCase 一致性）
- header.dart：同步更新引用

### v1.2.0 | 2026-04-16
- button.dart：Small size（USpaceButtonSize enum）
- button.dart：Square / Floating（USpaceFloatingButton + USpaceFloatingButtonBar）

### v1.1.0 | 2026-04-15
- uspace_colors_extension.dart：新增 15 個 action Color token + actionCustomizedBorder
- button.dart：初版 USpaceButton widget（首次 PUBLISHED）
- typography_extension.dart：SF Pro 字體樣式補入（sfHeadingL/M 等 12 樣式 + Secondary variants）

### v1.0.0 | 2026-04-14
- uspace_palette.dart：首次從 Figma JSON 產出
- uspace_colors_extension.dart：首次從 Figma JSON 產出（Dark 待補）
- typography_extension.dart：⚠️ BREAKING CHANGE，字體與命名全換
