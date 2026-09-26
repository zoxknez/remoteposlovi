"use client";

import type { Resource, SourceHealth } from "@/types";

const PRICING: Record<Resource["pricing"], string> = {
  free: "Besplatno",
  freemium: "Freemium",
  paid: "Plaćeno",
  unknown: "Cena varira",
};

export function ResourceCard({
  resource,
  saved,
  onToggle,
  health,
}: {
  resource: Resource;
  saved: boolean;
  onToggle: (id: string) => void;
  health?: SourceHealth;
}) {
  const visibleTags = resource.tags.slice(0, 3);
  return (
    <article className="premium-card group relative flex min-h-[292px] flex-col overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#17312a]/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap gap-2">
          <span className="rounded-full bg-[#eef3ed] px-2.5 py-1 text-[10px] font-bold text-[#426052]">{resource.section}</span>
          {resource.official ? <span className="rounded-full bg-[#e9f0ff] px-2.5 py-1 text-[10px] font-bold text-[#315a92]">Zvanično</span> : null}
          {resource.openSource ? <span className="rounded-full bg-[#f1edfa] px-2.5 py-1 text-[10px] font-bold text-[#65518d]">Open-source</span> : null}
        </div>
        <button
          type="button"
          onClick={() => onToggle(resource.id)}
          aria-label={saved ? `Uklonite ${resource.name} iz sačuvanih` : `Sačuvajte ${resource.name}`}
          className={`grid size-10 shrink-0 place-items-center rounded-full border transition ${saved ? "border-[#dc5b38]/30 bg-[#fff0e9] text-[#dc5b38]" : "border-[#17312a]/10 bg-white text-[#73827b] hover:border-[#dc5b38]/35 hover:text-[#dc5b38]"}`}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#87938d]">{resource.label}</p>
        <h4 className="mt-2 font-serif text-[1.65rem] leading-tight tracking-[-0.025em] text-[#17312a] transition group-hover:text-[#b9472d]">
          {resource.name}
        </h4>
        <p className="mt-3 text-sm leading-6 text-[#60736b]">{resource.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <span key={tag} className="rounded-md border border-[#17312a]/8 bg-[#f8faf7] px-2 py-1 text-[10px] font-medium text-[#65766e]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-[#17312a]/8 pt-4 text-[11px] text-[#78877f]">
          <span className="font-semibold text-[#52675f]">{PRICING[resource.pricing]}</span>
          <span>
            {health ? (health.ok ? "Aktivno" : "Proveriti dostupnost") : resource.regions[0]}
          </span>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex min-h-11 items-center justify-between rounded-xl bg-[#17312a] px-4 text-xs font-bold text-white transition hover:bg-[#244239]"
        >
          <span>Otvori resurs</span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}
