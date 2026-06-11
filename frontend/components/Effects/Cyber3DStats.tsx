"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CyberStatProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  variant: "green" | "cyan" | "amber";
}

const colorMap = {
  green: {
    border: "border-cyber-green/40",
    text: "text-cyber-green",
    glow: "shadow-[0_0_15px_rgba(0,255,157,0.4)]",
  },
  cyan: {
    border: "border-cyber-cyan/40",
    text: "text-cyber-cyan",
    glow: "shadow-[0_0_15px_rgba(0,255,255,0.4)]",
  },
  amber: {
    border: "border-cyber-amber/40",
    text: "text-cyber-amber",
    glow: "shadow-[0_0_15px_rgba(255,165,0,0.4)]",
  },
};

function CyberStat({ label, value, unit, icon, variant }: CyberStatProps) {
  const colors = colorMap[variant];
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const numValue =
      typeof value === "number" ? value : parseInt(value as string);
    if (!isNaN(numValue)) {
      const interval = setInterval(() => {
        setAnimatedValue((prev) => {
          const next = prev + numValue / 50;
          return next >= numValue ? numValue : next;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [value]);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className={`group relative overflow-hidden rounded-lg border ${colors.border} ${colors.glow} bg-gradient-to-br from-black/80 to-black/50 p-4 backdrop-blur-md transition-all`}
    >
      {/* Animated background bars */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-0.5 w-1/4 ${colors.text.replace("text-", "bg-")}`}
            animate={{
              x: ["-100%", "500%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{ top: `${(i + 1) * 25}%` }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              {label}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span
                className={`font-display text-3xl font-bold ${colors.text}`}
              >
                {typeof animatedValue === "number"
                  ? Math.floor(animatedValue)
                  : value}
              </span>
              {unit && <span className="text-xs text-gray-600">{unit}</span>}
            </div>
          </div>
          <span className="text-2xl">{icon}</span>
        </div>

        {/* Scan line effect */}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 w-full ${colors.text.replace("text-", "bg-")}`}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
}

interface Cyber3DStatsProps {
  stats: CyberStatProps[];
}

export function Cyber3DStats({ stats }: Cyber3DStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <CyberStat key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}
