import { getCollectionTotal } from "../utils/appwriteQueries.js";

export const getStats = async (req, res) => {
  try {
    const collections = ["posts", "labs", "projects", "videos", "contacts"];
    const stats = {};
    for (const col of collections) {
      stats[col] = await getCollectionTotal(col);
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
