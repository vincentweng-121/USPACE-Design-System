import { slugify } from '../utils';

/**
 * 區塊標題。會自動產生 id，供右側錨點目錄（Toc）抓取與跳轉。
 */
export default function SectionTitle({ children }: { children: React.ReactNode }) {
  const text = typeof children === 'string' ? children : String(children);

  return (
    <h2
      id={slugify(text)}
      className="heading-lg"
      style={{
        color: 'var(--text-primary)',
        marginBottom: 20,
        scrollMarginTop: 'calc(var(--topbar-h) + 24px)',
      }}
    >
      {children}
    </h2>
  );
}
