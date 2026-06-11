"use client";

import { Cyber3DStats } from "@/components/Effects/Cyber3DStats";

export function CyberSecurityStats() {
  const stats = [
    {
      label: "Vulnerabilities Assessed",
      value: 150,
      unit: "+",
      icon: "🔍",
      variant: "green" as const,
    },
    {
      label: "Security Tests Completed",
      value: 48,
      unit: "+",
      icon: "⚔️",
      variant: "cyan" as const,
    },
    {
      label: "Systems Secured",
      value: 32,
      unit: "+",
      icon: "🛡️",
      variant: "amber" as const,
    },
    {
      label: "Certifications Earned",
      value: 5,
      unit: "+",
      icon: "📜",
      variant: "green" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-6 text-2xl font-bold text-cyber-green tracking-wider">
        $ cat security_metrics.log
      </h2>
      <Cyber3DStats stats={stats} />
    </div>
  );
}
