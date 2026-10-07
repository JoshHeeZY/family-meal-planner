"use client";

import { PrintButton } from "@/components/PrintButton";
import type { GroceryLine } from "@/lib/grocery";
import type { GroceryCategory } from "@/lib/types";
import { useEffect, useState } from "react";

const STORAGE = "grocery-ticks";

export function GroceryChecklist({
  grouped,
}: {
  grouped: Record<GroceryCategory, GroceryLine[]>;
}) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, []);

  function toggle(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE, JSON.stringify(next));
      return next;
    });
  }

  function clear() {
    localStorage.removeItem(STORAGE);
    setDone({});
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 print:hidden">
        <PrintButton label="Print grocery list" />
        <button
          type="button"
          onClick={clear}
          className="rounded-full px-4 py-2 text-sm ring-1 ring-[var(--line)]"
        >
          Clear ticks
        </button>
      </div>
      {(Object.entries(grouped) as [GroceryCategory, GroceryLine[]][])
        .filter(([, lines]) => lines.length > 0)
        .map(([category, lines]) => (
          <section key={category}>
            <h3 className="text-lg font-semibold">{category}</h3>
            <ul className="mt-2 divide-y divide-[var(--line)] rounded-2xl bg-[var(--paper)] ring-1 ring-[var(--line)]">
              {lines.map((line) => {
                const id = `${category}-${line.item}`;
                return (
                  <li key={id}>
                    <label className="flex cursor-pointer items-start gap-3 px-4 py-3">
                      <input
                        type="checkbox"
                        className="mt-1 size-4 accent-[var(--accent)] print:hidden"
                        checked={Boolean(done[id])}
                        onChange={() => toggle(id)}
                      />
                      <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <span
                          className={
                            done[id] ? "text-[var(--muted)] line-through" : ""
                          }
                        >
                          {line.item}
                        </span>
                        <span className="text-sm text-[var(--muted)]">
                          {line.qty}
                        </span>
                      </span>
                    </label>
                    <p className="px-11 pb-3 text-xs text-[var(--muted)]">
                      {line.from.join(" · ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
    </div>
  );
}
