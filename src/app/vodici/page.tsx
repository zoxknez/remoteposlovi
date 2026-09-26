import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Praktični vodiči",
  "Kratki, konkretni vodiči za remote rad, prijavu, porez, sigurnost i pregovaranje.",
  "/vodici",
);

export default function VodiciPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#17312a]/8 bg-[#f2f0e8]">
        <div className="absolute -right-28 -top-28 size-[30rem] rounded-full border-[72px] border-white/25" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">PRAKTIČNO, BEZ PUNILA</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Kratki vodiči za stvari koje stvarno zapinju.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#625f54]">CV, prevare, EOR, porez, pregovaranje i drugi praktični koraci. Vodiči dopunjuju bazu resursa, ne zamenjuju zvanične izvore.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {GUIDES.map((guide, index) => (
            <Link key={guide.slug} href={`/vodici/${guide.slug}`} className="group relative overflow-hidden rounded-[1.6rem] border border-[#17312a]/8 bg-white p-6 shadow-[0_16px_40px_rgba(23,49,42,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(23,49,42,.09)] md:p-7">
              <div className="absolute -right-12 -top-12 size-32 rounded-full border-[20px] border-[#f4f1e8]" aria-hidden />
              <div className="relative flex items-center justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-2xl bg-[#17312a] text-[10px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                <span className="grid size-10 place-items-center rounded-full border border-[#17312a]/8 text-[#8b9891] transition group-hover:border-[#dc5b38]/20 group-hover:text-[#dc5b38]">↗</span>
              </div>
              <h2 className="relative mt-7 max-w-lg font-serif text-3xl tracking-[-0.025em]">{guide.title}</h2>
              <p className="relative mt-3 min-h-[72px] text-sm leading-7 text-[#60736b]">{guide.summary}</p>
              <div className="relative mt-6 flex items-center justify-between border-t border-[#17312a]/7 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#8a9690]">Praktični vodič</span>
                <span className="text-xs font-bold text-[#17312a] transition group-hover:translate-x-1 group-hover:text-[#dc5b38]">Pročitajte →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 rounded-[1.35rem] border border-[#17312a]/8 bg-[#eef3ed] p-5 sm:flex-row sm:items-center">
          <div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#65766e]">Treba vam konkretan alat?</p><p className="mt-1 text-sm leading-6 text-[#60736b]">Vodiči objašnjavaju proces, a baza resursa vodi direktno do servisa i alata.</p></div>
          <Link href="/izvori" className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">Pretražite bazu →</Link>
        </div>
      </div>
    </main>
  );
}
