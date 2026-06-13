"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { slugify } from "@/lib/utils";
import CloudinaryUpload from "./CloudinaryUpload";
import { Input, Textarea, Checkbox } from "./ui/Input";
import { Button } from "./ui/Button";
import { FormSection } from "./ui/FormSection";
import { useToast } from "./providers/ToastProvider";
import { useStats } from "./providers/StatsProvider";
import { FileText, ImageIcon } from "lucide-react";

interface PostFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export default function PostForm({ initialData, id }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { refresh } = useStats();
  const [form, setForm] = useState({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    writeUp: (initialData?.writeUp as string) || "",
    excerpt: (initialData?.excerpt as string) || "",
    wordCount: (initialData?.wordCount as number) || 0,
    readTime: (initialData?.readTime as number) || 0,
    tags: initialData?.tags ? (initialData.tags as string[]).join(", ") : "",
    published: (initialData?.published as boolean) || false,
    coverImage: (initialData?.coverImage as string) || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "title") {
      setForm((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        wordCount: Number(form.wordCount),
        readTime: Number(form.readTime),
        date: new Date().toISOString(),
      };
      if (id) {
        await api.put(`/posts/${id}`, data);
        toast("Post updated");
      } else {
        await api.post("/posts", data);
        toast("Post created");
      }
      refresh();
      router.push("/posts");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const msg = axiosErr.response?.data?.error || "Error saving post";
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-xl border-2 border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/5 px-5 py-4 text-sm font-medium text-red-300 shadow-lg shadow-red-500/10">
            {error}
          </div>
        )}

        <FormSection
          title="Basic Info"
          description="Title, slug, and summary"
          icon={FileText}
        >
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="My awesome writeup"
          />
          <Input
            label="Slug"
            name="slug"
            value={form.slug}
            readOnly
            className="text-gray-500"
            hint="Auto-generated from title"
          />
          <Textarea
            label="Excerpt"
            name="excerpt"
            rows={3}
            value={form.excerpt}
            onChange={handleChange}
            required
            placeholder="Brief summary for the post card..."
          />
        </FormSection>

        <FormSection
          title="Write-up Content"
          description="Upload markdown file with your content"
          icon={FileText}
        >
          <CloudinaryUpload
            resourceType="markdown"
            initialPreview={form.writeUp ? "writeup.md" : undefined}
            onUpload={(url) => setForm((prev) => ({ ...prev, writeUp: url }))}
            label="Upload Markdown File"
          />
          <div className="grid grid-cols-2 gap-5">
            <Input
              label="Word Count"
              name="wordCount"
              type="number"
              value={form.wordCount}
              onChange={handleChange}
            />
            <Input
              label="Read Time (min)"
              name="readTime"
              type="number"
              value={form.readTime}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="hacking, ctf, writeup"
            hint="Comma-separated"
          />
        </FormSection>

        <FormSection
          title="Media & Publishing"
          description="Cover image and visibility"
          icon={ImageIcon}
        >
          <CloudinaryUpload
            resourceType="image"
            initialPreview={form.coverImage || undefined}
            onUpload={(url) =>
              setForm((prev) => ({ ...prev, coverImage: url }))
            }
            label="Cover Image"
          />
          <Checkbox
            label="Published"
            name="published"
            checked={form.published}
            onChange={handleChange}
          />
        </FormSection>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
