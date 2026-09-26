"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSavedResources, listTracker } from "@/lib/storage";

const LINKS = [
  { href: "/izvori", label: "Baza resursa" },
  { href: "/alati", label: "CV i prijava" },
  { href: "/porez", label: "Porez" },
  { href: "/plate", label: "Plate" },
  { href: "/vodici", label: "Vodiči" },
  { href: "/tracker", label: "Tracker" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const resources = getSavedResources().length;
      const tracker = (await listTracker().catch(() => [])).length;
      if (!cancelled) setSavedCount(resources + tracker);
    }
    load();
    return () => { cancelled = true; };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#17312a]/7 bg-[#fbfcf8]/90 shadow-[0_8px_30px_rgba(23,49,42,0.035)] backdrop-blur-2xl">
      <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#17312a] focus:px-4 focus:py-2 focus:text-white">
        Preskočite na sadržaj
      </a>
      <div className="mx-auto flex h-[72px] max-w-[1540px] items-center justify-between gap-4 px-5 md:px-12">
        <Link href="/" className="group flex min-h-11 items-center gap-3 text-sm font-bold text-[#17312a]">
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-[1rem] bg-[#17312a] font-serif text-lg text-[#e7f0df] shadow-[0_8px_18px_rgba(23,49,42,.14)]">
            R
            <span className="absolute -bottom-3 -right-3 size-8 rounded-full border-[6px] border-white/10" aria-hidden />
          </span>
          <span className="hidden tracking-[-0.01em] sm:inline">Remote poslovi</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#17312a]/8 bg-white/80 p-1.5 text-xs text-[#60736b] shadow-[0_8px_22px_rgba(23,49,42,.035)] xl:flex" aria-label="Glavna navigacija">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={`rounded-full px-3.5 py-2.5 font-semibold transition ${active ? "bg-[#17312a] text-white shadow-[0_6px_14px_rgba(23,49,42,.12)]" : "hover:bg-[#eef3ed] hover:text-[#17312a]"}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/poslovi" className="hidden min-h-10 items-center gap-2 rounded-full border border-[#dc5b38]/16 bg-[#fff5f0] px-3.5 text-xs font-bold text-[#a44931] shadow-[0_6px_16px_rgba(220,91,56,.06)] lg:inline-flex">
            Poslovi <span className="rounded-full bg-[#dc5b38] px-1.5 py-0.5 text-[9px] text-white">BETA</span>
          </Link>
          <Link href="/tracker" className="hidden min-h-10 items-center rounded-full border border-[#17312a]/9 bg-white px-3.5 text-xs font-bold text-[#17312a] shadow-[0_6px_16px_rgba(23,49,42,.04)] sm:inline-flex">
            Sačuvano{savedCount > 0 ? ` · ${savedCount}` : ""}
          </Link>
          <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#17312a]/10 bg-white shadow-[0_6px_16px_rgba(23,49,42,.04)] xl:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
            <span className="sr-only">Meni</span><span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-[#17312a]/8 bg-[#fbfcf8]/98 px-5 py-4 shadow-[0_18px_38px_rgba(23,49,42,.08)] xl:hidden" aria-label="Mobilna navigacija">
          <ul className="grid gap-1.5">
            {LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-[#17312a] transition hover:bg-[#eef3ed]">{link.label}</Link></li>
            ))}
            <li><Link href="/poslovi" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl bg-[#fff0e9] px-3 text-sm font-semibold text-[#9a432d]"><span>Eksperimentalni oglasi</span><span className="text-[10px] font-bold">BETA</span></Link></li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
