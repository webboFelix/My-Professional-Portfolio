import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import {
  listCollection,
  findBySlug,
  Query,
} from "../utils/appwriteQueries.js";

const COLLECTION_ID = "labs";

export const getLabs = async (req, res) => {
  try {
    const queries =
      req.query.all === "true" ? [] : [Query.equal("published", true)];
    const documents = await listCollection(COLLECTION_ID, queries);
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLabById = async (req, res) => {
  try {
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
    );
    res.json(doc);
  } catch (err) {
    res.status(404).json({ error: "Lab not found" });
  }
};

export const getLabBySlug = async (req, res) => {
  try {
    const lab = await findBySlug(COLLECTION_ID, req.params.slug);
    if (!lab) return res.status(404).json({ error: "Lab not found" });
    res.json(lab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLab = async (req, res) => {
  try {
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
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLab = async (req, res) => {
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

export const deleteLab = async (req, res) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
