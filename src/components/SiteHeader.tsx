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
    const cancelled = { current: false };
    async function load() {
      const resources = getSavedResources().length;
      const tracker = (await listTracker().catch(() => [])).length;
      if (!cancelled.current) setSavedCount(resources + tracker);
    }
    load();
    return () => { cancelled.current = true; };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#17312a]/8 bg-[#fbfcf8]/88 backdrop-blur-xl">
      <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#17312a] focus:px-4 focus:py-2 focus:text-white">
        Preskoči na sadržaj
      </a>
      <div className="mx-auto flex h-[74px] max-w-[1540px] items-center justify-between gap-4 px-5 md:px-12">
        <Link href="/" className="flex min-h-11 items-center gap-3 text-sm font-bold text-[#17312a]">
          <span className="logo-icon grid size-9 place-items-center rounded-full bg-[#17312a] text-[#e7f0df]">R</span>
          <span className="hidden sm:inline">Remote poslovi</span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-[#17312a]/8 bg-white/75 p-1 text-xs text-[#60736b] xl:flex" aria-label="Glavna navigacija">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={`rounded-full px-3.5 py-2.5 font-semibold transition ${active ? "bg-[#17312a] text-white" : "hover:bg-[#eef3ed] hover:text-[#17312a]"}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/poslovi" className="hidden min-h-10 items-center gap-2 rounded-full border border-[#dc5b38]/20 bg-[#fff5f0] px-3.5 text-xs font-bold text-[#a44931] lg:inline-flex">
            Poslovi <span className="rounded-full bg-[#dc5b38] px-1.5 py-0.5 text-[9px] text-white">BETA</span>
          </Link>
          <Link href="/tracker" className="hidden min-h-10 rounded-full border border-[#17312a]/10 bg-white px-3.5 text-xs font-bold text-[#17312a] sm:inline-flex sm:items-center">
            Sačuvano{savedCount > 0 ? ` · ${savedCount}` : ""}
          </Link>
          <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#17312a]/12 bg-white xl:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
            <span className="sr-only">Meni</span><span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-[#17312a]/8 bg-[#fbfcf8] px-5 py-4 xl:hidden" aria-label="Mobilna navigacija">
          <ul className="grid gap-1">
            {LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-[#17312a] hover:bg-[#eef3ed]">{link.label}</Link></li>
            ))}
            <li><Link href="/poslovi" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl bg-[#fff0e9] px-3 text-sm font-semibold text-[#9a432d]"><span>Eksperimentalni oglasi</span><span className="text-[10px] font-bold">BETA</span></Link></li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
