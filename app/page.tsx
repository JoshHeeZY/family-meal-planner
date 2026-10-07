import { MealCard } from "@/components/MealCard";
import { PrintButton } from "@/components/PrintButton";
import { mealFor, riceStats, weekPlan } from "@/lib/plan";
import Link from "next/link";

export default async function HomePage() {
  "use cache";
  const stats = riceStats();

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[var(--accent)]">
            7 days · lunch & dinner · {stats.servings} people
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            This week’s table
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Cantonese, Teochew, and Vietnamese meals built around two heavy
            prep sessions (Sunday and Wednesday). Most plates are steamed rice;
            four lunches switch to noodles or bánh mì so the week is not only
            rice bowls.
          </p>
        </div>
        <PrintButton label="Print week" />
      </section>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Meals" value={String(stats.mealCount)} />
        <Stat
          label="Steamed rice"
          value={`${stats.ricePercent}%`}
          hint={`${stats.riceCount} of ${stats.mealCount}`}
        />
        <Stat
          label="Canton / Teochew / VN"
          value={`${stats.cuisineCounts.cantonese} / ${stats.cuisineCounts.teochew} / ${stats.cuisineCounts.vietnamese}`}
        />
        <Stat label="Prep days" value="2" hint="Sun + Wed" />
      </dl>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          href="/prep"
          className="rounded-full bg-[var(--prep)] px-4 py-2 font-medium text-white"
        >
          Open prep checklists
        </Link>
        <Link
          href="/grocery"
          className="rounded-full bg-[var(--paper)] px-4 py-2 font-medium ring-1 ring-[var(--line)]"
        >
          Grocery list for 8
        </Link>
      </div>

      <div className="grid gap-5">
        {weekPlan.map((day) => {
          const lunch = mealFor(day.lunch);
          const dinner = mealFor(day.dinner);
          return (
            <article
              key={day.day}
              className="rounded-3xl bg-[var(--paper)]/60 p-4 ring-1 ring-[var(--line)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{day.day}</h3>
                {day.isPrep ? (
                  <span className="rounded-full bg-[var(--prep-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--prep)]">
                    Heavy prep
                  </span>
                ) : (
                  <span className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    Easy cook
                  </span>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <MealCard meal={lunch} slot="lunch" />
                <MealCard meal={dinner} slot="dinner" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--paper)] p-4 ring-1 ring-[var(--line)]">
      <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-semibold">{value}</dd>
      {hint ? <p className="text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}
