"use client";

import { useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("duration");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await getWorkouts();
        if (!ignore) setWorkouts(data);
      } catch (e) {
        if (!ignore) setError("Could not load workouts. Please try again later.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));
  }, [filtered, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-gray-400">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag…"
            className="w-full rounded-full border border-white/20 bg-[#111] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#ccff00]/60 focus:outline-none sm:w-56"
          />

          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white sm:w-auto"
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
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-400">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
          <p className="text-sm font-semibold uppercase tracking-wide">Loading workouts…</p>
        </div>
      )}

      {!loading && error && <p className="py-16 text-center text-red-400">{error}</p>}

      {!loading && !error && sorted.length === 0 && (
        <p className="py-16 text-center text-gray-400">No workouts match &quot;{query}&quot;.</p>
      )}

      {!loading && !error && sorted.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
