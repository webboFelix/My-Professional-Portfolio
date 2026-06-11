"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import VideoForm from "@/components/VideoForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function EditVideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await api.get(`/videos/id/${id}`);
      setVideo(res.data);
      setLoading(false);
    };
    if (id) fetchVideo();
  }, [id]);

  if (loading) return <LoadingSkeleton rows={6} />;

  return (
    <div>
      <PageHeader
        title="Edit Video"
        description={(video?.title as string) || "Update video details"}
        backHref="/videos"
      />
      <VideoForm initialData={video!} id={id as string} />
    </div>
  );
}
