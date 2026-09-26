import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Privatnost","CV, beleške i email kontakta ostaju u pregledaču. Nema obaveznog naloga.","/privatnost");

const ITEMS = [
  ["Bez obaveznog naloga","Sajt radi bez prijave. Sačuvani izvori, viđeni oglasi i sačuvane pretrage čuvaju se u localStorage-u, a tracker prijava u IndexedDB-u."],
  ["Osetljivi sadržaj ostaje lokalno","CV, napomene, email kontakta i tekstovi promptova ne šalju se na naš server. Provera oglasa takođe radi lokalno u pregledaču."],
  ["Server obrađuje samo javne izvore","Server preuzima javne feedove oglasa, NBS kurs i health podatke izvora. Ti zahtevi ne sadrže vaš CV, beleške ili identitet."],
  ["Bez invazivnog praćenja","Ova verzija nema invazivan analytics sistem niti profilisanje korisnika na osnovu lokalnih podataka iz alata."],
];

export default function PrivacyPage() {
  return <main>
    <section className="border-b border-[#17312a]/8 bg-[#edf3eb]"><div className="mx-auto max-w-5xl px-5 py-14 md:px-12 md:py-20"><p className="eyebrow">PRIVATNOST</p><h1 className="mt-3 max-w-3xl font-serif text-5xl tracking-[-0.04em] md:text-7xl">Vaši podaci ne moraju da napuste pregledač.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#52675f]">Lokalni alati su namerno napravljeni tako da što više stvari radi bez naloga i bez slanja osetljivih podataka na server.</p></div></section>
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-12 md:py-16">
      <div className="grid gap-4 md:grid-cols-2">{ITEMS.map(([title,text],index)=><article key={title} className="premium-card relative overflow-hidden p-6 md:p-7"><div className="absolute -right-10 -top-10 size-24 rounded-full border-[16px] border-[#f2f5f1]" aria-hidden/><span className="relative grid size-10 place-items-center rounded-2xl bg-[#17312a] text-[10px] font-bold text-white">{String(index+1).padStart(2,"0")}</span><h2 className="relative mt-6 font-serif text-3xl tracking-[-0.025em]">{title}</h2><p className="relative mt-3 text-sm leading-7 text-[#60736b]">{text}</p></article>)}</div>
      <div className="mt-8 rounded-[1.5rem] bg-[#17312a] p-6 text-[#e7f0df] md:p-8"><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#a9c1b5]">PRINCIP</p><p className="mt-3 max-w-3xl font-serif text-3xl leading-tight">Ako funkcija može da radi lokalno, nema razloga da vaš sadržaj šaljemo na server.</p></div>
    </div>
  </main>;
}