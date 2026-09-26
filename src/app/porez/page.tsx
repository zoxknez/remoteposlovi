import { TaxCalculator } from "@/components/TaxCalculator";
import { TAX_DEADLINES_2026, TAX_YEAR } from "@/data/tax-2026";
import { getFxRates } from "@/lib/fx";
import { nextTaxDeadline } from "@/lib/tax";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Porez za frilensere 2026", "Informativni freelancer kalkulator sa zvaničnim izvorima i rokovima.", "/porez");

export default async function PorezPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const params=await searchParams; const fx=await getFxRates(); const amount=typeof params.iznos==="string"?Number(params.iznos):undefined; const next=nextTaxDeadline();
  return <main>
    <section className="border-b border-[#17312a]/8 bg-[#e8f1e4]"><div className="mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20"><p className="eyebrow">SRBIJA · {TAX_YEAR}</p><h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-.04em] md:text-7xl">Porez bez Excel akrobatike.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Uporedite dve opcije samooporezivanja freelancera na osnovu parametara iz zvaničnih izvora. Kalkulator je informativan i ne menja zvaničan obračun Poreske uprave.</p>{next?<div className="mt-7 inline-flex rounded-2xl border border-[#17312a]/10 bg-white/80 px-4 py-3 text-sm"><strong>Sledeći rok:</strong><span className="ml-2">{next.quarter} · {next.deadlineLabel}</span></div>:null}</div></section>
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16"><TaxCalculator rsdPerEur={fx.rsdPerEur} rsdPerUsd={fx.rsdPerUsd} fxLabel={`${fx.source} · lista ${fx.publishedOn} · EUR ${fx.rsdPerEur} · USD ${fx.rsdPerUsd}`} defaultAmount={Number.isFinite(amount)?amount:2000} />
      <section className="mt-16"><p className="eyebrow">ROKOVI</p><h2 className="mt-2 font-serif text-4xl">Poreski kalendar</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{TAX_DEADLINES_2026.map(item=><article key={item.quarter} className="premium-card p-6"><div className="flex items-center justify-between"><h3 className="font-serif text-2xl">{item.quarter}</h3><span className="text-[10px] font-bold text-[#dc5b38]">{item.deadlineLabel}</span></div><p className="mt-2 text-sm text-[#60736b]">{item.period}</p><a href={`/api/ics?title=${encodeURIComponent(`Poreska prijava ${item.quarter}`)}&date=${item.deadline}`} className="mt-5 inline-flex min-h-11 items-center rounded-full border border-[#17312a]/12 px-4 text-xs font-bold">Dodaj rok u kalendar ↓</a></article>)}</div></section>
    </div>
  </main>;
}
