"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, X, FileVideo, Image } from "lucide-react";

interface CloudinaryUploadProps {
  onUpload: (
    url: string,
    publicId: string,
    duration?: number,
    thumbnail?: string,
  ) => void;
  resourceType: "image" | "video";
  label?: string;
}

export default function CloudinaryUpload({
  onUpload,
  resourceType,
  label,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { url, publicId, duration, thumbnailUrl } = response.data;
      setPreview(url);
      onUpload(url, publicId, duration, thumbnailUrl);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-cyan-500 transition">
        {preview ? (
          <div className="relative">
            {resourceType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded"
              />
            ) : (
              <video
                src={preview}
                controls
                className="max-h-48 mx-auto rounded"
              />
            )}
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                onUpload("", "", undefined, "");
              }}
              className="absolute top-2 right-2 bg-red-600 rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept={resourceType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              {resourceType === "image" ? (
                <Image size={40} className="text-gray-400" />
              ) : (
                <FileVideo size={40} className="text-gray-400" />
              )}
              <span className="text-sm text-gray-400">
                {uploading
                  ? "Uploading..."
                  : `Click to upload ${resourceType === "image" ? "image" : "video"}`}
              </span>
            </div>
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
