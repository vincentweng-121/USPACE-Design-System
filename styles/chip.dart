import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── Chip Style ─────────────────────────────────────────────
/// 容器的形狀。與 level 是兩個獨立的維度：style 決定有沒有底、有沒有框，
/// level 只在 filled 時決定底色。
enum USpaceChipStyle {
  /// Filled: 依 level 上底色，無描邊
  filled,

  /// Outlined: 透明底 + contentSecondary 描邊，不吃 level
  outlined,

  /// Text: 無底無框，只有文字，不吃 level。內距與 filled 相同
  text,
}

// ── Chip Level ─────────────────────────────────────────────
/// 只在 style 為 filled 時生效，決定容器底色。
enum USpaceChipLevel {
  /// Accent: chipBgAccent bg
  accent,

  /// Primary: chipBgPrimary bg
  primary,

  /// Secondary: chipBgSecondary bg
  secondary,
}

// ── Chip Size ──────────────────────────────────────────────
enum USpaceChipSize {
  /// Regular: py=1, with icon pl=8 pr=12 gap=2, without icon px=12
  /// Typography: labelM (14px/20px Regular)
  regular,

  /// Small: py=1, px=8。不支援 leading icon，傳了也會被忽略
  /// Typography: 10px/14px Semibold (displayXXS — not in TypographyExtension)
  small,
}

// ── USpaceChip ─────────────────────────────────────────────
/// USPACE Design System Chip component.
///
/// 來源：Figma node 1327:19329
///
/// 支援 3 styles × 3 levels × 2 sizes，可選 leading icon。
///
/// Token mapping:
///   filled   + accent    → bg = chipBgAccent
///   filled   + primary   → bg = chipBgPrimary
///   filled   + secondary → bg = chipBgSecondary
///   outlined             → 透明底 + border = contentSecondary
///   text                 → 無底無框
///
/// 文字一律 textPrimary，icon 一律 contentPrimary，不隨 style 或 level 改變。
///
/// Layout:
///   Regular: rounded=100, labelM (14px/20px)
///     - with icon: pl=8 pr=12 gap=2, icon 20px
///     - without icon: px=12
///   Small: rounded=100, 10px/14px Semibold, px=8
///     - 不支援 leading icon（Figma 只有 regular 的 icon 版本）
///
/// ⚠️ Chip 為純展示標籤，不可點擊、不接受 onTap。
/// 若需要可點擊的 chip 行為，請使用 USpaceTab (filter / input type)。
///
/// 2026-08-13 經使用者確認重整：原本 level 裡的 outline 其實是形狀而非顏色，
/// 已拆成獨立的 style 維度並補上 text。outlined 由品牌漸層改為中性色。
/// Figma 尚無對應設計稿。
class USpaceChip extends StatelessWidget {
  const USpaceChip({
    super.key,
    required this.label,
    this.style = USpaceChipStyle.filled,
    this.level = USpaceChipLevel.accent,
    this.size = USpaceChipSize.regular,
    this.leadingIcon,
  });

  /// 顯示文字
  final String label;

  /// 容器形狀
  final USpaceChipStyle style;

  /// 容器底色，只在 style 為 filled 時生效
  final USpaceChipLevel level;

  /// Chip 尺寸
  final USpaceChipSize size;

  /// 前置圖示 widget（建議 20×20）。size 為 small 時忽略
  final Widget? leadingIcon;

  /// small 沒有 icon 版本，傳了也不畫——否則會做出 Figma 上不存在的組合
  bool get _showsIcon => leadingIcon != null && size != USpaceChipSize.small;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    // Chip 為純展示標籤，不包裹 GestureDetector
    return Container(
      padding: _padding,
      decoration: BoxDecoration(
        color: style == USpaceChipStyle.filled ? _bgColor(colors) : null,
        borderRadius: BorderRadius.circular(USpaceRadius.full),
        border: style == USpaceChipStyle.outlined
            ? Border.all(color: colors.contentSecondary)
            : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (_showsIcon) ...[
            IconTheme(
              data: IconThemeData(
                color: _iconColor(colors),
                size: 20,
              ),
              child: leadingIcon!,
            ),
            const SizedBox(width: USpaceSpacing.spacer2),
          ],
          Text(label, style: _textStyle(colors, typo)),
        ],
      ),
    );
  }

  // Figma 元件特定值：vertical 1px 無對應 spacing token
  EdgeInsets get _padding {
    switch (size) {
      case USpaceChipSize.regular:
        return _showsIcon
            ? const EdgeInsets.only(left: USpaceSpacing.spacer8, right: USpaceSpacing.spacer12, top: 1, bottom: 1)
            : const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer12, vertical: 1);
      case USpaceChipSize.small:
        // icon 已被忽略，左右一律 8
        return const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8, vertical: 1);
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
    }
  }

  Color _iconColor(USpaceColorsExtension colors) => colors.contentPrimary;

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
}
