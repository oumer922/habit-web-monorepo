import * as React from 'react';
import { Badge } from './Badge';

export function HabitRow({
  name,
  streak,
  todayDone,
  onToggleToday,
  onDelete
}: {
  name: string;
  streak: number;
  todayDone: boolean;
  onToggleToday: () => void;
  onDelete: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={todayDone} onChange={onToggleToday} />
        <div style={{ fontWeight: 500 }}>{name}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge>🔥 {streak}</Badge>
        <button onClick={onDelete} style={{ background: 'transparent', border: '1px solid #eee', borderRadius: 8, padding: '4px 8px' }}>Delete</button>
      </div>
    </div>
  );
}
