#!/bin/bash
# verify_skill.sh
# 用法：./verify_skill.sh palette|colors|typography
# 驗證對應 Dart 檔案的結構完整性

TARGET="${1:-}"
PASS=0
FAIL=0

ok()   { echo "  OK   $1"; PASS=$((PASS+1)); }
miss() { echo "  MISS $1"; FAIL=$((FAIL+1)); }

echo ""
echo "=== 驗證目標：$TARGET ==="
echo ""

if [ "$TARGET" = "palette" ]; then
  FILE="styles/uspace_palette.dart"
  [ -f "$FILE" ] || { echo "找不到 $FILE"; exit 1; }
  grep -q "abstract class USpacePalette"   "$FILE" && ok "class 宣告" || miss "class 宣告"
  grep -q "USpacePalette\._();"            "$FILE" && ok "private constructor" || miss "private constructor"
  grep -q "static const black"             "$FILE" && ok "black 存在" || miss "black 存在"
  grep -q "static const white"             "$FILE" && ok "white 存在" || miss "white 存在"
  # 確認沒有直接寫裸 hex（透明度色票除外）
  BARE=$(grep "Color(0x" "$FILE" | grep -v "transparentBlack" | grep -v "// 新增自 Figma" | wc -l | tr -d ' ')
  [ "$BARE" -le 60 ] && ok "無異常裸 hex（共 $BARE 行）" || miss "疑似有裸 hex，請確認（$BARE 行）"

elif [ "$TARGET" = "colors" ]; then
  FILE="styles/uspace_colors_extension.dart"
  [ -f "$FILE" ] || { echo "找不到 $FILE"; exit 1; }
  grep -q "class USpaceColorsExtension"    "$FILE" && ok "class 宣告" || miss "class 宣告"
  grep -q "static const light"             "$FILE" && ok "light theme" || miss "light theme"
  grep -q "static const dark"              "$FILE" && ok "dark theme" || miss "dark theme"
  grep -q "copyWith"                       "$FILE" && ok "copyWith" || miss "copyWith"
  grep -q "lerp"                           "$FILE" && ok "lerp" || miss "lerp"
  grep -q "USpaceColorsContext"            "$FILE" && ok "context extension" || miss "context extension"
  # 確認沒有直接寫裸 hex
  BARE=$(grep "Color(0x" "$FILE" | grep -v "transparentBlack" | wc -l | tr -d ' ')
  [ "$BARE" -eq 0 ] && ok "無裸 hex" || miss "有裸 hex（$BARE 行），應引用 USpacePalette"

elif [ "$TARGET" = "typography" ]; then
  FILE="styles/typography_extension.dart"
  [ -f "$FILE" ] || { echo "找不到 $FILE"; exit 1; }
  grep -q "class AppTypographyExtension"   "$FILE" && ok "class 宣告" || miss "class 宣告"
  grep -q "static const light"             "$FILE" && ok "light theme" || miss "light theme"
  grep -q "static const dark"              "$FILE" && ok "dark theme" || miss "dark theme"
  grep -q "copyWith"                       "$FILE" && ok "copyWith" || miss "copyWith"
  grep -q "lerp"                           "$FILE" && ok "lerp" || miss "lerp"
  # 排除 static const bold/medium/regular 定義行本身
  BAD_WEIGHT=$(grep "FontWeight\.w[0-9]" "$FILE" | grep -v "static const bold\|static const medium\|static const regular" | wc -l | tr -d ' ')
  [ "$BAD_WEIGHT" -eq 0 ] && ok "fontWeight 使用常量" || miss "直接使用 FontWeight.wXXX（$BAD_WEIGHT 行），應改用 bold/medium/regular 常量"
  grep -q "AppTypographyExtensionContext"  "$FILE" && ok "context extension" || miss "context extension"

else
  echo "請指定目標：palette | colors | typography"
  echo "用法：./verify_skill.sh palette"
  exit 1
fi

echo ""
echo "結果：${PASS} 通過 / ${FAIL} 缺漏"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "請修正後重新執行"
  exit 1
else
  echo "驗證通過"
  exit 0
fi
