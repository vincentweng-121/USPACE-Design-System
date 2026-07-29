/**
 * 規格表。
 *
 * 視覺樣式定義在 global.css 的 `.spec-table`，
 * 與頁面內手寫的表格共用同一份，避免兩套樣式各自漂移。
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
    <div className="spec-table">
      <div>
        <table style={{ minWidth }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
