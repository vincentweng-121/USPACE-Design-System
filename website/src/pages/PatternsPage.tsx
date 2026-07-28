import PageHero from '../components/PageHero';

export default function PatternsPage() {
  return (
    <>
      <PageHero
        title="Patterns"
        lead="由多個元件組成的常見畫面組合，例如表單、通知、頁首與頁尾。"
      />

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
        <p className="text-md" style={{ maxWidth: '46ch', margin: '0 auto' }}>
          這一區會收錄跨元件的組合規範。目前元件層還在補齊，
          等元件穩定後再往上定義 pattern。
        </p>
      </div>
    </>
  );
}
