import { convertWindowToSerbia, formatHour, overlapLabel } from "@/lib/timezone";
import type { TimezoneWindow } from "@/types";

export function TimezonePanel({ window }: { window: TimezoneWindow | null }) {
  if (!window) return <div className="rounded-[1.25rem] border border-[#17312a]/8 bg-[#f8faf7] p-5 text-sm text-[#60736b]">Oglas nema jasno navedeno radno vreme ili vremensku zonu.</div>;
  const converted = convertWindowToSerbia(window);
  return <section className="premium-panel p-5 md:p-6">
    <p className="eyebrow">VREMENSKA ZONA</p><h2 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Kako izgleda radno vreme iz Srbije</h2>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-[#17312a]/8 bg-white p-4"><p className="text-[10px] font-bold uppercase tracking-[.11em] text-[#89958f]">Original</p><strong className="mt-2 block text-lg">{formatHour(window.startHour)} - {formatHour(window.endHour)}</strong><p className="mt-1 text-xs text-[#7a8982]">{window.label}</p></div>
      <div className="rounded-2xl border border-[#17312a]/8 bg-white p-4"><p className="text-[10px] font-bold uppercase tracking-[.11em] text-[#89958f]">Srbija</p><strong className="mt-2 block text-lg">{formatHour(converted.startHour)} - {formatHour(converted.endHour)}</strong><p className="mt-1 text-xs text-[#7a8982]">Europe/Belgrade</p></div>
      <div className="rounded-2xl border border-[#17312a]/8 bg-[#eef3ed] p-4"><p className="text-[10px] font-bold uppercase tracking-[.11em] text-[#6d7e76]">Overlap</p><strong className="mt-2 block text-lg text-[#17312a]">{overlapLabel(converted.overlapHours)}</strong></div>
    </div>
    <p className="mt-4 text-[11px] leading-5 text-[#7c8c84]">Konverzija koristi IANA zone {window.zone} i Europe/Belgrade, uključujući DST na današnji dan.</p>
  </section>;
}