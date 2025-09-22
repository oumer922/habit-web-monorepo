export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Habit Tracker</h1>
        {children}
      </body>
    </html>
  );
}
