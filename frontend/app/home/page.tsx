'use client';

import { motion } from 'framer-motion';
import { CommandLine } from '@/components/Terminal/CommandLine';
import { GlassCard } from '@/components/UI/GlassCard';
import { BioDashboard } from '@/components/Home/BioDashboard';
import { CERTIFICATIONS, TIMELINE } from '@/lib/api';
import { getAccessMode } from '@/lib/access';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    setMode(getAccessMode());
  }, []);

  return (
    <div className="px-4 py-8 lg:px-10 lg:py-12">
      {mode === 'guest' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 rounded-lg border border-dashed border-cyber-amber/50 bg-cyber-amber/5 px-4 py-2 font-mono text-xs text-cyber-amber"
        >
          GUEST_SESSION — limited clearance.{' '}
          <a href="/gate" className="underline hover:text-white">
            Pass the challenge to unlock operative access
          </a>
        </motion.div>
      )}

      {mode === 'operative' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 font-mono text-xs text-cyber-green"
        >
          ✓ OPERATIVE CLEARANCE ACTIVE
        </motion.p>
      )}

      <BioDashboard />

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
        <GlassCard title="Interactive Terminal">
          <CommandLine />
        </GlassCard>
        <GlassCard title="Certifications" glow="cyan">
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} className="flex justify-between font-mono text-sm">
                <span className="text-cyber-cyan">{c.name}</span>
                <span className="text-gray-500">
                  {c.status} · {c.year}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="mx-auto mt-6 max-w-6xl">
        <GlassCard title="Timeline">
          <div className="relative border-l border-cyber-green/30 pl-6">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative mb-6 last:mb-0">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-cyber-green bg-cyber-bg" />
                <p className="font-display text-cyber-green">{t.year}</p>
                <p className="text-sm text-gray-400">{t.event}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
