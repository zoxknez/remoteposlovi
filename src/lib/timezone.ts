import type { TimezoneWindow } from "@/types";

const ZONE_ALIASES: Record<string, string> = {
  est: "America/New_York",
  edt: "America/New_York",
  et: "America/New_York",
  "eastern time": "America/New_York",
  "us east": "America/New_York",
  "us eastern": "America/New_York",
  pst: "America/Los_Angeles",
  pdt: "America/Los_Angeles",
  pt: "America/Los_Angeles",
  "pacific time": "America/Los_Angeles",
  cst: "America/Chicago",
  cdt: "America/Chicago",
  mst: "America/Denver",
  mdt: "America/Denver",
  gmt: "Etc/GMT",
  utc: "Etc/UTC",
  bst: "Europe/London",
  gmt1: "Europe/Paris",
  cet: "Europe/Paris",
  cest: "Europe/Paris",
  "central european": "Europe/Paris",
};

export const SERBIA_ZONE = "Europe/Belgrade";

function offsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
  );
  return (asUtc - date.getTime()) / 60000;
}

export function zoneOffsetHours(timeZone: string, date = new Date()): number {
  return offsetMinutes(date, timeZone) / 60;
}

export function convertWindowToSerbia(
  window: TimezoneWindow,
  date = new Date(),
): { startHour: number; endHour: number; overlapHours: number } {
  const sourceOffset = zoneOffsetHours(window.zone, date);
  const serbiaOffset = zoneOffsetHours(SERBIA_ZONE, date);
  const shift = serbiaOffset - sourceOffset;
  const startHour = window.startHour + shift;
  const endHour = window.endHour + shift;
  const localStart = 9;
  const localEnd = 17;
  const overlapStart = Math.max(localStart, startHour);
  const overlapEnd = Math.min(localEnd, endHour);
  const overlapHours = Math.max(0, overlapEnd - overlapStart);
  return { startHour, endHour, overlapHours };
}

export function overlapLabel(hours: number): string {
  if (hours >= 6) return "6h+ overlap sa standardnim radnim vremenom u Srbiji";
  if (hours >= 3) return `${Math.round(hours)}h overlap`;
  if (hours > 0) return `${hours.toFixed(1)}h overlap`;
  return "nema normalnog overlap-a sa 9-17 u Srbiji";
}

export function formatHour(hour: number): string {
  const normalized = ((hour % 24) + 24) % 24;
  const h = Math.floor(normalized);
  const m = Math.round((normalized - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function parseTimezoneWindow(text: string | null | undefined): TimezoneWindow | null {
  if (!text) return null;
  const lower = text.toLowerCase();

  const range = text.match(
    /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*[-–—to]+\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*([A-Z]{2,4})/i,
  );
  if (range) {
    const zone = ZONE_ALIASES[range[7].toLowerCase()];
    if (!zone) return null;
    const toHour = (value: string, minutes: string | undefined, ampm: string | undefined) => {
      let hour = Number(value);
      if (ampm?.toLowerCase() === "pm" && hour < 12) hour += 12;
      if (ampm?.toLowerCase() === "am" && hour === 12) hour = 0;
      return hour + (minutes ? Number(minutes) / 60 : 0);
    };
    return {
      zone,
      startHour: toHour(range[1], range[2], range[3]),
      endHour: toHour(range[4], range[5], range[6] ?? range[3]),
      label: range[0],
    };
  }

  if (/us east(?:ern)? (?:time|business hours)|est business hours/i.test(lower)) {
    return {
      zone: "America/New_York",
      startHour: 9,
      endHour: 17,
      label: "US East business hours",
    };
  }
  if (/\b(pst|pacific time)\b/i.test(lower) && /hours|overlap|shift/.test(lower)) {
    return { zone: "America/Los_Angeles", startHour: 9, endHour: 17, label: "US Pacific hours" };
  }
  if (/\bcet\b/i.test(lower)) {
    return { zone: "Europe/Paris", startHour: 9, endHour: 17, label: "CET" };
  }
  return null;
}

export function cetCompatibility(
  window: TimezoneWindow | null,
  date = new Date(),
): "cet" | "cet2" | "cet4" | "any" | null {
  if (!window) return null;
  const converted = convertWindowToSerbia(window, date);
  const serbiaOffset = zoneOffsetHours(SERBIA_ZONE, date);
  const sourceOffset = zoneOffsetHours(window.zone, date);
  const diff = Math.abs(serbiaOffset - sourceOffset);
  if (diff <= 1) return "cet";
  if (diff <= 2) return "cet2";
  if (diff <= 4) return "cet4";
  return converted.overlapHours > 0 ? "cet4" : "any";
}
