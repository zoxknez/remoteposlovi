function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatIcsDate(date: Date): string {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildFollowUpIcs(input: {
  title: string;
  company: string;
  url?: string;
  note?: string;
  followUpAt: Date;
}): string {
  const uid = `followup-${followUpAtStamp(input.followUpAt)}@remoteposlovi.vercel.app`;
  const start = new Date(input.followUpAt);
  start.setUTCHours(8, 0, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const description = [
    `Follow-up za prijavu: ${input.title} (${input.company})`,
    input.note,
    input.url,
  ]
    .filter(Boolean)
    .join("\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Remote Poslovi//Follow-up//SR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcs(`Follow-up: ${input.title} - ${input.company}`)}`,
    `DESCRIPTION:${escapeIcs(description.replace(/\\n/g, "\n"))}`,
    input.url ? `URL:${input.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

function followUpAtStamp(date: Date): string {
  return formatIcsDate(date).replace(/[TZ]/g, "");
}

export function addDays(base: Date, days: number): Date {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
}
