export type LeadStatus = "new" | "contacted" | "converted";

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  followUp?: string;
}

const STORAGE_KEY = "crm_leads";

export function getLeads(): Lead[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return [];
}

export function initLeads(defaults: Lead[]) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  }
}

export function saveLead(lead: Lead) {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === lead.id);
  if (idx >= 0) leads[idx] = lead;
  else leads.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function deleteLead(id: string) {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}
