import nodemailer, { type Transporter } from "nodemailer";

export interface MailConfig {
  user: string;
  pass: string;
  adminEmail: string;
  fromName: string;
}

export function getMailConfig(): MailConfig | null {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, ""); // Gmail shows App Passwords with spaces
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || user;
  if (!user || !pass || !adminEmail) return null;

  return {
    user,
    pass,
    adminEmail,
    fromName: process.env.MAIL_FROM_NAME?.trim() || "Alif Laam Meem Academy",
  };
}

let transporter: Transporter | null = null;

export function getTransporter(config: MailConfig): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: config.user, pass: config.pass },
    });
  }
  return transporter;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export type SendResult = { ok: true; messageId: string } | { ok: false; error: string };

export async function sendEmail(config: MailConfig, input: SendEmailInput): Promise<SendResult> {
  try {
    const info = await getTransporter(config).sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });
    return { ok: true, messageId: info.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }
}
