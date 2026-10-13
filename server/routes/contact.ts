import type { ContactSubmission } from "../lib/validate-contact";
import { multilineHtml } from "../lib/render-template";

export const ADMIN_CONTACT_TEMPLATE = "admin-contact-notification.html";
export const STUDENT_CONTACT_TEMPLATE = "student-contact-confirmation.html";

const SUBJECT_LABELS: Record<string, string> = {
  trial: "Book a Free Trial",
  pricing: "Pricing & Plans",
  tutors: "Tutor Information",
  technical: "Technical Support",
  other: "Other Inquiry",
};

export function contactSubjectLabel(subject: string): string {
  return SUBJECT_LABELS[subject] ?? subject;
}

export function buildContactTemplateValues(data: ContactSubmission) {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    phone_digits: data.phone.replace(/\D/g, ""),
    country: data.country || "Not specified",
    subject: contactSubjectLabel(data.subject),
    message: multilineHtml(data.message),
  };
}
