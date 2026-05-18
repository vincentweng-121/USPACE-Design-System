# Changelog
> 審核通過後由使用者手動搬入。前端工程師以此為準。
> 版號規則：v主版.次版.修正
>   主版：設計語言重大改版
>   次版：新增 token 或新色系
>   修正：修正既有 token 的數值

---

## v1.1.0 | 2026-04-15

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

## v1.0.0 | 2026-04-14

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
備註：Dark token 待補齊，預計 v1.1.0
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

## Deprecated
<!-- 目前無淘汰項目 -->
<!-- 已淘汰的規範統一放這裡 -->
<!-- 格式：### Token 名稱｜淘汰於 vX.X.X｜原值 → 新值｜原因 -->

