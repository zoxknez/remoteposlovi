import Link from "next/link";
import { CountryBadge } from "@/components/CountryBadge";
import { BALKAN_COUNTRIES } from "@/data/countries";
import { KOFI_URL, PAYPAL_URL } from "@/lib/support";

const COLUMNS: Array<{ title: string; links: Array<[string, string]> }> = [
  {
    title: "Navigacija",
    links: [
      ["/izvori", "Baza servisa"],
      ["/zemlje", "Zemlje"],
      ["/wizard", "Gde da krenete?"],
      ["/vodici", "Vodiči"],
      ["/privatnost", "Privatnost"],
    ],
  },
  {
    title: "Alati",
    links: [
      ["/alati", "CV i prijava"],
      ["/porez", "Porezi"],
      ["/plate", "Plate"],
      ["/provera-oglasa", "Provera oglasa"],
      ["/tracker", "Tracker"],
    ],
  },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#7fa091]">{children}</p>;
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[#17312a]/8 bg-[#17312a] px-5 pb-28 pt-12 text-left md:pb-10 text-[#dce7e1] md:px-12 md:pt-16">
      <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full border-[42px] border-white/[0.025]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border-[48px] border-white/[0.025]" aria-hidden />

      <div className="relative mx-auto max-w-[1540px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/8 pb-10 lg:grid-cols-[1.4fr_.7fr_.7fr_1.3fr] lg:gap-x-8">
          <section className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-[1rem] bg-[#28483f] font-serif text-lg text-[#e7f0df]">R</span>
              <span className="flex flex-col leading-tight">
                <strong className="text-base text-white">Remote poslovi</strong>
                <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#7fa091]">Balkan · remote</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#afc2b9]">
              Kurirana baza servisa za remote rad, freelance, poreze, plate i karijeru za ljude sa Balkana. Ne
              objavljujemo oglase, nego vodimo do servisa koji ih imaju.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold text-[#c9d8d1]">
              {["190+ servisa", "8 zemalja regiona", "Bez obaveznog naloga"].map((item) => (
                <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{item}</li>
              ))}
            </ul>
          </section>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <ColumnTitle>{column.title}</ColumnTitle>
              <ul className="mt-3 grid gap-0.5">
                {column.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="inline-flex min-h-10 items-center text-sm font-medium text-[#dce7e1] underline-offset-4 transition hover:text-white hover:underline hover:decoration-[#dc5b38]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section className="col-span-2 grid content-start gap-3 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
            <div className="sm:col-span-2 lg:col-span-1">
              <ColumnTitle>Podrška i kontakt</ColumnTitle>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 text-lg" aria-hidden>☕</span>
                <div>
                  <p className="text-sm font-bold text-white">Sajt vam je koristan?</p>
                  <p className="mt-1 text-xs leading-5 text-[#a9beb4]">Možete da podržite projekat preko PayPal-a ili Ko-fi-ja.</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={PAYPAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#ffc439] px-3 text-xs font-bold text-[#17312a] shadow-[0_8px_18px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:bg-[#ffd166]"
                >
                  PayPal <span aria-hidden>↗</span>
                </a>
                <a
                  href={KOFI_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#ff5e5b] px-3 text-xs font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:bg-[#ff7a77]"
                >
                  Ko-fi <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">Pitanja ili dopuna sadržaja?</p>
                <p className="mt-1 text-xs leading-5 text-[#a9beb4]">Pitanja, ispravke i predlozi novih servisa.</p>
              </div>
              <a
                href="https://x.com/KoronVirus"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-white px-4 text-xs font-bold text-[#17312a] transition hover:bg-[#e7f0df]"
              >
                @KoronVirus ↗
              </a>
            </div>
          </section>
        </div>

        <nav aria-label="Zemlje" className="border-b border-white/8 py-8">
          <ColumnTitle>Zemlje</ColumnTitle>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-wrap">
            {BALKAN_COUNTRIES.map((country) => (
              <li key={country.code}>
                <Link
                  href={`/zemlje/${country.slug}`}
                  className="flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3.5 text-xs font-semibold leading-tight text-[#c9d8d1] transition hover:bg-white/10 hover:text-white"
                >
                  <CountryBadge code={country.code} className="size-7 text-[9px]" />
                  <span className="min-w-0">{country.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 pt-6 text-[11px] leading-5 text-[#8fa99d] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Remote poslovi. Kurirana baza se proverava i dopunjava ručno i automatski.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Uslove i dostupnost proverite kod servisa.</span>
            <span className="text-[#c7d6cf]">Ažurirano: novembar 2026.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
