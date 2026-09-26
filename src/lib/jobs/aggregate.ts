import { unstable_cache } from "next/cache";
import { dedupeJobs } from "@/lib/dedupe";
import { fetchGreenhouseJobs } from "@/lib/jobs/sources/greenhouse";
import { fetchRemoteOkJobs } from "@/lib/jobs/sources/remoteok";
import { fetchRemotiveJobs } from "@/lib/jobs/sources/remotive";
import type { JobFeed, JobFeedMeta, JobSourceName, NormalizedJob } from "@/types";

async function loadSource(
  name: JobSourceName,
  loader: () => Promise<NormalizedJob[]>,
): Promise<{ name: JobSourceName; jobs: NormalizedJob[]; ok: boolean; error?: string; durationMs: number }> {
  const started = Date.now();
  try {
    const jobs = await loader();
    return { name, jobs, ok: true, durationMs: Date.now() - started };
  } catch (error) {
    return {
      name,
      jobs: [],
      ok: false,
      error: error instanceof Error ? error.message : "Nepoznata greška",
      durationMs: Date.now() - started,
    };
  }
}

async function aggregateUncached(): Promise<JobFeed> {
  const results = await Promise.all([
    loadSource("remotive", fetchRemotiveJobs),
    loadSource("remoteok", fetchRemoteOkJobs),
    loadSource("greenhouse", fetchGreenhouseJobs),
  ]);
  const jobs = dedupeJobs(results.flatMap((result) => result.jobs)).sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bTime - aTime;
  });
  const meta: JobFeedMeta = {
    fetchedAt: new Date().toISOString(),
    sources: results.map((result) => ({
      name: result.name,
      ok: result.ok,
      count: result.jobs.length,
      error: result.error,
      durationMs: result.durationMs,
    })),
  };
  return { jobs, meta };
}

export const getJobFeed = unstable_cache(aggregateUncached, ["job-feed-v2"], {
  revalidate: 3600,
  tags: ["jobs"],
});

export async function getJobBySlug(slug: string): Promise<NormalizedJob | null> {
  const feed = await getJobFeed();
  return feed.jobs.find((job) => job.slug === slug || job.id === slug) ?? null;
}

export function jobStats(jobs: NormalizedJob[]) {
  const dayAgo = Date.now() - 24 * 3600_000;
  return {
    total: jobs.length,
    serbia: jobs.filter((job) => job.serbiaEligibility === "CONFIRMED_SERBIA" || job.serbiaEligibility === "WORLDWIDE")
      .length,
    last24h: jobs.filter((job) => job.publishedAt && Date.parse(job.publishedAt) >= dayAgo).length,
    withSalary: jobs.filter((job) => job.salaryMin != null || job.salaryMax != null).length,
  };
}
