import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import cloudinary from "../config/cloudinary.js";
import { normalizeDate, parseTags } from "../utils/normalize.js";
import { listCollection, findBySlug, Query } from "../utils/appwriteQueries.js";

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

    console.log(
      "📝 Creating post with body:",
      JSON.stringify(req.body, null, 2),
    );
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      req.body,
    );
    console.log("✅ Post created:", doc.$id);
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
