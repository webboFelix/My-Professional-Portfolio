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
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-500 hover:to-blue-500"
          >
            <Plus size={16} />
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
