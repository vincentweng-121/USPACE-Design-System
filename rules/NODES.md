# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 讀取 Tab component，產出 tab.dart
目標檔案：tab.dart

## 指定 Node ID
| 名稱 | Node ID | 說明 |
|------|---------|------|
| Tab | 972:7985 | Tab component set (5 types × 2 states) |

## Component 結構（已確認）
- Type: Tab_icon / Tab_Graphic / Tab / Filter / Input
- State: Default / Active
- Properties: icon, icon1 (bool), label, product, staus, type
- Tab/TabIcon/TabGraphic: h=38, rounded=32, labelM (14px/20px)
  - Default: actionTertiaryBg + actionTertiaryContent
  - Active: contentPrimary + textInverse
- TabIcon: leading 20px icon, pl=12 pr=16 gap=4
- TabGraphic: leading 31.5px graphic, pl=8 pr=16
- Tab: px=16
- Filter: h=32, rounded=1000, labelS (12px/16px), maxWidth=132
  - Default: actionTertiaryBg + actionTertiaryContent
  - Active: actionPrimaryBg + textInverse
- Input: rounded=1000, py=8 pl=12 pr=8, labelS (12px/16px), maxWidth=132
  - Default only: actionOutlineBg + actionOutlineContent + borderDivider border
  - Trailing: 16px Close icon

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
