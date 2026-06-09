import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import cloudinary from "../config/cloudinary.js";
import { normalizeDate, parseTags } from "../utils/normalize.js";
import {
  listCollection,
  findBySlug,
  Query,
} from "../utils/appwriteQueries.js";

const COLLECTION_ID = "videos";

export const getVideos = async (req, res) => {
  try {
    const queries =
      req.query.all === "true" ? [] : [Query.equal("published", true)];
    const documents = await listCollection(COLLECTION_ID, queries);
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
    );
    res.json(doc);
  } catch (err) {
    res.status(404).json({ error: "Video not found" });
  }
};

export const getVideoBySlug = async (req, res) => {
  try {
    const video = await findBySlug(COLLECTION_ID, req.params.slug);
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createVideo = async (req, res) => {
  try {
    let videoData;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "cyber_portfolio_videos" },
          (err, uploadResult) => (err ? reject(err) : resolve(uploadResult)),
        );
        uploadStream.end(req.file.buffer);
      });

      videoData = {
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        cloudinaryUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
        duration: result.duration || 0,
        thumbnailUrl: result.thumbnail_url || "",
        tags: parseTags(req.body.tags),
        date: normalizeDate(req.body.date),
        published: req.body.published === "true" || req.body.published === true,
      };
    } else if (req.body.cloudinaryUrl) {
      videoData = {
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description,
        cloudinaryUrl: req.body.cloudinaryUrl,
        cloudinaryPublicId: req.body.cloudinaryPublicId,
        duration: Number(req.body.duration) || 0,
        thumbnailUrl: req.body.thumbnailUrl || "",
        tags: parseTags(req.body.tags),
        date: normalizeDate(req.body.date),
        published: req.body.published === "true" || req.body.published === true,
      };
    } else {
      return res.status(400).json({ error: "No video file or URL provided" });
    }

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
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.date) data.date = normalizeDate(data.date);
    if (data.tags) data.tags = parseTags(data.tags);
    const doc = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      data,
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVideo = async (req, res) => {
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
