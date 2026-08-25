export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-2xl border border-white/10 bg-slate-900/70"
        />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="h-36 animate-pulse rounded-2xl border border-white/10 bg-slate-900/70" />
  );
}
