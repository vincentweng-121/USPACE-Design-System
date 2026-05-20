// Figma Node: 1327:17998 / 1327:18205 / 1327:18962
// Synced: 2026-04-17

import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'uspace_palette.dart';
import 'typography_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ─── Enums ────────────────────────────────────────────────────

/// Header 的外觀類型，對應 Figma PageTitle component 的 type property
enum USpaceHeaderType {
  fullPage,  // 全版頁面頂部，可含 StatusBar，title headingL（26px）
  floating,  // 底部 sheet，含 GrabBar，圓角 24px，title headingM（22px）
  modal,     // 彈窗，無 GrabBar，圓角 20px，title headingM（22px）
}

/// Title 對齊方式
enum USpaceHeaderTitlePlace {
  left,
  center,
}

/// LeftSection 的功能樣式，對應 Figma LeftSection Function property
enum USpaceHeaderLeftFunction {
  fullPageIcon,   // ChevronLeft 24px（FullPage 返回箭頭，h=34 container）
  floatingIcon,   // ChevronLeft 24px（Floating / Modal 返回箭頭，h=24 container）
  title,          // Title 文字 headingM，left-align（Floating LeftTitle 版）
  profileTitle,   // Title 文字 headingL，left-align（FullPage Profile 版）
                  // ⚠️ Figma: PingFang TC:Semibold（w600），非標準 token weight
                  //    目前暫用 FontWeight.w600，待確認是否應對應 bold(700)
}

// ─── USpacePageTitle ──────────────────────────────────────────

/// Header 元件，對應 Figma PageTitle component set（node 1395:8935）。
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
///   // Full Page Profile + Message
///   USpacePageTitle(
///     type: USpaceHeaderType.fullPage,
///     leftFunction: USpaceHeaderLeftFunction.profileTitle,
///     title: '使用者名稱',
///     rightIcon: Icon(Icons.chat_bubble_outline, size: 32),
///     showStatusBar: true,
///   )
class USpacePageTitle extends StatelessWidget {
  const USpacePageTitle({
    super.key,
    required this.type,
    this.titlePlace = USpaceHeaderTitlePlace.left,
    this.leftFunction = USpaceHeaderLeftFunction.fullPageIcon,
    this.rightIcon,
    this.showStatusBar = false,
    this.showLeft = true,
    this.showRight = true,
    this.showTitle = true,
    this.showSubtitle = false,
    this.showParagraph = false,
    this.showInfo = false,
    this.title,
    this.subtitle,
    this.paragraph,
    this.info,
    this.onLeftPressed,
  });

  /// Header 類型（必填）
  final USpaceHeaderType type;

  /// Title 對齊方式（FullPage 固定 left，Floating/Modal 可 center）
  final USpaceHeaderTitlePlace titlePlace;

  /// LeftSection 的功能樣式
  final USpaceHeaderLeftFunction leftFunction;

  /// RightSection 圖示 Widget（接受任意 Widget）。
  /// null 時顯示預設 Close icon placeholder（待 icon 庫完成後替換）。
  final Widget? rightIcon;

  // ── Visibility booleans ────────────────────────

  /// 顯示 iOS Status Bar placeholder（僅 fullPage 有效）
  final bool showStatusBar;

  /// 顯示 LeftSection
  final bool showLeft;

  /// 顯示 RightSection
  final bool showRight;

  /// 顯示 title 文字（leftFunction=title/profileTitle 時 title 顯示於 LeftSection，
  /// 此 flag 控制 ActionBar 下方額外 Title 區塊）
  final bool showTitle;

  /// 顯示 subtitle
  /// - fullPage：bodyM，left-align，pt=8
  /// - floating：bodyS，center-align，pt=4
  final bool showSubtitle;

  /// 顯示 paragraph
  /// - fullPage：bodyS，left-align，pt=16
  /// - modal：bodyM，center-align，pt=12
  final bool showParagraph;

  /// 顯示 Accent Info（僅 floating Center Title + Accent Info 版）
  /// headingM，center-align，pt=4
  final bool showInfo;

  // ── Content strings ────────────────────────────

  final String? title;
  final String? subtitle;
  final String? paragraph;

  /// Accent Info 文字（floating 專用）
  final String? info;

  /// LeftSection icon 點擊回調
  final VoidCallback? onLeftPressed;

  // ─────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo   = context.typography;
    return switch (type) {
      USpaceHeaderType.fullPage => _buildFullPage(colors, typo),
      USpaceHeaderType.floating => _buildFloating(colors, typo),
      USpaceHeaderType.modal    => _buildModal(colors, typo),
    };
  }

  // ─── Full Page ───────────────────────────────────────────────

  Widget _buildFullPage(USpaceColorsExtension colors, AppTypographyExtension typo) {
    // title / profileTitle 的 title 文字顯示於 LeftSection，不需另外 showTitle block
    final titleInLeft = leftFunction == USpaceHeaderLeftFunction.title ||
        leftFunction == USpaceHeaderLeftFunction.profileTitle;

    return ColoredBox(
      color: colors.pagePrimary,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showStatusBar) _StatusBarPlaceholder(colors: colors),
          const SizedBox(height: USpaceSpacing.spacer16), // TopSpacing: pt=8 + pb=12 (Figma h=16)
          _buildActionBar(colors, typo),
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
        Text(
          title ?? '',
          style: typo.headingL.copyWith(color: colors.textPrimary),
        ),
        if (showSubtitle && subtitle != null) ...[
          const SizedBox(height: USpaceSpacing.spacer8),
          Text(
            subtitle!,
            style: typo.bodyM.copyWith(color: colors.textSecondary),
          ),
        ],
        if (showParagraph && paragraph != null) ...[
          const SizedBox(height: USpaceSpacing.spacer16),
          Text(
            paragraph!,
            style: typo.bodyS.copyWith(color: colors.textSecondary),
          ),
        ],
      ],
    );
  }

  // ─── Floating ────────────────────────────────────────────────

  Widget _buildFloating(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return ClipRRect(
      borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _GrabBarSpacing(colors: colors), // h=20: pt=8 + GrabBar 4px + pb=8
          _buildActionBar(colors, typo),
          if (showTitle && titlePlace == USpaceHeaderTitlePlace.center)
            _buildFloatingCenterTitleBlock(colors, typo),
        ],
      ),
    );
  }

  Widget _buildFloatingCenterTitleBlock(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer16), // px=16（Figma Title block）
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            title ?? '',
            style: typo.headingM.copyWith(color: colors.textPrimary),
            textAlign: TextAlign.center,
          ),
          if (showSubtitle && subtitle != null) ...[
            const SizedBox(height: USpaceSpacing.spacer4), // pt=4（Figma）
            Text(
              subtitle!,
              style: typo.bodyS.copyWith(color: colors.textSecondary),
              textAlign: TextAlign.center,
            ),
          ],
          if (showInfo && info != null) ...[
            const SizedBox(height: USpaceSpacing.spacer4), // pt=4（Figma）
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8), // px=8（Figma Accent Info）
              child: Text(
                info!,
                style: typo.headingM.copyWith(color: colors.textPrimary),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ─── Modal ───────────────────────────────────────────────────

  Widget _buildModal(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return ClipRRect(
      borderRadius: BorderRadius.vertical(top: Radius.circular(USpaceRadius.medium)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: USpaceSpacing.spacer16), // TopSpacing（Figma h=16，無 GrabBar）
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
        Text(
          title ?? '',
          style: typo.headingM.copyWith(color: colors.textPrimary),
          textAlign: TextAlign.center,
        ),
        if (showParagraph && paragraph != null) ...[
          const SizedBox(height: USpaceSpacing.spacer12), // pt=12（Figma Modal paragraph）
          Text(
            paragraph!,
            style: typo.bodyM.copyWith(color: colors.textSecondary),
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
        if (showRight) _buildRightSection(colors),
      ],
    );
  }

  Widget _buildLeftSection(USpaceColorsExtension colors, AppTypographyExtension typo) {
    return switch (leftFunction) {
      // FullPage 返回箭頭（h=34 container，Figma FullPageIcon）
      USpaceHeaderLeftFunction.fullPageIcon => GestureDetector(
          onTap: onLeftPressed,
          child: SizedBox(
            height: 34,
            child: Align(
              alignment: Alignment.centerLeft,
              // ⚠️ placeholder：待 icon 庫完成後替換為 Icon(USpaceIcons.chevronLeft)
              child: Icon(Icons.arrow_back_ios, size: 24, color: colors.contentPrimary),
            ),
          ),
        ),

      // Floating / Modal 返回箭頭（h=24 container，Figma FloatingIcon）
      USpaceHeaderLeftFunction.floatingIcon => GestureDetector(
          onTap: onLeftPressed,
          child: SizedBox(
            height: 24,
            child: Align(
              alignment: Alignment.centerLeft,
              // ⚠️ placeholder：待 icon 庫完成後替換為 Icon(USpaceIcons.chevronLeft)
              child: Icon(Icons.arrow_back_ios, size: 24, color: colors.contentPrimary),
            ),
          ),
        ),

      // Floating LeftTitle 版：title 文字顯示於 LeftSection
      USpaceHeaderLeftFunction.title => SizedBox(
          height: 30, // max-h=30（Figma ActionBar height）
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              title ?? '',
              style: typo.headingM.copyWith(color: colors.textPrimary),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),

      // FullPage Profile 版：title 文字 headingL + semibold 顯示於 LeftSection
      // ⚠️ Figma 使用 PingFang TC:Semibold（w600），非標準 token weight（我們有 400/500/700）
      //    暫用 FontWeight.w600；待確認是否應改為 bold(w700)
      USpaceHeaderLeftFunction.profileTitle => SizedBox(
          height: 34,
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              title ?? '',
              style: typo.headingL.copyWith(
                color: colors.textPrimary,
                fontWeight: FontWeight.w700, // Figma: Semibold → 對應 bold(700)
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
    };
  }

  Widget _buildRightSection(USpaceColorsExtension colors) {
    return Align(
      alignment: Alignment.centerRight,
      // ⚠️ placeholder：待 icon 庫完成後，調用端傳入 Icon(USpaceIcons.close) 或其他 icon
      child: rightIcon ?? Icon(Icons.close, size: 24, color: colors.contentPrimary),
    );
  }
}

// ─── Sub-widgets ─────────────────────────────────────────────

/// iOS Status Bar placeholder（Figma: Status bar - iPhone，node 1063:11892）
/// ⚠️ 此為展示用 placeholder，正式實作應使用 SafeArea + MediaQuery.padding.top
class _StatusBarPlaceholder extends StatelessWidget {
  const _StatusBarPlaceholder({required this.colors});
  final USpaceColorsExtension colors;

  @override
  Widget build(BuildContext context) {
    // Figma: pt=21, pb=19 → total ≈ 44px（加上 22px content = 44px SafeArea 標準高度）
    return SizedBox(
      height: 44,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '9:41',
              style: TextStyle(
                fontFamily: 'SF Pro',
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: colors.textPrimary,
              ),
            ),
            // ⚠️ placeholder：待 icon 庫完成後替換為實際 status indicator icons
            Icon(Icons.signal_cellular_alt, size: 18, color: colors.contentPrimary),
          ],
        ),
      ),
    );
  }
}

/// Floating header 的 GrabBar + TopSpacing
/// Figma: h=20（pt=8 + GrabBar 4px + pb=8），GrabBar: w=40 / h=4 / rounded pill
///
/// Floating header 的 GrabBar + TopSpacing
/// Figma: h=20（pt=8 + GrabBar 4px + pb=8），GrabBar: w=40 / h=4 / rounded pill
/// 顏色：Figma content/tertiary = rgba(50,50,55,0.15) → USpacePalette.transparentGrey80015
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
            color: colors.contentTertiary,
            borderRadius: BorderRadius.circular(USpaceRadius.full),
          ),
        ),
      ),
    );
  }
}
