import { describe, expect, it } from "vitest";
import { classifySerbiaEligibility } from "@/lib/eligibility";

describe("classifySerbiaEligibility", () => {
  it("confirms explicit Serbia", () => {
    const result = classifySerbiaEligibility({ candidateRequiredLocation: "Serbia, Romania, Hungary" });
    expect(result.status).toBe("CONFIRMED_SERBIA");
  });

  it("treats worldwide as worldwide", () => {
    const result = classifySerbiaEligibility({ candidateRequiredLocation: "Worldwide" });
    expect(result.status).toBe("WORLDWIDE");
  });

  it("does not treat Remote as Serbia", () => {
    const result = classifySerbiaEligibility({ location: "Remote" });
    expect(result.status).toBe("UNCLEAR");
  });

  it("marks US-only lists as not eligible", () => {
    const result = classifySerbiaEligibility({
      candidateRequiredLocation: "USA, Canada, Argentina, Mexico, Peru",
    });
    expect(result.status).toBe("NOT_ELIGIBLE");
  });

  it("marks EMEA without country list as EMEA", () => {
    const result = classifySerbiaEligibility({ location: "Remote, EMEA" });
    expect(result.status).toBe("EMEA");
  });

  it("marks EU only as Europe, not confirmed Serbia", () => {
    const result = classifySerbiaEligibility({ location: "EU only" });
    expect(result.status).toBe("EUROPE");
  });

  it("detects US residency requirements", () => {
    const result = classifySerbiaEligibility({
      description: "Must have resided in the United States for the past three consecutive years",
    });
    expect(result.status).toBe("NOT_ELIGIBLE");
  });

  it("does not treat a city location as worldwide because of marketing copy", () => {
    const result = classifySerbiaEligibility({
      location: "Singapore",
      description: "We are a global company building products for users worldwide.",
    });
    expect(result.status).toBe("NOT_ELIGIBLE");
  });
});
