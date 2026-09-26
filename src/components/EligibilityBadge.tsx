import { eligibilityHelp, eligibilityLabel } from "@/lib/eligibility";
import type { SerbiaEligibility, SerbiaSupport } from "@/types";

const STATUS_CLASS: Record<string, string> = {
  CONFIRMED_SERBIA: "bg-[#e7f1e8] text-[#2f5b45] ring-[#2f5b45]/10",
  confirmed: "bg-[#e7f1e8] text-[#2f5b45] ring-[#2f5b45]/10",
  WORLDWIDE: "bg-[#eaf0fa] text-[#314f78] ring-[#314f78]/10",
  EUROPE: "bg-[#f0ebf8] text-[#654f8c] ring-[#654f8c]/10",
  EMEA: "bg-[#f0ebf8] text-[#654f8c] ring-[#654f8c]/10",
  partial: "bg-[#fff0e8] text-[#9a5038] ring-[#9a5038]/10",
  TIMEZONE_BASED: "bg-[#f7f1df] text-[#745f2a] ring-[#745f2a]/10",
  UNCLEAR: "bg-[#f2f3ef] text-[#5f675f] ring-[#5f675f]/10",
  unknown: "bg-[#f2f3ef] text-[#5f675f] ring-[#5f675f]/10",
  NOT_ELIGIBLE: "bg-[#faeaea] text-[#833b3b] ring-[#833b3b]/10",
  "not-supported": "bg-[#faeaea] text-[#833b3b] ring-[#833b3b]/10",
};

function BadgeShell({ label, help, tone }: { label: string; help: string; tone: string }) {
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        className={`inline-flex min-h-7 items-center rounded-full px-3 text-[10px] font-bold tracking-[.01em] ring-1 ring-inset transition ${tone}`}
        title={help}
        aria-label={`${label}. ${help}`}
      >
        {label}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-72 overflow-hidden rounded-[1rem] border border-[#17312a]/10 bg-white/98 p-4 text-left text-xs font-medium leading-5 text-[#52675f] shadow-[0_18px_48px_rgba(23,49,42,0.16)] backdrop-blur-xl group-hover:block group-focus-within:block"
      >
        <span className="mb-2 block text-[9px] font-bold uppercase tracking-[.13em] text-[#dc5b38]">Zašto ova oznaka?</span>
        {help}
      </span>
    </span>
  );
}

export function EligibilityBadge({ status, reasons }: { status: SerbiaEligibility; reasons?: string[] }) {
  const label = eligibilityLabel(status);
  const help = reasons?.[0] ?? eligibilityHelp(status);
  return <BadgeShell label={label} help={help} tone={STATUS_CLASS[status] ?? STATUS_CLASS.UNCLEAR} />;
}

export function ResourceSupportBadge({ support, note }: { support: SerbiaSupport; note: string }) {
  const labels: Record<SerbiaSupport, string> = {
    confirmed: "Srbija potvrđena",
    partial: "Zavisi od oglasa",
    unknown: "Lokacija nije jasno navedena",
    "not-supported": "Srbija nije podržana",
  };
  return <BadgeShell label={labels[support]} help={note} tone={STATUS_CLASS[support]} />;
}
