import { Link } from 'react-router-dom';

const cards = [
  { to: '/colors', title: 'Colors', desc: '色票系統與語意 Token', accent: '#C3F400' },
  { to: '/typography', title: 'Typography', desc: 'PingFang TC + SF Pro 字體規格', accent: '#00F158' },
  { to: '/components', title: 'Components', desc: 'Button / Toggle / Header / List / Glass', accent: '#00EEB7' },
  { to: '/changelog', title: 'Changelog', desc: '設計版本變更紀錄', accent: '#A1BDE5' },
  { to: '/status', title: 'Status', desc: '各元件開發進度', accent: '#D1AF65' },
];

export default function HomePage() {
  return (
    <div>
      <div style={{ marginBottom: 64 }}>
        <h1 style={{
          fontSize: 48, fontWeight: 700, letterSpacing: 2,
          background: 'linear-gradient(135deg, #C3F400, #00F158)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 16,
        }}>
          USPACE
        </h1>
        <p style={{ fontSize: 22, color: 'var(--text-secondary)', fontWeight: 400 }}>
          Design System
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginTop: 12, maxWidth: 480, lineHeight: 1.6 }}>
          USPACE 設計系統文件。提供色票、字體、元件規格與變更紀錄，
          協助工程師與設計師保持一致的視覺語言。
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260, 1fr))',
        gap: 16,
      }}>
        {cards.map(({ to, title, desc, accent }) => (
          <Link key={to} to={to} style={{
            display: 'block', padding: 24,
            background: 'var(--page-secondary)', borderRadius: 12,
            border: '1px solid var(--border-divider)',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-divider)')}
          >
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: accent, marginBottom: 16,
            }} />
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
