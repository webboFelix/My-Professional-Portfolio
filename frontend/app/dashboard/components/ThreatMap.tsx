'use client';

import { GlassCard } from '@/components/UI/GlassCard';

const threats = [
  { region: 'EU-West', count: 42, severity: 'low' },
  { region: 'US-East', count: 128, severity: 'medium' },
  { region: 'APAC', count: 67, severity: 'low' },
  { region: 'Unknown', count: 15, severity: 'high' },
];

const severityColor = {
  low: 'bg-cyber-green',
  medium: 'bg-cyber-amber',
  high: 'bg-cyber-red',
};

export function ThreatMap() {
  return (
    <GlassCard title="Threat Map (Simulated)" glow="magenta">
      <div className="relative aspect-video rounded border border-cyber-border bg-black/50 overflow-hidden">
        <div className="absolute inset-0 opacity-30 grid-bg" />
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        <p className="absolute bottom-2 left-2 font-mono text-[10px] text-gray-500">GLOBAL_IOC_FEED</p>
      </div>
      <ul className="mt-4 space-y-2">
        {threats.map((t) => (
          <li key={t.region} className="flex items-center justify-between font-mono text-xs">
            <span className="text-gray-400">{t.region}</span>
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${severityColor[t.severity as keyof typeof severityColor]}`} />
              {t.count} events
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
