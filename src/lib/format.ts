const RELATIVE = new Intl.RelativeTimeFormat("sr-Latn", { numeric: "always" });

export function formatDateSr(value: string | Date | null | undefined): string {
  if (!value) return "nije navedeno";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "nije navedeno";
  return new Intl.DateTimeFormat("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateTimeSr(value: string | Date | null | undefined): string {
  if (!value) return "nije navedeno";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "nije navedeno";
  return new Intl.DateTimeFormat("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeSr(value: string | Date | null | undefined): string {
  if (!value) return "nepoznato";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "nepoznato";
  const diffMs = date.getTime() - Date.now();
  const minutes = Math.round(diffMs / 60000);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  if (Math.abs(minutes) < 60) return RELATIVE.format(minutes, "minute");
  if (Math.abs(hours) < 24) return RELATIVE.format(hours, "hour");
  return RELATIVE.format(days, "day");
}

export function formatNumberSr(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("sr-Latn-RS", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatMoneyRsd(value: number): string {
  return `${formatNumberSr(value, 0)} RSD`;
}

export function formatPercent(value: number): string {
  return `${formatNumberSr(value * 100, 1)}%`;
}
