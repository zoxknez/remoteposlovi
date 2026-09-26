import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EligibilityBadge } from "@/components/EligibilityBadge";
import { JsonLd } from "@/components/JsonLd";
import { SalaryConversion } from "@/components/SalaryConversion";
import { SaveJobButton } from "@/components/SaveJobButton";
import { SeenMarker } from "@/components/SeenMarker";
import { TimezonePanel } from "@/components/TimezonePanel";
import { CATEGORY_LABELS, EMPLOYMENT_LABELS, SENIORITY_LABELS } from "@/lib/classify";
import { eligibilityHelp } from "@/lib/eligibility";
import { formatDateTimeSr, formatRelativeSr } from "@/lib/format";
import { getFxRates } from "@/lib/fx";
import { getJobBySlug } from "@/lib/jobs/aggregate";
import { annualizeSalary } from "@/lib/salary";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Oglas nije pronađen" };
  const salary =
    job.salaryMin || job.salaryMax
      ? `${job.salaryCurrency ?? ""} ${job.salaryMin ?? ""}-${job.salaryMax ?? ""}`.trim()
      : "";
  const title = `${job.title} - ${job.company}`;
  const description = [job.title, job.company, job.location, salary].filter(Boolean).join(". ");
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/poslovi/${job.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/poslovi/${job.slug}`,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const [job, fx] = await Promise.all([getJobBySlug(slug), getFxRates().catch(() => null)]);
  if (!job) notFound();

  const annual =
    job.salaryMin != null
      ? annualizeSalary(job.salaryMin, job.salaryPeriod)
      : job.salaryMax != null
        ? annualizeSalary(job.salaryMax, job.salaryPeriod)
        : null;

  const jobPosting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.title,
    datePosted: job.publishedAt ?? job.fetchedAt,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocationType: "TELECOMMUTE",
    url: `${SITE_URL}/poslovi/${job.slug}`,
    directApply: false,
    employmentType:
      job.employmentType === "full-time"
        ? "FULL_TIME"
        : job.employmentType === "part-time"
          ? "PART_TIME"
          : job.employmentType === "internship"
            ? "INTERN"
            : "CONTRACTOR",
  };
  if (job.expiresAt) jobPosting.validThrough = job.expiresAt;
  if (annual && job.salaryCurrency) {
    jobPosting.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salaryCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin ?? annual,
        maxValue: job.salaryMax ?? annual,
        unitText: "YEAR",
      },
    };
  }
  if (job.serbiaEligibility === "CONFIRMED_SERBIA") {
    jobPosting.applicantLocationRequirements = { "@type": "Country", name: "Serbia" };
  }

  const companyQuery = encodeURIComponent(job.company);

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:px-12">
      <SeenMarker ids={[job.id]} />
      <JsonLd data={jobPosting} />
      <Link href="/poslovi" className="text-sm font-bold text-[#dc5b38]">
        ← Svi poslovi
      </Link>
      <div className="mt-4 flex flex-wrap gap-2">
        <EligibilityBadge status={job.serbiaEligibility} reasons={job.eligibilityReasons} />
        <span className="rounded-full bg-[#edf3eb] px-2.5 py-1 text-[10px] font-bold">
          {job.remoteMode === "fully-remote" ? "Fully remote" : "Hybrid"}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl">{job.title}</h1>
          <p className="mt-2 text-lg font-semibold">{job.company}</p>
        </div>
        <SaveJobButton job={job} />
      </div>
      <p className="mt-4 text-sm text-[#60736b]">
        {SENIORITY_LABELS[job.seniority]} · {EMPLOYMENT_LABELS[job.employmentType]} · {CATEGORY_LABELS[job.category]}
      </p>
      <p className="mt-2 text-sm text-[#7c8c84]">
        Objavljeno: {formatRelativeSr(job.publishedAt)} · Provereno: {formatDateTimeSr(job.lastCheckedAt)} · Izvor:{" "}
        {job.sources.join(" + ")}
      </p>
      <p className="mt-4 rounded-lg bg-[#f3f7f0] p-4 text-sm">
        <strong>Zašto ova oznaka?</strong> {job.eligibilityReasons[0] ?? eligibilityHelp(job.serbiaEligibility)}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-sm font-bold text-white"
        >
          Pogledaj oglas
        </a>
        <Link href="/tracker" className="inline-flex min-h-11 items-center rounded-full border border-[#17312a]/20 px-5 text-sm font-bold">
          Otvori tracker
        </Link>
      </div>
      {fx ? <div className="mt-6"><SalaryConversion job={job} fx={fx} /></div> : null}
      <div className="mt-4">
        <TimezonePanel window={job.timezone} />
      </div>
      <section className="mt-6 rounded-lg border border-[#17312a]/10 bg-white p-5">
        <h2 className="font-serif text-xl">Proveri kompaniju</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          <li>
            <a className="text-[#dc5b38]" href={`https://www.google.com/search?q=${companyQuery}+official+website`} target="_blank" rel="noreferrer">
              Pretraga zvaničnog sajta
            </a>
          </li>
          <li>
            <a className="text-[#dc5b38]" href={`https://www.linkedin.com/search/results/companies/?keywords=${companyQuery}`} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="text-[#dc5b38]" href={`https://www.glassdoor.com/Search/results.htm?keyword=${companyQuery}`} target="_blank" rel="noreferrer">
              Glassdoor
            </a>
          </li>
          <li>
            <a className="text-[#dc5b38]" href={`https://joberty.com/search?q=${companyQuery}`} target="_blank" rel="noreferrer">
              Joberty
            </a>
          </li>
          <li>
            <a className="text-[#dc5b38]" href={`https://www.crunchbase.com/textsearch?q=${companyQuery}`} target="_blank" rel="noreferrer">
              Crunchbase
            </a>
          </li>
          <li>
            <a className="text-[#dc5b38]" href={`https://github.com/search?q=${companyQuery}&type=users`} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-[#7c8c84]">
          Linkovi vode na pretragu, ne na potvrđen profil. Ne dodeljujemo trust score.
        </p>
      </section>
      {job.description ? (
        <section className="mt-6">
          <h2 className="font-serif text-xl">Opis</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#52675f]">{job.description}</p>
        </section>
      ) : null}
    </main>
  );
}


