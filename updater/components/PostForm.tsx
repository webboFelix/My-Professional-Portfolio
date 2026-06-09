"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { slugify } from "@/lib/utils";
import CloudinaryUpload from "./CloudinaryUpload";

interface PostFormProps {
  initialData?: any;
  id?: string;
}

export default function PostForm({ initialData, id }: PostFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    wordCount: initialData?.wordCount || 0,
    readTime: initialData?.readTime || 0,
    tags: initialData?.tags ? initialData.tags.join(",") : "",
    published: initialData?.published || false,
    coverImage: initialData?.coverImage || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as any;
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
    try {
      const data = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t: any) => t.trim())
          .filter(Boolean),
        wordCount: Number(form.wordCount),
        readTime: Number(form.readTime),
        date: new Date().toISOString(),
      };
      if (id) {
        await api.put(`/posts/${id}`, data);
      } else {
        await api.post("/posts", data);
      }
      router.push("/posts");
    } catch (err) {
      console.error(err);
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Slug (auto)</label>
        <input
          name="slug"
          value={form.slug}
          readOnly
          className="w-full bg-gray-800/50 border border-gray-700 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <textarea
          name="excerpt"
          rows={3}
          value={form.excerpt}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Content (Markdown)
        </label>
        <textarea
          name="content"
          rows={10}
          value={form.content}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 font-mono"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Word Count</label>
          <input
            name="wordCount"
            type="number"
            value={form.wordCount}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Read Time (minutes)
          </label>
          <input
            name="readTime"
            type="number"
            value={form.readTime}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Tags (comma separated)
        </label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
          placeholder="hacking, ctf, writeup"
        />
      </div>
      <div>
        <CloudinaryUpload
          resourceType="image"
          onUpload={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
          label="Cover Image"
        />
        {form.coverImage && (
          <p className="text-xs text-gray-400 mt-1">
            Current: {form.coverImage}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
        />
        <label>Published</label>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
