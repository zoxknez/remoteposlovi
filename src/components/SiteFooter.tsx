import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#17312a]/8 bg-[#f1f5ef] px-5 py-10 text-sm text-[#60736b] md:px-12">
      <div className="mx-auto grid max-w-[1540px] gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><span className="logo-icon grid size-9 place-items-center rounded-full bg-[#17312a] text-[#e7f0df]">R</span><strong className="text-[#17312a]">Remote poslovi</strong></div>
          <p className="mt-4 max-w-md leading-6">Kurirana baza resursa za remote rad, freelance, učenje, poslovanje, sigurnost i karijeru, sa fokusom na korisnike iz Srbije.</p>
        </div>
        <nav className="grid content-start gap-2 text-xs font-semibold" aria-label="Podnožje">
          <Link href="/izvori" className="hover:text-[#17312a]">Baza resursa</Link>
          <Link href="/alati" className="hover:text-[#17312a]">CV i prijava</Link>
          <Link href="/porez" className="hover:text-[#17312a]">Porezi</Link>
          <Link href="/provera-oglasa" className="hover:text-[#17312a]">Provera oglasa</Link>
          <Link href="/privatnost" className="hover:text-[#17312a]">Privatnost</Link>
        </nav>
        <div className="text-xs leading-6 text-[#75857e]">
          <p><strong className="text-[#17312a]">Baza:</strong> proverava se i dopunjava ručno i automatski.</p>
          <p className="mt-1">Live oglasi su eksperimentalna funkcija i nisu centralni deo direktorijuma.</p>
          <p className="mt-3">Ažurirano: septembar 2026.</p>
        </div>
      </div>
    </footer>
  );
}
