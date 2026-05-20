// Figma Node: 1395:8937 / 964:9246 / 961:9111
// Synced: 2026-05-20

import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'uspace_palette.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ─── Constants ─────────────────────────────────────────────────
/// Figma variable `--modal-radius` = 24px
/// FloatingPage 頂部圓角，不在 USpaceRadius token 中
const double _modalRadius = 24.0;

// ─── Enums ────────────────────────────────────────────────────

/// Header 的外觀類型，對應 Figma PageTitle component 的 type property
enum USpaceHeaderType {
  fullPage,   // 全版頁面頂部，圓角無
  floating,   // 底部 sheet，圓角 _modalRadius (24px)
  modal,      // 彈窗，圓角 USpaceRadius.medium (20px)
}

/// FloatingPage 的滾動狀態
enum USpaceHeaderStatus {
  defaultStatus, // 標題在 Content 區
  scrolling,     // 標題移入 ActionBar，縮小為 bodyM
}

/// Title 對齊方式
enum USpaceHeaderTitlePlace {
  left,
  center,
}

/// LeftSection 的功能樣式，對應 Figma LeftSection Function property
enum USpaceHeaderLeftFunction {
  fullPageIcon,   // ChevronLeft 24px（h=34 container）
  floatingIcon,   // ChevronLeft 24px（h=24 container）
  title,          // displayM (18px/26px Medium), maxWidth=310
  profileTitle,   // headingL + Semibold (26px/34px w600), maxWidth=310, pl=2
}

/// RightSection 的功能樣式，對應 Figma RightSection Function property
enum USpaceHeaderRightFunction {
  icon24,       // 24px icon (Close etc.), py=3, gap=12
  icon32,       // 32px icon (Message etc.), py=1
  textButton,   // Text button, labelL, textTertiary
}

// ─── USpacePageTitle ──────────────────────────────────────────

/// Header 元件，對應 Figma PageTitle component set（node 1395:8937）。
/// 支援三種 type：fullPage / floating / modal。
///
/// 使用方式：
///   // Full Page Default
///   USpacePageTitle(
///     type: USpaceHeaderType.fullPage,
///     leftFunction: USpaceHeaderLeftFunction.fullPageIcon,
///     title: '標題',
///     showTitle: true,
///   )
///
///   // Floating Center Title + Subtitle
///   USpacePageTitle(
///     type: USpaceHeaderType.floating,
///     titlePlace: USpaceHeaderTitlePlace.center,
///     leftFunction: USpaceHeaderLeftFunction.floatingIcon,
///     title: '標題',
///     subtitle: '副標題',
///     showTitle: true,
///     showSubtitle: true,
///   )
///
///   // Full Page Profile + Message (32px icon)
///   USpacePageTitle(
///     type: USpaceHeaderType.fullPage,
///     leftFunction: USpaceHeaderLeftFunction.profileTitle,
///     rightFunction: USpaceHeaderRightFunction.icon32,
///     title: '使用者名稱',
///     rightLargeIcon: Icon(Icons.chat_bubble_outline, size: 32),
///     showStatusBar: true,
///   )
class USpacePageTitle extends StatelessWidget {
  const USpacePageTitle({
    super.key,
    required this.type,
    this.status = USpaceHeaderStatus.defaultStatus,
    this.titlePlace = USpaceHeaderTitlePlace.left,
    this.leftFunction = USpaceHeaderLeftFunction.fullPageIcon,
    this.rightFunction = USpaceHeaderRightFunction.icon24,
    this.rightIcon,
    this.rightLargeIcon,
    this.rightTextLabel,
    this.showStatusBar = false,
    this.showLeft = true,
    this.showRight = true,
    this.showTitle = true,
    this.showSubtitle = false,
    this.showParagraph = false,
    this.showInfo = false,
    this.showGrabBar = true,
    this.showBreadcrumb = false,
    this.showParkingTitle = false,
    this.showRightInfo = false,
    this.title,
    this.subtitle,
    this.paragraph,
    this.info,
    this.parkingTitle,
    this.firstDrawer,
    this.secondDrawer,
    this.onLeftPressed,
    this.onRightPressed,
  });

  /// Header 類型（必填）
  final USpaceHeaderType type;

  /// FloatingPage 滾動狀態
  final USpaceHeaderStatus status;

  /// Title 對齊方式（FullPage 固定 left，Floating/Modal 可 center）
  final USpaceHeaderTitlePlace titlePlace;

  /// LeftSection 的功能樣式
  final USpaceHeaderLeftFunction leftFunction;

  /// RightSection 的功能樣式
  final USpaceHeaderRightFunction rightFunction;

  /// RightSection 24px 圖示（icon24 模式）
  final Widget? rightIcon;

  /// RightSection 32px 圖示（icon32 模式）
  final Widget? rightLargeIcon;

  /// RightSection 文字（textButton 模式）
  final String? rightTextLabel;

  // ── Visibility booleans ────────────────────────

  /// 顯示 iOS Status Bar placeholder（僅 fullPage 有效）
  final bool showStatusBar;

  /// 顯示 LeftSection
  final bool showLeft;

  /// 顯示 RightSection
  final bool showRight;

  /// 顯示 title 文字
  final bool showTitle;

  /// 顯示 subtitle
  final bool showSubtitle;

  /// 顯示 paragraph
  final bool showParagraph;

  /// 顯示 Accent Info（僅 floating Center Title）
  final bool showInfo;

  /// 顯示 GrabBar（僅 floating）
  final bool showGrabBar;

  /// 顯示 Breadcrumb（僅 fullPage）
  final bool showBreadcrumb;

  /// 顯示 ParkingTitle（僅 floating，displayM 在 title 上方）
  final bool showParkingTitle;

  /// 顯示 RightSection Info icon（僅 icon24 模式）
  final bool showRightInfo;

  // ── Content strings ────────────────────────────

  final String? title;
  final String? subtitle;
  final String? paragraph;

  /// Accent Info 文字（floating 專用）
  final String? info;

  /// ParkingTitle 文字（floating 專用，displayM）
  final String? parkingTitle;

  /// Breadcrumb 第一層（fullPage 專用）
  final String? firstDrawer;

  /// Breadcrumb 第二層（fullPage 專用）
  final String? secondDrawer;

  /// LeftSection icon 點擊回調
  final VoidCallback? onLeftPressed;

  /// RightSection 點擊回調
  final VoidCallback? onRightPressed;

  // ─────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo   = context.typography;
    return switch (type) {
      USpaceHeaderType.fullPage => _buildFullPage(colors, typo),
      USpaceHeaderType.floating => status == USpaceHeaderStatus.scrolling
          ? _buildFloatingScrolling(colors, typo)
          : _buildFloating(colors, typo),
      USpaceHeaderType.modal    => _buildModal(colors, typo),
    };
  }

  // ─── Full Page ───────────────────────────────────────────────

  Widget _buildFullPage(USpaceColorsExtension colors, AppTypographyExtension typo) {
    final titleInLeft = leftFunction == USpaceHeaderLeftFunction.title ||
        leftFunction == USpaceHeaderLeftFunction.profileTitle;

    return ColoredBox(
      color: colors.pagePrimary,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showStatusBar) _StatusBarPlaceholder(colors: colors),
          // TopSpacing: Figma h=16（pt=8 + pb=8，視覺間距）
          const SizedBox(height: USpaceSpacing.spacer16),
          _buildActionBar(colors, typo),
          if (showBreadcrumb) ...[
            _buildBreadcrumb(colors, typo),
          ],
          if (!titleInLeft && showTitle) ...[
            const SizedBox(height: USpaceSpacing.spacer8), // ActionBar → Title gap
            _buildFullPageTitleBlock(colors, typo),
          ],
        ],
      ),
    );
  }

  Widget _buildFullPageTitleBlock(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Figma: headingL 26px/34px Regular
        Text(
          title ?? '',
          style: typo.headingL.copyWith(color: colors.textPrimary),
        ),
        if (showSubtitle && subtitle != null) ...[
          const SizedBox(height: USpaceSpacing.spacer8),
          // Figma: bodyM 16px/24px
          Text(
            subtitle!,
            style: typo.bodyM.copyWith(color: colors.textSecondary),
          ),
        ],
        if (showParagraph && paragraph != null) ...[
          const SizedBox(height: USpaceSpacing.spacer16),
          // Figma: bodyS 14px/20px
          Text(
            paragraph!,
            style: typo.bodyS.copyWith(color: colors.textSecondary),
          ),
        ],
      ],
    );
  }

  /// Breadcrumb（FullPage 專用）
  /// Figma: bodyS 14px/20px, gap=4, firstDrawer textTertiary, dot textTertiary, secondDrawer textPrimary
  Widget _buildBreadcrumb(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Row(
      children: [
        Text(
          firstDrawer ?? '',
          style: typo.bodyS.copyWith(color: colors.textTertiary),
        ),
        const SizedBox(width: USpaceSpacing.spacer4),
        Text(
          '·',
          style: typo.bodyS.copyWith(color: colors.textTertiary),
        ),
        const SizedBox(width: USpaceSpacing.spacer4),
        Text(
          secondDrawer ?? '',
          style: typo.bodyS.copyWith(color: colors.textPrimary),
        ),
      ],
    );
  }

  // ─── Floating (Default) ────────────────────────────────────

  Widget _buildFloating(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return ClipRRect(
      // Figma: --modal-radius = 24px
      borderRadius: const BorderRadius.vertical(top: Radius.circular(_modalRadius)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TopSpacing: h=20（pt=8 + GrabBar 4px + pb=8）or h=16 if no GrabBar
          if (showGrabBar)
            _GrabBarSpacing(colors: colors)
          else
            const SizedBox(height: USpaceSpacing.spacer16),
          _buildActionBar(colors, typo),
          if (showTitle && titlePlace == USpaceHeaderTitlePlace.center)
            _buildFloatingCenterTitleBlock(colors, typo),
        ],
      ),
    );
  }

  Widget _buildFloatingCenterTitleBlock(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Figma: optional ParkingTitle — displayM 18px/26px Medium
          if (showParkingTitle && parkingTitle != null)
            Text(
              parkingTitle!,
              style: typo.displayM.copyWith(color: colors.textPrimary),
              textAlign: TextAlign.center,
            ),
          // Figma: headingM 22px/30px Regular
          Text(
            title ?? '',
            style: typo.headingM.copyWith(color: colors.textPrimary),
            textAlign: TextAlign.center,
          ),
          if (showInfo && info != null) ...[
            const SizedBox(height: USpaceSpacing.spacer4),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8),
              child: Text(
                info!,
                style: typo.headingM.copyWith(color: colors.textPrimary),
                textAlign: TextAlign.center,
              ),
            ),
          ],
          if (showSubtitle && subtitle != null) ...[
            const SizedBox(height: USpaceSpacing.spacer4),
            // Figma: bodyS 14px/20px
            Text(
              subtitle!,
              style: typo.bodyS.copyWith(color: colors.textSecondary),
              textAlign: TextAlign.center,
            ),
          ],
        ],
      ),
    );
  }

  // ─── Floating (Scrolling) ──────────────────────────────────

  Widget _buildFloatingScrolling(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return ClipRRect(
      // Figma: --modal-radius = 24px
      borderRadius: const BorderRadius.vertical(top: Radius.circular(_modalRadius)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TopSpacing: h=20
          const SizedBox(height: USpaceSpacing.spacer20),
          // ActionBar: left + title(bodyM centered) + right
          _buildScrollingActionBar(colors, typo),
          if (showInfo && info != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8),
              child: Text(
                info!,
                // Figma Scrolling: Accent Info → bodyS 14px/20px
                style: typo.bodyS.copyWith(color: colors.textPrimary),
                textAlign: TextAlign.center,
              ),
            ),
        ],
      ),
    );
  }

  /// Scrolling 狀態的 ActionBar：title 顯示於中間（bodyM 16px/24px）
  Widget _buildScrollingActionBar(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (showLeft)
          Expanded(child: _buildLeftSection(colors, typo))
        else
          const Spacer(),
        // Figma: bodyM 16px/24px, center
        Expanded(
          child: Text(
            title ?? '',
            style: typo.bodyM.copyWith(color: colors.textPrimary),
            textAlign: TextAlign.center,
          ),
        ),
        if (showRight)
          Expanded(child: Align(alignment: Alignment.centerRight, child: _buildRightSection(colors, typo)))
        else
          const Spacer(),
      ],
    );
  }

  // ─── Modal ───────────────────────────────────────────────────

  Widget _buildModal(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return ClipRRect(
      // Figma: --margine = 20px = USpaceRadius.medium
      borderRadius: BorderRadius.vertical(top: Radius.circular(USpaceRadius.medium)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TopSpacing: Figma h=16（無 GrabBar）
          const SizedBox(height: USpaceSpacing.spacer16),
          _buildActionBar(colors, typo),
          if (showTitle) _buildModalTitleBlock(colors, typo),
        ],
      ),
    );
  }

  Widget _buildModalTitleBlock(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Figma: Display/L = displayM 18px/26px Medium
        Text(
          title ?? '',
          style: typo.displayM.copyWith(color: colors.textPrimary),
          textAlign: TextAlign.center,
        ),
        if (showParagraph && paragraph != null) ...[
          const SizedBox(height: USpaceSpacing.spacer12),
          // Figma: bodyS 14px/20px (NOT bodyM)
          Text(
            paragraph!,
            style: typo.bodyS.copyWith(color: colors.textSecondary),
            textAlign: TextAlign.center,
          ),
        ],
      ],
    );
  }

  // ─── ActionBar（共用）────────────────────────────────────────

  Widget _buildActionBar(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (showLeft)
          Expanded(child: _buildLeftSection(colors, typo))
        else
          const Spacer(),
        if (showRight) _buildRightSection(colors, typo),
      ],
    );
  }

  // ─── LeftSection ────────────────────────────────────────────

  Widget _buildLeftSection(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return switch (leftFunction) {
      // FullPage 返回箭頭（h=34 container）
      USpaceHeaderLeftFunction.fullPageIcon => GestureDetector(
          onTap: onLeftPressed,
          child: SizedBox(
            height: 34,
            child: Align(
              alignment: Alignment.centerLeft,
              child: Icon(Icons.arrow_back_ios, size: 24, color: colors.contentPrimary),
            ),
          ),
        ),

      // Floating / Modal 返回箭頭（h=24 container）
      USpaceHeaderLeftFunction.floatingIcon => GestureDetector(
          onTap: onLeftPressed,
          child: SizedBox(
            height: 24,
            child: Align(
              alignment: Alignment.centerLeft,
              child: Icon(Icons.arrow_back_ios, size: 24, color: colors.contentPrimary),
            ),
          ),
        ),

      // Floating LeftTitle 版：displayM 18px/26px Medium, maxWidth=310
      USpaceHeaderLeftFunction.title => SizedBox(
          height: 26, // Figma: line-height 26px
          child: Align(
            alignment: Alignment.centerLeft,
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 310),
              child: Text(
                title ?? '',
                style: typo.displayM.copyWith(color: colors.textPrimary),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
        ),

      // FullPage Profile 版：headingL 26px/34px + Semibold (w600), maxWidth=310, pl=2
      USpaceHeaderLeftFunction.profileTitle => Padding(
          padding: const EdgeInsets.only(left: 2),
          child: SizedBox(
            height: 34,
            child: Align(
              alignment: Alignment.centerLeft,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 310),
                child: Text(
                  title ?? '',
                  style: typo.headingL.copyWith(
                    color: colors.textPrimary,
                    fontWeight: FontWeight.w600, // Figma: PingFang TC Semibold = w600
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ),
        ),
    };
  }

  // ─── RightSection ───────────────────────────────────────────

  Widget _buildRightSection(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return switch (rightFunction) {
      // 24px icon: py=3, gap=12, optional info icon
      USpaceHeaderRightFunction.icon24 => Padding(
          padding: const EdgeInsets.symmetric(vertical: 3),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (showRightInfo) ...[
                GestureDetector(
                  onTap: null, // Info icon 點擊由外部處理
                  child: Icon(Icons.help_outline, size: 24, color: colors.contentPrimary),
                ),
                const SizedBox(width: USpaceSpacing.spacer12),
              ],
              GestureDetector(
                onTap: onRightPressed,
                child: rightIcon ?? Icon(Icons.close, size: 24, color: colors.contentPrimary),
              ),
            ],
          ),
        ),

      // 32px icon: py=1
      USpaceHeaderRightFunction.icon32 => Padding(
          padding: const EdgeInsets.symmetric(vertical: 1),
          child: GestureDetector(
            onTap: onRightPressed,
            child: rightLargeIcon ?? Icon(Icons.chat_bubble_outline, size: 32, color: colors.contentPrimary),
          ),
        ),

      // TextButton: labelL 16px/24px, textTertiary
      USpaceHeaderRightFunction.textButton => GestureDetector(
          onTap: onRightPressed,
          child: Text(
            rightTextLabel ?? 'Action',
            style: typo.labelL.copyWith(color: colors.textTertiary),
            textAlign: TextAlign.center,
          ),
        ),
    };
  }
}

// ─── Sub-widgets ─────────────────────────────────────────────

/// iOS Status Bar placeholder（Figma: Status bar - iPhone，node 1063:11892）
/// 此為展示用 placeholder，正式實作應使用 SafeArea + MediaQuery.padding.top
class _StatusBarPlaceholder extends StatelessWidget {
  const _StatusBarPlaceholder({required this.colors});
  final USpaceColorsExtension colors;

  @override
  Widget build(BuildContext context) {
    // Figma: pt=21, pb=19 → total = 59px（含 22px content）
    return SizedBox(
      height: 44,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Figma: SF Pro Semibold 17px (iOS system font, not in typography tokens)
            Text(
              '9:41',
              style: TextStyle(
                fontFamily: 'SF Pro',
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: colors.textPrimary,
              ),
            ),
            Icon(Icons.signal_cellular_alt, size: 18, color: colors.contentPrimary),
          ],
        ),
      ),
    );
  }
}

/// Floating header 的 GrabBar + TopSpacing
/// Figma: h=20（pt=8 + GrabBar 4px + pb=8）
/// GrabBar: w=40 / h=4 / rounded pill
/// 顏色：Figma --border/divider = borderDivider token
class _GrabBarSpacing extends StatelessWidget {
  const _GrabBarSpacing({required this.colors});
  final USpaceColorsExtension colors;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: USpaceSpacing.spacer20,
      child: Center(
        child: Container(
          width: 40,
          height: USpaceSpacing.spacer4,
          decoration: BoxDecoration(
            // Figma: --border/divider token (NOT contentTertiary)
            color: colors.borderDivider,
            borderRadius: BorderRadius.circular(USpaceRadius.full),
          ),
        ),
      ),
    );
  }
}
