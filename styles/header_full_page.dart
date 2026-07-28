part of 'header.dart';

// ─── FullPage 版面 ────────────────────────────────────────────

/// 全版頁面頂部：無圓角，標題靠左，可含 StatusBar 與 Breadcrumb。
class _FullPageHeader extends StatelessWidget {
  const _FullPageHeader(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    // LeftSection 已經顯示標題時，下方不再重複一份
    final titleInLeft = config.leftFunction == USpaceHeaderLeftFunction.title ||
        config.leftFunction == USpaceHeaderLeftFunction.profileTitle;

    return ColoredBox(
      color: context.uColors.pagePrimary,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (config.showStatusBar) const _StatusBarPlaceholder(),
          // TopSpacing: Figma h=16（pt=8 + pb=8，視覺間距）
          const SizedBox(height: USpaceSpacing.spacer16),
          _ActionBar(config),
          if (config.showBreadcrumb) _Breadcrumb(config),
          if (!titleInLeft && config.showTitle) ...[
            const SizedBox(height: USpaceSpacing.spacer8), // ActionBar → Title gap
            _FullPageTitleBlock(config),
          ],
        ],
      ),
    );
  }
}

/// FullPage 的標題區塊：title / subtitle / paragraph，全部靠左。
class _FullPageTitleBlock extends StatelessWidget {
  const _FullPageTitleBlock(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Figma: headingL 26px/34px Regular
        Text(
          config.title ?? '',
          style: typo.headingL.copyWith(color: colors.textPrimary),
        ),
        if (config.showSubtitle && config.subtitle != null) ...[
          const SizedBox(height: USpaceSpacing.spacer8),
          // Figma: bodyM 16px/24px
          Text(
            config.subtitle!,
            style: typo.bodyM.copyWith(color: colors.textSecondary),
          ),
        ],
        if (config.showParagraph && config.paragraph != null) ...[
          const SizedBox(height: USpaceSpacing.spacer16),
          // Figma: bodyS 14px/20px
          Text(
            config.paragraph!,
            style: typo.bodyS.copyWith(color: colors.textSecondary),
          ),
        ],
      ],
    );
  }
}

/// Breadcrumb（FullPage 專用）
/// Figma: bodyS 14px/20px, gap=4
/// firstDrawer 與分隔點為 textTertiary，secondDrawer 為 textPrimary
class _Breadcrumb extends StatelessWidget {
  const _Breadcrumb(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;
    final muted = typo.bodyS.copyWith(color: colors.textTertiary);

    return Row(
      children: [
        Text(config.firstDrawer ?? '', style: muted),
        const SizedBox(width: USpaceSpacing.spacer4),
        Text('·', style: muted),
        const SizedBox(width: USpaceSpacing.spacer4),
        Text(
          config.secondDrawer ?? '',
          style: typo.bodyS.copyWith(color: colors.textPrimary),
        ),
      ],
    );
  }
}
