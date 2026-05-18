// SKILL_TEMPLATE.dart
// Claude Code 產出時必須遵守此結構，不得自行增減格式。
//
// ── 色彩任務（uspace_palette.dart）產出規則 ──────────────────
// 1. 只新增常量，不修改現有常量的 hex 值
// 2. 依色系分組，加上 ─── 分隔線與群組名稱
// 3. 命名與 Figma token name 一致（如 lime700、gray350）
// 4. 帶透明度的色票用具名常量（如 transparentBlack50）
// 5. 新增後列出清單通知使用者，等待確認
//
// 範例新增格式：
// static const lime700 = Color(0xFFBBCC00);  // 新增自 Figma: Lime/700
//
// ── 語意色彩任務（uspace_colors_extension.dart）產出規則 ──────
// 1. light 和 dark 兩組都必須完整更新，不能只改其中一組
// 2. 所有值必須引用 USpacePalette 的常量，不直接寫 hex
// 3. 唯一例外：transparentBlack50 等具名透明度常量
// 4. 保留所有既有 token，不刪除任何欄位
// 5. copyWith 和 lerp 必須同步更新
//
// ── 字體任務（typography_extension.dart）產出規則 ─────────────
// 1. 命名規則：{fontFamily}{H/P}{fontSize}，例如 notoH16、poppinsP14
// 2. height 必須是 lineHeight / fontSize 的比值，不直接寫數字
// 3. fontWeight 使用常量：bold / medium / regular，不寫 FontWeight.w700
// 4. 不動 textColor 和 textSecondaryColor（等重構）
// 5. 新增字體樣式後同步更新 Secondary variants（如有需要）

// ── 重要：fontWeight 對應規則 ──────────────────────────────────
// JSON 數值 → Dart 常量，照抄不判斷，不依語意推斷
// 400 → regular
// 500 → medium
// 700 → bold
// 即使是 heading，JSON 寫 400 就用 regular，不自行改為 bold

// ── 重要：text vs content token 命名規則 ───────────────────────
// 全專案統一：
// - 文字（Text widget）→ 必須使用 /text 語意命名的 token
//   例：actionPrimaryTextAccent、textPrimary
// - 圖示（Icon widget）→ 必須使用 /content 語意命名的 token
//   例：actionPrimaryContentAccent、contentAccent
// 即使 text token 與 content token 的 hex 值相同，
// 在 colors extension 仍須分開定義兩個 token，
// 在元件 dart 檔中也必須各自引用對應語意的 token。
// 不得讓文字引用 content token，也不得讓 icon 引用 text token。
