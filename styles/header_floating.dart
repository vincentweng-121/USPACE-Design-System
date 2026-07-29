part of 'header.dart';

// ─── Floating 版面（預設狀態）──────────────────────────────────

/// 底部 sheet 頂部：頂端 24px 圓角，可含 GrabBar。
class _FloatingHeader extends StatelessWidget {
  const _FloatingHeader(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      // Figma: --modal-radius = 24px
      borderRadius: const BorderRadius.vertical(top: Radius.circular(_modalRadius)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TopSpacing: h=20（pt=8 + GrabBar 4px + pb=8）或無 GrabBar 時 h=16
          if (config.showGrabBar)
            const _GrabBarSpacing()
          else
            const SizedBox(height: USpaceSpacing.spacer16),
          _ActionBar(config),
          // titlePlace 決定的是對齊方式，不是顯不顯示。
          // （2026-07-28 修正：原本只在 center 時渲染，導致預設的 left
          //   會靜默不顯示標題，與 fullPage / modal 行為不一致。）
          if (config.showTitle) _FloatingTitleBlock(config),
        ],
      ),
    );
  }
}

/// Floating 的標題區塊：可含 ParkingTitle / Accent Info / subtitle。
/// 對齊方式由 [USpaceHeaderTitlePlace] 決定。
class _FloatingTitleBlock extends StatelessWidget {
  const _FloatingTitleBlock(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;
    final align = config.titlePlace == USpaceHeaderTitlePlace.center
        ? TextAlign.center
        : TextAlign.start;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Figma: optional ParkingTitle — displayM 18px/26px Medium
          if (config.showParkingTitle && config.parkingTitle != null)
            Text(
              config.parkingTitle!,
              style: typo.displayM.copyWith(color: colors.textPrimary),
              textAlign: align,
            ),
          // Figma: headingM 22px/30px Regular
          Text(
            config.title ?? '',
            style: typo.headingM.copyWith(color: colors.textPrimary),
            textAlign: align,
          ),
          if (config.showInfo && config.info != null) ...[
            const SizedBox(height: USpaceSpacing.spacer4),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8),
              child: Text(
                config.info!,
                style: typo.headingM.copyWith(color: colors.textPrimary),
                textAlign: align,
              ),
            ),
          ],
          if (config.showSubtitle && config.subtitle != null) ...[
            const SizedBox(height: USpaceSpacing.spacer4),
            // Figma: bodyS 14px/20px
            Text(
              config.subtitle!,
              style: typo.bodyS.copyWith(color: colors.textSecondary),
              textAlign: align,
            ),
          ],
        ],
      ),
    );
  }
}

// ─── Floating 版面（捲動狀態）──────────────────────────────────

/// 捲動後的 Floating header：標題縮小移入 ActionBar 中央。
class _FloatingScrollingHeader extends StatelessWidget {
  const _FloatingScrollingHeader(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return ClipRRect(
      // Figma: --modal-radius = 24px
      borderRadius: const BorderRadius.vertical(top: Radius.circular(_modalRadius)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TopSpacing: h=20
          const SizedBox(height: USpaceSpacing.spacer20),
          _ScrollingActionBar(config),
          if (config.showInfo && config.info != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer8),
              child: Text(
                config.info!,
                // Figma Scrolling: Accent Info → bodyS 14px/20px
                style: typo.bodyS.copyWith(color: colors.textPrimary),
                textAlign: TextAlign.center,
              ),
            ),
        ],
      ),
    );
  }
}

/// 捲動狀態的 ActionBar：標題以 bodyM 顯示於中間。
class _ScrollingActionBar extends StatelessWidget {
  const _ScrollingActionBar(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (config.showLeft)
          Expanded(child: _LeftSection(config))
        else
          const Spacer(),
        // Figma: bodyM 16px/24px, center
        Expanded(
          child: Text(
            config.title ?? '',
            style: typo.bodyM.copyWith(color: colors.textPrimary),
            textAlign: TextAlign.center,
          ),
        ),
        if (config.showRight)
          Expanded(
            child: Align(
              alignment: Alignment.centerRight,
              child: _RightSection(config),
            ),
          )
        else
          const Spacer(),
      ],
    );
  }
}
