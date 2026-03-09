import { motion } from "framer-motion";
import { Moon, Sun, Zap } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold text-foreground">
        Settings
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">LeadFlow CRM</h2>
            <p className="text-sm text-muted-foreground">v1.0.0 — Demo Mode</p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4">
          <p className="text-sm text-muted-foreground">
            This is a frontend demo CRM. Data is stored in your browser's local storage.
            Use the dark/light mode toggle in the top navbar to switch themes.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Sun className="w-4 h-4" />
          <span>Toggle theme from the top navbar</span>
          <Moon className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
}
