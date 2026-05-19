import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';

// ── Tab Type ──────────────────────────────────────────────────
enum USpaceTabType {
  /// Icon (20px) + Label, h=38, rounded=32
  tabIcon,

  /// Graphic/Product image (31.5px) + Label, h=38, rounded=32
  tabGraphic,

  /// Label only, h=38, rounded=32
  tab,

  /// Label only, h=32, rounded=1000, labelS (12px), maxWidth=132
  filter,

  /// Label + Close icon (16px), rounded=1000, outline border
  input,
}

// ── USpaceTab ─────────────────────────────────────────────────
/// USPACE Design System Tab / Chip component.
///
/// 來源：Figma node 972:7985
///
/// 支援 5 種 type × 2 種 state (Default / Active)。
///
/// Token mapping:
///   Default:
///     Tab/TabIcon/TabGraphic/Filter → bg: actionTertiaryBg, text: actionTertiaryContent
///     Input → bg: actionOutlineBg, text: actionOutlineContent, border: borderDivider
///   Active:
///     Tab/TabIcon/TabGraphic → bg: contentPrimary, text: textInverse
///     Filter → bg: actionPrimaryBg, text: textInverse
///     Input → N/A (no active state)
///
/// Layout:
///   Tab/TabIcon/TabGraphic: h=38, rounded=32
///   Filter: h=32, rounded=1000
///   Input: rounded=1000, py=8, pl=12, pr=8
class USpaceTab extends StatelessWidget {
  const USpaceTab({
    super.key,
    required this.label,
    this.type = USpaceTabType.tab,
    this.isActive = false,
    this.icon,
    this.graphic,
    this.onTap,
    this.onClose,
  });

  /// 顯示文字
  final String label;

  /// Tab 類型
  final USpaceTabType type;

  /// 是否為 active 狀態
  final bool isActive;

  /// Tab_icon 類型的前置圖示（建議 20×20）
  final Widget? icon;

  /// Tab_Graphic 類型的前置圖形（建議 ~32×32）
  final Widget? graphic;

  /// 點擊回呼
  final VoidCallback? onTap;

  /// Input 類型的關閉回呼
  final VoidCallback? onClose;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return GestureDetector(
      onTap: onTap,
      child: _buildContainer(colors, typo, context),
    );
  }

  Widget _buildContainer(
    USpaceColorsExtension colors,
    dynamic typo,
    BuildContext context,
  ) {
    switch (type) {
      case USpaceTabType.tabIcon:
        return _buildTabIcon(colors, typo);
      case USpaceTabType.tabGraphic:
        return _buildTabGraphic(colors, typo);
      case USpaceTabType.tab:
        return _buildTab(colors, typo);
      case USpaceTabType.filter:
        return _buildFilter(colors, typo);
      case USpaceTabType.input:
        return _buildInput(colors, typo);
    }
  }

  // ── Tab_icon: icon + label, h=38, rounded=32 ──
  Widget _buildTabIcon(USpaceColorsExtension colors, dynamic typo) {
    final bg = isActive ? colors.contentPrimary : colors.actionTertiaryBg;
    final textColor = isActive ? colors.textInverse : colors.actionTertiaryContent;

    return Container(
      height: 38,
      padding: const EdgeInsets.only(left: 12, right: 16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(32),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null)
            IconTheme(
              data: IconThemeData(color: textColor, size: 20),
              child: icon!,
            ),
          const SizedBox(width: 4),
          Text(
            label,
            style: typo.labelM.copyWith(color: textColor),
          ),
        ],
      ),
    );
  }

  // ── Tab_Graphic: graphic + label, h=38, rounded=32 ──
  Widget _buildTabGraphic(USpaceColorsExtension colors, dynamic typo) {
    final bg = isActive ? colors.contentPrimary : colors.actionTertiaryBg;
    final textColor = isActive ? colors.textInverse : colors.actionTertiaryContent;

    return Container(
      height: 38,
      padding: const EdgeInsets.only(left: 8, right: 16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(32),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (graphic != null)
            SizedBox(
              width: 31.5,
              height: 31.5,
              child: graphic!,
            ),
          Text(
            label,
            style: typo.labelM.copyWith(color: textColor),
          ),
        ],
      ),
    );
  }

  // ── Tab: label only, h=38, rounded=32 ──
  Widget _buildTab(USpaceColorsExtension colors, dynamic typo) {
    final bg = isActive ? colors.contentPrimary : colors.actionTertiaryBg;
    final textColor = isActive ? colors.textInverse : colors.actionTertiaryContent;

    return Container(
      height: 38,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(32),
      ),
      alignment: Alignment.center,
      child: Text(
        label,
        style: typo.labelM.copyWith(color: textColor),
        textAlign: TextAlign.center,
      ),
    );
  }

  // ── Filter: label, h=32, rounded=1000, labelS ──
  Widget _buildFilter(USpaceColorsExtension colors, dynamic typo) {
    final bg = isActive ? colors.actionPrimaryBg : colors.actionTertiaryBg;
    final textColor = isActive ? colors.textInverse : colors.actionTertiaryContent;

    return Container(
      height: 32,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(USpaceRadius.full),
      ),
      alignment: Alignment.center,
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 132),
        child: Text(
          label,
          style: typo.labelS.copyWith(color: textColor),
          textAlign: TextAlign.center,
          overflow: TextOverflow.ellipsis,
          maxLines: 1,
        ),
      ),
    );
  }

  // ── Input: label + close, rounded=1000, outline ──
  Widget _buildInput(USpaceColorsExtension colors, dynamic typo) {
    return Container(
      padding: const EdgeInsets.only(left: 12, right: 8, top: 8, bottom: 8),
      decoration: BoxDecoration(
        color: colors.actionOutlineBg,
        borderRadius: BorderRadius.circular(USpaceRadius.full),
        border: Border.all(color: colors.borderDivider),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 132),
            child: Text(
              label,
              style: typo.labelS.copyWith(color: colors.actionOutlineContent),
              overflow: TextOverflow.ellipsis,
              maxLines: 1,
            ),
          ),
          const SizedBox(width: 4),
          GestureDetector(
            onTap: onClose,
            child: Icon(
              Icons.close,
              size: 16,
              color: colors.actionOutlineContent,
            ),
          ),
        ],
      ),
    );
  }
}
