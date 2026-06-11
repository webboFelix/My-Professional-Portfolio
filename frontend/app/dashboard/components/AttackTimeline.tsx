"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/UI/GlassCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timelineData = [
  { time: "00:00", threats: 24, blocked: 22 },
  { time: "04:00", threats: 42, blocked: 38 },
  { time: "08:00", threats: 156, blocked: 148 },
  { time: "12:00", threats: 89, blocked: 85 },
  { time: "16:00", threats: 203, blocked: 198 },
  { time: "20:00", threats: 127, blocked: 122 },
  { time: "23:59", threats: 98, blocked: 94 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-cyber-green/50 bg-black/80 p-2">
        <p className="font-mono text-xs text-cyber-green">
          {payload[0].payload.time}
        </p>
        <p className="font-mono text-xs text-cyber-cyan">
          Threats: {payload[0].value}
        </p>
        {payload[1] && (
          <p className="font-mono text-xs text-cyber-amber">
            Blocked: {payload[1].value}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function AttackTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <GlassCard title="Attack Timeline (24h)" glow="cyan">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={timelineData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="attackGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3366" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff3366" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="blockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00ff9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 255, 136, 0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
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
            <Area
              type="monotone"
              dataKey="threats"
              stroke="#ff3366"
              strokeWidth={2}
              fill="url(#attackGradient)"
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="blocked"
              stroke="#00ff9d"
              strokeWidth={2}
              fill="url(#blockGradient)"
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-4 rounded-full bg-red-500" />
            <span className="text-gray-400">Threats Detected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-4 rounded-full bg-cyber-green" />
            <span className="text-gray-400">Threats Blocked</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
