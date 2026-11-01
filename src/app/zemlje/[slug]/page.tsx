import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountryBadge } from "@/components/CountryBadge";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ResourceGrid } from "@/components/ResourceGrid";
import { BALKAN_COUNTRIES, getCountryBySlug } from "@/data/countries";
import { RESOURCE_SECTIONS, RESOURCES, resourcesByCountry } from "@/data/sources";
import { pageMeta, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BALKAN_COUNTRIES.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: "Zemlja nije pronađena" };
  return pageMeta(
    `Remote posao: ${country.name}`,
    `Servisi za posao i remote rad za ${country.name}: oglasnici, zavod za zapošljavanje, poreski portal i plate. ${country.intro}`,
    `/zemlje/${country.slug}`,
  );
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const local = resourcesByCountry(country.code);
  // Krupnije grupe od oblasti: zemlja obično ima 4-10 servisa, pa bi oblasti imale po jednu karticu.
  const sectionOrder = (section: string) => RESOURCE_SECTIONS.findIndex((item) => item.section === section);
  const groups = [
    {
      key: "posao",
      title: "Posao i zavodi",
      description: "Najveći portali za posao i zvanične službe za zapošljavanje.",
      accent: "bg-[#edf3eb] text-[#426052]",
      items: local.filter((item) => item.section === "Poslovi" || item.section === "Freelance"),
    },
    {
      key: "porezi",
      title: "Porezi i administracija",
      description: "Poreski portali, registracija i elektronske usluge države.",
      accent: "bg-[#e8f1eb] text-[#35624a]",
      items: local.filter((item) => item.section === "Poslovanje"),
    },
    {
      key: "ostalo",
      title: "Plate, zajednice i alati",
      description: "Podaci o platama, lokalne zajednice i korisni alati.",
      accent: "bg-[#f6f1e7] text-[#77613c]",
      items: local.filter((item) => !["Poslovi", "Freelance", "Poslovanje"].includes(item.section)),
    },
  ]
    .map((group) => ({
      ...group,
      items: group.items.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || sectionOrder(a.section) - sectionOrder(b.section),
      ),
    }))
    .filter((group) => group.items.length > 0);
  const official = local.filter((item) => item.sourceType === "official");
  const global = RESOURCES.filter(
    (item) => item.country === "global" && item.featured && item.regionSupport !== "not-supported",
  ).slice(0, 6);
  const others = BALKAN_COUNTRIES.filter((item) => item.code !== country.code);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Remote posao: ${country.name}`,
          url: `${SITE_URL}/zemlje/${country.slug}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: local.length,
            itemListElement: local.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              url: item.url,
            })),
          },
        }}
      />
      <section className="border-b border-[#17312a]/8 bg-[#e8f1e4]">
        <div className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16">
          <nav aria-label="Putanja" className="text-sm text-[#60736b]">
            <Link href="/zemlje" className="hover:text-[#17312a]">
              Zemlje
            </Link>{" "}
            / <span className="font-semibold text-[#17312a]">{country.name}</span>
          </nav>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <CountryBadge code={country.code} className="size-20 text-2xl" />
            <div>
              <h1 className="font-serif text-5xl tracking-[-0.03em] text-[#17312a] md:text-6xl">{country.name}</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#52675f] md:text-lg">{country.intro}</p>
            </div>
          </div>
          <dl className="mt-8 flex flex-wrap gap-3 text-sm">
            {[
              ["Servisa", String(local.length)],
              ["Zvaničnih portala", String(official.length)],
              ["Valuta", country.currency ?? "-"],
              ["EU", country.euMember ? "Članica" : "Nije članica"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.15rem] border border-white/70 bg-white/75 px-5 py-3 shadow-[0_8px_22px_rgba(23,49,42,.04)]">
                <dt className="text-xs font-semibold text-[#7c8c84]">{label}</dt>
                <dd className="mt-0.5 font-serif text-xl text-[#17312a]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16">
        {country.tips.length > 0 ? (
          <section aria-labelledby="saveti" className="grid gap-4 md:grid-cols-2">
            <h2 id="saveti" className="sr-only">
              Praktični saveti
            </h2>
            {country.tips.map((tip) => (
              <p key={tip} className="premium-panel flex gap-3 p-5 text-sm leading-6 text-[#52675f]">
                <Icon name="compass" className="mt-0.5 size-5 shrink-0 text-[#dc5b38]" />
                {tip}
              </p>
            ))}
          </section>
        ) : null}

        <div className="mt-14 space-y-14">
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`grupa-${group.key}`}>
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#17312a]/10 pb-4">
                <div>
                  <h2 id={`grupa-${group.key}`} className="font-serif text-3xl tracking-[-0.02em] md:text-4xl">
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm text-[#60736b]">{group.description}</p>
                </div>
                <span className={`grid size-12 shrink-0 place-items-center rounded-full text-sm font-bold ${group.accent}`}>
                  {group.items.length}
                </span>
              </div>
              <ResourceGrid resources={group.items} />
            </section>
          ))}
        </div>

        {global.length > 0 ? (
          <section className="mt-20" aria-labelledby="globalno">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">PORED LOKALNIH</p>
                <h2 id="globalno" className="mt-2 font-serif text-3xl tracking-[-0.02em] md:text-4xl">
                  Globalne platforme vredne pažnje
                </h2>
              </div>
              <Link href="/izvori?zemlja=globalno" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-[#dc5b38]">
                Sve globalne <Icon name="arrow" className="size-4" />
              </Link>
            </div>
            <ResourceGrid resources={global} />
          </section>
        ) : null}

        <section className="mt-20" aria-labelledby="ostale">
          <h2 id="ostale" className="font-serif text-3xl tracking-[-0.02em]">
            Ostale zemlje regiona
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((item) => (
              <Link
                key={item.code}
                href={`/zemlje/${item.slug}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#17312a]/10 bg-white py-1 pl-1.5 pr-4 text-sm font-bold text-[#426052] hover:border-[#17312a]/30"
              >
                <CountryBadge code={item.code} className="size-8 text-[10px]" />
                {item.name}
                <span className="tabular-nums text-[#8a9891]">{resourcesByCountry(item.code).length}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
