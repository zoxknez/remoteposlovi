import { getFxRates } from "@/lib/fx";

export async function GET() {
  const fx = await getFxRates();
  return Response.json(fx);
}
