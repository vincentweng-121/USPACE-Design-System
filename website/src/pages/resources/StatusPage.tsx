import { palette } from '../../tokens/colors';
import PageHero from '../../components/PageHero';
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
      <PageHero
        title="Status"
        lead={<>各元件開發進度總覽。最後更新：2026-05-19</>}
      />

      <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        {[
          { label: 'Published', count: published, color: palette.neonLime800 },
          { label: 'Draft', count: draft, color: palette.yellow400 },
          { label: 'Todo', count: todo, color: 'var(--text-tertiary)' },
        ].map(s => (
          <div key={s.label} style={{
            flex: '1 1 100px', padding: 20, borderRadius: 12, minWidth: 100,
            background: 'var(--page-secondary)', border: '1px solid var(--border-divider)',
            textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 500, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {sections.map(section => (
        <section className="section" key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="spec-table">
<div>
            <table style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  {['File', 'Version', 'Status', 'Updated', 'Note'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.items.map(item => (
                  <tr key={item.name}>
                    <td><code>{item.name}</code></td>
                    <td>{item.version}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td>{item.date}</td>
                    <td>{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </section>
      ))}
    </div>
  );
}
