import { databases, DATABASE_ID } from "../config/appwrite.js";

export const getStats = async (req, res) => {
  if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    const collections = ["posts", "labs", "projects", "videos", "contacts"];
    const stats = {};
    for (const col of collections) {
      const response = await databases.listDocuments(DATABASE_ID, col);
      stats[col] = response.total;
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
