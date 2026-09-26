import { ScamChecker } from "@/components/ScamChecker";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Provera oglasa",
  "Provera rizičnih signala u tekstu ili URL-u oglasa. Bez lažnog procenta prevare. Podaci ostaju u pregledaču.",
  "/provera-oglasa",
);

export default function ProveraPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Provera oglasa</h1>
      <p className="mt-4 text-[#52675f]">
        Algoritam traži proverljive signale: uplatu, kripto, gift kartice, čekove, Telegram kao jedini kanal i
        nerealnu zaradu. Ne tvrdi da je oglas siguran.
      </p>
      <p className="mt-2 text-sm text-[#7c8c84]">Tekst se ne šalje na server. Ostaje u vašem pregledaču.</p>
      <div className="mt-8">
        <ScamChecker />
      </div>
    </main>
  );
}
