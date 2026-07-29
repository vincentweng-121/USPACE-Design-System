#!/bin/bash
# verify_skill.sh — 提交前的本機檢查
#
# 用法：./verify_skill.sh
#
# 跑的是 CI 會跑的同一組檢查，讓問題在推上去之前就浮現。
#
# 舊版本這支腳本用 grep 檢查三個 token 檔的結構（class 宣告、copyWith、lerp、
# 有無裸 hex）。那些檔案現在由 tools/generate-tokens.mjs 產生，結構由產生器
# 保證，該檢查已不可能失敗；對應的規則改由 test/token_rules_test.dart 驗證，
# 且涵蓋全部元件而非三個檔案。

set -uo pipefail
cd "$(dirname "$0")" || exit 1

PASS=0
FAIL=0

run() {
  local label="$1"; shift
  printf '\n\033[1m▸ %s\033[0m\n' "$label"
  if "$@"; then
    printf '  \033[32mOK\033[0m   %s\n' "$label"
    PASS=$((PASS + 1))
  else
    printf '  \033[31mFAIL\033[0m %s\n' "$label"
    FAIL=$((FAIL + 1))
  fi
}

echo "════════════════════════════════════════════"
echo " USPACE Design System — 提交前檢查"
echo "════════════════════════════════════════════"

run "產生檔與 tokens/*.json 同步" \
  npm run --silent check:tokens

run "Dart 靜態分析" \
  dart analyze --fatal-infos

run "Flutter 測試（token 規則 + 元件 token + header）" \
  flutter test

run "文件站建置" \
  bash -c 'cd website && npm run --silent build >/dev/null'

echo ""
echo "════════════════════════════════════════════"
printf ' 結果：\033[32m%d 通過\033[0m / \033[31m%d 失敗\033[0m\n' "$PASS" "$FAIL"
echo "════════════════════════════════════════════"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "修正後重新執行。常見情況："
  echo "  · token 不同步 → 改 tokens/*.json 後跑 npm run gen:tokens"
  echo "  · 規則測試失敗 → 見 rules/LESSONS_LEARNED.md 的「不可違反的規則」"
  exit 1
fi

echo ""
echo "可以提交了。"
exit 0
