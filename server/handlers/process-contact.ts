import { escapeHtml, multilineHtml } from "../lib/render-template";
import { getMailConfig, sendEmail } from "../lib/mailer";
import { validateContactSubmission } from "../lib/validate-contact";

function adminHtml(data: import("../lib/validate-contact").ContactSubmission): string {
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#1e293b">
    <h2 style="color:#0a2e18">New contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Country:</strong> ${escapeHtml(data.country || "—")}</p>
    <p><strong>Message:</strong><br/>${multilineHtml(data.message).html}</p>
  </body></html>`;
}

function adminPlainText(data: import("../lib/validate-contact").ContactSubmission): string {
  return [
    "New contact message",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country || "-"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function studentHtml(name: string): string {
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#1e293b">
    <p>Assalamu Alaikum ${escapeHtml(name)},</p>
    <p>Thank you for contacting <strong>Alif Laam Meem Academy</strong>. We have received your message and will reply within 24 hours.</p>
    <p>WhatsApp: +92 0300 6873200</p>
    <p>JazakAllahu Khairan,<br/>Alif Laam Meem Academy Team</p>
  </body></html>`;
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

  const [adminResult, studentResult] = await Promise.all([
    sendEmail(config, {
      to: config.adminEmail,
      replyTo: data.email,
      subject: `New website message from ${data.name}`,
      html: adminHtml(data),
      text: adminPlainText(data),
    }),
    sendEmail(config, {
      to: data.email,
      replyTo: config.adminEmail,
      subject: "We received your message – Alif Laam Meem Academy",
      html: studentHtml(data.name),
      text: `Assalamu Alaikum ${data.name},\n\nThank you for contacting Alif Laam Meem Academy. We will reply within 24 hours.\n\nJazakAllahu Khairan,\nAlif Laam Meem Academy Team`,
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
