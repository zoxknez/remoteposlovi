import { TrackerBoard } from "@/components/TrackerBoard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Tracker prijava",
  "Lokalni tracker oglasa: sačuvano, prijavljeno, intervju, ponuda. Podaci ostaju u pregledaču.",
  "/tracker",
);

export default function TrackerPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Tracker</h1>
      <p className="mt-4 text-[#52675f]">
        Status prijave, CV verzija, kontakt i follow-up. Ništa se ne šalje na server. Koristi se IndexedDB ovog
        pregledača.
      </p>
      <div className="mt-8">
        <TrackerBoard />
      </div>
    </main>
  );
}
