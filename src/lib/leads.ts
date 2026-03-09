import { supabase } from "@/integrations/supabase/client";

export type LeadStatus = "new" | "contacted" | "converted";

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: LeadStatus;
  notes: string;
  created_at: string;
  follow_up: string | null;
  updated_at: string;
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Lead | null;
}

export async function createLead(lead: {
  name: string;
  email: string;
  source: string;
  notes?: string;
}): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .insert({ name: lead.name, email: lead.email, source: lead.source, notes: lead.notes || "" })
    .select()
    .single();
  if (error) throw error;
  return data as Lead;
}

export async function updateLead(id: string, updates: Partial<Pick<Lead, "status" | "notes" | "follow_up">>): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Lead;
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
