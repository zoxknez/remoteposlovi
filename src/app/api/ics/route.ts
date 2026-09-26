import { NextRequest } from "next/server";
import { buildFollowUpIcs } from "@/lib/ics";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") ?? "Podsetnik";
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return new Response("Nedostaje datum", { status: 400 });
  }
  const followUpAt = new Date(`${date}T08:00:00Z`);
  const ics = buildFollowUpIcs({
    title,
    company: "Remote Poslovi",
    followUpAt,
  });
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${title.replace(/\s+/g, "-")}.ics"`,
    },
  });
}
