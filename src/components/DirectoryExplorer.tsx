"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CountryBadge } from "@/components/CountryBadge";
import { ResourceCard } from "@/components/ResourceCard";
import { ALL_SCOPES, getCountry } from "@/data/countries";
import { RESOURCE_SECTIONS } from "@/data/sources";
import { getSavedResources, toggleSavedResource } from "@/lib/storage";
import type { CountryCode, Resource, ResourceSection, SourceHealth } from "@/types";

const PRIMARY: Array<ResourceSection | "Sve"> = [
  "Sve",
  "Poslovi",
  "Freelance",
  "Karijera",
  "Poslovanje",
  "Učenje",
  "Sigurnost",
  "Produktivnost",
  "Komunikacija",
  "AI",
  "Zajednice",
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
  Zajednice: "ZAJ",
  "Remote rad": "REM",
};

type QuickFilter = "none" | "region" | "free" | "official" | "open" | "beginner";

// Ispod ovog broja servisa zemlja se prikazuje odmah kao lista, bez kartica oblasti.
const COMPACT_LIMIT = 18;

function OverviewCard({
  mark,
  kicker,
  count,
  title,
  text,
  items,
  onClick,
}: {
  mark: React.ReactNode;
  kicker: string;
  count: string;
  title: string;
  text: string;
  items: Resource[];
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative min-h-[260px] overflow-hidden rounded-[1.65rem] border border-[#17312a]/8 bg-white p-6 text-left shadow-[0_16px_40px_rgba(23,49,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#17312a]/14 hover:shadow-[0_26px_58px_rgba(23,49,42,.09)]"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full border-[20px] border-[#f2f5f1]" aria-hidden />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {mark}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#8a9690]">{kicker}</p>
            <p className="mt-0.5 text-xs font-semibold text-[#60736b]">{count}</p>
          </div>
        </div>
        <span className="grid size-10 place-items-center rounded-full border border-[#17312a]/8 bg-white text-[#87958e] transition group-hover:translate-x-1 group-hover:border-[#dc5b38]/20 group-hover:text-[#dc5b38]">→</span>
      </div>

      <div className="relative mt-6">
        <h4 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.03em]">{title}</h4>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#60736b]">{text}</p>
      </div>

      <div className="relative mt-5 grid gap-2">
        {items.slice(0, 3).map((resource, resourceIndex) => (
          <div key={resource.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#17312a]/7 bg-[#f7f9f5] px-3.5 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#17312a]">{resource.name}</p>
              <p className="mt-0.5 truncate text-[10px] text-[#7a8982]">{resource.label}</p>
            </div>
            <span className="shrink-0 text-[10px] font-bold text-[#9aa59f]">{String(resourceIndex + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-[#17312a]/7 pt-4">
        <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#8a9690]">
          {items.length > 3 ? `+ još ${items.length - 3} servisa` : "Svi servisi prikazani"}
        </span>
        <span className="text-xs font-bold text-[#17312a] transition group-hover:text-[#dc5b38]">Prikažite sve →</span>
      </div>
    </button>
  );
}

export function DirectoryExplorer({
  resources,
  health: healthProp = {},
}: {
  resources: Resource[];
  health?: Record<string, SourceHealth>;
}) {
  const [country, setCountry] = useState<CountryCode | "all">("all");
  const [section, setSection] = useState<ResourceSection | "Sve">("Sve");
  const [quick, setQuick] = useState<QuickFilter>("none");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [health, setHealth] = useState<Record<string, SourceHealth>>(healthProp);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Početni filteri iz URL-a (?q=, ?zemlja=), da bi pretraga sa naslovne i linkovi ka zemlji radili.
    const params = new URLSearchParams(window.location.search);
    const initialCountry = ALL_SCOPES.find((scope) => scope.slug === params.get("zemlja"))?.code;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setSaved(getSavedResources());
      if (params.get("q")) setQuery(params.get("q") ?? "");
      if (initialCountry) setCountry(initialCountry);
      setReady(true);
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

  useEffect(() => {
    // Čeka početno čitanje URL-a, inače bi prvi prolaz obrisao ?zemlja= pre nego što se primeni.
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    if (country !== "all") params.set("zemlja", getCountry(country).slug);
    else params.delete("zemlja");
    const search = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`);
  }, [query, country, ready]);

  const baseMatches = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return resources.filter((resource) => {
      if (showSaved && !saved.includes(resource.id)) return false;
      if (quick === "region" && resource.regionSupport !== "confirmed") return false;
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
        getCountry(resource.country).name,
        ...resource.tags,
        ...resource.categories,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [resources, quick, query, saved, showSaved]);

  const countryCounts = useMemo(() => {
    const counts = new Map<CountryCode, number>();
    for (const resource of baseMatches) counts.set(resource.country, (counts.get(resource.country) ?? 0) + 1);
    return counts;
  }, [baseMatches]);

  const countryMatches = useMemo(
    () => (country === "all" ? baseMatches : baseMatches.filter((resource) => resource.country === country)),
    [baseMatches, country],
  );

  const matches = useMemo(
    () => section === "Sve" ? countryMatches : countryMatches.filter((resource) => resource.section === section),
    [countryMatches, section],
  );

  const grouped = useMemo(() => {
    const bySection = RESOURCE_SECTIONS.map((group) => ({
      ...group,
      items: matches.filter((item) => item.section === group.section),
    })).filter((group) => group.items.length > 0);
    // Mala zemlja bi dobila po jednu karticu u svakoj oblasti; tada je jedna mreža preglednija.
    if (country === "all" || section !== "Sve" || matches.length > COMPACT_LIMIT || bySection.length < 2) return bySection;
    return [{
      section: "Poslovi" as ResourceSection,
      title: `Svi servisi: ${getCountry(country).name}`,
      description: "Portali za posao, zavodi, porezi, plate i zajednice, poređani po oblastima.",
      accent: "bg-[#edf3eb] text-[#426052]",
      items: bySection.flatMap((group) => group.items),
    }];
  }, [matches, country, section]);

  const categoryGroups = useMemo(
    () => RESOURCE_SECTIONS.map((group) => ({
      ...group,
      items: countryMatches.filter((item) => item.section === group.section),
      total: resources.filter(
        (item) => item.section === group.section && (country === "all" || item.country === country),
      ).length,
    })).filter((group) => group.items.length > 0),
    [countryMatches, resources, country],
  );

  const countryGroups = useMemo(
    () => ALL_SCOPES.map((scope) => ({
      scope,
      items: baseMatches
        .filter((item) => item.country === scope.code)
        .sort((a, b) => Number(b.featured) - Number(a.featured)),
    })).filter((group) => group.items.length > 0),
    [baseMatches],
  );

  const browsing = section === "Sve" && !query.trim() && !showSaved;
  const countryOverview = browsing && country === "all";
  const overviewMode = browsing && country !== "all" && countryMatches.length > COMPACT_LIMIT;
  const searchMode = section === "Sve" && Boolean(query.trim());
  const activeCountry = country === "all" ? null : getCountry(country);
  const filtered = country !== "all" || section !== "Sve" || quick !== "none" || Boolean(query) || showSaved;

  function scrollToResults() {
    requestAnimationFrame(() => {
      document.getElementById("directory-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function resetAll() {
    setQuery("");
    setCountry("all");
    setSection("Sve");
    setQuick("none");
    setShowSaved(false);
  }

  return (
    <section id="directory" className="scroll-mt-28">
      <div className="premium-panel relative overflow-hidden p-5 sm:p-7 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border-[44px] border-[#eef3ed]" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="eyebrow">SVI SERVISI NA JEDNOM MESTU</p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] md:text-5xl">
            Cela baza je ovde, podeljena po zemljama i oblastima.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[#60736b] md:text-base">
            Baza sadrži {resources.length} servisa za osam zemalja Balkana, Evropu i ceo svet. Izaberite zemlju, pa
            oblast, a servis otvarate direktno kod njih.
          </p>
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
            placeholder="npr. porez Hrvatska, zavod, engleski, portfolio, faktura..."
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="min-h-11 px-2 text-xs font-bold text-[#60736b]">
              Očistite
            </button>
          ) : null}
        </label>

        <div className="relative mt-7">
          <div className="mb-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7b8982]">1. Izaberite zemlju</p>
          </div>
          <div className="country-scroller -mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
            <div className="mx-auto flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
              <button
                type="button"
                aria-pressed={country === "all"}
                onClick={() => setCountry("all")}
                className={`chip ${country === "all" ? "chip-active" : ""}`}
              >
                Sve zemlje <span className="opacity-60">{baseMatches.length}</span>
              </button>
              {ALL_SCOPES.map((scope) => {
                const count = countryCounts.get(scope.code) ?? 0;
                const active = country === scope.code;
                return (
                  <button
                    key={scope.code}
                    type="button"
                    aria-pressed={active}
                    disabled={count === 0 && !active}
                    onClick={() => setCountry(scope.code)}
                    className={`chip inline-flex items-center gap-2 !py-1 !pl-1.5 disabled:opacity-40 ${active ? "chip-active" : ""}`}
                  >
                    <CountryBadge code={scope.code} className="size-7 text-[9px]" />
                    {scope.name}
                    <span className="opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-5 border-t border-[#17312a]/8 pt-5">
          <div className="mb-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7b8982]">2. Izaberite oblast</p>
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
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7b8982]">3. Po potrebi suzite rezultate</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
          {[
            ["region", "Potvrđeno za region"],
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
          <span>{countryOverview ? "servisa kroz zemlje" : overviewMode ? "servisa kroz oblasti" : "rezultata"}</span>
          {query ? <><span>·</span><span>za “{query}”</span></> : null}
          {filtered ? (
            <>
              <span>·</span>
              <button type="button" onClick={resetAll} className="font-bold text-[#dc5b38] hover:underline">
                Poništite filtere
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div id="directory-results" className="scroll-mt-28">
        {activeCountry && !countryOverview ? (
          <div className="mt-10 flex flex-col justify-between gap-4 rounded-[1.35rem] border border-[#17312a]/8 bg-[#eef3ed] p-5 sm:flex-row sm:items-center md:mt-14">
            <div className="flex items-center gap-4">
              <CountryBadge code={activeCountry.code} className="size-12 text-sm" />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#6d7d75]">Aktivna zemlja</p>
                <p className="mt-1 font-serif text-2xl">{activeCountry.name}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeCountry.code !== "eu" && activeCountry.code !== "global" ? (
                <Link
                  href={`/zemlje/${activeCountry.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#17312a]/14 bg-white px-5 text-xs font-bold text-[#17312a]"
                >
                  Vodič za zemlju →
                </Link>
              ) : null}
              <button type="button" onClick={() => setCountry("all")} className="inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">
                Sve zemlje
              </button>
            </div>
          </div>
        ) : null}

        {countryOverview ? (
          <section className="mt-10 md:mt-14">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">ZEMLJE</p>
                <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Baza po zemljama</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#60736b]">
                Lokalni portali, zavodi i poreski servisi za svaku zemlju regiona, plus evropske i globalne platforme
                koje primaju ljude sa Balkana.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {countryGroups.map(({ scope, items }) => (
                <OverviewCard
                  key={scope.code}
                  mark={<CountryBadge code={scope.code} className="size-11 text-xs" />}
                  kicker={scope.code === "eu" || scope.code === "global" ? "Šire tržište" : "Zemlja"}
                  count={`${items.length} servisa`}
                  title={scope.name}
                  text={scope.intro}
                  items={items}
                  onClick={() => {
                    setCountry(scope.code);
                    setSection("Sve");
                    scrollToResults();
                  }}
                />
              ))}
            </div>
          </section>
        ) : overviewMode ? (
          <section className="mt-10 md:mt-14">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">OBLASTI</p>
                <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Baza po oblastima</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#60736b]">
                Kliknite na oblast ispod. Tada će se prikazati samo servisi iz te oblasti, bez beskonačnog skrolovanja.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categoryGroups.map((group, index) => (
                <OverviewCard
                  key={group.section}
                  mark={
                    <span className={`grid size-11 place-items-center rounded-2xl text-[10px] font-bold tracking-[.08em] ${group.accent}`}>
                      {SECTION_MARK[group.section] ?? String(index + 1).padStart(2, "0")}
                    </span>
                  }
                  kicker="Oblast"
                  count={`${group.items.length} / ${group.total} servisa`}
                  title={group.title}
                  text={group.description}
                  items={group.items}
                  onClick={() => {
                    setSection(group.section);
                    scrollToResults();
                  }}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-10 space-y-12 md:mt-14 md:space-y-16">
            {section !== "Sve" ? (
              <div className="flex flex-col justify-between gap-4 rounded-[1.35rem] border border-[#17312a]/8 bg-[#eef3ed] p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#6d7d75]">Aktivna oblast</p>
                  <p className="mt-1 font-serif text-2xl">{section}</p>
                </div>
                <button type="button" onClick={() => setSection("Sve")} className="inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">
                  Sve oblasti
                </button>
              </div>
            ) : null}

            {searchMode ? (
              <div className="flex items-end justify-between gap-4">
                <div><p className="eyebrow">PRETRAGA</p><h3 className="mt-2 font-serif text-3xl">Rezultati kroz sve oblasti</h3></div>
                <span className="text-xs font-semibold text-[#7a8982]">{matches.length} rezultata</span>
              </div>
            ) : null}

            {grouped.map((group) => (
              <section key={group.section} aria-labelledby={`group-${group.section}`}>
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.12em] ${group.accent}`}>
                      {group.items.length} SERVISA
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
                <p className="mx-auto mt-2 max-w-md text-sm text-[#60736b]">Probajte širi pojam, drugu zemlju ili uklonite jedan od filtera.</p>
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
