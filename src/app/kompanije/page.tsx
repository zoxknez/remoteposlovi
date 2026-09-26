import Link from "next/link";
import { ATS_BOARDS } from "@/data/ats-boards";
import { formatDateSr } from "@/lib/format";
import { getJobFeed } from "@/lib/jobs/aggregate";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Kompanije iz eksperimentalnog feeda",
  "Eksperimentalni pregled kompanija iz javnih ATS boardova i trenutnog feeda oglasa.",
  "/kompanije",
);

export default async function KompanijePage() {
  const feed = await getJobFeed().catch(() => null);
  const grouped = new Map<string, { name: string; count: number; serbia: number; career?: string }>();

  for (const board of ATS_BOARDS) {
    grouped.set(board.name.toLowerCase(), { name: board.name, count: 0, serbia: 0, career: board.careerUrl });
  }
  for (const job of feed?.jobs ?? []) {
    const key = job.companyNormalized || job.company.toLowerCase();
    const current = grouped.get(key) ?? { name: job.company, count: 0, serbia: 0 };
    current.count += 1;
    if (job.serbiaEligibility === "CONFIRMED_SERBIA" || job.serbiaEligibility === "WORLDWIDE") current.serbia += 1;
    grouped.set(key, current);
  }

  const companies = Array.from(grouped.values()).filter((item) => item.count > 0).sort((a, b) => b.count - a.count);

  return (
    <main>
      <section className="border-b border-[#dc5b38]/14 bg-[#fff5f0]">
        <div className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16">
          <span className="inline-flex rounded-full bg-[#dc5b38] px-3 py-1 text-[10px] font-bold tracking-[.12em] text-white">EKSPERIMENTALNO · BETA</span>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Kompanije iz trenutno dostupnih javnih feedova.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#765f57]">
            Ovo nije lista firmi koje garantovano zapošljavaju iz Srbije. Prikazuje kompanije koje trenutno imaju oglase u eksperimentalnom feedu, uz broj pozicija koje parser vidi kao Srbiju ili worldwide.
          </p>
          {feed ? <p className="mt-3 text-xs text-[#92776e]">Feed osvežen: {formatDateSr(feed.meta.fetchedAt)}</p> : null}
        </div>
      </section>
      <div className="mx-auto max-w-[1540px] px-5 py-10 md:px-12 md:py-14">
        {companies.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {companies.map((company) => (
              <article key={company.name} className="premium-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold tracking-[.12em] text-[#dc5b38]">KOMPANIJA</span>
                  <span className="rounded-full bg-[#eef3ed] px-2.5 py-1 text-[10px] font-bold text-[#426052]">{company.count} oglasa</span>
                </div>
                <h2 className="mt-5 font-serif text-3xl tracking-[-0.025em]">{company.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[#60736b]">
                  {company.serbia > 0
                    ? `${company.serbia} oglasa trenutno imaju signal Srbija ili worldwide. Proverite originalni oglas.`
                    : "Dostupnost iz Srbije zavisi od konkretne pozicije."}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href={`/poslovi?q=${encodeURIComponent(company.name)}&srbija=0`} className="chip">Oglasi BETA</Link>
                  {company.career ? <a href={company.career} target="_blank" rel="noreferrer" className="chip">Career stranica ↗</a> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="premium-panel p-10 text-center">
            <h2 className="font-serif text-3xl">Feed trenutno nije dostupan.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#60736b]">Baza resursa i svi lokalni alati rade nezavisno od eksperimentalnog feeda oglasa.</p>
            <Link href="/izvori" className="mt-5 inline-flex rounded-full bg-[#17312a] px-5 py-3 text-xs font-bold text-white">Otvori bazu resursa</Link>
          </div>
        )}
      </div>
    </main>
  );
}
