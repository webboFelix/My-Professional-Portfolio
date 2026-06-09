export const authAdmin = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey === process.env.ADMIN_API_KEY) {
    req.admin = true;
    next();
  } else {
    res.status(401).json({ error: "Invalid or missing API key" });
  }
};
