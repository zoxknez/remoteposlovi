import { DirectoryExplorer } from "@/components/DirectoryExplorer";
import { JsonLd } from "@/components/JsonLd";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Baza remote resursa",
  "Kurirana baza za karijeru, učenje, poslovanje, sigurnost, produktivnost, freelance i remote rad.",
  "/izvori",
);

export default function IzvoriPage() {
  const official = RESOURCES.filter((item) => item.official).length;
  const free = RESOURCES.filter((item) => item.pricing === "free").length;
  const open = RESOURCES.filter((item) => item.openSource).length;

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Baza remote resursa", mainEntity: { "@type": "ItemList", numberOfItems: RESOURCES.length, itemListElement: RESOURCES.map((resource, index) => ({ "@type": "ListItem", position: index + 1, name: resource.name, url: resource.url })) } }} />
      <section className="border-b border-[#17312a]/8 bg-[#e9f1e6]">
        <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">BAZA RESURSA</p>
          <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Provereni linkovi za ceo remote workflow.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Od CV-a i učenja do APR-a, poreza, faktura, sigurnosti i organizacije rada. Pretraga ide i kroz tagove i namenu, ne samo naziv servisa.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[[RESOURCES.length, "ukupno"], [official, "zvanično"], [open, "open-source"]].map(([value,label]) => <div key={String(label)} className="rounded-2xl bg-white/80 p-4"><strong className="font-serif text-2xl">{value}</strong><p className="mt-1 text-[10px] font-bold text-[#7a8982]">{label}</p></div>)}
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16">
        <DirectoryExplorer resources={RESOURCES} />
        <p className="mt-10 text-center text-xs leading-6 text-[#7a8982]">Baza trenutno sadrži {free} potpuno besplatnih resursa. Cene i uslovi komercijalnih servisa mogu se menjati, zato su označeni kao free, freemium ili paid prema trenutno poznatom modelu.</p>
      </div>
    </main>
  );
}
