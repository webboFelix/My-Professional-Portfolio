import * as storage from '../services/storage.service.js';

const COLLECTION = 'posts';

export async function getPosts(req, res, next) {
  try {
    const posts = await storage.listItems(COLLECTION);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function getPost(req, res, next) {
  try {
    const post = await storage.getItem(COLLECTION, req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function createPost(req, res, next) {
  try {
    const post = await storage.createItem(COLLECTION, {
      ...req.body,
      publishedAt: req.body.publishedAt || new Date().toISOString(),
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const post = await storage.updateItem(COLLECTION, req.params.id, req.body);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req, res, next) {
  try {
    const ok = await storage.deleteItem(COLLECTION, req.params.id);
    if (!ok) return res.status(404).json({ error: 'Post not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
