import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-8xl font-extrabold text-[#ccff00]">404</p>
      <h1 className="text-2xl font-extrabold uppercase tracking-wide text-white">
        Page Not Found
      </h1>
      <p className="max-w-sm text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black"
      >
        Back to Home
      </Link>
    </div>
  );
}
