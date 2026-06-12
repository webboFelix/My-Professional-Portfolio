"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, X, FileVideo, Image, Loader2 } from "lucide-react";

interface CloudinaryUploadProps {
  onUpload: (
    url: string,
    publicId: string,
    duration?: number,
    thumbnail?: string,
  ) => void;
  resourceType: "image" | "video";
  label?: string;
  initialPreview?: string;
}

export default function CloudinaryUpload({
  onUpload,
  resourceType,
  label,
  initialPreview,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = async (file: File) => {
    if (resourceType === "image" && !file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (resourceType === "video" && !file.type.startsWith("video/")) {
      setError("Please select a video file");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append(resourceType === "image" ? "image" : "video", file);

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/upload/${resourceType}`;
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 120000,
      });
      const { url, publicId, duration, thumbnailUrl } = response.data;
      setPreview(url);
      onUpload(url, publicId, duration, thumbnailUrl);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const msg =
        axiosErr.response?.data?.error || "Upload failed. Check backend.";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const clear = () => {
    setPreview(null);
    onUpload("", "", undefined, "");
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 p-8 transition ${
          dragOver
            ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
            : "border-dashed border-white/20 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-white/[0.05]"
        }`}
      >
        {preview ? (
          <div className="relative inline-block w-full">
            {resourceType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-64 rounded-xl shadow-lg"
              />
            ) : (
              <video
                src={preview}
                controls
                className="mx-auto max-h-64 rounded-xl shadow-lg"
              />
            )}
            <button
              type="button"
              onClick={clear}
              className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:bg-red-700"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="block cursor-pointer">
            <input
              type="file"
              accept={resourceType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <div className="flex flex-col items-center gap-3">
              {uploading ? (
                <Loader2 size={40} className="animate-spin text-cyan-400" />
              ) : resourceType === "image" ? (
                <Image size={40} className="text-gray-500" />
              ) : (
                <FileVideo size={40} className="text-gray-500" />
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-300">
                  {uploading
                    ? "Uploading to Cloudinary..."
                    : `Drop ${resourceType} here or click to browse`}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {resourceType === "image"
                    ? "PNG, JPG, WebP"
                    : "MP4, WebM, MOV"}
                </p>
              </div>
            </div>
          </label>
        )}
      </div>
      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
    </div>
  );
}
