"use client";

import { ResourceSupportBadge } from "@/components/EligibilityBadge";
import type { Resource, SourceHealth } from "@/types";

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
  return (
    <article
      className="group relative flex min-h-[250px] cursor-pointer flex-col justify-between rounded-lg border border-[#17312a]/10 bg-white p-7 text-center transition duration-200 hover:-translate-y-1 hover:border-[#17312a]/30 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#dc5b38]"
    >
      <div>
        <div className="flex items-start justify-center gap-2 pr-10">
          <div className="flex flex-wrap justify-center gap-2">
            <ResourceSupportBadge support={resource.serbiaSupport} note={resource.serbiaSupportNote} />
            <span className="rounded-full bg-[#f8eee9] px-2.5 py-1 text-[10px] font-bold text-[#a54931]">
              {resource.kind}
            </span>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggle(resource.id);
            }}
            aria-label={`Sačuvajte ${resource.name}`}
            className={`absolute right-6 top-6 grid size-11 place-items-center rounded-full border text-base ${
              saved
                ? "border-[#dc5b38] bg-[#fff1ec] text-[#dc5b38]"
                : "border-[#17312a]/15 text-[#60736b] hover:border-[#dc5b38] hover:text-[#dc5b38]"
            }`}
          >
            {saved ? "♥" : "♡"}
          </button>
        </div>
        <h3 className="mt-7 font-serif text-2xl text-[#17312a] group-hover:text-[#dc5b38]">
          <a href={resource.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
            {resource.name}
          </a>
        </h3>
        <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-6 text-[#60736b]">{resource.description}</p>
      </div>
      <div className="mt-auto border-t border-[#17312a]/10 pt-5 text-xs text-[#7c8c84]">
        <p>{resource.label}</p>
        {health ? (
          <p className="mt-1">
            {health.ok ? "Aktivno" : "Privremeno nedostupan"}
            {health.lastSuccessfulCheck
              ? ` · Poslednja provera: ${new Date(health.lastSuccessfulCheck).toLocaleDateString("sr-Latn-RS")}`
              : health.lastFailedCheck
                ? ` · Provera: ${new Date(health.lastFailedCheck).toLocaleDateString("sr-Latn-RS")}`
                : ""}
          </p>
        ) : (
          <p className="mt-1">Status izvora se proverava periodično.</p>
        )}
        <p className="mt-2 font-bold text-[#dc5b38]">Otvorite izvor ↗</p>
      </div>
    </article>
  );
}
