# tokens/ — Design token 單一真實來源

這個目錄是**唯一**可以手改 token 的地方。
`styles/` 的 token Dart 檔與 `website/src/tokens/` 的 TS 檔都由此產生，
檔頭標有 `⚠️ GENERATED FILE`，直接改會在下次產生時被覆蓋，CI 也會擋下。

## 工作流程

```bash
# 1. 改 tokens/ 底下的 JSON
# 2. 重新產生
npm run gen:tokens

# 3.（CI 會自動跑）確認沒有漂移
npm run check:tokens
```

## 檔案

| 檔案 | 內容 | 產出 |
|------|------|------|
| `palette.json` | 基底色票的 hex 值 | `uspace_palette.dart`、`colors.ts` |
| `semantic-colors.json` | 語意色 token 的 light / dark 對應 | `uspace_colors_extension.dart`、`colors.ts` |
| `gradients.json` | 漸層 token | `uspace_colors_extension.dart` |
| `typography.json` | 字體樣式 | `typography_extension.dart`、`typography.ts` |
| `scalars.json` | spacing / radius / glass | `spacing_extension.dart`、`radius_extension.dart`、`glass_extension.dart`、`scalars.ts` |

## 常見操作

**改一個色票的 hex** — 只改 `palette.json` 對應的 `value`。
所有引用該色票的語意 token、Dart、網站會一起更新。

**新增一個語意色 token** — 在 `semantic-colors.json` 對應 group 加一行：

```json
"contentBrandNew": { "light": "neonLime600", "dark": "white" }
```

`light` / `dark` 的值必須是 `palette.json` 裡存在的 token 名，
不存在時產生器會直接報錯。建構子、欄位、copyWith、lerp 全部自動補齊。

**新增字體樣式** — 在 `typography.json` 的 `styles` 加一筆，
`weight` 只能是 `weights` 裡定義過的鍵。

## 規則

- `palette.json` 以外的地方不得出現 hex 值
- 語意 token 一律引用 palette token 名，不寫死顏色
- 發現 Figma 有新色票時先通知使用者，不自行加進 palette
- fontWeight 照 Figma JSON 數值，不依語意推斷
