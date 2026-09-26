import Link from "next/link";
import Image from "next/image";

export default function WorkoutCard({ workout }) {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } =
    workout;

  return (
    <Link
      href={`/workouts/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-colors hover:border-[#ccff00]/50"
    >
      <div className="relative h-40 w-full overflow-hidden bg-white/5">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2">
          {muscleGroups?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-extrabold uppercase leading-snug text-white">
          {name}
        </h3>
        <p className="text-xs text-gray-400">{equipment}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs font-semibold text-gray-300">
          <span>⏱ {duration} min</span>
          <span>🔥 {caloriesBurned} kcal</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}
