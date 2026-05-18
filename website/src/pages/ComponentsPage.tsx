import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import ComingSoon from '../components/ComingSoon';

// ─── Button Demo ──────────────────────────────────────────
function ButtonDemo() {
  const levels = [
    { name: 'Accent', bg: '#606060', text: '#C3F400' },
    { name: 'Charging', bg: '#606060', text: '#00F158' },
    { name: 'Primary', bg: '#606060', text: '#FFFFFF' },
    { name: 'Secondary', bg: '#323237', text: '#FFFFFF' },
    { name: 'Disabled', bg: '#FFFFFF', text: '#FFFFFF' },
  ];

  return (
    <div>
      <h3 style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 16 }}>Regular Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '100%' }}>
        {levels.map(l => (
          <button key={l.name} style={{
            padding: '12px 24px', borderRadius: 100, border: 'none',
            background: l.bg, color: l.text, fontSize: 16, fontWeight: 400,
            cursor: l.name === 'Disabled' ? 'not-allowed' : 'pointer',
            opacity: l.name === 'Disabled' ? 0.3 : 1,
            fontFamily: 'inherit',
          }}>
            {l.name} Button
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: 16, color: 'var(--text-secondary)', marginTop: 32, marginBottom: 16 }}>Small Size</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {levels.slice(0, 4).map(l => (
          <button key={l.name} style={{
            padding: '8px 24px', borderRadius: 100, border: 'none',
            background: l.bg, color: l.text, fontSize: 16, fontWeight: 400,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {l.name}
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: 16, color: 'var(--text-secondary)', marginTop: 32, marginBottom: 16 }}>
        Customized (Gradient Border)
      </h3>
      <button style={{
        padding: '12px 24px', borderRadius: 100, background: 'transparent',
        border: '3px solid transparent',
        backgroundImage: 'linear-gradient(#000,#000), linear-gradient(to right, #777777, #D9D9D9)',
        backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box',
        color: '#777777', fontSize: 16, fontWeight: 400, cursor: 'pointer',
        width: '100%', maxWidth: '100%', fontFamily: 'inherit',
      }}>
        Customized Button
      </button>
    </div>
  );
}

// ─── Toggle Demo ──────────────────────────────────────────
function ToggleDemo() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <div
          onClick={() => setOn(!on)}
          style={{
            width: 51, height: 31, borderRadius: 16,
            background: on ? '#A7D100' : '#D9D9D9',
            position: 'relative', transition: 'background 0.2s', cursor: 'pointer',
          }}
        >
          <div style={{
            width: 27, height: 27, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 2,
            left: on ? 22 : 2, transition: 'left 0.2s',
          }} />
        </div>
        <span style={{ fontSize: 14 }}>On</span>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
        <div
          onClick={() => setOff(!off)}
          style={{
            width: 51, height: 31, borderRadius: 16,
            background: off ? '#A7D100' : '#D9D9D9',
            position: 'relative', transition: 'background 0.2s', cursor: 'pointer',
          }}
        >
          <div style={{
            width: 27, height: 27, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 2,
            left: off ? 22 : 2, transition: 'left 0.2s',
          }} />
        </div>
        <span style={{ fontSize: 14 }}>Off</span>
      </label>
    </div>
  );
}

// ─── Header Demo ──────────────────────────────────────────
function HeaderDemo() {
  const types = ['FullPage', 'Floating', 'Modal'] as const;
  const [active, setActive] = useState<typeof types[number]>('FullPage');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {types.map(t => (
          <button
            key={t} onClick={() => setActive(t)}
            style={{
              padding: '6px 16px', borderRadius: 100, border: 'none',
              background: active === t ? 'var(--accent)' : 'var(--grey800)',
              color: active === t ? '#000' : 'var(--text-secondary)',
              fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{
        background: active === 'FullPage' ? '#000' : 'var(--page-secondary)',
        borderRadius: active === 'FullPage' ? 0 : active === 'Floating' ? '24px 24px 0 0' : '20px 20px 0 0',
        padding: 0, maxWidth: '100%', width: 375,
        border: '1px solid var(--border-divider)',
        overflow: 'hidden',
      }}>
        {active === 'Floating' && (
          <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 4, borderRadius: 100, background: 'rgba(50,50,55,0.15)' }} />
          </div>
        )}
        {active === 'Modal' && <div style={{ height: 16 }} />}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 24, color: 'var(--text-primary)' }}>&#8249;</span>
          <span style={{ fontSize: 24, color: 'var(--text-primary)' }}>&#x2715;</span>
        </div>
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ fontSize: active === 'FullPage' ? 26 : 22, fontWeight: 400, color: 'var(--text-primary)', textAlign: active === 'FullPage' ? 'left' : 'center' }}>
            {active === 'FullPage' ? 'Page Title' : active === 'Floating' ? 'Sheet Title' : 'Modal Title'}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, textAlign: active === 'FullPage' ? 'left' : 'center' }}>
            Subtitle text here
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Glass Demo ───────────────────────────────────────────
function GlassDemo() {
  return (
    <div style={{
      position: 'relative', height: 200, borderRadius: 16, overflow: 'hidden',
      background: 'linear-gradient(135deg, #1A1A1A, #323237, #606060)',
    }}>
      <div style={{
        position: 'absolute', top: 20, left: 20,
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(255,255,255,0.20)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>
        +
      </div>

      <div style={{
        position: 'absolute', top: 20, right: 20,
        borderRadius: 100, padding: '4px',
        background: 'rgba(255,255,255,0.20)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {['A', 'B', 'C'].map((label, i) => (
          <div key={label} style={{
            width: 44, height: 44, borderRadius: '50%',
            background: i === 0 ? 'rgba(255,255,255,0.20)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        fontSize: 11, color: 'var(--text-tertiary)',
      }}>
        Glass: rgba(255,255,255,0.20) + blur(10px)
      </div>
    </div>
  );
}

// ─── List Demo ────────────────────────────────────────────
function ListDemo() {
  const [toggled, setToggled] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Heading */}
      <div style={{ padding: '32px 0 8px', fontSize: 14, color: 'var(--text-secondary)' }}>
        Section Heading
      </div>

      {/* Item with toggle */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          ⚙
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Setting Item</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Description text</div>
        </div>
        <div
          onClick={() => setToggled(!toggled)}
          style={{
            width: 51, height: 31, borderRadius: 16,
            background: toggled ? '#A7D100' : '#D9D9D9',
            position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
          }}
        >
          <div style={{
            width: 27, height: 27, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 2, left: toggled ? 22 : 2, transition: 'left 0.2s',
          }} />
        </div>
      </div>

      {/* Item with button */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          ★
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Action Item</div>
        </div>
        <button style={{
          padding: '8px 24px', borderRadius: 100, border: 'none',
          background: '#323237', color: '#606060', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Action
        </button>
      </div>

      {/* Item with selectable */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-divider)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grey800)', marginRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
          ◎
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, color: 'var(--text-primary)' }}>Selectable Item</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>With tag label</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            padding: '1px 12px', borderRadius: 100,
            background: 'var(--grey800)', fontSize: 14,
          }}>
            Tag
          </span>
          <div
            onClick={() => setSelected(!selected)}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              border: selected ? 'none' : '2px solid var(--text-secondary)',
              background: selected ? '#C3F400' : 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            {selected && <span style={{ color: '#000', fontSize: 16 }}>✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
const tabs = ['Button', 'Toggle', 'Header', 'Glass', 'List', 'Floating Button', 'ScaleDown Order'] as const;

export default function ComponentsPage() {
  const [tab, setTab] = useState<typeof tabs[number]>('Button');

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 8 }}>Components</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32 }}>
        互動式元件預覽。所有元件皆基於 USPACE Design Token 建構。
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t} onClick={() => setTab(t)}
            style={{
              padding: '8px 20px', borderRadius: 100, border: 'none',
              background: tab === t ? 'var(--accent)' : 'var(--grey800)',
              color: tab === t ? '#000' : 'var(--text-secondary)',
              fontSize: 13, cursor: 'pointer', fontWeight: tab === t ? 500 : 400,
              fontFamily: 'inherit',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{
        background: 'var(--page-secondary)', borderRadius: 16,
        border: '1px solid var(--border-divider)', padding: 'clamp(16px, 4vw, 32px)',
      }}>
        <SectionTitle>{tab}</SectionTitle>
        {tab === 'Button' && <ButtonDemo />}
        {tab === 'Toggle' && <ToggleDemo />}
        {tab === 'Header' && <HeaderDemo />}
        {tab === 'Glass' && <GlassDemo />}
        {tab === 'List' && <ListDemo />}
        {tab === 'Floating Button' && <ComingSoon label="Floating Button" />}
        {tab === 'ScaleDown Order' && <ComingSoon label="ScaleDown Order Button" />}
      </div>
    </div>
  );
}
