'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CursorGlow } from '@/components/Effects/CursorGlow';
import { GateAmbientBackground } from '@/components/Gate/GateAmbientBackground';
import { GateHUD } from '@/components/Gate/GateHUD';
import { OperativeGate } from '@/components/Gate/OperativeGate';
import { getAccessMode } from '@/lib/access';

export default function GatePage() {
  const router = useRouter();

  useEffect(() => {
    if (getAccessMode() === 'operative') {
      router.replace('/home');
    }
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0c]">
      <GateAmbientBackground />
      <CursorGlow />
      <GateHUD />
      <div className="relative z-10">
        <OperativeGate />
      </div>
    </div>
  );
}
