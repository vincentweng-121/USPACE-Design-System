// ⚠️ GENERATED FILE — 請勿手動編輯
// 來源：tokens/palette.json
// 重新產生：npm run gen:tokens

import 'dart:ui';

/// USPACE Core Color Palette
///
/// 基底色票，所有 hex 值集中在此。
/// 語意色票 [USpaceColorsExtension] 引用此處的常量。
/// 設計稿變更色值時，只需修改 tokens/palette.json。
///
/// 命名規則：與 Figma ColorPalette JSON token name 一致。
abstract class USpacePalette {
  USpacePalette._();

  // ─── Black & White ─────────────────────────────
  static const black       = Color(0xFF000000);
  static const uspaceBlack = Color(0xFF000000); // project/uspace-black
  static const white       = Color(0xFFFFFFFF);

  // ─── Transparent ───────────────────────────────
  static const transparentBlack10   = Color(0x1A000000); // black @ 10%
  static const transparentBlack40   = Color(0x66000000); // black @ 40%
  static const transparentBlack50   = Color(0x80000000); // black @ 50%
  static const transparentWhite5    = Color(0x0DFFFFFF); // white @ 5%
  static const transparentWhite10   = Color(0x1AFFFFFF); // white @ 10%
  static const transparentWhite50   = Color(0x80FFFFFF); // white @ 50%
  static const transparentWhite70   = Color(0xB3FFFFFF); // white @ 70%
  static const transparentWhite80   = Color(0xCCFFFFFF); // white @ 80%
  static const transparentGrey8003  = Color(0x08323237); // grey800 @ 3%
  static const transparentGrey80015 = Color(0x26323237); // grey800 @ 15%
  static const transparentGrey20020 = Color(0x33D9D9D9); // grey200 @ 20%

  // ─── NeonLime ──────────────────────────────────
  static const neonLime200 = Color(0xFF00EEB7);
  static const neonLime400 = Color(0xFF00F158);
  static const neonLime600 = Color(0xFFC3F400);
  static const neonLime700 = Color(0xFFB4E002);
  static const neonLime800 = Color(0xFFA7D100);
  static const neonLime900 = Color(0xFF74AA5A);

  // ─── Grey ──────────────────────────────────────
  static const grey50  = Color(0xFFF8F8F8);
  static const grey100 = Color(0xFFEEEEEE);
  static const grey200 = Color(0xFFD9D9D9);
  static const grey300 = Color(0xFFB4B4B4);
  static const grey400 = Color(0xFFA6A6A6);
  static const grey500 = Color(0xFF98989F);
  static const grey600 = Color(0xFF777777);
  static const grey700 = Color(0xFF606060);
  static const grey800 = Color(0xFF323237);
  static const grey900 = Color(0xFF1A1A1A);

  // ─── Blue ──────────────────────────────────────
  static const blue400 = Color(0xFFA1BDE5);
  static const blue600 = Color(0xFF5948D0);
  static const blue800 = Color(0xFF3F5CEE);

  // ─── Yellow ────────────────────────────────────
  static const yellow400 = Color(0xFFD1AF65);

  // ─── Red ───────────────────────────────────────
  static const red300 = Color(0xFFFF5151);
  static const red400 = Color(0xFFFF4A20);
  static const red500 = Color(0xFFF40000);
}
