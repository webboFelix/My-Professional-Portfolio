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
import migrationRoutes from "./routes/migrationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Request timeout middleware (must be longer than Appwrite timeouts)
app.use((req, res, next) => {
  const timeout = setTimeout(() => {
    console.log(`⏱️ Request timeout: ${req.method} ${req.path}`);
    if (!res.headersSent) {
      res
        .status(504)
        .json({ error: "Gateway Timeout - Appwrite connection timed out" });
    }
  }, 35000); // 35 second timeout (longer than appwrite 15s)

  res.on("finish", () => clearTimeout(timeout));
  res.on("close", () => clearTimeout(timeout));
  next();
});

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/migrate", migrationRoutes);

// Health check
app.get("/health", (req, res) => res.send("OK"));

export default app;
