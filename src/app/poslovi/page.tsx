import { Suspense } from "react";
import { JobFilters } from "@/components/JobFilters";
import { JobsWithSeen } from "@/components/JobsWithSeen";
import { SavedSearchButton } from "@/components/SavedSearchButton";
import { emptyStateHint,filterJobs,parseJobFilters } from "@/lib/jobs/filters";
import { getJobFeed } from "@/lib/jobs/aggregate";
import { formatDateTimeSr } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

export const metadata=pageMeta("Eksperimentalni remote oglasi","Eksperimentalna agregacija javnih remote oglasa sa filterima za Srbiju.","/poslovi");
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const resolved=await searchParams;const params=new URLSearchParams();for(const [k,v] of Object.entries(resolved))if(typeof v==="string")params.set(k,v);const filters=parseJobFilters(params);const feed=await getJobFeed().catch(()=>({jobs:[],meta:{fetchedAt:new Date().toISOString(),sources:[]}}));const jobs=filterJobs(feed.jobs,filters);const failed=feed.meta.sources.filter(s=>!s.ok);const hints=jobs.length===0?emptyStateHint(filters):[];
 return <main><section className="border-b border-[#dc5b38]/14 bg-[#fff5f0]"><div className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16"><span className="inline-flex rounded-full bg-[#dc5b38] px-3 py-1 text-[10px] font-bold tracking-[.12em] text-white">EKSPERIMENTALNO · BETA</span><h1 className="mt-4 max-w-5xl font-serif text-5xl tracking-[-.04em] md:text-7xl">Live oglasi su dodatak, ne srž baze.</h1><p className="mt-5 max-w-3xl text-base leading-7 text-[#765f57]">Agregacija koristi javne feedove i heurističku klasifikaciju dostupnosti iz Srbije. Geografiju, platu i status uvek proverite na originalnom oglasu pre prijave.</p><p className="mt-3 text-xs text-[#92776e]">Osveženo: {formatDateTimeSr(feed.meta.fetchedAt)}</p></div></section><div className="mx-auto max-w-[1540px] px-5 py-10 md:px-12 md:py-14">
   {failed.length?<div className="mb-6 rounded-2xl border border-[#dc5b38]/12 bg-[#fff5f0] p-4 text-sm text-[#765f57]">Jedan ili više izvora trenutno nisu osveženi: {failed.map(i=>i.name).join(", ")}.</div>:null}
   <div className="premium-panel p-5 md:p-6"><Suspense><JobFilters /></Suspense></div>
   <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold">{jobs.length} oglasa</p><Suspense><SavedSearchButton currentCount={jobs.length} /></Suspense></div>
   <div className="mt-6">{jobs.length===0?<div className="premium-panel p-8"><h2 className="font-serif text-2xl">Nema rezultata za ovu kombinaciju.</h2><ul className="mt-3 list-disc pl-5 text-sm leading-6 text-[#60736b]">{hints.map(h=><li key={h}>{h}</li>)}</ul></div>:<JobsWithSeen jobs={jobs} hideSeen={filters.hideSeen} />}</div>
 </div></main>
}
