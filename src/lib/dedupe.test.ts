import { describe, expect, it } from "vitest";
import { dedupeJobs } from "@/lib/dedupe";
import { normalizeJob } from "@/lib/jobs/normalize";

describe("dedupeJobs", () => {
  it("merges the same company and title from multiple sources", () => {
    const fetchedAt = "2026-09-26T10:00:00.000Z";
    const remotive = normalizeJob(
      {
        source: "remotive",
        sourceId: "1",
        sourceUrl: "https://remotive.com/jobs/1",
        applyUrl: "https://remotive.com/jobs/1",
        company: "Acme Inc",
        title: "Senior QA Engineer",
        location: "Worldwide",
      },
      fetchedAt,
    );
    const greenhouse = normalizeJob(
      {
        source: "greenhouse",
        sourceId: "acme-9",
        sourceUrl: "https://boards.greenhouse.io/acme/jobs/9",
        applyUrl: "https://boards.greenhouse.io/acme/jobs/9",
        company: "Acme",
        title: "Senior QA Engineer",
        location: "Worldwide",
      },
      fetchedAt,
    );
    const result = dedupeJobs([remotive, greenhouse]);
    expect(result).toHaveLength(1);
    expect(result[0].source).toBe("greenhouse");
    expect(result[0].sources).toEqual(["greenhouse", "remotive"]);
    expect(result[0].applyUrl).toContain("greenhouse");
  });
});
