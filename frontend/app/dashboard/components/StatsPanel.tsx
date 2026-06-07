'use client';

import { GlassCard } from '@/components/UI/GlassCard';

const stats = [
  { label: 'Threats Blocked', value: '12,847', delta: '+12%', color: 'text-cyber-green' },
  { label: 'Active Labs', value: '8', delta: '3 running', color: 'text-cyber-cyan' },
  { label: 'CVE Tracked', value: '2.4K', delta: 'Updated', color: 'text-cyber-amber' },
  { label: 'Uptime', value: '99.97%', delta: '30d', color: 'text-cyber-green' },
];

export function StatsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <GlassCard key={s.label} className="!p-0">
          <div className="p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">{s.label}</p>
            <p className={`mt-1 font-display text-2xl ${s.color}`}>{s.value}</p>
            <p className="mt-1 font-mono text-xs text-gray-500">{s.delta}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
