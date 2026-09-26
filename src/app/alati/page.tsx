import { PromptToolkit } from "@/components/PromptToolkit";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("CV i prijava", "Premium studio za CV, prijavu i pripremu uz proverene spoljne resurse.", "/alati");

export default function AlatiPage() {
  const career = RESOURCES.filter((r) => r.section === "Karijera" && ["cv","portfolio","interview","language","salary","tool"].includes(r.type)).slice(0, 18);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#17312a]/8 bg-[#eef3ed]">
        <div className="absolute -right-28 -top-28 size-[30rem] rounded-full border-[72px] border-white/22" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">CV · PRIJAVA · INTERVJU</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Studio za bolju prijavu, bez generičkog AI spama.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Generišite kvalitetan prompt, a zatim koristite proverene spoljne resurse za CV, ATS, portfolio, engleski i intervju. Tekst koji unesete u studio ne šalje se na server.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
        <PromptToolkit />

        <section className="mt-18">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="eyebrow">PROVERENI RESURSI</p><h2 className="mt-2 font-serif text-4xl tracking-[-0.03em]">Karijerni toolkit</h2></div>
            <a href="/izvori" className="text-xs font-bold text-[#dc5b38]">Cela baza →</a>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {career.map((resource,index) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[1.5rem] border border-[#17312a]/8 bg-white p-5 shadow-[0_14px_36px_rgba(23,49,42,.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(23,49,42,.08)]">
              <div className="absolute -right-10 -top-10 size-24 rounded-full border-[16px] border-[#f3f6f2]" aria-hidden />
              <div className="relative flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#eef3ed] px-3 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#426052]">{resource.label}</span>
                <span className="grid size-8 place-items-center rounded-full border border-[#17312a]/8 text-[10px] font-bold text-[#7a8982]">{String(index+1).padStart(2,"0")}</span>
              </div>
              <h3 className="relative mt-6 font-serif text-[1.8rem] leading-[1.05] tracking-[-0.03em]">{resource.name}</h3>
              <p className="relative mt-3 min-h-[72px] text-sm leading-6 text-[#60736b]">{resource.description}</p>
              <div className="relative mt-5 flex items-center justify-between border-t border-[#17312a]/7 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#89958f]">{resource.pricing === "free" ? "Besplatno" : resource.pricing}</span>
                <span className="text-xs font-bold text-[#17312a] transition group-hover:translate-x-1 group-hover:text-[#dc5b38]">Otvorite ↗</span>
              </div>
            </a>)}
          </div>
        </section>
      </div>
    </main>
  );
}
