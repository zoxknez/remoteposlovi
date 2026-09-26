import Link from "next/link";

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
              Kurirana baza resursa za remote rad, freelance, učenje, poslovanje, sigurnost i karijeru, sa fokusom na Srbiju.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">122+ resursa</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">Bez obaveznog naloga</span>
            </div>
          </div>

          <nav className="grid content-start gap-3 text-xs font-semibold" aria-label="Podnožje">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Navigacija</p>
            <Link href="/izvori" className="transition hover:text-white">Baza resursa</Link>
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
            <Link href="/wizard" className="transition hover:text-white">Gde da krenem?</Link>
            <Link href="/poslovi" className="transition hover:text-white">Poslovi BETA</Link>
          </nav>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Podrži projekat</p>
            <div className="mt-3 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 text-lg" aria-hidden>☕</span>
                <div>
                  <p className="text-sm font-bold text-white">Sajt ti je koristan?</p>
                  <p className="mt-1 text-xs leading-5 text-[#a9beb4]">Možeš da častiš kafu preko PayPal-a ili Ko-fi-ja.</p>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-4 text-[#79978a]">Dugme za podršku nalazi se u donjem desnom uglu.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[11px] leading-5 text-[#8fa99d] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Remote poslovi. Kurirana baza se proverava i dopunjava ručno i automatski.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Live oglasi su eksperimentalni.</span>
            <span className="text-[#c7d6cf]">Ažurirano: septembar 2026.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
