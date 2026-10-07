"use client";

import { useEffect, useState } from "react";

type Task = {
  title: string;
  detail: string;
  meals: string[];
};

export function PrepChecklist({
  storageKey,
  tasks,
}: {
  storageKey: string;
  tasks: Task[];
}) {
  const key = `prep-${storageKey}`;
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, [key]);

  function toggle(title: string) {
    setDone((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }

  return (
    <ul className="mt-5 space-y-3">
      {tasks.map((task) => (
        <li key={task.title}>
          <label className="flex cursor-pointer gap-3 rounded-xl p-2 hover:bg-[var(--cream)]">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-[var(--prep)]"
              checked={Boolean(done[task.title])}
              onChange={() => toggle(task.title)}
            />
            <span>
              <span
                className={`block font-medium ${done[task.title] ? "text-[var(--muted)] line-through" : ""}`}
              >
                {task.title}
              </span>
              <span className="mt-1 block text-sm text-[var(--muted)]">
                {task.detail}
              </span>
              <span className="mt-1 block text-xs text-[var(--prep)]">
                Feeds: {task.meals.join(" · ")}
              </span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
