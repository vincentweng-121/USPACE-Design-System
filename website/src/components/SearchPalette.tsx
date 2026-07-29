import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allNavItems } from '../nav';

/**
 * Cmd/Ctrl + K 命令面板。
 *
 * 靜態站沒有後端，索引直接來自 nav.ts —— 涵蓋所有頁面的標題、
 * 分組與關鍵字（含中文）。全文檢索需要建置期產生內容索引，尚未實作。
 *
 * 由呼叫端以條件式渲染控制開關（開啟時重新掛載），
 * 因此內部狀態不需要 effect 重置。
 */
export default function SearchPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = allNavItems.filter((i) => !i.soon);
    if (!q) return pool.slice(0, 8);
    return pool
      .map((item) => {
        const label = item.label.toLowerCase();
        const haystack = `${label} ${item.group.toLowerCase()} ${item.keywords ?? ''}`;
        if (!haystack.includes(q)) return null;
        // 標題開頭命中 > 標題內命中 > 關鍵字命中
        const score = label.startsWith(q) ? 0 : label.includes(q) ? 1 : 2;
        return { item, score };
      })
      .filter((r): r is { item: (typeof pool)[number]; score: number } => r !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.item);
  }, [query]);

  const go = (to: string) => {
    navigate(to);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return onClose();
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (c + 1) % results.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % results.length);
    }
    if (e.key === 'Enter' && results[cursor]) go(results[cursor].to);
  };

  return (
    <div className="search-backdrop" onClick={onClose} role="presentation">
      <div
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="搜尋"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="search-input-row">
          <SearchIcon />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="搜尋元件、樣式、指南…"
            aria-label="搜尋"
          />
          <kbd>ESC</kbd>
        </div>

        {results.length === 0 ? (
          <div className="search-empty">找不到「{query}」相關的頁面</div>
        ) : (
          <ul className="search-results">
            {results.map((item, i) => (
              <li key={item.to}>
                <button
                  data-active={i === cursor || undefined}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(item.to)}
                >
                  <span className="search-result-label">{item.label}</span>
                  <span className="search-result-group">{item.group}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 移動
          </span>
          <span>
            <kbd>↵</kbd> 開啟
          </span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12L15.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
