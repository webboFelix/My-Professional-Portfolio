"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Post } from "@/lib/types";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this post?")) {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link
          href="/posts/new"
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
        >
          + New Post
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.$id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-400 text-sm">
                {post.slug} • {post.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/posts/${post.$id}`}
                className="p-2 hover:bg-gray-700 rounded"
              >
                <Edit size={18} />
              </Link>
              <button
                onClick={() => handleDelete(post.$id)}
                className="p-2 hover:bg-red-900 rounded"
              >
                <Trash2 size={18} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
