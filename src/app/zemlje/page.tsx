import Link from "next/link";
import { CountryBadge } from "@/components/CountryBadge";
import { Icon } from "@/components/Icon";
import { BALKAN_COUNTRIES } from "@/data/countries";
import { resourcesByCountry } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Zemlje regiona",
  "Servisi za posao i remote rad za Srbiju, Hrvatsku, BiH, Crnu Goru, Severnu Makedoniju, Sloveniju, Kosovo i Albaniju.",
  "/zemlje",
);

export default function ZemljePage() {
  return (
    <main className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16">
      <p className="eyebrow">BALKAN</p>
      <h1 className="mt-2 max-w-3xl font-serif text-5xl tracking-[-0.03em] md:text-6xl">Servisi po zemljama</h1>
      <p className="mt-4 max-w-2xl text-[#52675f]">
        Za svaku zemlju: najveći portali za posao, zavod za zapošljavanje, poreski portal, podaci o platama i lokalne
        zajednice. Globalne platforme su u direktorijumu.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {BALKAN_COUNTRIES.map((country) => {
          const items = resourcesByCountry(country.code);
          return (
            <Link
              key={country.code}
              href={`/zemlje/${country.slug}`}
              className="group relative flex gap-5 overflow-hidden rounded-[1.65rem] border border-[#17312a]/8 bg-white p-6 shadow-[0_16px_40px_rgba(23,49,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_26px_58px_rgba(23,49,42,.09)]"
            >
              <CountryBadge code={country.code} className="size-14 text-base" />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <strong className="font-serif text-2xl font-normal text-[#17312a] group-hover:text-[#dc5b38]">
                    {country.name}
                  </strong>
                  <span className="text-sm font-semibold tabular-nums text-[#8a9891]">{items.length} servisa</span>
                </span>
                <span className="mt-1 block text-sm leading-6 text-[#60736b]">{country.intro}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#dc5b38]">
                  Otvorite <Icon name="arrow" className="size-4" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
