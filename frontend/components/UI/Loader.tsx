'use client';

export function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-cyber-border" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyber-green" />
      </div>
      <p className="font-mono text-sm text-cyber-green animate-pulse">{label}</p>
    </div>
  );
}
