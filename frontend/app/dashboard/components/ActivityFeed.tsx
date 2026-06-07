'use client';

import { GlassCard } from '@/components/UI/GlassCard';
import type { Lab } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface ActivityFeedProps {
  labs: Lab[];
}

export function ActivityFeed({ labs }: ActivityFeedProps) {
  const active = labs.filter((l) => l.status === 'active').slice(0, 5);

  return (
    <GlassCard title="Active Labs Feed" glow="cyan">
      <ul className="space-y-3">
        {active.length === 0 ? (
          <li className="font-mono text-sm text-gray-500">No active labs — start the API backend.</li>
        ) : (
          active.map((lab) => (
            <li key={lab.id} className="flex items-start gap-3 border-b border-cyber-border/50 pb-3 last:border-0">
              <span className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-cyber-green" />
              <div>
                <p className="font-mono text-sm text-cyber-cyan">{lab.title}</p>
                <p className="text-xs text-gray-500">{lab.category} · {lab.difficulty}</p>
                <p className="mt-1 text-xs text-gray-400 line-clamp-2">{lab.description}</p>
              </div>
            </li>
          ))
        )}
      </ul>
      {labs.length > 0 && (
        <p className="mt-3 font-mono text-[10px] text-gray-600">
          Last sync: {formatDate(labs[0]?.createdAt || new Date().toISOString())}
        </p>
      )}
    </GlassCard>
  );
}
