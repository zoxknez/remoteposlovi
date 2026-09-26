import { describe, expect, it } from "vitest";
import { filterJobs } from "@/lib/jobs/filters";
import { normalizeJob } from "@/lib/jobs/normalize";

const job = normalizeJob(
  {
    source: "remotive",
    sourceId: "10",
    sourceUrl: "https://remotive.com/x",
    applyUrl: "https://remotive.com/x",
    company: "Acme",
    title: "Junior QA Engineer",
    location: "Serbia",
    salaryRaw: "$40,000 - $50,000",
    jobTypeRaw: "full_time",
    publishedAt: new Date().toISOString(),
  },
  new Date().toISOString(),
);

describe("filterJobs", () => {
  it("keeps confirmed Serbia jobs in serbiaOnly mode", () => {
    expect(filterJobs([job], { serbiaOnly: true })).toHaveLength(1);
  });

  it("filters by category and salary", () => {
    expect(filterJobs([job], { category: "qa", salaryOnly: true })).toHaveLength(1);
    expect(filterJobs([job], { category: "design" })).toHaveLength(0);
  });
});
