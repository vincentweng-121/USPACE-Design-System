import 'package:flutter/material.dart';
import 'uspace_colors_extension.dart';
import 'typography_extension.dart';
import 'spacing_extension.dart';

// ── ActionArea Background ─────────────────────────────────
/// 動作區的背景。
enum USpaceActionAreaBackground {
  /// Gray: 由下往上的灰色漸層，讓按鈕與底下捲動的內容分開。
  /// 依按鈕列數選漸層——單列用 bottomBarGray1B、多列用 bottomBarGray2B
  gray,

  /// None: 沒有背景，直接疊在頁面內容上
  none,
}

// ── USpaceActionArea ──────────────────────────────────────
/// USPACE Design System Action Area component.
///
/// 來源：Figma node 1210:8629
///
/// 頁面底部放關鍵行動的區塊。這個元件負責的是**版面**——背景漸層、左右邊距、
/// 按鈕之間的間距、上方的說明文字，以及底部的 home indicator 留白。
///
/// **按鈕本身由呼叫端傳入**，這個元件不畫按鈕。Figma 變體名稱裡的
/// 「1 button／2 button／3 button／1 button + 2 row」講的是呼叫端要放幾個
/// [children]，不是這個元件的參數。需要一列並排兩顆時，自己傳一個 Row 進來。
///
/// Layout（Figma node 1216:8237 與 1824:11529 的子節點座標）:
/// - 左右邊距 20（Margine）、頂部 20
/// - 每個 child 之間間距 20
/// - Text 與按鈕區之間間距 12
/// - 底部保留 20 給 home indicator
///
/// Token mapping:
/// - gray 背景：單列 bottomBarGray1B、多列 bottomBarGray2B
/// - none 背景：不畫背景
/// - text：textSecondary，字體 captionS (12/16)
///
/// 漸層有明暗兩套：light 用 grey50、dark 用 grey900，兩者都是 pageSecondary
/// 對應主題的值——漸層畫的就是頁面背景色的淡出。Figma 上這兩個是 fill style
/// 而非 variable，style 沒有明暗模式，dark 變體是 2026-08-17 經使用者指示建立的。
///
/// ⚠️ 2026-08-17 匯入時經使用者指示，略過所有 Premium Accout=True 的變體。
class USpaceActionArea extends StatelessWidget {
  const USpaceActionArea({
    super.key,
    required this.children,
    this.text,
    this.background = USpaceActionAreaBackground.gray,
    this.showHomeIndicator = true,
  });

  /// 由上到下排列的行動。每一項通常是一顆 USpaceButton；
  /// 需要一列並排多顆時傳 Row。傳空陣列會得到一個只有內距的空殼——
  /// const 建構子無法對 List 取 length，擋不了，呼叫端自己留意
  final List<Widget> children;

  /// 按鈕上方的說明文字。null 時整行不佔空間
  final String? text;

  /// 背景樣式
  final USpaceActionAreaBackground background;

  /// 是否保留底部的 home indicator 留白。
  /// 已經被 SafeArea 包住時關掉，避免留白疊兩次
  final bool showHomeIndicator;

  /// 單列與多列的漸層不同——多列的涵蓋範圍較高，才蓋得住底下的內容
  bool get _isMultiRow => children.length > 1;

  /// 漸層是 static 常數而不是 ThemeExtension 的欄位，所以這裡自己看 brightness。
  /// 它畫的是頁面背景色的淡出，明暗兩套顏色不同
  Gradient? _gradientFor(Brightness brightness) {
    if (background == USpaceActionAreaBackground.none) return null;
    final isDark = brightness == Brightness.dark;
    if (_isMultiRow) {
      return isDark
          ? USpaceColorsExtension.bottomBarGray2BDark
          : USpaceColorsExtension.bottomBarGray2B;
    }
    return isDark
        ? USpaceColorsExtension.bottomBarGray1BDark
        : USpaceColorsExtension.bottomBarGray1B;
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.uColors;
    final typo = context.typography;

    return DecoratedBox(
      decoration: BoxDecoration(
        gradient: _gradientFor(Theme.of(context).brightness),
      ),
      child: Padding(
        padding: EdgeInsets.only(
          left: USpaceSpacing.margin,
          right: USpaceSpacing.margin,
          top: USpaceSpacing.spacer20,
          bottom: showHomeIndicator ? USpaceSpacing.spacer20 : 0,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (text != null) ...[
              Text(
                text!,
                textAlign: TextAlign.center,
                style: typo.captionS.copyWith(color: colors.textSecondary),
              ),
              const SizedBox(height: USpaceSpacing.spacer12),
            ],
            for (var i = 0; i < children.length; i++) ...[
              if (i > 0) const SizedBox(height: USpaceSpacing.spacer20),
              children[i],
            ],
          ],
        ),
      ),
    );
  }
}
