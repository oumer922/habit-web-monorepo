import * as React from 'react';

export type DayCell = { date: string; done: boolean };

export function WeekGrid({ cells, onToggle }: { cells: DayCell[]; onToggle: (iso: string) => void }) {
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
      {cells.map((c, i) => (
        <button key={c.date}
          onClick={() => onToggle(c.date)}
          title={c.date}
          style={{
            height: 40,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            background: c.done ? '#16a34a' : '#fff',
            color: c.done ? '#fff' : '#111'
          }}>
          {dayNames[i % 7]}
        </button>
      ))}
    </div>
  );
}
