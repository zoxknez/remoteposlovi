import { isSerbiaLikely } from "@/lib/eligibility";
import { cetCompatibility } from "@/lib/timezone";
import type { JobFilters, NormalizedJob } from "@/types";

export function parseJobFilters(searchParams: URLSearchParams): JobFilters {
  const bool = (key: string) => searchParams.get(key) === "1" || searchParams.get(key) === "true";
  return {
    q: searchParams.get("q") ?? undefined,
    location: (searchParams.get("lokacija") as JobFilters["location"]) ?? undefined,
    serbiaOnly: searchParams.has("srbija") ? bool("srbija") : true,
    category: (searchParams.get("oblast") as JobFilters["category"]) ?? "all",
    seniority: (searchParams.get("senioritet") as JobFilters["seniority"]) ?? "all",
    type: (searchParams.get("tip") as JobFilters["type"]) ?? "all",
    remote: (searchParams.get("remote") as JobFilters["remote"]) ?? "all",
    salaryOnly: bool("plata"),
    timezone: (searchParams.get("zona") as JobFilters["timezone"]) ?? "any",
    posted: (searchParams.get("datum") as JobFilters["posted"]) ?? "all",
    hideSeen: bool("sakrij"),
    junior: bool("pocetnik"),
  };
}

export function filtersToQuery(filters: JobFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.location) params.set("lokacija", filters.location);
  if (filters.serbiaOnly === false) params.set("srbija", "0");
  if (filters.category && filters.category !== "all") params.set("oblast", filters.category);
  if (filters.seniority && filters.seniority !== "all") params.set("senioritet", filters.seniority);
  if (filters.type && filters.type !== "all") params.set("tip", filters.type);
  if (filters.remote && filters.remote !== "all") params.set("remote", filters.remote);
  if (filters.salaryOnly) params.set("plata", "1");
  if (filters.timezone && filters.timezone !== "any") params.set("zona", filters.timezone);
  if (filters.posted && filters.posted !== "all") params.set("datum", filters.posted);
  if (filters.hideSeen) params.set("sakrij", "1");
  if (filters.junior) params.set("pocetnik", "1");
  return params.toString();
}

export function filterJobs(
  jobs: NormalizedJob[],
  filters: JobFilters,
  seenIds: string[] = [],
): NormalizedJob[] {
  const query = filters.q?.trim().toLowerCase();
  const seen = new Set(seenIds);
  const now = Date.now();

  return jobs.filter((job) => {
    if (filters.serbiaOnly && !isSerbiaLikely(job.serbiaEligibility)) return false;
    if (filters.location === "srbija" && job.serbiaEligibility !== "CONFIRMED_SERBIA") return false;
    if (filters.location === "worldwide" && job.serbiaEligibility !== "WORLDWIDE") return false;
    if (filters.location === "europe" && !["EUROPE", "CONFIRMED_SERBIA"].includes(job.serbiaEligibility)) {
      return false;
    }
    if (filters.location === "emea" && !["EMEA", "EUROPE", "CONFIRMED_SERBIA"].includes(job.serbiaEligibility)) {
      return false;
    }
    if (filters.category && filters.category !== "all" && job.category !== filters.category) return false;
    if (filters.seniority && filters.seniority !== "all" && job.seniority !== filters.seniority) return false;
    if (filters.type && filters.type !== "all" && job.employmentType !== filters.type) return false;
    if (filters.remote && filters.remote !== "all" && job.remoteMode !== filters.remote) return false;
    if (filters.salaryOnly && job.salaryMin == null && job.salaryMax == null) return false;
    if (filters.junior && !job.juniorFriendly) return false;
    if (filters.hideSeen && seen.has(job.id)) return false;
    if (query) {
      const haystack = `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.posted && filters.posted !== "all" && job.publishedAt) {
      const age = now - new Date(job.publishedAt).getTime();
      const limit =
        filters.posted === "24h"
          ? 24 * 3600_000
          : filters.posted === "3d"
            ? 3 * 24 * 3600_000
            : filters.posted === "7d"
              ? 7 * 24 * 3600_000
              : 30 * 24 * 3600_000;
      if (age > limit) return false;
    }
    if (filters.timezone && filters.timezone !== "any") {
      const compatibility = cetCompatibility(job.timezone);
      if (filters.timezone === "cet" && compatibility !== "cet") return false;
      if (filters.timezone === "cet2" && compatibility && !["cet", "cet2"].includes(compatibility)) return false;
      if (filters.timezone === "cet4" && compatibility === "any") return false;
    }
    return true;
  });
}

export function emptyStateHint(filters: JobFilters): string[] {
  const hints: string[] = [];
  if (filters.salaryOnly) hints.push("Uklonite filter 'samo oglasi sa platom'.");
  if (filters.serbiaOnly) hints.push("Proširite lokaciju na Europe / EMEA.");
  if (filters.posted && filters.posted !== "all") hints.push("Proširite period objave.");
  if (filters.junior) hints.push("Isključite režim za početnike ako tražite širi skup oglasa.");
  return hints;
}
