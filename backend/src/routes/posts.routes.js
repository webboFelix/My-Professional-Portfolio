import { Router } from 'express';
import * as ctrl from '../controllers/posts.controller.js';
import { writeLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', ctrl.getPosts);
router.get('/:id', ctrl.getPost);
router.post('/', writeLimiter, requireAdmin, ctrl.createPost);
router.put('/:id', writeLimiter, requireAdmin, ctrl.updatePost);
router.delete('/:id', writeLimiter, requireAdmin, ctrl.deletePost);

export default router;
