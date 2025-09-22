export type Habit = {
  id: string;
  name: string;
  schedule: { kind: 'daily' } | { kind: 'weekdays' } | { kind: 'custom', daysOfWeek: number[] };
  logs: string[]; // ISO dates completed
  createdAt: string;
  reminder?: { enabled: boolean; hour: number; minute: number };
};

const KEY = 'habits_v1';

function isBrowser() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

export function loadHabits(): Habit[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Habit[] : [];
  } catch { return []; }
}

export function saveHabits(habits: Habit[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(habits));
}

export function upsertHabit(h: Habit) {
  const list = loadHabits();
  const idx = list.findIndex(x => x.id === h.id);
  if (idx >= 0) list[idx] = h; else list.push(h);
  saveHabits(list);
}

export function removeHabit(id: string) {
  const list = loadHabits().filter(h => h.id !== id);
  saveHabits(list);
}

export function toggleLog(id: string, dateIso: string) {
  const list = loadHabits();
  const h = list.find(x => x.id === id);
  if (!h) return;
  const s = new Set(h.logs);
  if (s.has(dateIso)) s.delete(dateIso); else s.add(dateIso);
  h.logs = Array.from(s).sort();
  saveHabits(list);
}

export function uid(): string {
  return Math.random().toString(36).slice(2);
}
export function exportJSON(): string {
  const list = loadHabits();
  return JSON.stringify({ version: 1, habits: list }, null, 2);
}

export function importJSON(
  json: string,
  mode: "merge" | "replace" = "merge"
): { added: number; updated: number; total: number } {
  const parsed = JSON.parse(json) as { version?: number; habits: Habit[] };
  const incoming = parsed.habits || [];
  if (mode === "replace") {
    saveHabits(incoming);
    return { added: incoming.length, updated: 0, total: incoming.length };
  }
  const existing = loadHabits();
  const map = new Map(existing.map((h) => [h.id, h]));
  let added = 0,
    updated = 0;
  for (const h of incoming) {
    if (map.has(h.id)) {
      map.set(h.id, h);
      updated++;
    } else {
      map.set(h.id, h);
      added++;
    }
  }
  const merged = Array.from(map.values());
  saveHabits(merged);
  return { added, updated, total: merged.length };
}

export function exportCSV(): string {
  const list = loadHabits();
  const rows: string[] = ["habitId,habitName,date,done"];
  for (const h of list) {
    const set = new Set(h.logs);
    for (const d of set) {
      rows.push(`${h.id},"${String(h.name || "").replace('"', '""')}",${d},1`);
    }
  }
  return rows.join("\n");
}
