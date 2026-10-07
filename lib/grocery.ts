import { mealFor, weekPlan } from "./plan";
import type { GroceryCategory, Ingredient } from "./types";

const categoryOrder: GroceryCategory[] = [
  "Meat",
  "Seafood",
  "Eggs & tofu",
  "Vegetables",
  "Herbs",
  "Noodles & bread",
  "Pantry",
];

export type GroceryLine = Ingredient & { from: string[] };

export function groceryList(): Record<GroceryCategory, GroceryLine[]> {
  const map = new Map<string, GroceryLine>();

  for (const day of weekPlan) {
    for (const slug of [day.lunch, day.dinner]) {
      const meal = mealFor(slug);
      if (meal.leftoverOf) continue;
      for (const ingredient of meal.ingredients) {
        const key = `${ingredient.category}::${ingredient.item.toLowerCase()}`;
        const existing = map.get(key);
        if (existing) {
          if (!existing.from.includes(meal.name)) {
            existing.from.push(meal.name);
          }
          if (existing.qty !== ingredient.qty) {
            existing.qty = `${existing.qty} + ${ingredient.qty}`;
          }
        } else {
          map.set(key, { ...ingredient, from: [meal.name] });
        }
      }
    }
  }

  const grouped = Object.fromEntries(
    categoryOrder.map((category) => [category, [] as GroceryLine[]]),
  ) as Record<GroceryCategory, GroceryLine[]>;

  for (const line of map.values()) {
    grouped[line.category].push(line);
  }

  return grouped;
}

export const extraStaples: Ingredient[] = [
  { item: "Jasmine rice (week total)", qty: "8–9 kg uncooked", category: "Pantry" },
  { item: "Neutral oil, soy, fish sauce, vinegar, sugar", qty: "check pantry", category: "Pantry" },
  { item: "Garlic, ginger, shallots (bulk)", qty: "already in recipes; buy extra", category: "Vegetables" },
];
