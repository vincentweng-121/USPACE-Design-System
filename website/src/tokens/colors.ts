// ⚠️ GENERATED FILE — 請勿手動編輯
// 來源：tokens/palette.json、tokens/semantic-colors.json
// 重新產生：npm run gen:tokens（專案根目錄）

// ─── Core Palette ─────────────────────────────────────────
export const palette = {
  // Black & White
  black: '#000000',
  uspaceBlack: '#000000',
  white: '#FFFFFF',

  // Transparent
  transparentBlack10: 'rgba(0,0,0,0.10)',
  transparentBlack40: 'rgba(0,0,0,0.40)',
  transparentBlack50: 'rgba(0,0,0,0.50)',
  transparentWhite5: 'rgba(255,255,255,0.05)',
  transparentWhite10: 'rgba(255,255,255,0.10)',
  transparentWhite50: 'rgba(255,255,255,0.50)',
  transparentWhite70: 'rgba(255,255,255,0.70)',
  transparentWhite80: 'rgba(255,255,255,0.80)',
  transparentGrey8003: 'rgba(50,50,55,0.03)',
  transparentGrey80015: 'rgba(50,50,55,0.15)',
  transparentGrey20020: 'rgba(217,217,217,0.20)',

  // NeonLime
  neonLime200: '#00EEB7',
  neonLime400: '#00F158',
  neonLime600: '#C3F400',
  neonLime700: '#B4E002',
  neonLime800: '#A7D100',
  neonLime900: '#74AA5A',

  // Grey
  grey50: '#F8F8F8',
  grey100: '#EEEEEE',
  grey200: '#D9D9D9',
  grey300: '#B4B4B4',
  grey400: '#A6A6A6',
  grey500: '#98989F',
  grey600: '#777777',
  grey700: '#606060',
  grey800: '#323237',
  grey900: '#1A1A1A',

  // Blue
  blue400: '#A1BDE5',
  blue600: '#5948D0',
  blue800: '#3F5CEE',

  // Yellow
  yellow400: '#D1AF65',

  // Red
  red300: '#FF5151',
  red400: '#FF4A20',
  red500: '#F40000',
} as const;

// ─── Semantic Tokens — light ────────────────────────────
export const semanticLight = {
  // Content
  contentAccent: palette.neonLime600,
  contentPrimary: palette.grey800,
  contentSecondary: palette.grey600,
  contentTertiary: palette.transparentGrey80015,
  contentDisabled: palette.grey400,
  contentDisabledWithoutBg: palette.grey200,
  contentError: palette.red400,
  contentInverse: palette.white,
  contentUC: palette.neonLime400,
  contentUW: palette.neonLime200,

  // Text
  textAccent: palette.neonLime800,
  textPrimary: palette.grey800,
  textSecondary: palette.grey600,
  textTertiary: palette.grey400,
  textDisabled: palette.grey400,
  textDisabledMuted: palette.grey200,
  textError: palette.red500,
  textInverse: palette.white,
  textWarning: palette.red300,

  // Background
  pagePrimary: palette.white,
  pageSecondary: palette.grey50,
  pageMask: palette.transparentBlack40,
  pagePopup: palette.transparentWhite80,
  sectionPrimary: palette.white,
  sectionSecondary: palette.grey50,
  sectionAccent: palette.neonLime600,
  sectionError: palette.red500,

  // Border
  borderDivider: palette.transparentGrey8003,

  // Effect
  shadowDefault: palette.transparentBlack10,

  // Action
  actionPrimaryBg: palette.grey800,
  actionPrimaryContentAccent: palette.neonLime600,
  actionPrimaryContentCharging: palette.neonLime400,
  actionPrimaryContent: palette.grey200,
  actionSecondaryBg: palette.grey300,
  actionSecondaryContent: palette.grey800,
  actionTertiaryBg: palette.grey100,
  actionTertiaryContent: palette.grey800,
  actionDisabledBg: palette.grey100,
  actionDisabledContent: palette.grey200,
  actionOutlineBg: palette.white,
  actionOutlineContent: palette.grey600,
  actionFabBg: palette.transparentWhite70,
  actionFabContent: palette.grey800,
  actionFabSelected: palette.transparentGrey20020,
  actionFabOpacityBg: palette.transparentWhite10,
  actionGraphicBg: palette.grey200,
  actionGraphicContent: palette.grey400,

  // Input
  inputBgDefault: palette.white,
  inputBorderActive: palette.neonLime600,
  inputBorderError: palette.red500,
  inputText: palette.grey800,
  inputTextError: palette.red500,
  inputTextPlaceholder: palette.grey200,
  inputTextDisabled: palette.grey200,

  // Chip
  chipBgPrimary: palette.white,
  chipBgSecondary: palette.grey100,
  chipBgAccent: palette.neonLime600,

  // Project
  projectCharging: palette.neonLime400,
  projectGoldenCard: palette.yellow400,
  projectBlackCard: palette.grey800,
  projectPlatinumCard: palette.grey300,
  projectGreenCard: palette.neonLime900,
  projectUspaceBlack: palette.black,
  projectUspaceWhite: palette.white,
} as const;

// ─── Semantic Tokens — dark ────────────────────────────
export const semanticDark = {
  // Content
  contentAccent: palette.neonLime600,
  contentPrimary: palette.white,
  contentSecondary: palette.grey100,
  contentTertiary: palette.grey800,
  contentDisabled: palette.grey500,
  contentDisabledWithoutBg: palette.white,
  contentError: palette.red400,
  contentInverse: palette.grey800,
  contentUC: palette.grey800,
  contentUW: palette.grey800,

  // Text
  textAccent: palette.neonLime600,
  textPrimary: palette.white,
  textSecondary: palette.grey200,
  textTertiary: palette.grey500,
  textDisabled: palette.grey500,
  textDisabledMuted: palette.grey500,
  textError: palette.red500,
  textInverse: palette.grey800,
  textWarning: palette.white,

  // Background
  pagePrimary: palette.black,
  pageSecondary: palette.grey900,
  pageMask: palette.transparentWhite5,
  pagePopup: palette.transparentWhite10,
  sectionPrimary: palette.black,
  sectionSecondary: palette.grey900,
  sectionAccent: palette.neonLime600,
  sectionError: palette.white,

  // Border
  borderDivider: palette.grey800,

  // Effect
  shadowDefault: palette.transparentBlack10,

  // Action
  actionPrimaryBg: palette.grey700,
  actionPrimaryContentAccent: palette.neonLime600,
  actionPrimaryContentCharging: palette.neonLime400,
  actionPrimaryContent: palette.white,
  actionSecondaryBg: palette.grey800,
  actionSecondaryContent: palette.white,
  actionTertiaryBg: palette.grey800,
  actionTertiaryContent: palette.grey600,
  actionDisabledBg: palette.white,
  actionDisabledContent: palette.white,
  actionOutlineBg: palette.grey800,
  actionOutlineContent: palette.white,
  actionFabBg: palette.transparentWhite10,
  actionFabContent: palette.grey500,
  actionFabSelected: palette.white,
  actionFabOpacityBg: palette.white,
  actionGraphicBg: palette.white,
  actionGraphicContent: palette.white,

  // Input
  inputBgDefault: palette.white,
  inputBorderActive: palette.white,
  inputBorderError: palette.white,
  inputText: palette.white,
  inputTextError: palette.white,
  inputTextPlaceholder: palette.white,
  inputTextDisabled: palette.white,

  // Chip
  chipBgPrimary: palette.neonLime600,
  chipBgSecondary: palette.white,
  chipBgAccent: palette.white,

  // Project
  projectCharging: palette.white,
  projectGoldenCard: palette.white,
  projectBlackCard: palette.white,
  projectPlatinumCard: palette.white,
  projectGreenCard: palette.white,
  projectUspaceBlack: palette.white,
  projectUspaceWhite: palette.white,
} as const;

/// 站台預設主題（light）。需要 dark 值請用 semanticDark。
export const semantic = semanticLight;

// ─── Gradients ────────────────────────────────────────────
export const gradients = {
  silverLinear: 'linear-gradient(to right, #777777, #D9D9D9)',
  limeLinear: 'linear-gradient(261.99deg, #00EEB7 -7.69%, #B4E002 89.23%)',
  bottomBarGray1B: 'linear-gradient(180deg, rgba(248,248,248,0) 31.1%, #F8F8F8 55.84%)',
  bottomBarGray2B: 'linear-gradient(180deg, rgba(248,248,248,0) 0%, #F8F8F8 38.44%)',
  actionCustomizedBorder: 'linear-gradient(to right, #777777, #D9D9D9)',
} as const;

// ─── Palette groups（Color 頁展示用）──────────────────────
export const paletteGroups = [
  {
    name: 'Black & White',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'uspaceBlack', hex: '#000000' },
      { name: 'white', hex: '#FFFFFF' },
    ],
  },
  {
    name: 'Transparent',
    colors: [
      { name: 'transparentBlack10', hex: 'rgba(0,0,0,0.10)' },
      { name: 'transparentBlack40', hex: 'rgba(0,0,0,0.40)' },
      { name: 'transparentBlack50', hex: 'rgba(0,0,0,0.50)' },
      { name: 'transparentWhite5', hex: 'rgba(255,255,255,0.05)' },
      { name: 'transparentWhite10', hex: 'rgba(255,255,255,0.10)' },
      { name: 'transparentWhite50', hex: 'rgba(255,255,255,0.50)' },
      { name: 'transparentWhite70', hex: 'rgba(255,255,255,0.70)' },
      { name: 'transparentWhite80', hex: 'rgba(255,255,255,0.80)' },
      { name: 'transparentGrey8003', hex: 'rgba(50,50,55,0.03)' },
      { name: 'transparentGrey80015', hex: 'rgba(50,50,55,0.15)' },
      { name: 'transparentGrey20020', hex: 'rgba(217,217,217,0.20)' },
    ],
  },
  {
    name: 'NeonLime',
    colors: [
      { name: 'neonLime200', hex: '#00EEB7' },
      { name: 'neonLime400', hex: '#00F158' },
      { name: 'neonLime600', hex: '#C3F400' },
      { name: 'neonLime700', hex: '#B4E002' },
      { name: 'neonLime800', hex: '#A7D100' },
      { name: 'neonLime900', hex: '#74AA5A' },
    ],
  },
  {
    name: 'Grey',
    colors: [
      { name: 'grey50', hex: '#F8F8F8' },
      { name: 'grey100', hex: '#EEEEEE' },
      { name: 'grey200', hex: '#D9D9D9' },
      { name: 'grey300', hex: '#B4B4B4' },
      { name: 'grey400', hex: '#A6A6A6' },
      { name: 'grey500', hex: '#98989F' },
      { name: 'grey600', hex: '#777777' },
      { name: 'grey700', hex: '#606060' },
      { name: 'grey800', hex: '#323237' },
      { name: 'grey900', hex: '#1A1A1A' },
    ],
  },
  {
    name: 'Blue',
    colors: [
      { name: 'blue400', hex: '#A1BDE5' },
      { name: 'blue600', hex: '#5948D0' },
      { name: 'blue800', hex: '#3F5CEE' },
    ],
  },
  {
    name: 'Yellow',
    colors: [
      { name: 'yellow400', hex: '#D1AF65' },
    ],
  },
  {
    name: 'Red',
    colors: [
      { name: 'red300', hex: '#FF5151' },
      { name: 'red400', hex: '#FF4A20' },
      { name: 'red500', hex: '#F40000' },
    ],
  },
];

// ─── Semantic groups（Color 頁 light/dark 對照用）─────────
export const semanticGroups = [
  {
    name: 'Content',
    tokens: [
      { name: 'contentAccent', lightToken: 'neonLime600', darkToken: 'neonLime600', light: palette.neonLime600, dark: palette.neonLime600 },
      { name: 'contentPrimary', lightToken: 'grey800', darkToken: 'white', light: palette.grey800, dark: palette.white },
      { name: 'contentSecondary', lightToken: 'grey600', darkToken: 'grey100', light: palette.grey600, dark: palette.grey100 },
      { name: 'contentTertiary', lightToken: 'transparentGrey80015', darkToken: 'grey800', light: palette.transparentGrey80015, dark: palette.grey800 },
      { name: 'contentDisabled', lightToken: 'grey400', darkToken: 'grey500', light: palette.grey400, dark: palette.grey500 },
      { name: 'contentDisabledWithoutBg', lightToken: 'grey200', darkToken: 'white', light: palette.grey200, dark: palette.white },
      { name: 'contentError', lightToken: 'red400', darkToken: 'red400', light: palette.red400, dark: palette.red400 },
      { name: 'contentInverse', lightToken: 'white', darkToken: 'grey800', light: palette.white, dark: palette.grey800 },
      { name: 'contentUC', lightToken: 'neonLime400', darkToken: 'grey800', light: palette.neonLime400, dark: palette.grey800 },
      { name: 'contentUW', lightToken: 'neonLime200', darkToken: 'grey800', light: palette.neonLime200, dark: palette.grey800 },
    ],
  },
  {
    name: 'Text',
    tokens: [
      { name: 'textAccent', lightToken: 'neonLime800', darkToken: 'neonLime600', light: palette.neonLime800, dark: palette.neonLime600 },
      { name: 'textPrimary', lightToken: 'grey800', darkToken: 'white', light: palette.grey800, dark: palette.white },
      { name: 'textSecondary', lightToken: 'grey600', darkToken: 'grey200', light: palette.grey600, dark: palette.grey200 },
      { name: 'textTertiary', lightToken: 'grey400', darkToken: 'grey500', light: palette.grey400, dark: palette.grey500 },
      { name: 'textDisabled', lightToken: 'grey400', darkToken: 'grey500', light: palette.grey400, dark: palette.grey500 },
      { name: 'textDisabledMuted', lightToken: 'grey200', darkToken: 'grey500', light: palette.grey200, dark: palette.grey500 },
      { name: 'textError', lightToken: 'red500', darkToken: 'red500', light: palette.red500, dark: palette.red500 },
      { name: 'textInverse', lightToken: 'white', darkToken: 'grey800', light: palette.white, dark: palette.grey800 },
      { name: 'textWarning', lightToken: 'red300', darkToken: 'white', light: palette.red300, dark: palette.white },
    ],
  },
  {
    name: 'Background',
    tokens: [
      { name: 'pagePrimary', lightToken: 'white', darkToken: 'black', light: palette.white, dark: palette.black },
      { name: 'pageSecondary', lightToken: 'grey50', darkToken: 'grey900', light: palette.grey50, dark: palette.grey900 },
      { name: 'pageMask', lightToken: 'transparentBlack40', darkToken: 'transparentWhite5', light: palette.transparentBlack40, dark: palette.transparentWhite5 },
      { name: 'pagePopup', lightToken: 'transparentWhite80', darkToken: 'transparentWhite10', light: palette.transparentWhite80, dark: palette.transparentWhite10 },
      { name: 'sectionPrimary', lightToken: 'white', darkToken: 'black', light: palette.white, dark: palette.black },
      { name: 'sectionSecondary', lightToken: 'grey50', darkToken: 'grey900', light: palette.grey50, dark: palette.grey900 },
      { name: 'sectionAccent', lightToken: 'neonLime600', darkToken: 'neonLime600', light: palette.neonLime600, dark: palette.neonLime600 },
      { name: 'sectionError', lightToken: 'red500', darkToken: 'white', light: palette.red500, dark: palette.white },
    ],
  },
  {
    name: 'Border',
    tokens: [
      { name: 'borderDivider', lightToken: 'transparentGrey8003', darkToken: 'grey800', light: palette.transparentGrey8003, dark: palette.grey800 },
    ],
  },
  {
    name: 'Effect',
    tokens: [
      { name: 'shadowDefault', lightToken: 'transparentBlack10', darkToken: 'transparentBlack10', light: palette.transparentBlack10, dark: palette.transparentBlack10 },
    ],
  },
  {
    name: 'Action',
    tokens: [
      { name: 'actionPrimaryBg', lightToken: 'grey800', darkToken: 'grey700', light: palette.grey800, dark: palette.grey700 },
      { name: 'actionPrimaryContentAccent', lightToken: 'neonLime600', darkToken: 'neonLime600', light: palette.neonLime600, dark: palette.neonLime600 },
      { name: 'actionPrimaryContentCharging', lightToken: 'neonLime400', darkToken: 'neonLime400', light: palette.neonLime400, dark: palette.neonLime400 },
      { name: 'actionPrimaryContent', lightToken: 'grey200', darkToken: 'white', light: palette.grey200, dark: palette.white },
      { name: 'actionSecondaryBg', lightToken: 'grey300', darkToken: 'grey800', light: palette.grey300, dark: palette.grey800 },
      { name: 'actionSecondaryContent', lightToken: 'grey800', darkToken: 'white', light: palette.grey800, dark: palette.white },
      { name: 'actionTertiaryBg', lightToken: 'grey100', darkToken: 'grey800', light: palette.grey100, dark: palette.grey800 },
      { name: 'actionTertiaryContent', lightToken: 'grey800', darkToken: 'grey600', light: palette.grey800, dark: palette.grey600 },
      { name: 'actionDisabledBg', lightToken: 'grey100', darkToken: 'white', light: palette.grey100, dark: palette.white },
      { name: 'actionDisabledContent', lightToken: 'grey200', darkToken: 'white', light: palette.grey200, dark: palette.white },
      { name: 'actionOutlineBg', lightToken: 'white', darkToken: 'grey800', light: palette.white, dark: palette.grey800 },
      { name: 'actionOutlineContent', lightToken: 'grey600', darkToken: 'white', light: palette.grey600, dark: palette.white },
      { name: 'actionFabBg', lightToken: 'transparentWhite70', darkToken: 'transparentWhite10', light: palette.transparentWhite70, dark: palette.transparentWhite10 },
      { name: 'actionFabContent', lightToken: 'grey800', darkToken: 'grey500', light: palette.grey800, dark: palette.grey500 },
      { name: 'actionFabSelected', lightToken: 'transparentGrey20020', darkToken: 'white', light: palette.transparentGrey20020, dark: palette.white },
      { name: 'actionFabOpacityBg', lightToken: 'transparentWhite10', darkToken: 'white', light: palette.transparentWhite10, dark: palette.white },
      { name: 'actionGraphicBg', lightToken: 'grey200', darkToken: 'white', light: palette.grey200, dark: palette.white },
      { name: 'actionGraphicContent', lightToken: 'grey400', darkToken: 'white', light: palette.grey400, dark: palette.white },
    ],
  },
  {
    name: 'Input',
    tokens: [
      { name: 'inputBgDefault', lightToken: 'white', darkToken: 'white', light: palette.white, dark: palette.white },
      { name: 'inputBorderActive', lightToken: 'neonLime600', darkToken: 'white', light: palette.neonLime600, dark: palette.white },
      { name: 'inputBorderError', lightToken: 'red500', darkToken: 'white', light: palette.red500, dark: palette.white },
      { name: 'inputText', lightToken: 'grey800', darkToken: 'white', light: palette.grey800, dark: palette.white },
      { name: 'inputTextError', lightToken: 'red500', darkToken: 'white', light: palette.red500, dark: palette.white },
      { name: 'inputTextPlaceholder', lightToken: 'grey200', darkToken: 'white', light: palette.grey200, dark: palette.white },
      { name: 'inputTextDisabled', lightToken: 'grey200', darkToken: 'white', light: palette.grey200, dark: palette.white },
    ],
  },
  {
    name: 'Chip',
    tokens: [
      { name: 'chipBgPrimary', lightToken: 'white', darkToken: 'neonLime600', light: palette.white, dark: palette.neonLime600 },
      { name: 'chipBgSecondary', lightToken: 'grey100', darkToken: 'white', light: palette.grey100, dark: palette.white },
      { name: 'chipBgAccent', lightToken: 'neonLime600', darkToken: 'white', light: palette.neonLime600, dark: palette.white },
    ],
  },
  {
    name: 'Project',
    tokens: [
      { name: 'projectCharging', lightToken: 'neonLime400', darkToken: 'white', light: palette.neonLime400, dark: palette.white },
      { name: 'projectGoldenCard', lightToken: 'yellow400', darkToken: 'white', light: palette.yellow400, dark: palette.white },
      { name: 'projectBlackCard', lightToken: 'grey800', darkToken: 'white', light: palette.grey800, dark: palette.white },
      { name: 'projectPlatinumCard', lightToken: 'grey300', darkToken: 'white', light: palette.grey300, dark: palette.white },
      { name: 'projectGreenCard', lightToken: 'neonLime900', darkToken: 'white', light: palette.neonLime900, dark: palette.white },
      { name: 'projectUspaceBlack', lightToken: 'black', darkToken: 'white', light: palette.black, dark: palette.white },
      { name: 'projectUspaceWhite', lightToken: 'white', darkToken: 'white', light: palette.white, dark: palette.white },
    ],
  },
];
