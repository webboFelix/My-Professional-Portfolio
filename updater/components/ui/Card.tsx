import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  href: string;
  color: string;
  emptyMessage?: string;
}

export function Card({
  title,
  value,
  icon: Icon,
  href,
  color,
  emptyMessage = "No records",
}: CardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border-2 border-white/5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-lg transition hover:border-white/15 hover:from-white/[0.09] hover:to-white/[0.03]"
    >
      <div
        className="absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl transition group-hover:opacity-30"
        style={{ background: color }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {title}
          </p>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg shadow-lg"
            style={{ background: `${color}20`, color }}
          >
            <Icon size={18} />
          </div>
        </div>
        {value === 0 ? (
          <p className="mt-3 text-sm text-gray-600">{emptyMessage}</p>
        ) : (
          <p className="mt-3 text-4xl font-bold text-white">{value}</p>
        )}
      </div>
    </Link>
  );
}
