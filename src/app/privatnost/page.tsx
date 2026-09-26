import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Privatnost",
  "CV, beleške i email kontakta ostaju u pregledaču. Nema obaveznog naloga.",
  "/privatnost",
);

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl">Privatnost</h1>
      <div className="mt-6 grid gap-4 text-sm leading-7">
        <p>
          Sajt radi bez prijave. Sačuvani izvori, viđeni oglasi i sačuvane pretrage idu u localStorage. Tracker prijava
          ide u IndexedDB.
        </p>
        <p>
          CV, napomene, email kontakta i tekstovi promptova se ne šalju na naš server. Provera oglasa takođe radi
          lokalno.
        </p>
        <p>
          Server preuzima javne feedove oglasa (Remotive, Remote OK, Greenhouse), NBS kurs i proverava dostupnost
          izvora. Ti zahtevi ne sadrže vaš CV ni identitet.
        </p>
        <p>Nema invazivnog analytics sistema u ovoj verziji.</p>
      </div>
    </main>
  );
}
