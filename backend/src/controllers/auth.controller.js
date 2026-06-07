export function verifyAdmin(req, res) {
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    if (process.env.NODE_ENV === 'development') {
      return res.json({ ok: true, mode: 'dev-open' });
    }
    return res.status(503).json({ ok: false, error: 'Admin API key not configured' });
  }

  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;
  const provided = req.headers['x-api-key'] || bearer;

  if (!provided || provided !== expected) {
    return res.status(401).json({ ok: false, error: 'Invalid API key' });
  }

  res.json({ ok: true, mode: 'authenticated' });
}
