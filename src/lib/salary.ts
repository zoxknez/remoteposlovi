export interface ParsedSalary {
  min: number | null;
  max: number | null;
  currency: string | null;
  period: "year" | "month" | "hour" | "day" | null;
  raw: string;
}

function detectCurrency(text: string): string | null {
  const lower = text.toLowerCase();
  if (text.includes("€") || /\beur\b/i.test(text)) return "EUR";
  if (text.includes("£") || /\bgbp\b/i.test(text)) return "GBP";
  if (/\brsd\b|dinara/i.test(lower)) return "RSD";
  if (text.includes("$") || /\busd\b/i.test(text)) return "USD";
  return null;
}

function detectPeriod(text: string): ParsedSalary["period"] {
  const lower = text.toLowerCase();
  if (/hour|hr\b|\/h\b|hourly/.test(lower)) return "hour";
  if (/day|daily|\/d\b/.test(lower)) return "day";
  if (/month|mo\b|mesečn|mesecn/.test(lower)) return "month";
  if (/year|annual|\/yr|godišnj|godisnj/.test(lower)) return "year";
  return "year";
}

function parseAmount(raw: string): number | null {
  let value = raw.replace(/[^\d.,k]/gi, "");
  const hasK = /k/i.test(raw);
  value = value.replace(/,/g, "");
  if (value.includes(".") && value.split(".")[1]?.length === 3 && !hasK) {
    value = value.replace(/\./g, "");
  }
  const amount = Number.parseFloat(value.replace(/k/gi, ""));
  if (!Number.isFinite(amount)) return null;
  return hasK || /k/i.test(raw) ? amount * 1000 : amount;
}

export function parseSalary(raw: string | null | undefined): ParsedSalary {
  if (!raw || !raw.trim()) {
    return { min: null, max: null, currency: null, period: null, raw: raw ?? "" };
  }
  const text = raw.trim();
  const currency = detectCurrency(text);
  const period = detectPeriod(text);
  const range = text.match(/([\d.,]+\s*k?)\s*(?:-|–|—|to)\s*[\$€£]?\s*([\d.,]+\s*k?)/i);
  if (range) {
    return {
      min: parseAmount(range[1]),
      max: parseAmount(range[2]),
      currency,
      period,
      raw: text,
    };
  }
  const single = text.match(/([\d.,]+\s*k?)/i);
  const amount = single ? parseAmount(single[1]) : null;
  return {
    min: amount,
    max: amount,
    currency,
    period,
    raw: text,
  };
}

export function annualizeSalary(
  amount: number,
  period: ParsedSalary["period"],
): number {
  switch (period) {
    case "hour":
      return amount * 40 * 52;
    case "day":
      return amount * 5 * 52;
    case "month":
      return amount * 12;
    default:
      return amount;
  }
}

export function monthlyFromAnnual(amount: number): number {
  return amount / 12;
}

export function formatSalaryRange(
  min: number | null,
  max: number | null,
  currency: string | null,
  period: ParsedSalary["period"],
): string | null {
  if (min == null && max == null) return null;
  const code = currency ?? "";
  const periodLabel =
    period === "hour" ? "/h" : period === "month" ? "/mes" : period === "day" ? "/dan" : "";
  const format = (value: number) => {
    if (value >= 1000 && period !== "hour") {
      const compact = value / 1000;
      return Number.isInteger(compact) ? `${compact}k` : `${compact.toFixed(1)}k`;
    }
    return new Intl.NumberFormat("sr-Latn-RS", { maximumFractionDigits: 0 }).format(value);
  };
  if (min != null && max != null && min !== max) {
    return `${code ? `${code} ` : ""}${format(min)}-${format(max)}${periodLabel}`.trim();
  }
  const value = min ?? max ?? 0;
  return `${code ? `${code} ` : ""}${format(value)}${periodLabel}`.trim();
}
