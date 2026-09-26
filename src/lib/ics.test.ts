import { describe, expect, it } from "vitest";
import { buildFollowUpIcs } from "@/lib/ics";

describe("buildFollowUpIcs", () => {
  it("builds a valid VCALENDAR", () => {
    const ics = buildFollowUpIcs({
      title: "Senior QA Engineer",
      company: "Acme",
      url: "https://example.com/job",
      followUpAt: new Date("2026-09-30T08:00:00Z"),
    });
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("SUMMARY:Follow-up: Senior QA Engineer - Acme");
    expect(ics).toContain("END:VCALENDAR");
  });
});
