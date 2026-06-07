import { v4 as uuidv4 } from 'uuid';
import * as storage from '../services/storage.service.js';
import { sendContactEmail } from '../services/email.service.js';

const COLLECTION = 'messages';

export async function submitContact(req, res, next) {
  try {
    const { name, email, message, website } = req.body;

    if (website) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long (max 5000 characters)' });
    }

    const entry = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      ip: req.ip,
    };

    const messages = await storage.listItems(COLLECTION);
    messages.push(entry);
    await storage.replaceAll(COLLECTION, messages.slice(-500));

    let emailResult = { sent: false };
    try {
      emailResult = await sendContactEmail(entry);
    } catch (err) {
      console.error('[contact] email failed:', err.message);
    }

    res.status(201).json({
      ok: true,
      id: entry.id,
      emailed: emailResult.sent === true,
    });
  } catch (err) {
    next(err);
  }
}
