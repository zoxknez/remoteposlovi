import Link from "next/link";
import { CountryBadge } from "@/components/CountryBadge";
import { DirectoryExplorer } from "@/components/DirectoryExplorer";
import { JsonLd } from "@/components/JsonLd";
import { BALKAN_COUNTRIES } from "@/data/countries";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Remote rad sa Balkana",
  "Provereni servisi za remote posao iz Srbije, Hrvatske, BiH, Crne Gore, Severne Makedonije, Slovenije, Kosova i Albanije: oglasnici, freelance platforme, zavodi, porezi, plate i alati.",
  "/",
);

const TOOL_SUITE = [
  { href: "/alati", title: "CV i prijava", text: "Prompt studio + provereni CV/ATS resursi." },
  { href: "/porez", title: "Porezi", text: "Kalkulator za Srbiju i zvanični poreski portali regiona." },
  { href: "/plate", title: "Plate", text: "Preračun satnice u mesečno i godišnje i izvori plata po zemljama." },
  { href: "/provera-oglasa", title: "Provera oglasa", text: "Lokalna provera rizičnih signala, bez lažnog scam score-a." },
  { href: "/tracker", title: "Tracker", text: "Sačuvano, prijavljeno, intervju, ponuda i follow-up." },
  { href: "/wizard", title: "Gde da krenete?", text: "Kratak vodič do najrelevantnijih izvora za vaš profil." },
];

function StatIcon({ type }: { type: "book" | "eye" | "file" | "gift" | "code" | "pin" }) {
  const paths = {
    book: <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v15H7.5A3.5 3.5 0 0 0 4 20.5V5.5Zm16 0A3.5 3.5 0 0 0 16.5 2H12v15h4.5A3.5 3.5 0 0 1 20 20.5V5.5Z" />,
    eye: <><path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" /><circle cx="12" cy="12" r="2.5" /></>,
    file: <><path d="M7 2.5h7l4 4V21H7V2.5Z" /><path d="M14 2.5V7h4M10 12h5M10 16h5" /></>,
    gift: <><rect x="4" y="9" width="16" height="11" rx="2" /><path d="M12 9v11M3.5 9h17V6.5h-17V9Zm8.5-2.5c-1.7 0-4-.7-4-2.5 0-1 .8-1.8 1.9-1.8 1.6 0 2.1 2 2.1 4.3Zm0 0c1.7 0 4-.7 4-2.5 0-1-.8-1.8-1.9-1.8-1.6 0-2.1 2-2.1 4.3Z" /></>,
    code: <><path d="m8 7-4 5 4 5M16 7l4 5-4 5M14 4l-4 16" /></>,
    pin: <><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
  } as const;

  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[type]}
    </svg>
  );
}

export default function Home() {
  const official = RESOURCES.filter((item) => item.official).length;
  const free = RESOURCES.filter((item) => item.pricing === "free").length;
  const open = RESOURCES.filter((item) => item.openSource).length;
  const local = RESOURCES.filter((item) => item.country !== "eu" && item.country !== "global").length;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Remote Poslovi",
          description: "Kurirana baza servisa za remote rad i freelance za ljude sa Balkana.",
        }}
      />

      <section className="relative overflow-hidden border-b border-[#17312a]/8 bg-[#e8f1e4]">
        <div className="absolute -left-24 -top-32 size-[34rem] rounded-full bg-white/45 blur-3xl" />
        <div className="absolute -bottom-40 right-0 size-[32rem] rounded-full bg-[#d8e6d1]/70 blur-3xl" />
        <div className="relative mx-auto grid min-h-[430px] max-w-[1540px] items-center gap-8 px-5 py-10 md:px-12 md:py-12 lg:grid-cols-[1.16fr_.84fr]">
          <div>
            <p className="eyebrow">REMOTE RAD · BALKAN · 2026</p>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[0.98] tracking-[-0.045em] text-[#17312a] md:text-6xl">
              Remote rad sa Balkana
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#52675f]">
              Kurirana baza servisa za posao, freelance, poreze, plate i alate, za osam zemalja regiona i ceo svet.
              Izaberete servis i idete direktno kod njih.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#directory" className="inline-flex min-h-12 items-center rounded-full bg-[#17312a] px-6 text-sm font-bold text-white transition hover:bg-[#244239]">
                Istražite bazu
              </a>
              <Link href="/wizard" className="inline-flex min-h-12 items-center rounded-full border border-[#17312a]/14 bg-white/80 px-6 text-sm font-bold text-[#17312a]">
                Gde da krenete?
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {BALKAN_COUNTRIES.map((country) => (
                <Link
                  key={country.code}
                  href={`/zemlje/${country.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#17312a]/10 bg-white/75 py-1 pl-1 pr-3.5 text-xs font-bold text-[#17312a] transition hover:border-[#17312a]/25 hover:bg-white"
                >
                  <CountryBadge code={country.code} className="size-7 text-[9px]" />
                  {country.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/70 bg-white/72 p-2.5 shadow-[0_22px_60px_rgba(23,49,42,0.10)] backdrop-blur-xl md:p-3">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {[
                { value: RESOURCES.length, label: "ukupno servisa", icon: "book" as const, tone: "from-[#f4f9f2] to-[#eef5eb]", accent: "bg-[#e5f0df] text-[#1f5a3b]" },
                { value: local, label: "lokalnih servisa", icon: "eye" as const, tone: "from-[#fffdf8] to-[#f8f3e9]", accent: "bg-[#f5eddf] text-[#6f5b34]" },
                { value: official, label: "zvaničnih izvora", icon: "file" as const, tone: "from-[#fffdf9] to-[#f7f4ec]", accent: "bg-[#eef2e9] text-[#45614f]" },
                { value: free, label: "potpuno besplatnih", icon: "gift" as const, tone: "from-[#f3f9f2] to-[#eaf4e8]", accent: "bg-[#e2efdf] text-[#24593d]" },
                { value: open, label: "open-source alata", icon: "code" as const, tone: "from-[#f2f8f1] to-[#eaf3e8]", accent: "bg-[#e1eddd] text-[#22563a]" },
                { value: BALKAN_COUNTRIES.length, label: "zemalja regiona", icon: "pin" as const, tone: "from-[#fffdf8] to-[#f8f2e8]", accent: "bg-[#f3eadc] text-[#6a5736]" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`group relative min-h-[116px] overflow-hidden rounded-[1.25rem] border border-[#17312a]/8 bg-gradient-to-br ${item.tone} p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(23,49,42,0.07)] md:min-h-[128px] md:p-4.5`}
                >
                  <div className="absolute -bottom-10 -right-8 size-24 rounded-full border-[16px] border-white/35" aria-hidden />
                  <div className="absolute right-5 top-4 size-2.5 rounded-full bg-[#c9dcbf]/75 opacity-80" aria-hidden />
                  <div className="relative flex h-full items-start justify-between gap-4">
                    <div className="flex min-h-full flex-col justify-between">
                      <strong className="font-serif text-4xl leading-none tracking-[-0.05em] text-[#17312a] md:text-5xl">
                        {item.value}
                      </strong>
                      <p className="mt-3 max-w-[12rem] text-xs font-medium leading-5 text-[#4f655d] md:text-sm">
                        {item.label}
                      </p>
                    </div>
                    <div className={`grid size-11 shrink-0 place-items-center rounded-xl border border-white/70 shadow-[0_8px_18px_rgba(23,49,42,0.05)] ${item.accent}`}>
                      <StatIcon type={item.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
        <section className="mt-4">

          <DirectoryExplorer resources={RESOURCES} />
        </section>

        <section className="mt-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">UGRAĐENI ALATI</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] md:text-5xl">Mali alati koji rešavaju konkretan problem.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#60736b]">
              Sve je napravljeno da radi bez naloga kad god je moguće. Osetljivi tekstovi i tracker ostaju u pregledaču.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_SUITE.map((item, index) => (
              <Link key={item.href} href={item.href} className="group relative overflow-hidden rounded-[1.6rem] border border-[#17312a]/8 bg-white/94 p-6 shadow-[0_16px_38px_rgba(23,49,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_24px_54px_rgba(23,49,42,0.09)]">
                <div className="absolute -right-12 -top-12 size-32 rounded-full border-[20px] border-[#f2f5f1]" aria-hidden />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#17312a] text-xs font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                  <span className="grid size-10 place-items-center rounded-full border border-[#17312a]/8 bg-white text-[#7f8d86] transition group-hover:text-[#dc5b38]">↗</span>
                </div>
                <div className="relative mt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#dc5b38]">Ugrađeni alat</p>
                  <h3 className="mt-2 font-serif text-[2rem] leading-[1.05] tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 min-h-[52px] text-[15px] leading-7 text-[#60736b]">{item.text}</p>
                </div>
                <div className="relative mt-6 flex items-center justify-between border-t border-[#17312a]/8 pt-4">
                  <span className="text-xs font-semibold text-[#6a7a73]">Bez naloga kad je moguće</span>
                  <span className="text-xs font-bold text-[#17312a] transition group-hover:translate-x-1 group-hover:text-[#dc5b38]">Otvorite →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24 overflow-hidden rounded-[1.5rem] border border-[#dc5b38]/16 bg-[#fff5f0]">
          <div className="grid gap-6 p-6 md:p-9 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#dc5b38] px-3 py-1 text-[10px] font-bold tracking-[.12em] text-white">KONTAKT</span>
              <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] md:text-4xl">Pitanje, ispravka ili novi servis?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#765f57]">
                Ako imate pitanje, primetili ste netačan podatak ili znate koristan servis iz vaše zemlje, pišite na X.
                Za predlog pošaljite link i kratak opis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="https://x.com/KoronVirus"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center rounded-full bg-[#17312a] px-6 text-sm font-bold text-white transition hover:bg-[#244239]"
              >
                Pišite na X · @KoronVirus
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
