import express from "express";
import { databases, DATABASE_ID } from "../config/appwrite.js";

const router = express.Router();

// Sample images for migration
const projectImages = [
  "https://images.unsplash.com/photo-1460925895917-aae19106c5be?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop",
];

const labImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f5ae4e8be11?w=600&h=300&fit=crop",
];

// Add coverImage to all projects
router.post("/add-project-images", async (req, res) => {
  try {
    const projects = await databases.listDocuments(DATABASE_ID, "projects");
    let updated = 0;

    for (let i = 0; i < projects.documents.length; i++) {
      const project = projects.documents[i];
      const imageUrl = projectImages[i % projectImages.length];

      if (!project.coverImage) {
        await databases.updateDocument(DATABASE_ID, "projects", project.$id, {
          coverImage: imageUrl,
        });
        updated++;
      }
    }

    res.json({
      message: `✅ Added coverImage to ${updated} projects`,
      count: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add coverImage to all labs
router.post("/add-lab-images", async (req, res) => {
  try {
    const labs = await databases.listDocuments(DATABASE_ID, "labs");
    let updated = 0;

    for (let i = 0; i < labs.documents.length; i++) {
      const lab = labs.documents[i];
      const imageUrl = labImages[i % labImages.length];

      if (!lab.coverImage) {
        await databases.updateDocument(DATABASE_ID, "labs", lab.$id, {
          coverImage: imageUrl,
        });
        updated++;
      }
    }

    res.json({
      message: `✅ Added coverImage to ${updated} labs`,
      count: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
