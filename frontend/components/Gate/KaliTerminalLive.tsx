'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogLine, LogLineType, pickLogStream } from '@/lib/kaliLogs';

const COLOR: Record<LogLineType, string> = {
  prompt: 'text-gray-500',
  cmd: 'text-cyber-cyan',
  out: 'text-gray-400',
  ok: 'text-cyber-green',
  warn: 'text-cyber-amber',
  err: 'text-cyber-red',
};

interface KaliTerminalLiveProps {
  title: string;
  variant: 'nmap' | 'msf' | 'misc';
  className?: string;
  lineDelayMs?: number;
}

export function KaliTerminalLive({
  title,
  variant,
  className = '',
  lineDelayMs = 420,
}: KaliTerminalLiveProps) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [queue, setQueue] = useState<LogLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startNewStream = () => {
    const block = pickLogStream(variant);
    setQueue([...block]);
  };

  useEffect(() => {
    startNewStream();
  }, [variant]);

  useEffect(() => {
    if (queue.length === 0) {
      const pause = setTimeout(startNewStream, 1800);
      return () => clearTimeout(pause);
    }

    const timer = setTimeout(() => {
      const [next, ...rest] = queue;
      setLines((prev) => [...prev.slice(-24), next]);
      setQueue(rest);
    }, lineDelayMs);

    return () => clearTimeout(timer);
  }, [queue, lineDelayMs]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`pointer-events-none overflow-hidden rounded-lg border border-cyber-green/30 bg-[#0c0c0c]/95 shadow-[0_0_50px_rgba(0,255,157,0.12)] backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-cyber-green/20 bg-black/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-cyber-red/90" />
        <span className="h-2 w-2 rounded-full bg-cyber-amber/90" />
        <span className="h-2 w-2 rounded-full bg-cyber-green/90" />
        <span className="ml-2 font-mono text-[10px] text-cyber-green">{title}</span>
        <span className="ml-auto flex items-center gap-1 font-mono text-[9px] text-cyber-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber-green" />
          LIVE
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-36 overflow-y-auto p-3 font-mono text-[9px] leading-relaxed md:h-44 md:text-[10px]"
        style={{ scrollbarWidth: 'none' }}
      >
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line.text.slice(0, 12)}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className={`whitespace-pre-wrap break-all ${COLOR[line.type]}`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {queue.length > 0 && (
          <span className="inline-block animate-pulse text-cyber-green">▋</span>
        )}
      </div>
    </motion.div>
  );
}
