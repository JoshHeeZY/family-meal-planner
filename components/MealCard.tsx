import Link from "next/link";
import type { Meal, Slot } from "@/lib/types";

const cuisineLabel: Record<Meal["cuisine"], string> = {
  cantonese: "Cantonese",
  teochew: "Teochew",
  vietnamese: "Vietnamese",
};

const carbLabel: Record<Meal["carb"], string> = {
  rice: "Steamed rice",
  "rice-noodles": "Rice noodles",
  "wheat-noodles": "Egg noodles",
  baguette: "Baguette",
};

export function MealCard({
  meal,
  slot,
}: {
  meal: Meal;
  slot: Slot;
}) {
  return (
    <Link
      href={`/meals/${meal.slug}`}
      className="block rounded-2xl bg-[var(--paper)] p-4 shadow-sm ring-1 ring-[var(--line)] transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wide text-[var(--muted)]">
        <span>{slot}</span>
        <span>{meal.activeMinutes} min active</span>
      </div>
      <h3 className="mt-2 font-semibold leading-snug text-[var(--ink)]">
        {meal.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">
        {meal.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="badge">{cuisineLabel[meal.cuisine]}</span>
        <span className="badge">{carbLabel[meal.carb]}</span>
        {meal.leftoverOf ? <span className="badge">Leftover</span> : null}
      </div>
    </Link>
  );
}

export function CuisineBadge({ cuisine }: { cuisine: Meal["cuisine"] }) {
  return <span className="badge">{cuisineLabel[cuisine]}</span>;
}
