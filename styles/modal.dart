import 'dart:ui';
import 'package:flutter/material.dart';
import 'uspace_palette.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'spacing_extension.dart';
import 'glass_extension.dart';
import 'radius_extension.dart';

// ── Modal Category ──────────────────────────────────────────
enum USpaceModalCategory {
  listItem,
  textArea,
  image,
  none,
}

// ── USpaceModal ─────────────────────────────────────────────
/// USPACE Design System Modal component (bottom sheet).
///
/// 來源：Figma node 2237:3211
///
/// 4 種 category：List item / Text Area / Image / Null
///
/// Layout:
/// - background: pagePopup (rgba(255,255,255,0.8)) + backdrop blur 15px
/// - shadow: 0 0 30px rgba(0,0,0,0.1)
/// - borderRadius: top-left/top-right 20px (Number/20)
/// - padding: horizontal 20px (margine)
/// - gap: 16px (spacer/16pt) between sections
///
/// 組成：
/// - PageTitle (modal type, center, close button)
/// - Content (varies by category)
/// - BottomBar (optional, full-width action button)
class USpaceModal extends StatelessWidget {
  const USpaceModal({
    super.key,
    this.title = 'Title',
    this.paragraph,
    this.showBottomBar = true,
    this.buttonLabel = 'Label',
    this.onButtonPressed,
    this.onClose,
    required this.child,
  });

  /// Modal 標題（displayL 18px/26px, center-align）
  final String title;

  /// 標題下方段落文字（bodyM 14px/20px, textSecondary, center-align）
  final String? paragraph;

  /// 是否顯示底部 BottomBar
  final bool showBottomBar;

  /// BottomBar 按鈕文字
  final String buttonLabel;

  /// BottomBar 按鈕點擊
  final VoidCallback? onButtonPressed;

  /// 右上角關閉按鈕點擊
  final VoidCallback? onClose;

  /// Modal 內容區域（由外部傳入）
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return ClipRRect(
      borderRadius: const BorderRadius.vertical(
        top: Radius.circular(USpaceRadius.medium), // Number/20
      ),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: USpaceGlass.blurSigma, sigmaY: USpaceGlass.blurSigma),
        child: Container(
          decoration: BoxDecoration(
            color: colors.pagePopup,
            borderRadius: const BorderRadius.vertical(
              top: Radius.circular(USpaceRadius.medium),
            ),
            boxShadow: const [
              BoxShadow(
                color: Color(0x1A000000), // rgba(0,0,0,0.1)
                blurRadius: 30,
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // ── Header ──
              _ModalHeader(
                title: title,
                paragraph: paragraph,
                onClose: onClose,
                colors: colors,
                typo: typo,
              ),

              // ── Content ──
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.margin),
                child: child,
              ),

              // ── BottomBar ──
              if (showBottomBar)
                _ModalBottomBar(
                  label: buttonLabel,
                  onPressed: onButtonPressed,
                  colors: colors,
                  typo: typo,
                )
              else
                const SizedBox(height: USpaceSpacing.spacer16), // Home Indicator spacing
            ],
          ),
        ),
      ),
    );
  }
}

// ── Modal Header ────────────────────────────────────────────
class _ModalHeader extends StatelessWidget {
  const _ModalHeader({
    required this.title,
    this.paragraph,
    this.onClose,
    required this.colors,
    required this.typo,
  });

  final String title;
  final String? paragraph;
  final VoidCallback? onClose;
  final USpaceColorsExtension colors;
  final AppTypographyExtension typo;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.margin),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: USpaceSpacing.spacer16), // TopSpacing

          // ActionBar: no left, close on right
          Row(
            children: [
              const Spacer(),
              GestureDetector(
                onTap: onClose,
                child: Icon(
                  Icons.close,
                  size: 24,
                  color: colors.contentPrimary,
                ),
              ),
            ],
          ),

          // Title
          SizedBox(
            width: double.infinity,
            child: Text(
              title,
              style: typo.displayM.copyWith(color: colors.textPrimary),
              textAlign: TextAlign.center,
            ),
          ),

          // Paragraph
          if (paragraph != null) ...[
            const SizedBox(height: USpaceSpacing.spacer12),
            SizedBox(
              width: double.infinity,
              child: Text(
                paragraph!,
                style: typo.bodyM.copyWith(color: colors.textSecondary),
                textAlign: TextAlign.center,
              ),
            ),
          ],

          const SizedBox(height: USpaceSpacing.spacer16), // gap before content
        ],
      ),
    );
  }
}

// ── Modal BottomBar ─────────────────────────────────────────
/// Figma BottomBar: full-width button, padding top 20px,
/// actionPrimaryBg + actionPrimaryContentAccent, stadium border
class _ModalBottomBar extends StatelessWidget {
  const _ModalBottomBar({
    required this.label,
    this.onPressed,
    required this.colors,
    required this.typo,
  });

  final String label;
  final VoidCallback? onPressed;
  final USpaceColorsExtension colors;
  final AppTypographyExtension typo;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(USpaceSpacing.margin, USpaceSpacing.margin, USpaceSpacing.margin, 0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Full-width action button
          SizedBox(
            width: double.infinity,
            child: GestureDetector(
              onTap: onPressed,
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer12),
                decoration: BoxDecoration(
                  color: colors.actionPrimaryBg,
                  borderRadius: BorderRadius.circular(USpaceRadius.full), // Number/Full
                ),
                child: Text(
                  label,
                  style: typo.labelL.copyWith(
                    color: colors.actionPrimaryContentAccent,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ),

          // Home Indicator spacing
          const SizedBox(height: USpaceSpacing.margin),
        ],
      ),
    );
  }
}

// ── Modal List Item ─────────────────────────────────────────
/// Reusable list item for Modal List category.
///
/// Figma: icon 32px + title bodyL 18px + optional trailing (check icon).
/// Divider: borderDivider between items.
class USpaceModalListItem extends StatelessWidget {
  const USpaceModalListItem({
    super.key,
    required this.title,
    this.leading,
    this.trailing,
    this.onTap,
    this.showTopDivider = false,
    this.showBottomDivider = true,
  });

  final String title;
  final Widget? leading;
  final Widget? trailing;
  final VoidCallback? onTap;
  final bool showTopDivider;
  final bool showBottomDivider;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showTopDivider)
            Divider(height: 1, thickness: 1, color: colors.borderDivider),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer16),
            child: Row(
              children: [
                if (leading != null) ...[
                  leading!,
                  const SizedBox(width: USpaceSpacing.spacer12),
                ],
                Expanded(
                  child: Text(
                    title,
                    style: typo.bodyL.copyWith(color: colors.textPrimary),
                  ),
                ),
                if (trailing != null) ...[
                  const SizedBox(width: USpaceSpacing.margin),
                  trailing!,
                ],
              ],
            ),
          ),
          if (showBottomDivider)
            Divider(height: 1, thickness: 1, color: colors.borderDivider),
        ],
      ),
    );
  }
}

// ── Modal Image Section ─────────────────────────────────────
/// Image placeholder + optional notice text for Modal Image category.
class USpaceModalImageSection extends StatelessWidget {
  const USpaceModalImageSection({
    super.key,
    this.imageWidget,
    this.noticeText,
    this.showNotice = true,
  });

  final Widget? imageWidget;
  final String? noticeText;
  final bool showNotice;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Image placeholder: 196px, rounded 20px, pagePrimary bg
        Container(
          height: 196,
          width: double.infinity,
          decoration: BoxDecoration(
            color: colors.pagePrimary,
            borderRadius: BorderRadius.circular(USpaceRadius.medium),
          ),
          child: imageWidget,
        ),

        // Notice text
        if (showNotice && noticeText != null) ...[
          const SizedBox(height: USpaceSpacing.spacer8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(
                Icons.info_outline,
                size: 16,
                color: colors.contentSecondary,
              ),
              const SizedBox(width: USpaceSpacing.spacer8),
              Expanded(
                child: Text(
                  noticeText!,
                  style: typo.captionS.copyWith(
                    color: colors.textSecondary,
                  ),
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }
}
