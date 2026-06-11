"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Menu, Wifi, WifiOff } from "lucide-react";
import { useStats } from "@/components/providers/StatsProvider";

const labels: Record<string, string> = {
  "": "Dashboard",
  posts: "Posts",
  labs: "Labs",
  projects: "Projects",
  videos: "Videos",
  contacts: "Messages",
  new: "Create",
};

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const { error } = useStats();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.length
    ? segments.map((seg, i) => ({
        label: labels[seg] || seg,
        href: "/" + segments.slice(0, i + 1).join("/"),
        last: i === segments.length - 1,
      }))
    : [{ label: "Dashboard", href: "/", last: true }];

  return (
    <header className="sticky top-0 z-10 -mx-8 -mt-8 mb-8 border-b border-white/5 bg-[#060b14]/80 px-4 py-3 backdrop-blur-xl sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <nav className="flex min-w-0 items-center gap-1 text-sm">
            <Link href="/" className="shrink-0 text-gray-500 hover:text-gray-300">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.href} className="flex min-w-0 items-center gap-1">
                <ChevronRight size={14} className="shrink-0 text-gray-700" />
                {crumb.last ? (
                  <span className="truncate font-medium text-white">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="truncate text-gray-500 hover:text-gray-300"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
            error
              ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {error ? <WifiOff size={12} /> : <Wifi size={12} />}
          {error ? "Offline" : "API Live"}
        </div>
      </div>
    </header>
  );
}
