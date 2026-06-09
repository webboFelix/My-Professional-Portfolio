"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api, { listAll } from "@/lib/api";
import { Edit, Trash2, Play } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface Video {
  $id: string;
  title: string;
  slug: string;
  duration?: number;
  thumbnailUrl?: string;
  date: string;
  published: boolean;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await listAll("/videos");
      setVideos(res.data);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const deleteVideo = async (id: string) => {
    if (confirm("Delete this video?")) {
      await api.delete(`/videos/${id}`);
      fetchVideos();
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <PageHeader
        title="Videos"
        description="Video content for your portfolio"
        action={{ label: "New Video", href: "/videos/new" }}
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-white/5 bg-white/[0.03]"
            />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <EmptyState
          title="No videos yet"
          description="Upload your first video to Cloudinary"
          actionLabel="Create Video"
          actionHref="/videos/new"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.$id}
              className="group overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-white/10"
            >
              <div className="relative flex h-36 items-center justify-center bg-white/[0.03]">
                {video.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Play size={32} className="text-gray-600" />
                )}
                {video.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                    {formatDuration(video.duration)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-white">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600">{video.slug}</p>
                  </div>
                  <Badge variant={video.published ? "success" : "warning"}>
                    {video.published ? "Live" : "Draft"}
                  </Badge>
                </div>
                <div className="mt-3 flex justify-end gap-1 opacity-60 transition group-hover:opacity-100">
                  <Link
                    href={`/videos/${video.$id}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => deleteVideo(video.$id)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
