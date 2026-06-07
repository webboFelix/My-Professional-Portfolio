'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { hasAccess } from '@/lib/access';

const PUBLIC_PATHS = ['/', '/gate'];

export function AccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (PUBLIC_PATHS.includes(pathname)) {
      setReady(true);
      return;
    }
    if (!hasAccess()) {
      router.replace('/gate');
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-mono text-cyber-green animate-pulse">
        AUTH_CHECK...
      </div>
    );
  }

  return <>{children}</>;
}
