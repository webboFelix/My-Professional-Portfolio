"use client";

import api from "@/lib/api";
import { StatsPanel } from "./components/StatsPanel";
import { ActivityFeed } from "./components/ActivityFeed";
import { SkillRadar } from "./components/SkillRadar";
import { SystemStatus } from "./components/SystemStatus";
import { ThreatMap } from "./components/ThreatMap";
import { Matrix3D } from "@/components/Effects/Matrix3D";

async function getLabs() {
  try {
    const response = await api.get("/api/labs?all=true");
    return response.data || [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const labs = await getLabs();

  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 space-y-6 p-4 lg:p-8">
        <header>
          <p className="font-mono text-xs text-cyber-cyan">SOC CONSOLE v2.0</p>
          <h1 className="font-display text-3xl text-white">
            Security Operations Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Live overview — skills, labs, threats, system health
          </p>
        </header>

        <StatsPanel />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <SkillRadar />
            <ThreatMap />
          </div>
          <div className="space-y-6">
            <SystemStatus />
            <ActivityFeed labs={labs} />
          </div>
        </div>
      </div>
    </div>
  );
}
