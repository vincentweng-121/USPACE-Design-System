import { useMemo, useState } from 'react';
import PageHero from '../../components/PageHero';
import SectionTitle from '../../components/SectionTitle';
import roadmap from '../../data/roadmap.json';

/**
 * 元件設計進度甘特圖。
 *
 * 資料在 website/src/data/roadmap.json，狀態由三個階段的 done 推導，
 * 不另外存一份狀態字串——兩份會對不上。
 */

type Phase = { due: string | null; done: boolean };
type Item = {
  name: string;
  phases: { style: Phase; content: Phase; final: Phase };
  span: [number, number] | null;
};

const items = roadmap.items as Item[];
const weeks = roadmap.weeks as string[];

// ── 狀態 ────────────────────────────────────────────────────
const STATUS = {
  done: { label: '已完成', color: 'var(--positive)', bg: 'var(--positive-bg)' },
  content: { label: '內容進行中', color: 'var(--accent-dim)', bg: 'rgba(116, 170, 90, 0.14)' },
  style: { label: '樣式進行中', color: 'var(--text-primary)', bg: 'var(--nav-active)' },
  todo: { label: '未開始', color: 'var(--text-tertiary)', bg: 'var(--surface-sunken)' },
} as const;

type StatusKey = keyof typeof STATUS;

/** 三個階段的 done 決定目前狀態，順序由後往前判斷 */
function statusOf(item: Item): StatusKey {
  const { style, content, final } = item.phases;
  if (final.done) return 'done';
  if (content.done) return 'done';
  if (style.done) return 'content';
  return 'todo';
}

/**
 * 樣式階段有排定日期、但整體尚未開始的項目，在原始資料裡標為「樣式進行中」。
 * 這裡改由「是否已排進最早的兩週」推導，避免資料與顯示各說各話。
 */
function displayStatus(item: Item): StatusKey {
  const s = statusOf(item);
  if (s !== 'todo') return s;
  return item.span && item.span[0] === 0 ? 'style' : 'todo';
}

// ── 今天落在第幾週 ──────────────────────────────────────────
function weekIndexOfToday(): number | null {
  const now = new Date();
  const year = now.getFullYear();
  const parsed = weeks.map((w) => {
    const [m, d] = w.split('/').map(Number);
    return new Date(year, m - 1, d);
  });
  for (let i = 0; i < parsed.length; i++) {
    if (now <= parsed[i]) return i;
  }
  return null;
}

// ── 單一項目的甘特列 ────────────────────────────────────────
function GanttRow({ item }: { item: Item }) {
  const key = displayStatus(item);
  const s = STATUS[key];

  return (
    <div className="gantt-row">
      <div className="gantt-name">
        <span className="gantt-dot" style={{ background: s.color }} aria-hidden />
        {item.name}
      </div>

      <div className="gantt-track">
        {weeks.map((w) => (
          <div key={w} className="gantt-cell" aria-hidden />
        ))}

        {item.span && (
          <div
            className="gantt-bar"
            style={{
              gridColumn: `${item.span[0] + 1} / ${item.span[1] + 2}`,
              background: s.bg,
              borderColor: s.color,
              color: s.color,
            }}
            title={`${item.name}：${weeks[item.span[0]]} – ${weeks[item.span[1]]}`}
          >
            {s.label}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [filter, setFilter] = useState<StatusKey | 'all'>('all');
  const todayIndex = useMemo(weekIndexOfToday, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const k of Object.keys(STATUS)) c[k] = 0;
    for (const it of items) c[displayStatus(it)]++;
    return c;
  }, []);

  const shown = filter === 'all' ? items : items.filter((i) => displayStatus(i) === filter);

  return (
    <div>
      <PageHero
        title="Roadmap"
        lead="元件設計的排程與進度。每個項目分成樣式、內容（含文案）、完稿三個階段，狀態由已完成的階段推導。"
        meta={
          <>
            <span>
              資料 <code>website/src/data/roadmap.json</code>
            </span>
            <span>
              來源 <code>{roadmap.$source}</code>
            </span>
          </>
        }
      />

      <section className="section">
        <SectionTitle>進度總覽</SectionTitle>

        <div className="gantt-filters">
          {(['all', 'done', 'content', 'style', 'todo'] as const).map((k) => (
            <button
              key={k}
              type="button"
              className="gantt-filter"
              data-active={filter === k}
              onClick={() => setFilter(k)}
            >
              {k === 'all' ? '全部' : STATUS[k].label}
              <span className="gantt-filter-count">{counts[k]}</span>
            </button>
          ))}
        </div>

        <div className="gantt">
          <div className="gantt-head">
            <div className="gantt-name">項目</div>
            <div className="gantt-track">
              {weeks.map((w, i) => (
                <div key={w} className="gantt-week" data-today={i === todayIndex}>
                  {w}
                </div>
              ))}
            </div>
          </div>

          {shown.map((item) => (
            <GanttRow key={item.name} item={item} />
          ))}

          {shown.length === 0 && (
            <p className="note" style={{padding: '24px 16px'}}>
              這個狀態目前沒有項目。
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <SectionTitle>各階段日期</SectionTitle>

        <div className="spec-table">
          <div>
            <table>
              <thead>
                <tr>
                  <th>項目</th>
                  <th>樣式</th>
                  <th>內容（含文案）</th>
                  <th>完稿</th>
                  <th>目前狀態</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((item) => {
                  const s = STATUS[displayStatus(item)];
                  const cell = (p: Phase) =>
                    p.done ? <span style={{ color: 'var(--positive)' }}>已完成</span> : (p.due ?? '—');
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{cell(item.phases.style)}</td>
                      <td>{cell(item.phases.content)}</td>
                      <td>{cell(item.phases.final)}</td>
                      <td style={{ color: s.color }}>{s.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle>怎麼更新</SectionTitle>
        <p className="note">
          告訴我哪個項目的哪一個階段完成了，我會把{' '}
          <code>website/src/data/roadmap.json</code> 對應的{' '}
          <code>done</code> 改成 <code>true</code>，狀態與統計會自動跟著變。
          這頁不提供直接點選修改，因為靜態網站改了也存不回去，只會讓你以為存檔了。
        </p>
      </section>
    </div>
  );
}
