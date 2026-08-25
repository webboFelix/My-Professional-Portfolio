import Link from "next/link";
import { Plus, Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-20 text-center shadow-inner shadow-white/[0.02]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
        <Inbox size={24} className="text-gray-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-600">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          <Plus size={16} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
