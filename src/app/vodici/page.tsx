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
      <section className="border-b border-[#17312a]/8 bg-[#f2f0e8]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20">
          <p className="eyebrow">PRAKTIČNO, BEZ PUNILA</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">
            Kratki vodiči za stvari koje stvarno zapinju.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#625f54]">
            CV, prevare, EOR, porez, pregovaranje i drugi praktični koraci. Vodiči dopunjuju bazu resursa, ne zamenjuju zvanične izvore.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {GUIDES.map((guide, index) => (
            <Link key={guide.slug} href={`/vodici/${guide.slug}`} className="premium-card group p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold tracking-[.14em] text-[#dc5b38]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[#9aa59f] transition group-hover:translate-x-1 group-hover:text-[#dc5b38]">→</span>
              </div>
              <h2 className="mt-7 font-serif text-3xl tracking-[-0.025em]">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#60736b]">{guide.summary}</p>
              <span className="mt-6 inline-flex text-xs font-bold text-[#17312a]">Pročitaj vodič</span>
            </Link>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-[#17312a]/8 bg-[#eef3ed] p-5 text-sm leading-6 text-[#60736b]">
          Treba vam konkretan servis ili alat umesto teksta? <Link href="/izvori" className="font-bold text-[#17312a]">Pretražite celu bazu resursa →</Link>
        </div>
      </div>
    </main>
  );
}
