# Family meal planner

7-day lunch and dinner plan for a **family of 8**. Meals are mostly **Cantonese, Teochew, and Vietnamese**, with steamed rice on about **70%** of plates. Two heavy prep sessions (Sunday and Wednesday) carry the easy weeknights.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS 4** — a 2026-friendly stack that deploys to **Netlify**.

## What you get

- Week view: 14 meals with cuisine, carb, and active time
- Meal pages: ingredients for 8, steps, reheating notes
- Prep days: Sunday and Wednesday checklists (ticks saved in the browser)
- Grocery list: merged shop for the week, leftover meals not double-counted
- Installable on a phone via the browser (Add to Home Screen / PWA)

This is a web app first. Play Store / App Store packaging can come later (Capacitor or similar) without rewriting the plan data.

## Run locally

Needs Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Netlify

1. Push this repo to GitHub.
2. New site on [Netlify](https://app.netlify.com) from that repo.
3. Build command `npm run build` and publish `.next` are already in `netlify.toml`.
4. Netlify will use the Next.js runtime plugin listed there.

Add to Home Screen from Safari or Chrome after it is live if you want it to feel like a phone app.

## CV / stack notes

Safe to list: Next.js, React, TypeScript, Tailwind CSS, Netlify.

Skip listing HTML/CSS/JavaScript/PHP as the headline skills for this project — they are implied, and you already covered CakePHP at uni.
