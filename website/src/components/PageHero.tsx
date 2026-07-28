import { findNav } from '../nav';
import { useLocation } from 'react-router-dom';

/**
 * 頁首：分組標籤 + 標題 + 導言。
 * 結構參考 Porsche Design System 的頁面開頭。
 */
export default function PageHero({
  title,
  lead,
  meta,
}: {
  title: string;
  lead?: React.ReactNode;
  /** 右下角補充資訊，例如來源檔案或 Figma node */
  meta?: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const group = findNav(pathname)?.group.label;

  return (
    <header style={{ marginBottom: 48 }}>
      {group && (
        <div
          className="text-sm"
          style={{
            color: 'var(--text-tertiary)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {group}
        </div>
      )}

      <h1 className="display-lg" style={{ marginBottom: lead ? 20 : 0 }}>
        {title}
      </h1>

      {lead && (
        <p className="text-lg text-muted" style={{ maxWidth: '62ch' }}>
          {lead}
        </p>
      )}

      {meta && (
        <div
          className="text-sm"
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--border-divider)',
            color: 'var(--text-tertiary)',
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {meta}
        </div>
      )}
    </header>
  );
}
