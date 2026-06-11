"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/UI/GlassCard";

const threatRegions = [
  { id: 1, x: 15, y: 25, severity: "low", label: "EU-Central", count: 12 },
  { id: 2, x: 25, y: 15, severity: "low", label: "EU-West", count: 8 },
  { id: 3, x: 55, y: 30, severity: "medium", label: "US-East", count: 64 },
  { id: 4, x: 75, y: 20, severity: "medium", label: "US-West", count: 42 },
  { id: 5, x: 65, y: 55, severity: "high", label: "Unknown", count: 15 },
  { id: 6, x: 35, y: 60, severity: "medium", label: "LATAM", count: 28 },
  { id: 7, x: 80, y: 65, severity: "low", label: "APAC", count: 18 },
  { id: 8, x: 45, y: 45, severity: "high", label: "Central", count: 35 },
];

const severityConfig = {
  low: { color: "#00ff9d", size: "w-3 h-3", pulse: "bg-cyber-green/30" },
  medium: { color: "#ffa500", size: "w-4 h-4", pulse: "bg-amber-500/30" },
  high: { color: "#ff3366", size: "w-5 h-5", pulse: "bg-red-500/30" },
};

export function AdvancedThreatMap() {
  return (
    <GlassCard title="Global Threat Map (Live)" glow="magenta">
      <div className="relative aspect-video rounded border border-cyber-border bg-gradient-to-b from-black/70 to-black/50 overflow-hidden">
        {/* Grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#00ff9d"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Threat indicators with animations */}
        {threatRegions.map((threat) => (
          <motion.div
            key={threat.id}
            className="absolute group"
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulsing background glow */}
            <motion.div
              className={`absolute rounded-full ${severityConfig[threat.severity as keyof typeof severityConfig].pulse}`}
              style={{
                width: "3rem",
                height: "3rem",
                left: "-1.5rem",
                top: "-1.5rem",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2 + threat.id * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Threat indicator dot */}
            <motion.div
              className={`${severityConfig[threat.severity as keyof typeof severityConfig].size} rounded-full cursor-pointer transition-all`}
              style={{
                backgroundColor:
                  severityConfig[threat.severity as keyof typeof severityConfig]
                    .color,
                boxShadow: `0 0 12px ${severityConfig[threat.severity as keyof typeof severityConfig].color}`,
              }}
              whileHover={{ scale: 1.4 }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5 + threat.id * 0.05,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Tooltip on hover */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 1, y: -5 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded border border-cyber-green/50 bg-black/90 px-2 py-1 whitespace-nowrap z-20 pointer-events-none"
            >
              <p className="font-mono text-xs text-cyber-cyan font-bold">
                {threat.label}
              </p>
              <p className="font-mono text-[10px] text-gray-400">
                {threat.count} events
              </p>
            </motion.div>
          </motion.div>
        ))}

        {/* Status text */}
        <motion.div
          className="absolute bottom-3 left-3 font-mono text-[10px] text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          GLOBAL_IOC_FEED
        </motion.div>

        {/* Live indicator */}
        <div className="absolute top-3 right-3">
          <motion.div
            className="flex items-center gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-cyber-green" />
            <span className="font-mono text-[10px] text-cyber-green">LIVE</span>
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {Object.entries(severityConfig).map(([severity, config]) => (
          <motion.div
            key={severity}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div
              className={`${config.size} rounded-full`}
              style={{
                backgroundColor: config.color,
                boxShadow: `0 0 8px ${config.color}`,
              }}
            />
            <span className="font-mono text-xs text-gray-400 capitalize">
              {severity} severity
            </span>
          </motion.div>
        ))}
      </div>

      {/* Stats summary */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-cyber-border/30 pt-4">
        <motion.div
          className="rounded border border-cyber-border/50 bg-black/30 p-2"
          whileHover={{ backgroundColor: "rgba(0, 255, 136, 0.05)" }}
        >
          <p className="font-mono text-[10px] text-gray-500">Total Threats</p>
          <p className="font-mono text-sm font-bold text-cyber-green">
            {threatRegions.reduce((sum, t) => sum + t.count, 0)}
          </p>
        </motion.div>
        <motion.div
          className="rounded border border-cyber-border/50 bg-black/30 p-2"
          whileHover={{ backgroundColor: "rgba(255, 165, 0, 0.05)" }}
        >
          <p className="font-mono text-[10px] text-gray-500">Active Regions</p>
          <p className="font-mono text-sm font-bold text-amber-500">
            {threatRegions.length}
          </p>
        </motion.div>
        <motion.div
          className="rounded border border-cyber-border/50 bg-black/30 p-2"
          whileHover={{ backgroundColor: "rgba(255, 51, 102, 0.05)" }}
        >
          <p className="font-mono text-[10px] text-gray-500">Critical</p>
          <p className="font-mono text-sm font-bold text-red-500">
            {threatRegions.filter((t) => t.severity === "high").length}
          </p>
        </motion.div>
      </div>
    </GlassCard>
  );
}
