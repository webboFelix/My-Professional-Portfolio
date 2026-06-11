'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';

const nav = [
  { href: '/home', label: 'Home', icon: '⌂' },
  { href: '/dashboard', label: 'SOC Dashboard', icon: '◈' },
  { href: '/projects', label: 'Projects', icon: '▣' },
  { href: '/labs', label: 'Labs', icon: '⚗' },
  { href: '/videos', label: 'Videos', icon: '▶' },
  { href: '/logs', label: 'Live Logs', icon: '▤' },
  { href: '/contact', label: 'Contact', icon: '✉' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-cyber-border bg-cyber-panel/50 backdrop-blur-sm">
      <div className="border-b border-cyber-border p-4">
        <p className="font-display text-xs tracking-[0.3em] text-cyber-cyan">CYBER_OPS</p>
        <p className="font-mono text-lg text-cyber-green cyber-glow-text">{site.brand}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded px-3 py-2.5 font-mono text-sm transition-all',
                active
                  ? 'bg-cyber-green/15 text-cyber-green border-l-2 border-cyber-green'
                  : 'text-gray-400 hover:bg-white/5 hover:text-cyber-cyan'
              )}
            >
              <span className="text-lg opacity-70">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-cyber-border p-3 font-mono text-[10px] text-gray-500">
        <p>STATUS: <span className="text-cyber-green">SECURE</span></p>
        <p className="mt-1">NODE: {site.handle}</p>
      </div>
    </aside>
  );
}
