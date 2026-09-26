"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RESOURCES } from "@/data/sources";
import { filtersToQuery } from "@/lib/jobs/filters";
import type { JobCategory, Resource } from "@/types";

const AREAS: Array<{ id: JobCategory | "all"; label: string }> = [
  { id: "engineering", label: "IT i Engineering" },
  { id: "qa", label: "QA" },
  { id: "design", label: "Dizajn" },
  { id: "marketing", label: "Marketing" },
  { id: "support", label: "Podrška" },
  { id: "sales", label: "Prodaja" },
  { id: "writing", label: "Pisanje" },
  { id: "teaching", label: "Podučavanje" },
  { id: "ai", label: "AI" },
  { id: "administration", label: "Administracija" },
  { id: "all", label: "Još uvek biram" },
];

export function Wizard() {
  const [area, setArea] = useState<JobCategory | "all">("all");
  const [experience, setExperience] = useState<"junior" | "mid" | "senior">("mid");
  const [place, setPlace] = useState<"serbia" | "europe" | "worldwide">("serbia");
  const [type, setType] = useState<"full-time" | "freelance" | "contract">("full-time");

  const sources: Resource[] = useMemo(() => {
    return RESOURCES.filter((resource) => {
      if (place === "serbia" && resource.serbiaSupport === "not-supported") return false;
      if (experience === "junior" && resource.juniorFriendly === false) return false;
      if (type === "freelance" && resource.kind !== "Freelance" && resource.type !== "freelance") {
        return resource.kind === "Oglasi";
      }
      if (area !== "all" && resource.categories.length && !resource.categories.includes(area) && !resource.categories.includes("other")) {
        return resource.featured || resource.serbiaSupport === "confirmed";
      }
      return resource.kind === "Oglasi" || resource.kind === "Freelance";
    }).slice(0, 8);
  }, [area, experience, place, type]);

  const jobsQuery = filtersToQuery({
    category: area === "all" ? "all" : area,
    junior: experience === "junior",
    serbiaOnly: place === "serbia",
    location: place === "europe" ? "europe" : place === "worldwide" ? "worldwide" : undefined,
    type,
  });

  return (
    <div className="grid gap-6">
      <fieldset className="grid gap-2">
        <legend className="text-sm font-bold">Šta tražiš?</legend>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setArea(item.id)}
              className={`min-h-11 rounded-full px-4 text-xs font-bold ${
                area === item.id ? "bg-[#17312a] text-white" : "border border-[#17312a]/10 bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-bold">Koliko iskustva imaš?</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["junior", "Početnik / junior"],
            ["mid", "Mid"],
            ["senior", "Senior"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setExperience(id as typeof experience)}
              className={`min-h-11 rounded-full px-4 text-xs font-bold ${
                experience === id ? "bg-[#17312a] text-white" : "border border-[#17312a]/10 bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-bold">Odakle radiš?</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["serbia", "Srbija"],
            ["europe", "Evropa / EMEA"],
            ["worldwide", "Worldwide"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPlace(id as typeof place)}
              className={`min-h-11 rounded-full px-4 text-xs font-bold ${
                place === id ? "bg-[#17312a] text-white" : "border border-[#17312a]/10 bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-bold">Tip angažmana</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["full-time", "Full-time"],
            ["contract", "Contract"],
            ["freelance", "Freelance"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setType(id as typeof type)}
              className={`min-h-11 rounded-full px-4 text-xs font-bold ${
                type === id ? "bg-[#17312a] text-white" : "border border-[#17312a]/10 bg-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <section>
        <h2 className="font-serif text-3xl">Najrelevantniji izvori za tebe</h2>
        <ul className="mt-4 grid gap-3">
          {sources.map((source) => (
            <li key={source.id} className="rounded-lg border border-[#17312a]/10 bg-white p-4">
              <a href={source.url} target="_blank" rel="noreferrer" className="font-bold text-[#17312a]">
                {source.name}
              </a>
              <p className="text-sm text-[#60736b]">{source.description}</p>
            </li>
          ))}
        </ul>
        <Link
          href={`/poslovi?${jobsQuery}`}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-sm font-bold text-white"
        >
          Trenutno pronađeni relevantni oglasi
        </Link>
      </section>
    </div>
  );
}
