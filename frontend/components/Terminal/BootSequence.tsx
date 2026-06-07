'use client';

import { useEffect, useState } from 'react';
import { TypingEffect } from './TypingEffect';

const BOOT_LINES = [
  '[BIOS] Initializing secure boot chain...',
  '[KERNEL] Loading encryption modules... OK',
  '[NET] Establishing TLS tunnel to portfolio-gateway...',
  '[AUTH] Multi-factor handshake verified',
  '[SOC] Threat intelligence feeds synchronized',
  '[SCAN] System integrity check — 0 anomalies',
  '[READY] Analyst profile unlocked. Welcome.',
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        onComplete();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [lineIndex, onComplete]);

  if (done) return null;

  return (
    <div className="scanline relative mx-auto max-w-2xl rounded-lg border border-cyber-green/40 bg-black/90 p-6 font-mono text-sm shadow-neon">
      <div className="mb-4 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-cyber-red/80" />
        <span className="h-3 w-3 rounded-full bg-cyber-amber/80" />
        <span className="h-3 w-3 rounded-full bg-cyber-green/80" />
        <span className="ml-4 text-gray-500">root@cyber-nexus — boot</span>
      </div>
      <div className="space-y-1 text-cyber-green/90">
        {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        {lineIndex < BOOT_LINES.length && (
          <p>
            <TypingEffect
              text={BOOT_LINES[lineIndex]}
              speed={18}
              onComplete={() => setLineIndex((n) => n + 1)}
            />
          </p>
        )}
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded bg-cyber-border">
        <div
          className="h-full bg-cyber-green transition-all duration-300"
          style={{ width: `${(lineIndex / BOOT_LINES.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
