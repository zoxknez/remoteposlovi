export type ResourceType =
  | "job-board"
  | "freelance"
  | "company"
  | "government"
  | "tool"
  | "community"
  | "salary"
  | "cv"
  | "tax"
  | "learning"
  | "language"
  | "security"
  | "productivity"
  | "portfolio"
  | "interview"
  | "payment"
  | "invoice"
  | "ai";

export type ResourceSection =
  | "Poslovi"
  | "Freelance"
  | "Karijera"
  | "Učenje"
  | "Poslovanje"
  | "Sigurnost"
  | "Produktivnost"
  | "Komunikacija"
  | "AI"
  | "Zajednice"
  | "Remote rad";

/** Da li je servis dostupan ljudima iz regiona (Balkan). */
export type RegionSupport =
  | "confirmed"
  | "partial"
  | "unknown"
  | "not-supported";

export type RemoteScope =
  | "local"
  | "europe"
  | "emea"
  | "worldwide"
  | "country-dependent";

export type Pricing = "free" | "freemium" | "paid" | "unknown";

export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export type SourceKind = "official" | "job-board" | "company" | "community" | "tool";

export type ResourceCategory =
  | "engineering"
  | "qa"
  | "data"
  | "ai"
  | "design"
  | "product"
  | "marketing"
  | "sales"
  | "support"
  | "finance"
  | "hr"
  | "writing"
  | "teaching"
  | "administration"
  | "other";

/** Zemlje Balkana (ex-YU + Albanija) plus evropski i globalni servisi. */
export type BalkanCountry = "rs" | "hr" | "ba" | "me" | "mk" | "si" | "xk" | "al";
export type CountryCode = BalkanCountry | "eu" | "global";

export type ResourceKind = "Oglasi" | "Freelance" | "Alat";

export interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  type: ResourceType;
  categories: ResourceCategory[];
  country: CountryCode;
  regionSupport: RegionSupport;
  regionSupportNote: string;
  remoteScope: RemoteScope[];
  pricing: Pricing;
  accountRequired: boolean | null;
  salaryData: boolean;
  salaryFilter: boolean;
  juniorFriendly: boolean | null;
  nonTech: boolean | null;
  jobTypes: JobType[];
  sourceType: SourceKind;
  featured: boolean;
  kind: ResourceKind;
  label: string;
  section: ResourceSection;
  tags: string[];
  official: boolean;
  openSource: boolean;
  audience: Array<"beginner" | "junior" | "mid" | "senior" | "freelancer" | "entrepreneur" | "student" | "manager">;
}

export type TrackerStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "archived";

export interface TrackerEntry {
  id: string;
  jobId: string;
  slug: string;
  title: string;
  company: string;
  applyUrl: string;
  source: string;
  status: TrackerStatus;
  savedAt: string;
  appliedAt: string | null;
  cvVersion: string;
  contactName: string;
  contactEmail: string;
  note: string;
  nextStep: string;
  followUpAt: string | null;
}

export interface SourceHealth {
  id: string;
  url: string;
  httpStatus: number | null;
  finalUrl: string | null;
  redirected: boolean;
  responseTimeMs: number | null;
  ok: boolean;
  lastSuccessfulCheck: string | null;
  lastFailedCheck: string | null;
  error?: string;
}

export interface FxRates {
  date: string;
  publishedOn: string;
  source: string;
  sourceUrl: string;
  rsdPerEur: number;
  rsdPerUsd: number;
  fetchedAt: string;
}
