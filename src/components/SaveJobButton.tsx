"use client";

import { useEffect, useState } from "react";
import { createTrackerEntry, getTracker, removeTracker, upsertTracker } from "@/lib/storage";
import type { NormalizedJob } from "@/types";

export function SaveJobButton({ job }: { job: NormalizedJob }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getTracker(job.id).then((entry) => setSaved(Boolean(entry)));
  }, [job.id]);

  async function toggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (saved) {
      await removeTracker(job.id);
      setSaved(false);
      return;
    }
    await upsertTracker(
      createTrackerEntry({
        id: job.id,
        jobId: job.id,
        slug: job.slug,
        title: job.title,
        company: job.company,
        applyUrl: job.applyUrl,
        source: job.sources.join(", "),
      }),
    );
    setSaved(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Uklonite ${job.title}` : `Sačuvajte ${job.title}`}
      className={`grid size-11 shrink-0 place-items-center rounded-full border text-base transition ${
        saved
          ? "border-[#dc5b38] bg-[#fff1ec] text-[#dc5b38]"
          : "border-[#17312a]/15 text-[#60736b] hover:border-[#dc5b38] hover:text-[#dc5b38]"
      }`}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
