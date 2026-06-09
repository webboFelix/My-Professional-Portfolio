import express from "express";
import {
  getVideos,
  getVideoBySlug,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getVideos);
router.get("/:slug", getVideoBySlug);
router.post("/", upload.single("video"), createVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;
