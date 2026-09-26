import Link from "next/link";
import { EligibilityBadge } from "@/components/EligibilityBadge";
import { SaveJobButton } from "@/components/SaveJobButton";
import { CATEGORY_LABELS, EMPLOYMENT_LABELS, SENIORITY_LABELS } from "@/lib/classify";
import { formatRelativeSr } from "@/lib/format";
import { formatSalaryRange } from "@/lib/salary";
import type { NormalizedJob } from "@/types";

export function JobCard({ job, seen }: { job: NormalizedJob; seen?: boolean }) {
  const salary = formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod);
  return (
    <article className="flex min-h-[250px] flex-col justify-between rounded-lg border border-[#17312a]/10 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-[#17312a]/30 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <EligibilityBadge status={job.serbiaEligibility} reasons={job.eligibilityReasons} />
            {job.remoteMode === "fully-remote" ? (
              <span className="rounded-full bg-[#edf3eb] px-2.5 py-1 text-[10px] font-bold text-[#486256]">
                Fully remote
              </span>
            ) : null}
            {!seen ? (
              <span className="rounded-full bg-[#dc5b38] px-2.5 py-1 text-[10px] font-bold text-white">NOVO</span>
            ) : null}
          </div>
          <SaveJobButton job={job} />
        </div>
        <h3 className="mt-5 font-serif text-xl text-[#17312a]">
          <Link href={`/poslovi/${job.slug}`} className="hover:text-[#dc5b38]">
            {job.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#426052]">{job.company}</p>
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#60736b]">
          <span>{SENIORITY_LABELS[job.seniority]}</span>
          <span>{EMPLOYMENT_LABELS[job.employmentType]}</span>
          <span>{CATEGORY_LABELS[job.category]}</span>
          {salary ? <span>{salary}</span> : null}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#17312a]/10 pt-4 text-xs text-[#7c8c84]">
        <span>
          Objave: {formatRelativeSr(job.publishedAt)} · Izvor: {job.sources.join(" + ")}
        </span>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-[#dc5b38]"
        >
          Pogledaj oglas ↗
        </a>
      </div>
    </article>
  );
}
