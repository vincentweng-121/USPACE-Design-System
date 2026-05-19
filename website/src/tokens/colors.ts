// ─── Core Palette ─────────────────────────────────────────
export const palette = {
  black: '#000000',
  uspaceBlack: '#000000',
  white: '#FFFFFF',

  // Transparent
  transparentBlack40: 'rgba(0,0,0,0.40)',
  transparentBlack50: 'rgba(0,0,0,0.50)',
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

// ─── Semantic Tokens (Light theme — site default) ──────────
export const semantic = {
  // Content
  contentAccent: palette.neonLime600,
  contentPrimary: palette.grey800,
  contentSecondary: palette.grey600,
  contentTertiary: 'rgba(50,50,55,0.15)',
  contentDisabled: palette.grey400,
  contentError: palette.red400,
  contentInverse: palette.white,

  // Text
  textAccent: palette.neonLime800,
  textPrimary: palette.grey800,
  textSecondary: palette.grey600,
  textTertiary: palette.grey400,
  textDisabled: palette.grey400,
  textError: palette.red500,
  textInverse: palette.white,
  textWarning: palette.red300,

  // Background
  pagePrimary: palette.white,
  pageSecondary: palette.grey50,
  sectionPrimary: palette.white,
  sectionSecondary: palette.grey50,
  sectionAccent: palette.neonLime600,

  // Border
  borderDivider: palette.grey100,

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
} as const;

// ─── Palette groups for display ───────────────────────────
export const paletteGroups = [
  {
    name: 'NeonLime',
    colors: [
      { name: 'neonLime200', hex: '#00EEB7' },
      { name: 'neonLime400', hex: '#00F158' },
      { name: 'neonLime600', hex: '#C3F400' },
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
  {
    name: 'Black & White',
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'white', hex: '#FFFFFF' },
    ],
  },
  {
    name: 'Transparent',
    colors: [
      { name: 'transparentBlack40', hex: 'rgba(0,0,0,0.40)' },
      { name: 'transparentBlack50', hex: 'rgba(0,0,0,0.50)' },
      { name: 'transparentWhite10', hex: 'rgba(255,255,255,0.10)' },
      { name: 'transparentWhite50', hex: 'rgba(255,255,255,0.50)' },
      { name: 'transparentWhite70', hex: 'rgba(255,255,255,0.70)' },
      { name: 'transparentWhite80', hex: 'rgba(255,255,255,0.80)' },
      { name: 'transparentGrey8003', hex: 'rgba(50,50,55,0.03)' },
      { name: 'transparentGrey80015', hex: 'rgba(50,50,55,0.15)' },
      { name: 'transparentGrey20020', hex: 'rgba(217,217,217,0.20)' },
    ],
  },
];

// Semantic token groups for display
export const semanticGroups = [
  {
    name: 'Content',
    tokens: [
      { name: 'contentAccent', light: palette.neonLime600, dark: palette.neonLime600 },
      { name: 'contentPrimary', light: palette.grey800, dark: palette.white },
      { name: 'contentSecondary', light: palette.grey600, dark: palette.grey100 },
      { name: 'contentDisabled', light: palette.grey400, dark: palette.grey500 },
      { name: 'contentError', light: palette.red400, dark: palette.red400 },
      { name: 'contentInverse', light: palette.white, dark: palette.grey800 },
    ],
  },
  {
    name: 'Text',
    tokens: [
      { name: 'textAccent', light: palette.neonLime800, dark: palette.neonLime600 },
      { name: 'textPrimary', light: palette.grey800, dark: palette.white },
      { name: 'textSecondary', light: palette.grey600, dark: palette.grey200 },
      { name: 'textTertiary', light: palette.grey400, dark: palette.grey500 },
      { name: 'textError', light: palette.red500, dark: palette.red500 },
      { name: 'textInverse', light: palette.white, dark: palette.grey800 },
    ],
  },
  {
    name: 'Background',
    tokens: [
      { name: 'pagePrimary', light: palette.white, dark: palette.black },
      { name: 'pageSecondary', light: palette.grey50, dark: palette.grey900 },
      { name: 'sectionPrimary', light: palette.white, dark: palette.black },
      { name: 'sectionSecondary', light: palette.grey50, dark: palette.grey900 },
      { name: 'sectionAccent', light: palette.neonLime600, dark: palette.neonLime600 },
    ],
  },
  {
    name: 'Action',
    tokens: [
      { name: 'actionPrimaryBg', light: palette.grey800, dark: palette.grey700 },
      { name: 'actionPrimaryContentAccent', light: palette.neonLime600, dark: palette.neonLime600 },
      { name: 'actionSecondaryBg', light: palette.grey300, dark: palette.grey800 },
      { name: 'actionSecondaryContent', light: palette.grey800, dark: palette.white },
      { name: 'actionDisabledBg', light: palette.grey100, dark: palette.white },
      { name: 'actionDisabledContent', light: palette.grey200, dark: palette.white },
    ],
  },
];
