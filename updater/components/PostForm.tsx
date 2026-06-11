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
    content: (initialData?.content as string) || "",
    excerpt: (initialData?.excerpt as string) || "",
    wordCount: (initialData?.wordCount as number) || 0,
    readTime: (initialData?.readTime as number) || 0,
    tags: initialData?.tags
      ? (initialData.tags as string[]).join(", ")
      : "",
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
    if (name === "content") {
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      setForm((prev) => ({
        ...prev,
        wordCount: words,
        readTime: Math.max(1, Math.ceil(words / 200)),
      }));
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
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
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
        title="Content"
        description="Markdown body — word count auto-calculates"
        icon={FileText}
      >
        <Textarea
          label="Content"
          name="content"
          rows={12}
          value={form.content}
          onChange={handleChange}
          required
          className="font-mono"
          placeholder="Write your markdown content here..."
        />
        <div className="grid grid-cols-2 gap-4">
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
          onUpload={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
          label="Cover Image"
        />
        <Checkbox
          label="Published"
          name="published"
          checked={form.published}
          onChange={handleChange}
        />
      </FormSection>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
