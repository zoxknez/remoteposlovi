import Link from "next/link";
import { DirectoryExplorer } from "@/components/DirectoryExplorer";
import { JsonLd } from "@/components/JsonLd";
import { JobCard } from "@/components/JobCard";
import { RESOURCES } from "@/data/sources";
import { getJobFeed, jobStats } from "@/lib/jobs/aggregate";
import { isSerbiaLikely } from "@/lib/eligibility";
import { CATEGORY_LABELS } from "@/lib/classify";
import { pageMeta } from "@/lib/seo";
import type { JobCategory } from "@/types";

export const metadata = pageMeta(
  "Remote posao iz Srbije",
  "Pronađite aktuelne remote oglase, proverite da li su dostupni iz Srbije i koristite alate za CV, porez i praćenje prijava.",
  "/",
);

const HOME_CATEGORIES: JobCategory[] = [
  "engineering",
  "qa",
  "design",
  "marketing",
  "support",
  "sales",
  "writing",
  "teaching",
  "ai",
  "other",
];

export default async function Home() {
  const feed = await getJobFeed().catch(() => null);
  const jobs = feed?.jobs ?? [];
  const stats = jobStats(jobs);
  const latest = jobs.filter((job) => isSerbiaLikely(job.serbiaEligibility)).slice(0, 6);
  const fallbackLatest = latest.length ? latest : jobs.slice(0, 6);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Remote Poslovi",
          description: "Direktorijum remote izvora i oglasa za kandidate iz Srbije.",
        }}
      />
      <section className="relative overflow-hidden border-b border-[#17312a]/10 bg-[#e5f0df]">
        <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[70px] border-[#f5f8ee]" />
        <div className="relative mx-auto flex min-h-[390px] max-w-[1540px] flex-col items-center justify-center px-5 py-16 text-center md:px-12">
          <p className="mb-5 rounded-full border border-[#17312a]/15 bg-[#f8fbf4]/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.13em] text-[#4b6658]">
            REMOTE POSLOVI · SRBIJA · EVROPA · SVET
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#17312a] md:text-7xl">
            Pronađite posao koji možete da radite iz Srbije.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#52675f] md:text-lg">
            Oglasi, provera dostupnosti, plata, vremenska zona, CV alati, tracker prijava i poreske informacije na jednom mestu.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/poslovi"
              className="inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-6 text-sm font-bold text-white hover:bg-[#244239]"
            >
              Traži poslove
            </Link>
            <Link
              href="/wizard"
              className="inline-flex min-h-11 items-center rounded-full border border-[#17312a]/20 bg-white px-6 text-sm font-bold"
            >
              Gde da tražim?
            </Link>
          </div>
          {feed ? (
            <p className="mt-6 text-sm font-medium text-[#426052]">
              {stats.total} aktivnih oglasa · {stats.serbia} dostupnih iz Srbije · {stats.last24h} novih u 24h
            </p>
          ) : (
            <p className="mt-6 text-sm text-[#60736b]">
              Trenutno ne možemo osvežiti oglase. Direktorijum izvora je i dalje dostupan.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
        <section>
          <p className="text-center text-xs font-bold tracking-[0.14em] text-[#dc5b38]">ŠTA TRAŽIŠ?</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {HOME_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/poslovi?oblast=${category}`}
                className="min-h-20 rounded-lg border border-[#17312a]/10 bg-white p-5 text-center font-bold hover:border-[#17312a]/35"
              >
                {CATEGORY_LABELS[category]}
              </Link>
            ))}
          </div>
        </section>

        {fallbackLatest.length > 0 ? (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-serif text-4xl">Najnoviji poslovi</h2>
              <Link href="/poslovi" className="text-sm font-bold text-[#dc5b38]">
                Svi oglasi
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {fallbackLatest.map((job) => (
                <JobCard key={job.id} job={job} seen />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <h2 className="font-serif text-4xl">Gde želiš da tražiš?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Srbija", "/poslovi?lokacija=srbija&srbija=0", "Oglasi koji eksplicitno navode Srbiju."],
              ["Europe / EMEA", "/poslovi?lokacija=emea&srbija=0", "Evropske i EMEA uloge. Uslovi se i dalje proveravaju po oglasu."],
              ["Worldwide", "/poslovi?lokacija=worldwide&srbija=0", "Oglasi sa globalnom dostupnošću."],
            ].map(([title, href, text]) => (
              <Link key={title} href={href} className="rounded-lg border border-[#17312a]/10 bg-white p-6 hover:border-[#17312a]/30">
                <strong className="text-lg">{title}</strong>
                <p className="mt-2 text-sm text-[#60736b]">{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-4xl">Korisni alati</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["/alati", "CV i prijava"],
              ["/porez", "Porezi"],
              ["/plate", "Plate"],
              ["/provera-oglasa", "Provera oglasa"],
              ["/tracker", "Tracker"],
              ["/kako-da-radim", "Kako da radim"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="min-h-16 rounded-lg border border-[#17312a]/10 bg-white p-5 font-bold">
                {label}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-20">
          <p className="mb-8 text-center text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PROVERENI IZVORI</p>
          <DirectoryExplorer resources={RESOURCES} />
        </div>
      </div>

      <section className="border-t border-[#17312a]/10 bg-[#e5f0df] px-5 py-14 md:px-12">
        <div className="mx-auto grid max-w-[1540px] gap-7 text-center md:grid-cols-[1fr_auto] md:items-center md:text-left">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PREDLOŽITE RESURS</p>
            <h2 className="mt-2 font-serif text-3xl text-[#17312a]">Znate koristan izvor koji nedostaje?</h2>
            <p className="mt-2 text-sm text-[#52675f]">Pošaljite link i kratak opis, pa može biti dodat u direktorijum.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <a
              href="https://x.com/KoronVirus"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#17312a] px-5 py-3 text-sm font-bold text-white"
            >
              Pišite na X
            </a>
            <a
              href="mailto:zoxknez@hotmail.com?subject=Predlog%20resursa%20za%20Remote%20poslove"
              className="rounded-full border border-[#17312a]/20 bg-white px-5 py-3 text-sm font-bold"
            >
              Pošaljite email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
