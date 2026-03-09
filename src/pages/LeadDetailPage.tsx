import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Mail, Globe, StickyNote, Bell } from "lucide-react";
import { getLeads, saveLead, Lead, LeadStatus } from "@/lib/leads";
import { toast } from "sonner";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
  contacted: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
  converted: "bg-accent/20 text-accent border-accent/30",
};

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [note, setNote] = useState("");
  const [followUp, setFollowUp] = useState("");

  useEffect(() => {
    const found = getLeads().find((l) => l.id === id);
    if (found) {
      setLead(found);
      setFollowUp(found.followUp || "");
    } else {
      navigate("/leads");
    }
  }, [id, navigate]);

  if (!lead) return null;

  const updateStatus = (status: LeadStatus) => {
    const updated = { ...lead, status };
    saveLead(updated);
    setLead(updated);
    toast.success("Status updated");
  };

  const addNote = () => {
    if (!note.trim()) return;
    const updated = { ...lead, notes: lead.notes ? `${lead.notes}\n---\n${note}` : note };
    saveLead(updated);
    setLead(updated);
    setNote("");
    toast.success("Note added");
  };

  const saveFollowUp = () => {
    const updated = { ...lead, followUp };
    saveLead(updated);
    setLead(updated);
    toast.success("Follow-up saved");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/leads")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{lead.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{lead.email}</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{lead.source}</span>
            </div>
          </div>
          <select
            value={lead.status}
            onChange={(e) => updateStatus(e.target.value as LeadStatus)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none ${statusColors[lead.status]}`}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          Created {new Date(lead.createdAt).toLocaleDateString()}
        </div>
      </motion.div>

      {/* Follow-up */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4" /> Follow-up Reminder
        </h3>
        <div className="flex gap-3">
          <input
            type="date"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:outline-none input-glow"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveFollowUp}
            className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm"
          >
            Save
          </motion.button>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-3">
          <StickyNote className="w-4 h-4" /> Notes
        </h3>
        {lead.notes && (
          <div className="mb-4 p-3 rounded-lg bg-muted/30 text-sm text-foreground whitespace-pre-wrap">
            {lead.notes}
          </div>
        )}
        <div className="flex gap-3">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none input-glow"
            onKeyDown={(e) => e.key === "Enter" && addNote()}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addNote}
            className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm"
          >
            Add
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
