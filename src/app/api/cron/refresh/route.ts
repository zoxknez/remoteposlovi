import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { getFxRates } from "@/lib/fx";
import { getSourceHealth } from "@/lib/health";
import { getJobFeed } from "@/lib/jobs/aggregate";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidateTag("jobs", "max");
  revalidateTag("fx", "max");
  revalidateTag("health", "max");
  const [feed, fx, health] = await Promise.all([
    getJobFeed(),
    getFxRates(),
    getSourceHealth(),
  ]);
  return Response.json({
    ok: true,
    jobs: feed.jobs.length,
    fx: fx.publishedOn,
    sources: health.items.length,
  });
}
