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

