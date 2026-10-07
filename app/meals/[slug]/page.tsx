import { CuisineBadge } from "@/components/MealCard";
import { allMealSlugs, mealFor, weekPlan } from "@/lib/plan";
import { getMeal } from "@/lib/meals";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allMealSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meal = getMeal(slug);
  return {
    title: meal?.name ?? "Meal",
    description: meal?.summary,
  };
}

const carbLabel = {
  rice: "Steamed rice",
  "rice-noodles": "Rice noodles",
  "wheat-noodles": "Egg noodles",
  baguette: "Baguette",
} as const;

export default async function MealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MealBody slug={slug} />;
}

async function MealBody({ slug }: { slug: string }) {
  "use cache";
  const meal = getMeal(slug);
  if (!meal) notFound();

  const scheduled = weekPlan.filter(
    (day) => day.lunch === meal.slug || day.dinner === meal.slug,
  );

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Link href="/" className="text-sm text-[var(--muted)] hover:underline">
        ← Back to week
      </Link>
      <header>
        <div className="flex flex-wrap gap-2">
          <CuisineBadge cuisine={meal.cuisine} />
          <span className="badge">{carbLabel[meal.carb]}</span>
          <span className="badge">{meal.activeMinutes} min active</span>
          {meal.leftoverOf ? (
            <span className="badge">
              Leftover of {mealFor(meal.leftoverOf).name}
            </span>
          ) : null}
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          {meal.name}
        </h2>
        <p className="mt-3 text-[var(--muted)]">{meal.summary}</p>
        <p className="mt-2 text-sm">
          <span className="font-medium">Why it is easy: </span>
          {meal.whyEasy}
        </p>
        {scheduled.length > 0 ? (
          <p className="mt-2 text-sm text-[var(--muted)]">
            On the plan:{" "}
            {scheduled
              .map((day) => {
                const slot = day.lunch === meal.slug ? "lunch" : "dinner";
                return `${day.day} ${slot}`;
              })
              .join(" · ")}
          </p>
        ) : null}
      </header>

      {meal.reheating ? (
        <section className="rounded-2xl bg-[var(--prep-soft)] p-4">
          <h3 className="font-semibold text-[var(--prep)]">Reheating</h3>
          <p className="mt-1 text-sm">{meal.reheating}</p>
        </section>
      ) : null}

      <section>
        <h3 className="text-lg font-semibold">Ingredients for 8</h3>
        <ul className="mt-3 divide-y divide-[var(--line)] rounded-2xl bg-[var(--paper)] ring-1 ring-[var(--line)]">
          {meal.ingredients.map((ing) => (
            <li
              key={ing.item}
              className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
            >
              <span>{ing.item}</span>
              <span className="shrink-0 text-[var(--muted)]">{ing.qty}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold">Steps</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          {meal.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="text-lg font-semibold">Sides</h3>
        <ul className="mt-2 list-disc pl-5 text-[var(--muted)]">
          {meal.sides.map((side) => (
            <li key={side}>{side}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
