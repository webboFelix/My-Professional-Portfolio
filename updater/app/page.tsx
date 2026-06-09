"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card } from "@/components/ui/Card";

interface Stats {
  posts: number;
  labs: number;
  projects: number;
  videos: number;
  contacts: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    posts: 0,
    labs: 0,
    projects: 0,
    videos: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoints = [
          { key: "posts", url: "/posts" },
          { key: "labs", url: "/labs" },
          { key: "projects", url: "/projects" },
          { key: "videos", url: "/videos" },
          { key: "contacts", url: "/contacts" },
        ];
        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            try {
              const res = await api.get(endpoint.url);
              // Check if response data is an array
              const data = res.data;
              const count = Array.isArray(data) ? data.length : 0;
              return { key: endpoint.key, count };
            } catch (err) {
              console.error(`Error fetching ${endpoint.url}:`, err);
              return { key: endpoint.key, count: 0 };
            }
          }),
        );
        const newStats = results.reduce((acc, { key, count }) => {
          acc[key as keyof Stats] = count;
          return acc;
        }, {} as Stats);
        setStats(newStats);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError("Unable to load statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 animate-pulse h-32 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card title="Posts" value={stats.posts} emptyMessage="No posts yet" />
        <Card title="Labs" value={stats.labs} emptyMessage="No labs yet" />
        <Card
          title="Projects"
          value={stats.projects}
          emptyMessage="No projects yet"
        />
        <Card
          title="Videos"
          value={stats.videos}
          emptyMessage="No videos yet"
        />
        <Card
          title="Messages"
          value={stats.contacts}
          emptyMessage="No messages yet"
        />
      </div>
    </div>
  );
}
