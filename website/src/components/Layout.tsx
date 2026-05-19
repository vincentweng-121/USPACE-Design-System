import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface NavSection {
  title: string;
  items: { to: string; label: string }[];
}

const nav: NavSection[] = [
  {
    title: '',
    items: [{ to: '/', label: 'Overview' }],
  },
  {
    title: 'Foundations',
    items: [
      { to: '/foundations/color', label: 'Color' },
      { to: '/foundations/typography', label: 'Typography' },
      { to: '/foundations/glass', label: 'Glass / Materials' },
      { to: '/foundations/spacing', label: 'Spacing & Radius' },
      { to: '/foundations/elevation', label: 'Elevation' },
      { to: '/foundations/iconography', label: 'Iconography' },
    ],
  },
  {
    title: 'Components',
    items: [
      { to: '/components/button', label: 'Button' },
      { to: '/components/toggle', label: 'Toggle' },
      { to: '/components/floating-button', label: 'Floating Button' },
      { to: '/components/header', label: 'Header' },
      { to: '/components/list', label: 'List' },
      { to: '/components/bottom-bar', label: 'Bottom Bar' },
      { to: '/components/tab', label: 'Tab' },
      { to: '/components/text-field', label: 'Text Field' },
      { to: '/components/dropdown-menu', label: 'Dropdown Menu' },
      { to: '/components/chip', label: 'Chip' },
      { to: '/components/text-area', label: 'Text Area' },
      { to: '/components/divider', label: 'Divider' },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { to: '/patterns', label: 'Overview' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { to: '/resources/changelog', label: 'Changelog' },
      { to: '/resources/status', label: 'Status' },
    ],
  },
];

const comingSoon = new Set([
  '/foundations/elevation', '/foundations/iconography',
  '/components/floating-button', '/components/bottom-bar',
  '/components/divider',
  '/patterns',
]);

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <button onClick={() => setOpen(!open)} className="mobile-toggle">
        {open ? '✕' : '☰'}
      </button>

      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} />}

      <nav className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', letterSpacing: 1 }}>
            USPACE
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
            Design System
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {nav.map((section, si) => (
            <div key={si} style={{ marginBottom: section.title ? 8 : 0 }}>
              {section.title && (
                <div style={{
                  padding: '16px 24px 6px',
                  fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)',
                  textTransform: 'uppercase', letterSpacing: 0.8,
                }}>
                  {section.title}
                </div>
              )}
              {section.items.map(({ to, label }) => {
                const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
                const isSoon = comingSoon.has(to);
                return (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="nav-item"
                    data-active={isActive || undefined}
                    data-soon={isSoon || undefined}
                  >
                    {label}
                    {isSoon && (
                      <span style={{
                        fontSize: 9, padding: '1px 6px', borderRadius: 100,
                        background: 'var(--grey100)', color: 'var(--text-tertiary)',
                      }}>
                        SOON
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 24px', fontSize: 11, color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-divider)' }}>
          v2.7.0
        </div>
      </nav>

      <main className="main-content">
        <div className="main-inner">
          <Outlet />
        </div>
      </main>

      <style>{`
        .sidebar {
          width: 260px;
          min-height: 100vh;
          background: var(--page-secondary);
          border-right: 1px solid var(--border-divider);
          padding: 24px 0 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; bottom: 0; left: 0;
          z-index: 50;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 24px;
          font-size: 14px;
          color: var(--text-secondary);
          background: transparent;
          border-left: 3px solid transparent;
          transition: all 0.12s;
          text-decoration: none;
        }
        .nav-item:hover {
          background: rgba(195,244,0,0.18);
          color: var(--text-primary);
        }
        .nav-item[data-active] {
          color: var(--text-primary);
          background: var(--section-accent);
          border-left-color: var(--accent);
          font-weight: 500;
        }
        .nav-item[data-soon] {
          opacity: 0.5;
          color: var(--text-tertiary);
        }
        .nav-item[data-soon]:hover {
          color: var(--text-tertiary);
          background: transparent;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          min-width: 0;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
        }
        .main-inner {
          width: 100%;
          max-width: 860px;
          padding: 48px 48px 80px;
        }

        .mobile-toggle {
          display: none;
          position: fixed;
          top: 16px; left: 16px; z-index: 100;
          background: var(--page-secondary);
          border: 1px solid var(--border-divider); color: var(--text-primary);
          width: 40px; height: 40px; border-radius: 8px;
          cursor: pointer; font-size: 20px;
        }
        .sidebar-backdrop { display: none; }

        @media (max-width: 1024px) {
          .main-inner { padding: 48px 32px 80px; }
        }
        @media (max-width: 768px) {
          .mobile-toggle { display: block; }
          .sidebar { transform: translateX(-100%); transition: transform 0.25s ease; }
          .sidebar-open { transform: translateX(0); }
          .sidebar-backdrop {
            display: block; position: fixed; inset: 0;
            z-index: 40; background: rgba(0,0,0,0.5);
          }
          .main-content { margin-left: 0; }
          .main-inner { padding: 72px 16px 80px; }
        }
      `}</style>
    </div>
  );
}
