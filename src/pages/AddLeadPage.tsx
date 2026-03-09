import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { saveLead, Lead } from "@/lib/leads";
import { toast } from "sonner";

export default function AddLeadPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", source: "Website", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and Email are required");
      return;
    }
    const lead: Lead = {
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      source: form.source,
      status: "new",
      notes: form.notes,
      createdAt: new Date().toISOString(),
    };
    saveLead(lead);
    toast.success("Lead added!");
    navigate("/leads");
  };

  return (
    <div className="max-w-lg mx-auto">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold text-foreground mb-6">
        Add New Lead
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-card p-6 space-y-4"
      >
        {[
          { label: "Name", key: "name", type: "text", placeholder: "Full name" },
          { label: "Email", key: "email", type: "email", placeholder: "email@example.com" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">{f.label}</label>
            <input
              type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none input-glow text-sm"
            />
          </div>
        ))}

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Source</label>
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:outline-none input-glow"
          >
            <option>Website</option>
            <option>LinkedIn</option>
            <option>Google Ads</option>
            <option>Referral</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            placeholder="Any notes..."
            className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none input-glow text-sm resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm"
          >
            Add Lead
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/leads")}
            className="px-6 py-2.5 rounded-lg bg-muted text-muted-foreground font-medium text-sm"
          >
            Cancel
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
