import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import { listCollection } from "../utils/appwriteQueries.js";

const COLLECTION_ID = "projects";

export const getProjects = async (req, res) => {
  try {
    const documents = await listCollection(COLLECTION_ID);
    res.json(documents);
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
  try {
    console.log(
      "📋 Creating project with body:",
      JSON.stringify(req.body, null, 2),
    );
    const data = {
      ...req.body,
      date: req.body.date?.includes("T")
        ? req.body.date
        : new Date(`${req.body.date}T00:00:00.000Z`).toISOString(),
    };
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data,
    );
    console.log("✅ Project created:", doc.$id);
    res.status(201).json(doc);
  } catch (err) {
    console.error("❌ Error creating project:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.date && !data.date.includes("T")) {
      data.date = new Date(`${data.date}T00:00:00.000Z`).toISOString();
    }
    const doc = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
      data,
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
