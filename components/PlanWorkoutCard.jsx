"use client";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "./PlanProvider";

export default function PlanWorkoutCard({ workout, listType }) {
  const { removeFromPlan, removeFromSaved, markAsDone } = usePlan();
  const { id, name, image, equipment, duration, caloriesBurned, rating, done } = workout;

  const handleRemove = () => {
    if (listType === "plan") removeFromPlan(id);
    else removeFromSaved(id);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111] p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-white/5">
        <Image src={image} alt={name} fill sizes="80px" className="object-cover" />
      </div>

      <div className="flex-1">
        <h3
          className={`text-sm font-extrabold uppercase tracking-wide ${
            done ? "text-gray-500 line-through" : "text-white"
          }`}
        >
          {name}
        </h3>
        <p className="text-xs text-gray-400">{equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-gray-300">
          <span>⏱ {duration} min</span>
          <span>🔥 {caloriesBurned} kcal</span>
          <span>⭐ {rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${id}`}
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white hover:border-[#ccff00]/60"
        >
          View Details
        </Link>
        {listType === "plan" && (
          <button
            onClick={() => markAsDone(id)}
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold text-black"
          >
            ✓ Mark as Done
          </button>
        )}
        <button
          onClick={handleRemove}
          aria-label="Remove"
          className="px-1 text-lg font-bold text-gray-500 hover:text-red-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
