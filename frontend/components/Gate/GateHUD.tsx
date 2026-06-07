'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/lib/profile';

const INTEL = [
  'Sudo vulnerability patch released — review advisories',
  'New cloud IAM misconfig patterns in wild',
  'Kerberos delegation abuse trending in AD pentests',
  'OWASP API Top 10 update — retest endpoints',
  'Zero-day chatter on TLS stacks — monitor',
];

export function GateHUD() {
  const [time, setTime] = useState('');
  const [intelIdx, setIntelIdx] = useState(0);
  const [fingerprint, setFingerprint] = useState({
    ip: 'SCANNING...',
    os: '—',
    browser: '—',
    res: '—',
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTime(`${h}:${m}:${s}.${ms}`);
    };
    tick();
    const id = setInterval(tick, 47);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIntelIdx((i) => (i + 1) % INTEL.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setFingerprint({
      ip: 'REDACTED',
      os: typeof navigator !== 'undefined' ? navigator.platform || 'UNKNOWN' : '—',
      browser: typeof navigator !== 'undefined' ? navigator.userAgent.split(' ').pop()?.slice(0, 24) || '—' : '—',
      res: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '—',
    });
  }, []);

  const hudClass =
    'rounded-lg border border-cyber-green/20 bg-black/70 p-3 font-mono text-[10px] backdrop-blur-md shadow-[0_0_30px_rgba(0,255,157,0.08)]';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`fixed left-4 top-4 z-20 hidden w-52 md:block ${hudClass}`}
      >
        <p className="mb-2 text-cyber-cyan">DIGITAL_FINGERPRINT</p>
        <p className="text-gray-500">IP: <span className="text-cyber-red">{fingerprint.ip}</span></p>
        <p className="text-gray-500">OS: {fingerprint.os}</p>
        <p className="text-gray-500">UA: {fingerprint.browser}</p>
        <p className="text-gray-500">RES: {fingerprint.res}</p>
        <p className="mt-2 text-cyber-red">STATUS: CONNECTED</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`fixed right-4 top-4 z-20 hidden text-right md:block ${hudClass}`}
      >
        <p className="mb-1 text-cyber-cyan">CHRONOMETER</p>
        <p className="font-display text-2xl text-cyber-green cyber-glow-text">{time}</p>
        <p className="mt-1 text-gray-500">{profile.location}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed bottom-4 left-4 z-20 hidden max-w-xs md:block ${hudClass}`}
      >
        <p className="mb-2 text-cyber-cyan">INTEL_FEED</p>
        <p className="text-gray-400 leading-relaxed">{INTEL[intelIdx]}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed bottom-4 right-4 z-20 hidden md:block ${hudClass}`}
      >
        <p className="text-cyber-cyan">MEMORY_INTEGRITY</p>
        <p className="mt-1 flex items-center gap-2 text-cyber-green">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-green" />
          AES-256 active
        </p>
      </motion.div>
    </>
  );
}
