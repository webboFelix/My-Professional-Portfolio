'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypingEffect } from './TypingEffect';
import { NetworkGraph3D } from '@/components/Effects/NetworkGraph3D';
import { CursorGlow } from '@/components/Effects/CursorGlow';

const BOOT_LINES = [
  '[UEFI] Secure boot: ENABLED | TPM attestation OK',
  '[KERNEL] Loading offensive/defensive modules... OK',
  '[VAPT] Burp proxy chain initialized',
  '[PENTEST] Payload handlers mapped (x64)',
  '[CLOUD] IAM policy evaluator online',
  '[NET] ARP/DNS monitors active — 0 drift',
  '[SIEM] Correlation engine synced',
  '[AUTH] Gatekeeper challenge engine loaded',
  '[SCAN] Integrity hash verified — CLEAN',
  '[ROUTE] Redirecting to OPERATIVE_GATE...',
];

const LINE_TIMEOUT_MS = 4500;

interface AdvancedBootProps {
  onComplete: () => void;
}

export function AdvancedBoot({ onComplete }: AdvancedBootProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const advanceLine = useCallback(() => {
    setLineIndex((n) => n + 1);
  }, []);

  const progress =
    lineIndex >= BOOT_LINES.length
      ? 100
      : Math.round((lineIndex / BOOT_LINES.length) * 100);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => onCompleteRef.current(), 700);
      return () => clearTimeout(t);
    }
  }, [lineIndex]);

  // Fallback: force-advance if typing stalls (e.g. tab backgrounded)
  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) return;
    const failsafe = setTimeout(advanceLine, LINE_TIMEOUT_MS);
    return () => clearTimeout(failsafe);
  }, [lineIndex, advanceLine]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <NetworkGraph3D />
      <CursorGlow />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="scanline animate-glitch relative z-10 mx-4 w-full max-w-3xl rounded-xl border border-cyber-green/50 bg-black/95 p-8 shadow-neon"
        style={{ transform: 'perspective(800px) rotateX(2deg)' }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-cyber-red shadow-[0_0_8px_#ff3366]" />
            <span className="h-3 w-3 rounded-full bg-cyber-amber shadow-[0_0_8px_#ffb800]" />
            <span className="h-3 w-3 rounded-full bg-cyber-green shadow-[0_0_8px_#00ff9d]" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-cyan">
            VAPT // PENTEST // ETHICAL_HACK
          </p>
        </div>

        <p className="mb-4 font-display text-xl text-cyber-green cyber-glow-text">
          ADVANCED BOOT INITIALIZATION
        </p>

        <div className="max-h-64 space-y-1 overflow-hidden font-mono text-sm text-cyber-green/90">
          {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
              {line}
            </motion.p>
          ))}
          {lineIndex < BOOT_LINES.length && (
            <p key={lineIndex}>
              <TypingEffect
                text={BOOT_LINES[lineIndex]}
                speed={14}
                onComplete={advanceLine}
              />
            </p>
          )}
        </div>

        <div className="mt-6">
          <div className="mb-1 flex justify-between font-mono text-[10px] text-gray-500">
            <span>LOADING_MODULES</span>
            <span className="text-cyber-green">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cyber-border">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-green/50 via-cyber-green to-cyber-cyan"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
