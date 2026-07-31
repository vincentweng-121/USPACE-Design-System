import 'dart:io' show Platform;
import 'dart:ui' show ImageFilter;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'glass_extension.dart';
import 'radius_extension.dart';
import 'spacing_extension.dart';

// ── Button Style ─────────────────────────────────────────────
/// 行動權重，由重到輕三個層級。
enum USpaceButtonStyle {
  /// 實心底（actionPrimaryBg），最高行動權重
  primary,

  /// 透明底 + 2px 描邊
  secondary,

  /// 透明底、無描邊，純文字按鈕
  tertiary,
}

// ── Button Emphasis ───────────────────────────────────────────
/// primary 的文字色變化，用來讓同為 primary 的按鈕再拉開強調程度。
///
/// 只對 [USpaceButtonStyle.primary] 的 enabled 狀態生效；
/// secondary / tertiary 與所有 disabled 狀態都會忽略這個值。
enum USpaceButtonEmphasis {
  /// 一般文字色（actionPrimaryContent）
  none,

  /// 螢光綠文字（actionPrimaryContentAccent），最強調
  accent,

  /// 充電流程專用的螢光綠（actionPrimaryContentCharging）
  charging,
}

// ── Button Size ───────────────────────────────────────────────
/// Regular 滿寬、Small 貼合內容。兩者高度皆為 48。
enum USpaceButtonSize { regular, small }

// ── Button State ──────────────────────────────────────────────
/// Figma 的 states property。目前無 pressed 狀態。
enum USpaceButtonState { enabled, disabled }

// ── Button ───────────────────────────────────────────────────
/// USPACE Design System Button。
///
/// 來源：Figma node 3611:8842（Size: Regular）/ 3611:8861（Size: Small）
///
/// 四個維度：style × emphasis × size × state，文字左右兩側皆可放 icon。
///
/// style 是行動權重（primary / secondary / tertiary）；
/// emphasis 只改 primary 的文字色，不改變權重層級。
///
/// Token mapping（顏色不隨 size 改變）：
///   ┌───────────┬──────────────────────┬──────────────────────────┐
///   │ style     │ enabled              │ disabled                 │
///   ├───────────┼──────────────────────┼──────────────────────────┤
///   │ primary   │ bg actionPrimaryBg   │ bg actionDisabledBg      │
///   │           │ emphasis.none        │ actionDisabledContent    │
///   │           │   actionPrimary-     │ （emphasis 不生效）      │
///   │           │   Content            │                          │
///   │           │ emphasis.accent      │                          │
///   │           │   ...ContentAccent   │                          │
///   │           │ emphasis.charging    │                          │
///   │           │   ...ContentCharging │                          │
///   │ secondary │ 透明 + 2px 描邊      │ 透明 + 2px 描邊          │
///   │           │ actionSecondary-     │ actionDisabledBg 描邊    │
///   │           │ Content（描邊同文字）│ actionDisabledContent    │
///   │ tertiary  │ 透明、無描邊         │ 透明、無描邊             │
///   │           │ actionTertiaryContent│ actionDisabledContent    │
///   └───────────┴──────────────────────┴──────────────────────────┘
///
/// Layout：
///   高度 48（固定）、圓角 full、icon 24px、icon 與文字間距 8
///   Regular：滿寬
///   Small：水平 padding 24、貼合內容
class USpaceButton extends StatelessWidget {
  const USpaceButton({
    super.key,
    required this.label,
    this.style = USpaceButtonStyle.primary,
    this.emphasis = USpaceButtonEmphasis.none,
    this.size = USpaceButtonSize.regular,
    this.state = USpaceButtonState.enabled,
    this.leadingIcon,
    this.trailingIcon,
    this.onPressed,
  });

  /// 按鈕文字
  final String label;

  /// 行動權重
  final USpaceButtonStyle style;

  /// primary 的文字色變化。只對 primary 的 enabled 狀態生效。
  final USpaceButtonEmphasis emphasis;

  /// 尺寸
  final USpaceButtonSize size;

  /// 狀態。onPressed 為 null 時同樣視為 disabled。
  final USpaceButtonState state;

  /// 文字左側 icon（建議 24×24）
  final Widget? leadingIcon;

  /// 文字右側 icon（建議 24×24）
  final Widget? trailingIcon;

  /// 點擊回呼。null 時按鈕不可操作且呈現 disabled 外觀。
  final VoidCallback? onPressed;

  bool get _isDisabled =>
      state == USpaceButtonState.disabled || onPressed == null;

  /// Figma 固定高度。文字為 displayM（行高 26），因此以固定高度置中，
  /// 而非用垂直 padding 推算，否則會變成 50。
  static const double _height = 48;
  static const double _iconSize = 24;
  static const double _borderWidth = 2;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final content = _contentColor(colors);
    final border = _borderColor(colors);
    final isSmall = size == USpaceButtonSize.small;

    final button = Material(
      color: _backgroundColor(colors) ?? Colors.transparent,
      shape: border == null
          ? const StadiumBorder()
          : StadiumBorder(
              side: BorderSide(color: border, width: _borderWidth),
            ),
      child: InkWell(
        onTap: _isDisabled ? null : onPressed,
        customBorder: const StadiumBorder(),
        child: SizedBox(
          height: _height,
          child: Padding(
            padding: isSmall
                ? const EdgeInsets.symmetric(horizontal: USpaceSpacing.spacer24)
                : EdgeInsets.zero,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                if (leadingIcon != null) ...[
                  _icon(leadingIcon!, content),
                  const SizedBox(width: USpaceSpacing.spacer8),
                ],
                Text(
                  label,
                  style: context.typography.displayM.copyWith(color: content),
                ),
                if (trailingIcon != null) ...[
                  const SizedBox(width: USpaceSpacing.spacer8),
                  _icon(trailingIcon!, content),
                ],
              ],
            ),
          ),
        ),
      ),
    );

    if (isSmall) return button;
    return SizedBox(width: double.infinity, child: button);
  }

  Widget _icon(Widget icon, Color color) => IconTheme(
        data: IconThemeData(color: color, size: _iconSize),
        child: icon,
      );

  /// secondary / tertiary 為透明底，回傳 null。
  Color? _backgroundColor(USpaceColorsExtension colors) {
    switch (style) {
      case USpaceButtonStyle.secondary:
      case USpaceButtonStyle.tertiary:
        return null;
      case USpaceButtonStyle.primary:
        return _isDisabled ? colors.actionDisabledBg : colors.actionPrimaryBg;
    }
  }

  /// 只有 secondary 有描邊。Figma 的描邊色與文字色相同，
  /// 因此沿用 actionSecondaryContent，不另立 border token。
  Color? _borderColor(USpaceColorsExtension colors) {
    if (style != USpaceButtonStyle.secondary) return null;
    return _isDisabled ? colors.actionDisabledBg : colors.actionSecondaryContent;
  }

  Color _contentColor(USpaceColorsExtension colors) {
    if (_isDisabled) return colors.actionDisabledContent;
    return switch (style) {
      // emphasis 只改 primary 的文字色，不影響其他兩個層級
      USpaceButtonStyle.primary => switch (emphasis) {
          USpaceButtonEmphasis.none => colors.actionPrimaryContent,
          USpaceButtonEmphasis.accent => colors.actionPrimaryContentAccent,
          USpaceButtonEmphasis.charging => colors.actionPrimaryContentCharging,
        },
      USpaceButtonStyle.secondary => colors.actionSecondaryContent,
      USpaceButtonStyle.tertiary => colors.actionTertiaryContent,
    };
  }
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
