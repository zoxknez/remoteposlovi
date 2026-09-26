"use client";

import { useEffect,useMemo,useState } from "react";
import { addDays,buildFollowUpIcs } from "@/lib/ics";
import { formatDateSr } from "@/lib/format";
import { listTracker,removeTracker,upsertTracker } from "@/lib/storage";
import type { TrackerEntry,TrackerStatus } from "@/types";

const STATUSES:TrackerStatus[]=["saved","applied","interview","offer","rejected","archived"];
const LABEL:Record<TrackerStatus,string>={saved:"Sačuvano",applied:"Prijavljeno",interview:"Intervju",offer:"Ponuda",rejected:"Odbijeno",archived:"Arhivirano"};

function downloadIcs(entry:TrackerEntry,days:number){const followUpAt=addDays(entry.appliedAt?new Date(entry.appliedAt):new Date(),days);const ics=buildFollowUpIcs({title:entry.title,company:entry.company,url:entry.applyUrl,note:entry.note,followUpAt});const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=`follow-up-${entry.company}.ics`;link.click();URL.revokeObjectURL(url);}

export function TrackerBoard(){
 const [items,setItems]=useState<TrackerEntry[]>([]);
 async function reload(){setItems(await listTracker());}
 useEffect(()=>{let c=false;listTracker().then(e=>!c&&setItems(e));return()=>{c=true}},[]);
 const counts=useMemo(()=>Object.fromEntries(STATUSES.map(s=>[s,items.filter(i=>i.status===s).length])) as Record<TrackerStatus,number>,[items]);
 if(!items.length)return <div className="premium-panel py-14 text-center"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#eef3ed] text-2xl">♡</div><h2 className="mt-5 font-serif text-3xl">Tracker je prazan.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#60736b]">Sačuvajte oglas iz eksperimentalnog job feeda. Podaci se čuvaju samo u ovom pregledaču.</p><a href="/poslovi" className="mt-5 inline-flex rounded-full bg-[#17312a] px-5 py-3 text-xs font-bold text-white">Otvori oglase BETA</a></div>;
 return <div className="grid gap-6">
   <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{STATUSES.map(s=><div key={s} className="rounded-2xl border border-[#17312a]/8 bg-white p-4"><strong className="font-serif text-2xl">{counts[s]}</strong><p className="mt-1 text-[10px] font-bold text-[#7a8982]">{LABEL[s]}</p></div>)}</div>
   <div className="grid gap-4">{items.map(entry=><article key={entry.id} className="premium-card p-5 md:p-6">
     <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-[10px] font-bold tracking-[.12em] text-[#dc5b38]">{entry.source}</p><h2 className="mt-2 font-serif text-2xl md:text-3xl">{entry.title}</h2><p className="mt-1 text-sm text-[#60736b]">{entry.company}</p></div><select value={entry.status} onChange={async e=>{const status=e.target.value as TrackerStatus;await upsertTracker({...entry,status,appliedAt:status==="applied"&&!entry.appliedAt?new Date().toISOString():entry.appliedAt});reload();}} className="premium-field max-w-[180px] text-sm" aria-label="Status prijave">{STATUSES.map(s=><option key={s} value={s}>{LABEL[s]}</option>)}</select></div>
     <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
       <label className="text-[10px] font-bold text-[#60736b]">DATUM PRIJAVE<input type="date" value={entry.appliedAt?.slice(0,10)??""} onChange={async e=>{await upsertTracker({...entry,appliedAt:e.target.value?new Date(e.target.value).toISOString():null});reload();}} className="premium-field mt-1.5 font-normal" /></label>
       <label className="text-[10px] font-bold text-[#60736b]">CV VERZIJA<input value={entry.cvVersion} onChange={async e=>{await upsertTracker({...entry,cvVersion:e.target.value})}} onBlur={reload} className="premium-field mt-1.5 font-normal" placeholder="QA-v4.pdf" /></label>
       <label className="text-[10px] font-bold text-[#60736b]">KONTAKT<input value={entry.contactName} onChange={async e=>{await upsertTracker({...entry,contactName:e.target.value})}} className="premium-field mt-1.5 font-normal" /></label>
       <label className="text-[10px] font-bold text-[#60736b]">EMAIL<input type="email" value={entry.contactEmail} onChange={async e=>{await upsertTracker({...entry,contactEmail:e.target.value})}} className="premium-field mt-1.5 font-normal" /></label>
     </div>
     <label className="mt-3 block text-[10px] font-bold text-[#60736b]">NAPOMENA<textarea value={entry.note} onChange={async e=>{await upsertTracker({...entry,note:e.target.value})}} rows={3} className="premium-field mt-1.5 resize-y font-normal" /></label>
     <div className="mt-5 flex flex-wrap gap-2">{[3,5,7,14].map(days=><button key={days} type="button" className="chip" onClick={()=>downloadIcs(entry,days)}>Follow-up +{days}d</button>)}<a href={entry.applyUrl} target="_blank" rel="noreferrer" className="chip">Originalni oglas ↗</a><button type="button" className="chip text-[#8b3f35]" onClick={async()=>{await removeTracker(entry.id);reload();}}>Ukloni</button></div>
     {entry.appliedAt?<p className="mt-4 text-[11px] text-[#7a8982]">Prijavljeno {formatDateSr(entry.appliedAt)}</p>:null}
   </article>)}</div>
 </div>
}
