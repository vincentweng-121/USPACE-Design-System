# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 讀取 Chip component，產出 chip.dart
目標檔案：chip.dart

## 指定 Node ID
| 名稱 | Node ID | 說明 |
|------|---------|------|
| Chip | 1327:19329 | Chip component set (4 levels × 2 sizes × 2 surfaces) |

## Component 結構（已確認）
- Level: Accent / Primary / Secondary / Outline
- Size: Regular / Small
- Surface: White / Gray (不影響 chip 本身色值)
- Properties: leadingIcon (bool)
- Token mapping:
  - Accent: chipBgAccent + textPrimary
  - Primary: chipBgPrimary + textPrimary
  - Secondary: chipBgSecondary + textPrimary
  - Outline: neonLime200 border + gradient text (neonLime200 → #B4E002)
- Typography:
  - Regular: labelM (14px/20px Regular)
  - Small: 10px/14px Semibold (displayXXS, not in TypographyExtension)
- Layout:
  - Regular: rounded=100; with icon pl=8 pr=12 gap=2; no icon px=12
  - Small: rounded=100; with icon pl=6 pr=8 gap=2; no icon px=8

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
- #B4E002 不在 palette 中，待確認是否需新增
