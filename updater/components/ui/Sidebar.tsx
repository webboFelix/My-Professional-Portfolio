"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  FolderKanban,
  Video,
  Mail,
  Shield,
  X,
} from "lucide-react";
import { useStats } from "@/components/providers/StatsProvider";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, countKey: null },
  { href: "/posts", label: "Posts", icon: FileText, countKey: "posts" as const },
  { href: "/labs", label: "Labs", icon: FlaskConical, countKey: "labs" as const },
  { href: "/projects", label: "Projects", icon: FolderKanban, countKey: "projects" as const },
  { href: "/videos", label: "Videos", icon: Video, countKey: "videos" as const },
  { href: "/contacts", label: "Messages", icon: Mail, countKey: "contacts" as const },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { stats, loading } = useStats();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/5 bg-[#0a0f1a]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Portfolio</p>
              <p className="text-xs text-gray-500">Admin Console</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ href, label, icon: Icon, countKey }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            const count = countKey ? stats[countKey] : null;

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </span>
                {countKey && !loading && (
                  <span
                    className={`min-w-[1.25rem] rounded-full px-1.5 py-0.5 text-center text-[10px] font-semibold ${
                      active
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 px-6 py-4">
          <p className="text-xs text-gray-600">Cyber Portfolio CMS</p>
          <p className="mt-1 text-[10px] text-gray-700">v1.0 · Appwrite + Cloudinary</p>
        </div>
      </aside>
    </>
  );
}
