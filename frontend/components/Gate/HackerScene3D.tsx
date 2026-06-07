'use client';

import dynamic from 'next/dynamic';

const HackerSceneInner = dynamic(() => import('./HackerSceneInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-cyber-green/50">
      LOADING_3D_SCENE...
    </div>
  ),
});

export function HackerScene3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-75">
      <div
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse 55% 60% at 50% 42%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 60% at 50% 42%, black 20%, transparent 75%)',
        }}
      >
        <HackerSceneInner />
      </div>
    </div>
  );
}
