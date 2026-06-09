import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
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
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "cyber_portfolio_videos" },
        (err, uploadResult) => (err ? reject(err) : resolve(uploadResult)),
      );
      uploadStream.end(req.file.buffer);
    });
    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration || 0,
      thumbnailUrl: result.thumbnail_url || "",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
