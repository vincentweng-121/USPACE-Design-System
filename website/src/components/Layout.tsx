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
      { to: '/foundations/spacing', label: 'Spacing' },
      { to: '/foundations/radius', label: 'Radius' },
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
  '/foundations/spacing', '/foundations/radius', '/foundations/elevation', '/foundations/iconography',
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
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', letterSpacing: 1 }}>
            USPACE
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
            Design System
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {nav.map((section, si) => (
            <div key={si} style={{ marginBottom: section.title ? 8 : 0 }}>
              {section.title && (
                <div style={{
                  padding: '16px 20px 6px',
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
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '7px 20px',
                      fontSize: 13,
                      color: isActive ? 'var(--accent)' : isSoon ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                      background: isActive ? 'rgba(195,244,0,0.08)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                      transition: 'all 0.12s',
                      opacity: isSoon ? 0.5 : 1,
                    }}
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

        <div style={{ padding: '16px 20px', fontSize: 11, color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-divider)' }}>
          v2.1.0
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <style>{`
        .sidebar {
          width: 220px;
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
        .main-content {
          flex: 1;
          margin-left: 220px;
          padding: 48px 48px 80px;
          min-width: 0;
          overflow-x: hidden;
          max-width: 960px;
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
          .main-content { padding: 48px 32px 80px; }
        }
        @media (max-width: 768px) {
          .mobile-toggle { display: block; }
          .sidebar { transform: translateX(-100%); transition: transform 0.25s ease; }
          .sidebar-open { transform: translateX(0); }
          .sidebar-backdrop {
            display: block; position: fixed; inset: 0;
            z-index: 40; background: rgba(0,0,0,0.5);
          }
          .main-content { margin-left: 0; padding: 72px 16px 80px; }
        }
      `}</style>
    </div>
  );
}
