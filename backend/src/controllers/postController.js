import { databases, DATABASE_ID, ID } from "../config/appwrite.js";

const COLLECTION_ID = "posts";

export const getPosts = async (req, res) => {
  try {
    const queries = [];
    //if (!req.admin) queries.push("published=true");
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries,
    );
    res.json(response.documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      `slug="${slug}"`,
    ]);
    if (response.documents.length === 0)
      return res.status(404).json({ error: "Post not found" });
    res.json(response.documents[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  //if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
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
  //if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
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
  //if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
