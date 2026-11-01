import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { getFxRates } from "@/lib/fx";
import { getSourceHealth } from "@/lib/health";

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidateTag("fx", "max");
  revalidateTag("health", "max");
  const [fx, health] = await Promise.all([getFxRates(), getSourceHealth()]);
  return Response.json({
    ok: true,
    fx: fx.publishedOn,
    sources: health.items.length,
  });
}
