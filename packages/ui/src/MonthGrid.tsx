import * as React from "react";

export type MonthCell = { date: string; inMonth: boolean; done: boolean };

export function MonthGrid({
  weeks,
  onToggle
}: {
  weeks: MonthCell[][];
  onToggle: (iso: string) => void;
}) {
  const header = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-600">
        {header.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="mb-1 grid grid-cols-7 gap-1">
          {week.map((c) => (
            <button
              key={c.date}
              title={c.date}
              onClick={() => onToggle(c.date)}
              className={[
                "h-9 rounded-lg border",
                c.done ? "bg-green-600 text-white" : "bg-white text-black",
                "border-gray-200",
                c.inMonth ? "" : "opacity-50"
              ].join(" ")}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
