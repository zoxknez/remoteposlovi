import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Praktični vodiči",
  "Kratki vodiči za remote prijavu iz Srbije: CV, prevara, EOR, porez i pregovor o plati.",
  "/vodici",
);

export default function VodiciPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Vodiči</h1>
      <div className="mt-8 grid gap-4">
        {GUIDES.map((guide) => (
          <Link key={guide.slug} href={`/vodici/${guide.slug}`} className="rounded-lg border border-[#17312a]/10 bg-white p-6">
            <h2 className="font-serif text-2xl">{guide.title}</h2>
            <p className="mt-2 text-sm text-[#60736b]">{guide.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
