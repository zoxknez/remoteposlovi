"use client";

import { useEffect, useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { RESOURCE_GROUPS } from "@/data/sources";
import { getSavedResources, toggleSavedResource } from "@/lib/storage";
import type { Resource, SourceHealth } from "@/types";

const FILTERS = ["Sve", "Srbija", "Evropa / EMEA", "Globalno", "Freelance", "Alat"];

export function DirectoryExplorer({
  resources,
  health: healthProp = {},
}: {
  resources: Resource[];
  health?: Record<string, SourceHealth>;
}) {
  const [filter, setFilter] = useState("Sve");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [health, setHealth] = useState<Record<string, SourceHealth>>(healthProp);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setSaved(getSavedResources());
    });
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
    return resources.filter((resource) => {
      const matchesFilter =
        filter === "Sve" || resource.regions.includes(filter as never) || resource.kind === filter;
      const matchesSaved = !showSaved || saved.includes(resource.id);
      const haystack = `${resource.name} ${resource.description} ${resource.label}`.toLowerCase();
      return matchesFilter && matchesSaved && haystack.includes(query.toLowerCase());
    });
  }, [resources, filter, query, saved, showSaved]);

  const grouped = RESOURCE_GROUPS.map((group) => ({
    ...group,
    items: matches.filter((item) => item.kind === group.kind),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="directory" className="scroll-mt-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PRETRAGA IZVORA</p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] text-[#17312a] md:text-5xl">
          {showSaved ? "Sačuvani izvori" : filter === "Sve" ? "Svi izvori" : filter}
        </h2>
        <label className="mx-auto mt-8 flex h-14 max-w-2xl items-center gap-4 rounded-full border border-[#17312a]/15 bg-white px-6 shadow-sm">
          <span className="text-xl text-[#60736b]">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-base outline-none placeholder:text-[#8a9891]"
            placeholder="Pretražite platformu, oblast ili alat"
          />
        </label>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setFilter(item);
                setShowSaved(false);
              }}
              className={`min-h-11 rounded-full px-4 text-xs font-bold ${
                !showSaved && filter === item
                  ? "bg-[#17312a] text-white"
                  : "border border-[#17312a]/10 bg-white text-[#60736b]"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowSaved((value) => !value)}
            className={`min-h-11 rounded-full px-4 text-xs font-bold ${
              showSaved ? "bg-[#dc5b38] text-white" : "border border-[#17312a]/10 bg-white text-[#60736b]"
            }`}
          >
            Sačuvano ({saved.length})
          </button>
        </div>
        <p className="mt-5 text-sm font-medium text-[#60736b]">{matches.length} rezultata</p>
      </div>

      <div className="mt-12 space-y-16">
        {grouped.map((group) => (
          <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
            <div className="mb-6 grid overflow-hidden rounded-lg border border-[#17312a]/10 bg-white md:grid-cols-3">
              <div className="flex min-h-32 flex-col items-center justify-center border-b border-[#17312a]/10 p-6 text-center md:border-b-0 md:border-r">
                <span className={`grid size-14 place-items-center rounded-full text-sm font-bold ${group.color}`}>
                  {group.items.length}
                </span>
                <span className="mt-2 text-xs font-medium text-[#60736b]">izvora u kategoriji</span>
              </div>
              <div className="flex min-h-32 flex-col items-center justify-center border-b border-[#17312a]/10 p-6 text-center md:border-b-0 md:border-r">
                <p className="text-[11px] font-bold tracking-[0.14em] text-[#dc5b38]">{group.kind.toUpperCase()}</p>
                <h3 id={`group-${group.kind}`} className="mt-2 text-2xl font-semibold text-[#17312a]">
                  {group.title}
                </h3>
              </div>
              <div className="flex min-h-32 items-center justify-center p-6 text-center">
                <p className="max-w-xs text-sm leading-6 text-[#60736b]">{group.description}</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <p className="py-20 text-center text-sm text-[#60736b]">Nema izvora za ovaj filter ili pretragu.</p>
        ) : null}
      </div>
    </section>
  );
}
