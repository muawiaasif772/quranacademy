
import { Lead } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Free-trial form → our own Express/Nodemailer API (server/routes/trial.ts)
// ─────────────────────────────────────────────────────────────────────────────
export interface TrialFormPayload {
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

export interface TrialSubmitResult {
  success: boolean;
  message: string;
  /** Per-field validation errors returned by the server (HTTP 400). */
  errors?: Record<string, string>;
  adminNotified?: boolean;
  confirmationSent?: boolean;
}

const GENERIC_TRIAL_ERROR =
  'Something went wrong. Please try again or contact us via WhatsApp.';

export const submitTrial = async (payload: TrialFormPayload): Promise<TrialSubmitResult> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch('/api/trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const result = (await response.json().catch(() => null)) as TrialSubmitResult | null;

    if (!response.ok || !result?.success) {
      return {
        success: false,
        message: result?.message || GENERIC_TRIAL_ERROR,
        errors: result?.errors,
      };
    }

    return result;
  } catch (error) {
    console.error('Trial submission error:', error);
    return { success: false, message: GENERIC_TRIAL_ERROR };
  } finally {
    window.clearTimeout(timeout);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Contact form → still uses FormSubmit (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const FORM_RECIPIENT = 'muawiaasif772@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_RECIPIENT}`;

export const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 45000);

  try {
    const formData = new FormData();
    const isTrial = leadData.type === 'trial';

    formData.append('_subject', isTrial
      ? `New free trial request from ${leadData.name}`
      : `New website message from ${leadData.name}`);
    formData.append('_template', 'box');
    formData.append('_captcha', 'false');
    formData.append('_replyto', leadData.email);
    formData.append('Form type', isTrial ? 'Trial registration' : 'Contact message');
    formData.append('Name', leadData.name);
    formData.append('Email', leadData.email);
    formData.append('WhatsApp number', leadData.phone);
    formData.append('Country', leadData.country);

    if (leadData.courseInterest) formData.append('Course', leadData.courseInterest);
    if (leadData.ageGroup) formData.append('Age group', leadData.ageGroup);
    if (leadData.preferredDays?.length) {
      formData.append('Preferred days', leadData.preferredDays.join(', '));
    }
    if (leadData.preferredTime) formData.append('Preferred time', leadData.preferredTime);
    if (leadData.teacherPreference) {
      formData.append('Teacher preference', leadData.teacherPreference);
    }
    if (leadData.message) formData.append('Message / notes', leadData.message);

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false || result?.success === 'false') {
      throw new Error(result?.message || `Form submission failed (${response.status})`);
    }

    return { 
      success: true, 
      message: 'Thank you! We have received your request and will contact you within 24 hours.' 
    };
  } catch (error) {
    console.error('Submission error:', error);
    return { success: false, message: 'Something went wrong. Please try again or contact us via WhatsApp.' };
  } finally {
    window.clearTimeout(timeout);
  }
};
