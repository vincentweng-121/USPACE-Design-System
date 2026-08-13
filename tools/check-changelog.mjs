#!/usr/bin/env node
/**
 * 檢查版號有沒有寫進 CHANGELOG.md。
 *
 *   node tools/check-changelog.mjs
 *
 * 會發生這個問題是因為版號、CHANGELOG.md、CHANGELOG_DRAFT.md 與網站頁面
 * 曾經是四份互不相干的副本，實際版號到 v0.7.x 時網站還停在 v0.2.10。
 * 網站頁面現在直接讀 markdown，這支檢查再擋住「升了版號卻沒寫紀錄」。
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
const log = readFileSync(join(ROOT, 'tracking/CHANGELOG.md'), 'utf8');
const draft = readFileSync(join(ROOT, 'tracking/CHANGELOG_DRAFT.md'), 'utf8');

const tag = `v${version}`;
const inLog = log.includes(tag);
const inDraft = draft.includes(tag);

if (!inLog && !inDraft) {
  console.error(`✗ package.json 是 ${tag}，但 CHANGELOG.md 與 CHANGELOG_DRAFT.md 都沒有這個版本`);
  console.error('  升版號時要同時寫變更紀錄，否則工程師無從得知改了什麼');
  process.exit(1);
}

console.log(`✓ ${tag} 已記錄於 ${inLog ? 'CHANGELOG.md' : 'CHANGELOG_DRAFT.md'}`);
