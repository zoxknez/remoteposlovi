import type {
  EligibilityResult,
  RemoteScope,
  SerbiaEligibility,
} from "@/types";

const SERBIA_ALIASES = [
  "serbia",
  "serbian",
  "srbija",
  "srbije",
  "republic of serbia",
  "republika srbija",
  "rs",
];

const EU_COUNTRIES = [
  "austria",
  "belgium",
  "bulgaria",
  "croatia",
  "cyprus",
  "czechia",
  "czech republic",
  "denmark",
  "estonia",
  "finland",
  "france",
  "germany",
  "greece",
  "hungary",
  "ireland",
  "italy",
  "latvia",
  "lithuania",
  "luxembourg",
  "malta",
  "netherlands",
  "poland",
  "portugal",
  "romania",
  "slovakia",
  "slovenia",
  "spain",
  "sweden",
];

const EEA_EXTRA = ["norway", "iceland", "liechtenstein"];

const US_ALIASES = [
  "united states",
  "usa",
  "u.s.",
  "u.s.a",
  "us only",
  "united states only",
];

const WORLDWIDE_LOCATION_PATTERNS = [
  /\bworldwide\b/i,
  /\banywhere\b/i,
  /\bglobal(?:ly)?\b/i,
  /\bunlimited locations?\b/i,
  /\ball countries\b/i,
  /\bany country\b/i,
  /\bno location restriction/i,
  /\bwork from anywhere\b/i,
  /\bremote worldwide\b/i,
];

const WORLDWIDE_DESCRIPTION_PATTERNS = [
  /\bremote worldwide\b/i,
  /\bhiring worldwide\b/i,
  /\bwork from anywhere\b/i,
  /\bno location restriction/i,
  /\bcandidates? from anywhere\b/i,
  /\bopen to all countries\b/i,
];

const EMEA_PATTERNS = [/\bemea\b/i, /\beurope,? middle east(?: and|,) africa\b/i];
const EUROPE_PATTERNS = [
  /\beurope(?:an)?\b/i,
  /\beu only\b/i,
  /\beuropean union\b/i,
  /\beea\b/i,
  /\beu\/eea\b/i,
  /\beu\/uk\b/i,
];
const TIMEZONE_PATTERNS = [
  /\b(est|edt|pst|pdt|cst|cdt|mst|mdt|cet|cest|gmt|utc)\b/i,
  /\btime zone\b/i,
  /\btimezone\b/i,
  /\bworking hours?\b/i,
  /\boverlap\b/i,
  /\bus east(?:ern)? (?:time|business hours)\b/i,
];

const EXCLUSION_PATTERNS = [
  /\bexcept(?:ion)? (?:for )?serbia\b/i,
  /\bexcluding serbia\b/i,
  /\bnot (?:open|available|hiring) (?:in|from|to) serbia\b/i,
  /\bno applicants? from serbia\b/i,
];

const US_ONLY_PATTERNS = [
  /\bmust (?:be|reside|live) in the (?:united states|usa|u\.s\.)\b/i,
  /\bauthorized to work in the (?:united states|usa)\b/i,
  /\bus (?:work )?authorization required\b/i,
  /\bus citizens? or (?:green card|permanent residents?)\b/i,
  /\bmust have resided in the united states\b/i,
];

function containsAlias(text: string, aliases: string[]): boolean {
  const padded = ` ${text} `;
  return aliases.some((alias) => {
    if (alias.length <= 2) {
      return new RegExp(`(?:^|[^a-z])${alias}(?:[^a-z]|$)`, "i").test(padded);
    }
    return padded.includes(` ${alias} `) || text.includes(alias);
  });
}

function splitLocations(raw: string): string[] {
  return raw
    .split(/[;|/]|(?:\s+and\s+)|(?:\s*,\s*)/g)
    .map((part) => part.replace(/\bremote\b/gi, "").trim())
    .filter(Boolean);
}

function hasSpecificCountryList(parts: string[]): boolean {
  const countryLike = parts.filter((part) => {
    const lower = part.toLowerCase();
    if (["emea", "europe", "eu", "eea", "worldwide", "global", "anywhere"].includes(lower)) {
      return false;
    }
    return /[a-z]{3,}/i.test(part);
  });
  return countryLike.length >= 2 || (countryLike.length === 1 && !/europe|emea|worldwide/i.test(countryLike[0]));
}

export function classifySerbiaEligibility(input: {
  location?: string | null;
  title?: string | null;
  description?: string | null;
  candidateRequiredLocation?: string | null;
}): EligibilityResult {
  const location = [input.candidateRequiredLocation, input.location]
    .filter(Boolean)
    .join(" ; ");
  const haystack = [location, input.title, input.description]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
  const locationLower = location.toLowerCase();
  const reasons: string[] = [];
  const eligibleCountries: string[] = [];
  const remoteScope: RemoteScope[] = [];

  if (!location && !input.description && !input.title) {
    return {
      status: "UNCLEAR",
      reasons: ["Oglas ne navodi geografsku dostupnost."],
      eligibleCountries: [],
      remoteScope: ["country-dependent"],
    };
  }

  if (EXCLUSION_PATTERNS.some((pattern) => pattern.test(haystack))) {
    return {
      status: "NOT_ELIGIBLE",
      reasons: ["Oglas eksplicitno isključuje Srbiju."],
      eligibleCountries: [],
      remoteScope: [],
    };
  }

  const serbiaInLocation = containsAlias(locationLower, SERBIA_ALIASES);
  const serbiaInText = containsAlias(haystack, SERBIA_ALIASES);

  if (serbiaInLocation || /\bserbia\b/.test(haystack) && /eligible|allowed|open to|locations?:|countries?:/.test(haystack)) {
    reasons.push("Originalni oglas eksplicitno navodi Srbiju među dozvoljenim lokacijama.");
    eligibleCountries.push("RS");
    remoteScope.push("serbia");
    return {
      status: "CONFIRMED_SERBIA",
      reasons,
      eligibleCountries,
      remoteScope,
    };
  }

  if (serbiaInText && /not (?:eligible|allowed|open)|except|excluding/.test(haystack)) {
    return {
      status: "NOT_ELIGIBLE",
      reasons: ["Tekst oglasa spominje Srbiju u kontekstu ograničenja."],
      eligibleCountries: [],
      remoteScope: [],
    };
  }

  if (US_ONLY_PATTERNS.some((pattern) => pattern.test(haystack))) {
    return {
      status: "NOT_ELIGIBLE",
      reasons: ["Oglas zahteva boravak ili radnu dozvolu u SAD."],
      eligibleCountries: ["US"],
      remoteScope: [],
    };
  }

  const parts = splitLocations(location);
  const locationLooksSpecific = hasSpecificCountryList(parts);
  const worldwideInLocation = WORLDWIDE_LOCATION_PATTERNS.some((pattern) => pattern.test(locationLower));
  const worldwideInDescription =
    !locationLooksSpecific &&
    WORLDWIDE_DESCRIPTION_PATTERNS.some((pattern) => pattern.test(haystack));
  if ((worldwideInLocation || worldwideInDescription) && !locationLooksSpecific) {
    reasons.push("Oglas navodi worldwide, anywhere ili globalnu dostupnost, bez ograničenja na određene države.");
    remoteScope.push("worldwide");
    return {
      status: "WORLDWIDE",
      reasons,
      eligibleCountries: [],
      remoteScope,
    };
  }
  const emea = EMEA_PATTERNS.some((pattern) => pattern.test(locationLower) || pattern.test(haystack));
  const europe = EUROPE_PATTERNS.some((pattern) => pattern.test(locationLower) || pattern.test(haystack));
  const euOnly = /\b(eu only|european union|eea|eu\/eea)\b/i.test(locationLower) || /\b(eu only|european union)\b/i.test(haystack);

  const listedCountries = parts
    .map((part) => part.toLowerCase())
    .filter((part) => !["emea", "europe", "eu", "eea", "worldwide", "global", "anywhere", "remote"].includes(part));

  if (hasSpecificCountryList(parts) && !emea && !europe && !worldwideInLocation) {
    const includesSerbia = listedCountries.some((part) => containsAlias(part, SERBIA_ALIASES));
    if (!includesSerbia) {
      reasons.push(
        `Oglas navodi konkretne države (${parts.slice(0, 8).join(", ")}), a Srbija nije na listi.`,
      );
      return {
        status: "NOT_ELIGIBLE",
        reasons,
        eligibleCountries: [],
        remoteScope: [],
      };
    }
  }

  if (euOnly) {
    reasons.push(
      "Oglas je ograničen na EU ili EEA. Srbija nije članica EU/EEA, pa dostupnost treba proveriti pre prijave.",
    );
    remoteScope.push("europe");
    return {
      status: "EUROPE",
      reasons,
      eligibleCountries: [],
      remoteScope,
    };
  }

  if (emea) {
    reasons.push(
      "Oglas navodi EMEA, ali ne daje tačnu listu država. Srbija geografski spada u EMEA, ipak pre prijave proveri uslove.",
    );
    remoteScope.push("emea");
    return {
      status: "EMEA",
      reasons,
      eligibleCountries: [],
      remoteScope,
    };
  }

  if (europe) {
    reasons.push(
      "Oglas navodi Evropu. Srbija je u Evropi, ali kompanije često misle na EU. Pre prijave proveri uslove.",
    );
    remoteScope.push("europe");
    return {
      status: "EUROPE",
      reasons,
      eligibleCountries: [],
      remoteScope,
    };
  }

  const usHeavy =
    US_ALIASES.some((alias) => locationLower.includes(alias)) &&
    !europe &&
    !emea &&
    listedCountries.length <= 3;
  if (usHeavy && hasSpecificCountryList(parts)) {
    reasons.push("Lokacija je ograničena na SAD ili uski skup država van regiona.");
    return {
      status: "NOT_ELIGIBLE",
      reasons,
      eligibleCountries: ["US"],
      remoteScope: [],
    };
  }

  if (TIMEZONE_PATTERNS.some((pattern) => pattern.test(haystack)) && !hasSpecificCountryList(parts)) {
    reasons.push(
      "Oglas postavlja vremensku zonu ili radno vreme, bez jasne liste država. Proveri overlap i uslove pre prijave.",
    );
    remoteScope.push("country-dependent");
    return {
      status: "TIMEZONE_BASED",
      reasons,
      eligibleCountries: [],
      remoteScope,
    };
  }

  if (/^remote$/.test(locationLower.trim()) || locationLower.trim() === "") {
    reasons.push(
      "Oglas kaže samo Remote, bez liste država. To nije dovoljno da se tvrdi dostupnost iz Srbije.",
    );
    remoteScope.push("country-dependent");
    return {
      status: "UNCLEAR",
      reasons,
      eligibleCountries: [],
      remoteScope,
    };
  }

  reasons.push("Lokacija nije jasno navedena za kandidate iz Srbije.");
  remoteScope.push("country-dependent");
  return {
    status: "UNCLEAR",
    reasons,
    eligibleCountries: [],
    remoteScope,
  };
}

export function eligibilityLabel(status: SerbiaEligibility): string {
  switch (status) {
    case "CONFIRMED_SERBIA":
      return "Srbija potvrđena";
    case "WORLDWIDE":
      return "Worldwide";
    case "EUROPE":
      return "Europe";
    case "EMEA":
      return "EMEA";
    case "TIMEZONE_BASED":
      return "Zavisi od vremenske zone";
    case "NOT_ELIGIBLE":
      return "Srbija nije podržana";
    default:
      return "Lokacija nije jasno navedena";
  }
}

export function eligibilityHelp(status: SerbiaEligibility): string {
  switch (status) {
    case "CONFIRMED_SERBIA":
      return "Srbija potvrđena - pronađeni su oglasi koji eksplicitno navode Srbiju kao dozvoljenu lokaciju.";
    case "WORLDWIDE":
      return "Worldwide - oglas navodi globalnu dostupnost, bez liste zabranjenih država.";
    case "EUROPE":
      return "Europe - oglas je namenjen Evropi ili EU. Srbija nije u EU, pa uslove treba proveriti pre prijave.";
    case "EMEA":
      return "EMEA - platforma ili oglas koristi regionalnu oznaku. Srbija geografski spada u EMEA, ali lista država često nije tačna.";
    case "TIMEZONE_BASED":
      return "Zavisi od vremenske zone - geografija nije jasna, ali postoji zahtev za radno vreme ili overlap.";
    case "NOT_ELIGIBLE":
      return "Srbija nije podržana - oglas ograničava lokaciju na druge države ili eksplicitno isključuje Srbiju.";
    default:
      return "Lokacija nije jasno navedena - oglas kaže Remote ili ne daje dovoljno podataka. Ne tvrdimo da je dostupan iz Srbije.";
  }
}

export function isSerbiaLikely(status: SerbiaEligibility): boolean {
  return status === "CONFIRMED_SERBIA" || status === "WORLDWIDE";
}

export const EU_COUNTRY_NAMES = [...EU_COUNTRIES, ...EEA_EXTRA];
