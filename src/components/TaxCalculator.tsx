"use client";

import { useMemo, useState } from "react";
import { TAX_DISCLAIMER, TAX_SOURCES } from "@/data/tax-2026";
import { formatMoneyRsd, formatPercent } from "@/lib/format";
import { calculateFreelancerTax } from "@/lib/tax";

export function TaxCalculator({ rsdPerEur, rsdPerUsd, fxLabel, defaultAmount }: { rsdPerEur:number; rsdPerUsd:number; fxLabel:string; defaultAmount?:number }) {
  const [amount,setAmount]=useState(String(defaultAmount ?? 2000));
  const [currency,setCurrency]=useState<"RSD"|"EUR"|"USD">("EUR");
  const [period,setPeriod]=useState<"monthly"|"quarterly">("monthly");
  const [insured,setInsured]=useState(true);
  const result=useMemo(()=>{const numeric=Number(amount.replace(",",".")); if(!Number.isFinite(numeric)||numeric<0)return null; return calculateFreelancerTax({amount:numeric,currency,period,insuredElsewhere:insured,rsdPerEur,rsdPerUsd});},[amount,currency,period,insured,rsdPerEur,rsdPerUsd]);

  return <div className="grid gap-6">
    <div className="premium-panel p-5 md:p-7">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="text-xs font-bold text-[#52675f]">Prihod<input type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} className="premium-field mt-1.5 font-normal" /></label>
        <label className="text-xs font-bold text-[#52675f]">Valuta<select value={currency} onChange={e=>setCurrency(e.target.value as typeof currency)} className="premium-field mt-1.5 font-normal"><option>EUR</option><option>USD</option><option>RSD</option></select></label>
        <label className="text-xs font-bold text-[#52675f]">Period<select value={period} onChange={e=>setPeriod(e.target.value as typeof period)} className="premium-field mt-1.5 font-normal"><option value="monthly">Mesečno</option><option value="quarterly">Kvartalno</option></select></label>
        <label className="text-xs font-bold text-[#52675f]">Zdravstveno<select value={insured?"yes":"no"} onChange={e=>setInsured(e.target.value==="yes")} className="premium-field mt-1.5 font-normal"><option value="yes">Osiguran po drugom osnovu</option><option value="no">Nije osiguran po drugom osnovu</option></select></label>
      </div>
      <p className="mt-4 text-[11px] leading-5 text-[#7a8982]">{fxLabel}</p>
    </div>

    {result ? <div className="grid gap-4 lg:grid-cols-2">
      {[result.option1,result.option2].map(option=><section key={option.option} className={`premium-card p-6 md:p-7 ${result.cheaper===option.option?"ring-1 ring-[#17312a]/20":""}`}>
        <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.13em] text-[#dc5b38]">{option.option.toUpperCase()}</p><h3 className="mt-2 font-serif text-3xl">{option.name}</h3></div>{result.cheaper===option.option?<span className="rounded-full bg-[#e5f0df] px-3 py-1 text-[10px] font-bold text-[#35624a]">NIŽE OPTEREĆENJE</span>:null}</div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#f5f7f3] p-4"><p className="text-[10px] font-bold text-[#7a8982]">UKUPNO OBAVEZE</p><strong className="mt-1 block text-xl">{formatMoneyRsd(option.total)}</strong></div>
          <div className="rounded-xl bg-[#f5f7f3] p-4"><p className="text-[10px] font-bold text-[#7a8982]">OSTAJE POSLE OBAVEZA</p><strong className="mt-1 block text-xl">{formatMoneyRsd(option.net)}</strong></div>
        </div>
        <dl className="mt-5 grid gap-2 text-sm">
          {[["Kvartalni bruto",option.gross],["Normirani troškovi",option.standardizedCosts],["Poreska osnovica",option.taxableBase],["Porez",option.tax],["PIO",option.pio],["Zdravstvo",option.health]].map(([label,value])=><div key={String(label)} className="flex justify-between gap-4 border-b border-[#17312a]/6 py-2"><dt className="text-[#60736b]">{label}</dt><dd className="font-semibold">{formatMoneyRsd(Number(value))}</dd></div>)}
          <div className="flex justify-between pt-2"><dt className="font-bold">Efektivno opterećenje</dt><dd className="font-bold text-[#dc5b38]">{formatPercent(option.effectiveRate)}</dd></div>
        </dl>
      </section>)}
    </div>:null}

    <div className="rounded-2xl border border-[#17312a]/8 bg-[#f6f8f4] p-5 text-sm leading-6 text-[#60736b]"><strong className="text-[#17312a]">Važno:</strong> {TAX_DISCLAIMER}</div>
    <div className="flex flex-wrap gap-2">{TAX_SOURCES.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="chip">Izvor: {s.label} ↗</a>)}</div>
  </div>;
}
