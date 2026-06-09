"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { slugify } from "@/lib/utils";

interface LabFormProps {
  initialData?: any;
  id?: string;
}

export default function LabForm({ initialData, id }: LabFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    date:
      initialData?.date?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    content: initialData?.content || "",
    difficulty: initialData?.difficulty || "Easy",
    platform: initialData?.platform || "HTB",
    tags: initialData?.tags ? JSON.stringify(initialData.tags) : "[]",
    published: initialData?.published || false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = {
      ...formData,
      tags: JSON.parse(formData.tags),
    };
    try {
      if (id) {
        await api.put(`/labs/${id}`, dataToSend);
      } else {
        await api.post("/labs", dataToSend);
      }
      router.push("/labs");
    } catch (err) {
      console.error(err);
      alert("Error saving lab");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1">Slug (auto-generated)</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          disabled
          className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-400"
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
        <label className="block mb-1">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
          <option>Insane</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Platform</label>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        >
          <option>HTB</option>
          <option>THM</option>
          <option>VulnHub</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Content (Markdown)</label>
        <textarea
          name="content"
          rows={10}
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900 font-mono text-sm"
        />
      </div>
      <div>
        <label className="block mb-1">
          Tags (JSON array, e.g. ["linux","web"])
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : id ? "Update Lab" : "Create Lab"}
      </button>
    </form>
  );
}
