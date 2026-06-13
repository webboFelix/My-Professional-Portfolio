"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  X,
  FileVideo,
  Image,
  Loader2,
  FileText,
  CheckCircle,
} from "lucide-react";

interface CloudinaryUploadProps {
  onUpload: (
    url: string,
    publicId?: string,
    duration?: number,
    thumbnail?: string,
  ) => void;
  resourceType: "image" | "video" | "markdown";
  label?: string;
  initialPreview?: string;
}

export default function CloudinaryUpload({
  onUpload,
  resourceType,
  label,
  initialPreview,
}: CloudinaryUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const callbackRef = useRef(onUpload);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadData, setUploadData] = useState<{
    url: string;
    publicId?: string;
    duration?: number;
    thumbnail?: string;
  } | null>(null);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = onUpload;
  }, [onUpload]);

  const uploadFile = async (file: File) => {
    console.log(
      "uploadFile called with:",
      file.name,
      "resourceType:",
      resourceType,
    );

    if (resourceType === "image" && !file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (resourceType === "video" && !file.type.startsWith("video/")) {
      setError("Please select a video file");
      return;
    }
    if (resourceType === "markdown" && !file.name.endsWith(".md")) {
      setError("Please select a markdown (.md) file");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    if (resourceType === "image") {
      formData.append("image", file);
    } else if (resourceType === "video") {
      formData.append("video", file);
    } else if (resourceType === "markdown") {
      formData.append("markdown", file);
    }

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/upload/${resourceType}`;
      console.log("Uploading to endpoint:", endpoint);

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 120000,
      });

      console.log("Upload response:", response.data);
      const { url, publicId } = response.data;

      // Set preview based on resource type
      if (resourceType === "markdown") {
        setPreview(file.name);
      } else {
        setPreview(url);
      }

      // Store upload data
      const data = {
        url,
        publicId,
        duration: response.data.duration,
        thumbnail: response.data.thumbnailUrl,
      };
      setUploadData(data);

      // Reset file input using ref
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Call callback after a brief delay to let UI update
      setTimeout(() => {
        callbackRef.current(
          data.url,
          data.publicId,
          data.duration,
          data.thumbnail,
        );
      }, 100);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const msg =
        axiosErr.response?.data?.error || "Upload failed. Check backend.";
      setError(msg);
      console.error("Upload error details:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("File selected:", file);
    if (file) {
      console.log("Uploading file:", file.name, "Type:", file.type);
      uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log("File dropped");
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    console.log("Dropped file:", file?.name);
    if (file) uploadFile(file);
  };

  const clear = () => {
    console.log("Clearing upload");
    setPreview(null);
    setError(null);
    setUploadData(null);
    callbackRef.current("");
  };

  const getAccept = () => {
    if (resourceType === "image") return "image/*";
    if (resourceType === "video") return "video/*";
    if (resourceType === "markdown") return ".md,text/markdown";
    return "";
  };

  const getIcon = () => {
    if (resourceType === "image")
      return <Image size={40} className="text-gray-500" />;
    if (resourceType === "video")
      return <FileVideo size={40} className="text-gray-500" />;
    if (resourceType === "markdown")
      return <FileText size={40} className="text-gray-500" />;
    return null;
  };

  const getPreviewText = () => {
    if (resourceType === "image") return "PNG, JPG, WebP";
    if (resourceType === "video") return "MP4, WebM, MOV";
    if (resourceType === "markdown") return "Markdown (.md) files only";
    return "";
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
            <div className="relative">
              {resourceType === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto max-h-64 rounded-xl shadow-lg"
                />
              ) : resourceType === "video" ? (
                <video
                  src={preview}
                  controls
                  className="mx-auto max-h-64 rounded-xl shadow-lg"
                />
              ) : (
                <div className="mx-auto flex max-w-sm items-center gap-3 rounded-lg bg-green-500/10 p-4 text-green-400">
                  <FileText size={24} />
                  <span className="text-sm font-medium">{preview}</span>
                </div>
              )}
              {uploadData && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-green-500/20 px-4 py-2 text-green-400">
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">Upload successful</span>
                </div>
              )}
            </div>
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
              ref={fileInputRef}
              type="file"
              accept={getAccept()}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <div className="flex flex-col items-center gap-3">
              {uploading ? (
                <Loader2 size={40} className="animate-spin text-cyan-400" />
              ) : (
                getIcon()
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-300">
                  {uploading
                    ? "Uploading to Cloudinary..."
                    : `Drop ${resourceType} here or click to browse`}
                </p>
                <p className="mt-1 text-xs text-gray-500">{getPreviewText()}</p>
              </div>
            </div>
          </label>
        )}
      </div>
      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
    </div>
  );
}
