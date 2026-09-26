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

const SECTION_MARK: Partial<Record<ResourceSection, string>> = {
  Karijera: "CV",
  Učenje: "EDU",
  Poslovanje: "BIZ",
  Sigurnost: "SEC",
  Produktivnost: "PRO",
  Komunikacija: "COM",
  AI: "AI",
  Freelance: "FL",
  Poslovi: "JOB",
  "Remote rad": "REM",
};

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

  const baseMatches = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return resources.filter((resource) => {
      if (showSaved && !saved.includes(resource.id)) return false;
      if (quick === "serbia" && resource.serbiaSupport === "not-supported") return false;
      if (quick === "free" && resource.pricing !== "free") return false;
      if (quick === "official" && !resource.official) return false;
      if (quick === "open" && !resource.openSource) return false;
      if (
        quick === "beginner" &&
        !resource.audience.some((item) => item === "beginner" || item === "junior" || item === "student")
      ) return false;

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
  }, [resources, quick, query, saved, showSaved]);

  const matches = useMemo(
    () => section === "Sve" ? baseMatches : baseMatches.filter((resource) => resource.section === section),
    [baseMatches, section],
  );

  const grouped = useMemo(
    () => RESOURCE_SECTIONS.map((group) => ({
      ...group,
      items: matches.filter((item) => item.section === group.section),
    })).filter((group) => group.items.length > 0),
    [matches],
  );

  const categoryGroups = useMemo(
    () => RESOURCE_SECTIONS.map((group) => ({
      ...group,
      items: baseMatches.filter((item) => item.section === group.section),
      total: resources.filter((item) => item.section === group.section).length,
    })).filter((group) => group.items.length > 0),
    [baseMatches, resources],
  );

  const overviewMode = section === "Sve" && !query.trim() && !showSaved;
  const searchMode = section === "Sve" && Boolean(query.trim());

  function openSection(next: ResourceSection) {
    setSection(next);
    requestAnimationFrame(() => {
      document.getElementById("directory-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function resetAll() {
    setQuery("");
    setSection("Sve");
    setQuick("none");
    setShowSaved(false);
  }

  return (
    <section id="directory" className="scroll-mt-28">
      <div className="premium-panel relative overflow-hidden p-5 sm:p-7 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border-[44px] border-[#eef3ed]" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="eyebrow">KURIRANA BAZA</p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] md:text-5xl">
            Do pravog resursa u nekoliko klikova.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#60736b] md:text-base">
            Ne morate da pregledate celu bazu. Pretražite direktno, izaberite oblast ili uključite brzi filter.
          </p>
        </div>

        <div className="relative mx-auto mt-7 grid max-w-4xl gap-3 md:grid-cols-3">
          {[
            ["01", "Pretražite", "Ako znate šta vam treba, upišite pojam ispod."],
            ["02", "Izaberite oblast", "Karijera, učenje, porezi, sigurnost, AI i ostalo."],
            ["03", "Sužite rezultate", "Srbija, besplatno, zvanično, open-source ili početnici."],
          ].map(([num,title,text]) => (
            <div key={title} className="rounded-[1.15rem] border border-[#17312a]/8 bg-white/75 p-4 text-left shadow-[0_8px_22px_rgba(23,49,42,.035)]">
              <div className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#17312a] text-[10px] font-bold text-white">{num}</span>
                <div>
                  <p className="text-sm font-bold text-[#17312a]">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#718079]">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <label className="relative mx-auto mt-8 flex min-h-14 max-w-3xl items-center gap-3 rounded-2xl border border-[#17312a]/12 bg-white px-4 shadow-[0_14px_40px_rgba(23,49,42,0.07)]">
          <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-[#eef3ed] text-lg">⌕</span>
          <span className="sr-only">Pretraga baze</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (event.target.value) setSection("Sve");
            }}
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#8d9a94]"
            placeholder="npr. porez, engleski, portfolio, faktura, bezbednost..."
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="min-h-11 px-2 text-xs font-bold text-[#60736b]">
              Očistite
            </button>
          ) : null}
        </label>

        <div className="relative mt-7">
          <div className="mb-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7b8982]">1. Izaberite oblast</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
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
        </div>

        <div className="relative mt-5 border-t border-[#17312a]/8 pt-5">
          <div className="mb-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7b8982]">2. Po potrebi suzite rezultate</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
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
            onClick={() => {
              setShowSaved((value) => !value);
              setSection("Sve");
            }}
            className={`chip chip-soft ${showSaved ? "chip-accent" : ""}`}
          >
            Sačuvano {saved.length ? `· ${saved.length}` : ""}
          </button>
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#75857e]">
          <strong className="text-[#17312a]">{matches.length}</strong>
          <span>{overviewMode ? "resursa kroz kategorije" : "rezultata"}</span>
          {query ? <><span>·</span><span>za “{query}”</span></> : null}
        </div>
      </div>

      <div id="directory-results" className="scroll-mt-28">
        {overviewMode ? (
          <section className="mt-10 md:mt-14">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">OBLASTI</p>
                <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Baza po kategorijama</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#60736b]">
                Kliknite na oblast ispod. Tada će se prikazati samo resursi iz te kategorije, bez beskonačnog skrolovanja.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categoryGroups.map((group, index) => (
                <button
                  key={group.section}
                  type="button"
                  onClick={() => openSection(group.section)}
                  className="group relative min-h-[260px] overflow-hidden rounded-[1.65rem] border border-[#17312a]/8 bg-white p-6 text-left shadow-[0_16px_40px_rgba(23,49,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_26px_58px_rgba(23,49,42,.09)]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full border-[20px] border-[#f2f5f1]" aria-hidden />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`grid size-11 place-items-center rounded-2xl text-[10px] font-bold tracking-[.08em] ${group.accent}`}>
                        {SECTION_MARK[group.section] ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#8a9690]">Kategorija</p>
                        <p className="mt-0.5 text-xs font-semibold text-[#60736b]">{group.items.length} / {group.total} resursa</p>
                      </div>
                    </div>
                    <span className="grid size-10 place-items-center rounded-full border border-[#17312a]/8 bg-white text-[#87958e] transition group-hover:translate-x-1 group-hover:border-[#dc5b38]/20 group-hover:text-[#dc5b38]">→</span>
                  </div>

                  <div className="relative mt-6 flex items-end justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.03em]">{group.title}</h4>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#60736b]">{group.description}</p>
                    </div>
                    <span className="hidden rounded-full bg-[#17312a] px-3 py-1.5 text-[10px] font-bold text-white sm:inline">OTVORITE</span>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {group.items.slice(0, 3).map((resource) => (
                      <span key={resource.id} className="rounded-full border border-[#17312a]/7 bg-[#f7f9f5] px-3 py-1.5 text-[10px] font-medium text-[#60736b]">
                        {resource.name}
                      </span>
                    ))}
                  </div>

                  <div className="relative mt-5 flex items-center justify-between border-t border-[#17312a]/7 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#8a9690]">Pregled oblasti</span>
                    <span className="text-xs font-bold text-[#17312a] transition group-hover:text-[#dc5b38]">Otvorite kategoriju →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-10 space-y-12 md:mt-14 md:space-y-16">
            {section !== "Sve" ? (
              <div className="flex flex-col justify-between gap-4 rounded-[1.35rem] border border-[#17312a]/8 bg-[#eef3ed] p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#6d7d75]">Aktivna kategorija</p>
                  <p className="mt-1 font-serif text-2xl">{section}</p>
                </div>
                <button type="button" onClick={() => setSection("Sve")} className="inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">
                  Sve kategorije
                </button>
              </div>
            ) : null}

            {searchMode ? (
              <div className="flex items-end justify-between gap-4">
                <div><p className="eyebrow">PRETRAGA</p><h3 className="mt-2 font-serif text-3xl">Rezultati kroz sve kategorije</h3></div>
                <span className="text-xs font-semibold text-[#7a8982]">{matches.length} rezultata</span>
              </div>
            ) : null}

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
                <button type="button" onClick={resetAll} className="mt-5 rounded-full bg-[#17312a] px-5 py-3 text-xs font-bold text-white">
                  Resetujte pretragu
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
