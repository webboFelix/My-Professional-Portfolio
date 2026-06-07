'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';

const links = [
  { href: '/home', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Projects' },
  { href: '/labs', label: 'Labs' },
  { href: '/logs', label: 'Logs' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border bg-cyber-bg/90 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/home" className="font-display text-sm tracking-widest text-cyber-green">
          {site.brand}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="font-mono text-cyber-green"
          aria-label="Menu"
        >
          {open ? '[×]' : '[≡]'}
        </button>
      </div>
      {open && (
        <nav className="border-t border-cyber-border px-4 py-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block py-2 font-mono text-sm',
                pathname === l.href ? 'text-cyber-green' : 'text-gray-400'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
