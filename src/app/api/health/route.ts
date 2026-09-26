import { getSourceHealth } from "@/lib/health";

export const maxDuration = 60;

export async function GET() {
  const health = await getSourceHealth();
  return Response.json(health);
}
