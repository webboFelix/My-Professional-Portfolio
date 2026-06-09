"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import PostForm from "@/components/PostForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/id/${id}`);
      setPost(res.data);
      setLoading(false);
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) return <LoadingSkeleton rows={6} />;

  return (
    <div>
      <PageHeader title="Edit Post" description="Update post content" />
      <PostForm initialData={post!} id={id as string} />
    </div>
  );
}
