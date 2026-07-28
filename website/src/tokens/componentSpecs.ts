// ⚠️ GENERATED FILE — 請勿手動編輯
// 來源：tokens/components/*.json
// 重新產生：npm run gen:tokens（專案根目錄）
//
// 同一份 JSON 也驅動 test/component_token_test.dart，
// 因此這裡列出的 token 對應保證與 Flutter 元件實際行為一致。

export interface ComponentSpec {
  component: string;
  source: string;
  figmaNode?: string;
  dimensions: Record<string, string[]>;
  variants: Record<string, string | number | null | undefined>[];
  layout?: Record<string, { width: number; height: number }>;
}

export const buttonSpec: ComponentSpec = {
  "component": "USpaceButton",
  "source": "styles/button.dart",
  "figmaNode": "473:10438",
  "dimensions": {
    "level": [
      "accent",
      "charging",
      "primary",
      "secondary",
      "customized"
    ],
    "size": [
      "regular",
      "small"
    ],
    "state": [
      "enabled",
      "disabled"
    ]
  },
  "variants": [
    {
      "level": "accent",
      "size": "regular",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContentAccent"
    },
    {
      "level": "accent",
      "size": "small",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContentAccent"
    },
    {
      "level": "charging",
      "size": "regular",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContentCharging"
    },
    {
      "level": "charging",
      "size": "small",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContentCharging"
    },
    {
      "level": "primary",
      "size": "regular",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContent"
    },
    {
      "level": "primary",
      "size": "small",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContent"
    },
    {
      "level": "secondary",
      "size": "regular",
      "state": "enabled",
      "bg": "actionSecondaryBg",
      "content": "actionSecondaryContent"
    },
    {
      "level": "secondary",
      "size": "small",
      "state": "enabled",
      "bg": "actionTertiaryBg",
      "content": "actionSecondaryContent",
      "note": "small 的底色刻意與 regular 不同（Figma）"
    },
    {
      "level": "accent",
      "size": "regular",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent"
    },
    {
      "level": "primary",
      "size": "small",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent"
    },
    {
      "level": "secondary",
      "size": "regular",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent"
    }
  ]
};

export const toggleSpec: ComponentSpec = {
  "component": "USpaceToggle",
  "source": "styles/toggle.dart",
  "dimensions": {
    "value": [
      "on",
      "off"
    ],
    "enabled": [
      "enabled",
      "disabled"
    ]
  },
  "variants": [
    {
      "value": "on",
      "enabled": "enabled",
      "track": "actionPrimaryContentAccent",
      "thumb": "contentInverse",
      "opacity": 1
    },
    {
      "value": "on",
      "enabled": "disabled",
      "track": "actionPrimaryContentAccent",
      "thumb": "contentInverse",
      "opacity": 0.25,
      "note": "色彩同 enabled，以 Opacity 表示不可操作"
    },
    {
      "value": "off",
      "enabled": "enabled",
      "track": "actionPrimaryContent",
      "thumb": "contentInverse",
      "opacity": 1
    },
    {
      "value": "off",
      "enabled": "disabled",
      "track": "actionDisabledBg",
      "thumb": "contentInverse",
      "opacity": 1,
      "note": "改換 track 色而非降透明度，以區別於 OFF+Enable"
    }
  ],
  "layout": {
    "track": {
      "width": 64,
      "height": 24
    },
    "thumb": {
      "width": 34,
      "height": 20
    }
  }
};

export const chipSpec: ComponentSpec = {
  "component": "USpaceChip",
  "source": "styles/chip.dart",
  "figmaNode": "1327:19329",
  "dimensions": {
    "level": [
      "accent",
      "primary",
      "secondary",
      "outline"
    ]
  },
  "variants": [
    {
      "level": "accent",
      "bg": "chipBgAccent",
      "content": "textPrimary"
    },
    {
      "level": "primary",
      "bg": "chipBgPrimary",
      "content": "textPrimary"
    },
    {
      "level": "secondary",
      "bg": "chipBgSecondary",
      "content": "textPrimary"
    },
    {
      "level": "outline",
      "bg": null,
      "content": null,
      "note": "透明底 + neonLime200 邊框 + 漸層文字，無對應 semantic token"
    }
  ]
};

export const componentSpecs = { button: buttonSpec, toggle: toggleSpec, chip: chipSpec };
