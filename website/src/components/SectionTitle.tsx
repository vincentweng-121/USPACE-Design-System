export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 22, fontWeight: 400, color: 'var(--text-primary)',
      marginBottom: 24, paddingBottom: 12,
      borderBottom: '1px solid var(--border-divider)',
    }}>
      {children}
    </h2>
  );
}
