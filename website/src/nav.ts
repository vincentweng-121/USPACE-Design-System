/**
 * 全站資訊架構。
 *
 * 分組方式參考 Porsche Design System v3：
 *   Designing / Developing / Components / Styles / Patterns / Help & Support
 *
 * 側欄、搜尋索引、麵包屑都從這裡讀，只需維護一份。
 */

export interface NavItem {
  to: string;
  label: string;
  /** 尚未開始，側欄顯示 SOON 且不可點 */
  soon?: boolean;
  /** 搜尋用的補充關鍵字 */
  keywords?: string;
}

export interface NavGroup {
  key: string;
  label: string;
  items: NavItem[];
}

export const nav: NavGroup[] = [
  {
    key: 'designing',
    label: 'Designing',
    items: [
      { to: '/designing', label: 'Introduction', keywords: '設計 開始 introduction 總覽' },
    ],
  },
  {
    key: 'developing',
    label: 'Developing',
    items: [
      { to: '/developing', label: 'Introduction', keywords: '開發 工程 introduction' },
      { to: '/developing/flutter', label: 'Flutter Setup', keywords: 'flutter 接入 theme 安裝 setup' },
      { to: '/developing/tokens', label: 'Token Pipeline', keywords: 'token json 產生器 generator 同步' },
    ],
  },
  {
    key: 'components',
    label: 'Components',
    items: [
      { to: '/components/button', label: 'Button', keywords: '按鈕 accent charging primary secondary' },
      { to: '/components/chip', label: 'Chip', keywords: '標籤 tag outline' },
      { to: '/components/dropdown-menu', label: 'Dropdown Menu', keywords: '下拉 選單 select' },
      { to: '/components/header', label: 'Header', keywords: '標題列 page title 導覽' },
      { to: '/components/list', label: 'List', keywords: '列表 清單 item' },
      { to: '/components/modal', label: 'Modal', keywords: '彈窗 bottom sheet 對話框' },
      { to: '/components/tab', label: 'Tab', keywords: '分頁 頁籤 filter' },
      { to: '/components/text-area', label: 'Text Area', keywords: '多行 輸入 textarea' },
      { to: '/components/text-field', label: 'Text Field', keywords: '輸入框 input 表單' },
      { to: '/components/toggle', label: 'Toggle', keywords: '開關 switch' },
      { to: '/components/action-area', label: 'Action Area', keywords: '動作區 action area 底部 操作區' },
      { to: '/components/avatar', label: 'Avatar', keywords: '頭像 大頭貼 使用者', soon: true },
      { to: '/components/bottom-bar', label: 'Bottom Bar', keywords: '底部按鈕列 動作列 關鍵按鈕 action bar', soon: true },
      { to: '/components/card', label: 'Card', keywords: '卡片 card 容器', soon: true },
      { to: '/components/category', label: 'Category', keywords: '目錄 分類 category', soon: true },
      { to: '/components/checkbox', label: 'Checkbox', keywords: '多選框 勾選 核取方塊', soon: true },
      { to: '/components/divider', label: 'Divider', keywords: '分隔線 divider', soon: true },
      { to: '/components/floating-button', label: 'Floating Button', keywords: '浮動按鈕 fab', soon: true },
      { to: '/components/icon-button', label: 'Icon Button', keywords: '圖標按鈕 icon button 純圖示', soon: true },
      { to: '/components/menu', label: 'Menu', keywords: '選單 menu', soon: true },
      { to: '/components/pagination', label: 'Pagination', keywords: '頁面控制 分頁 換頁', soon: true },
      { to: '/components/progress-indicator', label: 'Progress Indicator', keywords: '進度條 loading 進度', soon: true },
      { to: '/components/radio', label: 'Radio', keywords: '單選框 radiobox 單選鈕', soon: true },
      { to: '/components/skeleton', label: 'Skeleton', keywords: '骨架 載入 佔位', soon: true },
      { to: '/components/tab-bar', label: 'Tab Bar', keywords: '底部導航 導航列 導覽 bottom navigation', soon: true },
      { to: '/components/thumbnail', label: 'Thumbnail', keywords: '縮圖 預覽圖', soon: true },
      { to: '/components/toast', label: 'Toast', keywords: '浮動訊息 提示 snackbar', soon: true },
    ],
  },
  {
    key: 'styles',
    label: 'Styles',
    items: [
      { to: '/styles/color', label: 'Color', keywords: '色票 palette semantic 語意色 neonLime' },
      { to: '/styles/typography', label: 'Typography', keywords: '字體 字級 PingFang SF Pro' },
      { to: '/styles/spacing', label: 'Spacing & Radius', keywords: '間距 圓角 spacer margin' },
      { to: '/styles/glass', label: 'Glass / Materials', keywords: '毛玻璃 材質 blur' },
      { to: '/styles/elevation', label: 'Elevation', soon: true },
      { to: '/styles/iconography', label: 'Iconography', soon: true },
    ],
  },
  {
    key: 'patterns',
    label: 'Patterns',
    items: [{ to: '/patterns', label: 'Introduction', keywords: '樣式 pattern' }],
  },
  {
    key: 'help',
    label: 'Help & Support',
    items: [
      { to: '/help/changelog', label: 'Changelog', keywords: '變更 版本 release' },
      { to: '/help/status', label: 'Status', keywords: '進度 狀態 skill status' },
      { to: '/help/roadmap', label: 'Roadmap', keywords: '甘特圖 排程 進度 gantt schedule' },
    ],
  },
];

/** 攤平成單一清單，供搜尋與「上一頁 / 下一頁」使用 */
export const allNavItems: (NavItem & { group: string })[] = nav.flatMap((g) =>
  g.items.map((i) => ({ ...i, group: g.label }))
);

/** 依路徑找出所屬分組與項目 */
export function findNav(pathname: string) {
  for (const group of nav) {
    for (const item of group.items) {
      if (item.to === pathname) return { group, item };
    }
  }
  return null;
}
