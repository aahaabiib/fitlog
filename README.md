# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library
of workouts, dive into detailed instructions, and build out today's training
plan — all backed by a real API and persisted in your browser.

## Description

FitLog lets you explore twelve curated workouts, each with equipment,
difficulty, sets/reps, and step-by-step instructions. Add lifts to **Today's
Plan** or **Save for Later**, track live totals for exercises/minutes/calories,
and mark workouts as done — all without losing your data on refresh.

## Technologies Used

- **Next.js (App Router)** — routing, server & client components
- **React** — UI and state management
- **Tailwind CSS** — styling and responsive design
- **Fetch API** — data from the FitLog REST API
- **localStorage** — persisting the plan/saved lists across reloads

## Features

1. Responsive workout library grid (3-column on desktop) with category tags, equipment, and stats
2. Search workouts by name or tag, plus sort by Duration, Calories, or Rating
3. "Today's Plan" with a 5-lift cap (button disables when full or already added), live metrics, and "Mark as Done"
4. "Saved for Later" list, separate from the daily plan
5. Toast notifications for every add/remove/done action
6. Plan & saved data persisted in localStorage, survives page reloads
7. Mobile-friendly navbar with a slide-down menu, plus a custom 404 page for unknown routes




