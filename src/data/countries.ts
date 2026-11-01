import type { BalkanCountry, CountryCode } from "@/types";

export interface CountryInfo {
  code: CountryCode;
  slug: string;
  name: string;
  /** Oznaka na bedžu (ISO kod; Kosovo koristi XK). */
  badge: string;
  currency?: string;
  euMember?: boolean;
  intro: string;
  tips: string[];
  tone: string;
}

/**
 * Činjenice ovde su namerno uopštene i stabilne (valuta, članstvo u EU).
 * Poreska pravila se menjaju; za detalje uvek vodimo na zvanične portale iz direktorijuma.
 */
export const BALKAN_COUNTRIES: Array<CountryInfo & { code: BalkanCountry }> = [
  {
    code: "rs",
    slug: "srbija",
    name: "Srbija",
    badge: "RS",
    currency: "RSD",
    euMember: false,
    intro: "Najveći izbor domaćih IT oglasnika, poreski portal za frilensere i alati za obračun.",
    tips: [
      "Prihod iz inostranstva frilenseri prijavljuju preko portala Poreske uprave, a paušalci registruju delatnost u APR-u.",
      "Oglasi označeni kao 'EU only' najčešće nisu otvoreni za Srbiju. Tražite Worldwide, Europe ili eksplicitnu listu država.",
    ],
    tone: "bg-[#e5f0df] text-[#2f5245]",
  },
  {
    code: "hr",
    slug: "hrvatska",
    name: "Hrvatska",
    badge: "HR",
    currency: "EUR",
    euMember: true,
    intro: "Lokalni portali za posao, zavod za zapošljavanje, ePorezna i podaci o platama.",
    tips: [
      "Hrvatska je članica EU, pa su otvoreni i oglasi označeni kao 'EU only' ili 'EEA'.",
      "Za samostalan rad postoje obrt i paušalni obrt; uslove proverite kod Porezne uprave i obrtničke komore.",
    ],
    tone: "bg-[#e8eef8] text-[#31415f]",
  },
  {
    code: "ba",
    slug: "bosna-i-hercegovina",
    name: "Bosna i Hercegovina",
    badge: "BA",
    currency: "BAM",
    euMember: false,
    intro: "Oglasnici, zavodi za zapošljavanje na nivou entiteta i države, poreske uprave i plate.",
    tips: [
      "Nadležnosti su podeljene po entitetima: Federacija BiH i Republika Srpska imaju zasebne zavode i poreske uprave.",
      "Kod 'EU only' oglasa proverite listu država; BiH obično nije uključena.",
    ],
    tone: "bg-[#f7f1df] text-[#6d5a28]",
  },
  {
    code: "me",
    slug: "crna-gora",
    name: "Crna Gora",
    badge: "ME",
    currency: "EUR",
    euMember: false,
    intro: "Domaći oglasnici, Zavod za zapošljavanje i Poreska uprava.",
    tips: [
      "Euro je u upotrebi, pa nema konverzije za ponude u EUR, ali Crna Gora nije članica EU.",
      "Za remote rad sa stranim klijentima proverite uslove registracije i oporezivanja kod Poreske uprave.",
    ],
    tone: "bg-[#eeeaf6] text-[#5e4f83]",
  },
  {
    code: "mk",
    slug: "severna-makedonija",
    name: "Severna Makedonija",
    badge: "MK",
    currency: "MKD",
    euMember: false,
    intro: "Najveći makedonski portali za posao, agencija za zapošljavanje, UJP i IT zajednica.",
    tips: [
      "Poreske prijave se podnose elektronski preko e-UJP portala Uprave za javne prihode.",
      "Kod 'EU only' oglasa proverite listu država; Severna Makedonija obično nije uključena.",
    ],
    tone: "bg-[#f8eee9] text-[#98503a]",
  },
  {
    code: "si",
    slug: "slovenija",
    name: "Slovenija",
    badge: "SI",
    currency: "EUR",
    euMember: true,
    intro: "Zavod za zaposlovanje, vodeći slovenački portali za posao i eDavki.",
    tips: [
      "Slovenija je članica EU, pa su otvoreni i oglasi označeni kao 'EU only' ili 'EEA'.",
      "Poreske obaveze i prijave vode se kroz eDavki portal Finansijske uprave (FURS).",
    ],
    tone: "bg-[#e3f1ef] text-[#245a52]",
  },
  {
    code: "xk",
    slug: "kosovo",
    name: "Kosovo",
    badge: "XK",
    currency: "EUR",
    euMember: false,
    intro: "Lokalni oglasnici, agencija za zapošljavanje, poreska administracija i tech zajednica.",
    tips: [
      "Neke globalne platforme imaju ograničenja za Kosovo pri isplatama; proverite listu podržanih država pre registracije.",
      "Poreske obaveze proverite kod Poreske administracije Kosova (ATK).",
    ],
    tone: "bg-[#e8eef8] text-[#31415f]",
  },
  {
    code: "al",
    slug: "albanija",
    name: "Albanija",
    badge: "AL",
    currency: "ALL",
    euMember: false,
    intro: "Albanski oglasnici, nacionalna agencija za zapošljavanje, poreska uprava i e-Albania.",
    tips: [
      "Većina državnih usluga, uključujući registraciju i poreske prijave, dostupna je preko portala e-Albania.",
      "Kod 'EU only' oglasa proverite listu država; Albanija obično nije uključena.",
    ],
    tone: "bg-[#f8e8e8] text-[#7a3030]",
  },
];

export const OTHER_SCOPES: CountryInfo[] = [
  {
    code: "eu",
    slug: "evropa",
    name: "Evropa / EMEA",
    badge: "EU",
    intro: "Platforme fokusirane na evropske vremenske zone i EMEA tržište.",
    tips: [],
    tone: "bg-[#eeeaf6] text-[#5e4f83]",
  },
  {
    code: "global",
    slug: "globalno",
    name: "Globalne platforme",
    badge: "🌐",
    intro: "Svetski oglasnici, freelance i AI trening platforme, alati za CV i plate.",
    tips: [],
    tone: "bg-[#edf3eb] text-[#426052]",
  },
];

export const ALL_SCOPES: CountryInfo[] = [...BALKAN_COUNTRIES, ...OTHER_SCOPES];

export function getCountry(code: CountryCode): CountryInfo {
  return ALL_SCOPES.find((country) => country.code === code) ?? OTHER_SCOPES[1];
}

export function getCountryBySlug(slug: string): (CountryInfo & { code: BalkanCountry }) | undefined {
  return BALKAN_COUNTRIES.find((country) => country.slug === slug);
}
