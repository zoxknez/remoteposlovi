import { unstable_cache } from "next/cache";
import { fetchText } from "@/lib/http";
import type { FxRates } from "@/types";

function parseNbsNumber(value: string): number {
  return Number.parseFloat(value.replace(/\./g, "").replace(",", "."));
}

async function fetchNbsRates(): Promise<FxRates> {
  const now = new Date();
  const belgrade = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
  const url = `https://webappcenter.nbs.rs/ExchangeRateWebApp/ExchangeRate/IndexByDate?Date=${belgrade}&ExchangeRateListTypeID=3`;
  const page = await fetchText(url, { timeoutMs: 10000 });
  if (!page.ok) throw new Error(`NBS HTTP ${page.status}`);
  const eur = page.text.match(/\bEUR\b[\s\S]{0,200}?(\d{2,3},\d{4})/);
  const usd = page.text.match(/\bUSD\b[\s\S]{0,200}?(\d{2,3},\d{4})/);
  const dateMatch = page.text.match(/FORMIRANA NA DAN\s+(\d{1,2}\.\d{1,2}\.\d{4})/i);
  if (!eur || !usd) throw new Error("NBS tabela nije parsirana");
  return {
    date: belgrade.split(".").reverse().join("-"),
    publishedOn: dateMatch?.[1] ?? belgrade,
    source: "Narodna banka Srbije - zvanični srednji kurs",
    sourceUrl: url,
    rsdPerEur: parseNbsNumber(eur[1]),
    rsdPerUsd: parseNbsNumber(usd[1]),
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchResenjeFallback(): Promise<FxRates> {
  const page = await fetchText("https://kurs.resenje.org/api/v1/rates/today", { timeoutMs: 8000 });
  const data = JSON.parse(page.text) as {
    rates: Array<{ code: string; exchange_middle: number; date_from: string }>;
  };
  const eur = data.rates.find((rate) => rate.code === "EUR");
  const usd = data.rates.find((rate) => rate.code === "USD");
  if (!eur || !usd) throw new Error("Fallback kurs nije dostupan");
  return {
    date: eur.date_from,
    publishedOn: eur.date_from,
    source: "NBS srednji kurs preko javnog agregatora kurs.resenje.org",
    sourceUrl: "https://www.nbs.rs/",
    rsdPerEur: eur.exchange_middle,
    rsdPerUsd: usd.exchange_middle,
    fetchedAt: new Date().toISOString(),
  };
}

async function loadFx(): Promise<FxRates> {
  try {
    return await fetchNbsRates();
  } catch {
    return fetchResenjeFallback();
  }
}

export const getFxRates = unstable_cache(loadFx, ["nbs-fx-v1"], {
  revalidate: 60 * 60 * 12,
  tags: ["fx"],
});

export function convertToRsd(amount: number, currency: string, fx: FxRates): number | null {
  const code = currency.toUpperCase();
  if (code === "RSD") return amount;
  if (code === "EUR") return amount * fx.rsdPerEur;
  if (code === "USD") return amount * fx.rsdPerUsd;
  return null;
}

export function convertAmount(
  amount: number,
  from: string,
  to: string,
  fx: FxRates,
): number | null {
  const rsd = convertToRsd(amount, from, fx);
  if (rsd == null) return null;
  const target = to.toUpperCase();
  if (target === "RSD") return rsd;
  if (target === "EUR") return rsd / fx.rsdPerEur;
  if (target === "USD") return rsd / fx.rsdPerUsd;
  return null;
}
