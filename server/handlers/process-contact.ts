import {
  ADMIN_CONTACT_TEMPLATE,
  STUDENT_CONTACT_TEMPLATE,
  buildContactTemplateValues,
  contactSubjectLabel,
} from "../routes/contact";
import { getMailConfig, sendEmail } from "../lib/mailer";
import { renderTemplateFile } from "../lib/render-template";
import { validateContactSubmission, type ContactSubmission } from "../lib/validate-contact";

function adminPlainText(data: ContactSubmission): string {
  return [
    "New contact message",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country || "-"}`,
    `Subject: ${contactSubjectLabel(data.subject)}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function studentPlainText(data: ContactSubmission): string {
  return [
    `Assalamu Alaikum ${data.name},`,
    "",
    `Thank you for contacting Alif Laam Meem Academy about ${contactSubjectLabel(data.subject)}.`,
    `We have received your message and will reply within 24 hours.`,
    "",
    `WhatsApp: +92 300 6873200`,
    "",
    `JazakAllahu Khairan,`,
    `Alif Laam Meem Academy Team`,
  ].join("\n");
}

export async function processContactSubmission(
  body: unknown,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const validation = validateContactSubmission(body);
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
    return {
      status: 503,
      body: {
        success: false,
        message: "Email service is not configured yet. Please contact us via WhatsApp.",
      },
    };
  }

  const data = validation.data;
  const values = buildContactTemplateValues(data);

  let adminHtml: string;
  let studentHtml: string;
  try {
    [adminHtml, studentHtml] = await Promise.all([
      renderTemplateFile(ADMIN_CONTACT_TEMPLATE, values),
      renderTemplateFile(STUDENT_CONTACT_TEMPLATE, values),
    ]);
  } catch (error) {
    console.error("[contact] Failed to render email templates:", error);
    return {
      status: 500,
      body: { success: false, message: "Could not prepare the email. Please try again." },
    };
  }

  const [adminResult, studentResult] = await Promise.all([
    sendEmail(config, {
      to: config.adminEmail,
      replyTo: data.email,
      subject: `New website message from ${data.name}`,
      html: adminHtml,
      text: adminPlainText(data),
    }),
    sendEmail(config, {
      to: data.email,
      replyTo: config.adminEmail,
      subject: "We received your message – Alif Laam Meem Academy",
      html: studentHtml,
      text: studentPlainText(data),
    }),
  ]);

  if (!adminResult.ok && !studentResult.ok) {
    return {
      status: 502,
      body: {
        success: false,
        message: "We could not send your message right now. Please try again or contact us via WhatsApp.",
      },
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      message: "Thank you! We have received your message and will contact you within 24 hours.",
      adminNotified: adminResult.ok,
      confirmationSent: studentResult.ok,
    },
  };
}
