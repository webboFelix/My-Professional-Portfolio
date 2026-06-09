"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
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
} from "lucide-react";
import Link from "next/link";

interface Stats {
  posts: number;
  labs: number;
  projects: number;
  videos: number;
  contacts: number;
}

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
  { label: "New Post", href: "/posts/new", color: "text-cyan-400" },
  { label: "New Lab", href: "/labs/new", color: "text-violet-400" },
  { label: "New Project", href: "/projects/new", color: "text-emerald-400" },
  { label: "New Video", href: "/videos/new", color: "text-pink-400" },
];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    posts: 0,
    labs: 0,
    projects: 0,
    videos: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setApiError(false);
      try {
        const res = await api.get("/stats");
        setStats({
          posts: res.data.posts ?? 0,
          labs: res.data.labs ?? 0,
          projects: res.data.projects ?? 0,
          videos: res.data.videos ?? 0,
          contacts: res.data.contacts ?? 0,
        });
      } catch {
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const contentTotal =
    stats.posts + stats.labs + stats.projects + stats.videos;
  const isEmpty = !loading && !apiError && contentTotal === 0;

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

      {apiError && (
        <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          Could not reach the backend. Make sure it is running on port 5000.
        </div>
      )}

      {isEmpty && (
        <div className="mb-6 flex items-start gap-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
            <Sparkles size={20} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white">
              Your portfolio is empty — let&apos;s get started
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              All collections are empty. Create your first post, project, or lab
              using the quick actions below.
            </p>
          </div>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Zap size={18} className="text-cyan-400" />
            <h2 className="font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-medium transition hover:border-white/10 hover:bg-white/[0.06] ${action.color}`}
              >
                + {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-semibold text-white">Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total content items</span>
              <span className="font-medium text-white">
                {loading ? "—" : contentTotal}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Messages</span>
              <span className="font-medium text-amber-400">
                {loading ? "—" : stats.contacts}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">API status</span>
              <span
                className={`font-medium ${apiError ? "text-amber-400" : "text-emerald-400"}`}
              >
                {apiError ? "Disconnected" : "Connected"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
