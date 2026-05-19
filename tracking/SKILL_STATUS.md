# Skill status
> 最後更新：2026-05-19

---

## Styles

### Color

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| uspace_palette.dart | v1.1.0 | 📝 DRAFT | 2026-05-12 | hex 修正（neonLime800、grey100）；新增 red300 + 7 透明度色票 |
| uspace_colors_extension.dart | v2.0.0 | 📝 DRAFT | 2026-05-12 | ⚠️ BREAKING：全量同步 Figma Variables；移除 action Text tokens；新增 Input/Chip/Project/FAB/Outline/Graphic |

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| Dark token 完整對應 | v2.0.0 | ✅ 已完成 | 2026-05-12 | 併入 uspace_colors_extension v2.0.0 |

---

### Typography

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| typography_extension.dart | v1.1.0 | ✅ PUBLISHED | 2026-04-15 | v1.0.0 ⚠️ BREAKING CHANGE；v1.1.0 SF Pro 字體樣式補入 |

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
| glass_extension.dart | - | 📝 DRAFT | 2026-04-16 | 高斯模糊 sigmaX/Y 暫定值 10.0，待使用者提供正確數值 |

---

### Spacing

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| spacing_extension.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | Margin (20px) + 11 Spacer tokens (2-56px) |

#### 待處理
（尚無）

---

### Radius

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| radius_extension.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | Small (8) / Medium (20) / Full (1000) |

#### 待處理
（尚無）

---

### Elevation

#### 已完成
（尚無）

#### 待處理
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| elevation_extension.dart | - | 🔲 待處理 | - | 尚未開始 |

---

## Components

### Button

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| button.dart | v1.1.0 | ✅ PUBLISHED | 2026-04-15 | 基本 USpaceButton（accent/charging/primary/secondary/customized） |
| button.dart（Small size） | v1.2.0 | ✅ PUBLISHED | 2026-04-16 | USpaceButtonSize enum；small padding/hug content |
| button.dart（Square / Floating） | v1.0.0 | ✅ PUBLISHED | 2026-04-16 | USpaceFloatingButton + USpaceFloatingButtonBar |

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
| header.dart | v1.0.1 | ✅ PUBLISHED | 2026-04-17 | 同步更新 transparentGrey80015 引用 |

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
| tab.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | 5 types × 2 states, Figma node 972:7985 |

#### 待處理
（尚無）

---

### Chip

#### 已完成
| 項目 | 最新版本 | 狀態 | 最後更新 | 備註 |
|------|---------|------|---------|------|
| chip.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | 4 levels × 2 sizes, Figma node 1327:19329 |

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
| modal.dart | v1.0.0 | ✅ PUBLISHED | 2026-05-19 | 4 categories (List/TextArea/Image/Null), glass effect, Figma node 2237:3211 |

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
