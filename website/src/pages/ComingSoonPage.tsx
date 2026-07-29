import PageHero from '../components/PageHero';

export default function ComingSoonPage({ title }: { title: string }) {
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
        <p className="text-md">
          這個項目已排入規劃，設計稿與實作尚未完成。
          進度請見 <a href="#/help/status" style={{ textDecoration: 'underline' }}>Status</a>。
        </p>
      </div>
    </>
  );
}
