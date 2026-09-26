"use client";

import Link from "next/link";
import { useMemo,useState } from "react";
import { RESOURCES } from "@/data/sources";
import { filtersToQuery } from "@/lib/jobs/filters";
import type { JobCategory,Resource } from "@/types";

const AREAS:Array<{id:JobCategory|"all";label:string}>=[
  {id:"engineering",label:"IT / Engineering"},{id:"qa",label:"QA"},{id:"design",label:"Dizajn"},
  {id:"marketing",label:"Marketing"},{id:"support",label:"Podrška"},{id:"sales",label:"Prodaja"},
  {id:"writing",label:"Pisanje"},{id:"teaching",label:"Podučavanje"},{id:"ai",label:"AI"},
  {id:"administration",label:"Administracija"},{id:"all",label:"Još birate"},
];

export function Wizard(){
  const [area,setArea]=useState<JobCategory|"all">("all");
  const [experience,setExperience]=useState<"junior"|"mid"|"senior">("mid");
  const [place,setPlace]=useState<"serbia"|"europe"|"worldwide">("serbia");
  const [type,setType]=useState<"full-time"|"freelance"|"contract">("full-time");

  const sources:Resource[]=useMemo(()=>RESOURCES.filter(r=>{
    if(r.section==="Poslovi"&&type!=="full-time")return false;
    if(type==="freelance"&&r.section!=="Freelance"&&r.section!=="Karijera"&&r.section!=="Poslovanje")return false;
    if(place==="serbia"&&r.serbiaSupport==="not-supported")return false;
    if(experience==="junior"&&r.juniorFriendly===false)return false;
    if(area!=="all"&&r.categories.length&&!r.categories.includes(area)&&!r.categories.includes("other"))return r.featured;
    return r.section!=="Poslovi";
  }).sort((a,b)=>Number(b.featured)-Number(a.featured)).slice(0,8),[area,experience,place,type]);

  const jobsQuery=filtersToQuery({
    category:area==="all"?"all":area,
    junior:experience==="junior",
    serbiaOnly:place==="serbia",
    location:place==="europe"?"europe":place==="worldwide"?"worldwide":undefined,
    type
  });

  const groups=[
    {title:"Oblast",subtitle:"Šta želite da radite?",items:AREAS,value:area,set:(v:string)=>setArea(v as typeof area)},
    {title:"Iskustvo",subtitle:"Koji nivo vam je realan?",items:[{id:"junior",label:"Početnik / junior"},{id:"mid",label:"Mid"},{id:"senior",label:"Senior"}],value:experience,set:(v:string)=>setExperience(v as typeof experience)},
    {title:"Lokacija",subtitle:"Odakle želite da radite?",items:[{id:"serbia",label:"Srbija"},{id:"europe",label:"Evropa / EMEA"},{id:"worldwide",label:"Worldwide"}],value:place,set:(v:string)=>setPlace(v as typeof place)},
    {title:"Angažman",subtitle:"Koji model rada tražite?",items:[{id:"full-time",label:"Full-time"},{id:"contract",label:"Contract"},{id:"freelance",label:"Freelance"}],value:type,set:(v:string)=>setType(v as typeof type)},
  ];

  return <div className="grid gap-8">
    <section className="premium-panel relative overflow-hidden p-5 md:p-7">
      <div className="absolute -right-20 -top-20 size-56 rounded-full border-[36px] border-[#eef3ed]" aria-hidden />
      <div className="relative grid gap-4 lg:grid-cols-2">
        {groups.map((g,index)=><fieldset key={g.title} className="rounded-[1.35rem] border border-[#17312a]/8 bg-white/82 p-5 shadow-[0_10px_28px_rgba(23,49,42,.035)]">
          <legend className="sr-only">{g.title}</legend>
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#17312a] text-[10px] font-bold text-white">0{index+1}</span>
            <div><h2 className="font-serif text-2xl tracking-[-0.02em]">{g.title}</h2><p className="mt-1 text-xs text-[#7a8982]">{g.subtitle}</p></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">{g.items.map((item:any)=><button key={item.id} type="button" onClick={()=>g.set(item.id)} className={`chip ${g.value===item.id?"chip-active":""}`}>{item.label}</button>)}</div>
        </fieldset>)}
      </div>
    </section>

    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow">PREPORUČENI IZVORI</p><h2 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Od ovoga možete da krenete.</h2></div>
        <Link href="/izvori" className="text-xs font-bold text-[#dc5b38]">Cela baza →</Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sources.map((source,index)=><a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[1.45rem] border border-[#17312a]/8 bg-white/95 p-5 shadow-[0_14px_34px_rgba(23,49,42,.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(23,49,42,.08)]">
          <div className="absolute -right-10 -top-10 size-24 rounded-full border-[16px] border-[#f3f6f2]" aria-hidden />
          <div className="relative flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#eef3ed] px-3 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#426052]">{source.section}</span>
            <span className="grid size-8 place-items-center rounded-full border border-[#17312a]/8 text-xs text-[#7e8c85] transition group-hover:text-[#dc5b38]">{String(index+1).padStart(2,"0")}</span>
          </div>
          <h3 className="relative mt-5 font-serif text-2xl tracking-[-0.025em]">{source.name}</h3>
          <p className="relative mt-2 text-sm leading-6 text-[#60736b]">{source.description}</p>
          <div className="relative mt-5 flex items-center justify-between border-t border-[#17312a]/7 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#8a9690]">{source.label}</span>
            <span className="text-xs font-bold text-[#17312a]">Otvorite ↗</span>
          </div>
        </a>)}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#dc5b38]/14 bg-[#fff5f0] p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><span className="rounded-full bg-[#dc5b38] px-2.5 py-1 text-[9px] font-bold text-white">BETA</span><p className="mt-3 text-sm leading-6 text-[#765f57]">Ako želite, isti profil možete da primenite i na eksperimentalni feed oglasa.</p></div>
          <Link href={`/poslovi?${jobsQuery}`} className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">Prikažite oglase →</Link>
        </div>
      </div>
    </section>
  </div>
}
