import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

const SPECS = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "caloriesBurned", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" },
];

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;

  let workout;
  try {
    workout = await getWorkoutById(id);
  } catch (e) {
    workout = null;
  }

  if (!workout || workout.error) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-white/5 sm:h-96 md:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-gray-400">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            {SPECS.map((spec, i) => (
              <div
                key={spec.key}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-[#111]" : "bg-black"
                }`}
              >
                <span className="font-semibold uppercase tracking-wide text-gray-400">
                  {spec.label}
                </span>
                <span className="font-bold text-white">
                  {workout[spec.key]}
                  {spec.suffix ?? ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-lg font-extrabold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions?.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
