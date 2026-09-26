import { describe, expect, it } from "vitest";
import { convertAmount, convertToRsd } from "@/lib/fx";
import type { FxRates } from "@/types";

const fx: FxRates = {
  date: "2026-09-25",
  publishedOn: "25.9.2026.",
  source: "test",
  sourceUrl: "https://www.nbs.rs/",
  rsdPerEur: 117.4831,
  rsdPerUsd: 103.2818,
  fetchedAt: "2026-09-26T00:00:00.000Z",
};

describe("currency conversion", () => {
  it("converts EUR to RSD using NBS middle rate", () => {
    expect(convertToRsd(1, "EUR", fx)).toBeCloseTo(117.4831);
  });

  it("converts annual USD to monthly EUR", () => {
    const monthlyUsd = 72000 / 12;
    const monthlyEur = convertAmount(monthlyUsd, "USD", "EUR", fx);
    expect(monthlyEur).toBeCloseTo((6000 * 103.2818) / 117.4831, 2);
  });
});
