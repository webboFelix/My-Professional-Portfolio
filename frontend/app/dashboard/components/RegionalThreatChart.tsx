"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/UI/GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const regionalData = [
  { region: "EU-West", threats: 42, blocked: 40, malware: 8, ddos: 15 },
  { region: "US-East", threats: 128, blocked: 122, malware: 32, ddos: 48 },
  { region: "APAC", threats: 67, blocked: 63, malware: 18, ddos: 22 },
  { region: "Unknown", threats: 15, blocked: 12, malware: 5, ddos: 3 },
];

const severityColors = {
  0: "#00ff9d", // green - low
  1: "#ffa500", // amber - medium
  2: "#ff3366", // red - high
};

const getThreatLevel = (count: number) => {
  if (count < 50) return 0;
  if (count < 100) return 1;
  return 2;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-cyber-green/50 bg-black/80 p-3">
        <p className="font-mono text-xs font-bold text-cyber-cyan">
          {payload[0].payload.region}
        </p>
        {payload.map((entry: any, i: number) => (
          <p
            key={i}
            className="font-mono text-xs"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RegionalThreatChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <GlassCard title="Regional Threat Distribution" glow="green">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={regionalData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3366" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ff3366" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#00ff9d" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 255, 136, 0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="region"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: "#1a3a2e" }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: "#1a3a2e" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "10px", color: "#6b7280" }}
              iconType="square"
            />
            <Bar
              dataKey="threats"
              fill="url(#threatGradient)"
              name="Threats Detected"
            />
            <Bar
              dataKey="blocked"
              fill="url(#blockedGradient)"
              name="Threats Blocked"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {regionalData.map((region) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded border border-cyber-border/50 bg-black/30 p-3"
            >
              <p className="font-mono text-xs font-bold text-cyber-cyan">
                {region.region}
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Threats:</span>
                  <span
                    className="font-mono text-[10px] font-bold"
                    style={{
                      color:
                        severityColors[
                          getThreatLevel(
                            region.threats,
                          ) as keyof typeof severityColors
                        ],
                    }}
                  >
                    {region.threats}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Success:</span>
                  <span className="font-mono text-[10px] font-bold text-cyber-green">
                    {((region.blocked / region.threats) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
