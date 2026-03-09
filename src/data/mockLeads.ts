import { Lead, LeadStatus } from "@/lib/leads";

export type { Lead, LeadStatus };

export const MOCK_LEADS: Lead[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", source: "Website", status: "new", notes: "Interested in premium plan", createdAt: "2026-03-01T10:00:00Z", followUp: "2026-03-15" },
  { id: "2", name: "Bob Smith", email: "bob@startup.io", source: "LinkedIn", status: "contacted", notes: "Scheduled demo call", createdAt: "2026-02-28T14:30:00Z", followUp: "2026-03-10" },
  { id: "3", name: "Carol Davis", email: "carol@agency.com", source: "Referral", status: "converted", notes: "Signed annual contract", createdAt: "2026-02-25T09:00:00Z" },
  { id: "4", name: "Dan Wilson", email: "dan@corp.com", source: "Google Ads", status: "new", notes: "", createdAt: "2026-03-05T16:00:00Z" },
  { id: "5", name: "Eva Martinez", email: "eva@design.co", source: "Website", status: "contacted", notes: "Follow up next week", createdAt: "2026-03-03T11:00:00Z", followUp: "2026-03-12" },
  { id: "6", name: "Frank Lee", email: "frank@tech.io", source: "LinkedIn", status: "new", notes: "Wants enterprise pricing", createdAt: "2026-03-07T08:00:00Z" },
  { id: "7", name: "Grace Chen", email: "grace@media.com", source: "Website", status: "converted", notes: "Onboarded successfully", createdAt: "2026-02-20T13:00:00Z" },
  { id: "8", name: "Henry Park", email: "henry@retail.com", source: "Referral", status: "contacted", notes: "Reviewing proposal", createdAt: "2026-03-04T15:00:00Z", followUp: "2026-03-14" },
];
