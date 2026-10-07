import { PrepChecklist } from "@/components/PrepChecklist";
import { mealFor, prepDays } from "@/lib/plan";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prep days",
};

export default async function PrepPage() {
  "use cache";

  return (
    <div className="flex flex-col gap-8">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-[var(--prep)]">Twice a week</p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
          Heavy prep, then easy plates
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Sunday is the long session (braises, broth, marinades). Wednesday is
          the mid-week top-up (pho assembly, roast char siu, velvet beef).
          Weeknights are mostly reheat, steam, or a short stir-fry.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {prepDays.map((prep) => (
          <section
            key={prep.id}
            className="rounded-3xl bg-[var(--paper)] p-5 ring-1 ring-[var(--line)] sm:p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--prep)]">
              {prep.label}
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{prep.day}</h3>
            <p className="text-sm text-[var(--muted)]">{prep.hours}</p>
            <p className="mt-3 text-sm">{prep.summary}</p>
            <PrepChecklist
              storageKey={prep.id}
              tasks={prep.tasks.map((task) => ({
                title: task.title,
                detail: task.detail,
                meals: task.forMeals.map((slug) => mealFor(slug).name),
              }))}
            />
          </section>
        ))}
      </div>

      <p className="text-sm text-[var(--muted)]">
        After prep, jump back to the{" "}
        <Link href="/" className="underline">
          week view
        </Link>{" "}
        for each meal’s active time.
      </p>
    </div>
  );
}
