-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'Website',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
  notes TEXT DEFAULT '',
  follow_up DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users full access for this CRM
CREATE POLICY "Authenticated users can view leads"
  ON public.leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert leads"
  ON public.leads FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads"
  ON public.leads FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete leads"
  ON public.leads FOR DELETE TO authenticated USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert seed data
INSERT INTO public.leads (name, email, source, status, notes, follow_up, created_at) VALUES
  ('Alice Johnson', 'alice@example.com', 'Website', 'new', 'Interested in premium plan', '2026-03-15', '2026-03-01T10:00:00Z'),
  ('Bob Smith', 'bob@startup.io', 'LinkedIn', 'contacted', 'Scheduled demo call', '2026-03-10', '2026-02-28T14:30:00Z'),
  ('Carol Davis', 'carol@agency.com', 'Referral', 'converted', 'Signed annual contract', NULL, '2026-02-25T09:00:00Z'),
  ('Dan Wilson', 'dan@corp.com', 'Google Ads', 'new', '', NULL, '2026-03-05T16:00:00Z'),
  ('Eva Martinez', 'eva@design.co', 'Website', 'contacted', 'Follow up next week', '2026-03-12', '2026-03-03T11:00:00Z'),
  ('Frank Lee', 'frank@tech.io', 'LinkedIn', 'new', 'Wants enterprise pricing', NULL, '2026-03-07T08:00:00Z'),
  ('Grace Chen', 'grace@media.com', 'Website', 'converted', 'Onboarded successfully', NULL, '2026-02-20T13:00:00Z'),
  ('Henry Park', 'henry@retail.com', 'Referral', 'contacted', 'Reviewing proposal', '2026-03-14', '2026-03-04T15:00:00Z');