import { Router } from "express";
import { processTrialSubmission } from "../handlers/process-trial";
import { multilineHtml } from "../lib/render-template";
import type { TrialSubmission } from "../lib/validate-trial";

export const ADMIN_TEMPLATE = "admin-trial-notification.html";
export const STUDENT_TEMPLATE = "student-trial-confirmation.html";

/** Map form field names → template placeholder names. */
export function buildTemplateValues(data: TrialSubmission) {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    phone_digits: data.phone.replace(/\D/g, ""),
    country: data.country || "Not specified",
    course: data.courseInterest || "Not specified",
    age_group: data.ageGroup || "Not specified",
    preferred_days: data.days.length ? data.days.join(", ") : "Any day",
    preferred_time: data.time || "Flexible",
    teacher_preference: data.teacherPreference || "Any",
    // Empty notes → the {{#if message}} block in the admin template is removed entirely.
    message: data.notes ? multilineHtml(data.notes) : "",
  };
}

export const trialRouter = Router();

trialRouter.post("/", async (req, res) => {
  const result = await processTrialSubmission(req.body);
  res.status(result.status).json(result.body);
});
