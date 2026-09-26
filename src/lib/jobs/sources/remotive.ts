import { fetchJson } from "@/lib/http";
import { normalizeJob, type RawJob } from "@/lib/jobs/normalize";
import type { NormalizedJob } from "@/types";

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  category?: string;
  job_type?: string;
  publication_date?: string;
  candidate_required_location?: string;
  salary?: string;
  description?: string;
}

interface RemotiveResponse {
  jobs?: RemotiveJob[];
}

export async function fetchRemotiveJobs(): Promise<NormalizedJob[]> {
  const data = await fetchJson<RemotiveResponse>("https://remotive.com/api/remote-jobs", {
    timeoutMs: 15000,
  });
  const fetchedAt = new Date().toISOString();
  return (data.jobs ?? []).map((job) => {
    const raw: RawJob = {
      source: "remotive",
      sourceId: String(job.id),
      sourceUrl: job.url,
      applyUrl: job.url,
      company: job.company_name,
      title: job.title,
      descriptionHtml: job.description,
      candidateRequiredLocation: job.candidate_required_location,
      location: job.candidate_required_location,
      salaryRaw: job.salary,
      categoryRaw: job.category,
      jobTypeRaw: job.job_type,
      publishedAt: job.publication_date ? new Date(job.publication_date).toISOString() : null,
    };
    return normalizeJob(raw, fetchedAt);
  });
}
