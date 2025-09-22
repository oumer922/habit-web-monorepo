export type Schedule = { kind: 'daily' } | { kind: 'weekdays' } | { kind: 'custom', daysOfWeek: number[] }; // 0=Sun..6=Sat

export function iso(date: Date): string {
  return date.toISOString().slice(0,10);
}

export function todayLocal(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i=n-1;i>=0;i--) {
    const di = new Date(d);
    di.setDate(d.getDate()-i);
    out.push(iso(di));
  }
  return out;
}

export function isAllowedDay(dateIso: string, schedule: Schedule): boolean {
  const d = new Date(dateIso + 'T00:00:00');
  const dow = d.getDay();
  if (schedule.kind === 'daily') return true;
  if (schedule.kind === 'weekdays') return dow >= 1 && dow <= 5;
  return schedule.daysOfWeek.includes(dow);
}

export function currentStreak(logs: Set<string>, schedule: Schedule, maxBack=365): number {
  let streak = 0;
  const d = new Date();
  for (let i=0;i<maxBack;i++) {
    const di = new Date(d);
    di.setDate(d.getDate()-i);
    const dayIso = iso(di);
    const allowed = isAllowedDay(dayIso, schedule);
    if (!allowed) continue; // skip off-days
    if (logs.has(dayIso)) streak++;
    else break;
  }
  return streak;
}

export function weekCells(logs: Set<string>, schedule: Schedule): { date: string; done: boolean }[] {
  const days = lastNDays(7);
  return days.map((d) => ({ date: d, done: logs.has(d) }));
}
export function longestStreak(
  logs: Set<string>,
  schedule: Schedule,
  maxBack = 365 * 5
): number {
  let longest = 0;
  let current = 0;
  const today = new Date();
  for (let i = 0; i < maxBack; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = iso(d);
    if (!isAllowedDay(k, schedule)) continue;
    if (logs.has(k)) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 0;
    }
  }
  return longest;
}

export function monthMatrix(
  year: number,
  month0: number, // 0..11
  logs: Set<string>
): { date: string; inMonth: boolean; done: boolean }[][] {
  const first = new Date(year, month0, 1);
  const firstDow = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  const prevMonthDays = new Date(year, month0, 0).getDate();

  const cells: { date: string; inMonth: boolean; done: boolean }[] = [];

  // leading days from previous month to align first week
  for (let i = 0; i < firstDow; i++) {
    const day = prevMonthDays - firstDow + 1 + i;
    const d = new Date(year, month0 - 1, day);
    const k = iso(d);
    cells.push({ date: k, inMonth: false, done: logs.has(k) });
  }

  // days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month0, day);
    const k = iso(d);
    cells.push({ date: k, inMonth: true, done: logs.has(k) });
  }

  // trailing days to complete the last week
  while (cells.length % 7 !== 0) {
    const last = new Date(cells[cells.length - 1].date + "T00:00:00");
    last.setDate(last.getDate() + 1);
    const k = iso(last);
    cells.push({ date: k, inMonth: false, done: logs.has(k) });
  }

  // enforce 6 rows (42 cells) for stable layout
  while (cells.length < 42) {
    const last = new Date(cells[cells.length - 1].date + "T00:00:00");
    last.setDate(last.getDate() + 1);
    const k = iso(last);
    cells.push({ date: k, inMonth: false, done: logs.has(k) });
  }

  // chunk into weeks
  const weeks: { date: string; inMonth: boolean; done: boolean }[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
