import Link from "next/link";
import { formatMoneyRsd, formatNumberSr } from "@/lib/format";
import { annualizeSalary, monthlyFromAnnual } from "@/lib/salary";
import { convertAmount } from "@/lib/fx";
import type { FxRates, NormalizedJob } from "@/types";

export function SalaryConversion({ job, fx }: { job: NormalizedJob; fx: FxRates }) {
  const amount = job.salaryMax ?? job.salaryMin;
  if (amount == null || !job.salaryCurrency) return null;
  const annual = annualizeSalary(amount, job.salaryPeriod);
  const monthly = monthlyFromAnnual(annual);
  const monthlyEur = convertAmount(monthly, job.salaryCurrency, "EUR", fx);
  const monthlyUsd = convertAmount(monthly, job.salaryCurrency, "USD", fx);
  const monthlyRsd = convertAmount(monthly, job.salaryCurrency, "RSD", fx);
  const items = [
    [job.salaryCurrency, formatNumberSr(monthly, 0)],
    ["EUR", monthlyEur != null ? formatNumberSr(monthlyEur, 0) : null],
    ["USD", monthlyUsd != null ? formatNumberSr(monthlyUsd, 0) : null],
    ["RSD", monthlyRsd != null ? formatMoneyRsd(monthlyRsd) : null],
  ].filter(([, value]) => value != null);

  return <section className="premium-panel p-5 md:p-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="eyebrow">PLATA</p><h2 className="mt-2 font-serif text-3xl tracking-[-0.025em]">Procena mesečnog iznosa</h2><p className="mt-2 text-sm leading-6 text-[#60736b]">{job.salaryRaw}. Sve vrednosti su pre poreza.</p></div>
      <p className="text-[10px] font-semibold text-[#7a8982]">{fx.source} · {fx.publishedOn}</p>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([currency,value])=><div key={String(currency)} className="rounded-2xl border border-[#17312a]/8 bg-white p-4"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#89958f]">{currency}</p><strong className="mt-2 block font-serif text-2xl text-[#17312a]">{value}</strong><p className="mt-1 text-[10px] text-[#7a8982]">mesečno</p></div>)}</div>
    <Link href={`/porez?iznos=${Math.round(monthly)}&valuta=${job.salaryCurrency}&period=monthly`} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#17312a] px-5 text-xs font-bold text-white">Izračunaj približan porez →</Link>
  </section>;
}