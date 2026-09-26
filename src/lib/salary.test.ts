import { describe, expect, it } from "vitest";
import { parseSalary, annualizeSalary } from "@/lib/salary";

describe("parseSalary", () => {
  it("parses USD range with k", () => {
    const parsed = parseSalary("$90k - $105k");
    expect(parsed.min).toBe(90000);
    expect(parsed.max).toBe(105000);
    expect(parsed.currency).toBe("USD");
    expect(parsed.period).toBe("year");
  });

  it("parses hourly rates", () => {
    const parsed = parseSalary("$40/hr");
    expect(parsed.min).toBe(40);
    expect(parsed.period).toBe("hour");
    expect(annualizeSalary(40, "hour")).toBe(40 * 40 * 52);
  });

  it("parses euro ranges", () => {
    const parsed = parseSalary("€55k-€70k");
    expect(parsed.currency).toBe("EUR");
    expect(parsed.min).toBe(55000);
    expect(parsed.max).toBe(70000);
  });
});
