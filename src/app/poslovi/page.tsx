import { Suspense } from "react";
import { JobFilters } from "@/components/JobFilters";
import { JobsWithSeen } from "@/components/JobsWithSeen";
import { JsonLd } from "@/components/JsonLd";
import { SavedSearchButton } from "@/components/SavedSearchButton";
import { emptyStateHint, filterJobs, parseJobFilters } from "@/lib/jobs/filters";
import { getJobFeed } from "@/lib/jobs/aggregate";
import { formatDateTimeSr } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Aktuelni remote poslovi",
  "Pregled remote oglasa iz javnih izvora, sa proverom dostupnosti iz Srbije, filterima i izvorom.",
  "/poslovi",
);

export default async function PosloviPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === "string") params.set(key, value);
  }
  const filters = parseJobFilters(params);
  const feed = await getJobFeed();
  const jobs = filterJobs(feed.jobs, filters);
  const failed = feed.meta.sources.filter((source) => !source.ok);
  const hints = jobs.length === 0 ? emptyStateHint(filters) : [];

  return (
    <main className="mx-auto max-w-[1540px] px-5 py-12 md:px-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Remote poslovi",
          hasPart: {
            "@type": "ItemList",
            numberOfItems: jobs.length,
            itemListElement: jobs.slice(0, 20).map((job, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://remoteposlovi.vercel.app/poslovi/${job.slug}`,
              name: job.title,
            })),
          },
        }}
      />
      <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">OGLASI</p>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">Poslovi koje možete da radite iz Srbije</h1>
      <p className="mt-4 max-w-2xl text-[#52675f]">
        Izvori: Remotive, Remote OK i javni Greenhouse boardovi. Filter za Srbiju uključuje
        eksplicitnu Srbiju i worldwide oglase. Remote samo po sebi nije dovoljno.
      </p>
      <p className="mt-2 text-sm text-[#7c8c84]">
        Osveženo: {formatDateTimeSr(feed.meta.fetchedAt)}. Remotive feed kasni do 24h po njihovim uslovima.
      </p>
      {failed.length > 0 ? (
        <p className="mt-4 rounded-lg bg-[#f8eee9] p-4 text-sm">
          Trenutno ne možemo osvežiti oglase sa jednog izvora ({failed.map((item) => item.name).join(", ")}).
          Prikazujemo uspešno preuzete podatke.
        </p>
      ) : null}
      <div className="mt-8">
        <Suspense>
          <JobFilters />
        </Suspense>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium">{jobs.length} oglasa</p>
        <Suspense>
          <SavedSearchButton currentCount={jobs.length} />
        </Suspense>
      </div>
      <div className="mt-8">
        {jobs.length === 0 ? (
          <div className="rounded-lg border border-[#17312a]/10 bg-white p-8">
            <p>Nema poslova koji odgovaraju svim izabranim filterima.</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#52675f]">
              {hints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          </div>
        ) : (
          <JobsWithSeen jobs={jobs} hideSeen={filters.hideSeen} />
        )}
      </div>
    </main>
  );
}
