import { Moon, Sun, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface TopNavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function TopNavbar({ darkMode, onToggleDark }: TopNavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("crm_auth");
    navigate("/");
  };

  return (
    <header className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-30">
      <h2 className="text-lg font-semibold text-foreground">Mini CRM</h2>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDark}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neon-pink" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  );
}
