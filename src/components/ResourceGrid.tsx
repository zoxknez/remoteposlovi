"use client";

import { useEffect, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { getSavedResources, toggleSavedResource } from "@/lib/storage";
import type { Resource, SourceHealth } from "@/types";

/** Mreža kartica sa čuvanjem i statusom izvora, za stranice koje nemaju pretragu. */
export function ResourceGrid({ resources }: { resources: Resource[] }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [health, setHealth] = useState<Record<string, SourceHealth>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setSaved(getSavedResources());
    });
    fetch("/api/health")
      .then((response) => response.json())
      .then((payload: { items?: SourceHealth[] }) => {
        if (!cancelled && payload.items) {
          setHealth(Object.fromEntries(payload.items.map((item) => [item.id, item])));
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          saved={saved.includes(resource.id)}
          health={health[resource.id]}
          onToggle={(id) => setSaved(toggleSavedResource(id))}
        />
      ))}
    </div>
  );
}
