export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 400, marginBottom: 8 }}>{title}</h1>
      <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 40 }}>
        此頁面正在規劃中。
      </p>
      <div style={{
        padding: '80px 24px', textAlign: 'center', borderRadius: 16,
        border: '1px dashed var(--border-divider)',
        background: 'var(--page-secondary)',
      }}>
        <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>🚧</div>
        <div style={{ fontSize: 16, color: 'var(--text-tertiary)', marginBottom: 8 }}>Coming Soon</div>
        <div style={{ fontSize: 13, color: 'var(--text-tertiary)', opacity: 0.6 }}>
          設計規格制定中，完成後將更新至此頁面。
        </div>
      </div>
    </div>
  );
}
