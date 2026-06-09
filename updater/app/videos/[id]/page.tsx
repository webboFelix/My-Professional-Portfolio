"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import VideoForm from "@/components/VideoForm";

export default function EditVideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data);
      setLoading(false);
    };
    if (id) fetchVideo();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Video</h1>
      <VideoForm initialData={video} id={id as string} />
    </div>
  );
}
