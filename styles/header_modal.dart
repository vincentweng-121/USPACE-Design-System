part of 'header.dart';

// ─── Modal 版面 ───────────────────────────────────────────────

/// 彈窗頂部：頂端 20px 圓角，標題置中，無 GrabBar。
class _ModalHeaderLayout extends StatelessWidget {
  const _ModalHeaderLayout(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      // Figma: --margine = 20px = USpaceRadius.medium
      borderRadius: BorderRadius.vertical(top: Radius.circular(USpaceRadius.medium)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TopSpacing: Figma h=16（無 GrabBar）
          const SizedBox(height: USpaceSpacing.spacer16),
          _ActionBar(config),
          if (config.showTitle) _ModalTitleBlock(config),
        ],
      ),
    );
  }
}

/// Modal 的標題區塊：title + 可選 paragraph，皆置中。
class _ModalTitleBlock extends StatelessWidget {
  const _ModalTitleBlock(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Figma: Display/L = displayM 18px/26px Medium
        Text(
          config.title ?? '',
          style: typo.displayM.copyWith(color: colors.textPrimary),
          textAlign: TextAlign.center,
        ),
        if (config.showParagraph && config.paragraph != null) ...[
          const SizedBox(height: USpaceSpacing.spacer12),
          // Figma: bodyS 14px/20px（不是 bodyM）
          Text(
            config.paragraph!,
            style: typo.bodyS.copyWith(color: colors.textSecondary),
            textAlign: TextAlign.center,
          ),
        ],
      ],
    );
  }
}
