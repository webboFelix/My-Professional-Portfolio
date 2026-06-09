import { databases, DATABASE_ID, ID } from "../config/appwrite.js";

const COLLECTION_ID = "projects";

export const getProjects = async (req, res) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    res.json(response.documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
    );
    res.json(doc);
  } catch (err) {
    res.status(404).json({ error: "Project not found" });
  }
};

export const createProject = async (req, res) => {
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

export const updateProject = async (req, res) => {
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

export const deleteProject = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
