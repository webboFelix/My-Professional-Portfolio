import express from "express";
import {
  getPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/id/:id", getPostById);
router.get("/:slug", getPostBySlug);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
