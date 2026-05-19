# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 匯入 Modal 元件
目標檔案：modal.dart

## 來源
Figma node 2237:3211

## 元件結構（已確認）
- 4 categories: List Item / Text Area / Image / Null
- Container: pagePopup + backdrop blur 15px + shadow 0 0 30px
- Top borderRadius: 20px (Number/20)
- Padding: horizontal 20px (margine), gap 16px
- Header: PageTitle modal type, center title (displayL 18px/26px Medium), close button
- List Item: icon 32px + title bodyL 18px + optional check, borderDivider
- Text Area: embedded TextArea component
- Image: 196px placeholder + notice text (captionS)
- BottomBar: full-width stadium button (actionPrimaryBg + actionPrimaryContentAccent)
- showBottomBar boolean

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
