'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedBoot } from '@/components/Terminal/AdvancedBoot';
import { hasAccess } from '@/lib/access';

export default function BootPage() {
  const router = useRouter();
  const [showBoot, setShowBoot] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (hasAccess()) {
      router.replace('/home');
    } else {
      setChecked(true);
    }
  }, [router]);

  const onBootComplete = useCallback(() => {
    setShowBoot(false);
    router.push('/gate');
  }, [router]);

  if (!checked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black font-mono text-cyber-green">
        INITIALIZING...
      </div>
    );
  }

  if (!showBoot) return null;

  return <AdvancedBoot onComplete={onBootComplete} />;
}
