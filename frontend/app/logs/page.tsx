"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  source: string;
  message: string;
}

const logSources = [
  "firewall",
  "ids",
  "auth",
  "siem",
  "honeypot",
  "waf",
  "endpoint",
  "dns",
  "vpn",
  "proxy",
];

const logMessages = [
  "Inbound scan blocked from {ip}",
  "Suspicious User-Agent detected on /api/admin",
  "Session validated for analyst-node-01",
  "Brute force attempt on SSH port 22 — mitigated",
  "Decoy service triggered — payload captured",
  "SQL injection pattern blocked — rule OWASP-942",
  "EDR heartbeat OK — {count} agents online",
  "DNS tunneling check — no anomalies",
  "Certificate validation passed for api.internal",
  "Failed login attempt from {ip} (3/10 retries)",
  "Malware signature match in quarantine",
  "Network segment isolation triggered",
  "Privilege escalation attempt detected",
  "Traffic anomaly detected on subnet-{subnet}",
  "Compliance scan completed — {status}",
];

const levelStyle: Record<string, string> = {
  INFO: "text-cyber-green",
  WARN: "text-cyber-amber",
  ERROR: "text-cyber-red",
  CRITICAL: "text-red-500",
};

const levelBgStyle: Record<string, string> = {
  INFO: "bg-cyber-green/5 border-cyber-green/20",
  WARN: "bg-amber-500/5 border-amber-500/20",
  ERROR: "bg-red-500/5 border-red-500/20",
  CRITICAL: "bg-red-600/5 border-red-600/30",
};

function generateRandomIP() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function generateRandomCount() {
  return Math.floor(Math.random() * 50) + 5;
}

function generateRandomSubnet() {
  return Math.floor(Math.random() * 256);
}

function generateLogMessage() {
  const template = logMessages[Math.floor(Math.random() * logMessages.length)];
  return template
    .replace("{ip}", generateRandomIP())
    .replace("{count}", generateRandomCount().toString())
    .replace("{subnet}", generateRandomSubnet().toString())
    .replace("{status}", Math.random() > 0.5 ? "PASSED" : "WARNING");
}

function getRandomLevel(): LogEntry["level"] {
  const rand = Math.random();
  if (rand > 0.85) return "CRITICAL";
  if (rand > 0.65) return "ERROR";
  if (rand > 0.4) return "WARN";
  return "INFO";
}

function generateLog(): LogEntry {
  const now = new Date();
  return {
    id: `log-${Date.now()}-${Math.random()}`,
    timestamp: now.toISOString().slice(11, 19),
    level: getRandomLevel(),
    source: logSources[Math.floor(Math.random() * logSources.length)],
    message: generateLogMessage(),
  };
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [paused, setPaused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamInterval = useRef<NodeJS.Timeout>();

  // Initialize with some logs and start streaming
  useEffect(() => {
    // Generate initial logs
    const initialLogs = Array.from({ length: 15 }, () =>
      generateLog(),
    ).reverse();
    setLogs(initialLogs);

    // Start streaming new logs
    streamInterval.current = setInterval(() => {
      if (!paused) {
        setLogs((prevLogs) => {
          const newLog = generateLog();
          const updated = [newLog, ...prevLogs];
          // Keep only last 80 logs
          return updated.slice(0, 80);
        });
      }
    }, 3000);

    return () => {
      if (streamInterval.current) clearInterval(streamInterval.current);
    };
  }, [paused]);

  // User controls scrolling - no forced auto-scroll to avoid interrupting reading

  const injectEvent = () => {
    const newLog = generateLog();
    setLogs((prevLogs) => {
      const updated = [newLog, ...prevLogs];
      return updated.slice(0, 80);
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 flex h-[calc(100vh-4rem)] flex-col p-4 lg:p-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs text-cyber-cyan">STEM_STREAM</p>
            <h1 className="font-display text-3xl text-white">
              Live Security Logs
            </h1>
          </div>
          <div className="flex gap-2">
            <motion.button
              type="button"
              onClick={() => setPaused(!paused)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded border border-cyber-green px-4 py-2 font-mono text-xs text-cyber-green hover:bg-cyber-green/10 transition-colors"
            >
              {paused ? "RESUME" : "PAUSE"}
            </motion.button>
            <motion.button
              type="button"
              onClick={injectEvent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded border border-cyber-cyan px-4 py-2 font-mono text-xs text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
            >
              INJECT EVENT
            </motion.button>
            <motion.button
              type="button"
              onClick={clearLogs}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded border border-cyber-red/50 px-4 py-2 font-mono text-xs text-cyber-red/70 hover:bg-cyber-red/10 transition-colors"
            >
              CLEAR
            </motion.button>
          </div>
        </motion.header>

        {/* Log viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <GlassCard
            className="flex flex-1 flex-col overflow-hidden !p-0"
            title="SOC@LIVE_FEED"
          >
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1"
            >
              {logs.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center py-8"
                >
                  Waiting for log stream... Click "INJECT EVENT" to start
                </motion.p>
              ) : (
                logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex flex-wrap gap-2 p-2 rounded border transition-colors",
                      levelBgStyle[log.level],
                    )}
                  >
                    <span className="text-gray-500 min-w-fit">
                      [{log.timestamp}]
                    </span>
                    <span
                      className={cn("w-20 font-bold", levelStyle[log.level])}
                    >
                      {log.level}
                    </span>
                    <span className="text-cyber-cyan min-w-fit">
                      {log.source}
                    </span>
                    <span className="text-gray-300 flex-1">{log.message}</span>
                  </motion.div>
                ))
              )}
              <div ref={bottomRef} className="h-2" />
            </div>
          </GlassCard>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex items-center justify-between rounded border border-cyber-border/50 bg-black/30 px-4 py-2"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: paused ? "#ffa500" : "#00ff9d",
              }}
            />
            <span className="font-mono text-xs text-gray-400">
              {paused ? "PAUSED" : "LIVE"} — {logs.length} logs in buffer
            </span>
          </div>
          <div className="font-mono text-xs text-gray-500">
            {logs[0]?.timestamp || "——:——:——"}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
