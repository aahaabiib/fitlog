"use client";
import { usePlan } from "./PlanProvider";

export default function WorkoutActions({ workout }) {
  const { addToPlan, addToSaved, plan, saved, planCap } = usePlan();

  const alreadyInPlan = plan.some((w) => w.id === workout.id);
  const alreadySaved = saved.some((w) => w.id === workout.id);
  const planFull = plan.length >= planCap;
  const planDisabled = alreadyInPlan || planFull;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(workout)}
        disabled={planDisabled}
        className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-transform ${
          planDisabled
            ? "cursor-not-allowed bg-white/10 text-gray-500"
            : "bg-[#ccff00] text-black hover:scale-105"
        }`}
      >
        📅 {alreadyInPlan ? "Already in Plan" : planFull ? "Plan Full (5/5)" : "Add to Today's Plan"}
      </button>
      <button
        onClick={() => addToSaved(workout)}
        disabled={alreadySaved}
        className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide ${
          alreadySaved
            ? "cursor-not-allowed border border-white/10 text-gray-500"
            : "border border-white/30 text-white hover:border-[#ccff00]/60"
        }`}
      >
        🔖 {alreadySaved ? "Already Saved" : "Save for Later"}
      </button>
    </div>
  );
}
