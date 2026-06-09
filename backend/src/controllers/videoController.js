import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import cloudinary from "../config/cloudinary.js";

const COLLECTION_ID = "videos";

export const getVideos = async (req, res) => {
  try {
    // Step 1: Check if collection has any documents (no filters, limit 1)
    const check = await databases.listDocuments(
      DATABASE_ID,
      "COLLECTION_ID",
      [],
      1,
    );
    if (check.total === 0) {
      // Collection is empty – return empty array, no further query
      return res.json([]);
    }

    // Step 2: Collection has records – apply published filter
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      "published=true",
    ]);
    res.json(response.documents);
  } catch (err) {
    console.error("Videos error:", err.message);
    res.json([]); // fallback to empty array on any error
  }
};

export const getVideoBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      `slug="${slug}"`,
    ]);
    if (response.documents.length === 0)
      return res.status(404).json({ error: "Video not found" });
    const video = response.documents[0];
    if (!video.published && !req.admin)
      return res.status(401).json({ error: "Not published" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createVideo = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    if (!req.file)
      return res.status(400).json({ error: "No video file uploaded" });

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "cyber_portfolio_videos" },
        (err, uploadResult) => (err ? reject(err) : resolve(uploadResult)),
      );
      uploadStream.end(req.file.buffer);
    });

    const videoData = {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      duration: result.duration || 0,
      thumbnailUrl: result.thumbnail_url || "",
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      date: new Date().toISOString(),
      published: req.body.published === "true",
    };
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      videoData,
    );
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateVideo = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const { id } = req.params;
    const doc = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      req.body,
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVideo = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const { id } = req.params;
    const video = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    if (video.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
        resource_type: "video",
      });
    }
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
