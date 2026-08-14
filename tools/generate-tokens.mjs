#!/usr/bin/env node
/**
 * USPACE Design System — Token 產生器
 *
 * 單一真實來源：tokens/*.json
 * 輸出：styles/ 的 Dart token 檔 + website/src/tokens/ 的 TS token 檔
 *
 *   node tools/generate-tokens.mjs          寫入檔案
 *   node tools/generate-tokens.mjs --check  只比對，有漂移則 exit 1（CI 用）
 *
 * ⚠️ 產出的檔案標有 GENERATED 標頭，請勿手改；要改 token 請改 tokens/*.json。
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

const readJson = (name) => JSON.parse(readFileSync(join(ROOT, 'tokens', name), 'utf8'));
const readComponentSpec = (name) => readJson(join('components', name));
const palette = readJson('palette.json');
const semantic = readJson('semantic-colors.json');
const typography = readJson('typography.json');
const scalars = readJson('scalars.json');
const gradients = readJson('gradients.json');

// ─── helpers ───────────────────────────────────────────────

/** 產生對齊用的補空白函式：回傳 (s) => s 補到該欄最寬 */
const padder = (names) => {
  const w = Math.max(0, ...names.map((n) => n.length));
  return (n) => n + ' '.repeat(w - n.length);
};

/** ─── Title ─────── 分隔線，總寬 50 */
const rule = (title, indent = '  ') => {
  const head = `${indent}// ─── ${title} `;
  const dashes = Math.max(3, 52 - head.length);
  return head + '─'.repeat(dashes);
};

const header = (sources) =>
  [
    '// ⚠️ GENERATED FILE — 請勿手動編輯',
    `// 來源：${sources.map((s) => `tokens/${s}`).join('、')}`,
    '// 重新產生：npm run gen:tokens',
    '',
  ].join('\n');

const allPaletteTokens = () =>
  palette.groups.flatMap((g) => Object.entries(g.tokens).map(([n, t]) => [n, t.value]));

const paletteHex = Object.fromEntries(allPaletteTokens());

/** Dart 0xAARRGGBB → CSS 色字串 */
const toCss = (argb) => {
  const v = argb.replace(/^0x/i, '').toUpperCase();
  const a = parseInt(v.slice(0, 2), 16);
  const [r, g, b] = [v.slice(2, 4), v.slice(4, 6), v.slice(6, 8)].map((h) => parseInt(h, 16));
  return a === 255
    ? `#${v.slice(2)}`
    : `rgba(${r},${g},${b},${(a / 255).toFixed(2)})`;
};

const cssFor = (token) => {
  if (!(token in paletteHex)) throw new Error(`palette 無此 token：${token}`);
  return toCss(paletteHex[token]);
};

// ─── Dart：uspace_palette.dart ─────────────────────────────

function dartPalette() {
  const out = [
    header(['palette.json']),
    "import 'dart:ui';",
    '',
    '/// USPACE Core Color Palette',
    '///',
    '/// 基底色票，所有 hex 值集中在此。',
    '/// 語意色票 [USpaceColorsExtension] 引用此處的常量。',
    '/// 設計稿變更色值時，只需修改 tokens/palette.json。',
    '///',
    '/// 命名規則：與 Figma ColorPalette JSON token name 一致。',
    'abstract class USpacePalette {',
    '  USpacePalette._();',
  ];
  for (const group of palette.groups) {
    const entries = Object.entries(group.tokens);
    const pad = padder(entries.map(([n]) => n));
    out.push('', rule(group.name));
    for (const [name, t] of entries) {
      out.push(`  static const ${pad(name)} = Color(${t.value});${t.note ? ` // ${t.note}` : ''}`);
    }
  }
  out.push('}', '');
  return out.join('\n');
}

// ─── Dart：uspace_colors_extension.dart ────────────────────

function dartGradientBody(g, indent = '    ') {
  const colorExpr = (c) =>
    typeof c === 'string'
      ? `USpacePalette.${c}`
      : `Color(${c.raw})`;
  const notes = g.colors
    .map((c, i) => (typeof c === 'object' && c.note ? `${i}: ${c.note}` : null))
    .filter(Boolean);
  const lines = [
    `${indent}begin: ${g.begin.startsWith('Alignment(') ? g.begin : g.begin},`,
    `${indent}end: ${g.end},`,
    `${indent}colors: [${g.colors.map(colorExpr).join(', ')}],`,
  ];
  if (g.stops) lines.push(`${indent}stops: [${g.stops.map((s) => (Number.isInteger(s) ? s.toFixed(1) : s)).join(', ')}],`);
  if (notes.length) lines.splice(2, 0, `${indent}// ${notes.join('；')}`);
  return lines;
}

function dartColors() {
  const groups = semantic.groups;
  const flat = groups.flatMap((g) => Object.keys(g.tokens));
  const out = [
    header(['semantic-colors.json', 'gradients.json']),
    "import 'package:flutter/material.dart';",
    "import 'uspace_palette.dart';",
    '',
    '/// USPACE Semantic Color Tokens',
    '///',
    `/// 共 ${flat.length} 個語意色 token，light / dark 兩套主題。`,
    '/// 取用方式：`context.uColors.contentPrimary`',
    'class USpaceColorsExtension extends ThemeExtension<USpaceColorsExtension> {',
    '  const USpaceColorsExtension({',
  ];

  // constructor
  for (const g of groups) {
    out.push(rule(g.name, '    '));
    for (const name of Object.keys(g.tokens)) out.push(`    required this.${name},`);
  }
  out.push('  });', '');

  // fields
  for (const [i, g] of groups.entries()) {
    if (i) out.push('');
    out.push(rule(g.name));
    for (const name of Object.keys(g.tokens)) out.push(`  final Color ${name};`);
  }

  // gradients
  out.push('', rule('Gradient tokens (品牌固定，不隨主題切換)'));
  for (const [name, g] of Object.entries(gradients.gradients)) {
    out.push('');
    for (const line of g.doc) out.push(`  /// ${line}`);
    out.push(`  static const ${name} = LinearGradient(`, ...dartGradientBody(g), '  );');
  }
  for (const [alias, target] of Object.entries(gradients.aliases)) {
    out.push('', `  /// 同 [${target}]`, `  static const ${alias} = ${target};`);
  }

  // themes
  for (const theme of ['light', 'dark']) {
    out.push('', rule(`${theme[0].toUpperCase()}${theme.slice(1)} Theme`));
    out.push(`  static const ${theme} = USpaceColorsExtension(`);
    for (const g of groups) {
      const entries = Object.entries(g.tokens);
      const pad = padder(entries.map(([n]) => n + ':'));
      out.push(`    // ${g.name}`);
      for (const [name, v] of entries) {
        out.push(`    ${pad(name + ':')} USpacePalette.${v[theme]},`);
      }
    }
    out.push('  );');
  }

  // copyWith
  out.push('', '  @override', '  USpaceColorsExtension copyWith({');
  for (const g of groups) {
    out.push(`    // ${g.name}`);
    for (const name of Object.keys(g.tokens)) out.push(`    Color? ${name},`);
  }
  out.push('  }) {', '    return USpaceColorsExtension(');
  for (const g of groups) {
    const entries = Object.keys(g.tokens);
    const pad = padder(entries.map((n) => n + ':'));
    const padV = padder(entries);
    out.push(`      // ${g.name}`);
    for (const name of entries) {
      out.push(`      ${pad(name + ':')} ${padV(name)} ?? this.${name},`);
    }
  }
  out.push('    );', '  }');

  // lerp
  out.push('', '  @override', '  USpaceColorsExtension lerp(USpaceColorsExtension? other, double t) {');
  out.push('    if (other is! USpaceColorsExtension) return this;', '    return USpaceColorsExtension(');
  for (const g of groups) {
    const entries = Object.keys(g.tokens);
    const pad = padder(entries.map((n) => n + ':'));
    const padV = padder(entries.map((n) => n + ','));
    out.push(`      // ${g.name}`);
    for (const name of entries) {
      out.push(`      ${pad(name + ':')} Color.lerp(${padV(name + ',')} other.${padV(name + ',')} t)!,`);
    }
  }
  out.push('    );', '  }', '}', '');

  out.push(
    'extension USpaceColorsContext on BuildContext {',
    '  USpaceColorsExtension get uColors =>',
    '      Theme.of(this).extension<USpaceColorsExtension>() ??',
    '      USpaceColorsExtension.light;',
    '}',
    ''
  );
  return out.join('\n');
}

// ─── Dart：typography_extension.dart ───────────────────────

function dartTypography() {
  const styles = Object.entries(typography.styles);
  const byFamily = {};
  for (const [name, s] of styles) (byFamily[s.family] ??= []).push([name, s]);
  const famOrder = Object.entries(typography.families)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([k]) => k);

  const out = [
    header(['typography.json']),
    "import 'package:flutter/material.dart';",
    "import 'uspace_palette.dart';",
    '',
    '/// USPACE Typography Tokens',
    '///',
    '/// fontWeight 一律照 Figma JSON 數值，不依語意推斷。',
    '///',
    '/// light / dark 的 TextStyle 完全相同，只有文字顏色不同，',
    '/// 因此樣式以建構子預設值提供：兩個主題只需指定顏色，',
    '/// 結構上不可能出現 light / dark 樣式漂移。',
    '/// 需要覆寫個別樣式時照常傳入具名參數即可。',
    '///',
    '/// 取用方式：`context.typography.bodyM`',
    'class AppTypographyExtension extends ThemeExtension<AppTypographyExtension> {',
    '  const AppTypographyExtension({',
    '    required this.textColor,',
    '    required this.textSecondaryColor,',
  ];
  {
    const pad = padder(styles.map(([n]) => `this.${n}`));
    for (const [name] of styles) out.push(`    ${pad(`this.${name}`)} = _${name},`);
  }
  out.push('  });', '');

  out.push(rule('FontWeight constants'));
  for (const [k, v] of Object.entries(typography.weights)) out.push(`  static const ${k} = ${v};`);

  out.push('', rule('Color fields'));
  out.push('  final Color textColor;');
  out.push('  final Color textSecondaryColor;');

  for (const fam of famOrder) {
    const entries = byFamily[fam] ?? [];
    if (!entries.length) continue;
    const pad = padder(entries.map(([n]) => n + ';'));
    out.push('', rule(`${typography.families[fam].display} Text Styles`));
    for (const [name, s] of entries) {
      const note = [`${s.fontSize}px / ${s.lineHeight}`, s.note].filter(Boolean).join(' / ');
      out.push(`  final TextStyle ${pad(name + ';')} // ${note}`);
    }
  }

  // 共用樣式常量（light / dark 共同引用）
  out.push('', rule('Shared Text Styles (light / dark 相同)'));
  for (const fam of famOrder) {
    const entries = byFamily[fam] ?? [];
    if (!entries.length) continue;
    const pad = padder(entries.map(([n]) => '_' + n));
    const padW = padder(entries.map(([, s]) => s.weight + ','));
    for (const [name, s] of entries) {
      out.push(
        `  static const ${pad('_' + name)} = TextStyle(fontFamily: '${fam}', ` +
          `fontSize: ${s.fontSize}, fontWeight: ${padW(s.weight + ',')} height: ${s.lineHeight} / ${s.fontSize});`
      );
    }
  }

  // secondary variants
  for (const fam of famOrder) {
    const entries = byFamily[fam] ?? [];
    if (!entries.length) continue;
    const pad = padder(entries.map(([n]) => n + 'Secondary'));
    out.push('', rule(`${typography.families[fam].display} Secondary Variants`));
    for (const [name] of entries) {
      out.push(
        `  TextStyle get ${pad(name + 'Secondary')} => ${name}.copyWith(color: textSecondaryColor);`
      );
    }
  }

  // themes — 樣式走建構子預設值，這裡只指定兩個顏色
  out.push('', rule('Themes'));
  out.push('  // TextStyle 由建構子預設值提供，兩個主題共用同一組樣式常量。');
  for (const theme of ['light', 'dark']) {
    const colors = typography.themeColors[theme];
    const pad = padder(['textColor:', 'textSecondaryColor:']);
    out.push('', `  static const ${theme} = AppTypographyExtension(`);
    out.push(`    ${pad('textColor:')} USpacePalette.${colors.textColor},`);
    out.push(`    ${pad('textSecondaryColor:')} USpacePalette.${colors.textSecondaryColor},`);
    out.push('  );');
  }

  // copyWith
  const all = ['textColor', 'textSecondaryColor', ...styles.map(([n]) => n)];
  out.push('', '  @override', '  AppTypographyExtension copyWith({');
  {
    const padT = padder(['Color?', 'TextStyle?']);
    out.push(`    ${padT('Color?')} textColor,`);
    out.push(`    ${padT('Color?')} textSecondaryColor,`);
    for (const [name] of styles) out.push(`    ${padT('TextStyle?')} ${name},`);
  }
  out.push('  }) {', '    return AppTypographyExtension(');
  {
    const pad = padder(all.map((n) => n + ':'));
    const padV = padder(all);
    for (const name of all) out.push(`      ${pad(name + ':')} ${padV(name)} ?? this.${name},`);
  }
  out.push('    );', '  }');

  // lerp
  out.push('', '  @override', '  AppTypographyExtension lerp(AppTypographyExtension? other, double t) {');
  out.push('    if (other is! AppTypographyExtension) return this;', '    return AppTypographyExtension(');
  {
    const pad = padder(all.map((n) => n + ':'));
    const padV = padder(all.map((n) => n + ','));
    for (const name of all) {
      const fn = name.endsWith('Color') ? 'Color.lerp' : 'TextStyle.lerp';
      out.push(`      ${pad(name + ':')} ${fn}(${padV(name + ',')} other.${padV(name + ',')} t)!,`);
    }
  }
  out.push('    );', '  }', '}', '');

  out.push(
    'extension AppTypographyExtensionContext on BuildContext {',
    '  AppTypographyExtension get typography =>',
    '      Theme.of(this).extension<AppTypographyExtension>() ??',
    '      AppTypographyExtension.light;',
    '}',
    ''
  );
  return out.join('\n');
}

// ─── Dart：scalar 類（spacing / radius / glass）─────────────

function dartScalarClass({ group, className, doc, needsMaterial, groupTitle }) {
  const entries = Object.entries(scalars[group]);
  const out = [header(['scalars.json'])];
  if (needsMaterial) out.push("import 'package:flutter/material.dart';", '');
  out.push(...doc.map((d) => (d ? `/// ${d}` : '///')));
  out.push(`class ${className} {`, `  ${className}._();`, '', rule(groupTitle));
  for (const [name, t] of entries) {
    const type = t.value.startsWith('Color(') ? 'Color' : 'double';
    out.push(`  /// ${t.doc}`, `  static const ${type} ${name} = ${t.value};`, '');
  }
  if (out[out.length - 1] === '') out.pop();
  out.push('}', '');
  return out.join('\n');
}

// ─── TypeScript：website/src/tokens/ ───────────────────────

function tsColors() {
  const out = [
    '// ⚠️ GENERATED FILE — 請勿手動編輯',
    '// 來源：tokens/palette.json、tokens/semantic-colors.json',
    '// 重新產生：npm run gen:tokens（專案根目錄）',
    '',
    '// ─── Core Palette ─────────────────────────────────────────',
    'export const palette = {',
  ];
  for (const [i, group] of palette.groups.entries()) {
    if (i) out.push('');
    out.push(`  // ${group.name}`);
    for (const [name, t] of Object.entries(group.tokens)) {
      out.push(`  ${name}: '${toCss(t.value)}',`);
    }
  }
  out.push('} as const;', '');

  for (const theme of ['light', 'dark']) {
    const name = `semantic${theme[0].toUpperCase()}${theme.slice(1)}`;
    out.push(`// ─── Semantic Tokens — ${theme} ────────────────────────────`);
    out.push(`export const ${name} = {`);
    for (const [i, g] of semantic.groups.entries()) {
      if (i) out.push('');
      out.push(`  // ${g.name}`);
      for (const [tok, v] of Object.entries(g.tokens)) out.push(`  ${tok}: palette.${v[theme]},`);
    }
    out.push('} as const;', '');
  }
  out.push('/// 站台預設主題（light）。需要 dark 值請用 semanticDark。');
  out.push('export const semantic = semanticLight;', '');

  out.push('// ─── Gradients ────────────────────────────────────────────');
  out.push('export const gradients = {');
  for (const [name, g] of Object.entries(gradients.gradients)) {
    if (!g.css) continue;
    const css = g.css.replace(/\{(\w+)\}/g, (_, t) => cssFor(t));
    out.push(`  ${name}: '${css}',`);
  }
  for (const [alias, target] of Object.entries(gradients.aliases)) {
    out.push(`  ${alias}: '${gradients.gradients[target].css.replace(/\{(\w+)\}/g, (_, t) => cssFor(t))}',`);
  }
  out.push('} as const;', '');

  out.push('// ─── Palette groups（Color 頁展示用）──────────────────────');
  out.push('export const paletteGroups = [');
  for (const group of palette.groups) {
    out.push('  {', `    name: '${group.name}',`, '    colors: [');
    for (const [name, t] of Object.entries(group.tokens)) {
      out.push(`      { name: '${name}', hex: '${toCss(t.value)}' },`);
    }
    out.push('    ],', '  },');
  }
  out.push('];', '');

  out.push('// ─── Semantic groups（Color 頁 light/dark 對照用）─────────');
  out.push('export const semanticGroups = [');
  for (const g of semantic.groups) {
    out.push('  {', `    name: '${g.name}',`, '    tokens: [');
    for (const [name, v] of Object.entries(g.tokens)) {
      out.push(
        `      { name: '${name}', lightToken: '${v.light}', darkToken: '${v.dark}',` +
          ` light: palette.${v.light}, dark: palette.${v.dark} },`
      );
    }
    out.push('    ],', '  },');
  }
  out.push('];', '');
  return out.join('\n');
}

function tsTypography() {
  const famOrder = Object.entries(typography.families)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([k]) => k);
  const weightNum = { 'FontWeight.w400': 400, 'FontWeight.w500': 500, 'FontWeight.bold': 700 };
  const out = [
    '// ⚠️ GENERATED FILE — 請勿手動編輯',
    '// 來源：tokens/typography.json',
    '// 重新產生：npm run gen:tokens（專案根目錄）',
    '',
    'export const typographyStyles = [',
  ];
  for (const fam of famOrder) {
    const entries = Object.entries(typography.styles).filter(([, s]) => s.family === fam);
    if (!entries.length) continue;
    out.push('  {', `    family: '${typography.families[fam].display}',`, '    styles: [');
    for (const [name, s] of entries) {
      out.push(
        `      { name: '${name}', size: ${s.fontSize}, lineHeight: ${s.lineHeight},` +
          ` weight: ${weightNum[typography.weights[s.weight]]}, desc: '${s.note}' },`
      );
    }
    out.push('    ],', '  },');
  }
  out.push('];', '');
  out.push(
    'export function weightLabel(w: number) {',
    "  if (w === 400) return 'Regular';",
    "  if (w === 500) return 'Medium';",
    "  if (w === 700) return 'Bold';",
    '  return `w${w}`;',
    '}',
    ''
  );
  return out.join('\n');
}

function tsScalars() {
  const out = [
    '// ⚠️ GENERATED FILE — 請勿手動編輯',
    '// 來源：tokens/scalars.json',
    '// 重新產生：npm run gen:tokens（專案根目錄）',
    '',
  ];
  const spacers = Object.entries(scalars.spacing).filter(([n]) => n !== 'margin');
  out.push('export const margin = { name: \'margin\', value: ' + scalars.spacing.margin.value +
    `, desc: '${scalars.spacing.margin.doc}' };`, '');
  out.push('export const spacers = [');
  for (const [name, t] of spacers) out.push(`  { name: '${name}', value: ${t.value} },`);
  out.push('];', '');
  out.push('export const radii = [');
  for (const [name, t] of Object.entries(scalars.radius)) {
    const desc = t.doc.replace(/^\w+: \d+px（(.*)）$/, '$1');
    out.push(`  { name: '${name}', value: ${t.value}, desc: '${desc}' },`);
  }
  out.push('];', '');

  out.push('export const elevation = {');
  for (const [name, t] of Object.entries(scalars.elevation)) {
    out.push(`  ${name}: ${t.value},`);
  }
  out.push('} as const;', '');

  out.push('export const touch = {');
  for (const [name, t] of Object.entries(scalars.touch)) {
    out.push(`  ${name}: ${t.value},`);
  }
  out.push('} as const;', '');

  const fill = scalars.glass.fillColor.value.match(/Color\((0x[0-9A-Fa-f]{8})\)/)[1];
  out.push('export const glass = {');
  out.push(`  fillColor: '${toCss(fill)}',`);
  out.push(`  fillColorDart: '${scalars.glass.fillColor.value}',`);
  out.push(`  blurSigma: ${scalars.glass.blurSigma.value},`);
  out.push('} as const;', '');
  return out.join('\n');
}

// ─── TypeScript：元件規格（與 Flutter 測試同源）──────────────

function tsComponentSpecs() {
  const files = [
    'button.json',
    'toggle.json',
    'chip.json',
    'tab.json',
    'text_field.json',
    'text_area.json',
    'list.json',
    'modal.json',
    'dropdown_menu.json',
  ];
  const out = [
    '// ⚠️ GENERATED FILE — 請勿手動編輯',
    '// 來源：tokens/components/*.json',
    '// 重新產生：npm run gen:tokens（專案根目錄）',
    '//',
    '// 同一份 JSON 也驅動 test/component_token_test.dart，',
    '// 因此這裡列出的 token 對應保證與 Flutter 元件實際行為一致。',
    '',
    'export interface ComponentSpec {',
    '  component: string;',
    '  source: string;',
    '  figmaNode?: string;',
    '  dimensions: Record<string, string[]>;',
    '  variants: Record<string, string | number | null | undefined>[];',
    '  layout?: Record<string, number | { width: number; height: number }>;',
    '  confidence?: string;',
    '}',
    '',
  ];
  const names = [];
  for (const file of files) {
    const spec = readComponentSpec(file);
    const key = file.replace('.json', '');
    names.push(key);
    const payload = {
      component: spec.component,
      source: spec.source,
      ...(spec.figmaNode ? { figmaNode: spec.figmaNode } : {}),
      // dart-derived / skeleton 代表尚未逐一比對 Figma，頁面會據此顯示提醒
      ...(spec.$confidence ? { confidence: spec.$confidence } : {}),
      dimensions: spec.dimensions,
      variants: spec.variants,
      ...(spec.layout ? { layout: spec.layout } : {}),
    };
    out.push(`export const ${key}Spec: ComponentSpec = ${JSON.stringify(payload, null, 2)};`, '');
  }
  out.push(`export const componentSpecs = { ${names.map((n) => `${n}: ${n}Spec`).join(', ')} };`, '');
  return out.join('\n');
}

// ─── 版本號單一來源：package.json ───────────────────────────

const pkgVersion = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;

function checkPubspecVersion() {
  const pubspec = readFileSync(join(ROOT, 'pubspec.yaml'), 'utf8');
  const m = pubspec.match(/^version:\s*(\S+)\s*$/m);
  if (!m) throw new Error('pubspec.yaml 找不到 version');
  if (m[1] !== pkgVersion) {
    console.error(
      `✗ 版本號不一致：package.json 是 ${pkgVersion}，pubspec.yaml 是 ${m[1]}`
    );
    return false;
  }
  return true;
}

const tsVersion = () =>
  [
    '// ⚠️ GENERATED FILE — 請勿手動編輯',
    '// 來源：package.json 的 version',
    '// 重新產生：npm run gen:tokens（專案根目錄）',
    '',
    `export const version = '${pkgVersion}';`,
    '',
  ].join('\n');

// ─── 執行 ──────────────────────────────────────────────────

const outputs = [
  ['styles/uspace_palette.dart', dartPalette()],
  ['styles/uspace_colors_extension.dart', dartColors()],
  ['styles/typography_extension.dart', dartTypography()],
  [
    'styles/spacing_extension.dart',
    dartScalarClass({
      group: 'spacing',
      className: 'USpaceSpacing',
      groupTitle: 'Spacing',
      doc: [
        'USPACE Design System Spacing Tokens',
        '',
        '來源：Figma Variables — Mode 1.tokens.json',
        '',
        '包含 Margin（頁面邊距）與 Spacer（間距階梯）。',
        '所有值為 double，單位 logical pixel (pt)。',
      ],
    }),
  ],
  [
    'styles/radius_extension.dart',
    dartScalarClass({
      group: 'radius',
      className: 'USpaceRadius',
      groupTitle: 'Corner Radius',
      doc: [
        'USPACE Design System Corner Radius Tokens',
        '',
        '來源：Figma Variables — Mode 1.tokens.json (Number group)',
        '',
        'Figma scope: CORNER_RADIUS',
      ],
    }),
  ],
  [
    'styles/elevation_extension.dart',
    dartScalarClass({
      group: 'elevation',
      className: 'USpaceElevation',
      groupTitle: 'Elevation',
      doc: [
        'USPACE Design System Elevation Tokens',
        '',
        '陰影色使用語意 token `context.uColors.shadowDefault`，',
        '此處只放尺寸類數值。',
      ],
    }),
  ],
  [
    'styles/glass_extension.dart',
    dartScalarClass({
      group: 'glass',
      className: 'USpaceGlass',
      groupTitle: 'Glass',
      needsMaterial: true,
      doc: [
        'USpace Glass Effect Constants',
        '',
        '渲染策略（by platform）：',
        '  iOS 26+        → Liquid Glass',
        '                   ⚠️ Flutter 目前無原生 API，暫以 BackdropFilter 近似',
        '                   TODO: 替換為 UIVisualEffectView platform view',
        '  iOS < 26       → BackdropFilter + Gaussian blur',
        '  Android / Web  → BackdropFilter + Gaussian blur',
      ],
    }),
  ],
  [
    'styles/touch_target.dart',
    dartScalarClass({
      group: 'touch',
      className: 'USpaceTouchTarget',
      groupTitle: 'Touch target',
      doc: [
        'USPACE Design System Touch Target Tokens',
        '',
        '可點擊元件的最小觸控尺寸。視覺高度小於這個值時，',
        '熱區要外擴補足——外觀不變，但版面上會佔到這個高度。',
      ],
    }),
  ],
  ['website/src/tokens/colors.ts', tsColors()],
  ['website/src/tokens/typography.ts', tsTypography()],
  ['website/src/tokens/scalars.ts', tsScalars()],
  ['website/src/tokens/componentSpecs.ts', tsComponentSpecs()],
  ['website/src/tokens/version.ts', tsVersion()],
];

let drift = 0;
if (!checkPubspecVersion()) drift++;

for (const [rel, content] of outputs) {
  const path = join(ROOT, rel);
  const current = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (CHECK) {
    if (current !== content) {
      drift++;
      console.error(`✗ 與 tokens/ 不同步：${rel}`);
    }
  } else if (current === content) {
    console.log(`  未變更  ${rel}`);
  } else {
    writeFileSync(path, content);
    console.log(`✓ 已產生  ${rel}`);
  }
}

if (drift && !CHECK) {
  // 版本號不一致無法自動修（不知道該以哪邊為準），直接擋下
  console.error('\n請先讓 pubspec.yaml 的 version 與 package.json 一致。');
  process.exit(1);
}

if (CHECK) {
  if (drift) {
    console.error(`\n${drift} 項與來源不同步，請執行 npm run gen:tokens 後重新提交。`);
    process.exit(1);
  }
  console.log('✓ 所有產生檔與 tokens/*.json 同步，版本號一致');
}
