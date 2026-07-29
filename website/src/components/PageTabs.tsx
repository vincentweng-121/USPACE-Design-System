import { useState } from 'react';

export type TabKey = 'design' | 'develop';

export function usePageTab(initial: TabKey = 'design') {
  return useState<TabKey>(initial);
}

/**
 * 元件頁的 Design / Develop 分頁。
 *
 * 樣式改為底線式（參考 Porsche Design System 元件頁的分頁列），
 * 取代原本佔滿整列的實心色塊——文件站介面不使用品牌色。
 */
export default function PageTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string; hint: string }[] = [
    { key: 'design', label: 'Design', hint: '規格、用法與無障礙' },
    { key: 'develop', label: 'Develop', hint: '程式碼範例與 API' },
  ];

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: 4,
        borderBottom: '1px solid var(--border-divider)',
        marginBottom: 56,
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
              position: 'relative',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              font: 'inherit',
              fontSize: 15,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'color 0.12s',
            }}
          >
            {t.label}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: -1,
                height: 2,
                borderRadius: 2,
                background: isActive ? 'var(--nav-marker)' : 'transparent',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
