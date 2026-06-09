"use client";

import { useEffect, useState } from "react";
import api, { listAll } from "@/lib/api";
import { Post } from "@/lib/types";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await listAll("/posts");
      setPosts(res.data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
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
      <PageHeader
        title="Posts"
        description="Blog posts and writeups for your portfolio"
        action={{ label: "New Post", href: "/posts/new" }}
      />

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Create your first blog post or writeup"
          actionLabel="Create Post"
          actionHref="/posts/new"
        />
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="truncate font-semibold text-white">
                    {post.title}
                  </h2>
                  <Badge variant={post.published ? "success" : "warning"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{post.slug}</p>
              </div>
              <div className="flex gap-1 opacity-60 transition group-hover:opacity-100">
                <Link
                  href={`/posts/${post.$id}`}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(post.$id)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
