export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded-xl border border-white/5 bg-white/[0.03]"
        />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="h-32 animate-pulse rounded-xl border border-white/5 bg-white/[0.03]" />
  );
}
