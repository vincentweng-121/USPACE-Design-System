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
/// 按鈕的外觀樣式。2026-08-24 改版：由原本的 level（primary / secondary /
/// tertiary）收斂為兩種。
enum USpaceButtonStyle {
  /// 實心深底（actionPrimaryBg），文字為 actionPrimaryContent
  filled,

  /// 透明底 + silverLinear 漸層描邊，文字為 actionTertiaryContent
  outlined,
}

// ── Button Size ───────────────────────────────────────────────
/// Regular 滿寬、高 48；Small 貼合內容、高 40，並有最小寬度 112。
enum USpaceButtonSize { regular, small }

// ── Button State ──────────────────────────────────────────────
/// Figma 的 states property。目前無 pressed 狀態。
enum USpaceButtonState { enabled, disabled }

// ── Button ───────────────────────────────────────────────────
/// USPACE Design System Button。
///
/// 來源：Figma node 3998:7788（filled）/ 3998:7793（outlined）
///
/// 三個維度：style × size × state，文字左右兩側皆可放 icon。
///
/// Token mapping（顏色不隨 size 改變）：
///   ┌──────────┬────────────────────────┬────────────────────────┐
///   │ style    │ enabled                │ disabled               │
///   ├──────────┼────────────────────────┼────────────────────────┤
///   │ filled   │ bg actionPrimaryBg     │ bg actionDisabledBg    │
///   │          │ actionPrimaryContent   │ actionDisabledContent  │
///   │ outlined │ 透明底 + silverLinear  │ 同左，文字改為         │
///   │          │ 描邊                   │ actionDisabledContent  │
///   │          │ actionTertiaryContent  │                        │
///   └──────────┴────────────────────────┴────────────────────────┘
///
/// Layout：
///   圓角 USpaceRadius.full、icon 24px、icon 與文字間距 8
///   Regular：高 48、滿寬
///   Small：高 40、水平 padding 12、最小寬度 112，在此之上貼合內容
///
/// 文字：labelL（16/24）；**日文自動改用 labelM（14/20）**，
/// 由元件讀 App 的語系判斷，呼叫端不需要傳參數。
///
/// 2026-08-24 經使用者確認改版：移除 level 與 emphasis 兩個維度。
class USpaceButton extends StatelessWidget {
  const USpaceButton({
    super.key,
    required this.label,
    this.style = USpaceButtonStyle.filled,
    this.size = USpaceButtonSize.regular,
    this.state = USpaceButtonState.enabled,
    this.leadingIcon,
    this.trailingIcon,
    this.onPressed,
  });

  /// 按鈕文字
  final String label;

  /// 外觀樣式
  final USpaceButtonStyle style;

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

  /// 高度固定，以置中而非垂直 padding 推算——文字行高改變時高度才不會跟著跑
  static const double _height = 48;
  static const double _smallHeight = 40;

  /// small 貼合內容，但不小於這個寬度，否則一整排短標籤的按鈕會參差不齊
  static const double _smallMinWidth = 112;

  /// 兩種 size 共用的水平內距。regular 是滿版，這個值決定內容最靠邊的位置。
  /// 量自 Figma node 3670:3165（2026-09-01 更新，該版才補上 regular 的標示）
  static const double _paddingX = USpaceSpacing.spacer12;
  static const double _iconSize = 24;

  /// outlined 的描邊寬度。量自 Figma node 3734:15680 的 2 倍匯出圖
  static const double _borderWidth = 3;

  /// outlined 的 disabled：描邊降到 30% 透明度。文字與其他樣式一樣換成停用色。
  /// ⚠️ 2026-09-01 使用者指定的暫定值，Figma 尚無這個變體。
  /// 設計稿補上後要回頭校對，屆時這個常數應該換成 token。
  static const double _outlinedDisabledBorderOpacity = 0.3;

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final content = _contentColor(colors);
    final isSmall = size == USpaceButtonSize.small;
    final shape = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(USpaceRadius.full),
    );

    final button = Material(
      color: _backgroundColor(colors),
      shape: shape,
      child: InkWell(
        onTap: _isDisabled ? null : onPressed,
        customBorder: shape,
        child: SizedBox(
          height: isSmall ? _smallHeight : _height,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: _paddingX),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                if (leadingIcon != null) ...[
                  _icon(leadingIcon!, content),
                  const SizedBox(width: USpaceSpacing.spacer8),
                ],
                // Flexible + ellipsis：文字過長時單行截斷，不要撐破按鈕或換行。
                // 見 Figma 的 button-edge-case2（過長標籤）
                Flexible(
                  child: Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: _labelStyle(context).copyWith(color: content),
                  ),
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

    // outlined 的描邊是漸層，Flutter 的 Border 只吃單色，所以自己畫
    final framed = style == USpaceButtonStyle.outlined
        ? CustomPaint(
            foregroundPainter: _GradientBorderPainter(
              gradient: USpaceColorsExtension.silverLinear,
              width: _borderWidth,
              opacity: _isDisabled ? _outlinedDisabledBorderOpacity : 1,
            ),
            child: button,
          )
        : button;

    if (isSmall) {
      return ConstrainedBox(
        constraints: const BoxConstraints(minWidth: _smallMinWidth),
        child: framed,
      );
    }
    return SizedBox(width: double.infinity, child: framed);
  }

  /// 日文用小一階的字級。讀 App 的語系，呼叫端不需要傳參數；
  /// 沒有 Localizations 時（例如單元測試直接 pump）退回預設字級。
  TextStyle _labelStyle(BuildContext context) {
    final typo = context.typography;
    final isJapanese =
        Localizations.maybeLocaleOf(context)?.languageCode == 'ja';
    return isJapanese ? typo.labelM : typo.labelL;
  }

  Widget _icon(Widget icon, Color color) => IconTheme(
        data: IconThemeData(color: color, size: _iconSize),
        child: icon,
      );

  /// filled 才有底色；outlined 是透明底，靠描邊界定範圍
  Color? _backgroundColor(USpaceColorsExtension colors) {
    if (style == USpaceButtonStyle.outlined) return Colors.transparent;
    return _isDisabled ? colors.actionDisabledBg : colors.actionPrimaryBg;
  }

  Color _contentColor(USpaceColorsExtension colors) {
    if (_isDisabled) return colors.actionDisabledContent;
    return switch (style) {
      USpaceButtonStyle.filled => colors.actionPrimaryContent,
      USpaceButtonStyle.outlined => colors.actionTertiaryContent,
    };
  }
}

// ── 漸層描邊 ──────────────────────────────────────────────────
/// 沿著 stadium 外框畫一圈漸層線。
///
/// Flutter 的 BoxDecoration.border 只接受單色，而 outlined 的描邊是
/// silverLinear；用「外層漸層底 + 內層填色遮住中間」的做法會讓底色不再透明，
/// 所以這裡直接畫 stroke。
class _GradientBorderPainter extends CustomPainter {
  const _GradientBorderPainter({
    required this.gradient,
    required this.width,
    this.opacity = 1,
  });

  final Gradient gradient;
  final double width;

  /// 整條描邊的不透明度。disabled 時調低，讓按鈕看起來收起來
  final double opacity;

  @override
  void paint(Canvas canvas, Size size) {
    // stroke 以路徑為中心線，往內縮半個線寬才不會被裁掉一半
    final rect = Offset.zero & size;
    final inset = rect.deflate(width / 2);
    final radius = Radius.circular(size.height / 2);
    canvas.drawRRect(
      RRect.fromRectAndRadius(inset, radius),
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = width
        ..shader = gradient.createShader(rect)
        ..color = Color.fromRGBO(0, 0, 0, opacity),
    );
  }

  @override
  bool shouldRepaint(_GradientBorderPainter old) =>
      old.gradient != gradient || old.width != width || old.opacity != opacity;
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
