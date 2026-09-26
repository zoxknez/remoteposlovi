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
      return {
        badge: "bg-[#eef3ed] text-[#355448]",
        icon: "bg-[#163d33] text-white",
        glow: "from-[#eef4ed] via-transparent to-transparent",
      };
    case "Učenje":
      return {
        badge: "bg-[#eef0f8] text-[#536287]",
        icon: "bg-[#536287] text-white",
        glow: "from-[#eef0f8] via-transparent to-transparent",
      };
    case "Poslovanje":
      return {
        badge: "bg-[#edf4f4] text-[#416866]",
        icon: "bg-[#416866] text-white",
        glow: "from-[#edf4f4] via-transparent to-transparent",
      };
    case "Sigurnost":
      return {
        badge: "bg-[#fff1eb] text-[#9a432d]",
        icon: "bg-[#8f4939] text-white",
        glow: "from-[#fff0ea] via-transparent to-transparent",
      };
    case "Produktivnost":
      return {
        badge: "bg-[#f3efe6] text-[#75613d]",
        icon: "bg-[#75613d] text-white",
        glow: "from-[#f4efe5] via-transparent to-transparent",
      };
    case "Komunikacija":
      return {
        badge: "bg-[#f1edfa] text-[#65518d]",
        icon: "bg-[#65518d] text-white",
        glow: "from-[#f1edfa] via-transparent to-transparent",
      };
    case "AI":
      return {
        badge: "bg-[#f5efff] text-[#6a48a2]",
        icon: "bg-[#5b3d8f] text-white",
        glow: "from-[#f5efff] via-transparent to-transparent",
      };
    case "Freelance":
      return {
        badge: "bg-[#fff3ed] text-[#9a5038]",
        icon: "bg-[#9a5038] text-white",
        glow: "from-[#fff2eb] via-transparent to-transparent",
      };
    case "Poslovi":
      return {
        badge: "bg-[#eef3ed] text-[#476457]",
        icon: "bg-[#476457] text-white",
        glow: "from-[#eef3ed] via-transparent to-transparent",
      };
    default:
      return {
        badge: "bg-[#eef3ed] text-[#426052]",
        icon: "bg-[#17312a] text-white",
        glow: "from-[#eef3ed] via-transparent to-transparent",
      };
  }
}

function ResourceGlyph({ label }: { label: string }) {
  const normalized = label.toLowerCase();

  if (normalized.includes("ats") || normalized.includes("cv")) {
    return (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h4M10 12h5M10 16h5" />
      </svg>
    );
  }

  if (normalized.includes("engleski") || normalized.includes("jezik")) {
    return (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 5h10M9 3v2c0 5-2 9-6 12M6 10c2 2 4 4 8 6M15 8h5l-2.5 8M14.5 14h6" />
      </svg>
    );
  }

  if (normalized.includes("bezbed") || normalized.includes("prover")) {
    return (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 7h16v11H4z" />
      <path d="M8 7V5h8v2M8 12h8M8 15h5" />
    </svg>
  );
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
    <article className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.75rem] border border-[#17312a]/8 bg-white/95 p-6 shadow-[0_18px_46px_rgba(23,49,42,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_30px_68px_rgba(23,49,42,0.1)] md:p-7">
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${tone.glow}`} />
      <div className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full border-[24px] border-[#f2f5f1] opacity-90" />
      <div className="pointer-events-none absolute -bottom-20 -left-8 size-44 rounded-full bg-[#f3f6f2] blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap gap-2">
          <span className={`rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] ${tone.badge}`}>
            {resource.section}
          </span>
          {resource.official ? (
            <span className="rounded-full bg-[#e9f0ff] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#315a92]">
              Zvanično
            </span>
          ) : null}
          {resource.openSource ? (
            <span className="rounded-full bg-[#f1edfa] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#65518d]">
              Open-source
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onToggle(resource.id)}
          aria-label={saved ? `Uklonite ${resource.name} iz sačuvanih` : `Sačuvajte ${resource.name}`}
          className={`grid size-12 shrink-0 place-items-center rounded-full border bg-white shadow-[0_10px_24px_rgba(23,49,42,0.06)] transition hover:-translate-y-0.5 ${saved ? "border-[#dc5b38]/30 bg-[#fff0e9] text-[#dc5b38]" : "border-[#17312a]/10 text-[#587067] hover:border-[#dc5b38]/30 hover:text-[#dc5b38]"}`}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="relative mt-5">
        <div className={`grid size-[72px] place-items-center rounded-[1.35rem] shadow-[0_14px_26px_rgba(23,49,42,0.12)] ${tone.icon}`}>
          <ResourceGlyph label={resource.label} />
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[.18em] text-[#8c9892]">{resource.label}</p>
        <h4 className="mt-2 font-serif text-[2.15rem] leading-[1.02] tracking-[-0.04em] text-[#17312a] transition group-hover:text-[#a8462e]">
          {resource.name}
        </h4>
        <p className="mt-4 max-w-[34rem] text-[15px] leading-7 text-[#60736b]">
          {resource.description}
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex min-h-9 items-center rounded-full border border-[#17312a]/7 bg-[#f6f8f4] px-3.5 text-[11px] font-medium text-[#53665e]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-auto pt-7">
        <div className="grid grid-cols-2 divide-x divide-[#17312a]/8 border-t border-[#17312a]/8 pt-5">
          <div className="flex items-center gap-2 pr-4">
            <span className="grid size-7 place-items-center rounded-full bg-[#f7efe1] text-[#9a6e2f]" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <ellipse cx="12" cy="6" rx="6" ry="2.5" />
                <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
              </svg>
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.11em] text-[#89958f]">Cena</p>
              <p className="mt-0.5 text-sm font-bold text-[#17312a]">{PRICING[resource.pricing]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pl-4">
            <span className={`size-2.5 rounded-full ${health && !health.ok ? "bg-[#d4945a]" : "bg-[#4c9872]"}`} aria-hidden />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.11em] text-[#89958f]">Status</p>
              <p className="mt-0.5 text-sm font-medium text-[#60736b]">{status}</p>
            </div>
          </div>
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className="relative mt-5 flex min-h-14 w-full items-center justify-between overflow-hidden rounded-[1.15rem] bg-[#17312a] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(23,49,42,0.16)] transition hover:-translate-y-0.5 hover:bg-[#21483c]"
        >
          <span className="relative z-10">Otvorite resurs</span>
          <span className="relative z-10 grid size-8 place-items-center rounded-full bg-white/10 text-lg transition group-hover:translate-x-1" aria-hidden>→</span>
          <span className="absolute -right-8 -top-10 size-28 rounded-full border-[18px] border-white/5" aria-hidden />
        </a>
      </div>
    </article>
  );
}
