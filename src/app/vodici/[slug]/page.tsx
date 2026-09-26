import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/data/guides";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Vodič" };
  return pageMeta(guide.title, guide.summary, `/vodici/${guide.slug}`);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-12">
      <Link href="/vodici" className="text-sm font-bold text-[#dc5b38]">
        ← Vodiči
      </Link>
      <h1 className="mt-4 font-serif text-4xl">{guide.title}</h1>
      <p className="mt-3 text-[#52675f]">{guide.summary}</p>
      <div className="mt-8 grid gap-5 text-base leading-7 text-[#17312a]">
        {guide.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
