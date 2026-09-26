import Link from "next/link";

export function SiteFooter() {
  return <footer className="mt-auto border-t border-[#17312a]/8 bg-[#17312a] px-5 py-10 text-[#dce7e1] md:px-12 md:py-12">
    <div className="mx-auto grid max-w-[1540px] gap-8 md:grid-cols-[1.4fr_.8fr_.8fr]">
      <div><div className="flex items-center gap-3"><span className="logo-icon grid size-10 place-items-center rounded-full bg-[#28483f] text-[#e7f0df]">R</span><strong className="text-white">Remote poslovi</strong></div><p className="mt-4 max-w-md text-sm leading-6 text-[#afc2b9]">Kurirana baza resursa za remote rad, freelance, učenje, poslovanje, sigurnost i karijeru, sa fokusom na Srbiju.</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">122+ resursa</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#c9d8d1]">Bez obaveznog naloga</span></div></div>
      <nav className="grid content-start gap-3 text-xs font-semibold" aria-label="Podnožje"><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Navigacija</p><Link href="/izvori" className="hover:text-white">Baza resursa</Link><Link href="/alati" className="hover:text-white">CV i prijava</Link><Link href="/porez" className="hover:text-white">Porezi</Link><Link href="/vodici" className="hover:text-white">Vodiči</Link><Link href="/privatnost" className="hover:text-white">Privatnost</Link></nav>
      <div className="text-xs leading-6 text-[#9fb5ab]"><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#7fa091]">Status</p><p className="mt-3">Baza se proverava i dopunjava ručno i automatski.</p><p className="mt-2">Live oglasi su eksperimentalna funkcija.</p><p className="mt-4 text-[#c7d6cf]">Ažurirano: septembar 2026.</p></div>
    </div>
  </footer>;
}