"use client";

import { useState } from "react";
import { checkScamSignals, SCAM_OFFICIAL_LINKS } from "@/lib/scam";

export function ScamChecker() {
  const [url,setUrl]=useState(""); const [text,setText]=useState(""); const result=checkScamSignals({url,text}); const hasInput=Boolean(url.trim()||text.trim());
  return <div className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
    <section className="premium-panel relative overflow-hidden p-5 md:p-7">
      <div className="absolute -right-14 -top-14 size-36 rounded-full border-[22px] border-[#f1f4ef]" aria-hidden /><div className="relative flex items-center justify-between"><div><p className="eyebrow">ULAZ</p><h2 className="mt-2 font-serif text-3xl">Oglas ili poruka</h2></div>{hasInput?<button type="button" onClick={()=>{setUrl("");setText("");}} className="chip">Očistite</button>:null}</div>
      <label className="mt-6 block text-xs font-bold text-[#52675f]">URL oglasa<input value={url} onChange={e=>setUrl(e.target.value)} className="premium-field mt-1.5 font-normal" placeholder="https://" /></label>
      <label className="mt-4 block text-xs font-bold text-[#52675f]">Tekst oglasa ili poruke<textarea value={text} onChange={e=>setText(e.target.value)} rows={11} className="premium-field mt-1.5 resize-y font-normal" placeholder="Nalepite tekst. Provera ostaje u pregledaču." /></label>
      <p className="relative mt-4 rounded-xl bg-[#f7f9f5] p-3 text-[11px] leading-5 text-[#7a8982]">Ne šaljemo tekst na server i ne donosimo konačan sud da je oglas prevara ili legitiman.</p>
    </section>
    <section className="premium-panel relative overflow-hidden p-5 md:p-7">
      <div className="absolute -right-14 -top-14 size-36 rounded-full border-[22px] border-[#fff0ea]" aria-hidden /><div className="relative"><p className="eyebrow">REZULTAT</p>
      <h2 className="mt-2 font-serif text-3xl">{hasInput?result.summary:"Unesite URL ili tekst za lokalnu proveru."}</h2>
      {hasInput&&result.signals.length>0?<div className="mt-6 grid gap-3">{result.signals.map((signal,index)=><div key={signal.id} className="rounded-2xl border border-[#dc5b38]/12 bg-[#fff5f0] p-4"><div className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#dc5b38] text-[10px] font-bold text-white">{index+1}</span><div><strong className="text-sm">{signal.title}</strong><p className="mt-1 text-sm leading-6 text-[#6e5d56]">{signal.detail}</p></div></div></div>)}</div>:hasInput?<div className="mt-6 rounded-2xl bg-[#eef3ed] p-5 text-sm leading-6 text-[#52675f]">Nisu pronađeni signali koje lokalni parser trenutno prepoznaje. To nije potvrda da je oglas legitiman. Proverite career stranicu, domen i način komunikacije.</div>:<div className="mt-6 grid gap-3 text-sm text-[#60736b]"><p>Provera traži konkretne obrasce poput uplate unapred, kripta, gift kartica, čekova, “task job” šema i sumnjivog kanala komunikacije.</p></div>}
      <div className="mt-8 border-t border-[#17312a]/8 pt-5"><p className="text-[10px] font-bold tracking-[.12em] text-[#7a8982]">ZVANIČNI I KORISNI IZVORI</p><div className="mt-3 flex flex-wrap gap-2">{SCAM_OFFICIAL_LINKS.map(link=><a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="chip">{link.label} ↗</a>)}</div></div>
    </div></section>
  </div>;
}
