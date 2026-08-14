// ⚠️ GENERATED FILE — 請勿手動編輯
// 來源：tokens/scalars.json
// 重新產生：npm run gen:tokens（專案根目錄）

export const margin = { name: 'margin', value: 20, desc: '頁面左右邊距（Figma scope: GAP）' };

export const spacers = [
  { name: 'spacer2', value: 2 },
  { name: 'spacer4', value: 4 },
  { name: 'spacer8', value: 8 },
  { name: 'spacer12', value: 12 },
  { name: 'spacer16', value: 16 },
  { name: 'spacer20', value: 20 },
  { name: 'spacer24', value: 24 },
  { name: 'spacer32', value: 32 },
  { name: 'spacer40', value: 40 },
  { name: 'spacer48', value: 48 },
  { name: 'spacer56', value: 56 },
];

export const radii = [
  { name: 'small', value: 8, desc: '小圓角，如 card 內元素' },
  { name: 'medium', value: 20, desc: '中圓角，如 dropdown panel、popup' },
  { name: 'full', value: 1000, desc: '完全圓角，如 button、chip、input' },
];

export const elevation = {
  shadowBlur: 30,
} as const;

export const touch = {
  minTarget: 40,
} as const;

export const glass = {
  fillColor: 'rgba(255,255,255,0.20)',
  fillColorDart: 'Color(0x33FFFFFF)',
  blurSigma: 10.0,
} as const;
