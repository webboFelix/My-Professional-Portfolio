import express from "express";
import {
  getLabs,
  getLabById,
  getLabBySlug,
  createLab,
  updateLab,
  deleteLab,
} from "../controllers/labController.js";

const router = express.Router();

router.get("/", getLabs);
router.get("/id/:id", getLabById);
router.get("/:slug", getLabBySlug);
router.post("/", createLab);
router.put("/:id", updateLab);
router.delete("/:id", deleteLab);

export default router;
