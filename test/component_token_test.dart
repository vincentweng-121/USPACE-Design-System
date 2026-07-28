import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../styles/uspace_design_system.dart';

/// 由 tokens/components/*.json 驅動的元件 token 測試。
///
/// 這是整條鏈路的端到端驗證：
///   tokens/*.json → 產生的 Dart token → 元件實際套用 → 畫面上的色值
///
/// 目的是取代人工 audit。過去「元件有沒有正確使用 token」只能靠肉眼逐一比對
/// Figma 與程式碼（見 rules/LESSONS_LEARNED.md 2026-04-16 的教訓），
/// 現在改動任何一環而忘了同步，CI 就會擋下來。
void main() {
  // ── 從 tokens/ 解析 semantic token → 實際 Color ──
  Map<String, dynamic> readJson(String path) =>
      jsonDecode(File(path).readAsStringSync()) as Map<String, dynamic>;

  final paletteHex = <String, String>{};
  for (final g in readJson('tokens/palette.json')['groups'] as List) {
    (g['tokens'] as Map<String, dynamic>).forEach((k, v) {
      paletteHex[k] = v['value'] as String;
    });
  }

  final semanticToPalette = <String, String>{};
  for (final g in readJson('tokens/semantic-colors.json')['groups'] as List) {
    (g['tokens'] as Map<String, dynamic>).forEach((k, v) {
      semanticToPalette[k] = v['light'] as String;
    });
  }

  Color tokenColor(String semanticName) {
    final p = semanticToPalette[semanticName];
    expect(p, isNotNull, reason: 'semantic-colors.json 沒有 token：$semanticName');
    final hex = paletteHex[p];
    expect(hex, isNotNull, reason: 'palette.json 沒有色票：$p');
    return Color(int.parse(hex!.substring(2), radix: 16));
  }

  Future<void> pump(WidgetTester tester, Widget child) => tester.pumpWidget(
        MaterialApp(
          theme: USpaceTheme.light,
          home: Scaffold(body: Center(child: child)),
        ),
      );

  List<Map<String, dynamic>> variantsOf(String file) =>
      (readJson('tokens/components/$file')['variants'] as List)
          .cast<Map<String, dynamic>>();

  // ── Button ──────────────────────────────────────────────
  group('USpaceButton', () {
    const levels = {
      'accent': USpaceButtonLevel.accent,
      'charging': USpaceButtonLevel.charging,
      'primary': USpaceButtonLevel.primary,
      'secondary': USpaceButtonLevel.secondary,
    };
    const sizes = {
      'regular': USpaceButtonSize.regular,
      'small': USpaceButtonSize.small,
    };

    for (final v in variantsOf('button.json')) {
      final label = '${v['level']} / ${v['size']} / ${v['state']}';
      testWidgets(label, (tester) async {
        await pump(
          tester,
          USpaceButton(
            label: 'Label',
            level: levels[v['level']]!,
            size: sizes[v['size']]!,
            onPressed: v['state'] == 'enabled' ? () {} : null,
          ),
        );

        final material = tester.widget<Material>(
          find.descendant(of: find.byType(USpaceButton), matching: find.byType(Material)).first,
        );
        expect(
          material.color,
          tokenColor(v['bg'] as String),
          reason: '$label 的底色應為 ${v['bg']}',
        );

        final text = tester.widget<Text>(find.text('Label'));
        expect(
          text.style?.color,
          tokenColor(v['content'] as String),
          reason: '$label 的文字色應為 ${v['content']}',
        );
      });
    }
  });

  // ── Toggle ──────────────────────────────────────────────
  group('USpaceToggle', () {
    final layout = readJson('tokens/components/toggle.json')['layout'] as Map<String, dynamic>;
    final thumbW = (layout['thumb']['width'] as num).toDouble();
    final thumbH = (layout['thumb']['height'] as num).toDouble();

    for (final v in variantsOf('toggle.json')) {
      final label = '${v['value']} / ${v['enabled']}';
      testWidgets(label, (tester) async {
        await pump(
          tester,
          USpaceToggle(
            value: v['value'] == 'on',
            enabled: v['enabled'] == 'enabled',
            onChanged: (_) {},
          ),
        );

        final track = tester.widget<AnimatedContainer>(find.byType(AnimatedContainer));
        expect(
          (track.decoration as BoxDecoration).color,
          tokenColor(v['track'] as String),
          reason: '$label 的 track 應為 ${v['track']}',
        );

        // 以 layout 尺寸定位 thumb：AnimatedContainer 內部也會自建 Container
        final thumbFinder = find.byWidgetPredicate(
          (w) =>
              w is Container &&
              w.constraints?.maxWidth == thumbW &&
              w.constraints?.maxHeight == thumbH,
          description: 'thumb (${thumbW.toInt()}×${thumbH.toInt()})',
        );
        expect(thumbFinder, findsOneWidget, reason: '$label 找不到 thumb');
        final thumb = tester.widget<Container>(thumbFinder);
        expect(
          (thumb.decoration as BoxDecoration).color,
          tokenColor(v['thumb'] as String),
          reason: '$label 的 thumb 應為 ${v['thumb']}',
        );

        final opacity = tester.widget<Opacity>(find.byType(Opacity).first);
        expect(opacity.opacity, v['opacity'], reason: '$label 的 opacity');
      });
    }
  });

  // ── Chip ────────────────────────────────────────────────
  group('USpaceChip', () {
    const levels = {
      'accent': USpaceChipLevel.accent,
      'primary': USpaceChipLevel.primary,
      'secondary': USpaceChipLevel.secondary,
      'outline': USpaceChipLevel.outline,
    };

    for (final v in variantsOf('chip.json')) {
      testWidgets('${v['level']}', (tester) async {
        await pump(tester, USpaceChip(label: 'Tag', level: levels[v['level']]!));

        final container = tester.widget<Container>(
          find.descendant(of: find.byType(USpaceChip), matching: find.byType(Container)).first,
        );
        final decoration = container.decoration as BoxDecoration;

        if (v['bg'] == null) {
          expect(decoration.color, isNull, reason: '${v['level']} 應為透明底');
          expect(decoration.border, isNotNull, reason: '${v['level']} 應有邊框');
        } else {
          expect(
            decoration.color,
            tokenColor(v['bg'] as String),
            reason: '${v['level']} 的底色應為 ${v['bg']}',
          );
        }
      });
    }
  });

  // ── 主題接線 ────────────────────────────────────────────
  group('USpaceTheme', () {
    testWidgets('light 主題提供兩個 ThemeExtension', (tester) async {
      late BuildContext ctx;
      await tester.pumpWidget(MaterialApp(
        theme: USpaceTheme.light,
        home: Builder(builder: (c) {
          ctx = c;
          return const SizedBox();
        }),
      ));
      expect(ctx.uColors, same(USpaceColorsExtension.light));
      expect(ctx.typography, same(AppTypographyExtension.light));
    });

    testWidgets('dark 主題提供 dark token', (tester) async {
      late BuildContext ctx;
      await tester.pumpWidget(MaterialApp(
        theme: USpaceTheme.dark,
        home: Builder(builder: (c) {
          ctx = c;
          return const SizedBox();
        }),
      ));
      expect(ctx.uColors, same(USpaceColorsExtension.dark));
      expect(ctx.typography, same(AppTypographyExtension.dark));
    });

    test('extensionsFor 依 brightness 回傳對應主題', () {
      expect(USpaceTheme.extensionsFor(Brightness.light),
          containsAll([USpaceColorsExtension.light, AppTypographyExtension.light]));
      expect(USpaceTheme.extensionsFor(Brightness.dark),
          containsAll([USpaceColorsExtension.dark, AppTypographyExtension.dark]));
    });

    test('未接主題時 context extension 回退到 light', () {
      // uColors / typography 的 ?? fallback 行為
      expect(USpaceColorsExtension.light.contentPrimary, isNotNull);
      expect(AppTypographyExtension.light.bodyM.fontSize, 16);
    });
  });
}
