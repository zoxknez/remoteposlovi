import { PromptToolkit } from "@/components/PromptToolkit";
import { RESOURCES } from "@/data/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "CV i alati za prijavu",
  "Besplatni CV alati, ATS provera, Europass i generator promptova za prijavu. Prompt ostaje u pregledaču.",
  "/alati",
);

const FILTERS = [
  { key: "free", label: "Besplatno", test: (pricing: string) => pricing === "free" },
  { key: "ats", label: "ATS provera", names: ["Jobscan"] },
  { key: "ai", label: "AI", names: ["Interviewing.io", "Teal", "Resume Worded"] },
  { key: "europass", label: "Europass", names: ["Europass"] },
  { key: "portfolio", label: "Portfolio", names: ["Reactive Resume", "Behance Jobs", "Dribbble Jobs"] },
  { key: "linkedin", label: "LinkedIn", names: ["Resume Worded", "LinkedIn Remote Srbija"] },
  { key: "builder", label: "CV builder", names: ["Reactive Resume", "Europass", "Teal"] },
];

export default async function AlatiPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filter = typeof params.filter === "string" ? params.filter : "all";
  const tools = RESOURCES.filter((resource) => resource.kind === "Alat" || resource.type === "cv");
  const selected = FILTERS.find((item) => item.key === filter);
  const visible = tools.filter((resource) => {
    if (!selected) return true;
    if (selected.test) return selected.test(resource.pricing);
    if (selected.names) return selected.names.includes(resource.name);
    return true;
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">CV i alati za prijavu</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href="/alati" className={`min-h-11 rounded-full px-4 content-center text-xs font-bold ${filter === "all" ? "bg-[#17312a] text-white" : "border bg-white"}`}>
          Sve
        </a>
        {FILTERS.map((item) => (
          <a
            key={item.key}
            href={`/alati?filter=${item.key}`}
            className={`min-h-11 rounded-full px-4 content-center text-xs font-bold ${
              filter === item.key ? "bg-[#17312a] text-white" : "border bg-white"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[#17312a]/10 bg-white p-5"
          >
            <h2 className="font-bold">{resource.name}</h2>
            <p className="mt-2 text-sm text-[#60736b]">{resource.description}</p>
          </a>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl">Generator promptova</h2>
        <p className="mt-2 text-sm text-[#52675f]">
          Kopirajte prompt u ChatGPT, Claude ili Gemini. CV i oglas ne napuštaju ovaj pregledač.
        </p>
        <div className="mt-6">
          <PromptToolkit />
        </div>
      </section>
    </main>
  );
}
