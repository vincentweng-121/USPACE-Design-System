import { useState } from 'react';

/**
 * 程式碼區塊，附複製按鈕。
 * 底色固定為深色（兩個主題一致），與 Porsche 的做法相同。
 */
export default function CodeBlock({
  code,
  lang = 'dart',
  title,
}: {
  code: string;
  lang?: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      style={{
        border: '1px solid var(--border-divider)',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'var(--codeblock-bg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontSize: 12,
          color: 'var(--codeblock-muted)',
        }}
      >
        <span>{title ?? lang}</span>
        <button
          onClick={copy}
          style={{
            border: 'none',
            background: 'transparent',
            color: copied ? 'var(--positive)' : 'var(--codeblock-muted)',
            font: 'inherit',
            fontSize: 12,
            cursor: 'pointer',
            padding: '2px 6px',
          }}
        >
          {copied ? '已複製' : '複製'}
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          padding: '14px 16px',
          overflowX: 'auto',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
          fontSize: 13,
          lineHeight: 1.65,
          color: 'var(--codeblock-fg)',
        }}
      >
        <code
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: 'inherit',
            fontSize: 'inherit',
            whiteSpace: 'pre',
          }}
        >
          {code.trim()}
        </code>
      </pre>
    </div>
  );
}
