import { databases, DATABASE_ID, ID } from "../config/appwrite.js";

const COLLECTION_ID = "labs";

export const getLabs = async (req, res) => {
  try {
    // Step 1: Check if collection has any documents (no filters, limit 1)
    const check = await databases.listDocuments(DATABASE_ID, "labs", [], 1);
    if (check.total === 0) {
      // Collection is empty – return empty array, no further query
      return res.json([]);
    }

    // Step 2: Collection has records – apply published filter
    const response = await databases.listDocuments(DATABASE_ID, "labs", [
      "published=true",
    ]);
    res.json(response.documents);
  } catch (err) {
    console.error("Labs error:", err.message);
    res.json([]); // fallback to empty array on any error
  }
};

export const getLabBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      `slug="${slug}"`,
    ]);
    if (!response.documents.length)
      return res.status(404).json({ error: "Lab not found" });
    res.json(response.documents[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLab = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
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

export const updateLab = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const doc = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
      req.body,
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLab = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
