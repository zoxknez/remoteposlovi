import { convertWindowToSerbia, formatHour, overlapLabel } from "@/lib/timezone";
import type { TimezoneWindow } from "@/types";

export function TimezonePanel({ window }: { window: TimezoneWindow | null }) {
  if (!window) {
    return (
      <p className="text-sm text-[#60736b]">Oglas nema jasno navedeno radno vreme ili zonu.</p>
    );
  }
  const converted = convertWindowToSerbia(window);
  return (
    <section className="rounded-lg border border-[#17312a]/10 bg-white p-5 text-sm">
      <h2 className="font-serif text-xl">Vremenska zona</h2>
      <p className="mt-2">
        Original: {formatHour(window.startHour)} - {formatHour(window.endHour)} ({window.label})
      </p>
      <p>
        Radno vreme u Srbiji: {formatHour(converted.startHour)} - {formatHour(converted.endHour)}
      </p>
      <p className="mt-1 font-semibold">{overlapLabel(converted.overlapHours)}</p>
      <p className="mt-2 text-xs text-[#7c8c84]">
        Koristi se IANA zona {window.zone} i Europe/Belgrade, uključujući DST na današnji dan.
      </p>
    </section>
  );
}
