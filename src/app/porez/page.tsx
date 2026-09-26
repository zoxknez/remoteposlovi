import { TaxCalculator } from "@/components/TaxCalculator";
import { TAX_DEADLINES_2026, TAX_DISCLAIMER, TAX_YEAR } from "@/data/tax-2026";
import { formatDateSr } from "@/lib/format";
import { getFxRates } from "@/lib/fx";
import { nextTaxDeadline } from "@/lib/tax";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Porez za frilensere 2026",
  "Informativni obračun samooporezivanja za 2026. prema portalu Frilenseri i važećim propisima. Konačan obračun je na Poreskoj upravi.",
  "/porez",
);

export default async function PorezPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const fx = await getFxRates();
  const amount = typeof params.iznos === "string" ? Number(params.iznos) : undefined;
  const next = nextTaxDeadline();

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Porez za frilensere, {TAX_YEAR}.</h1>
      <p className="mt-4 max-w-2xl text-[#52675f]">
        Dve opcije samooporezivanja sa portala Frilenseri. Parametri su provereni 26. septembra 2026. na
        zvaničnom FAQ-u Poreske uprave.
      </p>
      {next ? (
        <p className="mt-4 rounded-lg bg-[#e5f0df] p-4 font-semibold">
          Sledeći poreski rok: {next.quarter} do {next.deadlineLabel} ({next.period})
        </p>
      ) : null}
      <div className="mt-8">
        <TaxCalculator
          rsdPerEur={fx.rsdPerEur}
          rsdPerUsd={fx.rsdPerUsd}
          fxLabel={`${fx.source}. Lista formirana ${fx.publishedOn}. EUR ${fx.rsdPerEur}, USD ${fx.rsdPerUsd}.`}
          defaultAmount={Number.isFinite(amount) ? amount : 2000}
        />
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl">Poreski kalendar</h2>
        <p className="mt-2 text-sm text-[#52675f]">
          Rok je 30 dana od isteka kvartala, prema FAQ portala Frilenseri. Za 2026. navedeni su sva četiri roka.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {TAX_DEADLINES_2026.map((item) => (
            <article key={item.quarter} className="rounded-lg border border-[#17312a]/10 bg-white p-5">
              <h3 className="font-bold">{item.quarter}</h3>
              <p className="text-sm">{item.period}</p>
              <p className="text-sm">Rok: {item.deadlineLabel}</p>
              <a
                href={`/api/ics?title=${encodeURIComponent(`Poreska prijava ${item.quarter}`)}&date=${item.deadline}`}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-[#dc5b38]"
              >
                Dodaj u kalendar
              </a>
            </article>
          ))}
        </div>
      </section>
      <p className="mt-8 text-sm text-[#7c8c84]">
        {TAX_DISCLAIMER} Ažurirano {formatDateSr("2026-09-26")}.
      </p>
    </main>
  );
}
