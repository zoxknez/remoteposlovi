import type { NormalizedJob } from "@/types";
import { canonicalizeUrl, normalizeCompany, normalizeTitle } from "@/lib/html";

const SOURCE_PRIORITY: Record<string, number> = {
  greenhouse: 1,
  lever: 2,
  remotive: 3,
  remoteok: 4,
};

function atsKey(job: Pick<NormalizedJob, "canonicalUrl">): string | null {
  const hostPath = job.canonicalUrl.replace(/^https?:\/\//, "");
  if (/greenhouse|lever\.co|ashbyhq|workable/.test(hostPath)) return `ats:${hostPath}`;
  return null;
}

function companyTitleKey(job: Pick<NormalizedJob, "companyNormalized" | "titleNormalized">): string {
  return `ct:${job.companyNormalized}|${job.titleNormalized}`;
}

export function dedupeJobs(jobs: NormalizedJob[]): NormalizedJob[] {
  const parent = jobs.map((_, index) => index);
  function find(index: number): number {
    if (parent[index] !== index) parent[index] = find(parent[index]);
    return parent[index];
  }
  function union(a: number, b: number) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent[rootB] = rootA;
  }

  const seen = new Map<string, number>();
  jobs.forEach((job, index) => {
    for (const key of [companyTitleKey(job), atsKey(job)].filter(Boolean) as string[]) {
      const existing = seen.get(key);
      if (existing != null) union(existing, index);
      else seen.set(key, index);
    }
  });

  const groups = new Map<number, NormalizedJob[]>();
  jobs.forEach((job, index) => {
    const root = find(index);
    const list = groups.get(root) ?? [];
    list.push(job);
    groups.set(root, list);
  });

  const result: NormalizedJob[] = [];
  for (const group of groups.values()) {
    group.sort((a, b) => (SOURCE_PRIORITY[a.source] ?? 9) - (SOURCE_PRIORITY[b.source] ?? 9));
    const primary = { ...group[0] };
    primary.sources = Array.from(new Set(group.map((item) => item.source)));
    primary.sourceUrls = Object.fromEntries(group.map((item) => [item.source, item.sourceUrl]));
    const career = group.find((item) => item.source === "greenhouse" || item.source === "lever");
    if (career) {
      primary.applyUrl = career.applyUrl;
      primary.canonicalUrl = career.canonicalUrl;
    }
    result.push(primary);
  }
  return result;
}

export function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const left = new Set(a.split(" "));
  const right = new Set(b.split(" "));
  let inter = 0;
  left.forEach((token) => {
    if (right.has(token)) inter += 1;
  });
  return inter / Math.max(left.size, right.size);
}

export { canonicalizeUrl, normalizeCompany, normalizeTitle };
