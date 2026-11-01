"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CountryBadge } from "@/components/CountryBadge";
import { BALKAN_COUNTRIES, getCountry } from "@/data/countries";
import { RESOURCES } from "@/data/sources";
import type { BalkanCountry, Resource } from "@/types";

type Mode = "job" | "freelance" | "ai" | "teaching" | "admin" | "career";

const MODES: Array<{ id: Mode; label: string }> = [
  { id: "job", label: "Stalni remote posao" },
  { id: "freelance", label: "Freelance projekti" },
  { id: "ai", label: "AI trening" },
  { id: "teaching", label: "Online podučavanje" },
  { id: "career", label: "CV i priprema" },
  { id: "admin", label: "Porezi i papiri" },
];

function matchesMode(resource: Resource, mode: Mode): boolean {
  switch (mode) {
    case "job":
      return resource.section === "Poslovi";
    case "freelance":
      return resource.section === "Freelance" && resource.label !== "AI trening" && !resource.categories.includes("teaching");
    case "ai":
      return resource.label === "AI trening" || (resource.section === "Freelance" && resource.categories.includes("ai"));
    case "teaching":
      return resource.categories.includes("teaching");
    case "career":
      return resource.section === "Karijera";
    case "admin":
      return resource.section === "Poslovanje" || resource.type === "salary";
  }
}

export function Wizard() {
  const [country, setCountry] = useState<BalkanCountry>("rs");
  const [mode, setMode] = useState<Mode>("job");
  const [level, setLevel] = useState<"beginner" | "experienced">("experienced");

  const sources = useMemo(() => {
    const junior = level === "beginner";
    const pool = RESOURCES.filter((resource) => matchesMode(resource, mode))
      .filter((resource) => resource.regionSupport !== "not-supported")
      .filter((resource) => !junior || resource.juniorFriendly !== false)
      // Lokalni servisi drugih zemalja ne pomažu; ostaju izabrana zemlja, Evropa i globalno.
      .filter((resource) => resource.country === country || resource.country === "eu" || resource.country === "global");
    const score = (resource: Resource) =>
      (resource.country === country ? 4 : 0) +
      (resource.featured ? 2 : 0) +
      (resource.regionSupport === "confirmed" ? 1 : 0) +
      (junior && resource.audience.some((item) => item === "beginner" || item === "junior") ? 1 : 0);
    return pool.sort((a, b) => score(b) - score(a)).slice(0, 8);
  }, [country, mode, level]);

  const selected = getCountry(country);

  const groups = [
    {
      title: "Zemlja",
      subtitle: "Odakle radite?",
      content: (
        <div className="grid grid-cols-2 gap-2">
          {BALKAN_COUNTRIES.map((item) => (
            <button
              key={item.code}
              type="button"
              aria-pressed={country === item.code}
              onClick={() => setCountry(item.code)}
              className={`chip flex min-w-0 items-center justify-start gap-2 !py-1 !pl-1.5 ${country === item.code ? "chip-active" : ""}`}
            >
              <CountryBadge code={item.code} className="size-7 text-[9px]" />
              <span className="truncate">{item.name}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Šta vam treba",
      subtitle: "Koji model rada ili pomoć tražite?",
      content: (
        <div className="flex flex-wrap gap-2">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              className={`chip ${mode === item.id ? "chip-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Iskustvo",
      subtitle: "Koji nivo vam je realan?",
      content: (
        <div className="flex flex-wrap gap-2">
          {[
            ["beginner", "Početnik / junior"],
            ["experienced", "Imam iskustva"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={level === id}
              onClick={() => setLevel(id as typeof level)}
              className={`chip ${level === id ? "chip-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-8">
      <section className="premium-panel relative overflow-hidden p-5 md:p-7">
        <div className="absolute -right-20 -top-20 size-56 rounded-full border-[36px] border-[#eef3ed]" aria-hidden />
        <div className="relative grid gap-4 lg:grid-cols-3">
          {groups.map((group, index) => (
            <fieldset key={group.title} className="rounded-[1.35rem] border border-[#17312a]/8 bg-white/82 p-5 shadow-[0_10px_28px_rgba(23,49,42,.035)]">
              <legend className="sr-only">{group.title}</legend>
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#17312a] text-[10px] font-bold text-white">0{index + 1}</span>
                <div>
                  <h2 className="font-serif text-2xl tracking-[-0.02em]">{group.title}</h2>
                  <p className="mt-1 text-xs text-[#7a8982]">{group.subtitle}</p>
                </div>
              </div>
              <div className="mt-5">{group.content}</div>
            </fieldset>
          ))}
        </div>
      </section>

      <section aria-live="polite">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">PREPORUČENI SERVISI</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Od ovoga možete da krenete.</h2>
            <p className="mt-2 text-sm text-[#60736b]">
              Prvo lokalni servisi za {selected.name}, zatim evropske i globalne platforme otvorene za region.
            </p>
          </div>
          <Link href="/izvori" className="text-xs font-bold text-[#dc5b38]">Cela baza →</Link>
        </div>

        {sources.length === 0 ? (
          <div className="premium-panel mt-6 p-8 text-sm text-[#60736b]">
            Za ovu kombinaciju još nemamo servise. Pogledajte ceo direktorijum za {selected.name}.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sources.map((source, index) => (
              <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[1.45rem] border border-[#17312a]/8 bg-white/95 p-5 shadow-[0_14px_34px_rgba(23,49,42,.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(23,49,42,.08)]">
                <div className="absolute -right-10 -top-10 size-24 rounded-full border-[16px] border-[#f3f6f2]" aria-hidden />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eef3ed] px-3 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#426052]">{source.section}</span>
                    <span className="rounded-full bg-[#f6f1e7] px-3 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#77613c]">
                      {source.country === "global" ? "Globalno" : getCountry(source.country).name}
                    </span>
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-[#17312a]/8 text-xs text-[#7e8c85] transition group-hover:text-[#dc5b38]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="relative mt-5 font-serif text-2xl tracking-[-0.025em]">{source.name}</h3>
                <p className="relative mt-2 text-sm leading-6 text-[#60736b]">{source.description}</p>
                <div className="relative mt-5 flex items-center justify-between border-t border-[#17312a]/7 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#8a9690]">{source.label}</span>
                  <span className="text-xs font-bold text-[#17312a]">Otvorite ↗</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#17312a]/10 bg-[#eef3ed] p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <CountryBadge code={selected.code} className="size-10 text-xs" />
              <p className="text-sm leading-6 text-[#52675f]">
                Svi lokalni portali, zavod, poreski portal i plate za {selected.name} su na jednoj stranici.
              </p>
            </div>
            <Link href={`/zemlje/${selected.slug}`} className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">
              Vodič: {selected.name} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
