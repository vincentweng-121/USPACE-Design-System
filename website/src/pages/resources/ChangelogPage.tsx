import PageHero from '../../components/PageHero';
const versions = [
  {
    version: 'v2.8.2',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'uspace_palette.dart',
        subVersion: 'v1.3.0',
        status: 'PUBLISHED',
        items: [
          '新增 neonLime700 (#B4E002)',
        ],
      },
      {
        file: 'uspace_colors_extension.dart',
        subVersion: 'v2.2.0',
        status: 'PUBLISHED',
        items: [
          '新增 4 個漸層：silverLinear / limeLinear / bottomBarGray1B / bottomBarGray2B',
          'actionCustomizedBorder 改為 silverLinear 的別名',
        ],
      },
    ],
  },
  {
    version: 'v2.8.1',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'uspace_palette.dart',
        subVersion: 'v1.2.0',
        status: 'PUBLISHED',
        items: [
          '新增 transparentWhite5 (White @5%)',
        ],
      },
      {
        file: 'uspace_colors_extension.dart',
        subVersion: 'v2.1.0',
        status: 'PUBLISHED',
        items: [
          'Dark pageMask: transparentBlack40 → transparentWhite5',
          'Dark actionFabContent: white → grey500',
        ],
      },
    ],
  },
  {
    version: 'v2.8.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'modal.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceModal：底部彈出式 Modal（4 categories）',
          'Categories: List Item / Text Area / Image / Null',
          'pagePopup + backdrop blur 15px + shadow',
          '含 USpaceModalListItem, USpaceModalImageSection helpers',
          '來源：Figma node 2237:3211',
        ],
      },
    ],
  },
  {
    version: 'v2.7.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'text_area.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceTextArea：多行文字輸入元件（8 states）',
          'Height 144px, borderRadius 20px, padding 20/16',
          'Error 邊框為 inputBorderActive（綠色），非紅色',
          '來源：Figma node 634:8456',
        ],
      },
    ],
  },
  {
    version: 'v2.6.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'spacing_extension.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceSpacing：margin (20px) + 11 spacer tokens (2-56px)',
          '來源：Figma Variables Mode 1.tokens.json',
        ],
      },
      {
        file: 'radius_extension.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceRadius：small (8) / medium (20) / full (1000)',
          '來源：Figma Variables Mode 1.tokens.json (Number group)',
        ],
      },
    ],
  },
  {
    version: 'v2.5.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'toggle.dart',
        subVersion: 'v2.0.0',
        status: 'PUBLISHED',
        items: [
          '重寫 USpaceToggle：自訂實作取代 Flutter Switch',
          'Track: 64×24, rounded=27, padding=2',
          'Thumb: 34×20 pill shape (非圓形)',
          'ON: actionPrimaryContentAccent, OFF: actionPrimaryContent',
          'Disable: ON → opacity 0.25, OFF → actionDisabledBg',
        ],
      },
    ],
  },
  {
    version: 'v2.4.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'chip.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceChip widget（4 levels × 2 sizes）',
          'Levels: Accent / Primary / Secondary / Outline',
          'Outline: neonLime200 border + gradient text (ShaderMask)',
          'Small size: 10px/14px Semibold (displayXXS inline)',
        ],
      },
    ],
  },
  {
    version: 'v2.3.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'tab.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceTab widget（5 types × 2 states）',
          'Types: Tab_icon / Tab_Graphic / Tab / Filter / Input',
          'Tab/TabIcon/TabGraphic: actionTertiaryBg → contentPrimary (active)',
          'Filter: actionTertiaryBg → actionPrimaryBg (active)',
          'Input: actionOutlineBg + borderDivider + Close icon',
        ],
      },
    ],
  },
  {
    version: 'v2.2.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'dropdown_menu.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceDropdownMenu widget（5 states）',
          'Status: Default / Complete / Selecting / Incomplete / Error',
          '下拉面板 borderRadius 20px，可捲動，scrollbar 4px',
          'Token: inputBgDefault / inputText / inputTextPlaceholder / inputTextError / textSecondary / contentSecondary',
        ],
      },
    ],
  },
  {
    version: 'v2.1.0',
    date: '2026-05-19',
    breaking: false,
    changes: [
      {
        file: 'text_field.dart',
        subVersion: 'v1.0.0',
        status: 'PUBLISHED',
        items: [
          '新增 USpaceTextField widget（9 states）',
          'Status: Default / Active / Typing / Complete / Disabled / Error / Error-Active / Incomplete / Non-editable',
          '支援 trailing USpaceButton (Small/Primary)',
          'Token: inputBgDefault / inputBorderActive / inputBorderError / inputText / inputTextPlaceholder / inputTextDisabled / inputTextError',
          'Cursor: contentAccent, 2px × 24px',
        ],
      },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2026-05-12',
    breaking: true,
    changes: [
      {
        file: 'uspace_palette.dart',
        subVersion: 'v1.1.0',
        status: 'DRAFT',
        items: [
          'hex 修正：neonLime800、grey100',
          '新增 red300 + 7 個透明度色票',
        ],
      },
      {
        file: 'uspace_colors_extension.dart',
        subVersion: 'v2.0.0',
        status: 'DRAFT',
        items: [
          'BREAKING：全量同步 Figma Variables（Light + Dark）',
          'Dark action tokens 正式補齊',
          '移除 action Text tokens（Figma 已無對應）',
          '新增 Input/Chip/Project/FAB/Outline/Graphic 等 31 個新 token',
        ],
      },
    ],
  },
  {
    version: 'v1.1.1',
    date: '2026-04-17',
    breaking: false,
    changes: [
      { file: 'uspace_colors_extension.dart', subVersion: '', status: 'PUBLISHED', items: ['bordersDivider → borderDivider（對齊 Figma JSON 單數命名）'] },
      { file: 'list.dart', subVersion: '', status: 'PUBLISHED', items: ['同步更新引用'] },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2026-04-15',
    breaking: false,
    changes: [
      { file: 'uspace_colors_extension.dart', subVersion: '', status: 'PUBLISHED', items: ['新增 15 個 action Color token', '新增 actionCustomizedBorder（LinearGradient, grey600 → grey200）', 'action dark token 待設計稿確認（v1.2.0）'] },
      { file: 'button.dart', subVersion: '', status: 'PUBLISHED', items: ['新建 USpaceButtonLevel enum（accent / charging / primary / secondary / customized）', '新建 USpaceButton widget', 'Customized 使用 Silver Linear 漸層邊框'] },
      { file: 'typography_extension.dart', subVersion: '', status: 'PUBLISHED', items: ['SF Pro 字體樣式補入（sfHeadingL/M 等 12 樣式 + Secondary variants）'] },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-04-14',
    breaking: true,
    changes: [
      { file: 'uspace_palette.dart', subVersion: '', status: 'PUBLISHED', items: ['命名修正：lime → neonLime，gray → grey（對齊 Figma JSON）', '新增：neonLime900、yellow400、red400、transparentWhite50', '修正：blue600 ↔ blue800 編號對調', '刪除：red600（#DE1135，Figma 無此值）'] },
      { file: 'uspace_colors_extension.dart', subVersion: '', status: 'PUBLISHED', items: ['修正：contentError → red400、textError → red500', '新增：contentUC、contentUW、pagePopup', 'Dark token 待補齊'] },
      { file: 'typography_extension.dart', subVersion: '', status: 'PUBLISHED', items: ['BREAKING CHANGE', '字體替換：NotoSansTC/Poppins → PingFang TC', '命名替換：notoH16/poppinsP14 → headingL/bodyM（語意命名）', '新增全部 PingFang TC 樣式 + Secondary variants', '前端必讀：所有 context.typography.notoXxx 引用需 find & replace'] },
    ],
  },
];

function StatusBadge({ status }: { status: string }) {
  const color = status === 'PUBLISHED' ? '#A7D100' : status === 'DRAFT' ? '#D1AF65' : '#98989F';
  return (
    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: `${color}22`, color, fontWeight: 500 }}>
      {status}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div>
      <PageHero
        title="Changelog"
        lead={<>設計系統版本變更紀錄。 版號規則：v主版.次版.修正。主版=設計語言重大改版，次版=新增 token 或色系，修正=修正既有 token 數值。</>}
      />

      <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--border-divider)' }}>
        {versions.map(v => (
          <div key={v.version} style={{ marginBottom: 56, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: -31, top: 4,
              width: 12, height: 12, borderRadius: '50%',
              background: v.breaking ? '#C3F400' : 'var(--grey700)',
              border: '2px solid var(--page-primary)',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 500 }}>{v.version}</span>
              <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>{v.date}</span>
              {v.breaking && (
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: 'rgba(244,0,0,0.15)', color: '#FF4A20' }}>
                  BREAKING
                </span>
              )}
            </div>
            {v.changes.map(c => (
              <div key={c.file} style={{
                marginBottom: 12, padding: 16,
                background: 'var(--page-secondary)', borderRadius: 10,
                border: '1px solid var(--border-divider)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <code>{c.file}</code>
                  {c.subVersion && <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.subVersion}</span>}
                  <StatusBadge status={c.status} />
                </div>
                <ul style={{ paddingLeft: 16, fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {c.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
