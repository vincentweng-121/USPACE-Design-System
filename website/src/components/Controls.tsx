/**
 * 文件站 Playground 用的控制元件。
 *
 * ⚠️ 這些是「文件站自己的 UI」，不是 USPACE Design System 的元件。
 * 設計系統元件的規格請看 styles/ 與 tokens/components/。
 */

const groupStyle: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 8,
  overflow: 'hidden',
  border: '1px solid var(--border-divider)',
};

function optionStyle(active: boolean, compact: boolean): React.CSSProperties {
  return {
    padding: compact ? '6px 12px' : '6px 16px',
    border: 'none',
    fontSize: compact ? 11 : 12,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.12s',
    // 選取狀態走中性色：文件站介面不使用品牌色
    background: active ? 'var(--text-primary)' : 'var(--page-primary)',
    color: active ? 'var(--page-primary)' : 'var(--text-secondary)',
    fontWeight: active ? 600 : 400,
  };
}

/**
 * 多選一的分段控制項。
 *
 * compact：Playground 的 level / size 選擇器用（較窄、字較小）；
 * 預設：狀態切換用（較寬）。
 */
export function Segmented<T extends string>({ value, onChange, options, disabled, compact = false }: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <div style={{
      ...groupStyle,
      opacity: disabled ? 0.35 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
    }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={optionStyle(value === opt.value, compact)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/** 兩選一的開關，語意上等同 Segmented 的 boolean 版本 */
export function Toggle({ value, onChange, labelOn, labelOff, disabled }: {
  value: boolean;
  onChange: (v: boolean) => void;
  labelOn: string;
  labelOff: string;
  disabled?: boolean;
}) {
  return (
    <Segmented<'off' | 'on'>
      value={value ? 'on' : 'off'}
      onChange={v => onChange(v === 'on')}
      options={[
        { value: 'off', label: labelOff },
        { value: 'on', label: labelOn },
      ]}
      disabled={disabled}
    />
  );
}
