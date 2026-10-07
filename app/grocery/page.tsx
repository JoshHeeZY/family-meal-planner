import { GroceryChecklist } from "@/components/GroceryChecklist";
import { extraStaples, groceryList } from "@/lib/grocery";
import { SERVINGS } from "@/lib/meals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grocery list",
};

export default async function GroceryPage() {
  "use cache";
  const grouped = groceryList();

  return (
    <div className="flex flex-col gap-8">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-[var(--accent)]">
          Shop for {SERVINGS}
        </p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight">
          One Sunday shop, plus a Wednesday fish run
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Leftover meals are skipped so you do not double-buy. Quantities are
          family-of-8 estimates — check the fridge before you copy the meat
          weights blindly. Tick items in the browser; ticks stay on this device.
        </p>
      </header>

      <section className="rounded-2xl bg-[var(--prep-soft)] p-4 text-sm">
        <p className="font-semibold text-[var(--prep)]">Always check pantry</p>
        <ul className="mt-2 list-disc pl-5">
          {extraStaples.map((item) => (
            <li key={item.item}>
              {item.item} — {item.qty}
            </li>
          ))}
        </ul>
      </section>

      <GroceryChecklist grouped={grouped} />
    </div>
  );
}
