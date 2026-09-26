"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/#library", label: "Workouts", match: "/" },
    { href: "/my-plan", label: "My Plan", match: "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          FITLOG
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.match;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#ccff00]/10 text-[#ccff00]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/my-plan" className="hidden items-center gap-2 text-gray-300 hover:text-white sm:flex">
            Plan
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="hidden items-center gap-2 text-gray-300 hover:text-white sm:flex">
            Saved
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white">
              {saved.length}
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.match;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    isActive ? "bg-[#ccff00]/10 text-[#ccff00]" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex items-center gap-4 border-t border-white/10 px-4 pt-3 text-sm">
            <Link href="/my-plan" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300">
              Plan
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                {plan.length}
              </span>
            </Link>
            <Link href="/my-plan" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300">
              Saved
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
