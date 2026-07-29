import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

/// 把 rules/LESSONS_LEARNED.md 的「不可違反的規則」機器化。
///
/// 這些規則過去只能靠人工 audit（見 tracking/CHANGELOG_DRAFT.md 反覆出現的
/// 「spacing token 遷移」「radius 部分套用」條目）。現在每次 CI 都會檢查。
///
/// 允許清單（allowlist）代表「已知且已記錄的例外」：
/// 目的是凍結現況、擋住**新增**的違規，而不是假裝問題不存在。
void main() {
  final styles = Directory('styles')
      .listSync()
      .whereType<File>()
      .where((f) => f.path.endsWith('.dart'))
      .toList()
    ..sort((a, b) => a.path.compareTo(b.path));

  String name(File f) => f.uri.pathSegments.last;
  bool isGenerated(File f) => f.readAsStringSync().startsWith('// ⚠️ GENERATED FILE');

  /// 註解行不算違規：文件裡提到 token 名稱是正常的
  bool isComment(String line) {
    final t = line.trimLeft();
    return t.startsWith('//') || t.startsWith('*');
  }

  setUpAll(() {
    expect(styles, isNotEmpty, reason: 'styles/ 找不到任何 .dart 檔，測試工作目錄可能不對');
  });

  test('產生檔必須保留 GENERATED 標頭', () {
    const generated = {
      'uspace_palette.dart',
      'uspace_colors_extension.dart',
      'typography_extension.dart',
      'spacing_extension.dart',
      'radius_extension.dart',
      'glass_extension.dart',
      'elevation_extension.dart',
    };
    for (final f in styles.where((f) => generated.contains(name(f)))) {
      expect(
        isGenerated(f),
        isTrue,
        reason: '${name(f)} 應為產生檔但標頭消失了。'
            '是否有人手改？請改 tokens/*.json 後執行 npm run gen:tokens',
      );
    }
  });

  test('hex 色值只能出現在 palette，手寫檔不得有裸 Color(0x)', () {
    // 目前沒有例外。新增例外前請先確認該色值真的無法用 token 表達。
    const allowed = <String, int>{};

    final violations = <String>[];
    for (final f in styles) {
      if (name(f) == 'uspace_palette.dart' || isGenerated(f)) continue;
      final lines = f.readAsLinesSync();
      final hits = <String>[];
      for (var i = 0; i < lines.length; i++) {
        if (!isComment(lines[i]) && lines[i].contains('Color(0x')) {
          hits.add('${name(f)}:${i + 1} ${lines[i].trim()}');
        }
      }
      if (hits.length > (allowed[name(f)] ?? 0)) violations.addAll(hits);
    }
    expect(
      violations,
      isEmpty,
      reason: '所有 hex 值必須集中在 tokens/palette.json：\n${violations.join('\n')}',
    );
  });

  test('圓角必須使用 USpaceRadius，不得寫死數字', () {
    final re = RegExp(r'(?:BorderRadius|Radius)\.circular\(\s*[0-9]');
    final violations = <String>[];
    for (final f in styles) {
      final lines = f.readAsLinesSync();
      for (var i = 0; i < lines.length; i++) {
        if (re.hasMatch(lines[i])) violations.add('${name(f)}:${i + 1} ${lines[i].trim()}');
      }
    }
    expect(violations, isEmpty, reason: '請改用 USpaceRadius：\n${violations.join('\n')}');
  });

  test('間距數值若落在 spacing 階梯上，必須使用 USpaceSpacing', () {
    // 階梯外的值（1 / 3 / 6 …）屬 Figma 元件特定值，不在此規則範圍
    const scale = {2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56};
    final edgeInsets = RegExp(r'EdgeInsets\.(?:all|symmetric|only|fromLTRB)\(([^)]*)\)');
    final number = RegExp(r'(?<![\w.])(\d+)(?![\w.])');

    final violations = <String>[];
    for (final f in styles) {
      final lines = f.readAsLinesSync();
      for (var i = 0; i < lines.length; i++) {
        for (final m in edgeInsets.allMatches(lines[i])) {
          for (final n in number.allMatches(m.group(1)!)) {
            final v = int.parse(n.group(1)!);
            if (scale.contains(v)) {
              violations.add('${name(f)}:${i + 1} 數值 $v 應改用 USpaceSpacing.spacer$v');
            }
          }
        }
      }
    }
    expect(violations, isEmpty, reason: violations.join('\n'));
  });

  test('fontWeight 必須使用具名常量，不得直接寫 FontWeight.wNNN', () {
    final re = RegExp(r'FontWeight\.(?:w[0-9]{3}|bold|normal)');
    final violations = <String>[];
    for (final f in styles) {
      if (name(f) == 'typography_extension.dart') continue; // 常量定義處
      final lines = f.readAsLinesSync();
      for (var i = 0; i < lines.length; i++) {
        if (re.hasMatch(lines[i])) violations.add('${name(f)}:${i + 1} ${lines[i].trim()}');
      }
    }
    expect(
      violations,
      isEmpty,
      reason: '請改用 AppTypographyExtension 的 regular / medium / semibold / bold：\n'
          '${violations.join('\n')}',
    );
  });

  test('元件不得直接引用 USpacePalette，應透過語意色 token', () {
    // 已記錄的例外：Outline chip 的品牌漸層色在 Figma 無對應 semantic token
    const allowed = <String, int>{'chip.dart': 3};

    final violations = <String>[];
    for (final f in styles) {
      if (isGenerated(f)) continue;
      final lines = f.readAsLinesSync();
      final hits = <String>[];
      for (var i = 0; i < lines.length; i++) {
        if (!isComment(lines[i]) && lines[i].contains('USpacePalette.')) {
          hits.add('${name(f)}:${i + 1} ${lines[i].trim()}');
        }
      }
      if (hits.length > (allowed[name(f)] ?? 0)) violations.addAll(hits);
    }
    expect(
      violations,
      isEmpty,
      reason: '元件應使用 context.uColors 的語意 token：\n${violations.join('\n')}',
    );
  });
}
