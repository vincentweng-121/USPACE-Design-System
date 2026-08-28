/**
 * 極簡 Markdown 渲染器。
 *
 * 只支援 tracking/*.md 實際用到的語法：標題、表格、清單、引言、
 * 粗體、行內程式碼、水平線。刻意不引入 markdown 套件——需求就這幾種，
 * 而且渲染結果要吃站台既有的 .spec-table 等樣式。
 *
 * 存在的理由是消除手抄：Changelog 與 Status 頁以前是把 markdown 的內容
 * 複製成 tsx 陣列，兩邊會各自漂移。現在直接讀原始檔。
 */

/** 粗體、行內程式碼、連結 */
function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (t.startsWith('**')) out.push(<strong key={key}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith('`')) out.push(<code key={key}>{t.slice(1, -1)}</code>);
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      out.push(
        <a key={key} href={href} style={{ textDecoration: 'underline' }}>
          {label}
        </a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const isTableRow = (l: string) => l.trim().startsWith('|');
const cells = (l: string) =>
  l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

export default function Markdown({ source }: { source: string }) {
  const lines = source.split('\n');
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 表格
    if (isTableRow(line) && isTableRow(lines[i + 1] ?? '') && /^[\s|:-]+$/.test(lines[i + 1])) {
      const header = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        <div className="spec-table" key={key++} style={{ margin: '20px 0' }}>
          <div>
            <table>
              <thead>
                <tr>
                  {header.map((h, n) => (
                    <th key={n}>{inline(h, `h${key}-${n}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, n) => (
                  <tr key={n}>
                    {r.map((c, m2) => (
                      <td key={m2}>{inline(c, `c${key}-${n}-${m2}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>,
      );
      continue;
    }

    // 清單
    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*] /, ''));
      out.push(
        <ul key={key++} className="text-md" style={{ paddingLeft: 20, display: 'grid', gap: 8, margin: '12px 0' }}>
          {items.map((t, n) => (
            <li key={n}>{inline(t, `l${key}-${n}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    i++;

    if (!line.trim() || line.trim() === '---') continue;

    if (line.startsWith('#### ')) {
      out.push(
        <h4 key={key++} className="heading-sm" style={{ margin: '20px 0 8px' }}>
          {inline(line.slice(5), `h4-${key}`)}
        </h4>,
      );
    } else if (line.startsWith('### ')) {
      out.push(
        <h3 key={key++} className="heading-md" style={{ margin: '28px 0 10px' }}>
          {inline(line.slice(4), `h3-${key}`)}
        </h3>,
      );
    } else if (line.startsWith('## ')) {
      out.push(
        <h2 key={key++} className="heading-lg" style={{ margin: '48px 0 12px' }}>
          {inline(line.slice(3), `h2-${key}`)}
        </h2>,
      );
    } else if (line.startsWith('# ')) {
      continue; // 頁面標題由 PageHero 負責
    } else if (line.startsWith('> ')) {
      out.push(
        <p
          key={key++}
          className="text-sm"
          style={{
            margin: '12px 0',
            paddingLeft: 14,
            background: 'var(--surface-sunken)',
            borderRadius: 8,
            color: 'var(--text-tertiary)',
          }}
        >
          {inline(line.slice(2), `q-${key}`)}
        </p>,
      );
    } else {
      out.push(
        <p key={key++} className="text-md text-muted" style={{ margin: '12px 0' }}>
          {inline(line, `p-${key}`)}
        </p>,
      );
    }
  }

  return <>{out}</>;
}
