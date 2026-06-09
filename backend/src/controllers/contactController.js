import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import { listCollection } from "../utils/appwriteQueries.js";

const COLLECTION_ID = "contacts";

export const createContact = async (req, res) => {
  try {
    const data = {
      ...req.body,
      date: new Date().toISOString(),
      read: false,
    };
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data,
    );
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const documents = await listCollection(COLLECTION_ID);
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const doc = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      req.params.id,
      { read: true },
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
