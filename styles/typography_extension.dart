/// ⚠️ BREAKING CHANGE
/// 命名：notoH16/poppinsP14 → headingL/bodyM
/// 字體：NotoSansTC/Poppins → PingFang TC
/// 所有引用需全專案 find & replace

import 'package:flutter/material.dart';
import 'uspace_palette.dart';

class AppTypographyExtension extends ThemeExtension<AppTypographyExtension> {
  const AppTypographyExtension({
    required this.textColor,
    required this.textSecondaryColor,
    required this.headingL,
    required this.headingM,
    required this.bodyL,
    required this.bodyM,
    required this.bodyS,
    required this.captionS,
    required this.displayM,
    required this.displayS,
    required this.labelL,
    required this.labelM,
    required this.labelS,
    required this.labelXs,
    required this.sfHeadingL,
    required this.sfHeadingM,
    required this.sfBodyL,
    required this.sfBodyM,
    required this.sfBodyS,
    required this.sfCaptionS,
    required this.sfDisplayM,
    required this.sfDisplayS,
    required this.sfLabelL,
    required this.sfLabelM,
    required this.sfLabelS,
    required this.sfLabelXs,
  });

  // ─── FontWeight constants ────────────────────────
  static const bold    = FontWeight.bold;
  static const medium  = FontWeight.w500;
  static const regular = FontWeight.w400;

  // ─── Color fields (不動，等重構) ─────────────────
  final Color textColor;
  final Color textSecondaryColor;

  // ─── PingFang TC Text Styles ─────────────────────
  final TextStyle headingL;   // 26px / 34 / PageTitle
  final TextStyle headingM;   // 22px / 30 / ModalTitle
  final TextStyle bodyL;      // 18px / 26
  final TextStyle bodyM;      // 16px / 24
  final TextStyle bodyS;      // 14px / 20
  final TextStyle captionS;   // 12px / 16
  final TextStyle displayM;   // 18px / 26 / medium weight
  final TextStyle displayS;   // 14px / 20 / medium weight
  final TextStyle labelL;     // 16px / 24 / Button
  final TextStyle labelM;     // 14px / 20 / 文字按鈕
  final TextStyle labelS;     // 12px / 16
  final TextStyle labelXs;    // 10px / 14 / Tab

  // ─── SF Pro Text Styles ──────────────────────────
  final TextStyle sfHeadingL;  // 26px / 34 / PageTitle
  final TextStyle sfHeadingM;  // 22px / 30 / ModalTitle
  final TextStyle sfBodyL;     // 18px / 26
  final TextStyle sfBodyM;     // 16px / 24
  final TextStyle sfBodyS;     // 14px / 20
  final TextStyle sfCaptionS;  // 14px / 16 (fontSize=14，與 PingFang 不同)
  final TextStyle sfDisplayM;  // 20px / 26 / medium weight (fontSize=20，與 PingFang 不同)
  final TextStyle sfDisplayS;  // 14px / 20 / medium weight
  final TextStyle sfLabelL;    // 16px / 24 / Button
  final TextStyle sfLabelM;    // 14px / 20 / 文字按鈕
  final TextStyle sfLabelS;    // 12px / 16
  final TextStyle sfLabelXs;   // 10px / 14 / Tab

  // ─── PingFang TC Secondary Variants ─────────────
  TextStyle get headingLSecondary  => headingL.copyWith(color: textSecondaryColor);
  TextStyle get headingMSecondary  => headingM.copyWith(color: textSecondaryColor);
  TextStyle get bodyLSecondary     => bodyL.copyWith(color: textSecondaryColor);
  TextStyle get bodyMSecondary     => bodyM.copyWith(color: textSecondaryColor);
  TextStyle get bodySSecondary     => bodyS.copyWith(color: textSecondaryColor);
  TextStyle get captionSSecondary  => captionS.copyWith(color: textSecondaryColor);
  TextStyle get displayMSecondary  => displayM.copyWith(color: textSecondaryColor);
  TextStyle get displaySSecondary  => displayS.copyWith(color: textSecondaryColor);
  TextStyle get labelLSecondary    => labelL.copyWith(color: textSecondaryColor);
  TextStyle get labelMSecondary    => labelM.copyWith(color: textSecondaryColor);
  TextStyle get labelSSecondary    => labelS.copyWith(color: textSecondaryColor);
  TextStyle get labelXsSecondary   => labelXs.copyWith(color: textSecondaryColor);

  // ─── SF Pro Secondary Variants ───────────────────
  TextStyle get sfHeadingLSecondary  => sfHeadingL.copyWith(color: textSecondaryColor);
  TextStyle get sfHeadingMSecondary  => sfHeadingM.copyWith(color: textSecondaryColor);
  TextStyle get sfBodyLSecondary     => sfBodyL.copyWith(color: textSecondaryColor);
  TextStyle get sfBodyMSecondary     => sfBodyM.copyWith(color: textSecondaryColor);
  TextStyle get sfBodySSecondary     => sfBodyS.copyWith(color: textSecondaryColor);
  TextStyle get sfCaptionSSecondary  => sfCaptionS.copyWith(color: textSecondaryColor);
  TextStyle get sfDisplayMSecondary  => sfDisplayM.copyWith(color: textSecondaryColor);
  TextStyle get sfDisplaySSecondary  => sfDisplayS.copyWith(color: textSecondaryColor);
  TextStyle get sfLabelLSecondary    => sfLabelL.copyWith(color: textSecondaryColor);
  TextStyle get sfLabelMSecondary    => sfLabelM.copyWith(color: textSecondaryColor);
  TextStyle get sfLabelSSecondary    => sfLabelS.copyWith(color: textSecondaryColor);
  TextStyle get sfLabelXsSecondary   => sfLabelXs.copyWith(color: textSecondaryColor);

  // ─── Light Theme ────────────────────────────────
  static const light = AppTypographyExtension(
    textColor:          USpacePalette.grey800,
    textSecondaryColor: USpacePalette.grey600,
    headingL:  TextStyle(fontFamily: 'PingFangTC', fontSize: 26, fontWeight: regular, height: 34 / 26),
    headingM:  TextStyle(fontFamily: 'PingFangTC', fontSize: 22, fontWeight: regular, height: 30 / 22),
    bodyL:     TextStyle(fontFamily: 'PingFangTC', fontSize: 18, fontWeight: regular, height: 26 / 18),
    bodyM:     TextStyle(fontFamily: 'PingFangTC', fontSize: 16, fontWeight: regular, height: 24 / 16),
    bodyS:     TextStyle(fontFamily: 'PingFangTC', fontSize: 14, fontWeight: regular, height: 20 / 14),
    captionS:  TextStyle(fontFamily: 'PingFangTC', fontSize: 12, fontWeight: regular, height: 16 / 12),
    displayM:  TextStyle(fontFamily: 'PingFangTC', fontSize: 18, fontWeight: medium,  height: 26 / 18),
    displayS:  TextStyle(fontFamily: 'PingFangTC', fontSize: 14, fontWeight: medium,  height: 20 / 14),
    labelL:    TextStyle(fontFamily: 'PingFangTC', fontSize: 16, fontWeight: regular, height: 24 / 16),
    labelM:    TextStyle(fontFamily: 'PingFangTC', fontSize: 14, fontWeight: regular, height: 20 / 14),
    labelS:    TextStyle(fontFamily: 'PingFangTC', fontSize: 12, fontWeight: regular, height: 16 / 12),
    labelXs:   TextStyle(fontFamily: 'PingFangTC', fontSize: 10, fontWeight: regular, height: 14 / 10),
    sfHeadingL: TextStyle(fontFamily: 'SF Pro', fontSize: 26, fontWeight: regular, height: 34 / 26),
    sfHeadingM: TextStyle(fontFamily: 'SF Pro', fontSize: 22, fontWeight: regular, height: 30 / 22),
    sfBodyL:    TextStyle(fontFamily: 'SF Pro', fontSize: 18, fontWeight: regular, height: 26 / 18),
    sfBodyM:    TextStyle(fontFamily: 'SF Pro', fontSize: 16, fontWeight: regular, height: 24 / 16),
    sfBodyS:    TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: regular, height: 20 / 14),
    sfCaptionS: TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: regular, height: 16 / 14),
    sfDisplayM: TextStyle(fontFamily: 'SF Pro', fontSize: 20, fontWeight: medium,  height: 26 / 20),
    sfDisplayS: TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: medium,  height: 20 / 14),
    sfLabelL:   TextStyle(fontFamily: 'SF Pro', fontSize: 16, fontWeight: regular, height: 24 / 16),
    sfLabelM:   TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: regular, height: 20 / 14),
    sfLabelS:   TextStyle(fontFamily: 'SF Pro', fontSize: 12, fontWeight: regular, height: 16 / 12),
    sfLabelXs:  TextStyle(fontFamily: 'SF Pro', fontSize: 10, fontWeight: regular, height: 14 / 10),
  );

  // ─── Dark Theme ─────────────────────────────────
  static const dark = AppTypographyExtension(
    textColor:          USpacePalette.white,
    textSecondaryColor: USpacePalette.grey200,
    headingL:  TextStyle(fontFamily: 'PingFangTC', fontSize: 26, fontWeight: regular, height: 34 / 26),
    headingM:  TextStyle(fontFamily: 'PingFangTC', fontSize: 22, fontWeight: regular, height: 30 / 22),
    bodyL:     TextStyle(fontFamily: 'PingFangTC', fontSize: 18, fontWeight: regular, height: 26 / 18),
    bodyM:     TextStyle(fontFamily: 'PingFangTC', fontSize: 16, fontWeight: regular, height: 24 / 16),
    bodyS:     TextStyle(fontFamily: 'PingFangTC', fontSize: 14, fontWeight: regular, height: 20 / 14),
    captionS:  TextStyle(fontFamily: 'PingFangTC', fontSize: 12, fontWeight: regular, height: 16 / 12),
    displayM:  TextStyle(fontFamily: 'PingFangTC', fontSize: 18, fontWeight: medium,  height: 26 / 18),
    displayS:  TextStyle(fontFamily: 'PingFangTC', fontSize: 14, fontWeight: medium,  height: 20 / 14),
    labelL:    TextStyle(fontFamily: 'PingFangTC', fontSize: 16, fontWeight: regular, height: 24 / 16),
    labelM:    TextStyle(fontFamily: 'PingFangTC', fontSize: 14, fontWeight: regular, height: 20 / 14),
    labelS:    TextStyle(fontFamily: 'PingFangTC', fontSize: 12, fontWeight: regular, height: 16 / 12),
    labelXs:   TextStyle(fontFamily: 'PingFangTC', fontSize: 10, fontWeight: regular, height: 14 / 10),
    sfHeadingL: TextStyle(fontFamily: 'SF Pro', fontSize: 26, fontWeight: regular, height: 34 / 26),
    sfHeadingM: TextStyle(fontFamily: 'SF Pro', fontSize: 22, fontWeight: regular, height: 30 / 22),
    sfBodyL:    TextStyle(fontFamily: 'SF Pro', fontSize: 18, fontWeight: regular, height: 26 / 18),
    sfBodyM:    TextStyle(fontFamily: 'SF Pro', fontSize: 16, fontWeight: regular, height: 24 / 16),
    sfBodyS:    TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: regular, height: 20 / 14),
    sfCaptionS: TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: regular, height: 16 / 14),
    sfDisplayM: TextStyle(fontFamily: 'SF Pro', fontSize: 20, fontWeight: medium,  height: 26 / 20),
    sfDisplayS: TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: medium,  height: 20 / 14),
    sfLabelL:   TextStyle(fontFamily: 'SF Pro', fontSize: 16, fontWeight: regular, height: 24 / 16),
    sfLabelM:   TextStyle(fontFamily: 'SF Pro', fontSize: 14, fontWeight: regular, height: 20 / 14),
    sfLabelS:   TextStyle(fontFamily: 'SF Pro', fontSize: 12, fontWeight: regular, height: 16 / 12),
    sfLabelXs:  TextStyle(fontFamily: 'SF Pro', fontSize: 10, fontWeight: regular, height: 14 / 10),
  );

  @override
  AppTypographyExtension copyWith({
    Color?     textColor,
    Color?     textSecondaryColor,
    TextStyle? headingL,
    TextStyle? headingM,
    TextStyle? bodyL,
    TextStyle? bodyM,
    TextStyle? bodyS,
    TextStyle? captionS,
    TextStyle? displayM,
    TextStyle? displayS,
    TextStyle? labelL,
    TextStyle? labelM,
    TextStyle? labelS,
    TextStyle? labelXs,
    TextStyle? sfHeadingL,
    TextStyle? sfHeadingM,
    TextStyle? sfBodyL,
    TextStyle? sfBodyM,
    TextStyle? sfBodyS,
    TextStyle? sfCaptionS,
    TextStyle? sfDisplayM,
    TextStyle? sfDisplayS,
    TextStyle? sfLabelL,
    TextStyle? sfLabelM,
    TextStyle? sfLabelS,
    TextStyle? sfLabelXs,
  }) {
    return AppTypographyExtension(
      textColor:          textColor          ?? this.textColor,
      textSecondaryColor: textSecondaryColor ?? this.textSecondaryColor,
      headingL:           headingL           ?? this.headingL,
      headingM:           headingM           ?? this.headingM,
      bodyL:              bodyL              ?? this.bodyL,
      bodyM:              bodyM              ?? this.bodyM,
      bodyS:              bodyS              ?? this.bodyS,
      captionS:           captionS           ?? this.captionS,
      displayM:           displayM           ?? this.displayM,
      displayS:           displayS           ?? this.displayS,
      labelL:             labelL             ?? this.labelL,
      labelM:             labelM             ?? this.labelM,
      labelS:             labelS             ?? this.labelS,
      labelXs:            labelXs            ?? this.labelXs,
      sfHeadingL:         sfHeadingL         ?? this.sfHeadingL,
      sfHeadingM:         sfHeadingM         ?? this.sfHeadingM,
      sfBodyL:            sfBodyL            ?? this.sfBodyL,
      sfBodyM:            sfBodyM            ?? this.sfBodyM,
      sfBodyS:            sfBodyS            ?? this.sfBodyS,
      sfCaptionS:         sfCaptionS         ?? this.sfCaptionS,
      sfDisplayM:         sfDisplayM         ?? this.sfDisplayM,
      sfDisplayS:         sfDisplayS         ?? this.sfDisplayS,
      sfLabelL:           sfLabelL           ?? this.sfLabelL,
      sfLabelM:           sfLabelM           ?? this.sfLabelM,
      sfLabelS:           sfLabelS           ?? this.sfLabelS,
      sfLabelXs:          sfLabelXs          ?? this.sfLabelXs,
    );
  }

  @override
  AppTypographyExtension lerp(AppTypographyExtension? other, double t) {
    if (other is! AppTypographyExtension) return this;
    return AppTypographyExtension(
      textColor:          Color.lerp(textColor,          other.textColor,          t)!,
      textSecondaryColor: Color.lerp(textSecondaryColor, other.textSecondaryColor, t)!,
      headingL:           TextStyle.lerp(headingL,           other.headingL,           t)!,
      headingM:           TextStyle.lerp(headingM,           other.headingM,           t)!,
      bodyL:              TextStyle.lerp(bodyL,              other.bodyL,              t)!,
      bodyM:              TextStyle.lerp(bodyM,              other.bodyM,              t)!,
      bodyS:              TextStyle.lerp(bodyS,              other.bodyS,              t)!,
      captionS:           TextStyle.lerp(captionS,           other.captionS,           t)!,
      displayM:           TextStyle.lerp(displayM,           other.displayM,           t)!,
      displayS:           TextStyle.lerp(displayS,           other.displayS,           t)!,
      labelL:             TextStyle.lerp(labelL,             other.labelL,             t)!,
      labelM:             TextStyle.lerp(labelM,             other.labelM,             t)!,
      labelS:             TextStyle.lerp(labelS,             other.labelS,             t)!,
      labelXs:            TextStyle.lerp(labelXs,            other.labelXs,            t)!,
      sfHeadingL:         TextStyle.lerp(sfHeadingL,         other.sfHeadingL,         t)!,
      sfHeadingM:         TextStyle.lerp(sfHeadingM,         other.sfHeadingM,         t)!,
      sfBodyL:            TextStyle.lerp(sfBodyL,            other.sfBodyL,            t)!,
      sfBodyM:            TextStyle.lerp(sfBodyM,            other.sfBodyM,            t)!,
      sfBodyS:            TextStyle.lerp(sfBodyS,            other.sfBodyS,            t)!,
      sfCaptionS:         TextStyle.lerp(sfCaptionS,         other.sfCaptionS,         t)!,
      sfDisplayM:         TextStyle.lerp(sfDisplayM,         other.sfDisplayM,         t)!,
      sfDisplayS:         TextStyle.lerp(sfDisplayS,         other.sfDisplayS,         t)!,
      sfLabelL:           TextStyle.lerp(sfLabelL,           other.sfLabelL,           t)!,
      sfLabelM:           TextStyle.lerp(sfLabelM,           other.sfLabelM,           t)!,
      sfLabelS:           TextStyle.lerp(sfLabelS,           other.sfLabelS,           t)!,
      sfLabelXs:          TextStyle.lerp(sfLabelXs,          other.sfLabelXs,          t)!,
    );
  }
}

extension AppTypographyExtensionContext on BuildContext {
  AppTypographyExtension get typography =>
      Theme.of(this).extension<AppTypographyExtension>() ??
      AppTypographyExtension.light;
}
