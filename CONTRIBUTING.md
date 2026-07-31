# 參與這個 repo

## 送出改動前先看這兩份

- **[rules/GIT_WORKFLOW.md](rules/GIT_WORKFLOW.md)** — 分支命名與 PR 流程。任何改動都適用。
- **[rules/LESSONS_LEARNED.md](rules/LESSONS_LEARNED.md)** — token、色票、元件的不可違反規則。

## 最短版本

1. **不要直接推 `main`。** main 一有 push 就自動部署到線上。
2. 開分支，名字用 `feat/…`、`fix/…`、`docs/…`、`chore/…`、`refactor/…`，
   後面接 2–4 個小寫英文字、用 `-` 分隔（例：`fix/anatomy-image-path`）。
3. 本機跑 `./verify_skill.sh`，五項全綠再推。
4. 開 PR，等 CI 的 `flutter` 與 `web` 兩個 job 都綠，才合併。

## 從 GitHub 網頁介面編輯

網頁編輯器沒有語法檢查，改 `.tsx` 很容易推上壞掉的程式。
務必選 **Create a new branch for this commit**（不要 Commit directly to main），
並把預設分支名改成上面的格式，合併前看一下 Actions 頁籤有沒有變紅。

放圖片時：不要自己寫 `<img src="/images/…">`，用
`<AnatomyImage file="檔名.png" alt="說明" />`，且檔名大小寫要與實際檔案完全一致。
細節見 [rules/GIT_WORKFLOW.md](rules/GIT_WORKFLOW.md)。
