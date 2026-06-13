import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  //if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "cyber_portfolio_images" },
        (err, uploadResult) => (err ? reject(err) : resolve(uploadResult)),
      );
      uploadStream.end(req.file.buffer);
    });
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No video uploaded" });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "cyber_portfolio_videos",
          resource_type: "video",
        },
        (err, uploadResult) => (err ? reject(err) : resolve(uploadResult)),
      );

      uploadStream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadMarkdown = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Verify it's a markdown file by extension
    if (!req.file.originalname.toLowerCase().endsWith(".md")) {
      return res
        .status(400)
        .json({ error: "Only .md (markdown) files are allowed" });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "cyber_portfolio_writeups",
          resource_type: "raw",
        },
        (err, uploadResult) => (err ? reject(err) : resolve(uploadResult)),
      );

      uploadStream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
