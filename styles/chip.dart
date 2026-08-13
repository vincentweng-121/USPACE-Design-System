import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'uspace_palette.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── Chip Level ─────────────────────────────────────────────
enum USpaceChipLevel {
  /// Accent: chipBgAccent bg, textPrimary text
  accent,

  /// Primary: chipBgPrimary bg, textPrimary text
  primary,

  /// Secondary: chipBgSecondary bg, textPrimary text
  secondary,

  /// Outline: neonLime200 border, gradient text (neonLime200 → neonLime700)
  outline,
}

// ── Chip Size ──────────────────────────────────────────────
enum USpaceChipSize {
  /// Regular: py=1, with icon pl=8 pr=12 gap=2, without icon px=12
  /// Typography: labelM (14px/20px Regular)
  regular,

  /// Small: py=1, with icon pl=6 pr=8 gap=2, without icon px=8
  /// Typography: 10px/14px Semibold (displayXXS — not in TypographyExtension)
  small,
}

// ── USpaceChip ─────────────────────────────────────────────
/// USPACE Design System Chip component.
///
/// 來源：Figma node 1327:19329
///
/// 支援 4 levels × 2 sizes，可選 leading icon。
///
/// Token mapping:
///   Accent:    bg = chipBgAccent,    text = textPrimary
///   Primary:   bg = chipBgPrimary,   text = textPrimary
///   Secondary: bg = chipBgSecondary, text = textPrimary
///   Outline:   border = USpacePalette.neonLime200,
///              text = gradient (neonLime200 → neonLime700)
///
/// Layout:
///   Regular: rounded=100, labelM (14px/20px)
///     - with icon: pl=8 pr=12 gap=2, icon 20px
///     - without icon: px=12
///   Small: rounded=100, 10px/14px Semibold
///     - with icon: pl=6 pr=8 gap=2, icon 20px
///     - without icon: px=8
///
/// ⚠️ Chip 為純展示標籤，不可點擊、不接受 onTap。
/// 若需要可點擊的 chip 行為，請使用 USpaceTab (filter / input type)。
///
/// Outline gradient text: neonLime200 (#00EEB7) → neonLime700 (#B4E002)。
class USpaceChip extends StatelessWidget {
  const USpaceChip({
    super.key,
    required this.label,
    this.level = USpaceChipLevel.accent,
    this.size = USpaceChipSize.regular,
    this.leadingIcon,
  });

  /// 顯示文字
  final String label;

  /// Chip 層級
  final USpaceChipLevel level;

  /// Chip 尺寸
  final USpaceChipSize size;

  /// 前置圖示 widget（建議 20×20）
  final Widget? leadingIcon;

  // ── Outline gradient: neonLime200 → neonLime700 ──
  static const _outlineTextGradient = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [USpacePalette.neonLime200, USpacePalette.neonLime700],
  );

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    // Chip 為純展示標籤，不包裹 GestureDetector
    return Container(
      padding: _padding,
      decoration: BoxDecoration(
        color: level != USpaceChipLevel.outline ? _bgColor(colors) : null,
        borderRadius: BorderRadius.circular(USpaceRadius.full),
        // Outline chip border 直接使用 palette（品牌漸層色，無對應 semantic token）
        border: level == USpaceChipLevel.outline
            ? Border.all(color: USpacePalette.neonLime200)
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (leadingIcon != null) ...[
            IconTheme(
              data: IconThemeData(
                color: _iconColor(colors),
                size: 20,
              ),
              child: leadingIcon!,
            ),
            const SizedBox(width: USpaceSpacing.spacer2),
          ],
          level == USpaceChipLevel.outline
              ? _buildGradientText(typo)
              : Text(label, style: _textStyle(colors, typo)),
        ],
      ),
    );
  }

  // Figma 元件特定值：vertical 1px、small left 6px 無對應 spacing token
  EdgeInsets get _padding {
    final hasIcon = leadingIcon != null;
    switch (size) {
      case USpaceChipSize.regular:
        return hasIcon
            ? const EdgeInsets.only(left: USpaceSpacing.spacer8, right: USpaceSpacing.spacer12, top: 1, bottom: 1)
            : const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer12, vertical: 1);
      case USpaceChipSize.small:
        return hasIcon
            ? const EdgeInsets.only(left: 6, right: USpaceSpacing.spacer8, top: 1, bottom: 1)
            : const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8, vertical: 1);
    }
  }

  Color _bgColor(USpaceColorsExtension colors) {
    switch (level) {
      case USpaceChipLevel.accent:
        return colors.chipBgAccent;
      case USpaceChipLevel.primary:
        return colors.chipBgPrimary;
      case USpaceChipLevel.secondary:
        return colors.chipBgSecondary;
      case USpaceChipLevel.outline:
        return Colors.transparent;
    }
  }

  Color _iconColor(USpaceColorsExtension colors) {
    // Outline chip icon 直接使用 palette（品牌漸層色，無對應 semantic token）
    return level == USpaceChipLevel.outline
        ? USpacePalette.neonLime200
        : colors.contentPrimary;
  }

  TextStyle _textStyle(USpaceColorsExtension colors, AppTypographyExtension typo) {
    final color = colors.textPrimary;
    switch (size) {
      case USpaceChipSize.regular:
        return typo.labelM.copyWith(color: color);
      case USpaceChipSize.small:
        // displayXXS: 10px/14px Semibold — 不在 TypographyExtension 中
        return const TextStyle(
          fontFamily: 'PingFangTC',
          fontSize: 10,
          fontWeight: AppTypographyExtension.semibold,
          height: 14 / 10,
        ).copyWith(color: color);
    }
  }

  Widget _buildGradientText(AppTypographyExtension typo) {
    final style = size == USpaceChipSize.regular
        ? typo.labelM
        : const TextStyle(
            fontFamily: 'PingFangTC',
            fontSize: 10,
            fontWeight: AppTypographyExtension.semibold,
            height: 14 / 10,
          );

    return ShaderMask(
      shaderCallback: (bounds) => _outlineTextGradient.createShader(bounds),
      blendMode: BlendMode.srcIn,
      child: Text(label, style: style),
    );
  }
}
