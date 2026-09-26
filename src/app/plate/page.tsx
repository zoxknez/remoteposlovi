import Link from "next/link";
import { CATEGORY_LABELS, SENIORITY_LABELS } from "@/lib/classify";
import { formatNumberSr } from "@/lib/format";
import { getFxRates } from "@/lib/fx";
import { getJobFeed } from "@/lib/jobs/aggregate";
import { annualizeSalary } from "@/lib/salary";
import { pageMeta } from "@/lib/seo";
import type { JobCategory, Seniority } from "@/types";

export const metadata = pageMeta(
  "Plate iz javnih oglasa",
  "Rasponi plata iz trenutno preuzetih oglasa, uz linkove ka Levels.fyi, Glassdoor, HelloWorld i Joberty. Bez izmišljenih proseka.",
  "/plate",
);

export default async function PlatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = (typeof params.oblast === "string" ? params.oblast : "all") as JobCategory | "all";
  const seniority = (typeof params.senioritet === "string" ? params.senioritet : "all") as Seniority | "all";
  const scope = typeof params.obuhvat === "string" ? params.obuhvat : "all";
  const [feed, fx] = await Promise.all([getJobFeed(), getFxRates().catch(() => null)]);

  const jobs = feed.jobs.filter((job) => {
    if (job.salaryMin == null && job.salaryMax == null) return false;
    if (category !== "all" && job.category !== category) return false;
    if (seniority !== "all" && job.seniority !== seniority) return false;
    if (scope === "srbija" && job.serbiaEligibility !== "CONFIRMED_SERBIA") return false;
    if (scope === "eu" && !["EUROPE", "EMEA", "CONFIRMED_SERBIA"].includes(job.serbiaEligibility)) return false;
    if (scope === "global" && job.serbiaEligibility !== "WORLDWIDE") return false;
    return true;
  });

  const annuals = jobs
    .map((job) => {
      const value = job.salaryMax ?? job.salaryMin;
      if (value == null) return null;
      return annualizeSalary(value, job.salaryPeriod);
    })
    .filter((value): value is number => value != null)
    .sort((a, b) => a - b);

  const enough = annuals.length >= 3;

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Plate</h1>
      <p className="mt-4 max-w-2xl text-[#52675f]">
        Nemamo jednu tačnu platu. Prikazujemo raspon iz oglasa koji su trenutno u feedu i šaljemo vas na javne izvore.
      </p>
      <form method="get" action="/plate" className="mt-6 flex flex-wrap gap-3">
        <select name="oblast" defaultValue={category} className="min-h-11 rounded-full border px-3 text-sm">
          <option value="all">Sve uloge</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <select name="senioritet" defaultValue={seniority} className="min-h-11 rounded-full border px-3 text-sm">
          <option value="all">Sav senioritet</option>
          {Object.entries(SENIORITY_LABELS)
            .filter(([key]) => key !== "unknown")
            .map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
        </select>
        <select name="obuhvat" defaultValue={scope} className="min-h-11 rounded-full border px-3 text-sm">
          <option value="all">Svi oglasi sa platom</option>
          <option value="srbija">Srbija potvrđena</option>
          <option value="eu">Remote EU / EMEA</option>
          <option value="global">Remote globalno</option>
        </select>
        <button className="min-h-11 rounded-full bg-[#17312a] px-4 text-sm font-bold text-white">Prikaži</button>
      </form>
      <section className="mt-8 rounded-lg border border-[#17312a]/10 bg-white p-6">
        {enough ? (
          <div>
            <p>Broj oglasa sa platom: {annuals.length}</p>
            <p>
              Raspon (godišnje, mešovite valute, grubo): {formatNumberSr(annuals[0])} -{" "}
              {formatNumberSr(annuals[annuals.length - 1])}
            </p>
            <p className="mt-2 text-sm text-[#7c8c84]">
              Ovo nije prosek tržišta. Valute i periodi se razlikuju. {fx ? `NBS kurs od ${fx.publishedOn}.` : ""}
            </p>
          </div>
        ) : (
          <p>Nema dovoljno pouzdanih podataka za ovu kombinaciju filtera.</p>
        )}
      </section>
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Drugi javni izvori</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          <li>
            <a href="https://www.levels.fyi/" className="text-[#dc5b38]" target="_blank" rel="noreferrer">
              Levels.fyi
            </a>
          </li>
          <li>
            <a href="https://www.glassdoor.com/Salaries/index.htm" className="text-[#dc5b38]" target="_blank" rel="noreferrer">
              Glassdoor
            </a>
          </li>
          <li>
            <a href="https://www.helloworld.rs/" className="text-[#dc5b38]" target="_blank" rel="noreferrer">
              HelloWorld
            </a>
          </li>
          <li>
            <a href="https://joberty.com/" className="text-[#dc5b38]" target="_blank" rel="noreferrer">
              Joberty
            </a>
          </li>
        </ul>
      </section>
      <Link href="/poslovi?plata=1" className="mt-8 inline-flex min-h-11 items-center font-bold text-[#dc5b38]">
        Oglasi sa objavljenom platom
      </Link>
    </main>
  );
}
