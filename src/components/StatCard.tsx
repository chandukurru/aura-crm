import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: "purple" | "cyan" | "pink" | "accent";
}

const colorMap = {
  purple: "from-neon-purple/20 to-neon-purple/5 border-neon-purple/20",
  cyan: "from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/20",
  pink: "from-neon-pink/20 to-neon-pink/5 border-neon-pink/20",
  accent: "from-accent/20 to-accent/5 border-accent/20",
};

const iconColorMap = {
  purple: "text-neon-purple",
  cyan: "text-neon-cyan",
  pink: "text-neon-pink",
  accent: "text-accent",
};

export default function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      className={`glass-card bg-gradient-to-br ${colorMap[color]} p-6 cursor-default transition-shadow duration-300 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
          {trend && (
            <p className="text-xs mt-2 text-accent font-medium">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-background/50 ${iconColorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
