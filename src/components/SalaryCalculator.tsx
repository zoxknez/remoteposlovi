"use client";

import { useState } from "react";
import { formatNumberSr } from "@/lib/format";

type Period = "hour" | "day" | "month" | "year";
type Currency = "EUR" | "USD" | "RSD";

const PERIODS: Array<[Period, string]> = [
  ["hour", "po satu"],
  ["day", "po danu"],
  ["month", "mesečno"],
  ["year", "godišnje"],
];

const INPUT =
  "min-h-11 rounded-xl border border-[#17312a]/15 bg-white px-3 text-sm text-[#17312a] focus:border-[#17312a]/40 focus:outline-none";

/** Preračun satnice/dnevnice/mesečne/godišnje zarade uz zadati broj sati nedeljno. */
export function SalaryCalculator({ rsdPerEur, rsdPerUsd }: { rsdPerEur: number | null; rsdPerUsd: number | null }) {
  const [amount, setAmount] = useState(25);
  const [period, setPeriod] = useState<Period>("hour");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [hours, setHours] = useState(40);

  const weeklyHours = Math.min(Math.max(hours || 0, 1), 80);
  const hoursPerYear = weeklyHours * 52;
  const yearly =
    period === "hour"
      ? amount * hoursPerYear
      : period === "day"
        ? amount * (weeklyHours / 8) * 52
        : period === "month"
          ? amount * 12
          : amount;

  const toEur = (value: number) => {
    if (currency === "EUR") return value;
    if (!rsdPerEur) return null;
    if (currency === "RSD") return value / rsdPerEur;
    return rsdPerUsd ? (value * rsdPerUsd) / rsdPerEur : null;
  };
  const toRsd = (value: number) => {
    if (currency === "RSD") return value;
    const rate = currency === "EUR" ? rsdPerEur : rsdPerUsd;
    return rate ? value * rate : null;
  };

  const rows: Array<[string, number]> = [
    ["Po satu", yearly / hoursPerYear],
    ["Mesečno", yearly / 12],
    ["Godišnje", yearly],
  ];

  return (
    <div className="grid gap-6 rounded-2xl border border-[#17312a]/10 bg-white p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
      <div className="grid content-start gap-4">
        <label className="grid gap-1.5 text-xs font-bold text-[#426052]">
          Iznos
          <input
            type="number"
            min={0}
            inputMode="decimal"
            value={Number.isFinite(amount) ? amount : ""}
            onChange={(event) => setAmount(Number(event.target.value))}
            className={INPUT}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1.5 text-xs font-bold text-[#426052]">
            Valuta
            <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className={INPUT}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="RSD">RSD</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-xs font-bold text-[#426052]">
            Period
            <select value={period} onChange={(event) => setPeriod(event.target.value as Period)} className={INPUT}>
              {PERIODS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-1.5 text-xs font-bold text-[#426052]">
          Sati nedeljno
          <input
            type="number"
            min={1}
            max={80}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            className={INPUT}
          />
        </label>
        <p className="text-xs leading-5 text-[#7c8c84]">
          Bruto, pre poreza i doprinosa. Pretpostavka: 52 radne nedelje, dan od 8 sati. Kurs: NBS srednji kurs.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#17312a]/10">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f5ef] text-left text-xs text-[#60736b]">
            <tr>
              <th className="px-4 py-3 font-semibold"> </th>
              <th className="px-4 py-3 font-semibold">EUR</th>
              <th className="px-4 py-3 font-semibold">RSD</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => {
              const eur = toEur(value);
              const rsd = toRsd(value);
              return (
                <tr key={label} className="border-t border-[#17312a]/10">
                  <th className="px-4 py-4 text-left font-semibold text-[#426052]">{label}</th>
                  <td className="px-4 py-4 font-serif text-xl tabular-nums text-[#17312a]">
                    {eur == null ? "-" : formatNumberSr(eur, label === "Po satu" ? 2 : 0)}
                  </td>
                  <td className="px-4 py-4 font-serif text-xl tabular-nums text-[#17312a]">
                    {rsd == null ? "-" : formatNumberSr(rsd, 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
