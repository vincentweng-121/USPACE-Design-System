import { useState } from 'react';
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
        boxShadow: 'var(--shadow-card)',
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
        boxShadow: 'var(--shadow-card)',
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
          boxShadow: 'var(--shadow-card-sm)',
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
        boxShadow: 'var(--shadow-card)',
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
      <p className="note" style={{margin: 0}}>
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
        boxShadow: 'var(--shadow-card)',
        marginBottom: 32,
      }}
    >
      <span aria-hidden style={{ color: 'var(--text-tertiary)' }}>⚠</span>
      <p className="note" style={{margin: 0, color: 'var(--text-secondary)'}}>
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

// ── 說明圖（明暗雙版）──
/**
 * 依主題切換的說明圖。
 *
 * 呼叫端給的是**不含 -light / -dark 與副檔名的基底名稱**，
 * 例如 `image="button-anatomy"` 會對應到：
 *
 *   website/public/images/button-anatomy-light.png
 *   website/public/images/button-anatomy-dark.png
 *
 * 兩張都會渲染，再由 CSS 依 `data-theme` 決定顯示哪一張。不用
 * `<picture>` 搭配 prefers-color-scheme，是因為站台的主題可以手動
 * 切換，媒體查詢不會跟著切。
 *
 * 站台部署在子路徑下，路徑一律要帶 BASE_URL；直接寫 `/images/...`
 * 在本機看得到、上線會 404。`npm run check:assets` 會驗證兩個檔案
 * 都存在且大小寫相符。
 */
export function ThemedImage({
  image,
  alt,
  className,
  style,
}: {
  image: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const base = `${import.meta.env.BASE_URL}images/${image}`;
  return (
    <>
      <img src={`${base}-light.png`} alt={alt} className={`theme-light-only ${className ?? ''}`} style={style} />
      <img src={`${base}-dark.png`} alt={alt} className={`theme-dark-only ${className ?? ''}`} style={style} />
    </>
  );
}

/**
 * 元件說明圖的標準容器。
 *
 * 容器高度固定 400，寬度隨版面延伸，圖片置中。圖片是 Figma 的
 * @2x 匯出（960×700），以一半的 CSS 尺寸呈現，在高解析度螢幕上才清晰。
 */
export function AnatomyImage({ image, alt }: { image: string; alt: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 400,
        padding: 24,
        borderRadius: 12,
        background: 'var(--page-secondary)',
        boxShadow: 'var(--shadow-card)',
        marginBottom: 32,
        overflow: 'hidden',
      }}
    >
      <ThemedImage
        image={image}
        alt={alt}
        style={{
          width: 480,
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

// ── 互動式展示區 ────────────────────────────────────────────
/**
 * 一組 radio。點選後由呼叫端更新狀態，預覽即時反映。
 */
function ControlGroup({
  name,
  label,
  value,
  options,
  isDisabled,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  isDisabled: (optionValue: string) => boolean;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="control-group-label">{label}</legend>
      {options.map((opt) => {
        const disabled = isDisabled(opt.value);
        return (
          <label
            key={opt.value}
            className="control-option"
            style={disabled ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={disabled}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        );
      })}
    </fieldset>
  );
}

/** Playground 的一個維度：左側控制卡的一組 radio */
export type PlaygroundDimension = {
  /** render 取值時的 key */
  key: string;
  /** 控制卡上顯示的群組名稱 */
  label: string;
  options: { value: string; label: string }[];
  /**
   * 依其他維度的當前值決定這個選項能不能選。
   *
   * 用於元件本身不存在的組合——例如 Chip 的 small 沒有 leading icon。
   * 停用而不是整個藏起來：藏起來讀者會以為那個選項不存在，
   * 停用才看得出「有這個選項，但這個尺寸下不適用」。
   */
  disabled?: (values: Record<string, string>) => boolean;
};

/**
 * 把 token JSON 的 dimensions 直接轉成 Playground 的維度。
 *
 * 大部分元件頁的維度就是 token 定義的那幾個，不需要另外寫一份；
 * 需要排除或補充時再自行組 PlaygroundDimension 陣列。
 */
export function dimensionsOf(
  dimensions: Record<string, string[]>,
  labels: Record<string, string> = {},
): PlaygroundDimension[] {
  return Object.entries(dimensions).map(([key, values]) => ({
    key,
    label: labels[key] ?? cap(key),
    options: values.map((v) => ({ value: v, label: cap(v) })),
  }));
}

/**
 * 左側即時預覽 + 右側控制卡。
 *
 * 各元件頁共用同一個實作，差別只在傳入的維度與 render。
 * 結構參考 Montage 文件站的 Variants 區塊。
 */
export function Playground({
  dimensions,
  render,
  name = 'playground',
}: {
  dimensions: PlaygroundDimension[];
  render: (values: Record<string, string>) => React.ReactNode;
  /** radio 的 name 前綴，同一頁有多個 Playground 時必須不同 */
  name?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(dimensions.map((d) => [d.key, d.options[0].value])),
  );

  const isDisabled = (d: PlaygroundDimension, optionValue: string) =>
    d.disabled?.({ ...values, [d.key]: optionValue }) ?? false;

  /**
   * 切換後可能讓另一個維度的當前值變成不合法（例如選了 small，
   * 而 icon 停在 leading）。這裡把落在停用選項上的維度退回第一個還能選的值，
   * 否則預覽會顯示一個元件根本做不出來的組合。
   */
  const applyChange = (key: string, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      for (const d of dimensions) {
        if (d.disabled?.({ ...next, [d.key]: next[d.key] })) {
          const fallback = d.options.find(
            (o) => !d.disabled!({ ...next, [d.key]: o.value }),
          );
          if (fallback) next[d.key] = fallback.value;
        }
      }
      return next;
    });
  };

  return (
    <div className="playground">
      <div className="playground-preview">
        <div>{render(values)}</div>
      </div>

      <div className="playground-controls">
        {dimensions.map((d) => (
          <ControlGroup
            key={d.key}
            name={`${name}-${d.key}`}
            label={d.label}
            value={values[d.key]}
            options={d.options}
            isDisabled={(optionValue) => isDisabled(d, optionValue)}
            onChange={(v) => applyChange(d.key, v)}
          />
        ))}
      </div>
    </div>
  );
}

// ── 圖說編號列表 ────────────────────────────────────────────
/**
 * 對應圖片上標號的說明，接在圖片下方。
 * 欄數隨版面寬度自動增減，窄螢幕會收成一欄。
 */
export function NumberedCaptions({ items }: { items: { name: string; desc?: string }[] }) {
  return (
    <ol className="numbered-captions">
      {items.map((item, i) => (
        <li key={item.name}>
          <strong>
            {i + 1}. {item.name}
          </strong>
          {item.desc && <span>{item.desc}</span>}
        </li>
      ))}
    </ol>
  );
}

// ── 待補的說明圖 ────────────────────────────────────────────
/**
 * 尺寸與 AnatomyImage 完全相同的佔位框，直接寫出還缺哪兩個檔案。
 *
 * 這樣頁面骨架先立起來，缺的是圖而不是版面；補圖時把
 * PendingImage 換成 AnatomyImage 即可。
 *
 * 屬性刻意不叫 image：那是 check:assets 用來確認「檔案必須存在」的
 * 標記，這裡的檔案正好相反，是還沒有的。
 */
export function PendingImage({ expects, note }: { expects: string; note?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        height: 400,
        padding: 24,
        borderRadius: 12,
        background: 'var(--page-secondary)',
        border: '1px dashed var(--border-strong)',
        marginBottom: 32,
        textAlign: 'center',
      }}
    >
      <div className="heading-sm" style={{ color: 'var(--text-primary)' }}>
        說明圖待補
      </div>
      <p className="note" style={{margin: 0, color: 'var(--text-secondary)'}}>
        需要 <code>{expects}-light.png</code> 與 <code>{expects}-dark.png</code>
        <br />
        Figma artboard 480×350，以 scale 2 匯出成 960×700
      </p>
      {note && (
        <p className="note" style={{margin: 0}}>
          {note}
        </p>
      )}
    </div>
  );
}


// ── 可擺放 icon 的位置 ──────────────────────────────────────
/**
 * 虛線方框，代表「這裡可以放一個 icon」。
 *
 * 來源：Figma node 3746:15802。
 *
 * 預覽裡凡是由使用者自行傳入、可替換的 icon 位置，一律用這個方框，
 * 不畫任何具體圖示——畫了星星或驚嘆號，讀者會以為那個圖示是規範的一部分，
 * 佔位框只表達尺寸與位置。
 *
 * 相對的，元件行為固定的圖示（關閉鈕、勾選、收合箭頭）要照實畫：
 * 那是元件規範本身，換成方框反而看不出那裡是什麼。
 *
 * 顏色預設跟著文字走，與各元件 Anatomy 表寫的「顏色與文字相同」一致。
 */
export function IconPlaceholder({
  size = 24,
  color = 'currentColor',
}: {
  size?: number;
  color?: string;
}) {
  // 邊框寬度與虛線間隔跟著 viewBox 一起縮放，各頁不必自行調整
  const inset = 1;
  const side = 24 - inset * 2;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x={inset}
        y={inset}
        width={side}
        height={side}
        rx="1.33"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeDasharray="4 4"
      />
    </svg>
  );
}
