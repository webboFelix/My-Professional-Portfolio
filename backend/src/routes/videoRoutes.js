import express from "express";
import {
  getVideos,
  getVideoById,
  getVideoBySlug,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getVideos);
router.get("/id/:id", getVideoById);
router.get("/:slug", getVideoBySlug);
router.post("/", upload.single("video"), createVideo); // file optional — JSON body also accepted
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;
