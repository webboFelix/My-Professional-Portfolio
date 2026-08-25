import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  backHref?: string;
}

export function PageHeader({
  title,
  description,
  action,
  backHref,
}: PageHeaderProps) {
  return (
    <div className="mb-8 border-b border-white/10 pb-7">
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      )}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
            Portfolio workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              {description}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
          >
            <Plus size={16} />
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
