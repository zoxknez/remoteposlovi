import { Wizard } from "@/components/Wizard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Gde da tražim",
  "Kratak vodič: oblast, iskustvo i lokacija, pa relevantni izvori i oglasi. Bez naloga.",
  "/wizard",
);

export default function WizardPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Gde da tražim?</h1>
      <p className="mt-4 text-[#52675f]">Četiri pitanja. Nalog nije potreban.</p>
      <div className="mt-8">
        <Wizard />
      </div>
    </main>
  );
}
