export default function ComingSoon({ label }: { label: string }) {
  return (
    <div style={{
      padding: '48px 0', textAlign: 'center',
      color: 'var(--text-tertiary)', fontSize: 14,
      border: '1px dashed var(--border-divider)', borderRadius: 12,
    }}>
      {label} — Coming Soon
    </div>
  );
}
