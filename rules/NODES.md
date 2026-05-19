# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 讀取 TextField component，產出 text_field.dart
目標檔案：text_field.dart

## 指定 Node ID
| 名稱 | Node ID | 說明 |
|------|---------|------|
| TextField | 40:3307 | TextField component set (9 states) |

## Component 結構（已確認）
- Status: Default / Active / Typing / Complete / Disabled / Error / Error-Active / Incomplete / Non-editable
- Properties: button (bool), hint, input, label, placeholder, showButton, showHint, showLabel, status
- Layout: height 48px, borderRadius 1000 (StadiumBorder), paddingLeft 20px
- Label: PingFang TC 12px/16px Regular, inputText token
- Input: PingFang TC 14px/20px Regular, inputText token
- Hint: SF Pro 14px/16px Regular, textSecondary / inputTextError token
- Cursor: 2px wide, 24px tall, contentAccent
- Active/Typing border: 2px inputBorderActive
- Error-Active border: 2px inputBorderError
- Function area: Error icon (20px), Clear icon (20px), USpaceButton (Small/Primary)

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
