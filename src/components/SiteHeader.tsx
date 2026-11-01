"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CountryBadge } from "@/components/CountryBadge";
import { Icon, type IconName } from "@/components/Icon";
import { BALKAN_COUNTRIES } from "@/data/countries";
import { getSavedResources, listTracker } from "@/lib/storage";

const LINKS: Array<{ href: string; label: string; text: string; icon: IconName }> = [
  { href: "/izvori", label: "Baza servisa", text: "Svih 190 servisa", icon: "grid" },
  { href: "/zemlje", label: "Zemlje", text: "8 zemalja regiona", icon: "globe" },
  { href: "/wizard", label: "Gde da krenete", text: "Tri pitanja do servisa", icon: "compass" },
  { href: "/alati", label: "CV i prijava", text: "Prompt studio i ATS", icon: "file" },
  { href: "/porez", label: "Porez", text: "Kalkulator i rokovi", icon: "calculator" },
  { href: "/plate", label: "Plate", text: "Preračun i izvori", icon: "trend" },
  { href: "/vodici", label: "Vodiči", text: "Praktični tekstovi", icon: "book" },
  { href: "/tracker", label: "Tracker", text: "Vaše prijave", icon: "kanban" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

  useEffect(() => {
    if (!open) return;
    // Dok je meni otvoren, stranica ispod se ne skroluje; Escape ga zatvara.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Otvoren meni ide iznad plutajućeg Support dugmeta (z-50). */}
      <header className={`sticky top-0 border-b border-[#17312a]/7 bg-[#fbfcf8]/90 shadow-[0_8px_30px_rgba(23,49,42,0.035)] backdrop-blur-2xl ${open ? "z-[70]" : "z-40"}`}>
        <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#17312a] focus:px-4 focus:py-2 focus:text-white">
          Preskočite na sadržaj
        </a>
        <div className="mx-auto flex h-[72px] max-w-[1540px] items-center justify-between gap-3 px-4 sm:px-5 md:px-12">
          <Link href="/" onClick={close} className="group flex min-h-11 min-w-0 items-center gap-2.5 text-sm font-bold text-[#17312a] sm:gap-3">
            <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[1rem] bg-[#17312a] font-serif text-lg text-[#e7f0df] shadow-[0_8px_18px_rgba(23,49,42,.14)]">
              R
              <span className="absolute -bottom-3 -right-3 size-8 rounded-full border-[6px] border-white/10" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate tracking-[-0.01em]">Remote poslovi</span>
              <span className="truncate text-[10px] font-semibold uppercase tracking-[.12em] text-[#8a9690]">Balkan · remote</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[#17312a]/8 bg-white/80 p-1.5 text-xs text-[#60736b] shadow-[0_8px_22px_rgba(23,49,42,.035)] xl:flex" aria-label="Glavna navigacija">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-2.5 font-semibold transition ${isActive(pathname, link.href) ? "bg-[#17312a] text-white shadow-[0_6px_14px_rgba(23,49,42,.12)]" : "hover:bg-[#eef3ed] hover:text-[#17312a]"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/tracker"
              onClick={close}
              aria-label={`Sačuvano${savedCount > 0 ? `: ${savedCount}` : ""}`}
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-[#17312a]/9 bg-white px-3 text-xs font-bold text-[#17312a] shadow-[0_6px_16px_rgba(23,49,42,.04)] sm:px-3.5"
            >
              <span aria-hidden className={savedCount > 0 ? "text-[#dc5b38]" : "text-[#60736b]"}>
                <Icon name="heart" className="size-4" />
              </span>
              <span className="hidden sm:inline">Sačuvano</span>
              {savedCount > 0 ? (
                <span className="grid min-w-5 place-items-center rounded-full bg-[#dc5b38] px-1.5 text-[10px] leading-5 text-white">{savedCount}</span>
              ) : null}
            </Link>
            <button
              type="button"
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-xs font-bold shadow-[0_6px_16px_rgba(23,49,42,.04)] transition xl:hidden ${open ? "border-[#17312a] bg-[#17312a] text-white" : "border-[#17312a]/10 bg-white text-[#17312a]"}`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3 w-4" aria-hidden>
                <span className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition duration-200 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-[5px] h-0.5 w-4 rounded-full bg-current transition duration-200 ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition duration-200 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
              </span>
              {open ? "Zatvorite" : "Meni"}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Mobilna navigacija"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-[#17312a]/8 bg-[#fbfcf8] px-4 pb-8 pt-4 shadow-[0_28px_60px_rgba(23,49,42,.18)] sm:px-5 md:max-h-[calc(100dvh-72px)] md:px-12 xl:hidden"
          >
            <div className="mx-auto max-w-3xl">
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={`flex h-full min-h-[92px] flex-col justify-between rounded-[1.15rem] border p-3.5 transition ${active ? "border-[#17312a] bg-[#17312a] text-white shadow-[0_12px_26px_rgba(23,49,42,.18)]" : "border-[#17312a]/8 bg-white text-[#17312a] shadow-[0_8px_20px_rgba(23,49,42,.04)] active:scale-[.98]"}`}
                      >
                        <span className={`grid size-9 place-items-center rounded-xl ${active ? "bg-white/12 text-white" : "bg-[#eef3ed] text-[#2f5245]"}`}>
                          <Icon name={link.icon} className="size-[18px]" />
                        </span>
                        <span className="mt-3">
                          <span className="block text-sm font-bold leading-tight">{link.label}</span>
                          <span className={`mt-0.5 block text-[11px] leading-4 ${active ? "text-white/70" : "text-[#7a8982]"}`}>{link.text}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[.13em] text-[#7b8982]">Brzo do zemlje</p>
              <ul className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {BALKAN_COUNTRIES.map((country) => (
                  <li key={country.code}>
                    <Link
                      href={`/zemlje/${country.slug}`}
                      onClick={close}
                      className="flex min-h-11 items-center gap-2 rounded-full border border-[#17312a]/8 bg-white py-1 pl-1 pr-3 text-xs font-semibold leading-tight text-[#17312a] transition active:scale-[.98]"
                    >
                      <CountryBadge code={country.code} className="size-8 text-[9px]" />
                      <span className="min-w-0">{country.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-3 rounded-[1.15rem] bg-[#17312a] p-4 text-white">
                <div className="min-w-0">
                  <p className="text-sm font-bold">Pitanja ili dopuna?</p>
                  <p className="mt-0.5 text-[11px] text-white/65">Pišite, odgovaram na X-u.</p>
                </div>
                <a
                  href="https://x.com/KoronVirus"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-white px-4 text-xs font-bold text-[#17312a]"
                >
                  @KoronVirus ↗
                </a>
              </div>
            </div>
          </nav>
        ) : null}
      </header>
      {open ? (
        <button
          type="button"
          aria-label="Zatvorite meni"
          tabIndex={-1}
          onClick={close}
          className="fixed inset-0 z-[65] bg-[#17312a]/25 backdrop-blur-[2px] xl:hidden"
        />
      ) : null}
    </>
  );
}
