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

export type SerbiaSupport =
  | "confirmed"
  | "partial"
  | "unknown"
  | "not-supported";

export type RemoteScope =
  | "serbia"
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

export interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  type: ResourceType;
  categories: ResourceCategory[];
  regions: Array<"Srbija" | "Evropa / EMEA" | "Globalno">;
  serbiaSupport: SerbiaSupport;
  serbiaSupportNote: string;
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
  kind: "Oglasi" | "Freelance" | "Alat";
  label: string;
  feedUrl?: string;
  section: ResourceSection;
  tags: string[];
  official: boolean;
  openSource: boolean;
  audience: Array<"beginner" | "junior" | "mid" | "senior" | "freelancer" | "entrepreneur" | "student" | "manager">;
}

export type SerbiaEligibility =
  | "CONFIRMED_SERBIA"
  | "WORLDWIDE"
  | "EUROPE"
  | "EMEA"
  | "TIMEZONE_BASED"
  | "UNCLEAR"
  | "NOT_ELIGIBLE";

export type JobCategory =
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

export type Seniority =
  | "internship"
  | "junior"
  | "mid"
  | "senior"
  | "lead"
  | "manager"
  | "unknown";

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship"
  | "unknown";

export type RemoteMode = "fully-remote" | "hybrid" | "unknown";

export type JobStatus = "ACTIVE" | "CLOSED" | "REMOVED" | "UNKNOWN";

export type JobSourceName = "remotive" | "remoteok" | "greenhouse" | "lever";

export interface TimezoneWindow {
  zone: string;
  startHour: number;
  endHour: number;
  label: string;
}

export interface EligibilityResult {
  status: SerbiaEligibility;
  reasons: string[];
  eligibleCountries: string[];
  remoteScope: RemoteScope[];
}

export interface NormalizedJob {
  id: string;
  slug: string;
  source: JobSourceName;
  sourceId: string;
  sourceUrl: string;
  applyUrl: string;
  canonicalUrl: string;
  company: string;
  companyNormalized: string;
  title: string;
  titleNormalized: string;
  description: string;
  location: string;
  remoteScope: RemoteScope[];
  eligibleCountries: string[];
  serbiaEligibility: SerbiaEligibility;
  eligibilityReasons: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  salaryPeriod: "year" | "month" | "hour" | "day" | null;
  salaryRaw: string | null;
  category: JobCategory;
  seniority: Seniority;
  employmentType: EmploymentType;
  remoteMode: RemoteMode;
  timezone: TimezoneWindow | null;
  publishedAt: string | null;
  fetchedAt: string;
  expiresAt: string | null;
  lastCheckedAt: string;
  status: JobStatus;
  sources: JobSourceName[];
  sourceUrls: Record<string, string>;
  juniorFriendly: boolean;
}

export interface JobFeedMeta {
  fetchedAt: string;
  sources: Array<{
    name: JobSourceName;
    ok: boolean;
    count: number;
    error?: string;
    durationMs: number;
  }>;
}

export interface JobFeed {
  jobs: NormalizedJob[];
  meta: JobFeedMeta;
}

export interface JobFilters {
  q?: string;
  location?: "srbija" | "europe" | "emea" | "worldwide";
  serbiaOnly?: boolean;
  category?: JobCategory | "all";
  seniority?: Seniority | "all";
  type?: EmploymentType | "all";
  remote?: RemoteMode | "all";
  salaryOnly?: boolean;
  timezone?: "cet" | "cet2" | "cet4" | "any";
  posted?: "24h" | "3d" | "7d" | "30d" | "all";
  hideSeen?: boolean;
  junior?: boolean;
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

export interface SavedSearch {
  id: string;
  name: string;
  filters: JobFilters;
  createdAt: string;
  lastSeenAt: string;
  lastCount: number;
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
