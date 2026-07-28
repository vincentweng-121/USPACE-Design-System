# 每輪 Claude Code 標準指令

## 色彩任務（palette 或 colors）
---
請依序執行：
1. 讀取 LESSONS_LEARNED.md
2. 讀取 NODES.md，確認本輪目標節點與目標檔案
3. 透過 Figma MCP 讀取 NODES.md 指定的 Node ID
4. 修改 tokens/*.json（⚠️ 不要直接改 styles/ 的產生檔），
   再執行 npm run gen:tokens
5. 執行 ./verify_skill.sh
   （會跑 token 同步檢查、dart analyze、flutter test、文件站建置）
6. 若 exit code 非 0，自行修正後重新執行，最多 3 次
7. 驗證通過後將變更寫入 CHANGELOG_DRAFT.md（狀態：DRAFT）
8. 若 LESSONS_LEARNED.md 超過 30 行，將穩定規則移入
   SKILL_TEMPLATE.dart，過時規則標記 DEPRECATED 保留在 Draft
9. 同步更新 SKILL_STATUS.md：
   - 將本輪異動的檔案更新到總覽表格（版本、狀態、日期、備註）
   - 若有新增待處理項目，加入待處理清單
   - 更新「最後更新」日期
10. 列出本輪摘要：異動了哪些 token、是否有新色票需要我確認

## 重要限制
- 只動 NODES.md 指定的目標檔案
- 不碰 AppColorsExtension、AppTypographyExtension
- 發現新色票時列出清單，等我確認後再新增
- 不在任何檔案直接寫裸 hex，透明度色票用具明常量
---
