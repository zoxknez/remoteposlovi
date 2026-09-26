import { NextRequest } from "next/server";
import { filterJobs, parseJobFilters } from "@/lib/jobs/filters";
import { getJobFeed } from "@/lib/jobs/aggregate";

export async function GET(request: NextRequest) {
  const feed = await getJobFeed();
  const filters = parseJobFilters(request.nextUrl.searchParams);
  const jobs = filterJobs(feed.jobs, filters);
  return Response.json({
    jobs,
    meta: feed.meta,
    count: jobs.length,
  });
}
