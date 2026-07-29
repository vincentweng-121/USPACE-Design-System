import { Link } from 'react-router-dom';
import { palette } from '../tokens/colors';
import { withAlpha } from '../tokens/util';

const items = [
  { to: '/components/button', label: 'Button', desc: '5 種 Level、2 種 Size 的行動按鈕', ready: true },
  { to: '/components/toggle', label: 'Toggle', desc: '自訂 Toggle Switch 開關', ready: true },
  { to: '/components/floating-button', label: 'Floating Button', desc: '浮動操作按鈕', ready: false },
  { to: '/components/header', label: 'Header', desc: '頁面標題列，3 種 Type', ready: true },
  { to: '/components/list', label: 'List', desc: '列表項目，5 種 trailing type', ready: true },
  { to: '/components/bottom-bar', label: 'Bottom Bar', desc: '底部導航列', ready: false },
  { to: '/components/tab', label: 'Tab', desc: '頁籤、篩選與輸入標籤', ready: true },
  { to: '/components/text-field', label: 'Text Field', desc: '單行文字輸入，9 種狀態', ready: true },
  { to: '/components/dropdown-menu', label: 'Dropdown Menu', desc: '下拉選單，5 種狀態', ready: true },
  { to: '/components/chip', label: 'Chip', desc: '展示標籤，4 Level × 2 Size', ready: true },
  { to: '/components/text-area', label: 'Text Area', desc: '多行文字輸入', ready: true },
  { to: '/components/modal', label: 'Modal', desc: '底部彈出式 Modal', ready: true },
  { to: '/components/divider', label: 'Divider', desc: '分隔線元件', ready: false },
];

export default function ComponentsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 80, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>Components</h1>
      <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 48, lineHeight: 1.6, maxWidth: 560 }}>
        可複用的 UI 元件，包含互動規格與使用指引，協助工程師與設計師建構一致的產品體驗。
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
