import type { EmploymentType, JobCategory, Seniority } from "@/types";

export function classifyCategory(title: string, description = "", sourceCategory = ""): JobCategory {
  const text = `${title} ${sourceCategory} ${description}`.toLowerCase();
  const rules: Array<[JobCategory, RegExp]> = [
    ["qa", /\b(qa|quality assurance|test engineer|sdet|selenium|playwright|cypress)\b/],
    ["data", /\b(data engineer|data scientist|analytics|bi engineer|etl|warehouse)\b/],
    ["ai", /\b(machine learning|deep learning|llm|ai engineer|prompt engineer|ai trainer|ai evaluation|data annotat)\b/],
    ["design", /\b(ui\/ux|product designer|graphic designer|figma|brand designer|visual designer)\b/],
    ["product", /\b(product manager|product owner|pm\b|product lead)\b/],
    ["marketing", /\b(marketing|seo|content marketer|growth marketer|performance marketing)\b/],
    ["sales", /\b(sales|account executive|sdr|bdr|business development)\b/],
    ["support", /\b(customer support|customer success|helpdesk|technical support|content moderator)\b/],
    ["finance", /\b(accountant|finance|bookkeep|controller|fp&a)\b/],
    ["hr", /\b(recruiter|talent acquisition|people ops|human resources|hr manager)\b/],
    ["writing", /\b(copywriter|content writer|technical writer|editor|journalist)\b/],
    ["teaching", /\b(teacher|tutor|instructor|esl|tefl|online english)\b/],
    ["administration", /\b(virtual assistant|administrative|office manager|data entry|operations coordinator)\b/],
    ["engineering", /\b(software|developer|engineer|frontend|backend|fullstack|devops|sre|mobile)\b/],
  ];
  for (const [category, pattern] of rules) {
    if (pattern.test(text)) return category;
  }
  return "other";
}

export function classifySeniority(title: string, description = ""): Seniority {
  const text = `${title} ${description.slice(0, 1500)}`.toLowerCase();
  if (/\b(intern|internship|praksa|trainee)\b/.test(text)) return "internship";
  if (/\b(staff|principal|distinguished|head of|director|vp\b|chief)\b/.test(text)) return "lead";
  if (/\b(engineering manager|people manager|hiring manager)\b/.test(text)) return "manager";
  if (/\b(lead|principal|staff)\b/.test(text)) return "lead";
  if (/\b(senior|sr\.|sen.\b)\b/.test(text)) return "senior";
  if (/\b(junior|jr\.|entry[- ]level|graduate|početni)\b/.test(text)) return "junior";
  if (/\b(mid[- ]level|intermediate)\b/.test(text)) return "mid";
  if (/\bmanager\b/.test(title.toLowerCase())) return "manager";
  return "unknown";
}

export function classifyEmployment(jobType: string | null | undefined, text = ""): EmploymentType {
  const value = `${jobType ?? ""} ${text}`.toLowerCase();
  if (/intern/.test(value)) return "internship";
  if (/part[_\s-]?time/.test(value)) return "part-time";
  if (/freelance/.test(value)) return "freelance";
  if (/contract|contractor|temporary/.test(value)) return "contract";
  if (/full[_\s-]?time/.test(value)) return "full-time";
  return "unknown";
}

export function isJuniorFriendly(
  seniority: Seniority,
  category: JobCategory,
  title: string,
): boolean {
  if (seniority === "internship" || seniority === "junior") return true;
  if (seniority === "senior" || seniority === "lead" || seniority === "manager") return false;
  const text = title.toLowerCase();
  if (["support", "teaching", "administration"].includes(category)) return true;
  return [
    "customer support",
    "content moderator",
    "virtual assistant",
    "data annotat",
    "ai evaluation",
    "manual qa",
    "sdr",
    "tutor",
    "teacher",
  ].some((needle) => text.includes(needle));
}

export const CATEGORY_LABELS: Record<JobCategory, string> = {
  engineering: "IT i Engineering",
  qa: "QA",
  data: "Data",
  ai: "AI",
  design: "Dizajn",
  product: "Product",
  marketing: "Marketing",
  sales: "Prodaja",
  support: "Korisnička podrška",
  finance: "Finansije",
  hr: "HR",
  writing: "Pisanje",
  teaching: "Podučavanje",
  administration: "Administracija",
  other: "Ostalo",
};

export const SENIORITY_LABELS: Record<Seniority, string> = {
  internship: "Praksa",
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
  manager: "Manager",
  unknown: "Nije navedeno",
};

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Praksa",
  unknown: "Nije navedeno",
};
