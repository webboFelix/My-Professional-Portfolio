import { databases, DATABASE_ID, ID } from "../config/appwrite.js";
import { listCollection } from "../utils/appwriteQueries.js";
import { sendContactEmail } from "../config/email.js";

const COLLECTION_ID = "contacts";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = {
      ...req.body,
      date: new Date().toISOString(),
      read: false,
    };

    // Save to database
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data,
    );

    // Send email
    try {
      await sendContactEmail(name, email, message);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the request if email fails - still saved to DB
    }

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
