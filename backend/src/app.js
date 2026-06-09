import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stats", statsRoutes);

// Health check
app.get("/health", (req, res) => res.send("OK"));

export default app;
