// ⚠️ GENERATED FILE — 請勿手動編輯
// 來源：tokens/typography.json
// 重新產生：npm run gen:tokens（專案根目錄）

export const typographyStyles = [
  {
    family: 'PingFang TC',
    styles: [
      { name: 'headingL', size: 26, lineHeight: 34, weight: 400, desc: 'PageTitle' },
      { name: 'headingM', size: 22, lineHeight: 30, weight: 400, desc: 'ModalTitle' },
      { name: 'bodyL', size: 18, lineHeight: 26, weight: 400, desc: '' },
      { name: 'bodyM', size: 16, lineHeight: 24, weight: 400, desc: '' },
      { name: 'bodyS', size: 14, lineHeight: 20, weight: 400, desc: '' },
      { name: 'captionS', size: 12, lineHeight: 16, weight: 400, desc: '' },
      { name: 'displayM', size: 18, lineHeight: 26, weight: 500, desc: 'Medium weight' },
      { name: 'displayS', size: 14, lineHeight: 20, weight: 500, desc: 'Medium weight' },
      { name: 'labelL', size: 16, lineHeight: 24, weight: 400, desc: 'Button' },
      { name: 'labelM', size: 14, lineHeight: 20, weight: 400, desc: '文字按鈕' },
      { name: 'labelS', size: 12, lineHeight: 16, weight: 400, desc: '' },
      { name: 'labelXs', size: 10, lineHeight: 14, weight: 400, desc: 'Tab' },
    ],
  },
  {
    family: 'SF Pro',
    styles: [
      { name: 'sfHeadingL', size: 26, lineHeight: 34, weight: 400, desc: 'PageTitle' },
      { name: 'sfHeadingM', size: 22, lineHeight: 30, weight: 400, desc: 'ModalTitle' },
      { name: 'sfBodyL', size: 18, lineHeight: 26, weight: 400, desc: '' },
      { name: 'sfBodyM', size: 16, lineHeight: 24, weight: 400, desc: '' },
      { name: 'sfBodyS', size: 14, lineHeight: 20, weight: 400, desc: '' },
      { name: 'sfCaptionS', size: 14, lineHeight: 16, weight: 400, desc: 'fontSize=14，與 PingFang 不同' },
      { name: 'sfDisplayM', size: 20, lineHeight: 26, weight: 500, desc: 'Medium weight；fontSize=20，與 PingFang 不同' },
      { name: 'sfDisplayS', size: 14, lineHeight: 20, weight: 500, desc: 'Medium weight' },
      { name: 'sfLabelL', size: 16, lineHeight: 24, weight: 400, desc: 'Button' },
      { name: 'sfLabelM', size: 14, lineHeight: 20, weight: 400, desc: '文字按鈕' },
      { name: 'sfLabelS', size: 12, lineHeight: 16, weight: 400, desc: '' },
      { name: 'sfLabelXs', size: 10, lineHeight: 14, weight: 400, desc: 'Tab' },
    ],
  },
];

export function weightLabel(w: number) {
  if (w === 400) return 'Regular';
  if (w === 500) return 'Medium';
  if (w === 700) return 'Bold';
  return `w${w}`;
}
