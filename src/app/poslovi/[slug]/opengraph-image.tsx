import { ImageResponse } from "next/og";
import { getJobBySlug } from "@/lib/jobs/aggregate";
import { formatSalaryRange } from "@/lib/salary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  const title = job?.title ?? "Remote posao";
  const company = job?.company ?? "Remote Poslovi";
  const salary = job
    ? formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)
    : null;
  const location =
    job?.serbiaEligibility === "CONFIRMED_SERBIA"
      ? "Remote from Serbia"
      : job?.serbiaEligibility === "WORLDWIDE"
        ? "Worldwide remote"
        : job?.location || "Remote";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#e5f0df",
          color: "#17312a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700 }}>Remote Poslovi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 32 }}>{company}</div>
          <div style={{ fontSize: 28, color: "#426052" }}>
            {location}
            {salary ? ` · ${salary}` : ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
