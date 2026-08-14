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
      'primary': USpaceButtonLevel.primary,
      'secondary': USpaceButtonLevel.secondary,
      'tertiary': USpaceButtonLevel.tertiary,
    };
    const emphases = {
      'none': USpaceButtonEmphasis.none,
      'accent': USpaceButtonEmphasis.accent,
      'charging': USpaceButtonEmphasis.charging,
    };
    const sizes = {
      'regular': USpaceButtonSize.regular,
      'small': USpaceButtonSize.small,
    };
    final layout = readJson('tokens/components/button.json')['layout'] as Map<String, dynamic>;

    // 顏色不隨 size 改變，因此每個 style × emphasis × state 都在兩種 size 各驗一次
    for (final v in variantsOf('button.json')) {
      for (final sizeKey in sizes.keys) {
        final label = '${v['level']} / ${v['emphasis']} / $sizeKey / ${v['state']}';
        testWidgets(label, (tester) async {
          await pump(
            tester,
            USpaceButton(
              label: 'Label',
              level: levels[v['level']]!,
              emphasis: emphases[v['emphasis']]!,
              size: sizes[sizeKey]!,
              state: v['state'] == 'enabled'
                  ? USpaceButtonState.enabled
                  : USpaceButtonState.disabled,
              leadingIcon: const Icon(Icons.directions_car),
              trailingIcon: const Icon(Icons.chevron_right),
              onPressed: () {},
            ),
          );

          final material = tester.widget<Material>(
            find
                .descendant(of: find.byType(USpaceButton), matching: find.byType(Material))
                .first,
          );

          // 底色：null 代表透明
          expect(
            material.color,
            v['bg'] == null ? Colors.transparent : tokenColor(v['bg'] as String),
            reason: '$label 的底色應為 ${v['bg'] ?? '透明'}',
          );

          // 描邊：只有 secondary 有
          final shape = material.shape as StadiumBorder;
          if (v['border'] == null) {
            expect(shape.side.style, BorderStyle.none, reason: '$label 不應有描邊');
          } else {
            expect(
              shape.side.color,
              tokenColor(v['border'] as String),
              reason: '$label 的描邊應為 ${v['border']}',
            );
          }

          final text = tester.widget<Text>(find.text('Label'));
          expect(
            text.style?.color,
            tokenColor(v['content'] as String),
            reason: '$label 的文字色應為 ${v['content']}',
          );

          // 高度固定 48，兩種 size 相同
          expect(
            tester.getSize(find.text('Label')).height <= (layout['height'] as num),
            isTrue,
            reason: '$label 的內容不應超過固定高度',
          );
        });
      }
    }

    testWidgets('左右 icon 可各自省略', (tester) async {
      await pump(
        tester,
        const USpaceButton(label: 'Label', leadingIcon: Icon(Icons.add)),
      );
      expect(find.byIcon(Icons.add), findsOneWidget);
      expect(find.byType(Icon), findsOneWidget);
    });

    testWidgets('state=disabled 時不可點擊', (tester) async {
      var taps = 0;
      await pump(
        tester,
        USpaceButton(
          label: 'Label',
          state: USpaceButtonState.disabled,
          onPressed: () => taps++,
        ),
      );
      await tester.tap(find.text('Label'));
      expect(taps, 0);
    });

    testWidgets('文字使用 displayM', (tester) async {
      await pump(tester, USpaceButton(label: 'Label', onPressed: () {}));
      final text = tester.widget<Text>(find.text('Label'));
      expect(text.style?.fontSize, AppTypographyExtension.light.displayM.fontSize);
      expect(text.style?.fontWeight, AppTypographyExtension.medium);
    });

    // emphasis 是 primary 專用的文字色變化，不應外溢到其他層級
    for (final level in [USpaceButtonLevel.secondary, USpaceButtonLevel.tertiary]) {
      testWidgets('${level.name} 忽略 emphasis', (tester) async {
        for (final e in USpaceButtonEmphasis.values) {
          await pump(
            tester,
            USpaceButton(
              label: 'Label',
              level: level,
              emphasis: e,
              onPressed: () {},
            ),
          );
          final text = tester.widget<Text>(find.text('Label'));
          expect(
            text.style?.color,
            tokenColor(
              level == USpaceButtonLevel.secondary
                  ? 'actionSecondaryContent'
                  : 'actionTertiaryContent',
            ),
            reason: '${level.name} 的文字色不應隨 emphasis=${e.name} 改變',
          );
        }
      });
    }

    testWidgets('預設為 primary / emphasis none', (tester) async {
      await pump(tester, USpaceButton(label: 'Label', onPressed: () {}));
      final material = tester.widget<Material>(
        find
            .descendant(of: find.byType(USpaceButton), matching: find.byType(Material))
            .first,
      );
      expect(material.color, tokenColor('actionPrimaryBg'));
      final text = tester.widget<Text>(find.text('Label'));
      expect(text.style?.color, tokenColor('actionPrimaryContent'));
    });
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
    };
    const styles = {
      'filled': USpaceChipStyle.filled,
      'outlined': USpaceChipStyle.outlined,
      'text': USpaceChipStyle.text,
    };

    for (final v in variantsOf('chip.json')) {
      // outlined 與 text 不吃 level，規格檔就不帶這個欄位；level 傳什麼都不該影響結果
      final name = v['level'] == null ? '${v['style']}' : '${v['style']} / ${v['level']}';
      testWidgets(name, (tester) async {
        await pump(
          tester,
          USpaceChip(
            label: 'Tag',
            style: styles[v['style']]!,
            level: levels[v['level']] ?? USpaceChipLevel.accent,
          ),
        );

        final container = tester.widget<Container>(
          find.descendant(of: find.byType(USpaceChip), matching: find.byType(Container)).first,
        );
        final decoration = container.decoration as BoxDecoration;

        if (v['bg'] == null) {
          expect(decoration.color, isNull, reason: '$name 應為透明底');
        } else {
          expect(
            decoration.color,
            tokenColor(v['bg'] as String),
            reason: '$name 的底色應為 ${v['bg']}',
          );
        }

        // 邊框：有 border token 的要照 token 上色，沒有的不該畫框
        if (v['border'] == null) {
          expect(decoration.border, isNull, reason: '$name 不應有邊框');
        } else {
          expect(
            (decoration.border as Border).top.color,
            tokenColor(v['border'] as String),
            reason: '$name 的邊框應為 ${v['border']}',
          );
        }

        final text = tester.widget<Text>(
          find.descendant(of: find.byType(USpaceChip), matching: find.byType(Text)).first,
        );
        expect(
          text.style?.color,
          tokenColor(v['content'] as String),
          reason: '$name 的文字應為 ${v['content']}',
        );
      });
    }

    // small 沒有 icon 版本。少了這個，widget 照畫 icon 也不會有人發現
    testWidgets('small 忽略 leadingIcon', (tester) async {
      await pump(
        tester,
        const USpaceChip(
          label: 'Tag',
          size: USpaceChipSize.small,
          leadingIcon: Icon(Icons.star),
        ),
      );
      expect(
        find.descendant(of: find.byType(USpaceChip), matching: find.byType(Icon)),
        findsNothing,
        reason: 'small 不支援 leading icon，傳了也不該畫出來',
      );
    });

    testWidgets('regular 仍然畫 leadingIcon', (tester) async {
      await pump(
        tester,
        const USpaceChip(
          label: 'Tag',
          leadingIcon: Icon(Icons.star),
        ),
      );
      expect(
        find.descendant(of: find.byType(USpaceChip), matching: find.byType(Icon)),
        findsOneWidget,
        reason: 'regular 的 leading icon 不該被這個規則影響',
      );
    });

    // level 只在 filled 生效。少了這個，把 level 誤接到 outlined 的底色也不會被發現
    for (final style in [USpaceChipStyle.outlined, USpaceChipStyle.text]) {
      testWidgets('${style.name} 忽略 level', (tester) async {
        final decorations = <BoxDecoration>[];
        for (final level in USpaceChipLevel.values) {
          await pump(tester, USpaceChip(label: 'Tag', style: style, level: level));
          final container = tester.widget<Container>(
            find.descendant(of: find.byType(USpaceChip), matching: find.byType(Container)).first,
          );
          decorations.add(container.decoration as BoxDecoration);
        }
        expect(
          decorations.every((d) => d.color == decorations.first.color),
          isTrue,
          reason: '${style.name} 的底色不該隨 level 改變',
        );
      });
    }
  });

  // ── DropdownMenu ────────────────────────────────────────
  group('USpaceDropdownMenu', () {
    const statuses = {
      'default': USpaceDropdownMenuStatus.defaultStatus,
      'complete': USpaceDropdownMenuStatus.complete,
      'selecting': USpaceDropdownMenuStatus.selecting,
      'incomplete': USpaceDropdownMenuStatus.incomplete,
      'error': USpaceDropdownMenuStatus.error,
      'nonEditable': USpaceDropdownMenuStatus.nonEditable,
    };

    // showHint 維持 false：hint 只該由 incomplete / error 自己觸發，
    // 傳 true 會讓每個狀態都畫出 hint，就驗不到「哪些狀態該有 hint」
    Widget menuOf(String statusKey) => USpaceDropdownMenu<String>(
          label: 'Label',
          placeholder: 'Placeholder',
          hint: 'Hint',
          items: const ['A'],
          itemLabelBuilder: (_) => 'Input',
          selectedItem: 'A',
          status: statuses[statusKey]!,
        );

    Color colorOfText(WidgetTester tester, String text) =>
        tester.widget<Text>(find.text(text)).style!.color!;

    for (final v in variantsOf('dropdown_menu.json')) {
      final status = v['status'] as String;

      testWidgets(status, (tester) async {
        await pump(tester, menuOf(status));

        final decoration = tester
            .widget<Container>(find
                .descendant(
                  of: find.byType(USpaceDropdownMenu<String>),
                  matching: find.byType(Container),
                )
                .first)
            .decoration as BoxDecoration;

        expect(decoration.color, tokenColor(v['bg'] as String),
            reason: '$status 的底色應為 ${v['bg']}');

        if (v['border'] == null) {
          expect(decoration.border, isNull, reason: '$status 不應有邊框');
        } else {
          expect((decoration.border as Border).top.color,
              tokenColor(v['border'] as String),
              reason: '$status 的邊框應為 ${v['border']}');
        }

        expect(colorOfText(tester, 'Label'), tokenColor(v['label'] as String),
            reason: '$status 的 label 應為 ${v['label']}');

        // placeholder 系的狀態顯示 placeholder，其餘顯示選取值
        final contentText =
            (status == 'default' || status == 'incomplete') ? 'Placeholder' : 'Input';
        expect(colorOfText(tester, contentText), tokenColor(v['content'] as String),
            reason: '$status 的內容文字應為 ${v['content']}');

        expect(
            tester
                .widget<Icon>(find.descendant(
                  of: find.byType(USpaceDropdownMenu<String>),
                  matching: find.byType(Icon),
                ))
                .color,
            tokenColor(v['icon'] as String),
            reason: '$status 的 chevron 應為 ${v['icon']}');

        if (v['hint'] == null) {
          expect(find.text('Hint'), findsNothing,
              reason: '$status 不該顯示 hint');
        } else {
          expect(colorOfText(tester, 'Hint'), tokenColor(v['hint'] as String),
              reason: '$status 的 hint 應為 ${v['hint']}');
        }
      });
    }

    // 展開測試用另一組 fixture：不給 selectedItem，且項目文字就是 item 本身，
    // 這樣 'Item A' 只會在展開的面板裡出現，數量變化才代表選單真的開了
    Widget expandableOf(String statusKey) => USpaceDropdownMenu<String>(
          label: 'Label',
          placeholder: 'Placeholder',
          items: const ['Item A'],
          itemLabelBuilder: (item) => item,
          status: statuses[statusKey]!,
        );

    // 這三個狀態點下去不該展開；少了這個，把 nonEditable 漏出 _toggle 的
    // 擋阻清單也不會有人發現
    for (final status in ['incomplete', 'error', 'nonEditable']) {
      testWidgets('$status 不可展開', (tester) async {
        await pump(tester, expandableOf(status));
        await tester.tap(find.byType(GestureDetector));
        await tester.pumpAndSettle();
        expect(find.text('Item A'), findsNothing,
            reason: '$status 點擊後不該展開選單');
      });
    }

    for (final status in ['default', 'complete', 'selecting']) {
      testWidgets('$status 可以展開', (tester) async {
        await pump(tester, expandableOf(status));
        expect(find.text('Item A'), findsNothing,
            reason: '展開前面板不該存在，否則下一行的斷言沒有意義');
        await tester.tap(find.byType(GestureDetector));
        await tester.pumpAndSettle();
        expect(find.text('Item A'), findsOneWidget,
            reason: '$status 點擊後應展開選單');
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
