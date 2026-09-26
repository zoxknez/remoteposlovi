"use client";

import type { Resource, SourceHealth } from "@/types";

const PRICING: Record<Resource["pricing"], string> = {
  free: "Besplatno",
  freemium: "Freemium",
  paid: "Plaćeno",
  unknown: "Cena varira",
};

function toneForSection(section: Resource["section"]) {
  switch (section) {
    case "Karijera":
      return "bg-[#eef3ed] text-[#426052]";
    case "Učenje":
      return "bg-[#eef0f8] text-[#536287]";
    case "Poslovanje":
      return "bg-[#edf4f4] text-[#416866]";
    case "Sigurnost":
      return "bg-[#fff1eb] text-[#9a432d]";
    case "Produktivnost":
      return "bg-[#f3efe6] text-[#75613d]";
    case "Komunikacija":
      return "bg-[#f1edfa] text-[#65518d]";
    case "AI":
      return "bg-[#f5efff] text-[#6a48a2]";
    case "Freelance":
      return "bg-[#fff3ed] text-[#9a5038]";
    case "Poslovi":
      return "bg-[#eef3ed] text-[#476457]";
    default:
      return "bg-[#eef3ed] text-[#426052]";
  }
}

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
  const visibleTags = resource.tags.slice(0, 2);
  const tone = toneForSection(resource.section);
  const status = health ? (health.ok ? "Aktivno" : "Proveriti") : resource.regions[0];

  return (
    <article className="group relative flex min-h-[352px] flex-col overflow-hidden rounded-[1.65rem] border border-[#17312a]/8 bg-white/95 p-6 shadow-[0_16px_40px_rgba(23,49,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_24px_58px_rgba(23,49,42,0.09)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#17312a]/18 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute -right-10 -top-10 size-28 rounded-full border-[18px] border-[#f3f6f2] opacity-90" aria-hidden />
      <div className="absolute -bottom-16 left-8 size-28 rounded-full bg-[#eef4ef]/65 blur-3xl" aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${tone}`}>
            {resource.section}
          </span>
          {resource.official ? (
            <span className="rounded-full bg-[#e9f0ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#315a92]">
              Zvanično
            </span>
          ) : null}
          {resource.openSource ? (
            <span className="rounded-full bg-[#f1edfa] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#65518d]">
              Open-source
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onToggle(resource.id)}
          aria-label={saved ? `Uklonite ${resource.name} iz sačuvanih` : `Sačuvajte ${resource.name}`}
          className={`grid size-11 shrink-0 place-items-center rounded-full border bg-white shadow-[0_8px_20px_rgba(23,49,42,0.04)] transition ${saved ? "border-[#dc5b38]/30 bg-[#fff0e9] text-[#dc5b38]" : "border-[#17312a]/10 text-[#73827b] hover:border-[#dc5b38]/35 hover:text-[#dc5b38]"}`}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="relative mt-7 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8b9791]">{resource.label}</p>
        <h4 className="mt-3 font-serif text-[2rem] leading-[1.08] tracking-[-0.03em] text-[#17312a] transition group-hover:text-[#b9472d]">
          {resource.name}
        </h4>
        <p className="mx-auto mt-4 max-w-[32ch] text-[15px] leading-7 text-[#60736b]">
          {resource.description}
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap justify-center gap-2">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-xl border border-[#17312a]/8 bg-[#f8faf7] px-3 py-1.5 text-[10px] font-medium text-[#65766e]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-auto pt-7">
        <div className="mx-auto flex max-w-[270px] items-center justify-between gap-4 border-t border-[#17312a]/8 pt-5 text-[12px]">
          <div className="flex items-center gap-2 text-[#52675f]">
            <span className="size-1.5 rounded-full bg-[#76a183]" aria-hidden />
            <span className="font-semibold">{PRICING[resource.pricing]}</span>
          </div>
          <span className="text-[#78877f]">{status}</span>
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-5 flex min-h-12 w-fit items-center justify-center gap-2 rounded-2xl bg-[#17312a] px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(23,49,42,0.12)] transition hover:-translate-y-0.5 hover:bg-[#244239]"
        >
          <span>Otvori resurs</span>
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}
