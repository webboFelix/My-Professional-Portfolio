import * as storage from '../services/storage.service.js';

const COLLECTION = 'labs';

export async function getLabs(req, res, next) {
  try {
    res.json(await storage.listItems(COLLECTION));
  } catch (err) {
    next(err);
  }
}

export async function getLab(req, res, next) {
  try {
    const lab = await storage.getItem(COLLECTION, req.params.id);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    res.json(lab);
  } catch (err) {
    next(err);
  }
}

export async function createLab(req, res, next) {
  try {
    const lab = await storage.createItem(COLLECTION, {
      ...req.body,
      createdAt: req.body.createdAt || new Date().toISOString(),
    });
    res.status(201).json(lab);
  } catch (err) {
    next(err);
  }
}

export async function updateLab(req, res, next) {
  try {
    const lab = await storage.updateItem(COLLECTION, req.params.id, req.body);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    res.json(lab);
  } catch (err) {
    next(err);
  }
}

export async function deleteLab(req, res, next) {
  try {
    const ok = await storage.deleteItem(COLLECTION, req.params.id);
    if (!ok) return res.status(404).json({ error: 'Lab not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
