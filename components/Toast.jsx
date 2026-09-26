"use client";

export default function Toast({ toasts }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-[fadeIn_0.2s_ease-out] rounded-lg bg-[#ccff00] px-4 py-3 text-sm font-semibold text-black shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
