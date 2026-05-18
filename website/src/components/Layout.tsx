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
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 100,
          background: 'var(--grey800)', border: 'none', color: 'var(--text-primary)',
          width: 40, height: 40, borderRadius: 8, cursor: 'pointer',
          display: 'none',
          fontSize: 20,
        }}
        className="mobile-toggle"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <nav
        style={{
          width: 240, minHeight: '100vh', background: 'var(--page-secondary)',
          borderRight: '1px solid var(--border-divider)',
          padding: '32px 0', display: 'flex', flexDirection: 'column',
          position: 'fixed', left: open ? 0 : undefined, top: 0, bottom: 0,
          zIndex: 50, overflowY: 'auto',
        }}
        className={`sidebar ${open ? 'sidebar-open' : ''}`}
      >
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
      <main style={{ flex: 1, marginLeft: 240, padding: '48px 48px 80px' }}>
        <Outlet />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .sidebar { transform: translateX(-100%); transition: transform 0.2s; }
          .sidebar-open { transform: translateX(0) !important; }
          main { margin-left: 0 !important; padding: 24px 16px 80px !important; }
        }
      `}</style>
    </div>
  );
}
