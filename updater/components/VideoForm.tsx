"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { slugify } from "@/lib/utils";
import CloudinaryUpload from "./CloudinaryUpload";
import { Input, Textarea, Checkbox } from "./ui/Input";
import { Button } from "./ui/Button";

interface VideoFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export default function VideoForm({ initialData, id }: VideoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    description: (initialData?.description as string) || "",
    cloudinaryUrl: (initialData?.cloudinaryUrl as string) || "",
    cloudinaryPublicId: (initialData?.cloudinaryPublicId as string) || "",
    duration: (initialData?.duration as number) || 0,
    thumbnailUrl: (initialData?.thumbnailUrl as string) || "",
    tags: initialData?.tags
      ? (initialData.tags as string[]).join(", ")
      : "",
    date:
      (initialData?.date as string)?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    published: (initialData?.published as boolean) || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "title") {
        setFormData((prev) => ({
          ...prev,
          title: value,
          slug: slugify(value),
        }));
      }
    }
  };

  const handleUpload = (
    url: string,
    publicId: string,
    duration?: number,
    thumbnail?: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      cloudinaryUrl: url,
      cloudinaryPublicId: publicId,
      duration: duration || 0,
      thumbnailUrl: thumbnail || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id && !formData.cloudinaryUrl) {
      setError("Please upload a video first");
      return;
    }
    setLoading(true);
    setError(null);
    const dataToSend = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      date: new Date(`${formData.date}T00:00:00.000Z`).toISOString(),
    };
    try {
      if (id) {
        await api.put(`/videos/${id}`, dataToSend);
      } else {
        await api.post("/videos", dataToSend);
      }
      router.push("/videos");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || "Error saving video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5 rounded-xl border border-white/5 bg-white/[0.02] p-6"
    >
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Input
        label="Slug"
        name="slug"
        value={formData.slug}
        readOnly
        className="text-gray-500"
        hint="Auto-generated from title"
      />
      <Textarea
        label="Description"
        name="description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        required
      />

      <CloudinaryUpload
        resourceType="video"
        label="Upload Video"
        initialPreview={formData.cloudinaryUrl || undefined}
        onUpload={handleUpload}
      />

      <Input
        label="Tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="tutorial, walkthrough"
        hint="Comma-separated"
      />
      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <Checkbox
        label="Published"
        name="published"
        checked={formData.published}
        onChange={handleChange}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Video" : "Create Video"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
