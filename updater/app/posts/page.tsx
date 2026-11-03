"use client";

import { useEffect, useMemo, useState } from "react";
import api, { listAll } from "@/lib/api";
import { Post } from "@/lib/types";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SearchInput } from "@/components/ui/SearchInput";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import { useStats } from "@/components/providers/StatsProvider";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";
import { newestFirst } from "@/lib/utils";
import { RelativeTime } from "@/components/ui/RelativeTime";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const { refresh } = useStats();
  const { target, deleting, setDeleting, open, close } =
    useDeleteConfirm<Post>();

  const fetchPosts = async () => {
    try {
      const res = await listAll("/posts");
      setPosts(newestFirst(res.data));
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q),
    );
  }, [posts, search]);

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      await api.delete(`/posts/${target.$id}`);
      toast("Post deleted");
      close();
      fetchPosts();
      refresh();
    } catch {
      toast("Failed to delete post", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Posts"
        description="Blog posts and writeups for your portfolio"
        action={{ label: "New Post", href: "/posts/new" }}
      />

      {!loading && posts.length > 0 && (
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search posts..."
          />
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Create your first blog post or writeup"
          actionLabel="Create Post"
          actionHref="/posts/new"
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matches"
          description={`Nothing found for "${search}"`}
        />
      ) : (
        <div className="content-grid">
          {filtered.map((post) => (
            <div
              key={post.$id}
              className="post-card group flex min-h-[360px] min-w-0 flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="content-card-media relative shrink-0 overflow-hidden bg-slate-800/80">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt=""
                    className="block h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/10 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Write-up
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent" />
              </div>
              <div className="post-card-body flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-semibold text-white">
                      {post.title}
                    </h2>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {post.slug}
                    </p>
                  </div>
                  <Badge variant={post.published ? "success" : "warning"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <RelativeTime
                  date={post.date}
                  className="mt-3 text-xs text-slate-500"
                />
                <div className="mt-auto flex justify-end gap-1 border-t border-white/10 pt-4 opacity-70 transition group-hover:opacity-100">
                  <Link
                    href={`/posts/${post.$id}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => open(post)}
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

      <ConfirmDialog
        open={!!target}
        title="Delete post?"
        description={`"${target?.title}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={close}
        loading={deleting}
      />
    </div>
  );
}
