"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { slugify } from "@/lib/utils";
import CloudinaryUpload from "./CloudinaryUpload";

interface VideoFormProps {
  initialData?: any;
  id?: string;
}

export default function VideoForm({ initialData, id }: VideoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    cloudinaryUrl: initialData?.cloudinaryUrl || "",
    cloudinaryPublicId: initialData?.cloudinaryPublicId || "",
    duration: initialData?.duration || 0,
    thumbnailUrl: initialData?.thumbnailUrl || "",
    tags: initialData?.tags ? JSON.stringify(initialData.tags) : "[]",
    date:
      initialData?.date?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    published: initialData?.published || false,
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

  const handleUploadComplete = (result: any) => {
    setFormData((prev) => ({
      ...prev,
      cloudinaryUrl: result.url,
      cloudinaryPublicId: result.publicId,
      duration: result.duration || 0,
      thumbnailUrl: result.thumbnailUrl || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = {
      ...formData,
      tags: JSON.parse(formData.tags),
    };
    try {
      if (id) {
        await api.put(`/videos/${id}`, dataToSend);
      } else {
        await api.post("/videos", dataToSend);
      }
      router.push("/videos");
    } catch (err) {
      console.error(err);
      alert("Error saving video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label className="block mb-1">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1">Slug</label>
        <input
          name="slug"
          value={formData.slug}
          disabled
          className="w-full p-2 border border-gray-700 rounded bg-gray-800"
        />
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1">Upload Video</label>
        <CloudinaryUpload
          type="video"
          onUploadComplete={handleUploadComplete}
        />
        {formData.cloudinaryUrl && (
          <p className="text-green-400 text-sm mt-1">
            Video uploaded: {formData.cloudinaryUrl}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-1">Tags (JSON array)</label>
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          Published
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : id ? "Update Video" : "Create Video"}
      </button>
    </form>
  );
}
