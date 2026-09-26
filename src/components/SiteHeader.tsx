"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSavedResources, listTracker } from "@/lib/storage";

const LINKS = [
  { href: "/poslovi", label: "Poslovi" },
  { href: "/izvori", label: "Izvori" },
  { href: "/kompanije", label: "Kompanije" },
  { href: "/alati", label: "Alati" },
  { href: "/porez", label: "Porez" },
  { href: "/vodici", label: "Vodiči" },
  { href: "/tracker", label: "Tracker" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const cancelled = { current: false };
    async function load() {
      const resources = getSavedResources().length;
      const tracker = (await listTracker().catch(() => [])).length;
      if (!cancelled.current) setSavedCount(resources + tracker);
    }
    load();
    return () => {
      cancelled.current = true;
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#17312a]/10 bg-[#fdfdfb]/95 backdrop-blur">
      <a
        href="#sadrzaj"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#17312a] focus:px-4 focus:py-2 focus:text-white"
      >
        Preskoči na sadržaj
      </a>
      <div className="mx-auto flex h-[74px] max-w-[1540px] items-center justify-between gap-4 px-5 md:px-12">
        <Link href="/" className="flex min-h-11 items-center gap-3 text-sm font-bold text-[#17312a]">
          <span className="logo-icon grid size-9 place-items-center rounded-full bg-[#17312a] text-[#e7f0df]">R</span>
          Remote poslovi
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#60736b] lg:flex" aria-label="Glavna navigacija">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`min-h-11 content-center transition hover:text-[#17312a] ${
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "font-semibold text-[#17312a]"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/tracker"
            className="hidden min-h-11 rounded-full border border-[#17312a]/15 bg-white px-4 py-2 text-xs font-bold text-[#17312a] hover:border-[#17312a]/40 sm:inline-flex sm:items-center"
          >
            Sačuvano{savedCount > 0 ? ` (${savedCount})` : ""}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#17312a]/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Meni</span>
            <span aria-hidden className="text-lg">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-[#17312a]/10 bg-white px-5 py-4 lg:hidden" aria-label="Mobilna navigacija">
          <ul className="grid gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-[#17312a] hover:bg-[#e5f0df]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
