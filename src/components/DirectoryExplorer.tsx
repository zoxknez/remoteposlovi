"use client";

import { useEffect, useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { RESOURCE_SECTIONS } from "@/data/sources";
import { getSavedResources, toggleSavedResource } from "@/lib/storage";
import type { Resource, ResourceSection, SourceHealth } from "@/types";

const PRIMARY: Array<ResourceSection | "Sve"> = [
  "Sve",
  "Karijera",
  "Učenje",
  "Poslovanje",
  "Sigurnost",
  "Produktivnost",
  "Komunikacija",
  "AI",
  "Freelance",
  "Poslovi",
];

type QuickFilter = "none" | "serbia" | "free" | "official" | "open" | "beginner";

export function DirectoryExplorer({
  resources,
  health: healthProp = {},
}: {
  resources: Resource[];
  health?: Record<string, SourceHealth>;
}) {
  const [section, setSection] = useState<ResourceSection | "Sve">("Sve");
  const [quick, setQuick] = useState<QuickFilter>("none");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [health, setHealth] = useState<Record<string, SourceHealth>>(healthProp);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => !cancelled && setSaved(getSavedResources()));
    fetch("/api/health")
      .then((response) => response.json())
      .then((payload: { items?: SourceHealth[] }) => {
        if (!cancelled && payload.items) {
          setHealth(Object.fromEntries(payload.items.map((item) => [item.id, item])));
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (section !== "Sve" && resource.section !== section) return false;
      if (showSaved && !saved.includes(resource.id)) return false;
      if (quick === "serbia" && resource.serbiaSupport === "not-supported") return false;
      if (quick === "free" && resource.pricing !== "free") return false;
      if (quick === "official" && !resource.official) return false;
      if (quick === "open" && !resource.openSource) return false;
      if (quick === "beginner" && !resource.audience.some((item) => item === "beginner" || item === "junior" || item === "student")) return false;
      if (!needle) return true;
      const haystack = [
        resource.name,
        resource.description,
        resource.label,
        resource.section,
        ...resource.tags,
        ...resource.categories,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [resources, section, quick, query, saved, showSaved]);

  const grouped = RESOURCE_SECTIONS.map((group) => ({
    ...group,
    items: matches.filter((item) => item.section === group.section),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="directory" className="scroll-mt-28">
      <div className="premium-panel overflow-hidden p-5 sm:p-7 md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">KURIRANA BAZA</p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] md:text-5xl">
            Pronađite pravi resurs bez lutanja.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#60736b] md:text-base">
            Pretražujte po nazivu, oblasti ili nameni. Baza uključuje zvanične servise, besplatne i open-source alate, kurseve, sigurnost, poslovanje i izvore poslova.
          </p>
        </div>

        <label className="mx-auto mt-8 flex min-h-14 max-w-3xl items-center gap-3 rounded-2xl border border-[#17312a]/12 bg-white px-4 shadow-[0_14px_40px_rgba(23,49,42,0.07)]">
          <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-[#eef3ed] text-lg">⌕</span>
          <span className="sr-only">Pretraga baze</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#8d9a94]"
            placeholder="npr. porez, engleski, portfolio, faktura, bezbednost..."
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="min-h-11 px-2 text-xs font-bold text-[#60736b]">
              Očisti
            </button>
          ) : null}
        </label>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {PRIMARY.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setSection(item);
                setShowSaved(false);
              }}
              className={`chip ${!showSaved && section === item ? "chip-active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-2 border-t border-[#17312a]/8 pt-4">
          {[
            ["serbia", "Za Srbiju"],
            ["free", "Besplatno"],
            ["official", "Zvanično"],
            ["open", "Open-source"],
            ["beginner", "Za početnike"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setQuick((current) => (current === id ? "none" : (id as QuickFilter)));
                setShowSaved(false);
              }}
              className={`chip chip-soft ${quick === id && !showSaved ? "chip-active" : ""}`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowSaved((value) => !value)}
            className={`chip chip-soft ${showSaved ? "chip-accent" : ""}`}
          >
            Sačuvano {saved.length ? `· ${saved.length}` : ""}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#75857e]">
          <strong className="text-[#17312a]">{matches.length}</strong>
          <span>rezultata</span>
          {query ? <><span>·</span><span>za “{query}”</span></> : null}
        </div>
      </div>

      <div className="mt-10 space-y-12 md:mt-14 md:space-y-16">
        {grouped.map((group) => (
          <section key={group.section} aria-labelledby={`group-${group.section}`}>
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.12em] ${group.accent}`}>
                  {group.items.length} RESURSA
                </span>
                <h3 id={`group-${group.section}`} className="mt-3 font-serif text-3xl tracking-[-0.025em] md:text-4xl">
                  {group.title}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#60736b]">{group.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  saved={saved.includes(resource.id)}
                  health={health[resource.id]}
                  onToggle={(id) => setSaved(toggleSavedResource(id))}
                />
              ))}
            </div>
          </section>
        ))}
        {matches.length === 0 ? (
          <div className="premium-panel py-16 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#eef3ed] text-2xl">⌕</div>
            <h3 className="mt-5 font-serif text-2xl">Nema rezultata za ovu kombinaciju.</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#60736b]">Probajte širi pojam ili uklonite jedan od filtera.</p>
            <button type="button" onClick={() => { setQuery(""); setSection("Sve"); setQuick("none"); setShowSaved(false); }} className="mt-5 rounded-full bg-[#17312a] px-5 py-3 text-xs font-bold text-white">
              Resetuj pretragu
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
