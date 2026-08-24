import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'button.dart';
import 'toggle.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── Trailing type ─────────────────────────────────────────────
enum USpaceListTrailing { none, button, toggle, value, selectable }

// ── List Heading ──────────────────────────────────────────────
/// 列表分組標題。pt: 32, pb: 8，bodyS textSecondary。
class USpaceListHeading extends StatelessWidget {
  const USpaceListHeading({
    super.key,
    required this.title,
    this.trailingLabel,
  });

  final String title;
  final String? trailingLabel;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo   = context.typography;

    return Padding(
      padding: const EdgeInsets.only(top: USpaceSpacing.spacer32, bottom: USpaceSpacing.spacer8),
      child: Row(
        children: [
          Expanded(
            child: Text(title, style: typo.bodyS.copyWith(color: colors.textSecondary)),
          ),
          if (trailingLabel != null)
            Text(trailingLabel!, style: typo.captionS.copyWith(color: colors.textSecondary)),
        ],
      ),
    );
  }
}

// ── List Item ─────────────────────────────────────────────────
/// 通用列表項目。
///
/// [leading] 左側任意 Widget，呼叫端決定尺寸與形狀。
/// icon 庫建立後，直接傳入 Icon(USpaceIcons.xxx)，元件不需修改。
///
/// [hints]    1-2 行 captionS 輔助文字。與 [subtitle] 互斥。
/// [subtitle] bodyS 副標題。與 [hints] 互斥。
class USpaceListItem extends StatelessWidget {
  const USpaceListItem({
    super.key,
    required this.leading,
    required this.title,
    this.subtitle,
    this.hints = const [],
    this.trailing = USpaceListTrailing.none,
    // button trailing
    this.buttonLabel,
    this.buttonStyle = USpaceButtonStyle.filled,
    this.onButtonPressed,
    // toggle trailing
    this.toggleValue = false,
    this.onToggleChanged,
    // value trailing
    this.valueText,
    // selectable trailing（tag + checkbox）
    this.tagLabel,
    this.isSelected = false,
    this.onSelectChanged,
    // common
    this.showTopDivider = false,
    this.onTap,
  });

  /// 左側任意 Widget（呼叫端決定形狀：icon 32px / 圓角方圖 60px / 圓形圖 56px）
  final Widget leading;
  final String title;
  final String? subtitle;
  final List<String> hints;
  final USpaceListTrailing trailing;

  final String? buttonLabel;
  final USpaceButtonStyle buttonStyle;
  final VoidCallback? onButtonPressed;

  final bool toggleValue;
  final ValueChanged<bool>? onToggleChanged;

  final String? valueText;

  final String? tagLabel;
  final bool isSelected;
  final ValueChanged<bool>? onSelectChanged;

  final bool showTopDivider;
  final VoidCallback? onTap;

  Widget _buildContent(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: typo.bodyL.copyWith(color: colors.textPrimary)),
        if (subtitle != null) ...[
          const SizedBox(height: USpaceSpacing.spacer4),
          Text(subtitle!, style: typo.bodyS.copyWith(color: colors.textSecondary)),
        ],
        for (final hint in hints) ...[
          const SizedBox(height: USpaceSpacing.spacer4),
          Text(hint, style: typo.captionS.copyWith(color: colors.textSecondary)),
        ],
      ],
    );
  }

  Widget _buildTrailing(
    BuildContext context,
    USpaceColorsExtension colors,
    AppTypographyExtension typo,
  ) {
    return switch (trailing) {
      USpaceListTrailing.none => const SizedBox.shrink(),
      USpaceListTrailing.button => USpaceButton(
        label: buttonLabel ?? '',
        style: buttonStyle,
        size: USpaceButtonSize.small,
        onPressed: onButtonPressed,
      ),
      USpaceListTrailing.toggle => USpaceToggle(
        value: toggleValue,
        onChanged: onToggleChanged,
      ),
      USpaceListTrailing.value => Text(
        valueText ?? '',
        style: typo.bodyS.copyWith(color: colors.textSecondary),
        textAlign: TextAlign.right,
      ),
      USpaceListTrailing.selectable => Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (tagLabel != null) ...[
            Container(
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer12, vertical: 1),
              decoration: BoxDecoration(
                color: colors.actionTertiaryBg,
                borderRadius: BorderRadius.circular(USpaceRadius.full),
              ),
              child: Text(tagLabel!, style: typo.labelM.copyWith(color: colors.textPrimary)),
            ),
            const SizedBox(width: USpaceSpacing.spacer8),
          ],
          GestureDetector(
            onTap: onSelectChanged != null ? () => onSelectChanged!(!isSelected) : null,
            child: Icon(
              isSelected ? Icons.check_circle_rounded : Icons.radio_button_unchecked,
              size: 28,
              color: isSelected ? colors.contentAccent : colors.actionSecondaryContent,
            ),
          ),
        ],
      ),
    };
  }

  @override
  Widget build(BuildContext context) {
    final colors  = context.uColors;
    final typo    = context.typography;
    final divider = Divider(height: 1, thickness: 1, color: colors.borderDivider);

    return Column(
      children: [
        if (showTopDivider) divider,
        InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: USpaceSpacing.spacer12),
                  child: leading,
                ),
                Expanded(child: _buildContent(colors, typo)),
                if (trailing != USpaceListTrailing.none) ...[
                  const SizedBox(width: USpaceSpacing.margin),
                  _buildTrailing(context, colors, typo),
                ],
              ],
            ),
          ),
        ),
        divider,
      ],
    );
  }
}
