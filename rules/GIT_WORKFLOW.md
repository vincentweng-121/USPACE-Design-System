# Git 工作流程與分支命名
> 任何人要把改動送進 main 之前必讀。包含 AI agent 與從 GitHub 網頁介面編輯的協作者。

## 為什麼不能直接推 main

`main` 一有 push，`.github/workflows/deploy.yml` 就會自動部署到
<https://vincentweng-121.github.io/USPACE-Design-System/>。

直接推 main 等於跳過所有檢查直接上線。PR 會跑同一組檢查但**不**部署，
所以壞掉的改動只會讓 PR 變紅，不會讓線上網站壞掉。

**規則：一律走分支 → PR → CI 綠 → 合併。沒有例外。**

## 分支命名

格式：`<類型>/<簡短描述>`

```
feat/anatomy-image-guard
fix/anatomy-image-path
```

### 類型前綴

| 前綴 | 用在 | 例 |
| --- | --- | --- |
| `feat/` | 新元件、新頁面、新檢查、新功能 | `feat/modal-component` |
| `fix/` | 修正壞掉的行為（建置失敗、顯示錯誤、token 不符） | `fix/button-tertiary-color` |
| `docs/` | 只改文件，不動程式與 token | `docs/contributing-guide` |
| `chore/` | 建置設定、CI、相依套件、工具腳本 | `chore/bump-flutter-action` |
| `refactor/` | 重整結構但行為不變 | `refactor/split-list-pages` |

不確定是 `feat` 還是 `fix`：**線上原本就是壞的**用 `fix`，
**原本沒有這個東西**用 `feat`。

### 描述部分

- 小寫英文，單字之間用 `-`（kebab-case）
- 2–4 個字，寫**改了什麼**，不是為什麼改
- 不放日期、人名、issue 編號

```
✅ fix/anatomy-image-path
✅ feat/spec-pages-and-versioning
❌ fix/bug              太籠統，看不出改哪裡
❌ feat/tang-0730       人名與日期，三個月後沒人看得懂
❌ Feat/AnatomyImage    大小寫與分隔符不符規範
```

## 完整流程

**開分支前一定要先把 main 拉到最新。** 這是最容易漏掉的一步，
從舊的 main 開分支，改動會跟別人已經合併的內容打架。

```bash
git switch main && git pull            # 1. 先更新 main，不可省略
git switch -c feat/your-branch-name    # 2. 從最新的 main 開分支
./verify_skill.sh                      # 3. 本機先跑過（與 CI 同一組檢查）
git push -u origin feat/your-branch-name
gh pr create                           # 4. 開 PR
# 5. 等 CI 兩個 job（flutter、web）都綠
gh pr merge --merge --delete-branch    # 6. 合併，分支自動刪除
# 7. 等 deploy job 跑完，開線上網址確認
```

CI 綠就可以合併，不需要另外等人核可。CI 紅燈時停下來修，**不要**合併。

### 分支落後 main 時

改到一半 main 有新東西進來是正常的，PR 頁面會出現
**This branch has conflicts that must be resolved**。

⚠️ **有衝突時 CI 完全不會跑**——GitHub 算不出合併結果，
兩個 job 一次都不會觸發，PR 的檢查區塊會是空的。
看到「沒有任何 check」不代表通過，代表根本沒跑。

把 main 併回自己的分支，解完衝突再推：

```bash
git switch feat/your-branch-name
git fetch && git merge origin/main     # 解衝突
./verify_skill.sh                      # 解完一定要重跑
git push
```

推上去之後 CI 才會開始跑，等它綠了再合併。

## CI 會擋下什麼

`.github/workflows/deploy.yml` 兩個 job，PR 階段就會跑：

| Job | 檢查 |
| --- | --- |
| `flutter` | `dart analyze --fatal-infos`、`flutter test`（token 規則、元件 token、header） |
| `web` | `check:tokens`（產生檔漂移）、`check:assets`（圖片路徑與大小寫）、文件站建置 |

本機的 `./verify_skill.sh` 跑的是同一組，先在本機跑完可以省一輪 CI 等待。

## 從 GitHub 網頁介面編輯

網頁編輯器**沒有語法檢查**，JSX 標籤沒閉合這種錯誤只有 CI 抓得到。
若要用網頁介面改 `.tsx`：

1. 選 **Create a new branch for this commit**，不要選 Commit directly to main
2. 分支名照上面的規範改掉預設值（預設是 `帳號-patch-1`，不符規範）
3. 開 PR 後看 **Actions** 頁籤，兩個 job 都綠才合併

圖片路徑另有兩條規則，違反會在本機正常但上線 404：

- 不要自己寫 `<img src="/images/…">`，用 `<AnatomyImage file="檔名.png" alt="說明" />`
- 檔名大小寫要與實際檔案完全一致（macOS 檔案系統不分大小寫，本機看不出來）

## 版號

改版號要同時改 `package.json` 與 `pubspec.yaml`，兩邊不一致 `check:tokens` 會擋下。
目前 `0.3.0`；破壞性變更升 minor，其餘升 patch，`v1.0.0` 保留給第一個完整可用的版本。
