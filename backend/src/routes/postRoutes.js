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

// Middleware to log POST requests
router.use((req, res, next) => {
  if (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "DELETE"
  ) {
    console.log(`[${req.method}] /api/posts${req.path}`, req.body);
  }
  next();
});

router.get("/", getPosts);
router.get("/id/:id", getPostById);
router.get("/:slug", getPostBySlug);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
