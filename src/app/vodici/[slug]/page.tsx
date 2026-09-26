import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/data/guides";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const GUIDE_META: Record<string, { category: string; time: string; accent: string; resources: string[]; note?: string }> = {
  "kako-pronaci-remote-posao": {
    category: "Traženje posla",
    time: "4 min",
    accent: "bg-[#e9f1e6]",
    resources: ["LinkedIn Remote Srbija", "Himalayas", "Remote OK", "Remotive"],
    note: "Remote ne znači automatski dostupno iz Srbije. Uvek proverite lokaciju i work authorization u originalnom oglasu.",
  },
  "kako-napraviti-cv": {
    category: "CV",
    time: "3 min",
    accent: "bg-[#eef0f8]",
    resources: ["Reactive Resume", "Europass", "Jobscan", "Resume Worded"],
    note: "Najbolji CV je jasan i proverljiv. Ne dodajte veštine, rezultate ili titule koje ne možete da objasnite na intervjuu.",
  },
  "kako-prilagoditi-cv": {
    category: "CV",
    time: "3 min",
    accent: "bg-[#eef0f8]",
    resources: ["Jobscan", "Teal", "Resume Worded", "Europass"],
    note: "Prilagođavanje znači promena prioriteta i formulacije, ne izmišljanje iskustva.",
  },
  "cover-letter": {
    category: "Prijava",
    time: "2 min",
    accent: "bg-[#f6efe8]",
    resources: ["Teal", "LanguageTool", "DeepL Write"],
  },
  "provera-kompanije": {
    category: "Sigurnost",
    time: "4 min",
    accent: "bg-[#f5ece8]",
    resources: ["ICANN Lookup", "Glassdoor", "Joberty", "VirusTotal"],
    note: "Nijedan pojedinačni signal ne dokazuje da je firma legitimna. Kombinujte više provera.",
  },
  "prepoznavanje-prevare": {
    category: "Sigurnost",
    time: "3 min",
    accent: "bg-[#f5ece8]",
    resources: ["Nacionalni CERT Srbije", "VirusTotal", "Have I Been Pwned", "ICANN Lookup"],
    note: "Ako neko traži uplatu, kripto, gift kartice ili kupovinu opreme od njihovog dobavljača, prekinite proces i dodatno proverite oglas.",
  },
  "pregovaranje-plate": {
    category: "Plate",
    time: "4 min",
    accent: "bg-[#f3efe6]",
    resources: ["Levels.fyi", "Glassdoor", "Joberty", "HelloWorld"],
  },
  "employee-vs-contractor": {
    category: "Model rada",
    time: "4 min",
    accent: "bg-[#e9f1e6]",
    resources: ["Portal Frilenseri", "APR eRegistracija preduzetnika", "ePorezi"],
    note: "Izbor modela zavisi od konkretne situacije. Ovo nije pravni ili poreski savet.",
  },
  "sta-je-eor": {
    category: "Model rada",
    time: "3 min",
    accent: "bg-[#e9f1e6]",
    resources: ["Remote.com Jobs"],
  },
  "kako-primati-novac": {
    category: "Finansije",
    time: "3 min",
    accent: "bg-[#edf4f4]",
    resources: ["Narodna banka Srbije - kursna lista", "Portal Frilenseri"],
  },
  "poreska-prijava": {
    category: "Porezi",
    time: "4 min",
    accent: "bg-[#e9f1e6]",
    resources: ["Portal Frilenseri", "ePorezi", "Narodna banka Srbije - kursna lista"],
    note: "Konačan obračun i prijavu proverite na zvaničnom portalu Poreske uprave.",
  },
  "fakture-evidencija": {
    category: "Poslovanje",
    time: "3 min",
    accent: "bg-[#edf4f4]",
    resources: ["Sistem eFaktura", "Invoice Ninja", "Zoho Invoice", "Narodna banka Srbije - kursna lista"],
  },
};

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Vodič" };
  return pageMeta(guide.title, guide.summary, `/vodici/${guide.slug}`);
}

function buildTakeaways(body: string[]) {
  return body.map((paragraph) => {
    const firstSentence = paragraph.split(/(?<=[.!?])\s+/)[0];
    return firstSentence.length > 120 ? `${firstSentence.slice(0, 117)}...` : firstSentence;
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const meta = GUIDE_META[guide.slug] ?? {
    category: "Vodič",
    time: `${Math.max(2, Math.ceil(guide.body.join(" ").split(/\s+/).length / 180))} min`,
    accent: "bg-[#eef3ed]",
    resources: [],
  };

  const related = meta.resources
    .map((name) => RESOURCES.find((resource) => resource.name === name))
    .filter((resource): resource is NonNullable<typeof resource> => Boolean(resource))
    .slice(0, 4);

  const otherGuides = GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const takeaways = buildTakeaways(guide.body);

  return (
    <main>
      <section className={`relative overflow-hidden border-b border-[#17312a]/8 ${meta.accent}`}>
        <div className="absolute -right-24 -top-28 size-[30rem] rounded-full border-[70px] border-white/25" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-18">
          <Link href="/vodici" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-[#b94b30]">
            <span aria-hidden>←</span> Svi vodiči
          </Link>
          <div className="mt-5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#52675f]">
                {meta.category}
              </span>
              <span className="rounded-full border border-[#17312a]/10 bg-white/45 px-3 py-1.5 text-[10px] font-bold text-[#6e7b75]">
                {meta.time} čitanja
              </span>
              <span className="rounded-full border border-[#17312a]/10 bg-white/45 px-3 py-1.5 text-[10px] font-bold text-[#6e7b75]">
                Ažurirano 2026.
              </span>
            </div>
            <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-[-0.045em] text-[#17312a] md:text-7xl">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#52675f] md:text-lg">
              {guide.summary}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:px-12 md:py-14 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0">
          <section className="premium-panel p-5 md:p-7">
            <p className="eyebrow">UKRATKO</p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Najvažnije iz vodiča</h2>
            <ul className="mt-5 grid gap-3">
              {takeaways.map((item, index) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-[#17312a]/7 bg-white/75 p-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#17312a] text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[#52675f]">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 grid gap-5">
            {guide.body.map((paragraph, index) => (
              <section key={paragraph.slice(0, 28)} className="premium-card p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold tracking-[.14em] text-[#dc5b38]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-[#17312a]/8" />
                </div>
                <p className="mt-5 text-[1.02rem] leading-8 text-[#28483f] md:text-[1.08rem]">
                  {paragraph}
                </p>
              </section>
            ))}
          </div>

          {meta.note ? (
            <aside className="mt-8 rounded-[1.25rem] border border-[#dc5b38]/14 bg-[#fff5f0] p-6">
              <div className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dc5b38] text-sm font-bold text-white">!</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.12em] text-[#a54c34]">Važno</p>
                  <p className="mt-2 text-sm leading-6 text-[#765f57]">{meta.note}</p>
                </div>
              </div>
            </aside>
          ) : null}

          {related.length ? (
            <section className="mt-12">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">KORISNI RESURSI</p>
                  <h2 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Nastavite sa konkretnim alatima</h2>
                </div>
                <Link href="/izvori" className="hidden text-xs font-bold text-[#dc5b38] sm:inline">
                  Cela baza →
                </Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((resource) => (
                  <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="premium-card group p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#dc5b38]">{resource.label}</span>
                      <span className="text-[#94a099] transition group-hover:translate-x-1 group-hover:text-[#dc5b38]">↗</span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl">{resource.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#60736b]">{resource.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-12 flex flex-col gap-3 rounded-[1.5rem] bg-[#17312a] p-6 text-[#e7f0df] sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#a9c1b5]">SLEDEĆI KORAK</p>
              <h2 className="mt-2 font-serif text-3xl">Pronađite alat ili izvor za konkretan problem.</h2>
            </div>
            <Link href="/izvori" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#e7f0df] px-5 text-xs font-bold text-[#17312a]">
              Otvori bazu resursa
            </Link>
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="premium-panel p-5">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7a8982]">U OVOM VODIČU</p>
            <ol className="mt-4 grid gap-2">
              {takeaways.map((item, index) => (
                <li key={item} className="flex gap-3 border-b border-[#17312a]/6 py-2.5 last:border-0">
                  <span className="text-[10px] font-bold text-[#dc5b38]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-xs leading-5 text-[#60736b]">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 rounded-[1.25rem] border border-[#17312a]/8 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7a8982]">JOŠ VODIČA</p>
            <div className="mt-3 grid gap-1">
              {otherGuides.map((item) => (
                <Link key={item.slug} href={`/vodici/${item.slug}`} className="rounded-xl px-3 py-3 text-sm font-semibold text-[#17312a] transition hover:bg-[#eef3ed]">
                  {item.title}
                </Link>
              ))}
            </div>
            <Link href="/vodici" className="mt-3 inline-flex text-xs font-bold text-[#dc5b38]">Svi vodiči →</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
