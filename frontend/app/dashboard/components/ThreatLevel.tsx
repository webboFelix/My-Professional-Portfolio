"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/UI/GlassCard";

const threatLevels = [
  { level: "SECURE", percentage: 0, color: "#00ff9d", status: "operational" },
  { level: "LOW", percentage: 15, color: "#00ff9d", status: "operational" },
  { level: "MEDIUM", percentage: 45, color: "#ffa500", status: "elevated" },
  { level: "HIGH", percentage: 75, color: "#ff6b35", status: "urgent" },
  { level: "CRITICAL", percentage: 100, color: "#ff3366", status: "critical" },
];

const currentThreatLevel = 35; // percentage

export function ThreatLevel() {
  const threatData =
    threatLevels.find((t) => currentThreatLevel <= t.percentage) ||
    threatLevels[threatLevels.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <GlassCard title="Threat Level" glow="red">
        {/* Circular threat gauge */}
        <div className="flex flex-col items-center gap-6 py-4">
          {/* SVG Gauge */}
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#1a3a2e"
                strokeWidth="8"
              />

              {/* Threat level arc - animated */}
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                strokeWidth="8"
                strokeDasharray={`${(currentThreatLevel / 100) * (Math.PI * 2 * 90)} ${Math.PI * 2 * 90}`}
                strokeDashoffset={Math.PI * 2 * 90}
                stroke={threatData.color}
                strokeLinecap="round"
                animate={{
                  strokeDashoffset:
                    Math.PI * 2 * 90 -
                    (currentThreatLevel / 100) * (Math.PI * 2 * 90),
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  filter: `drop-shadow(0 0 8px ${threatData.color})`,
                }}
              />

              {/* Segments */}
              {threatLevels.map((threat, index) => {
                const angle = (index / threatLevels.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 100 + 90 * Math.cos(rad - Math.PI / 2);
                const y = 100 + 90 * Math.sin(rad - Math.PI / 2);

                return (
                  <g key={threat.level}>
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill={threat.color}
                      opacity="0.6"
                    />
                  </g>
                );
              })}

              {/* Center text */}
              <text
                x="100"
                y="95"
                textAnchor="middle"
                className="font-mono text-2xl font-bold"
                fill={threatData.color}
                style={{ filter: `drop-shadow(0 0 4px ${threatData.color})` }}
              >
                {currentThreatLevel}%
              </text>
              <text
                x="100"
                y="115"
                textAnchor="middle"
                className="font-mono text-xs"
                fill="#6b7280"
              >
                {threatData.level}
              </text>
            </svg>

            {/* Glowing background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: `inset 0 0 20px ${threatData.color}40, 0 0 20px ${threatData.color}40`,
              }}
            />
          </div>

          {/* Status and details */}
          <div className="w-full space-y-3">
            <motion.div
              className="rounded border border-cyber-border/50 bg-black/30 p-3"
              animate={{
                borderColor: `${threatData.color}40`,
                backgroundColor: `${threatData.color}08`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-500">STATUS</span>
                <motion.span
                  className="font-mono text-xs font-bold"
                  style={{ color: threatData.color }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {threatData.status.toUpperCase()}
                </motion.span>
              </div>
            </motion.div>

            {/* Threat level breakdown */}
            <div className="space-y-2">
              {threatLevels.map((threat) => (
                <motion.div
                  key={threat.level}
                  className="flex items-center gap-2"
                  animate={{
                    opacity: currentThreatLevel <= threat.percentage ? 1 : 0.3,
                  }}
                >
                  <div
                    className="w-8 h-1 rounded-full"
                    style={{
                      backgroundColor: threat.color,
                      width: `${threat.percentage * 0.8}px`,
                    }}
                  />
                  <span className="font-mono text-[10px] text-gray-400 w-14">
                    {threat.level}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-2 gap-2 border-t border-cyber-border/30 pt-3">
              <motion.div
                whileHover={{ backgroundColor: "rgba(0, 255, 136, 0.05)" }}
              >
                <p className="font-mono text-[10px] text-gray-500">
                  Incidents/h
                </p>
                <p className="font-mono text-sm font-bold text-cyber-green">
                  12
                </p>
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: "rgba(255, 51, 102, 0.05)" }}
              >
                <p className="font-mono text-[10px] text-gray-500">
                  Unresolved
                </p>
                <p className="font-mono text-sm font-bold text-red-500">3</p>
              </motion.div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
