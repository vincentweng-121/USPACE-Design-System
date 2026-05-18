import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/colors', label: 'Colors' },
  { to: '/typography', label: 'Typography' },
  { to: '/components', label: 'Components' },
  { to: '/changelog', label: 'Changelog' },
  { to: '/status', label: 'Status' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mobile-toggle"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div style={{ padding: '0 24px', marginBottom: 40 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', letterSpacing: 1 }}>
            USPACE
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
            Design System
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 24px',
                fontSize: 14,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(195,244,0,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                transition: 'all 0.15s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div style={{ marginTop: 'auto', padding: '24px', fontSize: 11, color: 'var(--text-tertiary)' }}>
          v2.0.0
        </div>
      </nav>

      {/* Main */}
      <main className="main-content">
        <Outlet />
      </main>

      <style>{`
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: var(--page-secondary);
          border-right: 1px solid var(--border-divider);
          padding: 32px 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          overflow-y: auto;
        }
        .main-content {
          flex: 1;
          margin-left: 240px;
          padding: 48px 48px 80px;
          min-width: 0;
          overflow-x: hidden;
        }
        .mobile-toggle {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 100;
          background: var(--grey800);
          border: none;
          color: var(--text-primary);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 20px;
        }
        .sidebar-backdrop {
          display: none;
        }

        @media (max-width: 1024px) {
          .main-content {
            padding: 48px 32px 80px;
          }
        }

        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.25s ease;
          }
          .sidebar-open {
            transform: translateX(0);
          }
          .sidebar-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 40;
            background: rgba(0,0,0,0.5);
          }
          .main-content {
            margin-left: 0;
            padding: 72px 16px 80px;
          }
        }
      `}</style>
    </div>
  );
}
