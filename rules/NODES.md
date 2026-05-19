# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 讀取 DropdownMenu component，產出 dropdown_menu.dart
目標檔案：dropdown_menu.dart

## 指定 Node ID
| 名稱 | Node ID | 說明 |
|------|---------|------|
| DropdownMenu | 2141:11030 | DropdownMenu component set (5 states) |

## Component 結構（已確認）
- Status: Default / Complete / Selecting / Incomplete / Error
- Properties: hint, input, label, placeholder, showHint, status
- Trigger: height 48px, borderRadius 1000 (StadiumBorder), padding horizontal 20px
- Trailing: 16px ChevronDown icon, contentSecondary
- Label: PingFang TC 12px/16px Regular, inputText token, padding horizontal 8px
- Input: PingFang TC 14px/20px Regular, inputText token
- Placeholder: PingFang TC 14px/20px Regular, inputTextPlaceholder token
- Hint (normal): SF Pro 14px/16px Regular, textSecondary token
- Hint (error): SF Pro 14px/16px Regular, inputTextError token
- Panel (Selecting): bg inputBgDefault, borderRadius 20px, padding 16px 20px, gap 8px
- Panel items: PingFang TC 14px/20px, inputText
- Scrollbar: 4px wide, track pagePrimary, thumb borderDivider

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
