import SectionTitle from '../../components/SectionTitle';

type Status = 'PUBLISHED' | 'DRAFT' | 'TODO';

interface Item { name: string; version: string; status: Status; date: string; note: string; }

const sections: { title: string; items: Item[] }[] = [
  {
    title: 'Foundations',
    items: [
      { name: 'uspace_palette.dart', version: 'v1.3.0', status: 'PUBLISHED', date: '2026-05-19', note: '新增 neonLime700 + transparentWhite5' },
      { name: 'uspace_colors_extension.dart', version: 'v2.2.0', status: 'PUBLISHED', date: '2026-05-19', note: '4 gradients + Dark token 修正' },
      { name: 'typography_extension.dart', version: 'v1.1.0', status: 'PUBLISHED', date: '2026-04-15', note: 'SF Pro 補入' },
      { name: 'glass_extension.dart', version: '-', status: 'DRAFT', date: '2026-04-16', note: '模糊值待確認' },
      { name: 'spacing_extension.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: 'Margin + 11 Spacer tokens' },
      { name: 'radius_extension.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: 'Small / Medium / Full' },
      { name: 'elevation_extension.dart', version: '-', status: 'TODO', date: '-', note: '尚未開始' },
    ],
  },
  {
    title: 'Components',
    items: [
      { name: 'button.dart', version: 'v1.2.0', status: 'PUBLISHED', date: '2026-04-16', note: 'Regular + Small + Floating' },
      { name: 'toggle.dart', version: 'v2.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '重寫：自訂 64×24 toggle + Disable state' },
      { name: 'header.dart', version: 'v1.0.1', status: 'PUBLISHED', date: '2026-04-17', note: 'FullPage / Floating / Modal' },
      { name: 'list.dart', version: 'v1.0.0', status: 'DRAFT', date: '2026-04-16', note: '' },
      { name: 'bottom_bar.dart', version: '-', status: 'TODO', date: '-', note: '尚未開始' },
      { name: 'icon.dart', version: '-', status: 'TODO', date: '-', note: '尚未開始' },
      { name: 'navigation.dart', version: '-', status: 'TODO', date: '-', note: '尚未開始' },
      { name: 'text_field.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '9 states + trailing button' },
      { name: 'dropdown_menu.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '5 states + dropdown panel' },
      { name: 'tab.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '5 types × 2 states' },
      { name: 'chip.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '4 levels × 2 sizes' },
      { name: 'text_area.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '8 states, multiline 144px' },
      { name: 'modal.dart', version: 'v1.0.0', status: 'PUBLISHED', date: '2026-05-19', note: '4 categories + glass effect' },
      { name: 'divider.dart', version: '-', status: 'TODO', date: '-', note: '尚未開始' },
    ],
  },
];

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { bg: string; color: string; label: string }> = {
    PUBLISHED: { bg: 'rgba(167,209,0,0.15)', color: '#A7D100', label: 'PUBLISHED' },
    DRAFT: { bg: 'rgba(209,175,101,0.15)', color: '#D1AF65', label: 'DRAFT' },
    TODO: { bg: 'rgba(152,152,159,0.15)', color: '#98989F', label: 'TODO' },
  };
  const s = map[status];
  return (
    <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 100, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

export default function StatusPage() {
  const total = sections.flatMap(s => s.items);
  const published = total.filter(i => i.status === 'PUBLISHED').length;
  const draft = total.filter(i => i.status === 'DRAFT').length;
  const todo = total.filter(i => i.status === 'TODO').length;

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>Status</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32 }}>
        各元件開發進度總覽。最後更新：2026-05-19
      </p>

      <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        {[
          { label: 'Published', count: published, color: '#A7D100' },
          { label: 'Draft', count: draft, color: '#D1AF65' },
          { label: 'Todo', count: todo, color: '#98989F' },
        ].map(s => (
          <div key={s.label} style={{
            flex: '1 1 100px', padding: 20, borderRadius: 12, minWidth: 100,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 500, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: 56 }}>
          <SectionTitle>{section.title}</SectionTitle>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  {['File', 'Version', 'Status', 'Updated', 'Note'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.items.map(item => (
                  <tr key={item.name} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 12px' }}><code style={{ color: 'var(--accent)', fontSize: 12 }}>{item.name}</code></td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{item.version}</td>
                    <td style={{ padding: '10px 12px' }}><StatusBadge status={item.status} /></td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-tertiary)' }}>{item.date}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
