'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  glow?: 'green' | 'cyan' | 'magenta';
}

const glowMap = {
  green: 'border-cyber-green/30 shadow-neon',
  cyan: 'border-cyber-cyan/30 shadow-neon-cyan',
  magenta: 'border-cyber-magenta/30',
};

export function GlassCard({ children, className, title, glow = 'green' }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'relative overflow-hidden rounded-lg border bg-cyber-panel/80 backdrop-blur-md cyber-border',
        glowMap[glow],
        className
      )}
    >
      {title && (
        <div className="border-b border-cyber-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyber-green">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
