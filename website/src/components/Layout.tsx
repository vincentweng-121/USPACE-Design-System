import { useCallback, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { nav } from '../nav';
import { version } from '../tokens/version';
import SearchPalette from './SearchPalette';
import Toc from './Toc';
import '../styles/layout.css';

type ThemeMode = 'light' | 'dark' | 'auto';

const REPO_URL = 'https://github.com/vincentweng-121/USPACE-Design-System';

export default function Layout() {
  const location = useLocation();

  // 抽屜開闔狀態會記住，除非使用者主動關閉否則持續存在。
  // 首次造訪首頁時預設收起（讓影片首屏完整呈現），其餘頁面預設展開。
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem('sidebar');
    if (stored !== null) return stored === 'open';
    return window.location.hash.replace('#', '') !== '/';
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [mode, setMode] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) || 'auto'
  );

  // 使用者手動收合過的分組；沒紀錄的依目前路徑決定展開與否
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // 首頁：影片滿版首屏，側欄收起、頂列浮在影片上
  const isHome = location.pathname === '/';
  const [pastHero, setPastHero] = useState(false);

  // ── 主題（light / dark / auto）──
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = mode === 'dark' || (mode === 'auto' && media.matches);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    };
    apply();
    localStorage.setItem('theme', mode);
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [mode]);

  // ── Cmd / Ctrl + K ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // 換頁時捲回頂端（收合側欄改由側欄自身的 click 處理，避免在 effect 內 setState）
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // 抽屜狀態同步到 :root，版面位移由 CSS 處理
  useEffect(() => {
    document.documentElement.setAttribute('data-sidebar', sidebarOpen ? 'open' : 'closed');
    localStorage.setItem('sidebar', sidebarOpen ? 'open' : 'closed');
  }, [sidebarOpen]);

  // 首頁模式交給 CSS 處理版面差異
  useEffect(() => {
    const root = document.documentElement;
    if (isHome) root.setAttribute('data-home', '');
    else root.removeAttribute('data-home');
    return () => root.removeAttribute('data-home');
  }, [isHome]);

  // 捲過首屏後頂列恢復實色。初始為 false（載入時必在頂端），
  // 因此不需要在 effect 內先呼叫一次。
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.72);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const isOpen = useCallback(
    (key: string) => {
      if (key in collapsed) return !collapsed[key];
      const group = nav.find((g) => g.key === key);
      return group?.items.some((i) => location.pathname.startsWith(i.to)) ?? false;
    },
    [collapsed, location.pathname]
  );

  const cycleTheme = () =>
    setMode((m) => (m === 'light' ? 'dark' : m === 'dark' ? 'auto' : 'light'));

  const themeLabel =
    mode === 'auto' ? '跟隨系統' : mode === 'dark' ? '深色' : '淺色';

  return (
    <>
      <header className="topbar" data-floating={(isHome && !pastHero) || undefined}>
        <button
          className="icon-btn hamburger"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? '關閉導覽' : '開啟導覽'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <NavLink to="/" className="topbar-brand">
          <strong>USPACE</strong>
          <span>Design System</span>
        </NavLink>

        <div className="topbar-spacer" />

        <button className="search-trigger" onClick={() => setSearchOpen(true)}>
          <SearchIcon />
          <span className="label">搜尋</span>
          <kbd>⌘K</kbd>
        </button>

        <span className="topbar-version">v{version}</span>

        <button
          className="icon-btn"
          onClick={cycleTheme}
          aria-label={`主題：${themeLabel}`}
          title={`主題：${themeLabel}`}
        >
          {mode === 'light' ? <SunIcon /> : mode === 'dark' ? <MoonIcon /> : <AutoIcon />}
        </button>

        <a
          className="icon-btn"
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub 原始碼"
        >
          <GithubIcon />
        </a>
      </header>

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      )}


      <aside className="sidebar" data-open={sidebarOpen || undefined}>
        {nav.map((group) => {
          const open = isOpen(group.key);
          return (
            <div className="nav-group" key={group.key}>
              <button
                className="nav-group-header"
                data-open={open || undefined}
                aria-expanded={open}
                onClick={() => setCollapsed((c) => ({ ...c, [group.key]: open }))}
              >
                {group.label}
                <ChevronIcon />
              </button>

              {open && (
                <ul className="nav-list">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      {item.soon ? (
                        <span className="nav-link" data-soon>
                          {item.label}
                          <span className="badge-soon">SOON</span>
                        </span>
                      ) : (
                        <NavLink
                          to={item.to}
                          className="nav-link"
                          // 窄螢幕的抽屜是覆蓋式，導覽後要讓開內容
                          onClick={() => {
                            if (window.innerWidth <= 900) setSidebarOpen(false);
                          }}
                          // 完全比對：/developing 不應在 /developing/flutter 時亮起
                          data-active={location.pathname === item.to || undefined}
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </aside>

      <main className="main">
        <div className="content">
          <Outlet />
        </div>
      </main>

      <Toc />

      {searchOpen && <SearchPalette onClose={() => setSearchOpen(false)} />}
    </>
  );
}

/* ── Icons ──────────────────────────────────────────────── */

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
};

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path d="M2.5 5h13M2.5 9h13M2.5 13h13" {...stroke} />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path d="M4 4l10 10M14 4L4 14" {...stroke} />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d="M5 3l4 4-4 4" {...stroke} />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <circle cx="8" cy="8" r="5.25" {...stroke} />
      <path d="M12 12l3.5 3.5" {...stroke} />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <circle cx="9" cy="9" r="3.5" {...stroke} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <line key={d} x1="9" y1="1.5" x2="9" y2="3" transform={`rotate(${d} 9 9)`} {...stroke} />
      ))}
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path d="M15.1 10.4A6.5 6.5 0 0 1 7.6 2.9 6.5 6.5 0 1 0 15.1 10.4Z" {...stroke} />
    </svg>
  );
}
function AutoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <circle cx="9" cy="9" r="6.25" {...stroke} />
      <path d="M9 2.75v12.5a6.25 6.25 0 0 0 0-12.5Z" fill="currentColor" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38l-.01-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
