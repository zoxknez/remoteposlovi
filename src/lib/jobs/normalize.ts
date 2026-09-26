import { classifyCategory, classifyEmployment, classifySeniority, isJuniorFriendly } from "@/lib/classify";
import { classifySerbiaEligibility } from "@/lib/eligibility";
import { canonicalizeUrl, normalizeCompany, normalizeTitle, slugify, stripHtml, truncate } from "@/lib/html";
import { parseSalary } from "@/lib/salary";
import { parseTimezoneWindow } from "@/lib/timezone";
import type { JobSourceName, NormalizedJob, RemoteMode } from "@/types";

export interface RawJob {
  source: JobSourceName;
  sourceId: string;
  sourceUrl: string;
  applyUrl: string;
  company: string;
  title: string;
  descriptionHtml?: string;
  location?: string;
  candidateRequiredLocation?: string;
  salaryRaw?: string;
  categoryRaw?: string;
  jobTypeRaw?: string;
  publishedAt?: string | null;
  expiresAt?: string | null;
}

export function normalizeJob(raw: RawJob, fetchedAt: string): NormalizedJob {
  const description = truncate(stripHtml(raw.descriptionHtml ?? ""), 4000);
  const location = raw.candidateRequiredLocation || raw.location || "";
  const eligibility = classifySerbiaEligibility({
    location: raw.location,
    candidateRequiredLocation: raw.candidateRequiredLocation,
    title: raw.title,
    description,
  });
  const salary = parseSalary(raw.salaryRaw);
  const seniority = classifySeniority(raw.title, description);
  const category = classifyCategory(raw.title, description, raw.categoryRaw);
  const employmentType = classifyEmployment(raw.jobTypeRaw, `${raw.title} ${description}`);
  const timezone = parseTimezoneWindow(`${location} ${description} ${raw.title}`);
  const sourceId = String(raw.sourceId);
  const slug = `${slugify(raw.title) || "oglas"}-${raw.source}-${sourceId}`;
  const remoteMode: RemoteMode = /hybrid/i.test(`${location} ${raw.title}`)
    ? "hybrid"
    : /remote|worldwide|anywhere/i.test(`${location} ${raw.title}`)
      ? "fully-remote"
      : "fully-remote";

  return {
    id: `${raw.source}-${sourceId}`,
    slug,
    source: raw.source,
    sourceId,
    sourceUrl: raw.sourceUrl,
    applyUrl: raw.applyUrl || raw.sourceUrl,
    canonicalUrl: canonicalizeUrl(raw.applyUrl || raw.sourceUrl),
    company: raw.company.trim(),
    companyNormalized: normalizeCompany(raw.company),
    title: raw.title.trim(),
    titleNormalized: normalizeTitle(raw.title),
    description,
    location: location.trim(),
    remoteScope: eligibility.remoteScope,
    eligibleCountries: eligibility.eligibleCountries,
    serbiaEligibility: eligibility.status,
    eligibilityReasons: eligibility.reasons,
    salaryMin: salary.min,
    salaryMax: salary.max,
    salaryCurrency: salary.currency,
    salaryPeriod: salary.period,
    salaryRaw: raw.salaryRaw?.trim() || null,
    category,
    seniority,
    employmentType,
    remoteMode,
    timezone,
    publishedAt: raw.publishedAt ?? null,
    fetchedAt,
    expiresAt: raw.expiresAt ?? null,
    lastCheckedAt: fetchedAt,
    status: "ACTIVE",
    sources: [raw.source],
    sourceUrls: { [raw.source]: raw.sourceUrl },
    juniorFriendly: isJuniorFriendly(seniority, category, raw.title),
  };
}
