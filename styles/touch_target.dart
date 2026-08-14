// ⚠️ GENERATED FILE — 請勿手動編輯
// 來源：tokens/scalars.json
// 重新產生：npm run gen:tokens

/// USPACE Design System Touch Target Tokens
///
/// 可點擊元件的最小觸控尺寸。視覺高度小於這個值時，
/// 熱區要外擴補足——外觀不變，但版面上會佔到這個高度。
class USpaceTouchTarget {
  USpaceTouchTarget._();

  // ─── Touch target ──────────────────────────────
  /// 觸控目標最小高度。視覺尺寸小於此值的可點擊元件要外擴熱區補足。2026-08-14 經使用者確認由 44 改為 40，全元件通用
  static const double minTarget = 40;
}
