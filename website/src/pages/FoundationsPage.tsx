import { Link } from 'react-router-dom';
import { palette } from '../tokens/colors';
import { withAlpha } from '../tokens/util';

const items = [
  { to: '/foundations/color', label: 'Color', desc: '色票系統與語意 Token', ready: true },
  { to: '/foundations/typography', label: 'Typography', desc: '字型系統與文字樣式', ready: true },
  { to: '/foundations/glass', label: 'Glass / Materials', desc: '毛玻璃與材質效果', ready: true },
  { to: '/foundations/spacing', label: 'Spacing & Radius', desc: '間距與圓角 Token', ready: true },
  { to: '/foundations/elevation', label: 'Elevation', desc: '陰影與層級系統', ready: false },
  { to: '/foundations/iconography', label: 'Iconography', desc: '圖示系統', ready: false },
];

export default function FoundationsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 80, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Foundations</h1>
      <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 48, lineHeight: 1.6, maxWidth: 560 }}>
        設計基礎原語：色票、字體、材質效果等核心定義，建構一致產品體驗的基石。
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 16,
      }}>
        {items.map(item => (
          <Link key={item.to} to={item.to} style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '24px', borderRadius: 16, minHeight: 140,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            textDecoration: 'none',
            opacity: item.ready ? 1 : 0.5,
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            if (item.ready) {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = `0 2px 12px ${withAlpha(palette.neonLime600, 0.1)}`;
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-divider)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
            {!item.ready && (
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Coming Soon
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
