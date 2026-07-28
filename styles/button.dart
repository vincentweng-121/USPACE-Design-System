import 'dart:io' show Platform;
import 'dart:ui' show ImageFilter;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'glass_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── Button Level ─────────────────────────────────────────────
enum USpaceButtonLevel {
  accent,
  charging,
  primary,
  secondary,
  customized,
}

// ── Button Size ───────────────────────────────────────────────
enum USpaceButtonSize { regular, small }

// ── Button ───────────────────────────────────────────────────
class USpaceButton extends StatelessWidget {
  const USpaceButton({
    super.key,
    required this.label,
    required this.level,
    this.size = USpaceButtonSize.regular,
    this.icon,
    this.onPressed,
  });

  final String label;
  final USpaceButtonLevel level;
  final USpaceButtonSize size;

  /// 選填。傳入時顯示 Text + Icon 版型（icon 置於文字左側）。
  final Widget? icon;

  /// null 時按鈕呈現 disabled 狀態。
  final VoidCallback? onPressed;

  bool get _isDisabled => onPressed == null;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;

    if (level == USpaceButtonLevel.customized) {
      return _CustomizedButton(
        label: label,
        icon: icon,
        onPressed: onPressed,
        colors: colors,
        isDisabled: _isDisabled,
        size: size,
      );
    }

    final bgColor = _isDisabled
        ? colors.actionDisabledBg
        : _resolveBg(level, colors);

    final textColor = _isDisabled
        ? colors.actionDisabledContent
        : _resolveTextColor(level, colors);

    final iconColor = _isDisabled
        ? colors.actionDisabledContent
        : _resolveIconColor(level, colors);

    final isSmall = size == USpaceButtonSize.small;
    final padding = isSmall
        ? const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer8, horizontal: USpaceSpacing.spacer24)
        : const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer12);

    final button = Material(
      color: bgColor,
      shape: const StadiumBorder(),
      child: InkWell(
        onTap: onPressed,
        customBorder: const StadiumBorder(),
        child: Padding(
          padding: padding,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                IconTheme(
                  data: IconThemeData(color: iconColor, size: 24),
                  child: icon!,
                ),
                const SizedBox(width: USpaceSpacing.spacer8),
              ],
              Text(
                label,
                style: context.typography.labelL.copyWith(color: textColor),
              ),
            ],
          ),
        ),
      ),
    );

    if (isSmall) return button;
    return SizedBox(width: double.infinity, child: button);
  }

  Color _resolveBg(USpaceButtonLevel level, USpaceColorsExtension colors) {
    return switch (level) {
      USpaceButtonLevel.accent    => colors.actionPrimaryBg,
      USpaceButtonLevel.charging  => colors.actionPrimaryBg,
      USpaceButtonLevel.primary   => colors.actionPrimaryBg,
      USpaceButtonLevel.secondary => size == USpaceButtonSize.small
          ? colors.actionTertiaryBg
          : colors.actionSecondaryBg,
      USpaceButtonLevel.customized => Colors.transparent,
    };
  }

  Color _resolveTextColor(USpaceButtonLevel level, USpaceColorsExtension colors) {
    return switch (level) {
      USpaceButtonLevel.accent    => colors.actionPrimaryContentAccent,
      USpaceButtonLevel.charging  => colors.actionPrimaryContentCharging,
      USpaceButtonLevel.primary   => colors.actionPrimaryContent,
      USpaceButtonLevel.secondary => colors.actionSecondaryContent,
      USpaceButtonLevel.customized => colors.actionTertiaryContent,
    };
  }

  Color _resolveIconColor(USpaceButtonLevel level, USpaceColorsExtension colors) {
    return switch (level) {
      USpaceButtonLevel.accent    => colors.actionPrimaryContentAccent,
      USpaceButtonLevel.charging  => colors.actionPrimaryContentCharging,
      USpaceButtonLevel.primary   => colors.actionPrimaryContent,
      USpaceButtonLevel.secondary => colors.actionSecondaryContent,
      USpaceButtonLevel.customized => colors.actionTertiaryContent,
    };
  }
}

// ── Customized Button（漸層邊框） ─────────────────────────────
class _CustomizedButton extends StatelessWidget {
  const _CustomizedButton({
    required this.label,
    required this.icon,
    required this.onPressed,
    required this.colors,
    required this.isDisabled,
    required this.size,
  });

  final String label;
  final Widget? icon;
  final VoidCallback? onPressed;
  final USpaceColorsExtension colors;
  final bool isDisabled;
  final USpaceButtonSize size;

  @override
  Widget build(BuildContext context) {
    final textColor = isDisabled
        ? colors.actionDisabledContent
        : colors.actionTertiaryContent;

    final iconColor = isDisabled
        ? colors.actionDisabledContent
        : colors.actionTertiaryContent;

    final isSmall = size == USpaceButtonSize.small;
    final padding = isSmall
        ? const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer8, horizontal: USpaceSpacing.spacer24)
        : const EdgeInsets.symmetric(vertical: USpaceSpacing.spacer12);

    final inner = GestureDetector(
      onTap: onPressed,
      child: _GradientBorderContainer(
        gradient: USpaceColorsExtension.actionCustomizedBorder,
        borderWidth: 3,
        borderRadius: USpaceRadius.full,
        child: Padding(
          padding: padding,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                IconTheme(
                  data: IconThemeData(color: iconColor, size: 24),
                  child: icon!,
                ),
                const SizedBox(width: USpaceSpacing.spacer8),
              ],
              Text(
                label,
                style: context.typography.labelL.copyWith(color: textColor),
              ),
            ],
          ),
        ),
      ),
    );

    if (isSmall) return inner;
    return SizedBox(width: double.infinity, child: inner);
  }
}

// ── Gradient Border helper ────────────────────────────────────
class _GradientBorderContainer extends StatelessWidget {
  const _GradientBorderContainer({
    required this.gradient,
    required this.borderWidth,
    required this.borderRadius,
    required this.child,
  });

  final LinearGradient gradient;
  final double borderWidth;
  final double borderRadius;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _GradientBorderPainter(
        gradient: gradient,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
      ),
      child: child,
    );
  }
}

class _GradientBorderPainter extends CustomPainter {
  _GradientBorderPainter({
    required this.gradient,
    required this.borderWidth,
    required this.borderRadius,
  });

  final LinearGradient gradient;
  final double borderWidth;
  final double borderRadius;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final rrect = RRect.fromRectAndRadius(
      rect,
      Radius.circular(borderRadius),
    );
    final innerRRect = RRect.fromRectAndRadius(
      rect.deflate(borderWidth),
      Radius.circular(borderRadius - borderWidth),
    );

    final paint = Paint()
      ..shader = gradient.createShader(rect)
      ..style = PaintingStyle.fill;

    final path = Path()
      ..addRRect(rrect)
      ..addRRect(innerRRect)
      ..fillType = PathFillType.evenOdd;

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(_GradientBorderPainter oldDelegate) =>
      oldDelegate.gradient != gradient ||
      oldDelegate.borderWidth != borderWidth ||
      oldDelegate.borderRadius != borderRadius;
}

// ══════════════════════════════════════════════════════════════
// Floating Button
// ══════════════════════════════════════════════════════════════

// ── Platform helper ───────────────────────────────────────────
/// iOS 26+ 回傳 true（目前保留結構，實作與 Gaussian blur 相同）
/// iOS < 26 / Android / Web 回傳 false
bool _isLiquidGlass() {
  if (kIsWeb) return false;
  if (!Platform.isIOS) return false;
  final major = int.tryParse(
    Platform.operatingSystemVersion.split('.').first,
  ) ?? 0;
  return major >= 26;
}

// ── Glass background wrapper ──────────────────────────────────
class _GlassCircle extends StatelessWidget {
  const _GlassCircle({
    required this.child,
    this.onTap,
  });

  final Widget child;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    // iOS 26+: TODO 替換為 UIVisualEffectView Liquid Glass platform view
    //   目前 Liquid Glass 與一般平台共用同一組 blur 參數，
    //   待 platform view 就緒後再依 _isLiquidGlass() 分流。
    // iOS < 26 / Android / Web: BackdropFilter + Gaussian blur
    return GestureDetector(
      onTap: onTap,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(USpaceRadius.full),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: USpaceGlass.blurSigma,
            sigmaY: USpaceGlass.blurSigma,
          ),
          child: Container(
            padding: const EdgeInsets.all(USpaceSpacing.spacer8),
            decoration: BoxDecoration(
              color: USpaceGlass.fillColor,
              borderRadius: BorderRadius.circular(USpaceRadius.full),
            ),
            child: SizedBox(width: 28, height: 28, child: child),
          ),
        ),
      ),
    );
  }
}

// ── Floating Button（Single） ─────────────────────────────────
/// 單一圓形浮動按鈕。
/// 尺寸：44×44（8px padding + 28px icon）
/// 背景：glass fill + backdrop blur
class USpaceFloatingButton extends StatelessWidget {
  const USpaceFloatingButton({
    super.key,
    required this.icon,
    this.onTap,
  });

  /// 按鈕圖示，建議使用 28×28 Widget
  final Widget icon;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return _GlassCircle(onTap: onTap, child: icon);
  }
}

// ── Floating Button Bar（Multiple） ───────────────────────────
/// 多個浮動按鈕垂直堆疊的 pill 形容器。
/// - items 動態傳入，不限數量
/// - active 狀態由元件內部管理，點擊即切換
/// - 可透過 onItemTapped 監聽選取事件
class USpaceFloatingButtonBar extends StatefulWidget {
  const USpaceFloatingButtonBar({
    super.key,
    required this.icons,
    this.initialActiveIndex = 0,
    this.onItemTapped,
  });

  /// 圖示列表，每個項目建議使用 28×28 Widget
  final List<Widget> icons;

  /// 初始 active 項目索引；-1 表示無 active 狀態
  final int initialActiveIndex;

  /// 點擊後回傳被選取的索引
  final ValueChanged<int>? onItemTapped;

  @override
  State<USpaceFloatingButtonBar> createState() =>
      _USpaceFloatingButtonBarState();
}

class _USpaceFloatingButtonBarState extends State<USpaceFloatingButtonBar> {
  late int _activeIndex;

  @override
  void initState() {
    super.initState();
    _activeIndex = widget.initialActiveIndex;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.icons.isEmpty) return const SizedBox.shrink();

    final isLG = _isLiquidGlass();

    return ClipRRect(
      borderRadius: BorderRadius.circular(USpaceRadius.full),
      child: BackdropFilter(
        filter: ImageFilter.blur(
          sigmaX: isLG ? USpaceGlass.blurSigma : USpaceGlass.blurSigma,
          sigmaY: isLG ? USpaceGlass.blurSigma : USpaceGlass.blurSigma,
        ),
        child: Container(
          decoration: BoxDecoration(
            color: USpaceGlass.fillColor,
            borderRadius: BorderRadius.circular(USpaceRadius.full),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              for (var i = 0; i < widget.icons.length; i++) ...[
                if (i > 0) const SizedBox(height: USpaceSpacing.spacer2),
                _FloatingBarItem(
                  icon: widget.icons[i],
                  isActive: i == _activeIndex,
                  onTap: () {
                    setState(() => _activeIndex = i);
                    widget.onItemTapped?.call(i);
                  },
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _FloatingBarItem extends StatelessWidget {
  const _FloatingBarItem({
    required this.icon,
    required this.isActive,
    required this.onTap,
  });

  final Widget icon;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(USpaceSpacing.spacer8),
        decoration: BoxDecoration(
          color: isActive ? USpaceGlass.fillColor : Colors.transparent,
          borderRadius: BorderRadius.circular(USpaceRadius.full),
        ),
        child: SizedBox(width: 28, height: 28, child: icon),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════
// ScaleDownOrder Button
// ══════════════════════════════════════════════════════════════

/// 訂單縮小按鈕顯示模式
enum USpaceScaleDownOrderMode { single, multiple }

/// 訂單縮小按鈕
///
/// 使用者關閉進行中訂單後，Fix 在畫面下方，點擊可返回訂單畫面。
/// TODO: 僅在 Map 畫面顯示，顯示/隱藏邏輯待串接。
///
/// [USpaceScaleDownOrderMode.single]   → icon + 計時器（Count-up timer）
/// [USpaceScaleDownOrderMode.multiple] → icon + dot + 訂單數量
class USpaceScaleDownOrderButton extends StatelessWidget {
  const USpaceScaleDownOrderButton({
    super.key,
    required this.icon,
    required this.mode,
    this.time = '0:00:00',
    this.count = 1,
    this.onTap,
  });

  /// 服務類型 icon（建議 28×28 Widget，顏色由呼叫端注入）
  final Widget icon;

  /// 顯示模式
  final USpaceScaleDownOrderMode mode;

  /// Single 模式：計時器字串，格式 "H:MM:SS"，Count-up
  final String time;

  /// Multiple 模式：進行中訂單數量
  final int count;

  /// null 時按鈕無互動，視覺不變
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final colors   = context.uColors;
    final typo     = context.typography;
    final isSingle = mode == USpaceScaleDownOrderMode.single;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: isSingle ? 140.0 : null,
        padding: EdgeInsets.symmetric(
          vertical: 6, // Figma 元件特定值，無對應 spacing token（介於 spacer4 與 spacer8 之間）
          horizontal: isSingle ? USpaceSpacing.spacer16 : USpaceSpacing.spacer24,
        ),
        decoration: BoxDecoration(
          color: colors.projectUspaceBlack,
          borderRadius: BorderRadius.circular(USpaceRadius.full),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(width: 28, height: 28, child: icon),
            const SizedBox(width: USpaceSpacing.spacer8),
            if (isSingle)
              Text(
                time,
                style: typo.sfBodyL.copyWith(color: colors.textInverse),
              )
            else ...[
              Container(
                width: 6, // Figma dot indicator 固定尺寸，非 spacing token
                height: 6,
                decoration: BoxDecoration(
                  color: colors.textInverse,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: USpaceSpacing.spacer8),
              Text(
                '$count',
                style: typo.bodyL.copyWith(color: colors.textInverse),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
