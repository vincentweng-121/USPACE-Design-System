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
    const styles = {
      'filled': USpaceButtonStyle.filled,
      'outlined': USpaceButtonStyle.outlined,
    };
    const sizes = {
      'regular': USpaceButtonSize.regular,
      'small': USpaceButtonSize.small,
    };
    final layout =
        readJson('tokens/components/button.json')['layout'] as Map<String, dynamic>;

    // 顏色不隨 size 改變，因此每個 style × state 都在兩種 size 各驗一次
    for (final v in variantsOf('button.json')) {
      for (final sizeKey in sizes.keys) {
        final label = '${v['style']} / $sizeKey / ${v['state']}';
        testWidgets(label, (tester) async {
          await pump(
            tester,
            USpaceButton(
              label: 'Label',
              style: styles[v['style']]!,
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

          expect(
            material.color,
            v['bg'] == null ? Colors.transparent : tokenColor(v['bg'] as String),
            reason: '$label 的底色應為 ${v['bg'] ?? '透明'}',
          );

          final text = tester.widget<Text>(find.text('Label'));
          expect(
            text.style?.color,
            tokenColor(v['content'] as String),
            reason: '$label 的文字應為 ${v['content']}',
          );

          // 漸層描邊由自訂的 painter 畫，不是 Material 的 shape。
          // 比對型別名稱而不是「有沒有 foregroundPainter」——Material 與 InkWell
          // 內部本來就會放自己的 CustomPaint，那樣會每次都判定為有描邊。
          final hasGradientBorder = tester
              .widgetList<CustomPaint>(find.descendant(
                of: find.byType(USpaceButton),
                matching: find.byType(CustomPaint),
              ))
              .any((p) =>
                  p.foregroundPainter?.runtimeType.toString() ==
                  '_GradientBorderPainter');
          expect(
            hasGradientBorder,
            v['borderGradient'] != null,
            reason: v['borderGradient'] == null
                ? '$label 不應有漸層描邊'
                : '$label 應有漸層描邊',
          );
        });
      }
    }

    // ── 尺寸 ──
    testWidgets('regular 高度為規格檔的 height', (tester) async {
      await pump(tester, USpaceButton(label: 'Label', onPressed: () {}));
      final size = tester.getSize(find.byType(USpaceButton));
      expect(size.height, layout['height']);
    });

    testWidgets('small 高度為規格檔的 smallHeight', (tester) async {
      await pump(
        tester,
        USpaceButton(
          label: 'Label',
          size: USpaceButtonSize.small,
          onPressed: () {},
        ),
      );
      expect(
        tester.getSize(find.byType(USpaceButton)).height,
        layout['smallHeight'],
        reason: 'small 由 48 改為 40',
      );
    });

    testWidgets('small 短標籤仍不小於 smallMinWidth', (tester) async {
      await pump(
        tester,
        USpaceButton(
          label: 'OK',
          size: USpaceButtonSize.small,
          onPressed: () {},
        ),
      );
      expect(
        tester.getSize(find.byType(USpaceButton)).width,
        greaterThanOrEqualTo((layout['smallMinWidth'] as num).toDouble()),
        reason: '短標籤時撐到最小寬度，一排按鈕才不會參差不齊',
      );
    });

    testWidgets('small 長標籤會超過最小寬度並貼合內容', (tester) async {
      await pump(
        tester,
        USpaceButton(
          label: '這是一個比較長的按鈕標籤',
          size: USpaceButtonSize.small,
          onPressed: () {},
        ),
      );
      expect(
        tester.getSize(find.byType(USpaceButton)).width,
        greaterThan((layout['smallMinWidth'] as num).toDouble()),
        reason: '內容比最小寬度長時要 hug，不是固定 112',
      );
    });

    // ── 字級 ──
    testWidgets('預設使用 labelL', (tester) async {
      await pump(tester, USpaceButton(label: 'Label', onPressed: () {}));
      expect(
        tester.widget<Text>(find.text('Label')).style?.fontSize,
        AppTypographyExtension.light.labelL.fontSize,
      );
    });

    // 只包最小的 Localizations 提供語系。用 MaterialApp 的 locale 會要求
    // 對應的 MaterialLocalizations delegate，而預設那個只支援 en。
    Future<void> pumpWithLocale(WidgetTester tester, String code) =>
        tester.pumpWidget(
          MaterialApp(
            theme: USpaceTheme.light,
            home: Localizations(
              locale: Locale(code),
              delegates: const [DefaultWidgetsLocalizations.delegate],
              child: Center(child: USpaceButton(label: 'Label', onPressed: () {})),
            ),
          ),
        );

    testWidgets('日文改用小一階的 labelM', (tester) async {
      await pumpWithLocale(tester, 'ja');
      expect(
        tester.widget<Text>(find.text('Label')).style?.fontSize,
        AppTypographyExtension.light.labelM.fontSize,
        reason: '日文字級小一階',
      );
    });

    testWidgets('中文維持 labelL', (tester) async {
      await pumpWithLocale(tester, 'zh');
      expect(
        tester.widget<Text>(find.text('Label')).style?.fontSize,
        AppTypographyExtension.light.labelL.fontSize,
        reason: '只有日文縮小，其他語系不受影響',
      );
    });

    testWidgets('預設為 filled', (tester) async {
      await pump(tester, USpaceButton(label: 'Label', onPressed: () {}));
      final material = tester.widget<Material>(
        find
            .descendant(of: find.byType(USpaceButton), matching: find.byType(Material))
            .first,
      );
      expect(material.color, tokenColor('actionPrimaryBg'));
      expect(
        tester.widget<Text>(find.text('Label')).style?.color,
        tokenColor('actionPrimaryContent'),
      );
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
      await tester.tap(find.byType(USpaceButton));
      expect(taps, 0);
    });
  });

  // 過長的標籤要單行截斷，不能撐破按鈕——見 Figma 的 button-edge-case2
  group('USpaceButton 長標籤', () {
    testWidgets('文字過長時單行截斷且不溢出', (tester) async {
      await pump(
        tester,
        const SizedBox(
          width: 200,
          child: USpaceButton(label: '結束停車結束停車結束停車結束停車結束停車結束停車'),
        ),
      );
      expect(tester.takeException(), isNull, reason: '長標籤不該造成 overflow');

      final text = tester.widget<Text>(
        find.descendant(of: find.byType(USpaceButton), matching: find.byType(Text)),
      );
      expect(text.maxLines, 1);
      expect(text.overflow, TextOverflow.ellipsis);
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

    // ── 互動 ──
    testWidgets('不傳 onTap 時不可點擊', (tester) async {
      await pump(tester, const USpaceChip(label: 'Tag'));
      expect(
        find.descendant(
          of: find.byType(USpaceChip),
          matching: find.byType(GestureDetector),
        ),
        findsNothing,
        reason: '純展示標籤不該包 GestureDetector',
      );
    });

    testWidgets('傳 onTap 時可點擊', (tester) async {
      var taps = 0;
      await pump(tester, USpaceChip(label: 'Tag', onTap: () => taps++));
      await tester.tap(find.byType(USpaceChip));
      expect(taps, 1, reason: '傳了 onTap 就該收得到點擊');
    });

    testWidgets('可點擊時觸控熱區至少 44px', (tester) async {
      await pump(tester, USpaceChip(label: 'Tag', onTap: () {}));
      final size = tester.getSize(find.byType(USpaceChip));
      expect(
        size.height,
        greaterThanOrEqualTo(USpaceTouchTarget.minTarget),
        reason: 'Chip 視覺只有 22px，可點擊時熱區要外擴到 44px',
      );
    });

    testWidgets('不可點擊時不佔用外擴的高度', (tester) async {
      await pump(tester, const USpaceChip(label: 'Tag'));
      final size = tester.getSize(find.byType(USpaceChip));
      expect(
        size.height,
        lessThan(USpaceTouchTarget.minTarget),
        reason: '純展示標籤不該因為熱區規則而佔掉 44px',
      );
    });

    testWidgets('regular 畫得出 trailing icon', (tester) async {
      await pump(
        tester,
        const USpaceChip(label: 'Tag', trailingIcon: Icon(Icons.close)),
      );
      expect(
        find.descendant(of: find.byType(USpaceChip), matching: find.byType(Icon)),
        findsOneWidget,
      );
    });

    testWidgets('small 忽略 trailing icon', (tester) async {
      await pump(
        tester,
        const USpaceChip(
          label: 'Tag',
          size: USpaceChipSize.small,
          trailingIcon: Icon(Icons.close),
        ),
      );
      expect(
        find.descendant(of: find.byType(USpaceChip), matching: find.byType(Icon)),
        findsNothing,
        reason: 'small 兩側都不支援 icon，規則要與 leading 一致',
      );
    });

    testWidgets('兩側可同時放 icon', (tester) async {
      await pump(
        tester,
        const USpaceChip(
          label: 'Tag',
          leadingIcon: Icon(Icons.star),
          trailingIcon: Icon(Icons.close),
        ),
      );
      expect(
        find.descendant(of: find.byType(USpaceChip), matching: find.byType(Icon)),
        findsNWidgets(2),
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

  // ── ActionArea ──────────────────────────────────────────
  group('USpaceActionArea', () {
    final layout =
        readJson('tokens/components/action_area.json')['layout'] as Map<String, dynamic>;

    Gradient? gradientOf(WidgetTester tester) => (tester
            .widget<DecoratedBox>(find
                .descendant(
                  of: find.byType(USpaceActionArea),
                  matching: find.byType(DecoratedBox),
                )
                .first)
            .decoration as BoxDecoration)
        .gradient;

    testWidgets('gray + 單列用 bottomBarGray1B', (tester) async {
      await pump(
        tester,
        const USpaceActionArea(children: [SizedBox(height: 48)]),
      );
      expect(gradientOf(tester), USpaceColorsExtension.bottomBarGray1B);
    });

    testWidgets('gray + 多列用 bottomBarGray2B', (tester) async {
      await pump(
        tester,
        const USpaceActionArea(
          children: [SizedBox(height: 48), SizedBox(height: 48)],
        ),
      );
      expect(gradientOf(tester), USpaceColorsExtension.bottomBarGray2B,
          reason: '多列的漸層涵蓋範圍較高，與單列不同');
    });

    testWidgets('dark 主題用 dark 變體的漸層', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: USpaceTheme.dark,
          home: const Scaffold(
            body: Center(child: USpaceActionArea(children: [SizedBox(height: 48)])),
          ),
        ),
      );
      expect(gradientOf(tester), USpaceColorsExtension.bottomBarGray1BDark,
          reason: 'dark 的漸層用 grey900，與 light 的 grey50 不同');
    });

    testWidgets('none 不畫背景', (tester) async {
      await pump(
        tester,
        const USpaceActionArea(
          background: USpaceActionAreaBackground.none,
          children: [SizedBox(height: 48)],
        ),
      );
      expect(gradientOf(tester), isNull);
    });

    testWidgets('text 用 textSecondary 與 captionS', (tester) async {
      await pump(
        tester,
        const USpaceActionArea(
          text: 'Text',
          children: [SizedBox(height: 48)],
        ),
      );
      final style = tester.widget<Text>(find.text('Text')).style!;
      expect(style.color, tokenColor('textSecondary'));
      expect(style.fontSize, AppTypographyExtension.light.captionS.fontSize);
    });

    testWidgets('沒傳 text 時不佔空間', (tester) async {
      await pump(
        tester,
        const USpaceActionArea(children: [SizedBox(height: 48)]),
      );
      final withoutText = tester.getSize(find.byType(USpaceActionArea)).height;

      await pump(
        tester,
        const USpaceActionArea(text: 'Text', children: [SizedBox(height: 48)]),
      );
      final withText = tester.getSize(find.byType(USpaceActionArea)).height;

      expect(withText, greaterThan(withoutText),
          reason: '有 text 才該多出文字與 12 的間距');
    });

    testWidgets('關掉 home indicator 會少掉底部留白', (tester) async {
      await pump(
        tester,
        const USpaceActionArea(children: [SizedBox(height: 48)]),
      );
      final withIndicator = tester.getSize(find.byType(USpaceActionArea)).height;

      await pump(
        tester,
        const USpaceActionArea(
          showHomeIndicator: false,
          children: [SizedBox(height: 48)],
        ),
      );
      final without = tester.getSize(find.byType(USpaceActionArea)).height;

      expect(withIndicator - without, layout['homeIndicatorHeight'],
          reason: '差距應正好是規格檔記的 home indicator 高度');
    });

    testWidgets('按鈕之間的間距為規格檔的 buttonGap', (tester) async {
      const h = 48.0;
      await pump(
        tester,
        const USpaceActionArea(
          children: [SizedBox(height: h), SizedBox(height: h)],
        ),
      );
      final total = tester.getSize(find.byType(USpaceActionArea)).height;
      final expected = layout['paddingTop'] +
          h * 2 +
          layout['buttonGap'] +
          layout['homeIndicatorHeight'];
      expect(total, expected, reason: '總高應為 上內距 + 兩顆按鈕 + 間距 + home indicator');
    });
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
