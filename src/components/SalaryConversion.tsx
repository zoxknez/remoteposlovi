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

  return (
    <section className="rounded-lg border border-[#17312a]/10 bg-white p-5 text-sm">
      <h2 className="font-serif text-xl">Procena plate</h2>
      <p className="mt-2 text-[#52675f]">
        {job.salaryRaw}. Izračun je pre poreza. Kurs: {fx.source}, lista od {fx.publishedOn}.
      </p>
      <ul className="mt-3 grid gap-1">
        <li>≈ {formatNumberSr(monthly, 0)} {job.salaryCurrency} mesečno</li>
        {monthlyEur != null ? <li>≈ {formatNumberSr(monthlyEur, 0)} EUR mesečno</li> : null}
        {monthlyUsd != null ? <li>≈ {formatNumberSr(monthlyUsd, 0)} USD mesečno</li> : null}
        {monthlyRsd != null ? <li>≈ {formatMoneyRsd(monthlyRsd)} mesečno</li> : null}
      </ul>
      <Link
        href={`/porez?iznos=${Math.round(monthly)}&valuta=${job.salaryCurrency}&period=monthly`}
        className="mt-3 inline-flex min-h-11 items-center font-bold text-[#dc5b38]"
      >
        Izračunaj približan porez
      </Link>
    </section>
  );
}
