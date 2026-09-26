import { pageMeta } from "@/lib/seo";

export const metadata=pageMeta("Kako raditi remote iz Srbije","Pregled modela rada: freelancer, preduzetnik, DOO, contractor, zaposlenje i EOR.","/kako-da-radim");

const MODELS=[
["Frilenser","Kvartalno samooporezivanje fizičkog lica za prihode koje domaći isplatilac ne oporezuje po odbitku.","Najmanje administracije, ali pratite rokove i poreski režim."],
["Preduzetnik","Registracija preko APR-a, paušal ili vođenje knjiga u zavisnosti od uslova i delatnosti.","Poslovni status i fakturisanje, uz test samostalnosti i druge obaveze."],
["DOO","Privredno društvo sa punim računovodstvom i odvojenim pravnim subjektivitetom.","Veća administracija i troškovi, često smislenije za kompleksnije poslovanje."],
["Contractor","Ugovor o pružanju usluga bez radnog odnosa.","Ugovor, valuta, rokovi plaćanja, IP i poreske obaveze treba jasno definisati."],
["Direktno zaposlenje","Radni odnos kod poslodavca ili lokalnog entiteta.","Prava i obaveze zavise od ugovora i merodavnog prava."],
["EOR","Treća firma vas formalno zapošljava za stranog klijenta.","Može rešiti lokalno zapošljavanje kada strani poslodavac nema entitet u Srbiji."],
];

export default function Page(){
  return <main>
    <section className="relative overflow-hidden border-b border-[#17312a]/8 bg-[#eef3ed]">
      <div className="absolute -right-28 -top-28 size-[30rem] rounded-full border-[72px] border-white/22" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-12 md:py-20">
        <p className="eyebrow">MODELI RADA</p>
        <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-[-.04em] md:text-7xl">Šta zapravo znači “radim za strance”?</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Kratko poređenje modela, bez pokušaja da vam aplikacija izabere pravnu ili poresku formu. Za odluku koristite zvanične izvore i stručni savet kada je potreban.</p>
      </div>
    </section>

    <div className="mx-auto max-w-6xl px-5 py-12 md:px-12 md:py-16">
      <div className="grid gap-5 md:grid-cols-2">
        {MODELS.map(([title,text,note],i)=><article key={title} className="group relative overflow-hidden rounded-[1.55rem] border border-[#17312a]/8 bg-white p-6 shadow-[0_16px_40px_rgba(23,49,42,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(23,49,42,.08)]">
          <div className="absolute -right-12 -top-12 size-28 rounded-full border-[18px] border-[#f3f6f2]" aria-hidden />
          <span className="relative grid size-10 place-items-center rounded-2xl bg-[#17312a] text-[10px] font-bold text-white">0{i+1}</span>
          <h2 className="relative mt-5 font-serif text-3xl tracking-[-0.025em]">{title}</h2>
          <p className="relative mt-3 text-sm leading-7 text-[#60736b]">{text}</p>
          <p className="relative mt-5 rounded-[1rem] border border-[#17312a]/7 bg-[#f6f8f4] p-4 text-xs leading-5 text-[#64746d]">{note}</p>
        </article>)}
      </div>

      <section className="mt-12 relative overflow-hidden rounded-[1.5rem] bg-[#17312a] p-6 text-[#e7f0df] md:p-8">
        <div className="absolute -right-16 -top-16 size-44 rounded-full border-[28px] border-white/5" aria-hidden />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#a9c1b5]">ZVANIČNO</p>
          <h2 className="mt-2 font-serif text-3xl">Krenite od primarnih izvora</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#b8cac2]">Za registraciju, porez i fakturisanje prvo proverite zvanične servise, a tek zatim sekundarne vodiče.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="https://apr.gov.rs/usluge/eservisi/eregistracija-osnivanja-preduzetnika.2406.html" target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/7 px-4 py-2.5 text-xs font-bold">APR eRegistracija ↗</a>
            <a href="https://frilenseri.purs.gov.rs/" target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/7 px-4 py-2.5 text-xs font-bold">Portal Frilenseri ↗</a>
            <a href="https://purs.gov.rs/e-porezi/portal.html" target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/7 px-4 py-2.5 text-xs font-bold">ePorezi ↗</a>
            <a href="https://www.efaktura.gov.rs/" target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/7 px-4 py-2.5 text-xs font-bold">eFaktura ↗</a>
          </div>
        </div>
      </section>
    </div>
  </main>
}
