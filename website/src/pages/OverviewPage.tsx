import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Foundations',
    desc: '設計基礎原語：色票、字體、材質效果等核心定義',
    items: [
      { to: '/foundations/color', label: 'Color', ready: true },
      { to: '/foundations/typography', label: 'Typography', ready: true },
      { to: '/foundations/glass', label: 'Glass', ready: true },
      { to: '/foundations/spacing', label: 'Spacing', ready: false },
      { to: '/foundations/elevation', label: 'Elevation', ready: false },
    ],
    accent: '#C3F400',
  },
  {
    title: 'Components',
    desc: '可複用的 UI 元件，包含互動規格與使用指引',
    items: [
      { to: '/components/button', label: 'Button', ready: true },
      { to: '/components/toggle', label: 'Toggle', ready: true },
      { to: '/components/header', label: 'Header', ready: true },
      { to: '/components/list', label: 'List', ready: true },
      { to: '/components/text-field', label: 'Text Field', ready: true },
      { to: '/components/dropdown-menu', label: 'Dropdown Menu', ready: true },
      { to: '/components/tab', label: 'Tab', ready: true },
      { to: '/components/chip', label: 'Chip', ready: true },
    ],
    accent: '#00F158',
  },
  {
    title: 'Resources',
    desc: '版本紀錄、開發進度追蹤',
    items: [
      { to: '/resources/changelog', label: 'Changelog', ready: true },
      { to: '/resources/status', label: 'Status', ready: true },
    ],
    accent: '#A1BDE5',
  },
];

export default function OverviewPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: 56 }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 700, letterSpacing: 2,
          background: 'linear-gradient(135deg, #C3F400 0%, #00F158 50%, #00EEB7 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 12, lineHeight: 1.1,
        }}>
          USPACE<br />Design System
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontWeight: 400, marginTop: 16, lineHeight: 1.7, maxWidth: 520 }}>
          USPACE 的設計語言文件。定義色票、字體、元件規格與互動準則，
          協助工程師與設計師建構一致的產品體驗。
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 56, flexWrap: 'wrap',
      }}>
        {[
          { label: 'Color Tokens', value: '60+', color: '#C3F400' },
          { label: 'Typography Styles', value: '24', color: '#00F158' },
          { label: 'Components', value: '9', color: '#00EEB7' },
        ].map(s => (
          <div key={s.label} style={{
            padding: '16px 24px', borderRadius: 12,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            flex: '1 1 140px', minWidth: 140,
          }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: 56 }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{section.desc}</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 10,
          }}>
            {section.items.map(item => (
              <Link key={item.to} to={item.to} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 10,
                background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
                fontSize: 13,
                color: item.ready ? 'var(--text-primary)' : 'var(--text-tertiary)',
                opacity: item.ready ? 1 : 0.5,
                transition: 'border-color 0.12s',
              }}
              onMouseEnter={e => item.ready && (e.currentTarget.style.borderColor = section.accent)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-divider)')}
              >
                {item.label}
                {!item.ready && (
                  <span style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>SOON</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
