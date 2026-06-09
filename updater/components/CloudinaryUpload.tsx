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
  const [preview, setPreview] = useState<string | null>(
    initialPreview || null,
  );
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
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
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
        className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
          dragOver
            ? "border-cyan-400 bg-cyan-500/5"
            : "border-white/10 hover:border-cyan-500/30"
        }`}
      >
        {preview ? (
          <div className="relative">
            {resourceType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-48 rounded-lg"
              />
            ) : (
              <video
                src={preview}
                controls
                className="mx-auto max-h-48 rounded-lg"
              />
            )}
            <button
              type="button"
              onClick={clear}
              className="absolute right-2 top-2 rounded-full bg-red-600/80 p-1.5 transition hover:bg-red-600"
            >
              <X size={14} />
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
                <Loader2 size={36} className="animate-spin text-cyan-400" />
              ) : resourceType === "image" ? (
                <Image size={36} className="text-gray-600" />
              ) : (
                <FileVideo size={36} className="text-gray-600" />
              )}
              <div>
                <p className="text-sm text-gray-400">
                  {uploading
                    ? "Uploading to Cloudinary..."
                    : `Drop ${resourceType} here or click to browse`}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {resourceType === "image" ? "PNG, JPG, WebP" : "MP4, WebM, MOV"}
                </p>
              </div>
            </div>
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
