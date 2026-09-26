import Link from "next/link";
import { formatDateSr } from "@/lib/format";

export function SiteFooter({
  jobsUpdatedAt,
  sourcesCheckedAt,
}: {
  jobsUpdatedAt?: string | null;
  sourcesCheckedAt?: string | null;
}) {
  return (
    <footer className="mt-auto border-t border-[#17312a]/10 bg-white px-5 py-8 text-xs text-[#60736b] md:px-12">
      <div className="mx-auto flex max-w-[1540px] flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-[#17312a]">Remote poslovi</p>
          <p>Alat za traženje remote posla iz Srbije. Oglasi, izvori, porez i praćenje prijava.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Podnožje">
          <Link href="/poslovi" className="min-h-11 content-center hover:text-[#17312a]">
            Poslovi
          </Link>
          <Link href="/provera-oglasa" className="min-h-11 content-center hover:text-[#17312a]">
            Provera oglasa
          </Link>
          <Link href="/porez" className="min-h-11 content-center hover:text-[#17312a]">
            Porez
          </Link>
          <Link href="/kako-da-radim" className="min-h-11 content-center hover:text-[#17312a]">
            Kako da radim
          </Link>
          <Link href="/privatnost" className="min-h-11 content-center hover:text-[#17312a]">
            Privatnost
          </Link>
        </nav>
        <div className="space-y-1 text-[#7c8c84]">
          {jobsUpdatedAt ? <p>Oglasi osveženi: {formatDateSr(jobsUpdatedAt)}</p> : null}
          {sourcesCheckedAt ? <p>Izvori provereni: {formatDateSr(sourcesCheckedAt)}</p> : null}
          <p>Podaci se razlikuju od datuma deploya sajta.</p>
        </div>
      </div>
    </footer>
  );
}
