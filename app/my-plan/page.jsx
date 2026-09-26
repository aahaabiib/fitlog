"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/components/PlanProvider";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const { plan, saved, hydrated } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
    const calories = plan.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    return { exercises, minutes, calories };
  }, [plan]);

  const rawList = tab === "plan" ? plan : saved;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rawList;
    return rawList.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [rawList, query]);

  const activeList = useMemo(
    () => [...filtered].sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0)),
    [filtered, sortBy]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-gray-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { label: "Exercises", value: metrics.exercises },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-white/10 bg-[#111] p-5 text-center sm:text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {m.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold text-white">
              <span className={m.label === "Exercises" ? "text-[#ccff00]" : ""}>{m.value}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#111] p-1">
            {[
              { key: "plan", label: "Today's Plan" },
              { key: "saved", label: "Saved" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  tab === t.key ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
            >
              Sort By: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
            </button>
            {open && (
              <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      sortBy === opt.value ? "text-[#ccff00]" : "text-gray-300"
                    } hover:bg-white/5`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or tag…"
          className="w-full rounded-full border border-white/20 bg-[#111] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#ccff00]/60 focus:outline-none sm:w-64"
        />
      </div>

      <div className="mt-6">
        {!hydrated && <p className="py-16 text-center text-gray-400">Loading workouts…</p>}

        {hydrated && rawList.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 py-20 text-center">
            <h3 className="text-xl font-extrabold uppercase tracking-wide text-white">
              Nothing Here Yet
            </h3>
            <p className="max-w-sm text-sm text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black"
            >
              Go to Workouts
            </Link>
          </div>
        )}

        {hydrated && rawList.length > 0 && activeList.length === 0 && (
          <p className="py-16 text-center text-gray-400">No workouts match &quot;{query}&quot;.</p>
        )}

        {hydrated && activeList.length > 0 && (
          <div className="flex flex-col gap-4">
            {activeList.map((workout) => (
              <PlanWorkoutCard key={workout.id} workout={workout} listType={tab} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
