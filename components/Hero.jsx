import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 rounded-3xl bg-[#0a0a0a] px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Workout Library
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
          >
            💪 Browse Workouts
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <Image
              src="/banner.png"
              alt="Workout illustration"
              fill
              sizes="320px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
