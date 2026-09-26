import { DirectoryExplorer } from "@/components/DirectoryExplorer";
import { JsonLd } from "@/components/JsonLd";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Direktorijum remote izvora",
  "Kurirana baza remote oglasnika, freelance platformi i alata za kandidate iz Srbije.",
  "/izvori",
);

export default function IzvoriPage() {
  return (
    <main className="mx-auto max-w-[1540px] px-5 py-12 md:px-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Direktorijum remote izvora",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: RESOURCES.length,
            itemListElement: RESOURCES.map((resource, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: resource.name,
              url: resource.url,
            })),
          },
        }}
      />
      <DirectoryExplorer resources={RESOURCES} />
    </main>
  );
}
