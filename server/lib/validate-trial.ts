export interface TrialSubmission {
  name: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  ageGroup: string;
  days: string[];
  time: string;
  teacherPreference: string;
  notes: string;
}

export type ValidationResult =
  | { ok: true; data: TrialSubmission }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function strList(value: unknown, maxItems: number, maxLen: number): string[] {
  const list = Array.isArray(value) ? value : typeof value === "string" && value ? [value] : [];
  return list
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function validateTrialSubmission(body: unknown): ValidationResult {
  const input = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const data: TrialSubmission = {
    name: str(input.name, 120),
    email: str(input.email, 254),
    phone: str(input.phone, 40),
    country: str(input.country, 100),
    courseInterest: str(input.courseInterest, 100),
    ageGroup: str(input.ageGroup, 60),
    days: strList(input.days, 7, 20),
    time: str(input.time, 80),
    teacherPreference: str(input.teacherPreference, 40),
    notes: str(input.notes, 2000),
  };

  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!data.email) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone) errors.phone = "WhatsApp number is required.";
  else if (phoneDigits.length < 6) errors.phone = "Please enter a valid WhatsApp number.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
