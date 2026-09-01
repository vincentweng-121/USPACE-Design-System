import { useEffect, useState } from 'react';

export type TabKey = 'design' | 'develop';

export function usePageTab(initial: TabKey = 'design') {
  return useState<TabKey>(initial);
}

/** 捲動多少距離內完成收縮 */
const SHRINK_DISTANCE = 220;

const mix = (from: number, to: number, p: number) => from + (to - from) * p;

/**
 * 元件頁的 Design / Develop 分頁。
 *
 * 會吸附在頂列下方，並隨捲動幅度連續收縮視覺層級
 * （高度、寬度、字級、圓角同步內插），而不是在某個門檻瞬間切換。
 * 參考 Material 3 文件站元件頁的分頁列行為。
 */
export default function PageTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  // 0 = 展開（頁面頂端）、1 = 完全收縮
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setP(Math.min(1, Math.max(0, window.scrollY / SHRINK_DISTANCE)))
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const tabs: { key: TabKey; label: string; hint: string }[] = [
    { key: 'design', label: 'Design', hint: '規格、用法與無障礙' },
    { key: 'develop', label: 'Develop', hint: '程式碼範例與 API' },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: `calc(var(--topbar-h) + ${mix(16, 8, p)}px)`,
        zIndex: 40,
        marginBottom: mix(72, 56, p),
        display: 'flex',
        justifyContent: 'center',
        // 收縮時預留的位移，避免內容在吸附瞬間跳動
        paddingTop: mix(0, 4, p),
      }}
    >
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 4,
          width: `${mix(100, 66, p)}%`,
          minWidth: 260,
          padding: mix(8, 5, p),
          borderRadius: 1000,
          background: 'var(--surface-sunken)',
          boxShadow: 'var(--shadow-tabs)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              title={t.hint}
              onClick={() => onChange(t.key)}
              style={{
                flex: 1,
                height: mix(56, 38, p),
                border: 'none',
                borderRadius: 1000,
                background: isActive ? 'var(--page-primary)' : 'transparent',
                boxShadow: isActive ? 'var(--shadow-tabs)' : 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                font: 'inherit',
                fontSize: mix(17, 14, p),
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
