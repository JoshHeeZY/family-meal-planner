import { getMeal, meals, SERVINGS } from "./meals";
import type { DayPlan, Meal, PrepDay } from "./types";

export const weekPlan: DayPlan[] = [
  {
    day: "Sunday",
    weekday: "Sun",
    isPrep: true,
    lunch: "wonton-noodles",
    dinner: "thit-kho",
  },
  {
    day: "Monday",
    weekday: "Mon",
    isPrep: false,
    lunch: "thit-kho-leftovers",
    dinner: "soy-chicken",
  },
  {
    day: "Tuesday",
    weekday: "Tue",
    isPrep: false,
    lunch: "teochew-braised-pork",
    dinner: "lemongrass-chicken",
  },
  {
    day: "Wednesday",
    weekday: "Wed",
    isPrep: true,
    lunch: "pho-bo",
    dinner: "steamed-fish",
  },
  {
    day: "Thursday",
    weekday: "Thu",
    isPrep: false,
    lunch: "char-siu-rice",
    dinner: "teochew-minced-pork",
  },
  {
    day: "Friday",
    weekday: "Fri",
    isPrep: false,
    lunch: "bun-thit-nuong",
    dinner: "black-pepper-beef",
  },
  {
    day: "Saturday",
    weekday: "Sat",
    isPrep: false,
    lunch: "banh-mi",
    dinner: "teochew-steamed-pomfret",
  },
];

export const prepDays: PrepDay[] = [
  {
    id: "sunday",
    label: "Prep day 1",
    day: "Sunday",
    hours: "2.5–3.5 hours, then the pots sit",
    summary:
      "Shop once, then run two braises and a pho broth while you fold or boil wontons for lunch. Marinades go in the fridge for the rest of the week.",
    tasks: [
      {
        title: "Start pho broth and pork-bone wonton stock",
        detail:
          "Bones on the stove first. They need hours, not attention. Chill overnight and skim fat Wednesday.",
        forMeals: ["pho-bo", "wonton-noodles"],
      },
      {
        title: "Cook thịt kho tàu",
        detail:
          "One 8+ serve pot. Dinner tonight, lunch Monday. Keep some sauce aside for rice bowls.",
        forMeals: ["thit-kho", "thit-kho-leftovers"],
      },
      {
        title: "Braise Teochew pork (lor bak)",
        detail: "Shoulder, tofu, eggs. Chill so Tuesday lunch slices cleanly.",
        forMeals: ["teochew-braised-pork"],
      },
      {
        title: "Marinate three proteins",
        detail:
          "Soy chickens; lemongrass chicken thighs; char siu pork; extra lemongrass pork for bún. Label containers.",
        forMeals: [
          "soy-chicken",
          "lemongrass-chicken",
          "char-siu-rice",
          "bun-thit-nuong",
        ],
      },
      {
        title: "Jars: nước chấm and đồ chua",
        detail:
          "Fish sauce dip for several meals. Carrot-daikon pickle for bánh mì and noodle bowls.",
        forMeals: ["bun-thit-nuong", "banh-mi", "lemongrass-chicken"],
      },
      {
        title: "Wash and box greens",
        detail: "Gai lan, choy sum, herbs, lettuce. Spin dry so Wednesday is faster.",
        forMeals: ["soy-chicken", "pho-bo", "bun-thit-nuong"],
      },
    ],
  },
  {
    id: "wednesday",
    label: "Prep day 2",
    day: "Wednesday",
    hours: "1.5–2 hours around pho lunch",
    summary:
      "Top-up shop for fish and herbs. Roast char siu while the pho broth reheats. Velvet Friday’s beef. Dinner is a clean steamed fish so you are not frying after prep.",
    tasks: [
      {
        title: "Reheat and skim pho broth",
        detail: "Assembly lunch. Refresh herbs and bean sprouts.",
        forMeals: ["pho-bo"],
      },
      {
        title: "Roast char siu",
        detail: "Oven while you eat pho. Cool, then fridge for Thursday lunch.",
        forMeals: ["char-siu-rice", "banh-mi"],
      },
      {
        title: "Poach soy chickens if not done Sunday",
        detail:
          "If Sunday ran long, poach now. Otherwise just reduce a little master sauce.",
        forMeals: ["soy-chicken", "banh-mi"],
      },
      {
        title: "Velvet Friday beef",
        detail: "Slice, cornflour, soy. Friday dinner is then a 10-minute stir-fry.",
        forMeals: ["black-pepper-beef"],
      },
      {
        title: "Fresh fish for tonight",
        detail: "Steam two fish after prep. Buy Saturday’s pomfret later in the week.",
        forMeals: ["steamed-fish"],
      },
      {
        title: "Cook extra rice and portion",
        detail: "Fridge 2–3 lunch boxes so weeknights are protein + reheat rice.",
        forMeals: ["char-siu-rice", "teochew-minced-pork"],
      },
    ],
  },
];

export function mealFor(slug: string): Meal {
  const meal = getMeal(slug);
  if (!meal) {
    throw new Error(`Unknown meal: ${slug}`);
  }
  return meal;
}

export function plannedMeals(): Meal[] {
  return weekPlan.flatMap((day) => [mealFor(day.lunch), mealFor(day.dinner)]);
}

export function riceStats() {
  const planned = plannedMeals();
  const riceCount = planned.filter((meal) => meal.carb === "rice").length;
  return {
    servings: SERVINGS,
    mealCount: planned.length,
    riceCount,
    ricePercent: Math.round((riceCount / planned.length) * 100),
    cuisineCounts: {
      cantonese: planned.filter((m) => m.cuisine === "cantonese").length,
      teochew: planned.filter((m) => m.cuisine === "teochew").length,
      vietnamese: planned.filter((m) => m.cuisine === "vietnamese").length,
    },
  };
}

export function allMealSlugs() {
  return meals.map((meal) => meal.slug);
}
