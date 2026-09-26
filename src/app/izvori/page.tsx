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
      <section className="relative overflow-hidden border-b border-[#17312a]/8 bg-[#e9f1e6]">
        <div className="absolute -right-28 -top-28 size-[28rem] rounded-full border-[70px] border-white/22" aria-hidden />
        <div className="relative mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">BAZA RESURSA</p>
          <div className="mt-3 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Provereni linkovi za ceo remote workflow.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Od CV-a i učenja do APR-a, poreza, faktura, sigurnosti i organizacije rada. Pretraga obuhvata naziv, tagove i namenu.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[[RESOURCES.length, "ukupno"], [official, "zvanično"], [open, "open-source"]].map(([value,label],index)=><div key={String(label)} className="relative overflow-hidden rounded-[1.35rem] border border-white/65 bg-white/72 p-4 shadow-[0_14px_34px_rgba(23,49,42,.07)] backdrop-blur">
                <div className="absolute -right-6 -top-6 size-16 rounded-full border-[10px] border-[#eef3ed]" aria-hidden />
                <span className="relative text-[9px] font-bold tracking-[.13em] text-[#dc5b38]">0{index+1}</span>
                <strong className="relative mt-2 block font-serif text-3xl">{value}</strong>
                <p className="relative mt-1 text-[10px] font-bold text-[#7a8982]">{label}</p>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1540px] px-5 py-12 md:px-12 md:py-16">
        <DirectoryExplorer resources={RESOURCES} />
        <div className="mx-auto mt-12 max-w-3xl rounded-[1.25rem] border border-[#17312a]/8 bg-[#f7f9f5] px-5 py-4 text-center text-xs leading-6 text-[#7a8982]">
          Baza trenutno sadrži <strong className="text-[#17312a]">{free}</strong> potpuno besplatnih resursa. Cene i uslovi komercijalnih servisa mogu se menjati, zato su označeni kao free, freemium ili paid prema trenutno poznatom modelu.
        </div>
      </div>
    </main>
  );
}
