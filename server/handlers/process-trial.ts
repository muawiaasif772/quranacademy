import { buildTemplateValues, ADMIN_TEMPLATE, STUDENT_TEMPLATE } from "../routes/trial";
import { getMailConfig, sendEmail } from "../lib/mailer";
import { renderTemplateFile } from "../lib/render-template";
import { validateTrialSubmission, type TrialSubmission } from "../lib/validate-trial";

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

export async function processTrialSubmission(
  body: unknown,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const validation = validateTrialSubmission(body);
  if (validation.ok === false) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Please check the highlighted fields and try again.",
        errors: validation.errors,
      },
    };
  }

  const config = getMailConfig();
  if (!config) {
    console.error("[trial] SMTP_USER / SMTP_PASS / ADMIN_EMAIL are not configured.");
    return {
      status: 503,
      body: {
        success: false,
        message: "Email service is not configured yet. Please contact us via WhatsApp.",
      },
    };
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
    return {
      status: 500,
      body: { success: false, message: "Could not prepare the email. Please try again." },
    };
  }

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
    return {
      status: 502,
      body: {
        success: false,
        message: "We could not send your request right now. Please try again or contact us via WhatsApp.",
      },
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      message: "Thank you! We have received your request and will contact you within 24 hours.",
      adminNotified: adminResult.ok,
      confirmationSent: studentResult.ok,
    },
  };
}
