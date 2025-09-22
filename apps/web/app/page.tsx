'use client';
import * as React from 'react';
import { Card, HabitRow, WeekGrid } from '@repo/ui';
import { currentStreak, weekCells } from '@repo/streak-engine';
import { loadHabits, upsertHabit, removeHabit, toggleLog, uid, type Habit } from '@repo/storage';

type ScheduleKind = Habit['schedule']['kind'];

function emptyHabit(name='New Habit', schedule: Habit['schedule'] = { kind: 'daily' }): Habit {
  return { id: uid(), name, schedule, logs: [], createdAt: new Date().toISOString() };
}

export default function Page() {
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const [name, setName] = React.useState('Drink Water');
  const [kind, setKind] = React.useState<ScheduleKind>('daily');
  const [customDays, setCustomDays] = React.useState<number[]>([]);
  const [todayIso, setTodayIso] = React.useState<string>(new Date().toISOString().slice(0,10));

  React.useEffect(() => {
    setHabits(loadHabits());
    const id = setInterval(() => setTodayIso(new Date().toISOString().slice(0,10)), 60000);
    return () => clearInterval(id);
  }, []);

  function addHabit() {
    const schedule = kind === 'custom' ? { kind, daysOfWeek: customDays } : { kind };
    const h = emptyHabit(name.trim() || 'Untitled', schedule as Habit['schedule']);
    const next = [...habits, h];
    setHabits(next);
    upsertHabit(h);
    setName('');
  }

  function delHabit(id: string) {
    const next = habits.filter(h => h.id !== id);
    setHabits(next);
    removeHabit(id);
  }

  function toggleToday(id: string) {
    toggleLog(id, todayIso);
    setHabits(loadHabits());
  }

  function toggleCell(id: string, iso: string) {
    toggleLog(id, iso);
    setHabits(loadHabits());
  }

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  function toggleCustom(dayIndex: number) {
    setCustomDays(d => d.includes(dayIndex) ? d.filter(x => x !== dayIndex) : [...d, dayIndex].sort());
  }

  return (
    <main>
      <Card title="Add Habit">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 1fr', gap: 8, alignItems: 'center' }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Habit name" style={{ padding: 8, border: '1px solid #ddd', borderRadius: 8 }} />
          <select value={kind} onChange={e => setKind(e.target.value as ScheduleKind)} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 8 }}>
            <option value="daily">Daily</option>
            <option value="weekdays">Weekdays</option>
            <option value="custom">Custom</option>
          </select>
          <button onClick={addHabit} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}>Add</button>
        </div>

        {kind === 'custom' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {dayNames.map((d, i) => (
              <label key={i} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="checkbox" checked={customDays.includes(i)} onChange={() => toggleCustom(i)} /> {d}
              </label>
            ))}
          </div>
        )}
      </Card>

      <Card title="Habits">
        {habits.length === 0 && <div>No habits yet. Add one above.</div>}
        {habits.map(h => {
          const logs = new Set(h.logs);
          const streak = currentStreak(logs, h.schedule);
          const cells = weekCells(logs, h.schedule);
          const todayDone = logs.has(todayIso);
          return (
            <div key={h.id} style={{ marginBottom: 12 }}>
              <HabitRow
                name={h.name}
                streak={streak}
                todayDone={todayDone}
                onToggleToday={() => toggleToday(h.id)}
                onDelete={() => delHabit(h.id)}
              />
              <WeekGrid cells={cells} onToggle={(iso) => toggleCell(h.id, iso)} />
            </div>
          );
        })}
      </Card>
    </main>
  );
}
