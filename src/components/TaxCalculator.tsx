"use client";

import { useMemo, useState } from "react";
import { TAX_DISCLAIMER, TAX_SOURCES } from "@/data/tax-2026";
import { formatMoneyRsd, formatPercent } from "@/lib/format";
import { calculateFreelancerTax } from "@/lib/tax";

export function TaxCalculator({
  rsdPerEur,
  rsdPerUsd,
  fxLabel,
  defaultAmount,
}: {
  rsdPerEur: number;
  rsdPerUsd: number;
  fxLabel: string;
  defaultAmount?: number;
}) {
  const [amount, setAmount] = useState(String(defaultAmount ?? 2000));
  const [currency, setCurrency] = useState<"RSD" | "EUR" | "USD">("EUR");
  const [period, setPeriod] = useState<"monthly" | "quarterly">("monthly");
  const [insured, setInsured] = useState(true);

  const result = useMemo(() => {
    const numeric = Number(amount.replace(",", "."));
    if (!Number.isFinite(numeric) || numeric < 0) return null;
    return calculateFreelancerTax({
      amount: numeric,
      currency,
      period,
      insuredElsewhere: insured,
      rsdPerEur,
      rsdPerUsd,
    });
  }, [amount, currency, period, insured, rsdPerEur, rsdPerUsd]);

  return (
    <div className="grid gap-6">
      <form className="grid gap-4 rounded-lg border border-[#17312a]/10 bg-white p-6 md:grid-cols-4">
        <label className="grid gap-1 text-sm font-bold">
          Prihod
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
          />
        </label>
        <label className="grid gap-1 text-sm font-bold">
          Valuta
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as typeof currency)}
            className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="RSD">RSD</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold">
          Period
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value as typeof period)}
            className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
          >
            <option value="monthly">Mesečno</option>
            <option value="quarterly">Kvartalno</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold">
          Zdravstveno
          <select
            value={insured ? "yes" : "no"}
            onChange={(event) => setInsured(event.target.value === "yes")}
            className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
          >
            <option value="yes">Osiguran po drugom osnovu</option>
            <option value="no">Nije osiguran po drugom osnovu</option>
          </select>
        </label>
      </form>
      <p className="text-xs text-[#7c8c84]">{fxLabel}</p>
      {result ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[result.option1, result.option2].map((option) => (
            <section
              key={option.option}
              className={`rounded-lg border p-6 ${
                result.cheaper === option.option
                  ? "border-[#17312a] bg-[#e5f0df]"
                  : "border-[#17312a]/10 bg-white"
              }`}
            >
              <h3 className="font-serif text-2xl">{option.name}</h3>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between">
                  <dt>Kvartalni bruto</dt>
                  <dd>{formatMoneyRsd(option.gross)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Normirani troškovi</dt>
                  <dd>{formatMoneyRsd(option.standardizedCosts)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Poreska osnovica</dt>
                  <dd>{formatMoneyRsd(option.taxableBase)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Porez</dt>
                  <dd>{formatMoneyRsd(option.tax)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>PIO</dt>
                  <dd>{formatMoneyRsd(option.pio)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Zdravstvo</dt>
                  <dd>{formatMoneyRsd(option.health)}</dd>
                </div>
                <div className="flex justify-between border-t border-[#17312a]/10 pt-2 font-bold">
                  <dt>Ukupno</dt>
                  <dd>{formatMoneyRsd(option.total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Efektivno opterećenje</dt>
                  <dd>{formatPercent(option.effectiveRate)}</dd>
                </div>
              </dl>
            </section>
          ))}
        </div>
      ) : null}
      <p className="text-sm text-[#52675f]">{TAX_DISCLAIMER}</p>
      <ul className="text-sm">
        {TAX_SOURCES.map((source) => (
          <li key={source.url}>
            <a href={source.url} className="text-[#dc5b38] underline" target="_blank" rel="noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
