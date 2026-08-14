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
  layout?: Record<string, number | { width: number; height: number }>;
  confidence?: string;
}

export const buttonSpec: ComponentSpec = {
  "component": "USpaceButton",
  "source": "styles/button.dart",
  "figmaNode": "3611:8842 / 3611:8861",
  "dimensions": {
    "level": [
      "primary",
      "secondary",
      "tertiary"
    ],
    "emphasis": [
      "none",
      "accent",
      "charging"
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
      "level": "primary",
      "emphasis": "none",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContent",
      "border": null
    },
    {
      "level": "primary",
      "emphasis": "accent",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContentAccent",
      "border": null,
      "note": "螢光綠文字，同一畫面最多一顆"
    },
    {
      "level": "primary",
      "emphasis": "charging",
      "state": "enabled",
      "bg": "actionPrimaryBg",
      "content": "actionPrimaryContentCharging",
      "border": null,
      "note": "充電流程專用的螢光綠"
    },
    {
      "level": "primary",
      "emphasis": "none",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent",
      "border": null
    },
    {
      "level": "primary",
      "emphasis": "accent",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent",
      "border": null,
      "note": "disabled 時 emphasis 不生效"
    },
    {
      "level": "primary",
      "emphasis": "charging",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent",
      "border": null,
      "note": "disabled 時 emphasis 不生效"
    },
    {
      "level": "secondary",
      "emphasis": "none",
      "state": "enabled",
      "bg": "actionSecondaryBg",
      "content": "actionSecondaryContent",
      "border": null,
      "note": "實心中灰底，無描邊"
    },
    {
      "level": "secondary",
      "emphasis": "none",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent",
      "border": null
    },
    {
      "level": "tertiary",
      "emphasis": "none",
      "state": "enabled",
      "bg": "actionTertiaryBg",
      "content": "actionTertiaryContent",
      "border": null,
      "note": "實心淺灰底，無描邊"
    },
    {
      "level": "tertiary",
      "emphasis": "none",
      "state": "disabled",
      "bg": "actionDisabledBg",
      "content": "actionDisabledContent",
      "border": null
    }
  ],
  "layout": {
    "height": 48,
    "iconSize": 24,
    "gap": 8,
    "smallPaddingX": 24
  }
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
    "style": [
      "filled",
      "outlined",
      "text"
    ],
    "level": [
      "accent",
      "primary",
      "secondary"
    ],
    "size": [
      "regular",
      "small"
    ]
  },
  "variants": [
    {
      "style": "filled",
      "level": "accent",
      "bg": "chipBgAccent",
      "border": null,
      "content": "textPrimary"
    },
    {
      "style": "filled",
      "level": "primary",
      "bg": "chipBgPrimary",
      "border": null,
      "content": "textPrimary"
    },
    {
      "style": "filled",
      "level": "secondary",
      "bg": "chipBgSecondary",
      "border": null,
      "content": "textPrimary"
    },
    {
      "style": "outlined",
      "bg": null,
      "border": "contentSecondary",
      "content": "textPrimary",
      "note": "透明底加中性色描邊，不吃 level"
    },
    {
      "style": "text",
      "bg": null,
      "border": null,
      "content": "textPrimary",
      "note": "無底無框，內距與 filled 相同，不吃 level"
    }
  ],
  "layout": {
    "heightRegular": 22,
    "heightSmall": 16,
    "iconSize": 20,
    "gap": 2,
    "paddingY": 1,
    "regularPaddingX": 12,
    "regularPaddingLeftWithIcon": 8,
    "regularPaddingRightWithIcon": 12,
    "smallPaddingX": 8
  }
};

export const tabSpec: ComponentSpec = {
  "component": "USpaceTab",
  "source": "styles/tab.dart",
  "figmaNode": "972:7985",
  "confidence": "dart-derived",
  "dimensions": {
    "type": [
      "tabIcon",
      "tabGraphic",
      "tab",
      "filter",
      "input"
    ],
    "state": [
      "active",
      "inactive"
    ]
  },
  "variants": [
    {
      "type": "tabIcon",
      "state": "active",
      "bg": "contentPrimary",
      "content": "textInverse",
      "border": null
    },
    {
      "type": "tabIcon",
      "state": "inactive",
      "bg": "actionTertiaryBg",
      "content": "actionTertiaryContent",
      "border": null
    },
    {
      "type": "tabGraphic",
      "state": "active",
      "bg": "contentPrimary",
      "content": "textInverse",
      "border": null
    },
    {
      "type": "tabGraphic",
      "state": "inactive",
      "bg": "actionTertiaryBg",
      "content": "actionTertiaryContent",
      "border": null
    },
    {
      "type": "tab",
      "state": "active",
      "bg": "contentPrimary",
      "content": "textInverse",
      "border": null
    },
    {
      "type": "tab",
      "state": "inactive",
      "bg": "actionTertiaryBg",
      "content": "actionTertiaryContent",
      "border": null
    },
    {
      "type": "filter",
      "state": "active",
      "bg": "actionPrimaryBg",
      "content": "textInverse",
      "border": null,
      "note": "與其餘 type 不同，active 底色用 actionPrimaryBg"
    },
    {
      "type": "filter",
      "state": "inactive",
      "bg": "actionTertiaryBg",
      "content": "actionTertiaryContent",
      "border": null
    },
    {
      "type": "input",
      "state": "active",
      "bg": "actionOutlineBg",
      "content": "actionOutlineContent",
      "border": "borderDivider",
      "note": "input 無 active / inactive 之分，兩者相同"
    },
    {
      "type": "input",
      "state": "inactive",
      "bg": "actionOutlineBg",
      "content": "actionOutlineContent",
      "border": "borderDivider"
    }
  ],
  "layout": {
    "tabHeight": 38,
    "filterHeight": 32,
    "iconSize": 20,
    "graphicSize": 31.5
  }
};

export const text_fieldSpec: ComponentSpec = {
  "component": "USpaceTextField",
  "source": "styles/text_field.dart",
  "figmaNode": "40:3307",
  "confidence": "dart-derived",
  "dimensions": {
    "status": [
      "default",
      "active",
      "typing",
      "complete",
      "incomplete",
      "error",
      "errorActive",
      "disabled",
      "nonEditable"
    ]
  },
  "variants": [
    {
      "status": "default",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "active",
      "bg": "inputBgDefault",
      "border": "inputBorderActive",
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "typing",
      "bg": "inputBgDefault",
      "border": "inputBorderActive",
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "complete",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "incomplete",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "inputTextError"
    },
    {
      "status": "error",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "inputTextError"
    },
    {
      "status": "errorActive",
      "bg": "inputBgDefault",
      "border": "inputBorderError",
      "text": "inputText",
      "hint": "inputTextError"
    },
    {
      "status": "disabled",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputTextDisabled",
      "hint": "textSecondary"
    },
    {
      "status": "nonEditable",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputTextDisabled",
      "hint": "textSecondary"
    }
  ],
  "layout": {
    "height": 48,
    "borderWidth": 2
  }
};

export const text_areaSpec: ComponentSpec = {
  "component": "USpaceTextArea",
  "source": "styles/text_area.dart",
  "figmaNode": "634:8456",
  "confidence": "dart-derived",
  "dimensions": {
    "status": [
      "default",
      "active",
      "typing",
      "complete",
      "incomplete",
      "error",
      "disabled",
      "nonEditable"
    ]
  },
  "variants": [
    {
      "status": "default",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "active",
      "bg": "inputBgDefault",
      "border": "inputBorderActive",
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "typing",
      "bg": "inputBgDefault",
      "border": "inputBorderActive",
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "complete",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "textSecondary"
    },
    {
      "status": "incomplete",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputText",
      "hint": "inputTextError"
    },
    {
      "status": "error",
      "bg": "inputBgDefault",
      "border": "inputBorderActive",
      "text": "inputText",
      "hint": "inputTextError",
      "note": "邊框刻意仍為 inputBorderActive（綠色）而非紅色，與 TextField 不同"
    },
    {
      "status": "disabled",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputTextDisabled",
      "hint": "textDisabled"
    },
    {
      "status": "nonEditable",
      "bg": "inputBgDefault",
      "border": null,
      "text": "inputTextDisabled",
      "hint": "textSecondary"
    }
  ],
  "layout": {
    "height": 144,
    "borderWidth": 2,
    "radius": 20
  }
};

export const listSpec: ComponentSpec = {
  "component": "USpaceListItem",
  "source": "styles/list.dart",
  "confidence": "skeleton",
  "dimensions": {
    "trailing": [
      "none",
      "button",
      "toggle",
      "value",
      "selectable"
    ]
  },
  "variants": []
};

export const modalSpec: ComponentSpec = {
  "component": "USpaceModal",
  "source": "styles/modal.dart",
  "figmaNode": "2237:3211",
  "confidence": "skeleton",
  "dimensions": {
    "category": [
      "listItem",
      "textArea",
      "image",
      "none"
    ]
  },
  "variants": []
};

export const dropdown_menuSpec: ComponentSpec = {
  "component": "USpaceDropdownMenu",
  "source": "styles/dropdown_menu.dart",
  "figmaNode": "2141:11030",
  "dimensions": {
    "status": [
      "default",
      "complete",
      "selecting",
      "incomplete",
      "error",
      "nonEditable"
    ]
  },
  "variants": [
    {
      "status": "default",
      "bg": "inputBgDefault",
      "border": null,
      "label": "inputText",
      "content": "inputTextPlaceholder",
      "icon": "contentTertiary",
      "hint": null,
      "note": "尚未選取，顯示 placeholder"
    },
    {
      "status": "complete",
      "bg": "inputBgDefault",
      "border": null,
      "label": "inputText",
      "content": "inputText",
      "icon": "contentTertiary",
      "hint": null,
      "note": "已選取，顯示選取值"
    },
    {
      "status": "selecting",
      "bg": "inputBgDefault",
      "border": "inputBorderActive",
      "label": "inputText",
      "content": "inputText",
      "icon": "contentTertiary",
      "hint": null,
      "note": "選單展開中，唯一有邊框的狀態"
    },
    {
      "status": "incomplete",
      "bg": "inputBgDefault",
      "border": null,
      "label": "inputText",
      "content": "inputTextPlaceholder",
      "icon": "contentTertiary",
      "hint": "inputTextError",
      "note": "必填未填，維持 placeholder 並顯示紅字提示"
    },
    {
      "status": "error",
      "bg": "inputBgDefault",
      "border": null,
      "label": "inputText",
      "content": "inputText",
      "icon": "contentTertiary",
      "hint": "inputTextError",
      "note": "已選取但值不合法，顯示紅字提示"
    },
    {
      "status": "nonEditable",
      "bg": "inputBgDefault",
      "border": null,
      "label": "inputText",
      "content": "inputTextDisabled",
      "icon": "contentTertiary",
      "hint": null,
      "note": "唯讀，不可展開"
    }
  ],
  "layout": {
    "height": 48,
    "radius": 1000,
    "paddingX": 20,
    "iconSize": 16,
    "labelPaddingX": 8,
    "labelGap": 4,
    "hintGap": 4
  }
};

export const componentSpecs = { button: buttonSpec, toggle: toggleSpec, chip: chipSpec, tab: tabSpec, text_field: text_fieldSpec, text_area: text_areaSpec, list: listSpec, modal: modalSpec, dropdown_menu: dropdown_menuSpec };
