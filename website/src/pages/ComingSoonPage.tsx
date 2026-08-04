import PageHero from '../components/PageHero';
import roadmap from '../data/roadmap.json';

/**
 * 尚未開始的元件頁。
 *
 * 除了說明「還沒做」，也把 roadmap 裡排定的日期一起顯示出來，
 * 讓讀者不用跳到另一頁才知道什麼時候會有。
 */

type Phase = { due: string | null; done: boolean };
type Item = { name: string; phases: { style: Phase; content: Phase; final: Phase } };

/** roadmap 的英文名與選單標籤對不上的少數幾個 */
const ALIAS: Record<string, string> = {
  'bottom bar': 'tab bar',
  radio: 'radiobox',
};

/** 用標題比對 roadmap 項目，比對的是括號裡的英文名 */
function findItem(title: string): Item | undefined {
  const key = (ALIAS[title.toLowerCase()] ?? title).toLowerCase().replace(/\s+/g, ' ');
  return (roadmap.items as Item[]).find((it) => {
    const en = it.name.match(/（(.+)）/)?.[1];
    return en?.toLowerCase().replace(/\s+/g, ' ') === key;
  });
}

export default function ComingSoonPage({ title }: { title: string }) {
  const item = findItem(title);

  return (
    <>
      <PageHero title={title} />

      <div
        style={{
          padding: '48px 32px',
          border: '1px dashed var(--border-strong)',
          borderRadius: 12,
          textAlign: 'center',
          color: 'var(--text-secondary)',
        }}
      >
        <div className="heading-md" style={{ color: 'var(--text-primary)', marginBottom: 8 }}>
          尚未開始
        </div>
        <p className="text-md" style={{ margin: 0 }}>
          這個項目已排入規劃，設計稿與實作尚未完成。
        </p>

        {item && (
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 28,
              marginTop: 28,
              padding: '18px 28px',
              borderRadius: 12,
              background: 'var(--page-secondary)',
            }}
          >
            {(
              [
                ['樣式', item.phases.style],
                ['內容', item.phases.content],
                ['完稿', item.phases.final],
              ] as const
            ).map(([label, phase]) => (
              <div key={label}>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {label}
                </div>
                <div
                  className="heading-sm"
                  style={{ color: phase.done ? 'var(--positive)' : 'var(--text-primary)' }}
                >
                  {phase.done ? '已完成' : (phase.due ?? '未排定')}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-md" style={{ marginTop: 24, marginBottom: 0 }}>
          完整排程請見{' '}
          <a href="#/help/roadmap" style={{ textDecoration: 'underline' }}>
            Roadmap
          </a>
          。
        </p>
      </div>
    </>
  );
}
