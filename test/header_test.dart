import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../styles/uspace_design_system.dart';

/// USpacePageTitle 的行為與 token 測試。
///
/// 這個 widget 有 508 行、3 種 type × 約 20 個開關參數，是專案裡最複雜的元件，
/// 但先前沒有任何覆蓋。這組測試的用途有二：
///   1. 擋住 token 與顯示邏輯的回歸
///   2. 作為後續把它拆成子元件時的安全網
void main() {
  Future<void> pump(WidgetTester tester, Widget child) => tester.pumpWidget(
        MaterialApp(
          theme: USpaceTheme.light,
          home: Scaffold(body: child),
        ),
      );

  final light = USpaceColorsExtension.light;

  group('三種 type 都能建構', () {
    for (final type in USpaceHeaderType.values) {
      testWidgets('$type', (tester) async {
        await pump(tester, USpacePageTitle(type: type, title: 'Title'));
        expect(tester.takeException(), isNull);
      });
    }
  });

  group('標題顯示條件（各 type 不一致，刻意釘住現況）', () {
    testWidgets('fullPage 預設顯示標題', (tester) async {
      await pump(tester, const USpacePageTitle(type: USpaceHeaderType.fullPage, title: 'Title'));
      expect(find.text('Title'), findsOneWidget);
    });

    testWidgets('modal 預設顯示標題', (tester) async {
      await pump(tester, const USpacePageTitle(type: USpaceHeaderType.modal, title: 'Title'));
      expect(find.text('Title'), findsOneWidget);
    });

    testWidgets('floating 需 titlePlace=center 才顯示標題', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.floating,
          title: 'Title',
          titlePlace: USpaceHeaderTitlePlace.center,
        ),
      );
      expect(find.text('Title'), findsOneWidget);
    });

    testWidgets('floating 預設（titlePlace=left）也要顯示標題', (tester) async {
      // 2026-07-28 修正的 bug：原本只在 center 時渲染，預設 left 會靜默消失
      await pump(
        tester,
        const USpacePageTitle(type: USpaceHeaderType.floating, title: 'Title'),
      );
      expect(find.text('Title'), findsOneWidget);
    });
  });

  group('titlePlace 控制對齊而非顯示', () {
    Future<TextAlign?> alignOf(WidgetTester tester, USpaceHeaderTitlePlace place) async {
      await pump(
        tester,
        USpacePageTitle(
          type: USpaceHeaderType.floating,
          title: 'Title',
          titlePlace: place,
        ),
      );
      return tester.widget<Text>(find.text('Title')).textAlign;
    }

    testWidgets('center → TextAlign.center', (tester) async {
      expect(await alignOf(tester, USpaceHeaderTitlePlace.center), TextAlign.center);
    });

    testWidgets('left → TextAlign.start', (tester) async {
      expect(await alignOf(tester, USpaceHeaderTitlePlace.left), TextAlign.start);
    });

    testWidgets('subtitle 跟隨相同對齊', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.floating,
          title: 'Title',
          subtitle: 'Sub',
          showSubtitle: true,
          titlePlace: USpaceHeaderTitlePlace.center,
        ),
      );
      expect(tester.widget<Text>(find.text('Sub')).textAlign, TextAlign.center);
    });
  });

  group('show 開關控制顯示', () {
    testWidgets('showTitle=false 時不顯示標題', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.fullPage,
          title: 'Title',
          showTitle: false,
        ),
      );
      expect(find.text('Title'), findsNothing);
    });

    testWidgets('subtitle / paragraph 依開關顯示', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.fullPage,
          title: 'T',
          subtitle: 'Sub',
          paragraph: 'Para',
          showSubtitle: true,
          showParagraph: true,
        ),
      );
      expect(find.text('Sub'), findsOneWidget);
      expect(find.text('Para'), findsOneWidget);
    });

    testWidgets('未開啟時 subtitle / paragraph 不顯示', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.fullPage,
          title: 'T',
          subtitle: 'Sub',
          paragraph: 'Para',
        ),
      );
      expect(find.text('Sub'), findsNothing);
      expect(find.text('Para'), findsNothing);
    });
  });

  group('GrabBar', () {
    /// GrabBar 用 borderDivider 而非 contentTertiary
    /// （2026-05-20 的修正，見 tracking/CHANGELOG_DRAFT.md）
    Finder grabBar() => find.byWidgetPredicate(
          (w) =>
              w is Container &&
              w.constraints?.maxWidth == 40 &&
              w.constraints?.maxHeight == USpaceSpacing.spacer4,
          description: 'GrabBar (40×4)',
        );

    testWidgets('floating 預設顯示且使用 borderDivider', (tester) async {
      await pump(tester, const USpacePageTitle(type: USpaceHeaderType.floating, title: 'T'));
      expect(grabBar(), findsOneWidget);
      final bar = tester.widget<Container>(grabBar());
      expect((bar.decoration as BoxDecoration).color, light.borderDivider);
    });

    testWidgets('showGrabBar=false 時不顯示', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.floating,
          title: 'T',
          showGrabBar: false,
        ),
      );
      expect(grabBar(), findsNothing);
    });

    testWidgets('fullPage 不顯示 GrabBar', (tester) async {
      await pump(tester, const USpacePageTitle(type: USpaceHeaderType.fullPage, title: 'T'));
      expect(grabBar(), findsNothing);
    });
  });

  group('互動回呼', () {
    testWidgets('左側按鈕觸發 onLeftPressed', (tester) async {
      var tapped = 0;
      await pump(
        tester,
        USpacePageTitle(
          type: USpaceHeaderType.fullPage,
          title: 'T',
          onLeftPressed: () => tapped++,
        ),
      );
      await tester.tap(find.byIcon(Icons.arrow_back_ios));
      expect(tapped, 1);
    });
  });

  group('Breadcrumb', () {
    testWidgets('showBreadcrumb 時顯示兩層路徑', (tester) async {
      await pump(
        tester,
        const USpacePageTitle(
          type: USpaceHeaderType.fullPage,
          title: 'T',
          showBreadcrumb: true,
          firstDrawer: 'First',
          secondDrawer: 'Second',
        ),
      );
      expect(find.text('First'), findsOneWidget);
      expect(find.text('Second'), findsOneWidget);
    });
  });

  group('文字使用 typography token', () {
    testWidgets('fullPage 標題為 headingL', (tester) async {
      await pump(tester, const USpacePageTitle(type: USpaceHeaderType.fullPage, title: 'T'));
      final text = tester.widget<Text>(find.text('T'));
      expect(text.style?.fontSize, AppTypographyExtension.light.headingL.fontSize);
      expect(text.style?.color, light.textPrimary);
    });
  });
}
