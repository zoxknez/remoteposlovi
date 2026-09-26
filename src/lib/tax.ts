import {
  FREELANCER_TAX_2026,
  TAX_DEADLINES_2026,
} from "@/data/tax-2026";

export type TaxOptionId = "option1" | "option2";

export interface TaxBreakdown {
  option: TaxOptionId;
  name: string;
  gross: number;
  standardizedCosts: number;
  taxableBase: number;
  tax: number;
  pio: number;
  health: number;
  total: number;
  net: number;
  effectiveRate: number;
}

export interface TaxCalculation {
  period: "monthly" | "quarterly";
  quarterlyGross: number;
  currency: "RSD" | "EUR" | "USD";
  originalAmount: number;
  insuredElsewhere: boolean;
  option1: TaxBreakdown;
  option2: TaxBreakdown;
  cheaper: TaxOptionId;
}

function roundRsd(value: number): number {
  return Math.round(value);
}

function optionBreakdown(
  option: TaxOptionId,
  quarterlyGross: number,
  insuredElsewhere: boolean,
): TaxBreakdown {
  const cfg = FREELANCER_TAX_2026[option];
  const standardizedCosts = roundRsd(
    cfg.standardizedCostsRsd + quarterlyGross * cfg.extraPercentOfGross,
  );
  const taxableBase = Math.max(0, roundRsd(quarterlyGross - standardizedCosts));
  const tax = roundRsd(taxableBase * cfg.taxRate);
  const pioFromBase = roundRsd(taxableBase * cfg.pioRate);
  const pio =
    quarterlyGross > 0
      ? Math.max(pioFromBase, cfg.pioMinimumRsd)
      : 0;
  const healthFromBase = roundRsd(taxableBase * cfg.healthRate);
  const health = insuredElsewhere
    ? 0
    : quarterlyGross > 0
      ? Math.max(healthFromBase, FREELANCER_TAX_2026.healthMinimumQuarterRsd)
      : 0;
  const total = tax + pio + health;
  const net = quarterlyGross - total;
  const effectiveRate = quarterlyGross > 0 ? total / quarterlyGross : 0;

  return {
    option,
    name: cfg.name,
    gross: quarterlyGross,
    standardizedCosts,
    taxableBase,
    tax,
    pio,
    health,
    total,
    net,
    effectiveRate,
  };
}

export function calculateFreelancerTax(input: {
  amount: number;
  currency: "RSD" | "EUR" | "USD";
  period: "monthly" | "quarterly";
  insuredElsewhere: boolean;
  rsdPerEur: number;
  rsdPerUsd: number;
}): TaxCalculation {
  const rate =
    input.currency === "EUR"
      ? input.rsdPerEur
      : input.currency === "USD"
        ? input.rsdPerUsd
        : 1;
  const amountRsd = input.amount * rate;
  const quarterlyGross = roundRsd(
    input.period === "monthly" ? amountRsd * 3 : amountRsd,
  );
  const option1 = optionBreakdown("option1", quarterlyGross, input.insuredElsewhere);
  const option2 = optionBreakdown("option2", quarterlyGross, input.insuredElsewhere);
  const cheaper = option1.total <= option2.total ? "option1" : "option2";

  return {
    period: input.period,
    quarterlyGross,
    currency: input.currency,
    originalAmount: input.amount,
    insuredElsewhere: input.insuredElsewhere,
    option1,
    option2,
    cheaper,
  };
}

export function nextTaxDeadline(now = new Date()): (typeof TAX_DEADLINES_2026)[number] | null {
  const upcoming = TAX_DEADLINES_2026.find((item) => new Date(`${item.deadline}T23:59:59`) >= now);
  return upcoming ?? null;
}
