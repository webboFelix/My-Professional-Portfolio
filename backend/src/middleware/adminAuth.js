/**
 * Protects write routes. Set ADMIN_API_KEY in .env.
 * Send via header: X-API-Key: <key> or Authorization: Bearer <key>
 */
export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[auth] ADMIN_API_KEY unset — write access allowed (dev only)');
      return next();
    }
    return res.status(503).json({ error: 'Admin API key not configured on server' });
  }

  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;
  const provided = req.headers['x-api-key'] || bearer;

  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized — invalid or missing API key' });
  }

  next();
}
