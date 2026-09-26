import Link from "next/link";
import { DirectoryExplorer } from "@/components/DirectoryExplorer";
import { JobCard } from "@/components/JobCard";
import { JsonLd } from "@/components/JsonLd";
import { RESOURCES } from "@/data/sources";
import { getJobFeed } from "@/lib/jobs/aggregate";
import { isSerbiaLikely } from "@/lib/eligibility";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Kurirana baza za remote rad",
  "Provereni resursi za remote karijeru, freelance, učenje, CV, poreze, fakture, bezbednost, produktivnost i rad iz Srbije.",
  "/",
);

const PATHS = [
  { title: "Karijera", text: "CV, portfolio, engleski, intervju i plate.", href: "/izvori", mark: "01" },
  { title: "Učenje", text: "Roadmaps, kursevi i praktične putanje za nove veštine.", href: "/izvori", mark: "02" },
  { title: "Poslovanje", text: "Porezi, APR, ePorezi, fakture, kurs i administracija.", href: "/izvori", mark: "03" },
  { title: "Sigurnost", text: "Provera domena, phishing, curenja podataka i zaštita naloga.", href: "/izvori", mark: "04" },
  { title: "Remote workflow", text: "Time tracking, timezone, komunikacija i organizacija rada.", href: "/izvori", mark: "05" },
  { title: "AI za posao", text: "Nekoliko široko korisnih AI alata, bez kataloga od 500 servisa.", href: "/izvori", mark: "06" },
];

const TOOL_SUITE = [
  { href: "/alati", title: "CV i prijava", text: "Prompt studio + provereni CV/ATS resursi." },
  { href: "/porez", title: "Poreski kalkulator", text: "Informativni obračun za freelancere u 2026." },
  { href: "/plate", title: "Plate", text: "Javni salary izvori i rasponi iz oglasa bez lažnih proseka." },
  { href: "/provera-oglasa", title: "Provera oglasa", text: "Lokalna provera rizičnih signala, bez lažnog scam score-a." },
  { href: "/tracker", title: "Tracker", text: "Sačuvano, prijavljeno, intervju, ponuda i follow-up." },
  { href: "/wizard", title: "Gde da krenem?", text: "Kratak vodič do najrelevantnijih izvora za vaš profil." },
];

export default async function Home() {
  const feed = await getJobFeed().catch(() => null);
  const jobs = feed?.jobs ?? [];
  const latest = jobs.filter((job) => isSerbiaLikely(job.serbiaEligibility)).slice(0, 3);
  const fallbackLatest = latest.length ? latest : jobs.slice(0, 3);

  const official = RESOURCES.filter((item) => item.official).length;
  const free = RESOURCES.filter((item) => item.pricing === "free").length;
  const open = RESOURCES.filter((item) => item.openSource).length;
  const nonJobs = RESOURCES.filter((item) => item.section !== "Poslovi").length;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Remote Poslovi",
          description: "Kurirana baza resursa za remote rad i freelance sa fokusom na Srbiju.",
        }}
      />

      <section className="relative overflow-hidden border-b border-[#17312a]/8 bg-[#e8f1e4]">
        <div className="absolute -left-24 -top-32 size-[34rem] rounded-full bg-white/45 blur-3xl" />
        <div className="absolute -bottom-40 right-0 size-[32rem] rounded-full bg-[#d8e6d1]/70 blur-3xl" />
        <div className="relative mx-auto grid min-h-[520px] max-w-[1540px] items-center gap-10 px-5 py-16 md:px-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="eyebrow">REMOTE RAD · SRBIJA · 2026</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-[#17312a] md:text-7xl">
              Manje lutanja. Više korisnih, proverenih resursa.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#52675f] md:text-lg">
              Kurirana baza za karijeru, freelance, učenje, poreze, fakture, sigurnost, produktivnost i svakodnevni remote rad. Oglasi postoje, ali više nisu centar proizvoda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#directory" className="inline-flex min-h-12 items-center rounded-full bg-[#17312a] px-6 text-sm font-bold text-white transition hover:bg-[#244239]">
                Istražite bazu
              </a>
              <Link href="/wizard" className="inline-flex min-h-12 items-center rounded-full border border-[#17312a]/14 bg-white/80 px-6 text-sm font-bold text-[#17312a]">
                Ne znam odakle da krenem
              </Link>
            </div>
          </div>

          <div className="premium-panel grid grid-cols-2 gap-px overflow-hidden bg-[#17312a]/8 p-0">
            {[
              [RESOURCES.length, "ukupno resursa"],
              [nonJobs, "resursa van oglasa"],
              [official, "zvaničnih izvora"],
              [free, "potpuno besplatnih"],
              [open, "open-source resursa"],
              ["SR", "fokus na Srbiju"],
            ].map(([value, label]) => (
              <div key={String(label)} className="bg-white/90 p-6 md:p-8">
                <strong className="font-serif text-3xl text-[#17312a] md:text-4xl">{value}</strong>
                <p className="mt-2 text-xs font-semibold text-[#6d7e76]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
        <section>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">ŠTA VAM TREBA?</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] md:text-5xl">Sve oko remote rada, ne samo oglasi.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PATHS.map((item) => (
              <a key={item.title} href="#directory" className="premium-card group p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[.15em] text-[#dc5b38]">{item.mark}</span>
                  <span className="text-[#9aa59f] transition group-hover:translate-x-1 group-hover:text-[#dc5b38]">↘</span>
                </div>
                <h3 className="mt-8 font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#60736b]">{item.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <DirectoryExplorer resources={RESOURCES} />
        </section>

        <section className="mt-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">UGRAĐENI ALATI</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] md:text-5xl">Mali alati koji rešavaju konkretan problem.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#60736b]">
              Sve je napravljeno da radi bez naloga kad god je moguće. Osetljivi tekstovi i tracker ostaju u pregledaču.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_SUITE.map((item) => (
              <Link key={item.href} href={item.href} className="premium-card p-6">
                <span className="text-[10px] font-bold tracking-[.13em] text-[#dc5b38]">ALAT</span>
                <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#60736b]">{item.text}</p>
                <span className="mt-6 inline-flex text-xs font-bold text-[#17312a]">Otvori →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24 overflow-hidden rounded-[1.5rem] border border-[#dc5b38]/16 bg-[#fff5f0]">
          <div className="grid gap-8 p-6 md:p-9 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-[#dc5b38] px-3 py-1 text-[10px] font-bold tracking-[.12em] text-white">EKSPERIMENTALNO</span>
              <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] md:text-4xl">Live pretraga oglasa</h2>
              <p className="mt-3 text-sm leading-6 text-[#765f57]">
                Ovaj deo je koristan kao dodatak, ali još nije centralna funkcija. Feed, geografsku dostupnost i klasifikaciju oglasa treba posmatrati kao eksperimentalne.
              </p>
              <Link href="/poslovi" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">
                Otvori eksperimentalne oglase
              </Link>
            </div>
            {fallbackLatest.length ? (
              <div className="grid gap-4 md:grid-cols-3">
                {fallbackLatest.map((job) => <JobCard key={job.id} job={job} seen />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#dc5b38]/12 bg-white/75 p-8 text-sm text-[#765f57]">
                Live feed trenutno nije dostupan. Kurirana baza resursa iznad radi nezavisno od njega.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
