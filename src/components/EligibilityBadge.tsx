import type { RegionSupport } from "@/types";

const STATUS_CLASS: Record<RegionSupport, string> = {
  confirmed: "bg-[#e7f1e8] text-[#2f5b45] ring-[#2f5b45]/10",
  partial: "bg-[#fff0e8] text-[#9a5038] ring-[#9a5038]/10",
  unknown: "bg-[#f2f3ef] text-[#5f675f] ring-[#5f675f]/10",
  "not-supported": "bg-[#faeaea] text-[#833b3b] ring-[#833b3b]/10",
};

const LABELS: Record<RegionSupport, string> = {
  confirmed: "Dostupno iz regiona",
  partial: "Zavisi od oglasa",
  unknown: "Proverite uslove",
  "not-supported": "Region nije podržan",
};

export function ResourceSupportBadge({ support, note }: { support: RegionSupport; note: string }) {
  return (
    <span className="group/badge relative inline-flex">
      <span
        tabIndex={0}
        className={`inline-flex min-h-7 items-center rounded-full px-3 text-[10px] font-bold tracking-[.01em] ring-1 ring-inset transition ${STATUS_CLASS[support]}`}
        title={note}
        aria-label={`${LABELS[support]}. ${note}`}
      >
        {LABELS[support]}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-72 overflow-hidden rounded-[1rem] border border-[#17312a]/10 bg-white/98 p-4 text-left text-xs font-medium leading-5 text-[#52675f] shadow-[0_18px_48px_rgba(23,49,42,0.16)] backdrop-blur-xl group-hover/badge:block group-focus-within/badge:block"
      >
        <span className="mb-2 block text-[9px] font-bold uppercase tracking-[.13em] text-[#dc5b38]">Dostupnost</span>
        {note}
      </span>
    </span>
  );
}
