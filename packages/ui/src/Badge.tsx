import * as React from 'react';
export function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ background: '#111', color: '#fff', padding: '2px 8px', borderRadius: 999, fontSize: 12 }}>{children}</span>;
}
