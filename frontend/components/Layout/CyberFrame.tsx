'use client';

import { ReactNode } from 'react';

export function CyberFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-50 border border-cyber-green/10" />
      <div className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 border-l-2 border-t-2 border-cyber-green" />
      <div className="pointer-events-none fixed right-0 top-0 z-50 h-8 w-8 border-r-2 border-t-2 border-cyber-green" />
      <div className="pointer-events-none fixed bottom-0 left-0 z-50 h-8 w-8 border-b-2 border-l-2 border-cyber-green" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-50 h-8 w-8 border-b-2 border-r-2 border-cyber-green" />
      {children}
    </div>
  );
}
