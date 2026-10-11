import { Router } from "express";
import { getMailConfig, sendEmail } from "../lib/mailer";
import { multilineHtml, renderTemplateFile } from "../lib/render-template";
import { validateTrialSubmission, type TrialSubmission } from "../lib/validate-trial";

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

function adminPlainText(data: TrialSubmission): string {
  const lines = [
    `New free trial request`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.phone}`,
    `Country: ${data.country || "-"}`,
    `Course: ${data.courseInterest || "-"}`,
    `Age group: ${data.ageGroup || "-"}`,
    `Preferred days: ${data.days.join(", ") || "-"}`,
    `Preferred time: ${data.time || "-"}`,
    `Teacher preference: ${data.teacherPreference || "-"}`,
  ];
  if (data.notes) lines.push(``, `Notes:`, data.notes);
  return lines.join("\n");
}

function studentPlainText(data: TrialSubmission): string {
  return [
    `Assalamu Alaikum ${data.name},`,
    ``,
    `Thank you for registering for a free trial with Alif Laam Meem Academy.`,
    `We have received your request and our team will contact you within 24 hours.`,
    ``,
    `Need help sooner? WhatsApp: +92 0300 6873200`,
    ``,
    `JazakAllahu Khairan,`,
    `Alif Laam Meem Academy Team`,
  ].join("\n");
}

export const trialRouter = Router();

trialRouter.post("/", async (req, res) => {
  const validation = validateTrialSubmission(req.body);
  if (validation.ok === false) {
    res.status(400).json({
      success: false,
      message: "Please check the highlighted fields and try again.",
      errors: validation.errors,
    });
    return;
  }

  const config = getMailConfig();
  if (!config) {
    console.error("[trial] SMTP_USER / SMTP_PASS / ADMIN_EMAIL are not configured.");
    res.status(503).json({
      success: false,
      message: "Email service is not configured yet. Please contact us via WhatsApp.",
    });
    return;
  }

  const data = validation.data;
  const values = buildTemplateValues(data);

  let adminHtml: string;
  let studentHtml: string;
  try {
    [adminHtml, studentHtml] = await Promise.all([
      renderTemplateFile(ADMIN_TEMPLATE, values),
      renderTemplateFile(STUDENT_TEMPLATE, values),
    ]);
  } catch (error) {
    console.error("[trial] Failed to render email templates:", error);
    res.status(500).json({ success: false, message: "Could not prepare the email. Please try again." });
    return;
  }

  // Each email is sent independently; one failing never prevents the other.
  const [adminResult, studentResult] = await Promise.all([
    sendEmail(config, {
      to: config.adminEmail,
      replyTo: data.email,
      subject: `New free trial request from ${data.name}`,
      html: adminHtml,
      text: adminPlainText(data),
    }),
    sendEmail(config, {
      to: data.email,
      replyTo: config.adminEmail,
      subject: "We received your free trial request – Alif Laam Meem Academy",
      html: studentHtml,
      text: studentPlainText(data),
    }),
  ]);

  if (adminResult.ok === false) console.error("[trial] Admin notification failed:", adminResult.error);
  if (studentResult.ok === false) console.error("[trial] Student confirmation failed:", studentResult.error);

  if (!adminResult.ok && !studentResult.ok) {
    res.status(502).json({
      success: false,
      message: "We could not send your request right now. Please try again or contact us via WhatsApp.",
    });
    return;
  }

  res.json({
    success: true,
    message: "Thank you! We have received your request and will contact you within 24 hours.",
    adminNotified: adminResult.ok,
    confirmationSent: studentResult.ok,
  });
});
