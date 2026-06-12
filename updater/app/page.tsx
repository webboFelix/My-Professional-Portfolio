"use client";

import { useStats } from "@/components/providers/StatsProvider";
import { Card } from "@/components/ui/Card";
import { StatCardSkeleton } from "@/components/ui/LoadingSkeleton";
import {
  FileText,
  FlaskConical,
  FolderKanban,
  Video,
  Mail,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const statConfig = [
  {
    key: "posts" as const,
    title: "Posts",
    icon: FileText,
    href: "/posts",
    color: "#22d3ee",
    empty: "No posts yet",
  },
  {
    key: "labs" as const,
    title: "Labs",
    icon: FlaskConical,
    href: "/labs",
    color: "#a78bfa",
    empty: "No labs yet",
  },
  {
    key: "projects" as const,
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
    color: "#34d399",
    empty: "No projects yet",
  },
  {
    key: "videos" as const,
    title: "Videos",
    icon: Video,
    href: "/videos",
    color: "#f472b6",
    empty: "No videos yet",
  },
  {
    key: "contacts" as const,
    title: "Messages",
    icon: Mail,
    href: "/contacts",
    color: "#fbbf24",
    empty: "No messages yet",
  },
];

const quickActions = [
  {
    label: "New Post",
    href: "/posts/new",
    color: "from-cyan-500/10 to-cyan-600/5",
    text: "text-cyan-400",
    border: "hover:border-cyan-500/30",
  },
  {
    label: "New Lab",
    href: "/labs/new",
    color: "from-violet-500/10 to-violet-600/5",
    text: "text-violet-400",
    border: "hover:border-violet-500/30",
  },
  {
    label: "New Project",
    href: "/projects/new",
    color: "from-emerald-500/10 to-emerald-600/5",
    text: "text-emerald-400",
    border: "hover:border-emerald-500/30",
  },
  {
    label: "New Video",
    href: "/videos/new",
    color: "from-pink-500/10 to-pink-600/5",
    text: "text-pink-400",
    border: "hover:border-pink-500/30",
  },
];

export default function Dashboard() {
  const { stats, loading, error, contentTotal } = useStats();
  const isEmpty = !loading && !error && contentTotal === 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your portfolio content from one place
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-600/5 px-5 py-4 text-sm font-medium text-amber-300 shadow-lg shadow-amber-500/10">
          Could not reach the backend. Make sure it is running on port 5000.
        </div>
      )}

      {isEmpty && (
        <div className="mb-6 flex flex-col gap-4 rounded-xl border-2 border-cyan-500/20 bg-gradient-to-r from-cyan-500/[0.08] to-blue-500/[0.04] p-6 shadow-lg sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 shadow-lg">
            <Sparkles size={24} className="text-cyan-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-white">
              Your portfolio is empty — let&apos;s get started
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              All collections are empty. Pick a content type below to create
              your first entry.
            </p>
          </div>
          <Link
            href="/posts/new"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-500 hover:to-blue-500"
          >
            Create first post
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          : statConfig.map((cfg) => (
              <Card
                key={cfg.key}
                title={cfg.title}
                value={stats[cfg.key]}
                icon={cfg.icon}
                href={cfg.href}
                color={cfg.color}
                emptyMessage={cfg.empty}
              />
            ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-white/5 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <Zap size={20} className="text-cyan-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`group rounded-xl border-2 border-white/5 bg-gradient-to-br px-5 py-4 text-sm font-medium transition ${action.color} ${action.text} ${action.border} hover:border-white/10`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">+</span>
                  <span>{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-white/5 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-lg">
          <h2 className="mb-5 text-lg font-semibold text-white">Overview</h2>
          <div className="space-y-5">
            {[
              { label: "Posts", value: stats.posts, color: "bg-cyan-500" },
              { label: "Labs", value: stats.labs, color: "bg-violet-500" },
              {
                label: "Projects",
                value: stats.projects,
                color: "bg-emerald-500",
              },
              { label: "Videos", value: stats.videos, color: "bg-pink-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-400">
                    {item.label}
                  </span>
                  <span className="font-semibold text-white">
                    {loading ? "—" : item.value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${item.color} shadow-lg transition-all duration-500`}
                    style={{
                      width: loading
                        ? "0%"
                        : `${contentTotal ? (item.value / Math.max(contentTotal, 1)) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between border-t border-white/5 pt-3 text-sm">
              <span className="text-gray-500">Messages</span>
              <span className="font-medium text-amber-400">
                {loading ? "—" : stats.contacts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
