/// USPACE Design System — 統一進入點
///
/// 前端只需要這一行：
///
/// ```dart
/// import 'package:<your_app>/styles/uspace_design_system.dart';
/// ```
///
/// 即可取得所有 token 與元件。
///
/// ─── 檔案分類 ────────────────────────────────────────────
/// Token（由 tokens/*.json 產生，請勿手改）
///   uspace_palette.dart            基底色票
///   uspace_colors_extension.dart   語意色（light / dark）
///   typography_extension.dart      字體樣式
///   spacing_extension.dart         間距
///   radius_extension.dart          圓角
///   glass_extension.dart           Glass 效果
///   elevation_extension.dart       陰影尺寸
///
/// 主題
///   uspace_theme.dart              USpaceTheme.light / .dark
///
/// 元件
///   button / chip / dropdown_menu / header / list / modal /
///   tab / text_area / text_field / toggle
library;

// ─── Tokens ─────────────────────────────────────────────
export 'elevation_extension.dart';
export 'glass_extension.dart';
export 'radius_extension.dart';
export 'spacing_extension.dart';
export 'touch_target.dart';
export 'typography_extension.dart';
export 'uspace_colors_extension.dart';
export 'uspace_palette.dart';

// ─── Theme ──────────────────────────────────────────────
export 'uspace_theme.dart';

// ─── Components ─────────────────────────────────────────
export 'button.dart';
export 'chip.dart';
export 'dropdown_menu.dart';
export 'header.dart';
export 'list.dart';
export 'modal.dart';
export 'tab.dart';
export 'text_area.dart';
export 'text_field.dart';
export 'toggle.dart';
