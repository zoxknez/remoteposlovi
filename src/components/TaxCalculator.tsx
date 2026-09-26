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
    <section className="premium-panel relative overflow-hidden p-5 md:p-7">
      <div className="absolute -right-14 -top-14 size-44 rounded-full border-[28px] border-[#eef3ed]" aria-hidden />
      <div className="relative">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div><p className="eyebrow">PARAMETRI</p><h2 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Unesite prihod i status osiguranja</h2></div>
          <p className="max-w-sm text-right text-[10px] leading-5 text-[#7a8982]">{fxLabel}</p>
        </div>
        <div className="mt-6 grid gap-4 rounded-[1.35rem] border border-[#17312a]/8 bg-white/80 p-4 md:grid-cols-4">
          <label className="text-[10px] font-bold uppercase tracking-[.11em] text-[#65766e]">Prihod<input type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} className="premium-field mt-2 font-normal normal-case tracking-normal" /></label>
          <label className="text-[10px] font-bold uppercase tracking-[.11em] text-[#65766e]">Valuta<select value={currency} onChange={e=>setCurrency(e.target.value as typeof currency)} className="premium-field mt-2 font-normal normal-case tracking-normal"><option>EUR</option><option>USD</option><option>RSD</option></select></label>
          <label className="text-[10px] font-bold uppercase tracking-[.11em] text-[#65766e]">Period<select value={period} onChange={e=>setPeriod(e.target.value as typeof period)} className="premium-field mt-2 font-normal normal-case tracking-normal"><option value="monthly">Mesečno</option><option value="quarterly">Kvartalno</option></select></label>
          <label className="text-[10px] font-bold uppercase tracking-[.11em] text-[#65766e]">Zdravstveno<select value={insured?"yes":"no"} onChange={e=>setInsured(e.target.value==="yes")} className="premium-field mt-2 font-normal normal-case tracking-normal"><option value="yes">Osiguran po drugom osnovu</option><option value="no">Nije osiguran po drugom osnovu</option></select></label>
        </div>
      </div>
    </section>

    {result ? <div className="grid gap-5 lg:grid-cols-2">
      {[result.option1,result.option2].map((option,index)=><section key={option.option} className={`group relative overflow-hidden rounded-[1.7rem] border bg-white p-6 shadow-[0_18px_46px_rgba(23,49,42,.05)] md:p-7 ${result.cheaper===option.option?"border-[#6b9877]/30 ring-1 ring-[#6b9877]/12":"border-[#17312a]/8"}`}>
        <div className="absolute -right-16 -top-16 size-44 rounded-full border-[28px] border-[#f1f5ef]" aria-hidden />
        <div className="relative flex items-start justify-between gap-4">
          <div><span className="grid size-10 place-items-center rounded-2xl bg-[#17312a] text-[10px] font-bold text-white">0{index+1}</span><p className="mt-5 text-[10px] font-bold uppercase tracking-[.13em] text-[#dc5b38]">{option.option}</p><h3 className="mt-2 font-serif text-3xl tracking-[-0.025em]">{option.name}</h3></div>
          {result.cheaper===option.option?<span className="rounded-full bg-[#e5f0df] px-3 py-1.5 text-[10px] font-bold text-[#35624a]">NIŽE OPTEREĆENJE</span>:null}
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#17312a]/7 bg-[#f7f9f5] p-4"><p className="text-[9px] font-bold uppercase tracking-[.11em] text-[#7a8982]">Ukupno obaveze</p><strong className="mt-2 block font-serif text-2xl">{formatMoneyRsd(option.total)}</strong></div>
          <div className="rounded-2xl border border-[#17312a]/7 bg-[#eef4ec] p-4"><p className="text-[9px] font-bold uppercase tracking-[.11em] text-[#6b7f73]">Ostaje posle obaveza</p><strong className="mt-2 block font-serif text-2xl text-[#315a43]">{formatMoneyRsd(option.net)}</strong></div>
        </div>
        <dl className="relative mt-5 grid gap-1 text-sm">
          {[["Kvartalni bruto",option.gross],["Normirani troškovi",option.standardizedCosts],["Poreska osnovica",option.taxableBase],["Porez",option.tax],["PIO",option.pio],["Zdravstvo",option.health]].map(([label,value])=><div key={String(label)} className="flex justify-between gap-4 border-b border-[#17312a]/6 py-2.5"><dt className="text-[#60736b]">{label}</dt><dd className="font-semibold">{formatMoneyRsd(Number(value))}</dd></div>)}
          <div className="flex justify-between rounded-xl bg-[#fff3ed] px-3 py-2.5"><dt className="font-bold">Efektivno opterećenje</dt><dd className="font-bold text-[#b64e35]">{formatPercent(option.effectiveRate)}</dd></div>
        </dl>
      </section>)}
    </div>:null}

    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
      <div className="rounded-[1.25rem] border border-[#dc5b38]/12 bg-[#fff5f0] p-5 text-sm leading-6 text-[#765f57]"><strong className="text-[#9b4933]">Važno:</strong> {TAX_DISCLAIMER}</div>
      <div className="flex flex-wrap gap-2 lg:justify-end">{TAX_SOURCES.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="chip">Izvor: {s.label} ↗</a>)}</div>
    </div>
  </div>;
}
