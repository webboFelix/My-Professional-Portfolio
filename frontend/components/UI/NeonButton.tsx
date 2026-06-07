'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'green' | 'cyan' | 'outline';
  children: ReactNode;
}

const variants = {
  green:
    'bg-cyber-green/10 text-cyber-green border-cyber-green hover:bg-cyber-green/20 shadow-neon',
  cyan: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan hover:bg-cyber-cyan/20 shadow-neon-cyan',
  outline: 'bg-transparent text-gray-300 border-cyber-border hover:border-cyber-green hover:text-cyber-green',
};

export function NeonButton({ href, variant = 'green', children, className, ...props }: NeonButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded border px-5 py-2.5 font-mono text-sm uppercase tracking-wider transition-all duration-300 glitch-hover',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
