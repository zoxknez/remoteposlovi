"use client";

import { useEffect,useMemo,useState } from "react";
import { addDays,buildFollowUpIcs } from "@/lib/ics";
import { formatDateSr } from "@/lib/format";
import { listTracker,removeTracker,upsertTracker } from "@/lib/storage";
import type { TrackerEntry,TrackerStatus } from "@/types";

const STATUSES:TrackerStatus[]=["saved","applied","interview","offer","rejected","archived"];
const LABEL:Record<TrackerStatus,string>={saved:"Sačuvano",applied:"Prijavljeno",interview:"Intervju",offer:"Ponuda",rejected:"Odbijeno",archived:"Arhivirano"};

function downloadIcs(entry:TrackerEntry,days:number){
  const followUpAt=addDays(entry.appliedAt?new Date(entry.appliedAt):new Date(),days);
  const ics=buildFollowUpIcs({title:entry.title,company:entry.company,url:entry.applyUrl,note:entry.note,followUpAt});
  const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;link.download=`follow-up-${entry.company}.ics`;link.click();URL.revokeObjectURL(url);
}

export function TrackerBoard(){
  const [items,setItems]=useState<TrackerEntry[]>([]);
  async function reload(){setItems(await listTracker());}
  useEffect(()=>{let c=false;listTracker().then(e=>!c&&setItems(e));return()=>{c=true}},[]);
  const counts=useMemo(()=>Object.fromEntries(STATUSES.map(s=>[s,items.filter(i=>i.status===s).length])) as Record<TrackerStatus,number>,[items]);

  if(!items.length)return <div className="premium-panel relative overflow-hidden py-16 text-center">
    <div className="absolute -right-16 -top-16 size-48 rounded-full border-[30px] border-[#eef3ed]" aria-hidden />
    <div className="relative mx-auto grid size-16 place-items-center rounded-[1.4rem] bg-[#17312a] text-2xl text-white">♡</div>
    <h2 className="relative mt-5 font-serif text-3xl">Tracker je prazan.</h2>
    <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-[#60736b]">Sačuvajte oglas iz eksperimentalnog feeda. Podaci ostaju samo u ovom pregledaču.</p>
    <a href="/poslovi" className="relative mt-6 inline-flex rounded-full bg-[#17312a] px-5 py-3 text-xs font-bold text-white">Otvorite oglase BETA</a>
  </div>;

  return <div className="grid gap-7">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {STATUSES.map((s,index)=><div key={s} className="relative overflow-hidden rounded-[1.2rem] border border-[#17312a]/8 bg-white p-4 shadow-[0_10px_26px_rgba(23,49,42,.035)]">
        <div className="absolute -right-6 -top-6 size-16 rounded-full border-[10px] border-[#f3f6f2]" aria-hidden />
        <span className="relative text-[9px] font-bold tracking-[.13em] text-[#dc5b38]">0{index+1}</span>
        <strong className="relative mt-2 block font-serif text-3xl">{counts[s]}</strong>
        <p className="relative mt-1 text-[10px] font-bold text-[#7a8982]">{LABEL[s]}</p>
      </div>)}
    </div>

    <div className="grid gap-5">{items.map(entry=><article key={entry.id} className="group relative overflow-hidden rounded-[1.6rem] border border-[#17312a]/8 bg-white p-5 shadow-[0_16px_42px_rgba(23,49,42,.05)] md:p-6">
      <div className="absolute -right-14 -top-14 size-36 rounded-full border-[22px] border-[#f3f6f2]" aria-hidden />
      <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#dc5b38]">{entry.source}</p><h2 className="mt-2 font-serif text-3xl tracking-[-0.025em]">{entry.title}</h2><p className="mt-1 text-sm font-semibold text-[#52675f]">{entry.company}</p></div>
        <select value={entry.status} onChange={async e=>{const status=e.target.value as TrackerStatus;await upsertTracker({...entry,status,appliedAt:status==="applied"&&!entry.appliedAt?new Date().toISOString():entry.appliedAt});reload();}} className="premium-field max-w-[190px] text-sm" aria-label="Status prijave">
          {STATUSES.map(s=><option key={s} value={s}>{LABEL[s]}</option>)}
        </select>
      </div>

      <div className="relative mt-6 grid gap-3 rounded-[1.25rem] border border-[#17312a]/7 bg-[#f8faf7] p-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-[9px] font-bold uppercase tracking-[.11em] text-[#60736b]">Datum prijave<input type="date" value={entry.appliedAt?.slice(0,10)??""} onChange={async e=>{await upsertTracker({...entry,appliedAt:e.target.value?new Date(e.target.value).toISOString():null});reload();}} className="premium-field mt-2 font-normal normal-case tracking-normal" /></label>
        <label className="text-[9px] font-bold uppercase tracking-[.11em] text-[#60736b]">CV verzija<input value={entry.cvVersion} onChange={async e=>{await upsertTracker({...entry,cvVersion:e.target.value})}} onBlur={reload} className="premium-field mt-2 font-normal normal-case tracking-normal" placeholder="QA-v4.pdf" /></label>
        <label className="text-[9px] font-bold uppercase tracking-[.11em] text-[#60736b]">Kontakt<input value={entry.contactName} onChange={async e=>{await upsertTracker({...entry,contactName:e.target.value})}} className="premium-field mt-2 font-normal normal-case tracking-normal" /></label>
        <label className="text-[9px] font-bold uppercase tracking-[.11em] text-[#60736b]">Email<input type="email" value={entry.contactEmail} onChange={async e=>{await upsertTracker({...entry,contactEmail:e.target.value})}} className="premium-field mt-2 font-normal normal-case tracking-normal" /></label>
      </div>

      <label className="relative mt-4 block text-[9px] font-bold uppercase tracking-[.11em] text-[#60736b]">Napomena<textarea value={entry.note} onChange={async e=>{await upsertTracker({...entry,note:e.target.value})}} rows={3} className="premium-field mt-2 resize-y font-normal normal-case tracking-normal" /></label>

      <div className="relative mt-5 flex flex-wrap gap-2 border-t border-[#17312a]/7 pt-5">
        {[3,5,7,14].map(days=><button key={days} type="button" className="chip" onClick={()=>downloadIcs(entry,days)}>Follow-up +{days}d</button>)}
        <a href={entry.applyUrl} target="_blank" rel="noreferrer" className="chip">Originalni oglas ↗</a>
        <button type="button" className="chip text-[#8b3f35]" onClick={async()=>{await removeTracker(entry.id);reload();}}>Uklonite</button>
      </div>
      {entry.appliedAt?<p className="relative mt-4 text-[11px] text-[#7a8982]">Prijavljeno {formatDateSr(entry.appliedAt)}</p>:null}
    </article>)}</div>
  </div>
}
