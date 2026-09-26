"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_LABELS, EMPLOYMENT_LABELS, SENIORITY_LABELS } from "@/lib/classify";
import type { JobCategory, Seniority } from "@/types";

const SELECT_CLASS =
  "min-h-11 rounded-full border border-[#17312a]/15 bg-white px-3 text-sm text-[#17312a]";

export function JobFilters({ defaultSerbia = true }: { defaultSerbia?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all" || value === "any") next.delete(key);
    else next.set(key, value);
    router.push(`/poslovi?${next.toString()}`);
  }

  function toggle(key: string, onValue = "1") {
    const next = new URLSearchParams(params.toString());
    const current = next.get(key);
    if (key === "srbija") {
      if (current === "0") next.delete("srbija");
      else next.set("srbija", "0");
    } else if (current === onValue) next.delete(key);
    else next.set(key, onValue);
    router.push(`/poslovi?${next.toString()}`);
  }

  const serbiaOn = params.get("srbija") !== "0" && defaultSerbia;

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const next = new URLSearchParams(params.toString());
        const q = String(data.get("q") ?? "").trim();
        if (q) next.set("q", q);
        else next.delete("q");
        router.push(`/poslovi?${next.toString()}`);
      }}
    >
      <label className="flex h-14 items-center gap-3 rounded-full border border-[#17312a]/15 bg-white px-5 shadow-sm">
        <span className="text-[#60736b]">⌕</span>
        <input
          name="q"
          defaultValue={params.get("q") ?? ""}
          className="w-full bg-transparent outline-none placeholder:text-[#8a9891]"
          placeholder="Pretražite naslov, kompaniju ili oblast"
          aria-label="Pretraga oglasa"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => toggle("srbija")}
          className={`min-h-11 rounded-full px-4 text-xs font-bold ${
            serbiaOn ? "bg-[#17312a] text-white" : "border border-[#17312a]/10 bg-white text-[#60736b]"
          }`}
        >
          Samo poslovi dostupni iz Srbije
        </button>
        <button
          type="button"
          onClick={() => toggle("pocetnik")}
          className={`min-h-11 rounded-full px-4 text-xs font-bold ${
            params.get("pocetnik") === "1"
              ? "bg-[#dc5b38] text-white"
              : "border border-[#17312a]/10 bg-white text-[#60736b]"
          }`}
        >
          Nemam iskustva
        </button>
        <button
          type="button"
          onClick={() => toggle("plata")}
          className={`min-h-11 rounded-full px-4 text-xs font-bold ${
            params.get("plata") === "1"
              ? "bg-[#17312a] text-white"
              : "border border-[#17312a]/10 bg-white text-[#60736b]"
          }`}
        >
          Samo sa platom
        </button>
        <button
          type="button"
          onClick={() => toggle("sakrij")}
          className={`min-h-11 rounded-full px-4 text-xs font-bold ${
            params.get("sakrij") === "1"
              ? "bg-[#17312a] text-white"
              : "border border-[#17312a]/10 bg-white text-[#60736b]"
          }`}
        >
          Sakrij pregledane
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1 text-xs font-bold text-[#60736b]">
          Lokacija
          <select
            className={SELECT_CLASS}
            value={params.get("lokacija") ?? ""}
            onChange={(event) => update("lokacija", event.target.value)}
          >
            <option value="">Sve</option>
            <option value="srbija">Srbija</option>
            <option value="europe">Europe</option>
            <option value="emea">EMEA</option>
            <option value="worldwide">Worldwide</option>
          </select>
        </label>
        <label className="grid gap-1 text-xs font-bold text-[#60736b]">
          Oblast
          <select
            className={SELECT_CLASS}
            value={params.get("oblast") ?? "all"}
            onChange={(event) => update("oblast", event.target.value)}
          >
            <option value="all">Sve</option>
            {(Object.keys(CATEGORY_LABELS) as JobCategory[]).map((key) => (
              <option key={key} value={key}>
                {CATEGORY_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs font-bold text-[#60736b]">
          Senioritet
          <select
            className={SELECT_CLASS}
            value={params.get("senioritet") ?? "all"}
            onChange={(event) => update("senioritet", event.target.value)}
          >
            <option value="all">Sve</option>
            {(Object.keys(SENIORITY_LABELS) as Seniority[])
              .filter((key) => key !== "unknown")
              .map((key) => (
                <option key={key} value={key}>
                  {SENIORITY_LABELS[key]}
                </option>
              ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs font-bold text-[#60736b]">
          Tip
          <select
            className={SELECT_CLASS}
            value={params.get("tip") ?? "all"}
            onChange={(event) => update("tip", event.target.value)}
          >
            <option value="all">Sve</option>
            {Object.entries(EMPLOYMENT_LABELS)
              .filter(([key]) => key !== "unknown")
              .map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs font-bold text-[#60736b]">
          Timezone
          <select
            className={SELECT_CLASS}
            value={params.get("zona") ?? "any"}
            onChange={(event) => update("zona", event.target.value)}
          >
            <option value="any">Bez ograničenja</option>
            <option value="cet">CET kompatibilno</option>
            <option value="cet2">CET ±2h</option>
            <option value="cet4">CET ±4h</option>
          </select>
        </label>
        <label className="grid gap-1 text-xs font-bold text-[#60736b]">
          Datum
          <select
            className={SELECT_CLASS}
            value={params.get("datum") ?? "all"}
            onChange={(event) => update("datum", event.target.value)}
          >
            <option value="all">Svi</option>
            <option value="24h">Poslednja 24h</option>
            <option value="3d">3 dana</option>
            <option value="7d">7 dana</option>
            <option value="30d">30 dana</option>
          </select>
        </label>
      </div>
    </form>
  );
}
