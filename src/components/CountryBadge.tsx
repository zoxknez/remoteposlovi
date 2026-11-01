import { getCountry } from "@/data/countries";
import type { CountryCode } from "@/types";

/** Kod zemlje u obojenom krugu. Emoji zastave se ne prikazuju na Windowsu, pa ih ne koristimo. */
export function CountryBadge({ code, className = "size-12 text-sm" }: { code: CountryCode; className?: string }) {
  const country = getCountry(code);
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full font-bold tracking-wide ${country.tone} ${className}`}
    >
      {country.badge}
    </span>
  );
}
