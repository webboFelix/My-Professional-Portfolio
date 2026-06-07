'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/UI/GlassCard';

const services = [
  { name: 'API Gateway', key: 'api' },
  { name: 'SIEM Pipeline', key: 'siem' },
  { name: 'Threat Intel', key: 'intel' },
  { name: 'Honeypot', key: 'honey' },
];

export function SystemStatus() {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/health`)
      .then((r) => r.ok && setOnline(true))
      .catch(() => setOnline(false));
  }, []);

  return (
    <GlassCard title="System Status">
      <div className="space-y-3">
        {services.map((s, i) => {
          const ok = s.key === 'api' ? online : online !== false;
          return (
            <div key={s.name} className="flex items-center justify-between font-mono text-sm">
              <span className="text-gray-400">{s.name}</span>
              <span className={ok ? 'text-cyber-green' : online === null ? 'text-gray-500' : 'text-cyber-red'}>
                {ok === null && s.key === 'api' ? 'CHECKING...' : ok ? '● ONLINE' : '○ OFFLINE'}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
