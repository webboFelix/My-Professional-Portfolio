import { Router } from 'express';
import * as ctrl from '../controllers/projects.controller.js';
import { writeLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', ctrl.getProjects);
router.get('/:id', ctrl.getProject);
router.post('/', writeLimiter, requireAdmin, ctrl.createProject);
router.put('/:id', writeLimiter, requireAdmin, ctrl.updateProject);
router.delete('/:id', writeLimiter, requireAdmin, ctrl.deleteProject);

export default router;
