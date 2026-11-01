import Link from "next/link";
import { CountryBadge } from "@/components/CountryBadge";
import { BALKAN_COUNTRIES } from "@/data/countries";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[#17312a]/8 bg-[#17312a] px-5 py-10 text-[#dce7e1] md:px-12 md:py-12">
      <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full border-[42px] border-white/[0.025]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border-[48px] border-white/[0.025]" aria-hidden />

      <div className="relative mx-auto max-w-[1540px]">
        <div className="grid gap-10 border-b border-white/8 pb-9 md:grid-cols-[1.35fr_.7fr_.75fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="logo-icon grid size-10 place-items-center rounded-full bg-[#28483f] text-[#e7f0df]">R</span>
              <strong className="text-white">Remote poslovi</strong>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#afc2b9]">
              Kurirana baza servisa za remote rad, freelance, poreze, plate i karijeru za ljude sa Balkana. Ne objavljujemo oglase, nego vodimo do servisa koji ih imaju.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">190+ servisa</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">8 zemalja regiona</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">Bez obaveznog naloga</span>
            </div>
          </div>

          <nav className="grid content-start gap-3 text-xs font-semibold" aria-label="Podnožje">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Navigacija</p>
            <Link href="/izvori" className="transition hover:text-white">Baza servisa</Link>
            <Link href="/zemlje" className="transition hover:text-white">Zemlje</Link>
            <Link href="/alati" className="transition hover:text-white">CV i prijava</Link>
            <Link href="/porez" className="transition hover:text-white">Porezi</Link>
            <Link href="/vodici" className="transition hover:text-white">Vodiči</Link>
            <Link href="/privatnost" className="transition hover:text-white">Privatnost</Link>
          </nav>

          <nav className="grid content-start gap-3 text-xs font-semibold" aria-label="Korisni alati">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Alati</p>
            <Link href="/provera-oglasa" className="transition hover:text-white">Provera oglasa</Link>
            <Link href="/tracker" className="transition hover:text-white">Tracker</Link>
            <Link href="/plate" className="transition hover:text-white">Plate</Link>
            <Link href="/wizard" className="transition hover:text-white">Gde da krenete?</Link>
          </nav>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Podrži projekat</p>
            <div className="mt-3 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 text-lg" aria-hidden>☕</span>
                <div>
                  <p className="text-sm font-bold text-white">Sajt vam je koristan?</p>
                  <p className="mt-1 text-xs leading-5 text-[#a9beb4]">Možete da podržite projekat preko PayPal-a ili Ko-fi-ja.</p>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-4 text-[#79978a]">Dugme za podršku nalazi se u donjem desnom uglu.</p>
            </div>
            <div className="mt-3 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <p className="text-sm font-bold text-white">Pitanja ili dopuna sadržaja?</p>
              <p className="mt-1 text-xs leading-5 text-[#a9beb4]">Pitanja, ispravke i predlozi novih servisa:</p>
              <a
                href="https://x.com/KoronVirus"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-10 items-center rounded-full bg-white px-4 text-xs font-bold text-[#17312a] transition hover:bg-[#e7f0df]"
              >
                Pišite na X · @KoronVirus
              </a>
            </div>
          </div>
        </div>

        <nav aria-label="Zemlje" className="flex flex-wrap gap-2 border-b border-white/8 py-6">
          {BALKAN_COUNTRIES.map((country) => (
            <Link
              key={country.code}
              href={`/zemlje/${country.slug}`}
              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-[11px] font-semibold text-[#c9d8d1] transition hover:bg-white/10 hover:text-white"
            >
              <CountryBadge code={country.code} className="size-6 text-[8px]" />
              {country.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 pt-6 text-[11px] leading-5 text-[#8fa99d] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Remote poslovi. Kurirana baza se proverava i dopunjava ručno i automatski.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Uslove i dostupnost proverite kod servisa.</span>
            <span className="text-[#c7d6cf]">Ažurirano: novembar 2026.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
