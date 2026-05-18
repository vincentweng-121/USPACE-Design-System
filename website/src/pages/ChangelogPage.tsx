const versions = [
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
          '⚠️ BREAKING：全量同步 Figma Variables（Light + Dark）',
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
      {
        file: 'uspace_colors_extension.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: ['bordersDivider → borderDivider（對齊 Figma JSON 單數命名）'],
      },
      {
        file: 'list.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: ['同步更新引用'],
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2026-04-15',
    breaking: false,
    changes: [
      {
        file: 'uspace_colors_extension.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: [
          '新增 15 個 action Color token',
          '新增 actionCustomizedBorder（LinearGradient, grey600 → grey200）',
          'action dark token 待設計稿確認（v1.2.0）',
        ],
      },
      {
        file: 'button.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: [
          '新建 USpaceButtonLevel enum（accent / charging / primary / secondary / customized）',
          '新建 USpaceButton widget',
          'Customized 使用 Silver Linear 漸層邊框',
        ],
      },
      {
        file: 'typography_extension.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: ['SF Pro 字體樣式補入（sfHeadingL/M 等 12 樣式 + Secondary variants）'],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-04-14',
    breaking: true,
    changes: [
      {
        file: 'uspace_palette.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: [
          '命名修正：lime → neonLime，gray → grey（對齊 Figma JSON）',
          '新增：neonLime900、yellow400、red400、transparentWhite50',
          '修正：blue600 ↔ blue800 編號對調',
          '刪除：red600（#DE1135，Figma 無此值）',
        ],
      },
      {
        file: 'uspace_colors_extension.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: [
          '修正：contentError → red400、textError → red500',
          '新增：contentUC、contentUW、pagePopup',
          'Dark token 待補齊',
        ],
      },
      {
        file: 'typography_extension.dart',
        subVersion: '',
        status: 'PUBLISHED',
        items: [
          '⚠️ BREAKING CHANGE',
          '字體替換：NotoSansTC/Poppins → PingFang TC',
          '命名替換：notoH16/poppinsP14 → headingL/bodyM（語意命名）',
          '新增全部 PingFang TC 樣式 + Secondary variants',
          '前端必讀：所有 context.typography.notoXxx 引用需 find & replace',
        ],
      },
    ],
  },
];

function StatusBadge({ status }: { status: string }) {
  const color = status === 'PUBLISHED' ? '#A7D100' : status === 'DRAFT' ? '#D1AF65' : '#98989F';
  return (
    <span style={{
      fontSize: 11, padding: '2px 8px', borderRadius: 100,
      background: `${color}22`, color, fontWeight: 500,
    }}>
      {status}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 8 }}>Changelog</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 40 }}>
        設計系統版本變更紀錄。版號規則：v主版.次版.修正
      </p>

      <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--border-divider)' }}>
        {versions.map(v => (
          <div key={v.version} style={{ marginBottom: 48, position: 'relative' }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute', left: -31, top: 4,
              width: 12, height: 12, borderRadius: '50%',
              background: v.breaking ? '#C3F400' : 'var(--grey700)',
              border: '2px solid var(--page-primary)',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 20, fontWeight: 500 }}>{v.version}</span>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{v.date}</span>
              {v.breaking && (
                <span style={{
                  fontSize: 11, padding: '2px 8px', borderRadius: 100,
                  background: 'rgba(244,0,0,0.15)', color: '#FF4A20',
                }}>
                  BREAKING
                </span>
              )}
            </div>

            {v.changes.map(c => (
              <div key={c.file} style={{
                marginBottom: 16, padding: 16,
                background: 'var(--page-secondary)', borderRadius: 10,
                border: '1px solid var(--border-divider)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <code style={{ fontSize: 13, color: 'var(--accent)' }}>{c.file}</code>
                  {c.subVersion && <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.subVersion}</span>}
                  <StatusBadge status={c.status} />
                </div>
                <ul style={{ paddingLeft: 16, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
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
