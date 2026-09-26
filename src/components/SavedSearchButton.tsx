"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { parseJobFilters } from "@/lib/jobs/filters";
import { saveSearch } from "@/lib/storage";

export function SavedSearchButton({ currentCount }: { currentCount: number }) {
  const params = useSearchParams();
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className="min-h-11 rounded-full border border-[#17312a]/15 px-4 text-xs font-bold"
      onClick={() => {
        const filters = parseJobFilters(params);
        saveSearch({
          id: crypto.randomUUID(),
          name:
            [filters.category, filters.location, filters.seniority, filters.type]
              .filter((item) => item && item !== "all")
              .join(" + ") || "Moja pretraga",
          filters,
          createdAt: new Date().toISOString(),
          lastSeenAt: new Date().toISOString(),
          lastCount: currentCount,
        });
        setDone(true);
      }}
    >
      {done ? "Pretraga sačuvana u pregledaču" : "Sačuvaj ovu pretragu"}
    </button>
  );
}
