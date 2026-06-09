import express from "express";
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Public route – anyone can send a message
router.post("/", createContact);

// Admin routes
router.get("/", getContacts);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteContact);

export default router;
