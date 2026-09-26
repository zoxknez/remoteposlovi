import { describe, expect, it } from "vitest";
import { calculateFreelancerTax } from "@/lib/tax";

describe("calculateFreelancerTax", () => {
  it("matches official option 1 example for 120000 RSD", () => {
    const result = calculateFreelancerTax({
      amount: 120_000,
      currency: "RSD",
      period: "quarterly",
      insuredElsewhere: true,
      rsdPerEur: 117.4831,
      rsdPerUsd: 103.2818,
    });
    expect(result.option1.taxableBase).toBe(9353);
    expect(result.option1.tax).toBe(1871);
    expect(result.option1.pio).toBe(2245);
    expect(result.option1.health).toBe(0);
    expect(result.option1.total).toBe(4116);
  });

  it("applies health minimum when not insured", () => {
    const result = calculateFreelancerTax({
      amount: 120_000,
      currency: "RSD",
      period: "quarterly",
      insuredElsewhere: false,
      rsdPerEur: 117,
      rsdPerUsd: 103,
    });
    expect(result.option1.health).toBe(7003);
    expect(result.option1.total).toBe(11119);
  });

  it("matches official option 2 example for 120000 RSD", () => {
    const result = calculateFreelancerTax({
      amount: 120_000,
      currency: "RSD",
      period: "quarterly",
      insuredElsewhere: true,
      rsdPerEur: 117,
      rsdPerUsd: 103,
    });
    expect(result.option2.taxableBase).toBe(12467);
    expect(result.option2.tax).toBe(1247);
    expect(result.option2.pio).toBe(36934);
    expect(result.option2.total).toBe(38181);
  });

  it("uses higher PIO when option 2 base exceeds minimum", () => {
    const result = calculateFreelancerTax({
      amount: 400_000,
      currency: "RSD",
      period: "quarterly",
      insuredElsewhere: true,
      rsdPerEur: 117,
      rsdPerUsd: 103,
    });
    expect(result.option2.taxableBase).toBe(197267);
    expect(result.option2.tax).toBe(19727);
    expect(result.option2.pio).toBe(47344);
  });
});
