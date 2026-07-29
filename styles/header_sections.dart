part of 'header.dart';

// ─── ActionBar（三種版面共用）──────────────────────────────────

/// 頂部操作列：左側功能 + 右側功能。
class _ActionBar extends StatelessWidget {
  const _ActionBar(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (config.showLeft)
          Expanded(child: _LeftSection(config))
        else
          const Spacer(),
        if (config.showRight) _RightSection(config),
      ],
    );
  }
}

// ─── LeftSection ─────────────────────────────────────────────

/// 左側功能區，樣式由 [USpaceHeaderLeftFunction] 決定。
class _LeftSection extends StatelessWidget {
  const _LeftSection(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return switch (config.leftFunction) {
      // FullPage 返回箭頭（h=34 container）
      USpaceHeaderLeftFunction.fullPageIcon => _backIcon(colors, height: 34),

      // Floating / Modal 返回箭頭（h=24 container）
      USpaceHeaderLeftFunction.floatingIcon => _backIcon(colors, height: 24),

      // Floating LeftTitle 版：displayM 18px/26px Medium, maxWidth=310
      USpaceHeaderLeftFunction.title => _titleText(
          height: 26, // Figma: line-height 26px
          style: typo.displayM.copyWith(color: colors.textPrimary),
        ),

      // FullPage Profile 版：headingL 26px/34px + Semibold, maxWidth=310, pl=2
      USpaceHeaderLeftFunction.profileTitle => Padding(
          padding: const EdgeInsets.only(left: USpaceSpacing.spacer2),
          child: _titleText(
            height: 34,
            style: typo.headingL.copyWith(
              color: colors.textPrimary,
              fontWeight: AppTypographyExtension.semibold,
            ),
          ),
        ),
    };
  }

  Widget _backIcon(USpaceColorsExtension colors, {required double height}) {
    return GestureDetector(
      onTap: config.onLeftPressed,
      child: SizedBox(
        height: height,
        child: Align(
          alignment: Alignment.centerLeft,
          child: Icon(Icons.arrow_back_ios, size: 24, color: colors.contentPrimary),
        ),
      ),
    );
  }

  Widget _titleText({required double height, required TextStyle style}) {
    return SizedBox(
      height: height,
      child: Align(
        alignment: Alignment.centerLeft,
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: _leftTitleMaxWidth),
          child: Text(
            config.title ?? '',
            style: style,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ),
    );
  }
}

// ─── RightSection ────────────────────────────────────────────

/// 右側功能區，樣式由 [USpaceHeaderRightFunction] 決定。
class _RightSection extends StatelessWidget {
  const _RightSection(this.config);
  final USpacePageTitle config;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return switch (config.rightFunction) {
      // 24px icon: py=3（Figma 元件特定值），gap=12，可選 info icon
      USpaceHeaderRightFunction.icon24 => Padding(
          padding: const EdgeInsets.symmetric(vertical: 3),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (config.showRightInfo) ...[
                GestureDetector(
                  onTap: null, // Info icon 點擊由外部處理
                  child: Icon(Icons.help_outline, size: 24, color: colors.contentPrimary),
                ),
                const SizedBox(width: USpaceSpacing.spacer12),
              ],
              GestureDetector(
                onTap: config.onRightPressed,
                child: config.rightIcon ??
                    Icon(Icons.close, size: 24, color: colors.contentPrimary),
              ),
            ],
          ),
        ),

      // 32px icon: py=1（Figma 元件特定值）
      USpaceHeaderRightFunction.icon32 => Padding(
          padding: const EdgeInsets.symmetric(vertical: 1),
          child: GestureDetector(
            onTap: config.onRightPressed,
            child: config.rightLargeIcon ??
                Icon(Icons.chat_bubble_outline, size: 32, color: colors.contentPrimary),
          ),
        ),

      // TextButton: labelL 16px/24px, textTertiary
      USpaceHeaderRightFunction.textButton => GestureDetector(
          onTap: config.onRightPressed,
          child: Text(
            config.rightTextLabel ?? 'Action',
            style: typo.labelL.copyWith(color: colors.textTertiary),
            textAlign: TextAlign.center,
          ),
        ),
    };
  }
}

// ─── 裝飾性子元件 ─────────────────────────────────────────────

/// iOS Status Bar placeholder（Figma: Status bar - iPhone，node 1063:11892）
/// 此為展示用 placeholder，正式實作應使用 SafeArea + MediaQuery.padding.top
class _StatusBarPlaceholder extends StatelessWidget {
  const _StatusBarPlaceholder();

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;

    // Figma: pt=21, pb=19 → total = 59px（含 22px content）
    return SizedBox(
      height: 44,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Figma: SF Pro Semibold 17px（iOS 系統字，不在 typography token 內）
            Text(
              '9:41',
              style: TextStyle(
                fontFamily: 'SF Pro',
                fontSize: 17,
                fontWeight: AppTypographyExtension.semibold,
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
  const _GrabBarSpacing();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: USpaceSpacing.spacer20,
      child: Center(
        child: Container(
          width: _grabBarWidth,
          height: USpaceSpacing.spacer4,
          decoration: BoxDecoration(
            // Figma: --border/divider token（不是 contentTertiary）
            color: context.uColors.borderDivider,
            borderRadius: BorderRadius.circular(USpaceRadius.full),
          ),
        ),
      ),
    );
  }
}
