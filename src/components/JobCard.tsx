import Link from "next/link";
import { EligibilityBadge } from "@/components/EligibilityBadge";
import { SaveJobButton } from "@/components/SaveJobButton";
import { CATEGORY_LABELS, EMPLOYMENT_LABELS, SENIORITY_LABELS } from "@/lib/classify";
import { formatRelativeSr } from "@/lib/format";
import { formatSalaryRange } from "@/lib/salary";
import type { NormalizedJob } from "@/types";

export function JobCard({ job, seen }: { job: NormalizedJob; seen?: boolean }) {
  const salary = formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod);
  return <article className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border border-[#17312a]/8 bg-white/95 p-5 text-left shadow-[0_14px_34px_rgba(23,49,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_22px_48px_rgba(23,49,42,0.08)]">
    <div className="absolute -right-12 -top-12 size-28 rounded-full border-[18px] border-[#f3f6f2]" aria-hidden/>
    <div className="relative flex items-start justify-between gap-3"><div className="flex flex-wrap gap-2"><EligibilityBadge status={job.serbiaEligibility} reasons={job.eligibilityReasons}/>{job.remoteMode==="fully-remote"?<span className="rounded-full bg-[#edf3eb] px-3 py-1 text-[10px] font-bold text-[#486256]">Fully remote</span>:null}{!seen?<span className="rounded-full bg-[#dc5b38] px-3 py-1 text-[10px] font-bold text-white">NOVO</span>:null}</div><SaveJobButton job={job}/></div>
    <div className="relative mt-6"><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8a9790]">{CATEGORY_LABELS[job.category]}</p><h3 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.025em] text-[#17312a]"><Link href={`/poslovi/${job.slug}`} className="transition hover:text-[#dc5b38]">{job.title}</Link></h3><p className="mt-2 text-sm font-semibold text-[#426052]">{job.company}</p></div>
    <div className="relative mt-5 flex flex-wrap gap-2"><span className="rounded-full bg-[#f6f8f4] px-3 py-1.5 text-[10px] font-medium text-[#60736b]">{SENIORITY_LABELS[job.seniority]}</span><span className="rounded-full bg-[#f6f8f4] px-3 py-1.5 text-[10px] font-medium text-[#60736b]">{EMPLOYMENT_LABELS[job.employmentType]}</span>{salary?<span className="rounded-full bg-[#fff3ed] px-3 py-1.5 text-[10px] font-bold text-[#9a5038]">{salary}</span>:null}</div>
    <div className="relative mt-auto pt-6"><div className="flex items-center justify-between gap-4 border-t border-[#17312a]/8 pt-4"><div className="text-[11px] leading-5 text-[#7c8c84]"><p>{formatRelativeSr(job.publishedAt)}</p><p>{job.sources.join(" + ")}</p></div><a href={job.applyUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-xl bg-[#17312a] px-4 text-xs font-bold text-white transition hover:bg-[#244239]">Pogledajte ↗</a></div></div>
  </article>;
}