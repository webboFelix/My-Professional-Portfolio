"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface Video {
  $id: string;
  title: string;
  slug: string;
  duration?: number;
  date: string;
  published: boolean;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    const res = await api.get("/videos");
    setVideos(res.data);
    setLoading(false);
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

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Videos</h1>
        <Link
          href="/videos/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Video
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.$id} className="border border-gray-700 rounded p-4">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="text-gray-400 text-sm">Slug: {video.slug}</p>
            {video.duration && (
              <p className="text-gray-400 text-sm">
                Duration: {video.duration}s
              </p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Date: {new Date(video.date).toLocaleDateString()}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span
                className={
                  video.published ? "text-green-400" : "text-yellow-400"
                }
              >
                {video.published ? "Published" : "Draft"}
              </span>
              <div className="space-x-2">
                <Link
                  href={`/videos/${video.$id}`}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteVideo(video.$id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
