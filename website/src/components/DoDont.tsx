import { ThemedImage } from './spec';
/**
 * Usage 區塊的 Do / Don't 清單。
 * 對應 Porsche Design System 元件頁 Usage 分頁的結構。
 */
export default function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      <List kind="do" title="Do" items={dos} />
      <List kind="dont" title="Don't" items={donts} />
    </div>
  );
}

function List({ kind, title, items }: { kind: 'do' | 'dont'; title: string; items: string[] }) {
  const isDo = kind === 'do';
  const color = isDo ? 'var(--positive)' : 'var(--negative)';
  const bg = isDo ? 'var(--positive-bg)' : 'var(--negative-bg)';

  return (
    <section
      style={{
        boxShadow: 'var(--shadow-card)',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'var(--page-secondary)',
      }}
    >
      <h3
        className="heading-sm"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          background: bg,
          color,
        }}
      >
        {isDo ? <CheckIcon /> : <CrossIcon />}
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: '4px 0' }}>
        {items.map((text, i) => (
          <li
            key={i}
            className="text-md"
            style={{
              display: 'flex',
              gap: 10,
              padding: '10px 16px',
              color: 'var(--text-secondary)',
            }}
          >
            <span aria-hidden style={{ color, flexShrink: 0, lineHeight: 1.7 }}>
              {isDo ? '·' : '·'}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Usage 區塊的 Do / Don't 圖例：截圖 + 說明 ──
export type DoDontExample = {
  kind: 'do' | 'dont';
  /** 不含 -light / -dark 與副檔名的基底名稱 */
  image: string;
  alt: string;
  caption: string;
};

export function DoDontExamples({ items }: { items: DoDontExample[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      {items.map((item, i) => (
        <ExampleCard key={i} {...item} />
      ))}
    </div>
  );
}

function ExampleCard({ kind, image, alt, caption }: DoDontExample) {
  const isDo = kind === 'do';
  const color = isDo ? 'var(--positive)' : 'var(--negative)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          background: 'var(--page-secondary)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* display 交給 .theme-*-only 決定，這裡不設，否則會蓋掉主題切換 */}
        <ThemedImage image={image} alt={alt} style={{ width: '100%', height: 'auto' }} />
        {/* 是 Do 還是 Don't 由圖上的記號表達，不再另外開一個說明區塊 */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            color,
            display: 'flex',
          }}
        >
          {isDo ? <CheckIcon size={32} /> : <CrossIcon size={32} />}
        </span>
      </div>
      <p className="text-md text-muted" style={{ margin: 0 }}>
        {caption}
      </p>
    </div>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 8.2l2.1 2.1L11 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CrossIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
