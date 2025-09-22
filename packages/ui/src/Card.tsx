import * as React from 'react';

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}
