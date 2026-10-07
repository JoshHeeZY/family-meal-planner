export type Cuisine = "cantonese" | "teochew" | "vietnamese";
export type Carb = "rice" | "rice-noodles" | "wheat-noodles" | "baguette";
export type Slot = "lunch" | "dinner";
export type GroceryCategory =
  | "Meat"
  | "Seafood"
  | "Eggs & tofu"
  | "Vegetables"
  | "Herbs"
  | "Noodles & bread"
  | "Pantry";

export type Ingredient = {
  item: string;
  qty: string;
  category: GroceryCategory;
};

export type Meal = {
  slug: string;
  name: string;
  cuisine: Cuisine;
  carb: Carb;
  activeMinutes: number;
  leftoverOf?: string;
  summary: string;
  whyEasy: string;
  reheating?: string;
  ingredients: Ingredient[];
  steps: string[];
  sides: string[];
};

export type PrepTask = {
  title: string;
  detail: string;
  forMeals: string[];
};

export type PrepDay = {
  id: "sunday" | "wednesday";
  label: string;
  day: string;
  hours: string;
  summary: string;
  tasks: PrepTask[];
};

export type DayPlan = {
  day: string;
  weekday: string;
  isPrep: boolean;
  lunch: string;
  dinner: string;
};
