import * as storage from '../services/storage.service.js';

const COLLECTION = 'projects';

export async function getProjects(req, res, next) {
  try {
    res.json(await storage.listItems(COLLECTION));
  } catch (err) {
    next(err);
  }
}

export async function getProject(req, res, next) {
  try {
    const project = await storage.getItem(COLLECTION, req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const project = await storage.createItem(COLLECTION, {
      ...req.body,
      createdAt: req.body.createdAt || new Date().toISOString(),
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await storage.updateItem(COLLECTION, req.params.id, req.body);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const ok = await storage.deleteItem(COLLECTION, req.params.id);
    if (!ok) return res.status(404).json({ error: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
