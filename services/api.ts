
import { Lead } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Free-trial form → POST /api/trial (Express in dev, Netlify Function in prod)
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

async function postJson<T>(url: string, payload: unknown): Promise<{ ok: boolean; status: number; data: T | null }> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as T | null;
    return { ok: response.ok, status: response.status, data };
  } finally {
    window.clearTimeout(timeout);
  }
}

export const submitTrial = async (payload: TrialFormPayload): Promise<TrialSubmitResult> => {
  try {
    const { ok, data: result } = await postJson<TrialSubmitResult>('/api/trial', payload);

    if (!ok || !result?.success) {
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
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Contact form → POST /api/contact (same backend as trial)
// ─────────────────────────────────────────────────────────────────────────────
export interface ContactSubmitResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const GENERIC_CONTACT_ERROR =
  'Something went wrong. Please try again or contact us via WhatsApp.';

export const submitLead = async (
  leadData: Omit<Lead, 'id' | 'createdAt'> & { subject?: string },
): Promise<{ success: boolean; message: string; errors?: Record<string, string> }> => {
  if (leadData.type !== 'contact') {
    return submitTrial({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      courseInterest: leadData.courseInterest || '',
      ageGroup: leadData.ageGroup || '',
      days: leadData.preferredDays || [],
      time: leadData.preferredTime || '',
      teacherPreference: leadData.teacherPreference || '',
      notes: leadData.message || '',
    });
  }

  try {
    const { ok, data: result } = await postJson<ContactSubmitResult>('/api/contact', {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      subject: leadData.subject || '',
      message: leadData.message || '',
    });

    if (!ok || !result?.success) {
      return {
        success: false,
        message: result?.message || GENERIC_CONTACT_ERROR,
        errors: result?.errors,
      };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { success: false, message: GENERIC_CONTACT_ERROR };
  }
};
