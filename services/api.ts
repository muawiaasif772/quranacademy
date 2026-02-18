
import { Lead } from '../types';

// In-memory store for leads (will reset on page refresh)
const leads: Lead[] = [];

export const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    
    leads.push(newLead);
    console.log('Lead submitted successfully:', newLead);
    
    // NOTE: To connect Google Sheets, you would replace this with a call to:
    // fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', { method: 'POST', body: JSON.stringify(newLead) });
    
    return { 
      success: true, 
      message: 'Thank you! We have received your request and will contact you within 24 hours.' 
    };
  } catch (error) {
    console.error('Submission error:', error);
    return { success: false, message: 'Something went wrong. Please try again or contact us via WhatsApp.' };
  }
};

export const getLeads = () => leads;
