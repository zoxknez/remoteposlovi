import { fetchJson } from "@/lib/http";
import { normalizeJob, type RawJob } from "@/lib/jobs/normalize";
import type { NormalizedJob } from "@/types";

interface RemoteOkJob {
  id?: string | number;
  slug?: string;
  url?: string;
  position?: string;
  company?: string;
  location?: string;
  description?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  date?: string;
  epoch?: number;
  tags?: string[];
}

export async function fetchRemoteOkJobs(): Promise<NormalizedJob[]> {
  const payload = await fetchJson<unknown[]>("https://remoteok.com/api", {
    timeoutMs: 15000,
    headers: { Accept: "application/json" },
  });
  const fetchedAt = new Date().toISOString();
  return payload
    .filter((item): item is RemoteOkJob => typeof item === "object" && item !== null && "position" in item)
    .map((job) => {
      const sourceId = String(job.id ?? job.slug ?? job.epoch ?? job.position);
      const salaryRaw =
        job.salary_min || job.salary_max
          ? `${job.salary_currency ?? "USD"} ${job.salary_min ?? ""}-${job.salary_max ?? ""}`.trim()
          : undefined;
      const raw: RawJob = {
        source: "remoteok",
        sourceId,
        sourceUrl: job.url || `https://remoteok.com/remote-jobs/${job.slug ?? sourceId}`,
        applyUrl: job.url || `https://remoteok.com/remote-jobs/${job.slug ?? sourceId}`,
        company: job.company ?? "Nepoznata kompanija",
        title: job.position ?? "Remote posao",
        descriptionHtml: job.description,
        location: job.location,
        salaryRaw,
        categoryRaw: job.tags?.join(" "),
        publishedAt: job.date
          ? new Date(job.date).toISOString()
          : job.epoch
            ? new Date(job.epoch * 1000).toISOString()
            : null,
      };
      return normalizeJob(raw, fetchedAt);
    });
}
