import Link from "next/link";
import { ATS_BOARDS } from "@/data/ats-boards";
import { formatDateSr } from "@/lib/format";
import { getJobFeed } from "@/lib/jobs/aggregate";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Kompanije sa remote oglasima",
  "Kompanije iz javnih ATS boardova i trenutnog feeda oglasa. Srbija se proverava po oglasu, ne po imenu firme.",
  "/kompanije",
);

export default async function KompanijePage() {
  const feed = await getJobFeed();
  const grouped = new Map<string, { name: string; count: number; serbia: number; career?: string }>();
  for (const board of ATS_BOARDS) {
    grouped.set(board.name.toLowerCase(), {
      name: board.name,
      count: 0,
      serbia: 0,
      career: board.careerUrl,
    });
  }
  for (const job of feed.jobs) {
    const key = job.companyNormalized || job.company.toLowerCase();
    const current = grouped.get(key) ?? { name: job.company, count: 0, serbia: 0 };
    current.count += 1;
    if (job.serbiaEligibility === "CONFIRMED_SERBIA" || job.serbiaEligibility === "WORLDWIDE") {
      current.serbia += 1;
    }
    grouped.set(key, current);
  }
  const companies = Array.from(grouped.values())
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <main className="mx-auto max-w-[1540px] px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Kompanije</h1>
      <p className="mt-4 max-w-2xl text-[#52675f]">
        Kompanije koje trenutno imaju remote oglase u feedu. Oznaka za Srbiju znači da postoje oglasi sa potvrđenom
        Srbijom ili worldwide dostupnošću, ne da firma uvek zapošljava iz Srbije.
      </p>
      <p className="mt-2 text-sm text-[#7c8c84]">Poslednja provera: {formatDateSr(feed.meta.fetchedAt)}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <article key={company.name} className="rounded-lg border border-[#17312a]/10 bg-white p-6">
            <h2 className="font-serif text-2xl">{company.name}</h2>
            <p className="mt-2 text-sm">Remote oglasi u feedu: {company.count}</p>
            <p className="text-sm">
              Srbija: {company.serbia > 0 ? `potvrđena / worldwide na ${company.serbia} oglasa` : "zavisi od pozicije"}
            </p>
            <div className="mt-4 flex gap-3 text-sm font-bold text-[#dc5b38]">
              <Link href={`/poslovi?q=${encodeURIComponent(company.name)}&srbija=0`}>Poslovi</Link>
              {company.career ? (
                <a href={company.career} target="_blank" rel="noreferrer">
                  Career stranica ↗
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
