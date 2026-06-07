'use client';

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 hex-pattern opacity-40" />
      <div
        className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,157,0.15) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
