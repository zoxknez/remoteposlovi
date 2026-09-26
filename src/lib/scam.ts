export interface ScamSignal {
  id: string;
  title: string;
  detail: string;
}

export interface ScamCheckResult {
  signals: ScamSignal[];
  summary: string;
  companyDomain: string | null;
  recruiterEmailDomain: string | null;
}

const PAYMENT_PATTERNS = [
  /uplat(i|ite|u)/i,
  /\b(wire transfer|western union|moneygram)\b/i,
  /\bpay (a )?(fee|deposit|training)\b/i,
  /registration fee/i,
  /processing fee/i,
];

const CRYPTO_PATTERNS = [/\bcrypto\b/i, /\bbitcoin\b/i, /\bethereum\b/i, /\busdt\b/i, /\bwallet address\b/i];
const GIFT_PATTERNS = [/gift card/i, /google play card/i, /itunes card/i, /steam card/i];
const CHECK_PATTERNS = [/cashier'?s check/i, /cheque/i, /overpay/i, /over-?payment/i];
const EQUIPMENT_PATTERNS = [
  /buy (the )?equipment from/i,
  /purchase (a )?laptop from (our|the) (vendor|supplier)/i,
  /send money for (equipment|computer|phone)/i,
];
const CHAT_ONLY_PATTERNS = [
  /contact (us )?only (via|on) (telegram|whatsapp)/i,
  /apply (only )?on telegram/i,
  /whatsapp (only|to apply)/i,
];
const UNREALISTIC_PAY = [
  /\$\s?500\s?(\/|a )?day/i,
  /\$\s?10,?000\s+(per|a) week/i,
  /earn \$\d{4,} a day/i,
  /nerealna zarada/i,
  /minimalan rad.{0,40}(hiljada|\$\d{3,})/i,
];
const TASK_JOB = [/task job/i, /reshipping/i, /parcel mule/i, /payment agent/i, /crypto recovery/i];
const START_FEE = [/pay to start/i, /starter kit fee/i, /onboarding fee/i, /uplata da (bi|biste) počeli/i];

const FREE_EMAIL = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "mail.com"];

function pushIf(
  signals: ScamSignal[],
  id: string,
  title: string,
  detail: string,
  matched: boolean,
) {
  if (matched) signals.push({ id, title, detail });
}

export function extractEmails(text: string): string[] {
  return Array.from(text.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)).map((match) => match[0].toLowerCase());
}

export function extractUrls(text: string): string[] {
  return Array.from(text.matchAll(/https?:\/\/[^\s)]+/gi)).map((match) => match[0]);
}

export function domainFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export function checkScamSignals(input: { url?: string; text?: string }): ScamCheckResult {
  const text = `${input.url ?? ""}\n${input.text ?? ""}`;
  const signals: ScamSignal[] = [];

  pushIf(
    signals,
    "payment",
    "Traži se uplata",
    "Oglas ili poruka traži uplatu, depozit ili naknadu za početak rada.",
    PAYMENT_PATTERNS.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "crypto",
    "Kripto uplata",
    "Pominje se bitcoin, USDT ili slanje na wallet.",
    CRYPTO_PATTERNS.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "gift-card",
    "Gift kartice",
    "Traži se kupovina gift kartica. To je čest obrazac prevare.",
    GIFT_PATTERNS.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "check",
    "Ček ili preplata",
    "Pominje se cashiers check ili vraćanje preplaćenog iznosa.",
    CHECK_PATTERNS.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "equipment",
    "Kupovina opreme preko određenog dobavljača",
    "Kandidat treba da kupi opremu od 'njihove' firme.",
    EQUIPMENT_PATTERNS.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "chat-only",
    "Samo Telegram ili WhatsApp",
    "Jedini kanal prijave je privatna poruka, bez kompanijskog domena.",
    CHAT_ONLY_PATTERNS.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "unrealistic",
    "Nerealna zarada",
    "Obećana zarada je nerealno visoka za opisani obim posla.",
    UNREALISTIC_PAY.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "task-job",
    "Task job / mule šema",
    "Opis liči na reshipping, payment agent ili slične šeme.",
    TASK_JOB.some((pattern) => pattern.test(text)),
  );
  pushIf(
    signals,
    "start-fee",
    "Naknada da bi se počelo",
    "Posao zahteva uplatu pre početka rada.",
    START_FEE.some((pattern) => pattern.test(text)),
  );

  const emails = extractEmails(text);
  const recruiterEmail = emails[0] ?? null;
  const recruiterEmailDomain = recruiterEmail?.split("@")[1] ?? null;
  if (recruiterEmailDomain && FREE_EMAIL.includes(recruiterEmailDomain)) {
    signals.push({
      id: "free-email",
      title: "Besplatna email adresa umesto kompanijskog domena",
      detail: `Kontakt ide preko ${recruiterEmailDomain}. To nije dokaz prevare, ali zahteva dodatnu proveru kompanije.`,
    });
  }

  const urlDomain = input.url ? domainFromUrl(input.url) : null;
  if (urlDomain && recruiterEmailDomain && !FREE_EMAIL.includes(recruiterEmailDomain)) {
    const root = urlDomain.split(".").slice(-2).join(".");
    if (!recruiterEmailDomain.endsWith(root) && !root.endsWith(recruiterEmailDomain)) {
      signals.push({
        id: "domain-mismatch",
        title: "Email domen se ne poklapa sa sajtom",
        detail: `Sajt je ${urlDomain}, a email ${recruiterEmailDomain}.`,
      });
    }
  }

  const summary =
    signals.length === 0
      ? "Nisu pronađeni očigledni rizični signali. To ne znači da je oglas legitiman."
      : `Pronađena su ${signals.length} rizična signala. Preporučujemo dodatnu proveru pre slanja podataka ili novca.`;

  return {
    signals,
    summary,
    companyDomain: urlDomain,
    recruiterEmailDomain,
  };
}

export const SCAM_OFFICIAL_LINKS = [
  {
    label: "FTC: Job scams",
    url: "https://consumer.ftc.gov/articles/job-scams",
  },
  {
    label: "FTC: How to avoid job scams",
    url: "https://consumer.ftc.gov/consumer-alerts/2023/05/looking-job-scammers-are-looking-you",
  },
];
