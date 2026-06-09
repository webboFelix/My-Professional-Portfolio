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
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
        <Inbox size={24} className="text-gray-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-600">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-600/20 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-600/30"
        >
          <Plus size={16} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
