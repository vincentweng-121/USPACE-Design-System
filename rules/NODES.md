# 本輪目標節點
> 每輪開始前手動更新。只列當次要讀的節點，不多不少。

## 當次任務
任務描述：從 Figma 讀取 Header component，產出 header.dart
目標檔案：header.dart

## 指定 Node ID
| 名稱 | Node ID | 說明 |
|------|---------|------|
| Full Page Header | 1327:17998 | FullPage type |
| Floating Page Header | 1327:18205 | Floating type |
| Modal Header | 1327:18962 | Modal type |

## Component 結構（已確認）
- Type: FullPage / Floating / Modal
- TitlePlace: Left / Center
- Status: Default
- LeftSection Function: FullPageIcon / Title / ProfileTitle / FloatingIcon
- RightSection Function: 24px icon（例如 Close）
- Boolean: showStatusBar / showLeft / showRight / showTitle
          showSubtitle / showParagraph / showInfo

## 本輪不在範圍
- 不動任何現有 styles/ 檔案
