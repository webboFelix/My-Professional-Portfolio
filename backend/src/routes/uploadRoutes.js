import express from "express";
import { uploadImage, uploadVideo } from "../controllers/uploadController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);
router.post("/video", upload.single("video"), uploadVideo);

export default router;
