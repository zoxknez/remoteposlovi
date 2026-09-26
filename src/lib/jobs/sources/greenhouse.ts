import { ATS_BOARDS } from "@/data/ats-boards";
import { fetchJson, mapPool } from "@/lib/http";
import { normalizeJob, type RawJob } from "@/lib/jobs/normalize";
import type { NormalizedJob } from "@/types";

interface GreenhouseJob {
  id: number;
  title: string;
  absolute_url: string;
  location?: { name?: string };
  first_published?: string;
  updated_at?: string;
  content?: string;
}

interface GreenhouseResponse {
  jobs?: GreenhouseJob[];
}

function isRemoteLocation(location: string, title: string): boolean {
  const text = `${location} ${title}`.toLowerCase();
  if (/\b(hybrid|on-?site|office)\b/.test(text) && !/\bremote\b/.test(text)) return false;
  if (/\bremote\b/.test(text)) return true;
  return false;
}

export async function fetchGreenhouseJobs(): Promise<NormalizedJob[]> {
  const boards = ATS_BOARDS.filter((board) => board.provider === "greenhouse");
  const fetchedAt = new Date().toISOString();
  const groups = await mapPool(boards, 3, async (board) => {
    try {
      const data = await fetchJson<GreenhouseResponse>(
        `https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs`,
        { timeoutMs: 10000 },
      );
      return (data.jobs ?? [])
        .filter((job) => isRemoteLocation(job.location?.name ?? "", job.title))
        .map((job) => {
          const raw: RawJob = {
            source: "greenhouse",
            sourceId: `${board.token}-${job.id}`,
            sourceUrl: job.absolute_url,
            applyUrl: job.absolute_url,
            company: board.name,
            title: job.title,
            location: job.location?.name,
            publishedAt: job.first_published
              ? new Date(job.first_published).toISOString()
              : job.updated_at
                ? new Date(job.updated_at).toISOString()
                : null,
          };
          return normalizeJob(raw, fetchedAt);
        });
    } catch {
      return [] as NormalizedJob[];
    }
  });
  return groups.flat();
}
