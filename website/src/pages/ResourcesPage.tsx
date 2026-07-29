import { Link } from 'react-router-dom';
import { palette } from '../tokens/colors';
import { withAlpha } from '../tokens/util';

const items = [
  { to: '/resources/changelog', label: 'Changelog', desc: '版本更新紀錄與變更歷史' },
  { to: '/resources/status', label: 'Status', desc: '各元件開發進度追蹤' },
];

export default function ResourcesPage() {
  return (
    <div>
      <h1 style={{ fontSize: 80, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Resources</h1>
      <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 48, lineHeight: 1.6, maxWidth: 560 }}>
        版本紀錄、開發進度追蹤與相關資源。
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 16,
      }}>
        {items.map(item => (
          <Link key={item.to} to={item.to} style={{
            display: 'flex', flexDirection: 'column',
            padding: '24px', borderRadius: 16, minHeight: 140,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            textDecoration: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = `0 2px 12px ${withAlpha(palette.neonLime600, 0.1)}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-divider)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {item.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
