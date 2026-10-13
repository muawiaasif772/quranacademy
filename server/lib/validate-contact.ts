export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function validateContactSubmission(body: unknown): ContactValidationResult {
  const input = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const data: ContactSubmission = {
    name: str(input.name, 120),
    email: str(input.email, 254),
    phone: str(input.phone, 40),
    country: str(input.country, 100),
    subject: str(input.subject, 120),
    message: str(input.message, 5000),
  };

  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!data.email) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";

  if (!data.country) errors.country = "Please select your country.";

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone) errors.phone = "Phone or WhatsApp number is required.";
  else if (phoneDigits.length < 8) errors.phone = "Please enter a valid phone number with country code.";

  const allowedSubjects = ["trial", "pricing", "tutors", "technical", "other"];
  if (!data.subject) errors.subject = "Please select a subject.";
  else if (!allowedSubjects.includes(data.subject)) errors.subject = "Please choose a valid subject.";

  if (data.message.length < 10) errors.message = "Please enter a message (at least 10 characters).";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
