# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 匯入 TextArea 元件
目標檔案：text_area.dart

## 來源
Figma node 634:8456（TextAera → 修正為 TextArea）

## 元件結構（已確認）
- 8 states: Default / Active / Typing / Complete / Disabled / Error / Incomplete / Non-editable
- Height: 144px, borderRadius: 20px
- Padding: horizontal 20px, vertical 16px
- Active/Typing/Error border: 2px inputBorderActive (green)
- Label: labelS 12px/16px, paddingLeft 8px
- Input: labelM 14px/20px (Complete/Disabled: labelL 16px/24px)
- Hint: labelS 12px/16px; error/incomplete: inputTextError + icon prefix
- Delete icon: 20px, shown in Error/Typing/Complete
- showLabel / showHint boolean properties

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
