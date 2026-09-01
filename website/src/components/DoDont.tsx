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
        // 卡片之間留寬一點；圖片跟著欄寬等比縮小，
        // 整組的左右邊界仍對齊頁面內容的邊界
        gap: 32,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
      {/* 置中、字級與色階都在 .note 裡，不在這裡重複 */}
      <p className="note" style={{ margin: 0 }}>
        {caption}
      </p>
    </div>
  );
}

/* 實心：整個圓填滿，符號留白挖出來——疊在圖片上時比線稿清楚 */
function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.6 8.2l2.3 2.3L11.4 6"
        stroke="var(--page-primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CrossIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2"
        stroke="var(--page-primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
