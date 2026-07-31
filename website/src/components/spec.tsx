import { colorOf, cap } from '../utils';

/**
 * 元件說明頁的共用區塊。
 *
 * Button 頁先做出這套結構，其餘元件頁共用同一份，
 * 避免每頁各自實作出不一樣的規格呈現。
 */

// ── 編號圓圈 ──
export function Badge({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        width: 26,
        height: 26,
        borderRadius: '50%',
        border: '1px solid var(--border-strong)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        color: 'var(--text-secondary)',
        background: 'var(--page-secondary)',
      }}
    >
      {n}
    </span>
  );
}

// ── 外框容器 ──
export function SpecBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 'clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)',
        borderRadius: 12,
        background: 'var(--page-secondary)',
        border: '1px solid var(--border-divider)',
      }}
    >
      {children}
    </div>
  );
}

// ── 變體展示列：編號 + 標題 + 說明 + 並排的實際元件 ──
export function SpecimenRow({
  n,
  title,
  note,
  children,
}: {
  n: number;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: 20, padding: n === 1 ? '8px 0 28px' : '28px 0' }}>
      <div style={{ marginTop: 2 }}>
        <Badge n={n} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="heading-sm" style={{ marginBottom: 2 }}>
          {title}
        </div>
        <div className="text-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 16 }}>
          {note}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── 狀態展示：每個狀態一列，並排該狀態下的所有變體 ──
export function StateRow({
  title,
  note,
  first = false,
  children,
}: {
  title: string;
  note: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: first ? '8px 0 28px' : '28px 0' }}>
      <div className="heading-sm" style={{ marginBottom: 2 }}>
        {title}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-tertiary)', marginBottom: 16 }}>
        {note}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

// ── 色票方塊 + token 名稱 ──
export function Swatch({ token }: { token: string | null | undefined }) {
  if (!token) return <span style={{ color: 'var(--text-tertiary)' }}>—</span>;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span
        aria-hidden
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          flexShrink: 0,
          background: colorOf(token),
          border: '1px solid var(--border-divider)',
        }}
      />
      <code>{token}</code>
    </span>
  );
}

// ── 解剖圖：元件本體 + 編號標記 ──
export function AnatomyFigure({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 64px) 24px',
        borderRadius: 12,
        background: 'var(--page-secondary)',
        border: '1px solid var(--border-divider)',
        marginBottom: 32,
      }}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>{children}</div>
    </div>
  );
}

/** 解剖圖裡標在元件左上角的編號 */
export function AnatomyMarker({ n, top = -13, left = -13 }: { n: number; top?: number; left?: number }) {
  return (
    <div style={{ position: 'absolute', top, left, zIndex: 1 }}>
      <Badge n={n} />
    </div>
  );
}

// ── 尚未確認的規格 ──
/**
 * 資料還沒補齊的區塊。
 * 明確標示「未確認」，比留空白或填入猜測的值安全。
 */
export function Pending({ what, why }: { what: string; why?: string }) {
  return (
    <div
      style={{
        padding: '28px 24px',
        border: '1px dashed var(--border-strong)',
        borderRadius: 12,
        color: 'var(--text-secondary)',
      }}
    >
      <div className="heading-sm" style={{ color: 'var(--text-primary)', marginBottom: 6 }}>
        {what} — 待補
      </div>
      <p className="text-sm" style={{ margin: 0 }}>
        {why ?? '尚未從 Figma 確認實際規格，避免填入推測值。'}
      </p>
    </div>
  );
}

// ── 資料來源提示 ──
/**
 * 規格檔若不是逐一比對 Figma 得來，必須在頁面上講清楚，
 * 否則讀者會把推導值當成已確認的規格。
 */
export function ConfidenceNote({ confidence, source }: { confidence?: string; source: string }) {
  if (!confidence || confidence === 'figma-verified') return null;

  const text =
    confidence === 'skeleton'
      ? `維度取自 ${source} 的 enum，各部位的 token 對應尚未整理。`
      : `token 對應由 ${source} 的實作推導而來，尚未逐一比對 Figma。若兩者有出入，以 Figma 為準。`;

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        padding: '12px 16px',
        borderRadius: 8,
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-divider)',
        marginBottom: 32,
      }}
    >
      <span aria-hidden style={{ color: 'var(--text-tertiary)' }}>⚠</span>
      <p className="text-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
        {text}
      </p>
    </div>
  );
}

// ── Color 區塊：直接由規格檔渲染 ──
type Variant = Record<string, string | number | null | undefined>;

/**
 * 依規格檔渲染顏色表。
 * dimensionKeys 決定表格前幾欄（例如 ['style','state']），
 * partKeys 決定要列出哪些部位（例如 ['bg','border','content']）。
 */
export function ColorTable({
  variants,
  dimensionKeys,
  partKeys,
  partLabels,
}: {
  variants: Variant[];
  dimensionKeys: string[];
  partKeys: string[];
  partLabels: Record<string, string>;
}) {
  if (!variants.length) return null;

  return (
    <div className="spec-table">
      <div>
        <table style={{ minWidth: 620 }}>
          <thead>
            <tr>
              {dimensionKeys.map((k) => (
                <th key={k}>{partLabels[k] ?? cap(k)}</th>
              ))}
              {partKeys.map((k) => (
                <th key={k}>{partLabels[k] ?? cap(k)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((v, i) => (
              <tr key={i}>
                {dimensionKeys.map((k) => (
                  <td key={k}>{String(v[k] ?? '—')}</td>
                ))}
                {partKeys.map((k) => (
                  <td key={k}>
                    <Swatch token={v[k] as string | null} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── 解剖圖（圖片版）──
/**
 * 以圖片呈現的解剖圖。
 *
 * 站台部署在子路徑下，圖片路徑一律要帶 BASE_URL；
 * 直接寫 `/images/...` 在本機看得到、上線會 404。
 * 這個元件把路徑處理包起來，呼叫端只需要給檔名。
 *
 * ⚠️ 檔名大小寫必須與 website/public/images/ 下的實際檔案完全一致。
 * macOS 本機不分大小寫，寫錯不會有徵兆，但 GitHub Pages 會 404。
 * `npm run check:assets` 會檢查這件事。
 */
export function AnatomyImage({ file, alt }: { file: string; alt: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 'clamp(32px, 6vw, 64px) 24px',
        borderRadius: 12,
        background: 'var(--page-secondary)',
        border: '1px solid var(--border-divider)',
        marginBottom: 32,
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/${file}`}
        alt={alt}
        style={{ maxWidth: 'min(480px, 100%)', height: 'auto' }}
      />
    </div>
  );
}
