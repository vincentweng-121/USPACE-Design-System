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
        border: '1px solid var(--border-divider)',
        borderRadius: 10,
        overflow: 'hidden',
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 8.2l2.1 2.1L11 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
