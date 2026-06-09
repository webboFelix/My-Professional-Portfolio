import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import {
  listCollection,
  findBySlug,
  Query,
} from "../utils/appwriteQueries.js";

const COLLECTION_ID = "posts";

export const getPosts = async (req, res) => {
  try {
    const queries =
      req.query.all === "true" ? [] : [Query.equal("published", true)];
    const documents = await listCollection(COLLECTION_ID, queries);
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
    );
    res.json(doc);
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await findBySlug(COLLECTION_ID, req.params.slug);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      req.body,
    );
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
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

export const deletePost = async (req, res) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
