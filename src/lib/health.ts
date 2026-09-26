import { unstable_cache } from "next/cache";
import { RESOURCES } from "@/data/sources";
import { fetchText, mapPool } from "@/lib/http";
import type { SourceHealth } from "@/types";

async function checkOne(url: string, id: string): Promise<SourceHealth> {
  try {
    let result = await fetchText(url, { method: "HEAD", timeoutMs: 4000, redirect: "follow" });
    if (result.status === 405 || result.status === 403 || result.status === 404) {
      result = await fetchText(url, { method: "GET", timeoutMs: 4000, redirect: "follow" });
    }
    const ok = result.status >= 200 && result.status < 400;
    return {
      id,
      url,
      httpStatus: result.status,
      finalUrl: result.url,
      redirected: result.redirected || result.url.replace(/\/$/, "") !== url.replace(/\/$/, ""),
      responseTimeMs: result.durationMs,
      ok,
      lastSuccessfulCheck: ok ? new Date().toISOString() : null,
      lastFailedCheck: ok ? null : new Date().toISOString(),
      error: ok ? undefined : `HTTP ${result.status}`,
    };
  } catch (error) {
    return {
      id,
      url,
      httpStatus: null,
      finalUrl: null,
      redirected: false,
      responseTimeMs: null,
      ok: false,
      lastSuccessfulCheck: null,
      lastFailedCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Provera nije uspela",
    };
  }
}

async function checkAll(): Promise<{ checkedAt: string; items: SourceHealth[] }> {
  const items = await mapPool(RESOURCES, 12, (resource) => checkOne(resource.url, resource.id));
  return { checkedAt: new Date().toISOString(), items };
}

export const getSourceHealth = unstable_cache(checkAll, ["source-health-v1"], {
  revalidate: 60 * 60 * 12,
  tags: ["health"],
});

export function healthMap(items: SourceHealth[]): Record<string, SourceHealth> {
  return Object.fromEntries(items.map((item) => [item.id, item]));
}
