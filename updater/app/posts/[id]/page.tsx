"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import PostForm from "@/components/PostForm";

export default function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
      setLoading(false);
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm initialData={post} id={id as string} />
    </div>
  );
}
