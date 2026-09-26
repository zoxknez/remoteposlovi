import { eligibilityHelp, eligibilityLabel } from "@/lib/eligibility";
import type { SerbiaEligibility, SerbiaSupport } from "@/types";

const STATUS_CLASS: Record<string, string> = {
  CONFIRMED_SERBIA: "bg-[#edf3eb] text-[#325448]",
  confirmed: "bg-[#edf3eb] text-[#325448]",
  WORLDWIDE: "bg-[#e8eef8] text-[#31415f]",
  EUROPE: "bg-[#eeeaf6] text-[#5e4f83]",
  EMEA: "bg-[#eeeaf6] text-[#5e4f83]",
  partial: "bg-[#f8eee9] text-[#98503a]",
  TIMEZONE_BASED: "bg-[#f7f1df] text-[#6d5a28]",
  UNCLEAR: "bg-[#f3f3ef] text-[#5f675f]",
  unknown: "bg-[#f3f3ef] text-[#5f675f]",
  NOT_ELIGIBLE: "bg-[#f8e8e8] text-[#7a3030]",
  "not-supported": "bg-[#f8e8e8] text-[#7a3030]",
};

export function EligibilityBadge({
  status,
  reasons,
}: {
  status: SerbiaEligibility;
  reasons?: string[];
}) {
  const label = eligibilityLabel(status);
  const help = reasons?.[0] ?? eligibilityHelp(status);
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_CLASS[status] ?? STATUS_CLASS.UNCLEAR}`}
        title={help}
        aria-label={`${label}. ${help}`}
      >
        {label}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-64 rounded-lg border border-[#17312a]/10 bg-white p-3 text-left text-xs font-medium leading-5 text-[#52675f] shadow-lg group-hover:block group-focus-within:block"
      >
        {help}
      </span>
    </span>
  );
}

export function ResourceSupportBadge({
  support,
  note,
}: {
  support: SerbiaSupport;
  note: string;
}) {
  const labels: Record<SerbiaSupport, string> = {
    confirmed: "Srbija potvrđena",
    partial: "Zavisi od oglasa",
    unknown: "Lokacija nije jasno navedena",
    "not-supported": "Srbija nije podržana",
  };
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_CLASS[support]}`}
        title={note}
        aria-label={`${labels[support]}. ${note}`}
      >
        {labels[support]}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-64 rounded-lg border border-[#17312a]/10 bg-white p-3 text-left text-xs font-medium leading-5 text-[#52675f] shadow-lg group-hover:block group-focus-within:block"
      >
        {note}
      </span>
    </span>
  );
}
