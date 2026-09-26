import { PromptToolkit } from "@/components/PromptToolkit";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("CV i prijava", "Premium studio za CV, prijavu i pripremu uz proverene spoljne resurse.", "/alati");

export default function AlatiPage() {
  const career = RESOURCES.filter((r) => r.section === "Karijera" && ["cv","portfolio","interview","language","salary","tool"].includes(r.type)).slice(0, 18);
  return (
    <main>
      <section className="border-b border-[#17312a]/8 bg-[#eef3ed]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">CV · PRIJAVA · INTERVJU</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Studio za bolju prijavu, bez generičkog AI spama.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Generišite kvalitetan prompt, a zatim koristite proverene spoljne resurse za CV, ATS, portfolio, engleski i intervju. Tekst koji unesete u studio ne šalje se na server.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
        <PromptToolkit />
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">PROVERENI RESURSI</p><h2 className="mt-2 font-serif text-4xl">Karijerni toolkit</h2></div><a href="/izvori" className="text-xs font-bold text-[#dc5b38]">Cela baza →</a></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {career.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="premium-card p-5"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold tracking-[.12em] text-[#dc5b38]">{resource.label}</span><span className="text-[10px] text-[#7a8982]">{resource.pricing === "free" ? "BESPLATNO" : resource.pricing.toUpperCase()}</span></div><h3 className="mt-4 font-serif text-2xl">{resource.name}</h3><p className="mt-2 text-sm leading-6 text-[#60736b]">{resource.description}</p><span className="mt-5 inline-flex text-xs font-bold">Otvori ↗</span></a>)}
          </div>
        </section>
      </div>
    </main>
  );
}
