import { CountryBadge } from "@/components/CountryBadge";
import { ResourceGrid } from "@/components/ResourceGrid";
import { SalaryCalculator } from "@/components/SalaryCalculator";
import { ALL_SCOPES } from "@/data/countries";
import { RESOURCES } from "@/data/sources";
import { getFxRates } from "@/lib/fx";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Plate i preračun zarade",
  "Preračun satnice u mesečnu i godišnju zaradu u EUR i RSD i izvori podataka o platama za svaku zemlju Balkana.",
  "/plate",
);

export default async function PlatePage() {
  const fx = await getFxRates().catch(() => null);
  const salaryResources = RESOURCES.filter((resource) => resource.type === "salary");
  const byCountry = ALL_SCOPES.map((scope) => ({
    scope,
    items: salaryResources.filter((resource) => resource.country === scope.code),
  })).filter((group) => group.items.length > 0);

  return (
    <main>
      <section className="border-b border-[#17312a]/8 bg-[#f3efe6]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">PLATE</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-.04em] md:text-7xl">
            Koliko je to zapravo?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#665f50]">
            Remote ponude dolaze po satu, mesečno ili godišnje, u EUR ili USD. Preračunajte ih na isti imenitelj, pa
            uporedite sa lokalnim platama iz izvora ispod. Ne izmišljamo tržišni prosek.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
        <SalaryCalculator rsdPerEur={fx?.rsdPerEur ?? null} rsdPerUsd={fx?.rsdPerUsd ?? null} />
        <p className="mt-3 text-xs text-[#7a8982]">
          {fx
            ? `${fx.source}, lista od ${fx.publishedOn}: 1 EUR = ${fx.rsdPerEur} RSD, 1 USD = ${fx.rsdPerUsd} RSD.`
            : "Kurs trenutno nije dostupan, prikazuje se samo izabrana valuta."}
        </p>

        <section className="mt-16" aria-labelledby="izvori-plata">
          <p className="eyebrow">IZVORI PLATA</p>
          <h2 id="izvori-plata" className="mt-3 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            Plate po zemljama
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60736b]">
            Anonimne ankete i prijavljene plate. Nijedan izvor nije savršen, pa uporedite bar dva.
          </p>
          <div className="mt-10 space-y-12">
            {byCountry.map(({ scope, items }) => (
              <div key={scope.code}>
                <h3 className="mb-5 flex items-center gap-3 font-serif text-2xl tracking-[-0.02em]">
                  <CountryBadge code={scope.code} className="size-10 text-xs" />
                  {scope.name}
                </h3>
                <ResourceGrid resources={items} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
