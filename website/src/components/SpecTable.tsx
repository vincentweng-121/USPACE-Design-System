/**
 * 規格表。元件頁的 API 區塊與 Styles 頁的 token 表共用。
 */
export default function SpecTable({
  headers,
  rows,
  minWidth = 520,
}: {
  headers: string[];
  rows: React.ReactNode[][];
  minWidth?: number;
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          minWidth,
          borderCollapse: 'collapse',
          fontSize: 14,
        }}
      >
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderBottom: '1px solid var(--border-strong)',
                  color: 'var(--text-tertiary)',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '11px 12px',
                    borderBottom: '1px solid var(--border-divider)',
                    color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: j === 0 ? 500 : 400,
                    verticalAlign: 'top',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
