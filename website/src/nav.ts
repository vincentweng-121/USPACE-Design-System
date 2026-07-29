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
      { to: '/components/floating-button', label: 'Floating Button', soon: true },
      { to: '/components/bottom-bar', label: 'Bottom Bar', soon: true },
      { to: '/components/divider', label: 'Divider', soon: true },
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
