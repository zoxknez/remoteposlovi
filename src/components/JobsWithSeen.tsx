"use client";

import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { getSeenJobs } from "@/lib/storage";
import type { NormalizedJob } from "@/types";

export function JobsWithSeen({ jobs, hideSeen }: { jobs: NormalizedJob[]; hideSeen?: boolean }) {
  const [seen, setSeen] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setSeen(getSeenJobs());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = hideSeen ? jobs.filter((job) => !seen.includes(job.id)) : jobs;

  if (visible.length === 0) {
    return <p className="py-12 text-center text-sm text-[#60736b]">Nema poslova koji odgovaraju svim izabranim filterima.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {visible.map((job) => (
        <JobCard key={job.id} job={job} seen={seen.includes(job.id)} />
      ))}
    </div>
  );
}
