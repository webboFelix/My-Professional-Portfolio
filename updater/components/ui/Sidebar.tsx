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
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/posts", label: "Posts", icon: FileText },
  { href: "/labs", label: "Labs", icon: FlaskConical },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/videos", label: "Videos", icon: Video },
  { href: "/contacts", label: "Messages", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-white/5 bg-[#0a0f1a]/95 backdrop-blur-xl">
      <div className="border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Portfolio</p>
            <p className="text-xs text-gray-500">Admin Console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 px-6 py-4">
        <p className="text-xs text-gray-600">Cyber Portfolio CMS</p>
      </div>
    </aside>
  );
}
