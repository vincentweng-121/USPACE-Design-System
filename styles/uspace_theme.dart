import 'package:flutter/material.dart';

import 'typography_extension.dart';
import 'uspace_colors_extension.dart';

/// USPACE Design System 主題組裝入口
///
/// 把所有 ThemeExtension 一次接上 [ThemeData]，
/// App 端不需要自行組 extensions 清單：
///
/// ```dart
/// MaterialApp(
///   theme: USpaceTheme.light,
///   darkTheme: USpaceTheme.dark,
///   themeMode: ThemeMode.system,
/// )
/// ```
///
/// 接上後即可使用 `context.uColors.*` 與 `context.typography.*`。
///
/// 若 App 已有自己的 [ThemeData]，改用 [extensionsFor] 只取 extension 清單：
///
/// ```dart
/// ThemeData(
///   // ...既有設定
///   extensions: USpaceTheme.extensionsFor(Brightness.light),
/// )
/// ```
class USpaceTheme {
  USpaceTheme._();

  /// 中文預設字體。SF Pro 樣式在 typography token 內個別指定。
  static const defaultFontFamily = 'PingFangTC';

  static ThemeData get light => _build(Brightness.light);

  static ThemeData get dark => _build(Brightness.dark);

  /// 只取 ThemeExtension 清單，供已有 ThemeData 的 App 併入。
  static List<ThemeExtension> extensionsFor(Brightness brightness) {
    final isLight = brightness == Brightness.light;
    return [
      isLight ? USpaceColorsExtension.light : USpaceColorsExtension.dark,
      isLight ? AppTypographyExtension.light : AppTypographyExtension.dark,
    ];
  }

  static ThemeData _build(Brightness brightness) {
    final colors = brightness == Brightness.light
        ? USpaceColorsExtension.light
        : USpaceColorsExtension.dark;

    return ThemeData(
      brightness: brightness,
      fontFamily: defaultFontFamily,
      scaffoldBackgroundColor: colors.pagePrimary,
      canvasColor: colors.pagePrimary,
      dividerColor: colors.borderDivider,
      extensions: extensionsFor(brightness),
    );
  }
}
